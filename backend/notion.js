require('dotenv').config()
const { Client } = require('@notionhq/client');

const notionClient = new Client( {auth: process.env.NOTION_SECRET_ID} );

// We need to write a GET request to get all flashcards that are currently in the database (replace the above)

database_id = process.env.NOTION_DATABASE_ID;


module.exports = async function getFlashcards () {
    // const payload = {
    //     path: `databases/${database_id}/query`,
    //     method: 'POST'
    // }
    
    // This is a POST request. We can also use databases.query for this. Gives us an array of page objects if we query lists
    // const request = await notionClient.request(payload) 

    // This is a GET request. Gives us detailed information about title, properties, etc.
    // const retrieval = await notionClient.databases.retrieve( {database_id: process.env.NOTION_DATABASE_ID} ); 

    // However, Notion database querying is outdated. We now have to use 
    // /v1/pages/{page_id}/properties/{property_id} endpoint

    // Re-structure the results according to our needs 
    const { results } = await notionClient.databases.query( {database_id: database_id} );

    // console.log(results);
    
    // const flashcards = results.map((page) => {
    //     console.log(page.properties.Note.id);
    // })

    // console.log(cardObjects.results[0].rich_text.plain_text);

    const flashcards = await Promise.all(
        results.map(
          async (page) => {
            const properties = {};
            for (const propertyName of Object.keys(page.properties)) {
              const propertyData = await notionClient.pages.properties.retrieve({
                page_id: page.id,
                property_id: page.properties[propertyName].id,
              });
      
              properties[propertyName] = propertyData;
            }

            // console.log(properties.Flashcard.results[0].rich_text.plain_text);
            // console.log(properties.Note.results[0].title.plain_text);
            // // console.log(properties.Image) // Put a pin in this for now
            // console.log("===============")

            return {
                note: properties.Note.results[0].title.plain_text,
                flashcard: properties.Flashcard.results[0].rich_text.plain_text

            }
            
          }
        )
      )
    
    // Now, we have an array of 
    // console.log(flashcards); 
    // console.log(typeof flashcards);

    console.log(flashcards);
    return flashcards;  // ** RETURNS list of objects we want  **
    
}



async function getDatabase() {
    const response = await notionClient.databases.retrieve({
        database_id: process.env.NOTION_DATABASE_ID
    });
    console.log(response);
}

// getDatabase();
