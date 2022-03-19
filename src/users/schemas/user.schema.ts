import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import  { Document }  from 'mongoose'

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    id: string

    @Prop()
    name: string

    @Prop()
    email: string

    @Prop()
    password: string

    @Prop()
    toDo: string[]
}

export const UserSchema = SchemaFactory.createForClass(User)