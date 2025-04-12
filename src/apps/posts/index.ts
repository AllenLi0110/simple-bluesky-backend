import { Router } from 'express';
import post from './post';
import { verifyDid } from '@middlewares/verify-did';

const router = Router({});

router.post('/did/:did/posts', verifyDid, ...post);

export default router;
