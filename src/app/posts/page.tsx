import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import config from '@/lib/config';

export default async function PostsPage() {
  notFound();
}

export const metadata: Metadata = config.metadata.basic('Posts');
