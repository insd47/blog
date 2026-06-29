import { readFile, readdir } from 'node:fs/promises';
import { z } from 'zod';
import type { ComponentType } from 'react';
import { unified } from 'unified';
import { visit } from 'unist-util-visit';
import { toString } from 'mdast-util-to-string';
import type { Heading, Root } from 'mdast';
import nodePath from 'node:path';
import remarkParse from 'remark-parse';
import remarkMdx from 'remark-mdx';
import { truncate } from '@/lib/utils/text';
import { execFile as execFileRaw } from 'node:child_process';
import { promisify } from 'node:util';

/**
 * 특정 경로의 모든 파일명을 반환합니다.
 * @param dir 경로. `src` 기준입니다.
 */
export async function importList(dir: string) {
  const directory = nodePath.join(process.cwd(), 'src', dir);
  const entries = await readdir(directory, { withFileTypes: true });

  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

/**
 * Markdown 문서의 요약 데이터를 불러옵니다.
 * @param path 마크다운 문서의 경로. `src` 기준입니다.
 */
export async function importSummary(path: string) {
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

  const description = tree.children
    .filter((node) => node.type === 'paragraph')
    .map((node) => toString(node))
    .map((text) => text.replace(/\s+/g, ' ').trim())
    .filter((text) => text.length > 0)
    .map((text) => truncate(text, 100))
    .at(0);

  return { title, sections, description };
}

/**
 * Markdown 컨텐츠를 불러오고 지정한 스키마로 메타데이터를 파싱합니다.
 * @param module 마크다운 모듈. mdx 파일에 대한 동적 import를 전달해야 합니다.
 * @param scheme `metadata`에 대한 스키마
 */
export async function importDocument<T extends z.ZodType>(
  module: Promise<unknown>,
  scheme: T,
): Promise<{ Content: ComponentType; metadata: z.output<T> }> {
  const { default: Content, metadata } = (await module) as {
    default: ComponentType;
    metadata: unknown;
  };

  return { Content, metadata: scheme.parse(metadata) };
}

export async function importDate(path: string) {
  const params = ['log', '-1', '--format=%cI', '--', `src/${path}`];
  const options = { cwd: process.cwd() };

  try {
    const { stdout } =  await execFile('git', params, options);
    const value = stdout.trim();
    if (!value) return null;

    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? null : date;
  } catch (e) {
    console.error(e);
    return null;
  }
}

const execFile = promisify(execFileRaw);
