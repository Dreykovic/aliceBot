const env = {
  appState: import.meta.env.VITE_APP_STATE || 'demo',
  baseUrl:
    import.meta.env.VITE_ALICE_PUBLIC_API_URL || 'http://localhost:9000/api/v1',
  baseServerUrl:
    import.meta.env.VITE_ALICE_PUBLIC_SERVER_URL || 'http://localhost:9000/',
};

export default env;
