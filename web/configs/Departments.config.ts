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


export const ApplicationSettings = {
    /**
     * @type {string}
     * @description The base URL of the application.
     */
    baseUrl: "http://localhost:80",
    /**
     * @type {string}
     * @description The ID of the guild.
     */
    guildId: "",
    /**
     * @type {boolean}
     * @description Allow multiple applications per user.
     */
    allowMultipleApplications: true,
    /**
     * @type {boolean}
     * @description Notify the applicant when their application is accepted.
     */
    notifyOnAccepted: true,
    /**
     * @type {boolean}
     * @description Notify the applicant when their application is denied.
     */
    notifyOnDenied: true,
    /**
     * @type {boolean}
     * @description Log the accepted/denied applications in a channel.
     */
    logAcceptedAndDenied: true,
    /**
     * @type {string}
     * @description The channel ID of the application logs channel
     */
    applicationLogs: "",
}

export const Departments = [
    {
        /**
         * @type {string}
         * @description The name of the department
         * @example 'Los Santos Police Department'
         */
        name: 'Los Santos Police Department',
        /**
         * @type {string}
         * @description The ID of the department, this will be used in the URL.
         * @example 'lspd'
         */
        id: 'lspd',
        /**
         * @type {string}
         * @description The channel ID of the application logs channel
         * @example '123456789012345678'
         */
        applicationLogs: "",
        /**
         * @type {string}
         * @description The role ID of the application review role, this role will be able to review applications.
         * @example '123456789012345678'
         */
        reviewRole: "",
        /**
         * @type {string}
         * @description The role ID of the application accepted role, this role will be given to the applicant when their application is accepted.
         * @example '123456789012345678'
         */
        acceptedRole: "",
        /**
         * @type {string}
         * @description The image of the department that will be displayed on the application page.
         */
        departmentImage: 'https://cdn.discordapp.com/attachments/1160957812256551035/1167914249721495673/Nytt_projekt_24.png?ex=654fdbe7&is=653d66e7&hm=ded682fd581f3ca0c34c729327e423a145c8e9d02fafbea8a22104b848c3a9a1&',
        /**
         * @type {string}
         * @description The embed color of the department that will be displayed on the discord embeds.
         * @example '#000000'
         */
        departmentColor: '#7095c4',
        /**
         * @type {Array<object>}
         * @description The questions that will be displayed on the application page. Short answer questions should be first, then long answer questions.
         */
        applicationQuestions: [
            {
                title: 'What is your name?',
                description: 'Please enter your name here.',
                type: 'short'
            },
            {
                title: 'Why do you want to join the Los Santos Police Department?',
                description: 'Please enter your answer here.',
                type: 'long'
            }
        ]   
    },
    {
        /**
         * @type {string}
         * @description The name of the department
         * @example 'Blaine County Sheriff Department'
         */
        name: 'Blaine Sheriff Department',
        /**
         * @type {string}
         * @description The ID of the department, this will be used in the URL.
         * @example 'bcso'
         */
        id: 'bcso',
        /**
         * @type {string}
         * @description The channel ID of the application logs channel
         * @example '123456789012345678'
         */
        applicationLogs: "",
        /**
         * @type {string}
         * @description The role ID of the application review role, this role will be able to review applications.
         * @example '123456789012345678'
         */
        reviewRole: "",
        /**
         * @type {string}
         * @description The role ID of the application accepted role, this role will be given to the applicant when their application is accepted.
         * @example '123456789012345678'
         */
        acceptedRole: "",
        /**
         * @type {string}
         * @description The image of the department that will be displayed on the application page.
         */
        departmentImage: 'https://cdn.discordapp.com/attachments/1160957812256551035/1167913227032735814/Nytt_projekt_23.png?ex=654fdaf4&is=653d65f4&hm=6d912ea6044ad1f7b6174b8273cb2d759d3888374422bdb8123995a08a7a8ee2&&',
        /**
         * @type {string}
         * @description The embed color of the department that will be displayed on the discord embeds.
         * @example '#000000'
         */
        departmentColor: '#4fe3ca',
        /**
         * @type {Array<object>}
         * @description The questions that will be displayed on the application page. Short answer questions should be first, then long answer questions.
         */
        applicationQuestions: [ 
            {
                title: 'What is your name?',
                description: 'Please enter your name here.',
                type: 'short'
            },
            {
                title: 'What is your age?',
                description: 'Please enter your name here.',
                type: 'short'
            },
            {
                title: 'Why do you want to join the Los Santos Police Department?',
                description: 'Please enter your answer here.',
                type: 'long'
            }
        ]   
    }
];