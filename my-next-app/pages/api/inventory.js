const { MongoClient, ObjectId } = require('mongodb');
import { connectionStr } from '../../lib/db';

const client = new MongoClient(connectionStr);

const getConnectLoginCollection = (dbName, collectionName) => {
  const database = client.db(dbName);
  return database.collection(collectionName);
}

export default async function handler(req, res) {

  const { getList } = req.query
  if (getList === 'true') {
    try {
      const database = client.db('reactDB');
      const collection = database.collection('inventory');
      let reacts = await collection.find().toArray();
      res.status(200).json(reacts);
    } catch (err) {
      console.error("Error fetching documents:", err);
      res.status(500).json({ error: "Failed to fetch data" });
    }

  } else {
    const obj = req.body;
    if (obj.method === "add") {
      try {
        const database = client.db('reactDB');
        const collection = database.collection('inventory');
        let result = await collection.insertOne({ product_name: obj.product_name, quantity: obj.quantity });
        res.status(200).json({ message: 'Data inserted successfully', id: result.insertedId });
      } catch (error) {
        res.status(500).json({ message: 'Error inserting data', error });
      }
    }

    if (obj.method === "delete") {
      try {
        const database = client.db('reactDB');
        const collection = database.collection('inventory');
        let result = await collection.deleteOne({ _id: new ObjectId(obj.id) });
        res.status(200).json({ message: 'Data Deleted successfully' });

      } catch (error) {
        res.status(500).json({ message: 'Error Delete data', error });
      }
    }

    if (obj.method === "delete") {
      try {
        const database = client.db('reactDB');
        const collection = database.collection('inventory');
        let result = await collection.deleteOne({ _id: new ObjectId(obj.id) });
        res.status(200).json({ message: 'Data Deleted successfully' });

      } catch (error) {
        res.status(500).json({ message: 'Error Delete data', error });
      }
    }

    if (obj.method === "update") {
      try {
        const database = client.db('reactDB');
        const collection = database.collection('inventory');
        let result;
        if(obj && obj.params && obj.params.product_name) {
          result = await collection.updateOne({ _id: new ObjectId(obj.id)}, {$set: {product_name: obj.params.product_name }})
          res.status(200).json({ message: 'Data Updated successfully for Product Name' });
        } 
        
        if(obj && obj.params && obj.params.quantity) { 
          result = await collection.updateOne({ _id: new ObjectId(obj.id)}, {$set: {quantity: obj.params.quantity }})
          res.status(200).json({ message: 'Data Updated successfully for Quantity' });
        }        

      } catch (error) {
        console.log("E => ", error);
        res.status(500).json({ message: 'Error update data', error });
      }
    }

  }

  // const {newData} = req.body;
  // if(newData) {
  //     try {
  //         const database = client.db('reactDB');
  //         const collection = database.collection('inventory');
  //         const result = await collection.insertOne(newData);
  //         res.status(201).json({ message: 'Data inserted successfully', id: result.insertedId });
  //     } catch (error) {
  //         res.status(500).json({ message: 'Error inserting data', error });
  //     }

  //     return;

  // }    
  // const { id } = req.params;
  // const {updateData} = req.body;
  // if(id) {
  //     try {
  //         const database = client.db('reactDB');
  //         const collection = database.collection('inventory');
  //         const result = await collection.updateOne(
  //           { _id: new ObjectId(id) }, 
  //           { $set: updateData }
  //         );

  //         if (result.matchedCount === 0) {
  //           res.status(404).json({ message: 'Record not found' });
  //         } else {
  //           res.json({ message: 'Record updated successfully' });
  //         }
  //       } catch (error) {
  //         res.status(500).json({ message: 'Error updating record', error });
  //       }
  //       return;
  // }

  // try {
  //     const database = client.db('reactDB');
  //     const collection = database.collection('inventory');
  //     let reacts = await collection.find().toArray();
  //     res.json(reacts);
  // } catch (err) {
  //     console.error("Error fetching documents:", err);
  //     res.status(500).json({ error: "Failed to fetch data" });
  // }
}