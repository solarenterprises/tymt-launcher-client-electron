export interface IAccount {
  uid: string;
  avatar: string;
  nickName: string;
  password: string;
  sxpAddress: string;
  mnemonic: string;
  rsaPubKey: string;
}

export interface IAccountList {
  list: IAccount[];
}

export interface ISaltToken {
  salt: string;
  token: string;
}
