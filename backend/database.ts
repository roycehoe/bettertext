const { MongoClient } = require('mongodb');

// const url = 'mongodb://database:27017'
const url = 'mongodb://localhost:27017'
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


export async function createMessage(data: SetTextDataRequest): Promise<void> {
  try {
    await dbClient.connect();
    const db = dbClient.db(dbName);
    const collection = db.collection('documents')

    await collection.insertOne(data)
    return
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
    return findResult
  }
  catch (e) {
    console.error(e)
  }
  finally {
    dbClient.close()
  }
}