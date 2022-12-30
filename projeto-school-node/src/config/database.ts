import mongoose from 'mongoose';
import * as dotenv from 'dotenv';

dotenv.config();
mongoose.set('strictQuery', false);

const databaseUrl = process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/schoolNode';

export default mongoose.connect(databaseUrl);