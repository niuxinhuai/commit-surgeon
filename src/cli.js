#!/usr/bin/env node
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`commit-surgeon

Usage:
  commit-surgeon [--staged] [--json]

Groups a dirty worktree into suggested semantic commits.`);
  process.exit(0);
}

function git(params) {
  return execFileSync('git', params, { encoding: 'utf8' }).trim();
}

let raw = '';
try {
  raw = args.includes('--staged') ? git(['diff', '--cached', '--name-status']) : git(['status', '--porcelain']);
} catch {
  console.error('commit-surgeon must be run inside a git repository.');
  process.exit(1);
}

const files = raw.split('\n').filter(Boolean).map((line) => {
  if (args.includes('--staged')) {
    const [status, ...rest] = line.split(/\s+/);
    return { status, path: rest.join(' ') };
  }
  return { status: line.slice(0, 2).trim(), path: line.slice(3).trim() };
});

function bucket(file) {
  if (/README|docs?\//i.test(file.path)) return 'docs';
  if (/test|spec|__tests__/i.test(file.path)) return 'test';
  if (/package|lock|config|\.ya?ml$|\.toml$|\.json$/i.test(file.path)) return 'chore';
  if (/fix|bug|patch/i.test(file.path)) return 'fix';
  return 'feat';
}

const groups = {};
for (const file of files) {
  const key = bucket(file);
  groups[key] ||= [];
  groups[key].push(file);
}

const result = Object.entries(groups).map(([type, items]) => ({
  type,
  message: `${type}: update ${items.length} file${items.length > 1 ? 's' : ''}`,
  files: items
}));

if (args.includes('--json')) {
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log('# Commit Surgeon');
  for (const group of result) {
    console.log(`\n## ${group.message}`);
    for (const file of group.files) console.log(`- ${file.status} ${file.path}`);
  }
}
