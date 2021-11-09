import { randomUUID as uuid } from "crypto";

export class User {
  public readonly id!: string;
  public name!: string;
  public email!: string;
  public password!: string;
  public phone!: string;
  public SocialMedias?: {
    readonly id?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };

  constructor(props: Omit<User, "id" | "SocialMedias">, id?: string, socialMediasId?: string) {
    Object.assign(this, props);

    if (!id) {
      this.id = uuid();
    }

    if (!socialMediasId) {
      this.SocialMedias = {
        id: uuid(),
      };
    }
  }
}
