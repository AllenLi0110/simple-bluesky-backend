import { Router } from 'express';
import followTask from './follow-task';
import likeTask from './like-task';
import postTask from './post-task';
import status from './status';

const router = Router({});

router.post('/queue/post', ...postTask);
router.post('/queue/follow', ...followTask);
router.post('/queue/like', ...likeTask);
router.get('/queue/status', ...status);

export default router;
