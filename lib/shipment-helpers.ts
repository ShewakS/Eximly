import type { ExportType, ShipmentFormData } from '@/lib/types/shipment';
import { estimateShipmentCosts } from '@/lib/shipment-pricing';

const ALLOWED_UPDATE_FIELDS = [
  'productName',
  'productCategory',
  'productDescription',
  'quantity',
  'unit',
  'productValue',
  'currency',
  'sourceCountry',
  'sourceCity',
  'destinationCountry',
  'destinationCity',
  'exportType',
  'pickupDate',
  'exporterName',
  'companyName',
  'businessRegistrationNumber',
  'contactNumber',
  'email',
  'passportNumber',
  'exportLicenseNumber',
  'customerDeclarationNumber',
  'shippingMethod',
  'estimatedWeight',
  'dimensionsLength',
  'dimensionsWidth',
  'dimensionsHeight',
  'isFragile',
  'insuranceRequired',
  'expectedDeliveryDate',
  'hsCode',
  'purpose',
  'currentStep',
  'status',
] as const;

export function pickAllowedUpdates(body: Record<string, unknown>) {
  const updates: Record<string, unknown> = {};
  for (const key of ALLOWED_UPDATE_FIELDS) {
    if (body[key] !== undefined) {
      updates[key] = body[key];
    }
  }
  if (updates.sourceCountry) {
    updates.originCountry = updates.sourceCountry;
  }
  if (updates.customerDeclarationNumber) {
    updates.customsDeclarationId = updates.customerDeclarationNumber;
  }
  return updates;
}

export function buildShipmentPayload(
  body: Record<string, unknown>,
  userId: string,
  status: 'draft' | 'pending_review' | 'pending' = 'draft'
) {
  const exportType = (body.exportType as ExportType) || 'domestic';
  const productValue = Number(body.productValue) || 0;
  const estimatedWeight = Number(body.estimatedWeight) || Number(body.quantity) || 1;

  const costs = estimateShipmentCosts({
    exportType,
    shippingMethod: (body.shippingMethod as 'air' | 'sea' | 'road') || 'road',
    estimatedWeight,
    productValue,
    insuranceRequired: Boolean(body.insuranceRequired),
    sourceCountry: String(body.sourceCountry || body.originCountry || ''),
    destinationCountry: String(body.destinationCountry || ''),
  });

  const isInternational = exportType === 'international';

  const payload: Record<string, unknown> = {
    userId,
    exportType,
    status,
    documentVerificationStatus: isInternational && status !== 'draft' ? 'pending' : 'not_required',
    currentStep: Number(body.currentStep) || 1,
  };

  if (body.productName) payload.productName = body.productName;
  if (body.productCategory) payload.productCategory = body.productCategory;
  if (body.productDescription !== undefined) payload.productDescription = body.productDescription || '';
  if (body.quantity) payload.quantity = Number(body.quantity);
  if (body.unit) payload.unit = body.unit;
  if (body.productValue !== undefined && body.productValue !== '') payload.productValue = productValue;
  if (body.currency) payload.currency = body.currency;
  if (body.sourceCountry || body.originCountry) {
    payload.sourceCountry = body.sourceCountry || body.originCountry;
    payload.originCountry = body.sourceCountry || body.originCountry;
  }
  if (body.sourceCity) payload.sourceCity = body.sourceCity;
  if (body.destinationCountry) payload.destinationCountry = body.destinationCountry;
  if (body.destinationCity) payload.destinationCity = body.destinationCity;
  if (body.pickupDate) payload.pickupDate = new Date(String(body.pickupDate));
  if (body.exporterName) payload.exporterName = body.exporterName;
  if (body.companyName) payload.companyName = body.companyName;
  if (body.businessRegistrationNumber) payload.businessRegistrationNumber = body.businessRegistrationNumber;
  if (body.contactNumber) payload.contactNumber = body.contactNumber;
  if (body.email) payload.email = body.email;
  if (body.passportNumber) payload.passportNumber = body.passportNumber;
  if (body.exportLicenseNumber) payload.exportLicenseNumber = body.exportLicenseNumber;
  if (body.customerDeclarationNumber) {
    payload.customerDeclarationNumber = body.customerDeclarationNumber;
    payload.customsDeclarationId = body.customerDeclarationNumber;
  }
  if (body.shippingMethod) payload.shippingMethod = body.shippingMethod;
  if (body.estimatedWeight) payload.estimatedWeight = Number(body.estimatedWeight);
  if (body.dimensionsLength) payload.dimensionsLength = Number(body.dimensionsLength);
  if (body.dimensionsWidth) payload.dimensionsWidth = Number(body.dimensionsWidth);
  if (body.dimensionsHeight) payload.dimensionsHeight = Number(body.dimensionsHeight);
  if (body.isFragile !== undefined) payload.isFragile = Boolean(body.isFragile);
  if (body.insuranceRequired !== undefined) payload.insuranceRequired = Boolean(body.insuranceRequired);
  if (body.expectedDeliveryDate) payload.expectedDeliveryDate = new Date(String(body.expectedDeliveryDate));
  if (body.hsCode) payload.hsCode = body.hsCode;
  if (body.purpose) payload.purpose = body.purpose;

  if (body.productValue || body.estimatedWeight || body.quantity) {
    payload.estimatedShippingCost = costs.estimatedShippingCost;
    payload.estimatedTaxes = costs.estimatedTaxes;
  }

  return payload;
}

export function validateStep(step: number, data: Partial<ShipmentFormData>, exportType: ExportType): string | null {
  switch (step) {
    case 1:
      if (!data.productName?.trim()) return 'Product name is required';
      if (!data.productCategory?.trim()) return 'Product category is required';
      if (!data.quantity || Number(data.quantity) < 1) return 'Valid quantity is required';
      if (!data.unit?.trim()) return 'Unit is required';
      if (!data.productValue || Number(data.productValue) < 0) return 'Product value is required';
      if (!data.currency?.trim()) return 'Currency is required';
      return null;
    case 2:
      if (!data.sourceCountry?.trim()) return 'Source country is required';
      if (!data.sourceCity?.trim()) return 'Source city is required';
      if (!data.destinationCountry?.trim()) return 'Destination country is required';
      if (!data.destinationCity?.trim()) return 'Destination city is required';
      return null;
    case 3:
      if (!data.exportType) return 'Shipment type is required';
      if (exportType === 'domestic') {
        if (!data.shippingMethod) return 'Shipping method is required';
        if (!data.pickupDate) return 'Pickup date is required';
      }
      return null;
    case 4:
      if (exportType !== 'international') return null;
      if (!data.exporterName?.trim()) return 'Exporter name is required';
      if (!data.companyName?.trim()) return 'Company name is required';
      if (!data.businessRegistrationNumber?.trim()) return 'Business registration number is required';
      if (!data.contactNumber?.trim()) return 'Contact number is required';
      if (!data.email?.trim()) return 'Email is required';
      return null;
    case 5:
      if (exportType !== 'international') return null;
      if (!data.passportNumber?.trim()) return 'Passport number is required';
      if (!data.exportLicenseNumber?.trim()) return 'Export license number is required';
      if (!data.customerDeclarationNumber?.trim()) return 'Customer declaration number is required';
      return null;
    case 6:
      if (exportType !== 'international') return null;
      if (!data.shippingMethod) return 'Shipping method is required';
      if (!data.estimatedWeight || Number(data.estimatedWeight) <= 0) return 'Estimated weight is required';
      if (!data.expectedDeliveryDate) return 'Expected delivery date is required';
      return null;
    case 7:
      if (exportType !== 'international') return null;
      if (!data.hsCode?.trim()) return 'HS code is required';
      if (!data.purpose) return 'Purpose is required';
      return null;
    default:
      return null;
  }
}

export const REQUIRED_DOCUMENT_TYPES = [
  'passport_copy',
  'export_license_copy',
  'declaration_document',
] as const;
