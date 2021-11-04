export default interface IUserDto {
  id?: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  SocialMedias?: {
    id?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
    youtube?: string;
    linkedin?: string;
  };
}
