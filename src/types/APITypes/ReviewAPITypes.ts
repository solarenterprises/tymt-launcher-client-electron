import { IFeedback } from "../GameTypes";

export interface IReviewAPIFetchReviewsByGameIdResponse {
  msg: string;
  averageStar: number;
  feedbacks: Array<IFeedback>;
  total: number;
  page: string;
  pageSize: string;
}

export interface IReviewAPIAddReviewsRequest {
  author: string; // 6601b44c609740cfa3cebcee
  game_id: string;
  title: string;
  feedback: string;
  star: number;
  isDeleted: boolean;
  isAnonymous: boolean;
}
