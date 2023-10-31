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
import { ColorResolvable, EmbedBuilder, TextChannel } from 'discord.js';
import { client } from '../../discord/Client';

const router: Router = Router();

router.get('/', async (req: Request, res: Response) => {
    const departmentString: string = req.query.department as string;
    if(!departmentString) return res.redirect('/departments');

    const departmentObject = Departments.find(department => department.id === departmentString);
    if(!departmentObject) return res.redirect('/departments');

    if(!ApplicationSettings.allowMultipleApplications) {
        const application = await Application.findOne({ author: (req.session.user as any).id, department: departmentString }).exec();
        if(application) return res.redirect('/@');
    }

    res.render('application', { applicationObject: departmentObject });
});

router.post('/submit', async (req: Request, res: Response) => {
    const departmentString: string = req.query.department as string;
    if(!departmentString) return res.send({ error: 'No department was specified.' });

    const departmentObject = Departments.find(department => department.id === departmentString);
    if(!departmentObject) return res.send({ error: 'Department does not exist.' });

    const answersToQuestions = Object.values(req.body);
    
    let applicationForm: Array<object> = []

    for(let i = 0; i < answersToQuestions.length; i++) {
        const question = departmentObject.applicationQuestions[i].title;
        const answer = answersToQuestions[i];
        applicationForm.push({ question, answer });
    }

    const applicationID = Math.random().toString(36).substr(2, 12).toUpperCase();

    const application = new Application({
        author: (req.session.user as any).id,
        department: departmentString,
        questions: applicationForm,
        status: 'Pending',
        createdAt: new Date(),
        updatedAt: new Date(),  
        reviewedBy: "None",
        applicationId: applicationID
    });

    await application.save();

    try {   
        const channel = client.channels.cache.get(departmentObject.applicationLogs) as TextChannel;

        const applicationEmbed = new EmbedBuilder()
        .setColor((departmentObject.departmentColor as ColorResolvable) || '#7095c4')
        .setAuthor({ name: `New Application`, iconURL: (req.session.user as any).avatar })
        .setDescription(`A new application has been submitted! You can view in in the Review Center.`)
        .addFields(
            { name: 'Applicant ID', value: "``" + `<@${(req.session.user as any).id}>` + "``" },
            { name: 'Created At', value: "``" + `${new Date().toLocaleString()}` + "``" },
            { name: 'Status', value: '``Pending``' },
            { name: "Application Link", value: "``" + ApplicationSettings.baseUrl + "/review/34GSD7``" }
            )
        .setFooter({ text: `FiveX Application, developed by hampuiz` })
        
        await channel.send({ embeds: [applicationEmbed] });

        res.send({ success: 'Application submitted successfully!' });
    } catch (e) {
        console.log(e);
    }
});

export const ApplicationRoute: Router = router;

