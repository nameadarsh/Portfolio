import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import { handleChatRequest } from './api/lib/chatHandler';

function generateManifest() {
  const contentDir = path.resolve(__dirname, 'public/content');
  const manifestPath = path.join(contentDir, 'manifest.json');
  
  if (!fs.existsSync(contentDir)) {
    fs.mkdirSync(contentDir, { recursive: true });
  }

  const manifest: any = {
    profileImage: null,
    resumes: [],
    certificates: [],
    projects: []
  };

  // 1. Profile Image
  const profileDir = path.join(contentDir, 'profile');
  if (fs.existsSync(profileDir)) {
    const files = fs.readdirSync(profileDir);
    const img = files.find(f => f.match(/\.(png|jpg|jpeg|webp)$/i));
    if (img) manifest.profileImage = `/content/profile/${img}`;
  }

  // 2. Resumes
  const resumeDir = path.join(contentDir, 'resume');
  if (fs.existsSync(resumeDir)) {
    const folders = fs.readdirSync(resumeDir).filter(f => fs.statSync(path.join(resumeDir, f)).isDirectory());
    for (const folder of folders) {
      const folderPath = path.join(resumeDir, folder);
      const files = fs.readdirSync(folderPath);
      const pdf = files.find(f => f.match(/\.pdf$/i));
      if (pdf) {
        manifest.resumes.push({
          type: folder,
          url: `/content/resume/${folder}/${pdf}`
        });
      }
    }
  }

  // 3. Certificates
  const certDir = path.join(contentDir, 'certificates');
  if (fs.existsSync(certDir)) {
    const folders = fs.readdirSync(certDir).filter(f => fs.statSync(path.join(certDir, f)).isDirectory());
    for (const folder of folders) {
      const folderPath = path.join(certDir, folder);
      const metaPath = path.join(folderPath, 'metadata.json');
      if (fs.existsSync(metaPath)) {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        const files = fs.readdirSync(folderPath);
        const pdf = files.find(f => f.match(/\.pdf$/i));
        const img = files.find(f => f.match(/\.(png|jpg|jpeg|webp)$/i));
        
        manifest.certificates.push({
          ...meta,
          id: folder,
          pdf: pdf ? `/content/certificates/${folder}/${pdf}` : null,
          thumbnail: img ? `/content/certificates/${folder}/${img}` : null
        });
      }
    }
  }

  // 4. Projects
  const projDir = path.join(contentDir, 'projects');
  if (fs.existsSync(projDir)) {
    const folders = fs.readdirSync(projDir).filter(f => fs.statSync(path.join(projDir, f)).isDirectory());
    for (const folder of folders) {
      const folderPath = path.join(projDir, folder);
      const metaPath = path.join(folderPath, 'metadata.json');
      if (fs.existsSync(metaPath)) {
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        const files = fs.readdirSync(folderPath);
        const img = files.find(f => f.match(/\.(png|jpg|jpeg|webp)$/i));
        
        manifest.projects.push({
          ...meta,
          id: folder,
          thumbnail: img ? `/content/projects/${folder}/${img}` : null
        });
      }
    }
    manifest.projects.sort(
      (a: { order?: number }, b: { order?: number }) => (a.order ?? 100) - (b.order ?? 100)
    );
  }

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log('✅ Content Manifest generated successfully!');
}

function contentScannerPlugin() {
  return {
    name: 'content-scanner',
    buildStart() {
      generateManifest();
    },
    handleHotUpdate({ file }: { file: string }) {
      if (file.includes('/public/content/') && !file.endsWith('manifest.json')) {
        generateManifest();
      }
    }
  };
}

function chatDevApiPlugin(): Plugin {
  return {
    name: 'chat-dev-api',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/chat')) return next();

        if (req.method === 'OPTIONS') {
          res.statusCode = 204;
          res.setHeader('Access-Control-Allow-Origin', '*');
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
          res.end();
          return;
        }

        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Method not allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        req.on('end', async () => {
          try {
            const body = JSON.parse(Buffer.concat(chunks).toString('utf-8'));
            const response = await handleChatRequest(body);

            res.statusCode = response.status;
            response.headers.forEach((value, key) => {
              if (key.toLowerCase() === 'connection') return;
              res.setHeader(key, value);
            });

            if (!response.body) {
              res.end(await response.text());
              return;
            }

            const reader = response.body.getReader();
            while (true) {
              const { done, value } = await reader.read();
              if (done) break;
              res.write(Buffer.from(value));
            }
            res.end();
          } catch (err) {
            console.error('[chat-dev-api]', err);
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Something went wrong. Please try again.' }));
          }
        });
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.GROQ_API_KEY) {
    process.env.GROQ_API_KEY = env.GROQ_API_KEY;
  }
  if (env.GROQ_MODEL) {
    process.env.GROQ_MODEL = env.GROQ_MODEL;
  }

  return {
    plugins: [react(), contentScannerPlugin(), chatDevApiPlugin()],
  };
});
