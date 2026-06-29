// Simple per-user billing profile persistence (one per user) via localStorage.
// Replace with backend call when Cloud is enabled.

export type IdType = "cedula" | "ruc";

export interface BillingProfile {
  idType: IdType;
  idNumber: string;
  name: string;
  email: string;
  phone: string;
}

const KEY = "chokao.billingProfile";

export const getBillingProfile = (): BillingProfile | null => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as BillingProfile;
    if (!p?.idNumber || !p?.name) return null;
    return p;
  } catch {
    return null;
  }
};

export const saveBillingProfile = (p: BillingProfile) => {
  try {
    localStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    /* noop */
  }
};

export const clearBillingProfile = () => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* noop */
  }
};
