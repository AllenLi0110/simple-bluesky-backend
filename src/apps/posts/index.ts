import { Router } from 'express';
import createPost from './create-post';
import { verifyDid } from '@middlewares/verify-did';

const router = Router({});

router.post('/dids/:did/posts', verifyDid, ...createPost);

export default router;
