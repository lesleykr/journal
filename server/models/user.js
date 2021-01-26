//We define a users table with email & password columns. Sequelize will create this table the next time the server connects to the db and a user makes a POST request that uses the model. 
//The model is exported. We run an anonymous funct w/ 2 params: sequelize & DataTypes. The funct will return the value of what is created by sequelize.define.
module.exports = (sequelize, DataTypes) => { 
    const User = sequelize.define('user', { //We call the define()method of the sequelize object. Define() will map model properties in the server file to a
        email: {                            //table in Postgres. We pass in the string 'user' which will become the 'users' table in Postgres.    
            type: DataTypes.STRING,     //email and password are objects. These will become columns of the table.
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    return User;
}