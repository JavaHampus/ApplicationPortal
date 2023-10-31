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

export const Client = {
    /**
     * @description The client ID of the Discord application.
     */
    CLIENT_ID: "",
    /**
     * @description The client secret of the Discord application.
     */
    CLIENT_SECRET: "",
    /**
     * @description The TOKEN of the Discord application.
     */
    TOKEN: "",
    /**
     * @description The application ID of the Discord application.
     */
    APPLICATION_ID: "",
}

export const Authentication = {
    /**
     * @description The redirect URL of the Discord application.
    */
    REDIRECT: "http://localhost/auth/callback",
    /**
     * @description The scopes of the Discord application.
     */
    SCOPES: ["identify", "guilds"],
};