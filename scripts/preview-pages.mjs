import { createReadStream } from 'node:fs';
import { access, readFile } from 'node:fs/promises';
import http from 'node:http';
import path from 'node:path';
import process from 'node:process';

const repoRoot = process.cwd();
const distDir = path.join(repoRoot, 'dist');

function parseArgs(argv) {
  const defaults = {
    base: `/${path.basename(repoRoot)}/`,
    port: 4173,
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--base') {
      defaults.base = argv[index + 1] ?? defaults.base;
      index += 1;
      continue;
    }

    if (arg === '--port') {
      defaults.port = Number.parseInt(argv[index + 1] ?? `${defaults.port}`, 10);
      index += 1;
    }
  }

  return defaults;
}

function normalizeBase(base) {
  if (!base || base === '/') {
    return '/';
  }

  const trimmed = base.trim().replace(/^\/+|\/+$/g, '');
  return trimmed ? `/${trimmed}/` : '/';
}

function contentTypeFor(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'text/javascript; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.png':
      return 'image/png';
    case '.jpg':
    case '.jpeg':
      return 'image/jpeg';
    case '.webp':
      return 'image/webp';
    case '.woff2':
      return 'font/woff2';
    case '.woff':
      return 'font/woff';
    case '.ico':
      return 'image/x-icon';
    default:
      return 'application/octet-stream';
  }
}

async function fileExists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function resolveRequestPath(urlPath, base) {
  if (urlPath === '/' && base !== '/') {
    return { redirect: base };
  }

  if (!urlPath.startsWith(base)) {
    return null;
  }

  let relativePath = urlPath.slice(base.length);

  if (!relativePath || relativePath.endsWith('/')) {
    relativePath = `${relativePath}index.html`;
  }

  const normalizedRelativePath = path.normalize(relativePath).replace(/^([.][.][\\/])+/, '');
  let filePath = path.join(distDir, normalizedRelativePath);

  if (await fileExists(filePath)) {
    return { filePath };
  }

  if (path.extname(filePath) === '') {
    const candidate = path.join(filePath, 'index.html');
    if (await fileExists(candidate)) {
      return { filePath: candidate };
    }

    const [deckSlug] = normalizedRelativePath.split(/[\\/]/u);
    if (deckSlug) {
      const deckIndex = path.join(distDir, deckSlug, 'index.html');
      if (await fileExists(deckIndex)) {
        return { filePath: deckIndex };
      }
    }
  }

  const fallback = path.join(distDir, 'index.html');
  if (await fileExists(fallback)) {
    return { filePath: fallback };
  }

  return null;
}

async function ensureDistExists() {
  const rootIndex = path.join(distDir, 'index.html');
  if (!(await fileExists(rootIndex))) {
    throw new Error('Missing dist/index.html. Run "corepack pnpm run build:pages -- --base /<repo>/" first.');
  }
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  const base = normalizeBase(args.base);

  await ensureDistExists();

  const server = http.createServer(async (request, response) => {
    try {
      const requestUrl = new URL(request.url ?? '/', `http://${request.headers.host ?? 'localhost'}`);
      const resolved = await resolveRequestPath(requestUrl.pathname, base);

      if (!resolved) {
        response.statusCode = 404;
        response.end('Not found');
        return;
      }

      if ('redirect' in resolved) {
        response.statusCode = 302;
        response.setHeader('Location', resolved.redirect);
        response.end();
        return;
      }

      response.statusCode = 200;
      response.setHeader('Content-Type', contentTypeFor(resolved.filePath));

      if (path.extname(resolved.filePath) === '.html') {
        response.setHeader('Cache-Control', 'no-cache');
      }

      createReadStream(resolved.filePath).pipe(response);
    } catch (error) {
      response.statusCode = 500;
      response.setHeader('Content-Type', 'text/plain; charset=utf-8');
      response.end(error instanceof Error ? error.message : String(error));
    }
  });

  server.listen(args.port, () => {
    process.stdout.write(`Previewing dist at http://localhost:${args.port}${base}\n`);
  });
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});