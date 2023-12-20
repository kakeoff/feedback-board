export interface AuthDto {
  email: string;
  password: string;
}

export interface RegisterDto extends AuthDto {
  fullName: string;
  avatarUrl: string;
}
