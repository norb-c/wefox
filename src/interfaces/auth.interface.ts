export interface RequestUser {
  _id: string;
  email: string;
}

export interface IAuthorization {
  user: RequestUser;
}

export interface SignInProps {
  email: string;
  password: string;
}

export interface SignUpProps {
  email: string;
  password: string;
}

export interface SignInResponse {
  email: string;
  accessToken: string;
}

export interface IAuthService {
  login(requestBody: SignInProps): Promise<SignInResponse>;
  register(requestBody: SignUpProps): Promise<SignInResponse>;
}
