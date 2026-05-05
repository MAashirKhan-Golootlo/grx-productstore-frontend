module.exports = {
  rules: {
    'app/**': {
      allowed: ['layout.tsx', 'page.tsx', 'loading.tsx', 'error.tsx', 'not-found.tsx', 'route.ts', 'template.tsx', 'default.tsx'],
      disallowed: ['*.js', '*.jsx'],
    },
    'src/components/ui/**': {
      allowed: ['*.tsx', '*.ts'],
    },
    'src/components/common/**': {
      allowed: ['*.tsx', '*.ts'],
    },
    'src/components/layout/**': {
      allowed: ['*.tsx', '*.ts'],
    },
    'src/features/**': {
      allowed: ['components/**', 'pages/**', 'hooks/**', 'types/**', 'utils/**', 'index.ts'],
    },
    'src/types/**': {
      allowed: ['*.ts'],
    },
    'src/hooks/**': {
      allowed: ['*.ts', '*.tsx'],
    },
    'src/redux/**': {
      allowed: ['hooks/**', 'providers/**', 'store/**', 'index.ts'],
    },
    'src/lib/**': {
      allowed: ['api/**', 'validation/**', 'utils/**'],
    },
  },
};

