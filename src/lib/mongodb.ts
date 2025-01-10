import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local',
  );
}

// Étendre global pour inclure le cache mongoose
const globalWithMongoose = global as typeof globalThis & {
  mongoose?: {
    conn: mongoose.Mongoose | null;
    promise: Promise<mongoose.Mongoose> | null;
  };
};

// Initialiser le cache global si nécessaire
globalWithMongoose.mongoose = globalWithMongoose.mongoose || {
  conn: null,
  promise: null,
};
const cached = globalWithMongoose.mongoose;

async function dbConnect() {
  // Retourner la connexion mise en cache si elle existe
  if (cached.conn) {
    return cached.conn;
  }

  // Si aucune promesse n'existe, en créer une nouvelle
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // Désactiver le buffering des commandes
    };
    cached.promise = mongoose.connect(process.env.MONGODB_URI!, opts);
  }

  try {
    cached.conn = await cached.promise; // Attendre la résolution de la connexion
  } catch (error) {
    cached.promise = null; // Réinitialiser la promesse en cas d'échec
    throw error;
  }

  return cached.conn;
}

export default dbConnect;
