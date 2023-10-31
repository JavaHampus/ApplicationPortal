/**
 * This project is licensed under the @license MIT
 * Project is created by: hampuiz
 * Project is maintained by: GitHub Contributors
 * 
 * Project is created for:
 * - FiveM Server Owners
 * - FiveM Developers
 * 
 * If you want to contribute to this project, feel free to do so.
 * @file This file is the main file of the project.
 * @version 1.0.0
 * 
 * @see
 * {@link https://github.com/JavaHampus/FiveX-Application}
 * 
 * If you need help with this project, feel free to contact me on Discord.
 */

import { app } from "./web/Server";
import { enableDatabase } from "./database/DatabaseConnection";
import { client } from "./discord/Client";
import { Client } from "./web/configs/Authentication.config";

client.login(Client.TOKEN).catch((err) => console.log(err));
console.log('Discord bot is running!');
    
app.listen(80, () => {
    console.log('Application is running on port 80!');
});

enableDatabase();