export interface ApiClientInterface {
  get(apiPath: string): Promise<{ [key: string]: string }>;
  post(
    apiPath: string,
    requestBody: { [key: string]: string }
  ): Promise<{ [key: string]: string }>;
}

export class ApiClient {
  private env: { [key: string]: string };

  constructor(env: { [key: string]: string }) {
    this.env = env;
  }

  async get(apiPath: string) {
    const response = await fetch(`${this.env.apiBaseUrl}/api${apiPath}`);
    const data = await response.json();
    console.log(data);
    return data;
  }

  async post(apiPath: string, requestBody?: { [key: string]: string }) {
    const response = await fetch(`${this.env.apiBaseUrl}/api${apiPath}`, {
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
