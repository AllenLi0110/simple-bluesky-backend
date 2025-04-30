import { Router } from 'express';
import createPost from './create-post';
import deletePost from './delete-post';
import { verifyDid } from '@middlewares/verify-did';

const router = Router({});

router.post('/dids/:did/posts', verifyDid, ...createPost);
router.delete('/dids/:did/posts/:rkey', verifyDid, ...deletePost);

export default router;
