const { MongoClient } = require('mongodb');
import {connectionStr} from '../../lib/db';

const client = new MongoClient(connectionStr);

const getConnectLoginCollection = (dbName, collectionName) => {    
    const database = client.db(dbName);
    return database.collection(collectionName);       
}

export default async function  handler(req, res) {
    const { name } = JSON.parse(req.body);
    if(name === 'login') {
        if (req.method !== 'POST') {
            return res.status(405).json({ message: 'Method Not Allowed' });
        }
        const collection = getConnectLoginCollection('reactDB', 'login');
        const { username, password } = JSON.parse(req.body);    
        let success = false;
        let  message = 'Login not successful';
        const result = await collection.find({username: username, password: password}).toArray();
        if(result && result.length > 0) {
            delete result[0].password;    
            success = true;
            message = 'Login successful'; 
            return res.status(200).json({ result, success, message});
        } else {
            return res.status(200).json({ success: false, message: "Invalid user"});
        }
    } else if(name === "getUser"){
        const collection = getConnectLoginCollection('reactDB', 'login');   
        let success = false;
        const result = await collection.find().toArray();
        if(result && result.length > 0) {  
            success = true;
            return res.status(200).json({ result, success});
        } else {
            return res.status(200).json({ success: false});
        }

    } else {
        return res.status(200).json({ success: false});
    }
}