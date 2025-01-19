import { Client, Databases } from 'appwrite';

const client = new Client();
client
  .setEndpoint('https://cloud.appwrite.io/v1') // Replace with your Appwrite endpoint
  .setProject('[PROJECT-ID]'); // Replace with your project ID

export { client, Databases };
