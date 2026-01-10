import esbuild from 'esbuild';
import { builtinModules } from 'module';

esbuild.build({
    entryPoints: ['src/electron/main.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outdir: 'dist/electron',
    sourcemap: true,

    // IMPORTANT for Electron
    external: [
        ...builtinModules,
        ...builtinModules.map(m => `node:${m}`),
        'electron',
        'mysql2',
    ],
}).catch(() => process.exit(1));
