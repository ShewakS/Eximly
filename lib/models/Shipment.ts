import { Schema, model, models } from 'mongoose';

const ShipmentSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

    // Step 1 – Product details
    productName: { type: String },
    productCategory: { type: String },
    productDescription: { type: String, default: '' },
    quantity: { type: Number, min: 1 },
    unit: { type: String, default: 'Kg' },
    productValue: { type: Number, min: 0 },
    currency: { type: String, default: 'USD' },

    // Step 2 – Route
    sourceCountry: { type: String },
    sourceCity: { type: String },
    destinationCountry: { type: String },
    destinationCity: { type: String },
    // Legacy alias kept for backward compatibility
    originCountry: { type: String },

    // Step 3 – Shipment type
    exportType: {
      type: String,
      enum: ['domestic', 'international'],
      default: 'domestic',
    },
    pickupDate: { type: Date },

    // Step 4 – Exporter information
    exporterName: { type: String },
    companyName: { type: String },
    businessRegistrationNumber: { type: String },
    contactNumber: { type: String },
    email: { type: String },
    passportNumber: { type: String },

    // Step 5 – Document reference numbers (text)
    exportLicenseNumber: { type: String },
    customerDeclarationNumber: { type: String },
    // Legacy fields
    customsDeclarationId: { type: String },

    // Step 6 – Shipping information
    shippingMethod: {
      type: String,
      enum: ['air', 'sea', 'road'],
    },
    estimatedWeight: { type: Number, min: 0 },
    dimensionsLength: { type: Number, min: 0 },
    dimensionsWidth: { type: Number, min: 0 },
    dimensionsHeight: { type: Number, min: 0 },
    isFragile: { type: Boolean, default: false },
    insuranceRequired: { type: Boolean, default: false },
    expectedDeliveryDate: { type: Date },

    // Step 7 – Customs
    hsCode: { type: String },
    purpose: {
      type: String,
      enum: ['commercial', 'personal', 'gift', 'sample'],
    },

    // Step 8 – Review / estimates
    estimatedShippingCost: { type: Number, default: 0 },
    estimatedTaxes: { type: Number, default: 0 },

    // Workflow
    status: {
      type: String,
      enum: [
        'draft',
        'pending_review',
        'documents_rejected',
        'pending',
        'in_transit',
        'delivered',
        'cancelled',
      ],
      default: 'draft',
    },
    documentVerificationStatus: {
      type: String,
      enum: ['not_required', 'pending', 'approved', 'rejected'],
      default: 'not_required',
    },
    rejectionReason: { type: String, default: '' },
    currentStep: { type: Number, default: 1, min: 1, max: 8 },
  },
  { timestamps: true }
);

// Sync legacy originCountry from sourceCountry on save
ShipmentSchema.pre('save', function syncLegacyFields() {
  if (this.sourceCountry) {
    this.originCountry = this.sourceCountry;
  }
  if (this.customerDeclarationNumber && !this.customsDeclarationId) {
    this.customsDeclarationId = this.customerDeclarationNumber;
  }
});

const Shipment = models.Shipment || model('Shipment', ShipmentSchema);
export default Shipment;
