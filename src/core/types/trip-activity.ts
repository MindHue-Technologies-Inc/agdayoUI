import type {FieldValue} from "firebase-admin/firestore";

export interface ActivityWriteData {
  id?: string,
  tripId: string,
  name: string,
  time: string,
  date: string,
  location: string,
  cost?: number,
  costCurrency?: string,
  costNote?: string,
  description?: string,
  iconName?: string,
  title: string,
  datetime: string,
  createdAt: FieldValue,
  createdBy: string,
  coordinates: {
    longitude: number,
    latitude: number;
  }
}

export interface ActivityUpdateData {
  id: string,
  tripId: string,
  name: string,
  time: string,
  date: string,
  location: string,
  cost: number,
  costCurrency: string,
  costNote: string,
  description: string,
  iconName: string,
  title: string,
  datetime: string,
  createdAt: FieldValue,
  updatedAt: FieldValue,
  createdBy: string,
  coordinates: {
    longitude: number,
    latitude: number;
  }
}