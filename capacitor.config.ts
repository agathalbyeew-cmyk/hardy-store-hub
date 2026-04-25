import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.7a48ea8a5af447fc8732ad0d94c0f1a0',
  appName: 'Hardy Store',
  webDir: 'dist',
  server: {
    url: 'https://7a48ea8a-5af4-47fc-8732-ad0d94c0f1a0.lovableproject.com?forceHideBadge=true',
    cleartext: true,
  },
  ios: {
    contentInset: 'always',
  },
  android: {
    backgroundColor: '#0a0814',
  },
};

export default config;
