import { mysql, Sequelize } from '../config/db.js';

var User = mysql.define('USER',{
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV1,
    },
    username: {
        type: Sequelize.STRING,
        allowNull:false
    },
    password: {
        type: Sequelize.STRING,
        allowNull:true,
    },
    email: {
        type: Sequelize.STRING,
    },
},{
    freezeTableName: true,
    tableName: "user",
    paranoid: true,
});

export default User;