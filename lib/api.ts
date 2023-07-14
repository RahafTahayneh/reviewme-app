import { User } from "@/types/user";

type Fetcher = {
  url: string;
  method: string;
  body?: any;
  json: boolean;
};

const fetcher = async ({ url, method, body, json = true }: Fetcher) => {
  const res = await fetch(url, {
    method,
    body: body && JSON.stringify(body),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("API Error");
  }

  if (json) {
    const data = await res.json();
    return data;
  }
};

export const register = async ({
  firstName,
  lastName,
  password,
  username,
  email,
}) =>
  await fetcher({
    url: "/api/register",
    method: "POST",
    body: { firstName, lastName, password, username, email },
    json: false,
  });

export const signin = async ({ ...props }) =>
  await fetcher({
    url: "/api/signin",
    method: "POST",
    body: props,
    json: false,
  });

export const getAllReviews = async () =>
  await fetcher({
    url: "/api/review?type=all",
    method: "GET",
    json: false,
  });

export const getReviewById = async (id: string) =>
  await fetcher({
    url: `/api/review?type=byId&id=${id}`,
    method: "GET",
    json: false,
  });

export const getUserReviews = async () =>
  await fetcher({
    url: `/api/review?type=user`,
    method: "GET",
    json: false,
  });

export const getUser = async (id: string) =>
  await fetcher({
    url: `/api/user`,
    method: "GET",
    body: { id },
    json: false,
  });

export const updateReviewById = async ({
  id,
  title,
  feedback,
}: {
  id: string;
  title: string;
  feedback: string;
}) =>
  await fetcher({
    url: `/api/review`,
    method: "PUT",
    body: { id, title, feedback },
    json: false,
  });

export const createNewReview = async ({
  title,
  feedback,
  productName,
  productLink,
  storeName,
  imageId,
  customStore,
  rate,
  storeProductId,
}: {
  title: string;
  feedback: string;
  productName: string;
  productLink: string;
  storeName: string;
  imageId: string;
  customStore: string;
  rate: number;
  storeProductId?: string;
}) =>
  await fetcher({
    url: `/api/review`,
    method: "POST",
    body: {
      title,
      feedback,
      productName,
      storeName,
      productLink,
      imageId,
      customStore,
      rate,
      storeProductId,
    },
    json: false,
  });

export const uploadImage = async (formData: FormData) =>
  await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });
