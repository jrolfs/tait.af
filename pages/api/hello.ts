import { Request, Response } from 'express';

export default (_req: Request, res: Response) => {
  res.statusCode = 200;
  res.json({ name: 'John Doe' });
};
