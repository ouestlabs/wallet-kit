import { promises as fs } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import type { RegistryItem } from "shadcn/schema";
import { Project, ScriptKind } from "ts-morph";

import { Index } from "@/registry/__index__";

export function getRegistryComponent(name: string) {
  return Index[name]?.component;
}

export async function getRegistryItem(name: string) {
  const item = Index[name];

  if (!item) {
    return null;
  }

  // Convert all file paths to object.
  // TODO: remove when we migrate to new registry.
  item.files = item.files.map((file: unknown) =>
    typeof file === "string" ? { path: file } : file
  );

  // Type assertion for now - TODO: implement proper validation
  const typedItem = item as RegistryItem;

  const files = typedItem.files || [];
  const processedFiles: { path: string; content: string }[] = [];

  for (const file of files) {
    const content = await getFileContent(file);
    const relativePath = path.relative(process.cwd(), file.path);

    processedFiles.push({
      ...file,
      path: relativePath,
      content,
    });
  }

  // Fix file paths.
  const finalFiles = fixFilePaths(processedFiles);

  return {
    ...typedItem,
    files: finalFiles,
  };
}

async function getFileContent(file: { path: string; type?: string }) {
  // Resolve path relative to process.cwd()
  // Paths from index are either "src/registry/default/..." or absolute paths
  const resolvedPath = path.isAbsolute(file.path)
    ? file.path
    : path.join(process.cwd(), file.path);

  const raw = await fs.readFile(resolvedPath, "utf-8");

  const project = new Project({
    compilerOptions: {},
  });

  const tempFile = await createTempSourceFile(file.path);
  const sourceFile = project.createSourceFile(tempFile, raw, {
    scriptKind: ScriptKind.TSX,
  });

  // Remove meta variables.
  // removeVariable(sourceFile, "iframeHeight")
  // removeVariable(sourceFile, "containerClassName")
  // removeVariable(sourceFile, "description")

  let code = sourceFile.getFullText();

  // Some registry items uses default export.
  // We want to use named export instead.
  // TODO: do we really need this? - @shadcn.
  // if (file.type !== "registry:page") {
  //   code = code.replaceAll("export default", "export")
  // }

  // Fix imports.
  code = fixImport(code);

  return code;
}

export function getFileTarget(file: {
  path: string;
  type?: string;
  target?: string;
}) {
  if (file.target) {
    return file.target;
  }

  const fileName = file.path.split("/").pop() ?? "";
  const pathParts = file.path.split("/");
  const isWalletPath = pathParts.includes("wallet");

  switch (file.type) {
    case "registry:component":
      return `components/wallet/${fileName}`;
    case "registry:block":
      return `components/wallet/particles/${fileName}`;
    case "registry:example":
      return `components/wallet/examples/${fileName}`;
    case "registry:ui":
      return isWalletPath
        ? `components/wallet/${fileName}`
        : `components/ui/${fileName}`;
    case "registry:hook":
      return `hooks/${fileName}`;
    case "registry:lib": {
      // Handle chains structure: lib/chains/solana/index.ts -> lib/chains/solana/index.ts
      // Handle other libs: lib/ellipsify.ts -> lib/ellipsify.ts
      const isChainPath = pathParts.includes("chains");
      if (isChainPath) {
        // Extract the path after "lib/"
        const libIndex = pathParts.indexOf("lib");
        if (libIndex !== -1 && libIndex < pathParts.length - 1) {
          const relativePath = pathParts.slice(libIndex + 1).join("/");
          return `lib/${relativePath}`;
        }
      }
      return `lib/${fileName}`;
    }
    default:
      return "";
  }
}

async function createTempSourceFile(filename: string) {
  const dir = await fs.mkdtemp(path.join(tmpdir(), "shadcn-"));
  return path.join(dir, filename);
}

function fixFilePaths(
  files: Array<{
    path: string;
    type?: string;
    target?: string;
    content?: string;
  }>
) {
  if (!files) {
    return [];
  }

  // Resolve all paths relative to the first file's directory.
  const firstFilePath = files[0]?.path;
  const firstFilePathDir = firstFilePath ? path.dirname(firstFilePath) : "";

  return files.map((file) => ({
    ...file,
    path: path.relative(firstFilePathDir, file.path),
    target: getFileTarget(file),
  }));
}

export function fixImport(content: string) {
  // Fix wallet component imports
  const fixed = content.replace(
    /@\/registry\/default\/ui\/wallet\/([\w-]+)/g,
    (_, component) => `@/components/wallet/${component}`
  );

  // Fix lib/chains imports (must come before other lib imports)
  const chainsFixed = fixed.replace(
    /@\/registry\/default\/lib\/chains\/(.+?)(?=["';)\s]|$)/g,
    (_, chainPath) => `@/lib/chains/${chainPath}`
  );

  // Fix other lib imports (ellipsify, utils, etc.)
  const libFixed = chainsFixed.replace(
    /@\/registry\/default\/lib\/([\w-]+)(?=["';)\s]|$)/g,
    (_, libName) => `@/lib/${libName}`
  );

  // Fix hooks imports
  const hooksFixed = libFixed.replace(
    /@\/registry\/default\/hooks\/([\w-]+)(?=["';)\s]|$)/g,
    (_, hookName) => `@/hooks/${hookName}`
  );

  return hooksFixed;
}

export type FileTree = {
  name: string;
  path?: string;
  children?: FileTree[];
};

function addPathToTree(root: FileTree[], filePath: string) {
  const parts = filePath.split("/");
  let currentLevel = root;

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i];
    const isLast = i === parts.length - 1;

    if (isLast) {
      const existing = currentLevel.find((node) => node.name === part);
      if (existing) {
        existing.path = filePath;
      } else {
        currentLevel.push({ name: String(part), path: filePath });
      }
      continue;
    }

    let dir = currentLevel.find((node) => node.name === part);
    if (!dir) {
      dir = { name: String(part), children: [] };
      currentLevel.push(dir);
    }

    if (!dir.children) {
      dir.children = [];
    }

    currentLevel = dir.children;
  }
}

export function createFileTreeForRegistryItemFiles(
  files: Array<{ path: string; target?: string }>
) {
  const root: FileTree[] = [];

  for (const file of files) {
    const filePath = file.target ?? file.path;
    addPathToTree(root, filePath);
  }

  return root;
}
