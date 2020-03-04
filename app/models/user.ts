import { STRING, UUID, Model, UUIDV1 } from 'sequelize';
import { db } from '../database/config';

export class UserModel extends Model { }

UserModel.init({
    id: {
        type: UUID,
        defaultValue: UUIDV1,
        primaryKey: true
    },
    login: {
        type: STRING,
    },
    name: {
        type: STRING,
    },
    password: {
        type: STRING,
    },
}, {
    sequelize: db,
    modelName: 'User',
    freezeTableName: true,
});
