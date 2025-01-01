const env = {
  appState: import.meta.env.VITE_APP_STATE || 'demo',
  baseUrl:
    import.meta.env.VITE_ALICE_PUBLIC_API_URL ||
    'https://alicebot.online/api/v1',
  baseServerUrl:
    import.meta.env.VITE_ALICE_PUBLIC_SERVER_URL || 'https://alicebot.online/',
};

export default env;
