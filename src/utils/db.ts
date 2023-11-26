import mongoose from "mongoose";

type ConnectionObject = {
  isConnected: boolean;
};

const connection: ConnectionObject = {
  isConnected: false,
};

async function connect() {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI!);
    connection.isConnected = db.connections[0].readyState === 1;
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
}

async function disconnect() {
  if (connection.isConnected) {
    await mongoose.disconnect();
    connection.isConnected = false;
  }
}

const db = { connect, disconnect };
export default db;
