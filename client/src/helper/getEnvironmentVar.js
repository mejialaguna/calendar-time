export const getEnvironmentVar = (env) => ({
  VITE_API_URL: import.meta.env[env],
});
