import { NextApiRequest, NextApiResponse } from "next";
import { db } from "@/lib/db";

export const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const user = await db.user.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (!user) {
    res.status(401);
    res.json({ error: "User not exist" });
    return;
  }

  res.status(200).json(user);
};
