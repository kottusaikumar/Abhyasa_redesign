// Dependency-free local preview, including the site's extensionless .html links.
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const port = Number(process.argv[2] || 4173);
const types = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.woff2': 'font/woff2',
  '.pdf': 'application/pdf',
  '.mp4': 'video/mp4'
};

http.createServer((request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405).end();
    return;
  }
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400).end(); return; }
  const requested = path.resolve(root, '.' + pathname);
  if (requested !== root && !requested.startsWith(root + path.sep)) {
    response.writeHead(403).end();
    return;
  }
  const candidates = pathname.endsWith('/')
    ? [path.join(requested, 'index.html')]
    : [requested, requested + '.html'];
  const file = candidates.find(candidate => fs.existsSync(candidate) && fs.statSync(candidate).isFile());
  if (!file) {
    response.writeHead(404, { 'Content-Type': types['.html'] });
    if (request.method === 'GET') fs.createReadStream(path.join(root, '404.html')).pipe(response);
    else response.end();
    return;
  }
  const size = fs.statSync(file).size;
  const range = request.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
  const start = range ? Number(range[1]) : 0;
  const end = range ? (range[2] ? Math.min(Number(range[2]), size - 1) : size - 1) : size - 1;
  if (start > end || start >= size) {
    response.writeHead(416, { 'Content-Range': `bytes */${size}` }).end();
    return;
  }
  const headers = {
    'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache',
    'Accept-Ranges': 'bytes',
    'Content-Length': end - start + 1
  };
  if (range) headers['Content-Range'] = `bytes ${start}-${end}/${size}`;
  response.writeHead(range ? 206 : 200, headers);
  if (request.method === 'HEAD') response.end();
  else fs.createReadStream(file, { start, end }).pipe(response);
}).listen(port, '127.0.0.1', () => {
  process.stdout.write(`Abhyasa local preview: http://127.0.0.1:${port}/\n`);
});
