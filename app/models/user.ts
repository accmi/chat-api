import { Schema, Document, model } from "mongoose";

export interface IUserType extends Document {
    email: string;
    firstName: string;
    lastName: string;
    login: string;
    password: string;
  }

const UserSchema: Schema = new Schema({
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    login: {type: String, required: true},
    password: {type: String, required: true},
});

export const IUser = model<IUserType>('User', UserSchema);
