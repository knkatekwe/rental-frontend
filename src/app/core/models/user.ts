
export class Role {
  id: number;
  name: string
}

export class User {
  id: number;
  username: string;
  email: string;
  phoneNumber: string;
  walletAddress?: string;
}

export class UserObject{
  jwt: string
  username: string;
  email: string;
  phoneNumber: string;
  walletAddress?: string;
}
