export interface locals {
  user: {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    // Add any other properties from your decodedClaims
  } | null;
  isAuthenticated: boolean;
}