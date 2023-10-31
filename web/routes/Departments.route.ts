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
 * @file This file is the main file of the project.
 * 
 * @see
 * {@link https://github.com/JavaHampus/FiveX-Application}
 * 
 * If you need help with this project, feel free to contact me on Discord.
 */

import { Router, Request, Response } from 'express';
import { Departments } from '../configs/Departments.config';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.render('departments', { departments: Departments });
});

export const DepartmentsRoute: Router = router;

