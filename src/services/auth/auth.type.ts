type JWTResponseType = {
  token: string;
};

export type AuthLoginRequestType = {
  emailOrUsername: string;
  password: string;
};

export type AuthLoginResponseType = JWTResponseType;

export type AuthRegisterRequestType = {
  email: string;
  username: string;
  password: string;
};

export type AuthRegisterResponseType = JWTResponseType;
