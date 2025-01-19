import {  Account,Client } from 'appwrite';
import { Databases } from 'appwrite';

const projectId = process.env.APPWRITE_PROJECT_ID;
const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject(projectId); // Replace with your project ID

export { client, Databases };
