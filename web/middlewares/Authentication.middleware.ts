import { Request, Response, NextFunction } from "express"
import { SessionData } from 'express-session';

interface CustomSessionData extends SessionData {
    user?: string;
}

declare module 'express-session' {
    interface Session extends CustomSessionData {}
}

export const AuthMiddle = async (req: Request, res: Response, next: NextFunction) => {
    if(req.path == "/auth" || req.path == "/auth/callback" || req.path == "/") {
        return next()
    }

    if(!req.session.user) {
         return res.redirect('/auth')
    }

    return next()
}