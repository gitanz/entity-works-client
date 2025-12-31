import esbuild from 'esbuild';

esbuild.build({
    entryPoints: ['src/electron/main.ts'],
    bundle: true,
    platform: 'node',
    format: 'esm',
    target: 'node18',
    outdir: 'dist/electron',
    sourcemap: true,

    // IMPORTANT for Electron
    external: ['electron'],
}).catch(() => process.exit(1));
