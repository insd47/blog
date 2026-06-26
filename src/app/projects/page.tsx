import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import config from '@/lib/config';

export default function ProjectsPage() {
  notFound();
}

export const metadata: Metadata = config.metadata.basic('Projects');
