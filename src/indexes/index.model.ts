import { Schema, model } from 'mongoose';

interface Index {
    message: string;
  }
  
  const messageSchema = new Schema<Index>({
    message: { type: String, required: true },
  });
  
  const Index = model<Index>('Message', messageSchema);

  export default Index;