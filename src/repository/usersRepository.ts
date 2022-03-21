import { ApiClient } from "./ApiClient";

export interface UsersInterface {
  get(userid: Number, roomId: Number): Promise<object>;
}

export class UsersRepository implements UsersInterface {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  // eslint-disable-next-line
  async get(userId: Number, roomId: Number) {
    const response = await this.apiClient.get(`/users/${userId}/${roomId}`);
    return response;
  }
}
