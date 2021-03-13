import { Offer } from './offer';

export class RentalAgreement {
  id: number;
  amount: number;
  leasePeriod: number;
  leaseStart: string;
  terms: number;
  tenantWalletAddress: number;
  contractBlockAddress: string;
  ownerAgreed: boolean;
  tenantAgreed: boolean;
  status: string;
  createdAt: string;
  offer: Offer
}
