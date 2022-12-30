import { Schema } from 'mongoose';
import mongoose from 'mongoose';

export interface IStudent {
    name: string;
    email: string;
    document: string;
    password: string;
    age: number;
    phone: string;
    createdAt: string | Date;
}

export const studentSchema = new Schema<IStudent>({
    name: {
        type: String
    },
    email: {
        type: String
    },
    document: {
        type: String
    },
    password: {
        type: String
    },
    age: {
        type: Number
    },
    phone: {
        type: String
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

export const Student = mongoose.model<IStudent>('Student', studentSchema);