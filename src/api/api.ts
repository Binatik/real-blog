import { Method } from "./api.types";
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Z…xNTJ9.CLB3NVauBhZci6TbWuLi03hhUjYOzIFHXYstFZQ3cyQ

// {username: 'serega111111',
// email: 'sss@mal.ru',
// token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1Z…xNTJ9.CLB3NVauBhZci6TbWuLi03hhUjYOzIFHXYstFZQ3cyQ'
export class Api {
  private api: "https://blog.kata.academy/api";

  constructor() {
    this.api = "https://blog.kata.academy/api";
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

  public async put<T>(url: string, fetchOptions: RequestInit): Promise<T> {
    return this.fetchEndpoint(url, { ...fetchOptions, method: "PUT" });
  }

  public async delete<T>(url: string, fetchOptions: RequestInit): Promise<T> {
    return this.fetchEndpoint(url, { ...fetchOptions, method: "DELETE" });
  }
}
