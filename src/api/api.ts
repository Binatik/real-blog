import { Method } from "./api.types";

export class Api {
  private api: "https://blog.kata.academy/api/";

  constructor() {
    this.api = "https://blog.kata.academy/api/";
  }

  private async fetchEndpoint(
    url: string,
    fetchOptions: RequestInit & { method: Method },
  ) {
    try {
      const response = await fetch(`${this.api}${url}`, fetchOptions);

      if (!response.ok) {
        throw new Error(`Error status ${response.status}`);
      }
      return response.json();
    } catch (error) {
      throw new Error("Network error");
    }
  }

  public async get<T>(url: string, fetchOptions: RequestInit): Promise<T> {
    return this.fetchEndpoint(url, { ...fetchOptions, method: "GET" });
  }

  public async post<T>(url: string, fetchOptions: RequestInit): Promise<T> {
    return this.fetchEndpoint(url, { ...fetchOptions, method: "POST" });
  }
}
