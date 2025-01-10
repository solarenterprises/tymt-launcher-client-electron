export interface ISupportCurrency {
  name: string;
  icon: string;
  symbol: string;
}

export interface ICurrentCurrency {
  currency: string;
}

export interface IReserve {
  currency: string;
  reserve: number;
}

export interface IReserveList {
  list: IReserve[];
}

export interface ICurrencyAPIFetchReserveListResponse {
  _id: string;
  currency_id: string;
  rate: Number;
}
