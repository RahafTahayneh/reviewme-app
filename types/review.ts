import { User } from "./user";

export type Review = {
  id: string;
  title: string;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
  rate: string;
  belongsToId: string;
  productName: string;
  productLink: string;
  image: ReviewImage;
  storeProductId?: string;
  storeName: string;
  user: User;
};

type ReviewImage = {
  id: string;
  format: string;
  publicId: string;
  version: string;
};
