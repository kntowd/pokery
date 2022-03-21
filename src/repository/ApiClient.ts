const environment = process.env.NODE_ENV || "development";

// eslint-disable-next-line import/no-dynamic-require
const { env } = require(`../env/env.${environment}.js`);

export interface ApiClientInterface {
  get(apiPath: string): Promise<{ [key: string]: string }>;
  post(
    apiPath: string,
    requestBody: { [key: string]: string }
  ): Promise<{ [key: string]: string }>;
}

export class ApiClient implements ApiClientInterface {
  async get(apiPath: string) {
    const response = await fetch(`${env.apiBaseUrl}/api${apiPath}`);
    const data = await response.json();
    return data;
  }

  async post(apiPath: string, requestBody: { [key: string]: string }) {
    const response = await fetch(`${env.apiBaseUrl}/api${apiPath}`, {
      method: "POSt",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    const data = await response.json();
    return data;
  }
}
