# Contributing to `wallet/kit`

Thank you for your interest in contributing to `wallet/kit`! This guide will help you understand how to contribute components, examples, particles, hooks, and library utilities to our design system.

## Getting Started

### Prerequisites

- **Bun** >= 1.3.0 (package manager)
- Node.js >= 22
- Git

### Setting Up

1. **Clone the repository:**
   ```bash
   git clone git@github.com:ouestlabs/wallet-kit.git
   cd wallet-kit
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Start the development server:**
   ```bash
   bun run dev
   ```

### Standard Git Workflow

1. **Pull the latest changes:**
   ```bash
   git pull origin main
   ```

2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-name
   ```

3. **Make your changes and commit:**
   ```bash
   git add .
   git commit -m "feat: description of your change"
   ```

4. **Push your branch:**
   ```bash
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request** on [GitHub](https://github.com/ouestlabs/wallet-kit)

## Overview

**wallet/kit** consists of several types of items:

1. **Components** - Wallet-specific components (`provider`, `connect`, `list`, `menu`, etc.)
2. **UI Components** - Core reusable shadcn/ui components (`button`, `dialog`, etc.)
3. **Examples** - Demonstrations of how to use UI components
4. **Particles** - Pre-assembled wallet patterns and composite components
5. **Hooks** - Custom React hooks (`use-wallet`, etc.)
6. **Library** - Utility functions and stores (`utils`, `chains`, etc.)
7. **Themes** - Theme configurations

## Project Structure

```
apps/www/src/registry/
├── default/
│   ├── ui/          # UI components (wallet/ and shadcn/ui)
│   ├── examples/    # Example components
│   ├── particles/   # Particle components
│   ├── hooks/       # Custom React hooks
│   └── lib/         # Library utilities
├── registry-components.ts  # Wallet components registry
├── registry-ui.ts          # UI components registry
├── registry-examples.ts    # Examples registry
├── registry-particles.ts   # Particles registry
├── registry-hooks.ts       # Hooks registry
├── registry-lib.ts         # Library registry
└── registry-themes.ts      # Themes registry
```

## Adding New Examples

Examples are component demonstrations that showcase how to use our UI components.

### Step 1: Create the Example Component

1. Create a new file in `apps/www/src/registry/default/examples/` with a descriptive name:
   ```bash
   touch apps/www/src/registry/default/examples/wallet-connect-demo.tsx
   ```

2. Write your example component:
   ```tsx
   // apps/www/src/registry/default/examples/wallet-connect-demo.tsx
   import { Connect } from "@/registry/default/ui/wallet/connect"

   export default function WalletConnectDemo() {
     return (
       <Connect />
     )
   }
   ```

### Step 2: Add to Registry Examples

Add your example to `apps/www/src/registry/registry-examples.ts`:

```tsx
// apps/www/src/registry/registry-examples.ts
import type { Registry } from "shadcn/schema"

export const examples: Registry["items"] = [
  // ... existing examples
  {
    name: "wallet-connect-demo",
    description: "Wallet connect demo",
    type: "registry:example",
    registryDependencies: ["@wallet-kit/connect"],
    files: [
      { path: "examples/wallet-connect-demo.tsx", type: "registry:example" },
    ],
    categories: ["wallet"],
  },
]
```

**Important fields:**
- `name`: Unique identifier (kebab-case)
- `description`: Concise description
- `type`: Always `"registry:example"`
- `registryDependencies`: Array of registry components used (e.g., `["@wallet-kit/player"]`)
- `files`: Array with the file path
- `categories`: Array of categories for filtering

## Adding New Particles

Particles are pre-assembled components that combine multiple UI components into ready-to-use solutions.

### Step 1: Create the Particle Component

1. Create a new file in `apps/www/src/registry/default/particles/`:
   ```bash
   touch apps/www/src/registry/default/particles/particle-custom-connect.tsx
   ```

2. Write your particle component:
   ```tsx
   // apps/www/src/registry/default/particles/particle-custom-connect.tsx
   import { Connect } from "@/registry/default/ui/wallet/connect"

   export default function ParticleCustomConnect() {
     return (
       <div data-slot="particle-wrapper" className="flex w-full items-center justify-center p-4">
         <Connect />
       </div>
     )
   }
   ```

### Step 2: Add to Particles Index

Add your particle to `apps/www/src/registry/default/particles/index.tsx`:

```tsx
// apps/www/src/registry/default/particles/index.tsx
import ParticleCustomConnect from "./particle-custom-connect"

export const particles: ParticleItem[] = [
  // ... existing particles
  {
    id: "particle-custom-connect",
    component: ParticleCustomConnect,
    category: ["wallet"],
    className: "**:data-[slot=particle-wrapper]:w-full", // Optional
  },
]
```

**ParticleItem properties:**
- `id`: Unique identifier (kebab-case)
- `component`: The component to render
- `category`: Array of categories for filtering
- `className`: Optional CSS classes for the wrapper
- `fullWidth`: Optional boolean for full-width display

### Step 3: Add to Registry Particles

Add your particle to `apps/www/src/registry/registry-particles.ts`:

```tsx
// apps/www/src/registry/registry-particles.ts
import type { Registry } from "shadcn/schema"

export const particles: Registry["items"] = [
  // ... existing particles
  {
    name: "particle-custom-connect",
    description: "Custom wallet connect particle",
    type: "registry:block",
    registryDependencies: ["@wallet-kit/connect", "@wallet-kit/provider"],
    files: [
      { path: "particles/particle-custom-connect.tsx", type: "registry:block" },
    ],
    categories: ["wallet"],
  },
]
```

**Important fields:**
- `name`: Unique identifier (kebab-case)
- `description`: Concise description
- `type`: Always `"registry:block"`
- `registryDependencies`: Array of registry components used
- `files`: Array with the file path
- `categories`: Array of categories for filtering

## Adding New Library Utilities

Library utilities are helper functions and stores that can be used across the project.

### Step 1: Create the Library File

1. Create a new file in `apps/www/src/registry/default/lib/`:
   ```bash
   touch apps/www/src/registry/default/lib/custom-utils.ts
   ```

2. Write your utility:
   ```tsx
   // apps/www/src/registry/default/lib/custom-utils.ts
   export function formatTime(seconds: number): string {
     // Your implementation
   }
   ```

### Step 2: Add to Registry Lib

Add your library item to `apps/www/src/registry/registry-lib.ts`:

```tsx
// apps/www/src/registry/registry-lib.ts
import type { Registry } from "shadcn/schema"

export const lib: Registry["items"] = [
  // ... existing lib items
  {
    name: "custom-utils",
    description: "Custom utility functions",
    type: "registry:lib",
    dependencies: [],
    registryDependencies: [],
    files: [{ path: "lib/custom-utils.ts", type: "registry:lib" }],
    categories: ["lib", "utils"],
  },
]
```

## Adding New Wallet Components

Wallet components are specific to wallet functionality (provider, connect, list, menu, etc.).

### Step 1: Create the Component

1. Create a new file in `apps/www/src/registry/default/ui/wallet/`:
   ```bash
   touch apps/www/src/registry/default/ui/wallet/custom-wallet.tsx
   ```

2. Write your component:
   ```tsx
   // apps/www/src/registry/default/ui/wallet/custom-wallet.tsx
   import { cn } from "@/registry/default/lib/utils"
   import type * as React from "react"

   export function CustomWallet({ className, ...props }: React.ComponentProps<"div">) {
     return <div className={cn("custom-styles", className)} {...props} />
   }
   ```

### Step 2: Add to Registry Components

Add your component to `apps/www/src/registry/registry-components.ts`:

```tsx
// apps/www/src/registry/registry-components.ts
import type { Registry } from "shadcn/schema"

export const components: Registry["items"] = [
  // ... existing components
  {
    name: "custom-wallet",
    type: "registry:component",
    dependencies: [],
    registryDependencies: ["@wallet-kit/provider"],
    files: [
      { path: "ui/wallet/custom-wallet.tsx", type: "registry:component" },
    ],
    categories: ["wallet"],
  },
]
```

## Adding New UI Components

UI components are core reusable shadcn/ui components (button, dialog, etc.).

### Step 1: Create the Component

1. Create a new file in `apps/www/src/registry/default/ui/`:
   ```bash
   touch apps/www/src/registry/default/ui/custom-component.tsx
   ```

2. Write your component following shadcn/ui patterns:
   ```tsx
   // apps/www/src/registry/default/ui/custom-component.tsx
   import { cn } from "@/registry/default/lib/utils"
   import type * as React from "react"

   export function CustomComponent({ className, ...props }: React.ComponentProps<"div">) {
     return <div className={cn("custom-styles", className)} {...props} />
   }
   ```

### Step 2: Add to Registry UI

Add your component to `apps/www/src/registry/registry-ui.ts`:

```tsx
// apps/www/src/registry/registry-ui.ts
import type { Registry } from "shadcn/schema"

export const ui: Registry["items"] = [
  // ... existing components
  {
    name: "custom-component",
    type: "registry:ui",
    dependencies: [],
    registryDependencies: [],
    files: [
      { path: "ui/custom-component.tsx", type: "registry:ui" },
    ],
  },
]
```

## Adding New Hooks

Custom React hooks for wallet functionality and utilities.

### Step 1: Create the Hook

1. Create a new file in `apps/www/src/registry/default/hooks/`:
   ```bash
   touch apps/www/src/registry/default/hooks/use-custom.ts
   ```

2. Write your hook:
   ```tsx
   // apps/www/src/registry/default/hooks/use-custom.ts
   import { useState } from "react"

   export function useCustom() {
     const [state, setState] = useState()
     // Your hook implementation
     return { state, setState }
   }
   ```

### Step 2: Add to Registry Hooks

Add your hook to `apps/www/src/registry/registry-hooks.ts`:

```tsx
// apps/www/src/registry/registry-hooks.ts
import type { Registry } from "shadcn/schema"

export const hooks: Registry["items"] = [
  // ... existing hooks
  {
    name: "use-custom",
    type: "registry:hook",
    dependencies: [],
    registryDependencies: [],
    files: [
      { path: "hooks/use-custom.ts", type: "registry:hook" },
    ],
  },
]
```

## Registry Dependencies

When adding dependencies, use the correct format:

- **Official shadcn/ui components**: Use `@shadcn/` prefix (e.g., `"@shadcn/button"`, `"@shadcn/dialog"`)
- **Wallet components**: Use `@wallet-kit/` prefix (e.g., `"@wallet-kit/connect"`, `"@wallet-kit/provider"`)
- **Library utilities**: Use `@wallet-kit/` prefix (e.g., `"@wallet-kit/context"`, `"@wallet-kit/network"`, `"@wallet-kit/storage"`)
- **Hooks**: Use `@wallet-kit/` prefix (e.g., `"@wallet-kit/use-wallet"`)

Example:
```tsx
registryDependencies: [
  "@wallet-kit/connect",      // Wallet component
  "@wallet-kit/provider",     // Wallet component
  "@wallet-kit/use-wallet",   // Hook
  "@wallet-kit/context",      // Library utility
  "@wallet-kit/network",      // Library utility
  "@shadcn/button",           // Official shadcn/ui
  "@shadcn/dialog",           // Official shadcn/ui
]
```

## Final Steps

After adding your component, run these scripts:

```bash
# Format code and fix linting issues
bun run lint:fix

# Build registry JSON files (runs automatically in apps/www)
cd apps/www
bun run build:registry
```

Or from the root:
```bash
# Run all linting and building
bun run lint:fix
bun run build
```

## Guidelines

### Code Style
- Use TypeScript
- Follow existing naming conventions
- Use meaningful, descriptive names
- Keep components focused and single-purpose
- Use shadcn/ui patterns for UI components

### Categories
- Use categories that correspond to actual components or features
- For composite components, include all relevant categories
- Categories are used for filtering on the particles page

### Descriptions
- Keep descriptions concise but informative
- Focus on what the component does, not how it's implemented
- Descriptions appear in the registry and documentation

### Dependencies
- Be accurate with `dependencies` (npm packages) and `registryDependencies` (registry components)
- These are used for installation and dependency resolution

## Getting Help

- Check existing examples in `apps/www/src/registry/default/examples/` for patterns
- Look at similar components in `apps/www/src/registry/default/ui/` for reference
- Review the [documentation](/apps/www/src/content/docs) for component usage
- Check the [GitHub repository](https://github.com/ouestlabs/wallet-kit) for issues and discussions
- Join discussions in the [GitHub Discussions](https://github.com/ouestlabs/wallet-kit/discussions)

## Commit Message Guidelines

We follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Adding or updating tests
- `chore:` - Maintenance tasks

Example:
```bash
git commit -m "feat: add custom wallet component"
git commit -m "fix: resolve connection issue in provider"
```

Thank you for contributing to `wallet/kit`! 🎉
