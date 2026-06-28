import type { ExportType, ShippingMethod } from '@/lib/types/shipment';

interface PricingInput {
  exportType: ExportType;
  shippingMethod: ShippingMethod;
  estimatedWeight: number;
  productValue: number;
  insuranceRequired: boolean;
  sourceCountry: string;
  destinationCountry: string;
}

export function estimateShipmentCosts(input: PricingInput) {
  const baseRates: Record<ShippingMethod, number> = {
    air: 8.5,
    sea: 2.2,
    road: 1.5,
  };

  const methodRate = baseRates[input.shippingMethod] ?? 2;
  const weight = Math.max(input.estimatedWeight || 1, 1);
  const isInternational =
    input.exportType === 'international' ||
    input.sourceCountry.toLowerCase() !== input.destinationCountry.toLowerCase();

  const distanceMultiplier = isInternational ? 2.4 : 1;
  const shippingCost = Math.round(weight * methodRate * distanceMultiplier * 100) / 100;

  const taxRate = isInternational ? 0.12 : 0.05;
  const taxes = Math.round((input.productValue || 0) * taxRate * 100) / 100;

  const insurance = input.insuranceRequired
    ? Math.round((input.productValue || 0) * 0.015 * 100) / 100
    : 0;

  return {
    estimatedShippingCost: shippingCost + insurance,
    estimatedTaxes: taxes,
    insuranceCost: insurance,
  };
}
