const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, '_site');
const base = '/Abhyasa_redesign/';
const excluded = new Set(['.gitignore', '.htaccess', 'README.md']);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

const tracked = execFileSync('git', ['ls-files', '-z'], { cwd: root })
  .toString('utf8')
  .split('\0')
  .filter(Boolean);

for (const file of tracked) {
  if (excluded.has(file) || file.startsWith('scripts/') || file.startsWith('.github/')) continue;

  const source = path.join(root, file);
  const destination = path.join(output, file);
  fs.mkdirSync(path.dirname(destination), { recursive: true });

  if (/\.(?:html|css|js)$/i.test(file)) {
    let content = fs.readFileSync(source, 'utf8');
    content = content.replace(/\bsrcset=(['"])(.*?)\1/gs, (match, quote, paths) =>
      `srcset=${quote}${paths.replace(/(^|,\s*)\/(?!\/|Abhyasa_redesign\/)/g, `$1${base}`)}${quote}`
    );
    content = content.replace(/(?<=["'])\/(?!\/|Abhyasa_redesign\/)/g, base);
    content = content.replace(/(url\(\s*)\/(?!\/|Abhyasa_redesign\/)/gi, `$1${base}`);
    fs.writeFileSync(destination, content);
  } else {
    fs.copyFileSync(source, destination);
  }
}

fs.writeFileSync(path.join(output, '.nojekyll'), '');
process.stdout.write(`Prepared ${tracked.length} tracked files for GitHub Pages at ${base}\n`);
