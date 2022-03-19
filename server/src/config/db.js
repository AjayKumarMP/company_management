import Sequelize from "sequelize";

const mysql = new Sequelize('company-management', 'admin', 'admin1234', {
    dialect: 'mysql',
    // host: 'db-mysql',
    // host: 'nammuru.cwkg17qocrdv.us-east-2.rds.amazonaws.com',
    host: 'company-management.cwkg17qocrdv.us-east-2.rds.amazonaws.com',
    port: 3306,
    logging: true,
    timeout: 60000
});

mysql
    .authenticate()
    .then((success) => { 
        console.log("conntected  to databse");
    }, (err) => {
        console.log("error in conntecting  to databse",err);
    });

    mysql
    .sync({force:false})
    .then((success) => { 
        console.log("syncing is done");
    }, (err) => {
        console.log("error databse syncing",err);
    });

   export {Sequelize};
   export {mysql}; 

    export default {};