import type { Image, Paragraph, Root } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

const imageExtensions = /\.(avif|gif|jpe?g|png|webp)$/i;

/**
 * Markdown image syntax를 Next.js 정적 이미지 import로 변환합니다.
 *
 * ```mdx
 * ![thumbnail](./thumbnail.png)
 * ```
 *
 * 위 문법은 대략 다음 형태로 컴파일됩니다.
 *
 * ```mdx
 * import __mdxImage0 from './thumbnail.png';
 *
 * <img src={__mdxImage0} alt="thumbnail" />
 * ```
 *
 * 이후 `img` 렌더링은 MDX components 매핑에 위임합니다.
 */
const remarkImage: Plugin<[], Root> = () => {
  return (tree) => {
    const imports: ImageImport[] = [];

    visit(tree, 'paragraph', (node: Paragraph, index, parent) => {
      const image = getOnlyImage(node);
      const source = image ? resolveImportSource(image.url) : null;

      if (!image || !source || index === undefined || !parent) {
        return;
      }

      const name = `__mdxImage${imports.length}`;
      imports.push({ name, source });
      parent.children[index] = createImage(name, image) as never;
    });

    if (imports.length === 0) {
      return;
    }

    tree.children.unshift(createImports(imports) as never);
  };
};

export default remarkImage;

function getOnlyImage(node: Paragraph): Image | null {
  if (node.children.length !== 1) {
    return null;
  }

  const [child] = node.children;
  return child.type === 'image' ? child : null;
}

function resolveImportSource(url: string): string | null {
  if (!imageExtensions.test(url) || isRemoteUrl(url) || url.startsWith('#')) {
    return null;
  }

  if (url.startsWith('@/') || url.startsWith('./') || url.startsWith('../')) {
    return url;
  }

  if (url.startsWith('/src/')) {
    return `@/${url.slice('/src/'.length)}`;
  }

  if (url.startsWith('/')) {
    return `@${url}`;
  }

  return `./${url}`;
}

function isRemoteUrl(url: string) {
  return /^[a-z][a-z\d+.-]*:/i.test(url) || url.startsWith('//');
}

function createImports(imports: ImageImport[]): MdxjsEsm {
  const body = imports.map(({ name, source }) => createImport(name, source));

  return {
    type: 'mdxjsEsm',
    value: body.map(toImportDeclaration).join('\n'),
    data: {
      estree: {
        type: 'Program',
        sourceType: 'module',
        body,
      },
    },
  };
}

function createImage(name: string, image: Image): MdxJsxFlowElement {
  return {
    type: 'mdxJsxFlowElement',
    name: 'img',
    attributes: [
      {
        type: 'mdxJsxAttribute',
        name: 'src',
        value: {
          type: 'mdxJsxAttributeValueExpression',
          value: name,
          data: {
            estree: createExpression(name),
          },
        },
      },
      {
        type: 'mdxJsxAttribute',
        name: 'alt',
        value: image.alt ?? '',
      },
      ...(image.title
        ? [
            {
              type: 'mdxJsxAttribute' as const,
              name: 'title',
              value: image.title,
            },
          ]
        : []),
    ],
    children: [],
  };
}

function createImport(name: string, source: string): ImportDeclaration {
  return {
    type: 'ImportDeclaration',
    specifiers: [
      {
        type: 'ImportDefaultSpecifier',
        local: createIdentifier(name),
      },
    ],
    source: createLiteral(source),
  };
}

function toImportDeclaration(node: ImportDeclaration): string {
  return `import ${node.specifiers[0].local.name} from ${node.source.raw};`;
}

function createExpression(name: string): Program {
  return {
    type: 'Program',
    sourceType: 'module',
    body: [
      {
        type: 'ExpressionStatement',
        expression: createIdentifier(name),
      },
    ],
  };
}

function createIdentifier(name: string): Identifier {
  return { type: 'Identifier', name };
}

function createLiteral(value: string): Literal {
  return { type: 'Literal', value, raw: JSON.stringify(value) };
}

interface ImageImport {
  name: string;
  source: string;
}

interface MdxjsEsm {
  type: 'mdxjsEsm';
  value: string;
  data: {
    estree: Program;
  };
}

interface MdxJsxFlowElement {
  type: 'mdxJsxFlowElement';
  name: string;
  attributes: MdxJsxAttribute[];
  children: MdxJsxFlowElement[];
}

interface MdxJsxAttribute {
  type: 'mdxJsxAttribute';
  name: string;
  value?: string | MdxJsxAttributeValueExpression | null;
}

interface MdxJsxAttributeValueExpression {
  type: 'mdxJsxAttributeValueExpression';
  value: string;
  data: {
    estree: Program;
  };
}

interface Program {
  type: 'Program';
  sourceType: 'module';
  body: Array<ImportDeclaration | ExpressionStatement>;
}

interface ImportDeclaration {
  type: 'ImportDeclaration';
  specifiers: ImportDefaultSpecifier[];
  source: Literal;
}

interface ImportDefaultSpecifier {
  type: 'ImportDefaultSpecifier';
  local: Identifier;
}

interface ExpressionStatement {
  type: 'ExpressionStatement';
  expression: Identifier;
}

interface Identifier {
  type: 'Identifier';
  name: string;
}

interface Literal {
  type: 'Literal';
  value: string;
  raw: string;
}
