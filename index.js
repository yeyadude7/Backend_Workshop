// This creates the application server
// This also tells our application to parse elements as JSON
const express = require('express');
const app = express();
app.use(express.json());

// Allows developers to use environment variables preset with the .env file
require('dotenv').config()

// Prepopulated array of cards
const cards = [
    { id: 1, name: 'Michael Jordan'},
    { id: 2, name: 'Wayne Gretzky'},
    { id: 3, name: 'Alexander Volkanovski'},
];

// How to say "Hellow World!"
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Returns a row of all the cards
app.get('/api/cards', (req, res) => {
    res.send(cards);
});

// Searches for a particular card based on id parameter
app.get('/api/readCard/:id', (req, res) => {

    let finder = parseInt(req.params.id);
    let card = cards.find(c => c.id === finder);

    if (!card) {
        res.status(404).send('The card with this id was not found');
    }

    res.send(card);
});

// Creates a new card based on the request body
app.post('/api/createCard', (req, res) => {

    if (!req.body.name) {
        return res.status(400).send("Name is required");
    }

    let same = cards.find(c => c.name === req.body.name);

    if (same) {
        return res.status(400).send("Please enter a unique card");
    }

    const card = {
        id: cards.length + 1,
        name: req.body.name
    }; 

    cards.push(card);
    res.send(card);
});

// Updates a particular card based on id parameter and request body
app.put('/api/updateCard/:id', (req, res) => {

    let finder = parseInt(req.params.id);
    let card = cards.find(c => c.id === finder);

    if (!card) {
        return res.status(404).send('The card with this id was not found');
    }

    if (!req.body.name) {
        return res.status(400).send("Name is required");
    }

    card.name = req.body.name;
    res.send(card);

});

// Deletes a card based on id parameter
app.delete('/api/removeCard/:id', (req, res) => {

    let finder = parseInt(req.params.id);
    let card = cards.find(c => c.id === finder);

    if (!card) {
        return res.status(404).send('The card with this id was not found');
    }

    let index = cards.indexOf(card);
    cards.splice(index, 1);

    res.send(card);
});

// PORT
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
//app.listen(3000, () => console.log('Listening on port 3000...'));