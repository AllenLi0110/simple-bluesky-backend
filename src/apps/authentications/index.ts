import { Router } from 'express';
import signIn from './sign-in';
import signOut from './sign-out';

const router = Router({});

router.post('/authentications/sign-in', ...signIn);
router.post('/authentications/sign-out', ...signOut);

export default router;
