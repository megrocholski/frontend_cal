export interface UserData {
  name: string;
  username: string;
  idUser: string;
}
export interface UserDataInput {
  name: string;
  username: string;
  idUser: string;
  password: string;
  confirmPassword: string;
}
export interface UserBack {
  name: string;
  username: string;
  idUser: string;
  exp: number;
  iat: number;
}
