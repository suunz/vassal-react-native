export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignUpData extends AuthCredentials {
  name: string;
  confirmPassword: string;
}