import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

export default async function PostsPage() {
  notFound();
}

export const metadata: Metadata = {
  title: 'Posts',
  openGraph: { title: 'Posts' },
};
