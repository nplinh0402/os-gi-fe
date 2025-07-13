export interface User {
  id?: number;
  code: string;
  name: string;
  username: string;
  password: string;
  email?: string;
  created_at: number;
  lastLogin?: number;
  //   access_token?: string;
  //   refreh_token?: string;
  //   email: string;
}
