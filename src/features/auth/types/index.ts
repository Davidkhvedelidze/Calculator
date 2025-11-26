export interface Credentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    email: string;
    name: string;
    roles: string[];
  };
  token: string;
}
