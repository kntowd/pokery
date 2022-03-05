const environment = process.env.NODE_ENV || "development";

// eslint-disable-next-line
const { env } = require(`../env/env.${environment}.js`);

const { apiBaseUrl } = env;

const apiClient = async (apiPath: string) => {
  const response = await fetch(`${apiBaseUrl}/api${apiPath}`);
  const data = await response.json();
  return data;
};

export default apiClient;
