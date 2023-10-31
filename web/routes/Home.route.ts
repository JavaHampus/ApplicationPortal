/**
 * This project is licensed under the MIT license.
 * Project is created by: hampuiz
 * Project is maintained by: GitHub Contributors
 * 
 * Project is created for:
 * - FiveM Server Owners
 * - FiveM Developers
 * 
 * If you want to contribute to this project, feel free to do so.
 * 
 * @see
 * {@link https://github.com/JavaHampus/FiveX-Application}
 * 
 * If you need help with this project, feel free to contact me on Discord.
 */

import { Router, Request, Response } from 'express';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.render('home');
});

export const HomeRoute: Router = router;
