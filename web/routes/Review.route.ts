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
import { Departments, ApplicationSettings } from '../configs/Departments.config';
import { Application } from '../../database/schemas/Application.schema';
import { EmbedBuilder, TextChannel } from 'discord.js';
import { client } from '../../discord/Client';

/**
 * Checks if a user is allowed to review applications for the department.
 * @param clientId The client ID of the user.
 * @param roleId The role ID of the role to check.
 * @returns 
 */
const isAllowedToReview = (clientId: string, roleId: string) => {
    const guild = client.guilds.cache.get(ApplicationSettings.guildId);
    if(!guild) return false;
    const member = guild.members.cache.get(clientId);
    if(!member) return false;
    if(member.roles.cache.has(roleId)) return true;
    return false;
}

const router: Router = Router();

router.get('/:department', async (req: Request, res: Response) => {
    const departmentString: string = req.params.department as string;
    if(!departmentString) return res.redirect('/departments');

    const departmentObject = Departments.find(department => department.id === departmentString);
    if(!departmentObject) return res.redirect('/departments');

    if(!isAllowedToReview((req.session.user as any).id, departmentObject.reviewRole)) {
        return res.redirect('/departments');
    }

    const allApplicationsForDepartment = await Application.find({ department: departmentString, status: 'Pending' }).exec();

    res.render('review', { user: req.session.user, applications: allApplicationsForDepartment });
});

router.get('/view/:applicationId', async (req: Request, res: Response) => {
    const applicationId: string = req.params.applicationId as string;
    if(!applicationId) return res.redirect('/departments');

    const application = await Application.findOne({ applicationId: applicationId }).exec();
    if(!application) return res.redirect('/departments');

    const departmentObject = Departments.find(department => department.id === application.department);
    if(!departmentObject) return res.redirect('/departments');

    if(!isAllowedToReview((req.session.user as any).id, departmentObject.reviewRole)) return res.redirect('/departments');

    res.render('view', { application: application });
});

router.post('/accept/:applicationId', async (req: Request, res: Response) => {
    const applicationId: string = req.params.applicationId as string;
    if(!applicationId) return res.redirect('/departments');

    const application = await Application.findOne({ applicationId: applicationId });
    if(!application) return res.redirect('/departments');

    const departmentObject = Departments.find(department => department.id === application.department);
    if(!departmentObject) return res.redirect('/departments');

    if(!isAllowedToReview((req.session.user as any).id, departmentObject.reviewRole)) return res.redirect('/departments');

    application.status = 'Accepted';
    application.reviewedBy = (req.session.user as any).username;
    application.updatedAt = new Date();
    await application.save();

    const applicationChannel = client.channels.cache.get(departmentObject.applicationLogs) as TextChannel;
    if(!applicationChannel) return console.error(`Channel ${departmentObject.applicationLogs} does not exist.`);

    await applicationChannel.send(`<@${application.author}> has been accepted into ${departmentObject.name}!`);

    const guild = client.guilds.cache.get(ApplicationSettings.guildId);
    if(!guild) return console.error(`Guild ${ApplicationSettings.guildId} does not exist.`)
    const member = guild.members.cache.get(application.author);

    if(ApplicationSettings.notifyOnAccepted) {
        const user = client.users.cache.get(application.author);
        if(!user) return console.error(`User ${application.author} does not exist.`);

        const notificationEmbed = new EmbedBuilder()
            .setAuthor({ name: `Application Accepted`, iconURL: (req.session.user as any).avatar })
            .setDescription(`Your application for ${departmentObject.name} has been accepted.`)
            .setColor('#73eb95')
            .setFooter({ text: `FiveX Application, developed by hampuiz` })

        try {
            await user.send({ embeds: [notificationEmbed] });
        } catch(e) {
            console.log(e);
        }
    }

    if(ApplicationSettings.logAcceptedAndDenied) {
        const logChannel = client.channels.cache.get(ApplicationSettings.applicationLogs) as TextChannel;

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: `Application Accepted`, iconURL: (req.session.user as any).avatar })
            .setDescription(`A new application has been accepted.`)
            .addFields({
                name: 'Department',
                value: departmentObject.name,
                inline: true
            }, {
                name: 'Applicant',
                value: `<@${application.author}>`,
                inline: true
            }, {
                name: 'Accepted By',
                value: `${req.session.user && typeof req.session.user === 'object' ? (req.session.user as any).username : 'Unknown'}`,
                inline: true
            })
            .setColor('#73eb95')
            .setFooter({ text: `FiveX Application, developed by hampuiz` })

        await logChannel.send({ embeds: [logEmbed] });
    }

    member?.roles.add(departmentObject.acceptedRole);
});

router.post('/deny/:applicationId', async (req: Request, res: Response) => {
    const applicationId: string = req.params.applicationId as string;
    if(!applicationId) return res.redirect('/departments');

    const application = await Application.findOne({ applicationId: applicationId });
    if(!application) return res.redirect('/departments');

    const departmentObject = Departments.find(department => department.id === application.department);
    if(!departmentObject) return res.redirect('/departments');

    if(!isAllowedToReview((req.session.user as any).id, departmentObject.reviewRole)) return res.redirect('/departments');

    const applicationChannel = client.channels.cache.get(departmentObject.applicationLogs) as TextChannel;
    if(!applicationChannel) return console.error(`Channel ${departmentObject.applicationLogs} does not exist.`);

    await applicationChannel.send(`<@${application.author}> has been denied from ${departmentObject.name}!`);

    if(ApplicationSettings.notifyOnDenied) {
        const user = client.users.cache.get(application.author);
        if(!user) return console.error(`User ${application.author} does not exist.`);

        const notificationEmbed = new EmbedBuilder()
            .setAuthor({ name: `Application Denied`, iconURL: (req.session.user as any).avatar })
            .setDescription(`Your application for ${departmentObject.name} has been denied.`)
            .setColor('#e87272')
            .setFooter({ text: `FiveX Application, developed by hampuiz` })

        try {
            await user.send({ embeds: [notificationEmbed] });
        } catch(e) {
            console.log(e);
        }
    }

    if(ApplicationSettings.logAcceptedAndDenied) {
        const logChannel = client.channels.cache.get(ApplicationSettings.applicationLogs) as TextChannel;

        const logEmbed = new EmbedBuilder()
            .setAuthor({ name: `Application Denied`, iconURL: (req.session.user as any).avatar })
            .setDescription(`A new application has been denied.`)
            .addFields({
                name: 'Department',
                value: departmentObject.name,
                inline: true
            }, {
                name: 'Applicant',
                value: `<@${application.author}>`,  
                inline: true
            }, {
                name: 'Denied By',
                value: `${req.session.user && typeof req.session.user === 'object' ? (req.session.user as any).username : 'Unknown'}`,
                inline: true
            })
            .setColor('#e87272')
            .setFooter({ text: `FiveX Application, developed by hampuiz` })

        await logChannel.send({ embeds: [logEmbed] });
    }

    // Update the application status to denied. And reviewd by to the user that denied it. And update the updatedAt field.
    await application.updateOne({ status: 'Denied', reviewedBy: (req.session.user as any).username, updatedAt: new Date() });
});

export const ReviewRoute: Router = router;

