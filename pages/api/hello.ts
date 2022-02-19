// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextApiRequest, NextApiResponse } from 'next';

const handler = (_: NextApiRequest, res: NextApiResponse): void => {
  res.status(200).json({ name: 'John Doe' });
};

export default handler;
