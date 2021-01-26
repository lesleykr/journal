require("dotenv").config();
let express = require('express');  //call in express from package.json.
let app = express(); //create an instance of express
let journal = require('./controllers/journalcontroller');  //import the route object that we just created and store it in a variable called journal.
let sequelize = require('./db'); //call in the db.js file
let user = require('./controllers/usercontroller.js'); //import usercontroller.js and assign it to a variable called user.

// app.use('/test', function(req, res){    //This is an endpoint
//     res.send('This is a message from the test endpoint on the server')  //This is the Express response function that will fire when the endpoint is successfully reached
// });

// app.use('/me', (req, res) => {   ///This is another enpoint, written in arrow funct.
//     res.send('My name is Lesley and I am 45 years old');
// });

sequelize.sync();  //call the sync() method on the sequelize variable. This method will ensure that we sync all models defined in our server to the DB. 
//sequelize.sync({force: true})

app.use(express.json());//MUST GO ABOVE ANY ROUTES!!! Necessary for parsing req.body middleware. JSON-ifies the request.


app.use('/user', user); //Call the use method from Express and create a route to access any future functions in usercontroller.js.


app.use('/journal', journal); //create a base URL called /journal and then pass in the journal variable we created above, which tells it to go to our 
                                //journalcontroller.js file.

app.listen(3000, function() {  //tell express to listen on port 3000
    console.log('App is listening on port 3000');  //set a callback function to fire when connection is successful.
})