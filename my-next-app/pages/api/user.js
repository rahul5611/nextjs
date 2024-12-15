const { MongoClient } = require('mongodb');
import {connectionStr} from '../../lib/db';

const client = new MongoClient(connectionStr);

const getConnectLoginCollection = (dbName, collectionName) => {    
    const database = client.db(dbName);
    return database.collection(collectionName);       
}

export default async function handler(req, res) {
    const { pagesize } = req.query;
    if (pagesize) {
        try {
            const database = client.db('reactDB');
            const collection = database.collection('user');
            let reacts;
            if (pagesize !== "All") {
                reacts = await collection.find().limit(parseInt(pagesize)).toArray();
            } else {
                reacts = await collection.find().toArray();
            }
            res.status(200).json(reacts);
        } catch (err) {
            console.error("Error fetching documents:", err);
            res.status(500).json({ error: "Failed to fetch data" });
        }
    }
}