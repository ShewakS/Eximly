import mongoose, { Schema, model, models } from 'mongoose';

const DocumentSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  shipment: { type: Schema.Types.ObjectId, ref: 'Shipment', required: true },
  documentType: { 
    type: String, 
    enum: ['invoice', 'bill_of_lading', 'packing_list', 'certificate_of_origin', 'insurance', 'customs_document'],
    required: true 
  },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'verified', 'rejected'], 
    default: 'pending' 
  },
  verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  uploadedAt: { type: Date, default: Date.now },
}, { timestamps: true });

const Document = models.Document || model('Document', DocumentSchema);
export default Document;
