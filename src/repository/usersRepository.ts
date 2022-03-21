export interface UsersInterface {
  get(userid: Number, roomId: Number): Promise<object>;
}

export class UsersRepository implements UsersInterface {
  // eslint-disable-next-line
  async get(userId: Number, roomId: Number) {
    const response = await fetch(
      `http://localhost:8080/api/users/${userId}/${roomId}`
    );
    const data = await response.json();
    return data;
  }
}
