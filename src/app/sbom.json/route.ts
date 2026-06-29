import { execFile as execFileRaw } from 'node:child_process';
import { promisify } from 'node:util';

export async function GET() {
  const { stdout } = await execFile('pnpm', ['sbom', '--sbom-format', 'cyclonedx', '--prod'], {
    cwd: process.cwd(),
    maxBuffer: 20 * 1024 * 1024,
  });

  return new Response(stdout);
}

const execFile = promisify(execFileRaw);
export const dynamic = 'force-static';
