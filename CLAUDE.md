# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using Turborepo with pnpm workspaces. It contains:
- **apps/api**: NestJS GraphQL API server
- **apps/web**: React + Vite frontend with TanStack Router
- **packages/database**: Prisma ORM with MySQL database
- **packages/codegen**: GraphQL code generation
- **packages/ui**: Shared UI components
- **packages/tsconfig**: Shared TypeScript configurations

## Essential Commands

### Development
```bash
# Start all services in development mode
pnpm dev

# Start specific services
pnpm api dev    # API server only
pnpm web dev    # Web frontend only

# Database management
pnpm database generate  # Generate Prisma client
pnpm database migrate   # Run database migrations
pnpm database studio    # Open Prisma Studio
pnpm database reset     # Reset database
pnpm database seed      # Seed database

# Code generation
pnpm codegen generate   # Generate GraphQL types
```

### Build & Validation
```bash
# Build all packages
pnpm build

# Linting and type checking
pnpm lint           # Run Biome linter across all packages
pnpm check-types    # Run TypeScript type checking

# Format code
pnpm format         # Format all files with Prettier
```

### Testing
Check individual package.json files for testing commands - no global test command is configured.

## Environment Configuration

1. Copy `.env.example` to `.env` and configure:
   - Database connection (`DATABASE_URL`)
   - JWT secrets (`JWT_SECRET_KEY`, `JWT_SECRET_APP`)
   - S3/R2 bucket credentials
   - SMTP API key (Resend)
   - GraphQL endpoints for Vite

2. Database runs in Docker: `docker-compose up -d` (PostgreSQL with Bitnami image)

## Architecture Overview

### API Layer (NestJS)
- GraphQL API with Apollo Server
- JWT authentication
- Prisma ORM for database access
- S3/R2 integration for file storage
- Email service with Resend

### Web Frontend (React + Vite)
- TanStack Router for routing with file-based routes
- Apollo Client for GraphQL
- Tailwind CSS v4 for styling
- React Hook Form + Zod for forms
- Jotai for state management

### Database (PostgreSQL + Prisma)
- PostgreSQL running in Docker (Bitnami image)
- Prisma schema at `packages/database/prisma/schema.prisma`
- Generated client exports from `@ordones/database/generated`

## Code Style

- Biome for linting and formatting (config in `biome.json`)
- 2 spaces indentation
- Single quotes for JavaScript/TypeScript
- No semicolons (ASI)
- ES5 trailing commas