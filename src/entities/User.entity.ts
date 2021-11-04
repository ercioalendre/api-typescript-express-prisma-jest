import { randomUUID as uuid } from "crypto";

export class User {
  public readonly id: string;
  public name: string;
  public email: string;
  public password: string;
  public phone: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(props: Omit<User, "id">, id?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }
  }
}
