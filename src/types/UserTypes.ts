export interface IUser {
  _id: string;
  sxpAddress: string;
  publicKey: string;
  nickname: string;
  status: number;
  isDeleted: boolean;
  isAdmin: boolean;
  onlineStatus: boolean;
  notificationStatus: boolean;
  createdAt: Date;
  updatedAt: Date;
}
