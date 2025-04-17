import { Router } from 'express';
import getStatus from './get-status';
import signIn from './sign-in';
import signOut from './sign-out';

const router = Router({});

router.post('/authentications/sign-in', ...signIn);
router.delete('/authentications/sign-out', ...signOut);
router.get('/authentications/status', ...getStatus);

export default router;
