const { MongoClient } = require('mongodb');
require('dotenv').config()

class Database {

    
    static #CONNECTION_STRING = `mongodb+srv://root:nodejs123@8notes.nizgg.mongodb.net/8notes?retryWrites=true&w=majority`;

    //static #CONNECTION_STRING = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASS}@${process.env.DATABASE_URL}/${process.env.DATABASE_DB}?retryWrites=true&w=majority`;
    static client = new MongoClient(this.#CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true});

    static connect = async () => {
        try {   
            console.log(process.env);
            await this.client.connect()
                .then(() => console.log("Connection succesful!"))    
                .catch((err) => {throw err});
        
            return this.client;
         
        } catch (error) {
            throw error;
        }
    }

    static listDatabases = async (client) => {
        var databasesList = await client.db().admin().listDatabases();
     
        console.log("Databases:");
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    }

    static destroy = async () => {
        try {
            
            this.client.close()
                .then(() => console.log("Client closed!"))    
                .catch((err) => { throw err });

        } catch (error) {
            throw error;
        }
    }

    static createScrapingsCollection = async () => {
        try {

            const db = await this.selectDatabase();

            await db.listCollections(null, {nameOnly: true}).toArray()
                .then(async (collections) => {
                    var someCollection = collections.some(el => el.name == "scrapings");
                    if(!someCollection)
                        await db.createCollection("scrapings")
                            .then(() => console.log("Collection created!"))    
                            .catch((err) => { throw err });
                })
                .catch((err) => { throw err });   
            
        } catch (error) {
            throw error;
        }
    }

    static selectDatabase = async (db = process.env.DATABASE_DB) => {
        try {   

            const selectedDB = this.client.db(db);
         
            return selectedDB;
         
        } catch (error) {
            throw error;
        }
    }

}

module.exports = Database;