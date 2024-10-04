const env = {
  appState: import.meta.env.VITE_APP_STATE || 'demo',
  baseUrl:
    import.meta.env.VITE_ALICE_PUBLIC_API_URL || 'http://localhost:9000/api/v1',
};

console.log(env);

export default env;
