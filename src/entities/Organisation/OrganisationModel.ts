import { Schema, model } from 'mongoose';
import * as mongoose from 'mongoose';

mongoose.pluralize(null);

const databaseSchema = new Schema({
  name: String,
  address: String,
  contact: {
    person: String,
    phone: Number,
    email: String,
  },
  description: String,
  imageUrl: String,
  users: [{ type: Schema.Types.ObjectId }]
}, {
  timestamps: true
});

const OrganisationModel = model('Organisation', databaseSchema);

export default OrganisationModel;