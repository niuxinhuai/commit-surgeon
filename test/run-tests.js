import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const cli = path.join(root, 'src', 'cli.js');
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'commit-surgeon-'));

function git(args) {
  return execFileSync('git', args, { cwd: tmp, encoding: 'utf8' });
}

git(['init', '-b', 'main']);
fs.mkdirSync(path.join(tmp, 'src'));
fs.writeFileSync(path.join(tmp, 'src', 'app.js'), 'console.log("hello");\n');
fs.writeFileSync(path.join(tmp, 'README.md'), '# Demo\n');

const groups = JSON.parse(execFileSync(process.execPath, [cli, '--json'], {
  cwd: tmp,
  encoding: 'utf8'
}));

assert.equal(groups.some((group) => group.type === 'feat'), true);
assert.equal(groups.some((group) => group.type === 'docs'), true);

console.log('commit-surgeon tests passed');
