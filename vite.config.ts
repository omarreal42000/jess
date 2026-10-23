import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import express from 'express';
import {defineConfig, Plugin} from 'vite';

function saveMemoriesPlugin(): Plugin {
  return {
    name: 'save-memories-plugin',
    configureServer(server) {
      server.middlewares.use(express.json({ limit: '15mb' }));

      server.middlewares.use((req: any, res, next) => {
        if (req.url && req.url.startsWith('/api/save-memories')) {
          if (req.method === 'POST') {
            try {
              const { memories, letterData } = req.body || {};
              if (!memories || !Array.isArray(memories)) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: 'memories array is required' }));
                return;
              }

              const targetPath = path.resolve(__dirname, 'src/data/initialMemories.ts');

              // Photos list
              const existingPhotos = [
                '/assets/aistudio/jess13_ad180d37.jpg',
                '/assets/aistudio/jess12_85a1a381.jpg',
                '/assets/aistudio/jess9_68ce4276.jpg',
                '/assets/aistudio/jess2_c6721b3c.jpg',
                '/assets/aistudio/jess6_0428721e.jpg',
                '/assets/aistudio/jess3_e90783af.jpg',
                '/assets/aistudio/jess14_4bb33e28.jpg',
                '/assets/aistudio/jess4_7d843509.jpg',
                '/assets/aistudio/jess16_2666fdf9.jpg',
                '/assets/aistudio/jess20_21a483ff.jpg',
                '/assets/aistudio/jess19_a02ea029.jpg',
                '/assets/aistudio/jess23_f4b16d3a.jpg',
                '/assets/aistudio/jess7_73770d99.jpg',
                '/assets/aistudio/jess8_aca7e7fe.jpg',
                '/assets/aistudio/jess18_c68bb516.jpg',
                '/assets/aistudio/jess17_40f1010b.jpg',
                '/assets/aistudio/jess11_5b09cd2f.jpg',
                '/assets/aistudio/jess15_9ab0c00b.jpg',
                '/assets/aistudio/imagen_2026-10-23_000802387_c51f9a34.png',
                '/assets/aistudio/jess1.jpg'
              ];

              memories.forEach((m: { image?: string }) => {
                if (m.image && !existingPhotos.includes(m.image)) {
                  existingPhotos.push(m.image);
                }
              });

              const code = `import { Memory } from '../types/galaxy';

export const AVAILABLE_PHOTOS = ${JSON.stringify(existingPhotos, null, 2)};

export const INITIAL_MEMORIES: Memory[] = ${JSON.stringify(memories, null, 2)};

export const INITIAL_DEDICATION_LETTER = ${JSON.stringify(letterData || {}, null, 2)};
`;

              fs.writeFileSync(targetPath, code, 'utf-8');

              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: true, count: memories.length }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message || 'Error saving memories' }));
            }
          } else {
            res.statusCode = 405;
            res.end('Method Not Allowed');
          }
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), saveMemoriesPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
