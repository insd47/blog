import { readFile, readdir } from 'node:fs/promises';
import type { ZodObject } from 'zod';
import { ComponentType } from 'react';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Heading, Root } from 'mdast';
import nodePath from 'node:path';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';

/**
 * 특정 경로의 모든 파일명을 반환합니다.
 * @param dir 경로. `src` 기준입니다.
 */
export async function importList(dir: string) {
  const directory = nodePath.join(process.cwd(), 'src', dir);
  const entries = await readdir(directory, { withFileTypes: true });

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

/**
 * Markdown 컨텐츠를 불러오고 지정한 스키마로 메타데이터를 파싱합니다.
 * @param path 마크다운 문서의 경로. `src` 기준입니다.
 * @param scheme `metadata`에 대한 스키마
 */
export async function importContent<T extends ZodObject>(path: string, scheme: T) {
  const target = nodePath.join(process.cwd(), 'src', path);
  const source = await readFile(target, 'utf8');
  const tree = unified().use(remarkParse).use(remarkMdx).parse(source) as Root;

  let title: string | undefined;
  const sections: string[] = [];

  visit(tree, 'heading', (node: Heading) => {
    const text = toString(node).trim();
    if (!text) return;

    if (node.depth === 1 && !title) title = text;
    else if (node.depth === 2) sections.push(text);
  });

  if (!title) {
    throw new Error(`Expected first markdown heading to be a level 1 title: ${path}`);
  }

  const { default: Content, metadata } = (await import('@/' + path)) as {
    default: ComponentType;
    metadata: unknown;
  };

  return { Content, title, sections, ...scheme.parse(metadata) };
}
