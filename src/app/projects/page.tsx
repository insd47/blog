import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export default function ProjectsPage() {
  notFound();
}

export const metadata: Metadata = {
  title: 'Projects',
  openGraph: { title: 'Projects' },
};
