import { ApiClient } from "./ApiClient";

export interface Room {
  id: number;
  createdAt: string;
  updatedAt: string;
  revealed: boolean;
}

export interface RoomsInterface {
  get(roomId: number): Promise<Room>;
}

export class RoomsRepository implements RoomsInterface {
  private apiClient: ApiClient;

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
  }

  async get(roomId: number) {
    const response = await this.apiClient.get(`/rooms/${roomId}`);
    return response;
  }

  async post() {
    const response = await this.apiClient.post("/rooms");
    return response;
  }
}
