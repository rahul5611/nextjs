const { MongoClient } = require('mongodb');
import {connectionStr} from '../../lib/db';

const client = new MongoClient(connectionStr);

const getConnectLoginCollection = (dbName, collectionName) => {    
    const database = client.db(dbName);
    return database.collection(collectionName);       
}

export default async function  handler(req, res) {
    const { name } = JSON.parse(req.body);
    if(name === 'getRoles') {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
        const collection = getConnectLoginCollection('reactDB', 'rolemaster');
        let success = false;
        let  message = 'Roles not found';
        const result = await collection.find().toArray();
        if(result && result.length > 0) {
            success = true;
            message = 'Role found'; 
            return res.status(200).json({ result, success, message});
        } else {
            return res.status(200).json({ success: false, message: "Roles not found"});
        }
    } else {
        return res.status(200).json({ success: false, message: "Roles not found"});
    }
}