const express = require('express');
const path = require('path');
const { Client } = require('@notionhq/client');
const BodyParser = require('body-parser');
const cors = require('cors');
var jsonParser = BodyParser.json();
const getFlashcards = require('./notion.js');
const PORT = process.env.PORT || 8000;


const app = express();
app.use(cors());
app.use(BodyParser.urlencoded( {extended: true} ));


app.get("/api/flashcards", async function (req, res) {
    const flashcards = await getFlashcards();
    res.json(flashcards); // res.json sends back a JSON Response
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));