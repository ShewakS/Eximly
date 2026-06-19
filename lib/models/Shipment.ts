import { Schema, model, models } from 'mongoose';

const ShipmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    exportType: {
      type: String,
      enum: ['domestic', 'international'],
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'in_transit', 'delivered'],
      default: 'pending',
    },
    originCountry: { type: String, required: true },
    destinationCountry: { type: String, required: true },
    // International-only fields
    passportNumber: { type: String },
    customsDeclarationId: { type: String },
    exportLicenseNumber: { type: String },
    shippingMethod: {
      type: String,
      enum: ['air', 'sea'],
    },
  },
  { timestamps: true }
);

const Shipment = models.Shipment || model('Shipment', ShipmentSchema);
export default Shipment;