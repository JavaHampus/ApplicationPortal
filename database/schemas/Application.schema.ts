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

import pkg from 'mongoose';
const { Schema, model } = pkg;

export interface IApplication {
    author: string;
    department: string;
    questions: Array<object>;
    status: string;
    createdAt: Date;
    updatedAt: Date;
    reviewedBy: string;
    applicationId?: string;
}

const ApplicationSchema = new Schema<IApplication>({
    author: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    questions: {
        type: [{ question: String, answer: String }],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date
    },
    reviewedBy: {
        type: String
    },
    applicationId: {
        type: String,
        required: true
    }
}); 

export const Application = model<IApplication>('application', ApplicationSchema);