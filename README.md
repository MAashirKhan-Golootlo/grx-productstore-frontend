# Frontend Project

A scalable Next.js frontend application built with TypeScript, TailwindCSS, Shadcn UI, Redux, and Yup Validator.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Component library
- **Redux Toolkit** - State management
- **Yup** - Schema validation
- **React Hook Form** - Form management

## Project Structure

```
frontend/
├── app/                    # Next.js routes
│   ├── layout.tsx
│   ├── page.tsx
│   └── [other routes]/
│
└── src/                    # All source code
    ├── components/
    │   ├── ui/            # Shadcn UI components
    │   ├── common/        # Common components
    │   └── layout/        # Layout components
    │
    ├── features/          # Feature-based modules
    │   └── auth/
    │       ├── components/
    │       ├── pages/
    │       ├── hooks/
    │       ├── types/
    │       ├── utils/
    │       └── index.ts
    │
    ├── types/             # TypeScript types
    ├── hooks/             # Global hooks
    ├── redux/             # Redux store and configuration
    ├── lib/               # Utilities and API
    ├── constants/         # Application constants
    ├── config/            # Configuration
    └── styles/            # Global styles
```

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_APP_NAME=My App
```

## Code Quality

This project uses:

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Commitlint** - Commit message linting
- **TypeScript** - Type checking

## Contributing

1. Follow the feature-based architecture
2. Use TypeScript for all new files
3. Follow the existing code style
4. Write meaningful commit messages following conventional commits
