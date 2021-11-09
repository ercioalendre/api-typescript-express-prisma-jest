export interface IUserDto {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  SocialMedias?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}
