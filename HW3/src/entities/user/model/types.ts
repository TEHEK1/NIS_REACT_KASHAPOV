export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  phone?: string;
  birthDate?: string;
  address?: UserAddress;
  company?: UserCompany;
}

export interface UserAddress {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  country: string;
}

export interface UserCompany {
  department: string;
  name: string;
  title: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse extends User {
  accessToken: string;
  refreshToken: string;
}
