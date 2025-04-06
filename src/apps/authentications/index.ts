import { Router } from 'express';
import signIn from './sign-in';

const router = Router({});

router.post('/authentications/sign-in', ...signIn);

export default router;
