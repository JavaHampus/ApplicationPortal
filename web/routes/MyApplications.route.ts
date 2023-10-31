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
import { Application } from '../../database/schemas/Application.schema';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    // Get all applications from the database that are made by the user.
    const allApplications = await Application.find({ author: (req.session.user as any).id }).exec();
    
    res.render('myapplications', { user: req.session.user, applications: allApplications });
});

export const MyApplications: Router = router;
