import esbuild from "esbuild";

esbuild
  .build({
    entryPoints: ["./src/index.ts"],
    bundle: true,
    platform: "node",
    target: "node20",
    sourcemap: true,
    outdir: "./dist",
    minify: true,
    treeShaking: true,
    tsconfig: "tsconfig.json",
  })
  .catch(() => process.exit(1));
