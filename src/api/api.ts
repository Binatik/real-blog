import { Method } from "./api.types";
import { ApiError, ResponseError } from "./Error";

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
      //result Any но он не требуется к типизации в данном кейсе это обходится иначе!
      const result = await response.json();

      if (!response.ok) {
        throw new ResponseError(result);
      }
      return result;
    } catch (error) {
      if (error instanceof ResponseError) {
        throw new ApiError(error);
      } else if (error instanceof Error) {
        throw new Error("Network error");
      }
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
