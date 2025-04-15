import { Router } from 'express';
import signIn from './sign-in';
import signOut from './sign-out';
import status from './status';

const router = Router({});

router.post('/authentications/sign-in', ...signIn);
router.delete('/authentications/sign-out', ...signOut);
router.get('/authentications/status', ...status);

export default router;
