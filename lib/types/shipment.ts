export type ExportType = 'domestic' | 'international';
export type ShippingMethod = 'air' | 'sea' | 'road';
export type ShipmentPurpose = 'commercial' | 'personal' | 'gift' | 'sample';
export type ShipmentStatus =
  | 'draft'
  | 'pending_review'
  | 'documents_rejected'
  | 'pending'
  | 'in_transit'
  | 'delivered'
  | 'cancelled';
export type DocumentVerificationStatus = 'not_required' | 'pending' | 'approved' | 'rejected';
export type DocumentType =
  | 'passport_copy'
  | 'export_license_copy'
  | 'declaration_document';
export type DocumentStatus = 'pending' | 'verified' | 'rejected';

export interface ShipmentFormData {
  // Step 1 – Product
  productName: string;
  productCategory: string;
  productDescription: string;
  quantity: string;
  unit: string;
  productValue: string;
  currency: string;
  // Step 2 – Route
  sourceCountry: string;
  sourceCity: string;
  destinationCountry: string;
  destinationCity: string;
  // Step 3 – Type
  exportType: ExportType;
  shippingMethod: ShippingMethod;
  pickupDate: string;
  // Step 4 – Exporter
  exporterName: string;
  companyName: string;
  businessRegistrationNumber: string;
  contactNumber: string;
  email: string;
  passportNumber: string;
  // Step 5 – Document references (text)
  exportLicenseNumber: string;
  customerDeclarationNumber: string;
  // Step 6 – Shipping
  estimatedWeight: string;
  dimensionsLength: string;
  dimensionsWidth: string;
  dimensionsHeight: string;
  isFragile: boolean;
  insuranceRequired: boolean;
  expectedDeliveryDate: string;
  // Step 7 – Customs
  hsCode: string;
  purpose: ShipmentPurpose;
}

export const INITIAL_SHIPMENT_FORM: ShipmentFormData = {
  productName: '',
  productCategory: '',
  productDescription: '',
  quantity: '',
  unit: 'Kg',
  productValue: '',
  currency: 'USD',
  sourceCountry: '',
  sourceCity: '',
  destinationCountry: '',
  destinationCity: '',
  exportType: 'domestic',
  shippingMethod: 'road',
  pickupDate: '',
  exporterName: '',
  companyName: '',
  businessRegistrationNumber: '',
  contactNumber: '',
  email: '',
  passportNumber: '',
  exportLicenseNumber: '',
  customerDeclarationNumber: '',
  estimatedWeight: '',
  dimensionsLength: '',
  dimensionsWidth: '',
  dimensionsHeight: '',
  isFragile: false,
  insuranceRequired: false,
  expectedDeliveryDate: '',
  hsCode: '',
  purpose: 'commercial',
};

export const CURRENCY_OPTIONS = ['USD', 'EUR', 'GBP', 'INR', 'AED', 'CNY', 'JPY'];
export const UNIT_OPTIONS = ['Kg', 'Pieces', 'Liters', 'Boxes', 'Pallets', 'Units'];
