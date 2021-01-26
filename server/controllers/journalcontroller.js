let express = require('express');  //importing the Express framework and assigning it to a variable
let router = express.Router();  //Access the router() method of the Express variable. The router method will return a router object to us.
let validateSession = require('../middleware/validate-session');
const Journal = require('../db').import('../models/journal');

router.get('/practice', validateSession, function(req, res) //we call get(), one of the methods in the object. Allows us to complete an HTTP GET request. 
{                                              //get() takes two arguments, a path and a callback function. The callback function only fires when the 
                                                //application receives a request to the specified route AND the specified HTTP method.
    res.send('Hey!! This is a practice route') //we call the .send() express method on the response (res) object. 
});

//Journal Create
router.post('/create', validateSession, (req, res) => {
    const journalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
        owner: req.user.id
    }
    Journal.create(journalEntry)
        .then(journal => res.status(200).json(journal))
        .catch(err => res.status(500).json({ error: err}))
})


//GET ALL ENTRIES
router.get("/", (req, res) => {
    Journal.findAll()
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err}))
});

//GET ENTRIES BY USER
router.get("/mine", validateSession, (req, res) => {
    let userid = req.user.id
    Journal.findAll({
        where: { owner: userid }
    })
        .then(journals => res.status(200).json(journals))
        .catch(err => res.status(500).json({ error: err}))
});

//GET ENTRIES BY TITLE
router.get('/:title', function(req, res) {
    let title = req.params.title;

    Journal.findAll({
        where: { title: title }
    })
    .then(journals => res.status(200).json(journals))
    .catch(err => res.status(500).json({ error: err}))
});

router.put("/update/:entryId", validateSession, function (req, res) {
    const updateJournalEntry = {
        title: req.body.journal.title,
        date: req.body.journal.date,
        entry: req.body.journal.entry,
    };

    const query = { where: { id: req.params.entryId, owner: req.user.id} };

    Journal.update(updateJournalEntry, query)
    .then((journals) => res.status(200).json(journals))
    .catch((err) => res.status(500).json({ error: err}));
});

router.delete("/delete/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner: req.user.id }};

    Journal.destroy(query)
        .then(() => res.status(200).json({ message: "Journal Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});

module.exports = router  //we export the module for usage outside of the file.