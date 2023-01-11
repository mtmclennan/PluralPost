import axios from 'axios';
import { Request, Response } from 'express';

const sendBuildHook = async (req: Request, res: Response) => {
  const URL = res.locals.url;

  let message;
  try {
    const response = await axios.post(
      `${URL}/api/revalidate?secret=${process.env.REVALIDATE_TOKEN}`,
      { slug: req.body.slug }
    );

    if (response.status === 200) {
      console.log('BuildHook sent!');
      message = 'success';
    }
  } catch (err) {
    message = 'error';
    console.log(err);
  }
  return message;
};

export default sendBuildHook;
