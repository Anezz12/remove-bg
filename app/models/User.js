import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
    Username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true,
    },
    role: {
        type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    image: {
        type: String,
    },

    provider: {
        type: String,
         enum: ['credentials', 'google'],
      default: 'credentials',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    updatedAt: {
        type: Date,
        default: Date.now,
    },

    deletedAt: {
        type: Date,
    },

}, 
{
    timestamps: true,
  }
);

const User = models.User || model('User', UserSchema);

export default User;