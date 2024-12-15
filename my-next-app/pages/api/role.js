const { MongoClient, ObjectId } = require('mongodb');
import {connectionStr} from '../../lib/db';

const client = new MongoClient(connectionStr);

const getConnectLoginCollection = (dbName, collectionName) => {    
    const database = client.db(dbName);
    return database.collection(collectionName);       
}

export default async function  handler(req, res) {
    const obj = req.body;
    if (obj.name === "update") {
        try {
            const collection = getConnectLoginCollection('reactDB', 'login');
            let result;
            if (obj && obj.id) {
                result = await collection.updateOne({ _id: new ObjectId(obj.id) }, { $set: { Roles: obj.Roles } })
                res.status(200).json({ message: 'Data Updated successfully for User Roles' });
            }
        } catch (error) {
            console.log("E => ", error);
            res.status(500).json({ message: 'Error update data', error });
        }
    } else {
        return res.status(200).json({ success: false});
    }
}