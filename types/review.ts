import { User } from "./user";

export type Review = {
  id: string;
  title: string;
  feedback: string;
  createdAt: Date;
  updatedAt: Date;
  rate: string;
  belongsToId: string;
  productId: string;
  user: User;
  product: Product;
};

type Product = {
  id: string;
  name: string;
  images: string[];
  storeProductId: string;
  link: string;
  storeName: string;
};
