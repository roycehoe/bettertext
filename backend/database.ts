const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/mongochat'
const dbName = 'mongochat'

const dbClient = new MongoClient(url)

export interface SetTextDataRequest {
  username: string
  message: string
  createdAt: number
  chatroom: string
}

interface Chatroom {
  chatroom: string
}


export async function createMessage(data: SetTextDataRequest) {
  try {
    await dbClient.connect();
    const db = dbClient.db(dbName);
    const collection = db.collection('documents')

    const insertResult = await collection.insertOne(data)
    // console.log('Inserted documents =>', insertResult); //remove on deployment
  }
  catch (e) {
    console.error(e)
  }
  finally {
    dbClient.close()
  }
}

export async function getMessage(chatroom: Chatroom) {
  try {
    await dbClient.connect();
    const db = dbClient.db(dbName);
    const collection = db.collection('documents')

    const findResult = await collection.find(chatroom).toArray();
    // console.log('Found documents =>', findResult);
    return findResult
  }
  catch (e) {
    console.error(e)
  }
  finally {
    dbClient.close()
  }
}