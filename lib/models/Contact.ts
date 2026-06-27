import { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const Contact = models.Contact || model('Contact', ContactSchema);
export default Contact;
