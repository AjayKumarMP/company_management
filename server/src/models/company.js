import { mysql, Sequelize } from '../config/db.js';

var Company = mysql.define('COMPANY',{
    id:{
        type: Sequelize.UUID,
        primaryKey: true,
        unique: true,
        defaultValue: Sequelize.UUIDV1,
    },
    name: {
        type: Sequelize.STRING,
        allowNull:false
    },
    website: {
        type: Sequelize.STRING,
        allowNull:true,
    },
    pno: {
        type: Sequelize.BIGINT,
        allowNull:false,
        unique: true,
    },
    address: {
        type: Sequelize.STRING,
    },
    city: Sequelize.STRING,
    state: Sequelize.STRING,
    country: Sequelize.STRING,
    industry: {
        type: Sequelize.ENUM,
        values: ['Account', 'IT', 'SALES', 'HEALTH CARE'],
        allowNull: false,
    },
},{
    freezeTableName: true,
    tableName: "company",
    paranoid: true,
});

export default Company;