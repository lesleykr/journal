const Sequelize = require('sequelize'); //imports the Sequelize pkg

//Create an instance of Sequelize. Give it the db table to connect to, the username for the db, and the password for the local db. Code from the DOCs:
const sequelize = new Sequelize('journalwalkthrough', 'postgres', 'password', { 
    host: 'localhost',  //points to the local (my computer) port for sequelize.
    dialect: 'postgres'  //identifies the QL dialect being used.
});


//Use the sequelize variable to access methods and call the authenticate() method to test to see if the connection is ok. More code from the "Testing the Connection" section of the DOCs.
sequelize.authenticate().then(  //authenticate() returns a promise, use .then.
    function() {                //fire a function that shows if we're connected.
        console.log('Connected to journalwalkthrough postgres database');
    },
    function(err){              //fire an error if there are errors.
        console.log(err);
    }
);
module.exports = sequelize;  //Allow the module to be exported.