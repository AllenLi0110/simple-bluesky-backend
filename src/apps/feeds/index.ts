import { Router } from 'express';
import listFeeds from './list-feeds';
import { verifyDid } from '@middlewares/verify-did';

const router = Router({});

router.get('/dids/:did/feeds', verifyDid, ...listFeeds);

export default router;
