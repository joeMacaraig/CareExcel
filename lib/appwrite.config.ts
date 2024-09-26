import * as sdk from "node-appwrite";

export const {
  PROJECT_ID,
  APPWRITE_API_KEY,
  APPWRITE_DB_ID,
  APPWRITE_STORAGE_KEY,
  ENDPOINT,
  PATIENT_DB_ID,
  DOCTOR_DB_ID,
  APPOINTMENT_DB_ID,
} = process.env;

const client = new sdk.Client();

client.setEndpoint(ENDPOINT!).setProject(PROJECT_ID!).setKey(APPWRITE_API_KEY!);

export const databases = new sdk.Databases(client);
export const storage = new sdk.Storage(client);
export const messaging = new sdk.Messaging(client);
export const users = new sdk.Users(client);
