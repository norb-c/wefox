import mongoose from 'mongoose';

export interface IUser {
  _id: any;
  email: string;
  password: string;
  createdAt: Date;
}

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  }
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
