import { User } from "@/types/user";

type Fetcher = {
  url: string;
  method: string;
  body: object;
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
}: User) =>
  await fetcher({
    url: "/api/register",
    method: "POST",
    body: { firstName, lastName, password, username, email },
    json: false,
  });

export const signin = async ({ ...props }: User) =>
  await fetcher({
    url: "/api/signin",
    method: "POST",
    body: props,
    json: false,
  });
