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

import { ConnectOptions } from 'mongoose';
import pkg from 'mongoose';
import { DatabaseConfig } from '../web/configs/Database.config';
const { connect } = pkg;

export const enableDatabase = async () => {
    const options: ConnectOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as ConnectOptions;
    
    await connect(DatabaseConfig.DATABASE_URL, options).catch((err) => console.log(err));
    console.log('Database is connected!');
}
