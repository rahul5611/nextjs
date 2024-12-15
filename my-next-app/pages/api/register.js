const { MongoClient } = require('mongodb');
import {connectionStr} from '../../lib/db';

const client = new MongoClient(connectionStr);

const getConnectLoginCollection = (dbName, collectionName) => {    
    const database = client.db(dbName);
    return database.collection(collectionName);        
}

export default async function  handler(req, res) {
    const {name} = JSON.parse(req.body);
    if (name === "addNewUser") {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
        const collection = getConnectLoginCollection('reactDB', 'login');
        const { username, password, firstName, lastName } = JSON.parse(req.body);
        let success = false;
        let message = 'unable to insert';
        const result = await collection.insertOne({
            username: username,
            password: password, firstName: firstName, lastName: lastName, Roles: ["Guest"]
        });
        if (result) {
            success = true;
            message = 'inserted successful';
            return res.status(200).json({ result, success, message });
        } else {
            return res.status(200).json({ success: false, message });
        }
    } 
    
}