// backend/src/config/db.js
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Conectado com Sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao MongoDB:', err.message);
    // Sair do processo com falha
    process.exit(1);
  }
};

export default connectDB;