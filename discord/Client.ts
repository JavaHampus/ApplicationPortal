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

import { Client, GatewayIntentBits, IntentsBitField } from "discord.js";
import { REST, Routes, Collection } from 'discord.js'
// Import Client from the config and set a new name for it.
import { Client as ConfigClient } from '../web/configs/Authentication.config'
import fs from 'node:fs';
import path from 'node:path';
import chalk from "chalk";
import { ApplicationSettings } from "../web/configs/Departments.config";


interface MyClient extends Client {
    commands: Collection<string, any>;
}

export const client = new Client({
    intents: [IntentsBitField.Flags.Guilds, IntentsBitField.Flags.MessageContent, IntentsBitField.Flags.GuildMembers, IntentsBitField.Flags.GuildMessages, GatewayIntentBits.GuildPresences]
}) as MyClient;

client.commands = new Collection();

const commands = [];
const foldersPath = path.join(__dirname, '/commands');
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(chalk.red(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
		}
	}
}

const rest = new REST().setToken(ConfigClient.TOKEN);

(async () => {
	try {
		console.log(chalk.blueBright("[COMMANDS] Started refreshing application (/) commands."));

		await rest.put(
			Routes.applicationGuildCommands(ConfigClient.APPLICATION_ID, ApplicationSettings.guildId),
			{ body: commands },
		);

        console.log(chalk.blueBright("[COMMANDS] Successfully reloaded application (/) commands."));
	} catch (error) {
		console.error(error);
	}
})();

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			client.commands.set(command.data.name, command);
		} else {
			console.log(chalk.red(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`));
		}
	}
}

const eventsPath = path.join(__dirname, '/events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}