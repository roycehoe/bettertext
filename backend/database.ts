import { MongoClient } from 'mongodb';
import { DB_NAME, DB_URL } from './config';

const dbClient = new MongoClient(DB_URL)

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
    const db = dbClient.db(DB_NAME);
    const collection = db.collection('documents')
    await collection.insertOne(data)
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
    const db = dbClient.db(DB_NAME);
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