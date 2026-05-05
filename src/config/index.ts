// Application configuration
export const config = {
  apiUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  appName: process.env.NEXT_PUBLIC_APP_NAME || 'My App',
  environment: process.env.NODE_ENV || 'development',
} as const;

