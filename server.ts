const { MongoClient } = require('mongodb');
const {Server} = require('socket.io')

const url = 'mongodb://localhost/mongochat'
const dbName = 'mongochat'

const dbClient = new MongoClient(url)
const io = new Server(3000)


async function main() {
  await dbClient.connect();
  console.log('Connected successfully to server');
  const db = dbClient.db(dbName);
  const collection = db.collection('documents')
  return 'done'
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => dbClient.close());