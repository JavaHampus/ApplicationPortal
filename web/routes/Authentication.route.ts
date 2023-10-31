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

import { Router, Request, Response } from "express";
import { Authentication, Client } from "../configs/Authentication.config";
import fetch from "node-fetch";
import FormData from 'form-data';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    return res.redirect(`https://discordapp.com/api/oauth2/authorize?client_id=${Client.CLIENT_ID}&redirect_uri=${encodeURIComponent(Authentication.REDIRECT)}&response_type=code&scope=${Authentication.SCOPES.join('%20')}`)
})

router.get('/callback', async (req: Request, res: Response) => {
    const accessCode: any = req.query.code;
    if(!accessCode) return res.send('No access code was provided!');

    const data = new FormData()
    data.append('client_id', Client.CLIENT_ID);
    data.append('client_secret', Client.CLIENT_SECRET);
    data.append('grant_type', 'authorization_code');
    data.append('redirect_uri', Authentication.REDIRECT);
    data.append('scope', Authentication.SCOPES.join(' '));
    data.append('code', accessCode);

    try {
        const response = await fetch('https://discordapp.com/api/oauth2/token', {
            method: 'POST',
            body: data
        });

        const json = await response.json();

        const userResponse = await fetch(`https://discordapp.com/api/users/@me`, {
            headers: {
                Authorization: `${json['token_type']} ${json['access_token']}`
            }
        });

        const userJson = await userResponse.json();

        req.session.user = userJson;
        (req.session.user as any).avatar = userJson.avatar ? `https://cdn.discordapp.com/avatars/${userJson.id}/${userJson.avatar}.png` : 'https://cdn.discordapp.com/embed/avatars/0.png';
        req.session.save();

        return res.redirect('/departments');
    } catch (e) {
        console.log(e);
        return res.send('An error occurred while trying to authenticate!');
    }
})

export const AuthenticationRoute: Router = router;