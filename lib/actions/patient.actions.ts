"use server";

import { ID, Query } from "node-appwrite";
import {
  APPWRITE_STORAGE_KEY,
  APPWRITE_DB_ID,
  PATIENT_DB_ID,
  ENDPOINT,
  databases,
  storage,
  users,
  PROJECT_ID,
} from "../appwrite.config";
import { parseStringify } from "../utils";
import { InputFile } from "node-appwrite/file";

// CREATE
export const createUser = async (user: CreateUserParams) => {
  try {
    const newuser = await users.create(
      ID.unique(),
      user.email,
      user.phone,
      undefined,
      user.name
    );

    return parseStringify(newuser);
  } catch (error: any) {
    // Check existing user
    if (error && error?.code === 409) {
      const existingUser = await users.list([
        Query.equal("email", [user.email]),
      ]);

      return existingUser.users[0];
    }
    console.error("An error occurred while creating a new user:", error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const user = await users.get(userId);
    return parseStringify(user);
  } catch (err) {
    console.log(err);
  }
};

export const getPatient = async (userId: string) => {
  try {
    const patients = await databases.listDocuments(
      APPWRITE_DB_ID!,
      PATIENT_DB_ID!,
      [Query.equal("userId", userId)]
    );
    return parseStringify(patients.documents[0]);
  } catch (err) {
    console.log(err);
  }
};

export const registerPatient = async ({
  identificationDocument,
  ...patient
}: RegisterUserParams) => {
  try {
    // Upload file ->  // https://appwrite.io/docs/references/cloud/client-web/storage#createFile
    let file;
    if (identificationDocument) {
      const inputFile = InputFile.fromBuffer(
        identificationDocument?.get("blobFile") as Blob,
        identificationDocument?.get("fileName") as string
      );

      file = await storage.createFile(
        APPWRITE_STORAGE_KEY!,
        ID.unique(),
        inputFile
      );
    }
    // Create new patient document -> https://appwrite.io/docs/references/cloud/server-nodejs/databases#createDocument
    const newPatient = await databases.createDocument(
      APPWRITE_DB_ID!,
      PATIENT_DB_ID!,
      ID.unique(),
      {
        ...patient,
        identificationDocumentId: file?.$id ? file.$id : null,
        identificationDocumentUrl: `${ENDPOINT}/storage/buckets/${APPWRITE_STORAGE_KEY}/files/${file?.$id}/view??project=${PROJECT_ID}`,
      }
    );

    return parseStringify(newPatient);
  } catch (error) {
    console.error("An error occurred while creating a new patient:", error);
  }
};
