import { ApiClient } from "./ApiClient";

export interface User {
  name: string;
  point: number;
  roomId: number;
}

export interface UsersInterface {
  get(userid: number, roomId: number): Promise<User[]>;
  getAll(roomId: number): Promise<User[]>;
}

export class UsersRepository implements UsersInterface {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async get(userId: number, roomId: number) {
    const response = await this.apiClient.get(`/users/${userId}/${roomId}`);
    return response;
  }

  async getAll(roomId: number): Promise<User[]> {
    const response = await this.apiClient.get(`/users/${roomId}`);
    return response;
  }
}
