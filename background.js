// Import Appwrite SDK
import { Client, Databases } from './appwrite-sdk.min.js';

// Appwrite client setup
const client = new Client();
client
    .setEndpoint("https://<your-appwrite-endpoint>")  // Replace with your Appwrite endpoint
    .setProject("<your-project-id>");  // Replace with your Appwrite project ID

const databases = new Databases(client);
const DATABASE_ID = "<your-database-id>";  // Replace with your Appwrite database ID
const COLLECTION_ID = "<your-collection-id>";  // Replace with your collection ID

// Track network traffic
let dataUsage = {};

// Monitor network requests
chrome.webRequest.onCompleted.addListener(
    (details) => {
        const site = new URL(details.url).hostname;

        // Get the content-length from the response headers
        const contentLengthHeader = details.responseHeaders.find(
            (header) => header.name.toLowerCase() === "content-length"
        );

        if (contentLengthHeader) {
            const contentLength = parseInt(contentLengthHeader.value, 10);

            // Add to dataUsage
            dataUsage[site] = (dataUsage[site] || 0) + contentLength;

            // Save updated data to local storage
            chrome.storage.local.set({ dataUsage });
        }
    },
    { urls: ["<all_urls>"] },
    ["responseHeaders"]
);

// Function to send data to Appwrite
const sendDataToAppwrite = async () => {
    chrome.storage.local.get("dataUsage", async (result) => {
        const storedData = result.dataUsage || {};
        const timestamp = new Date().toISOString();

        // Get unique userId based on browser or user-specific identifier
        const userId = `user_${Math.random().toString(36).substring(2, 15)}`; // For simplicity, a random userId

        for (const site in storedData) {
            try {
                // Create a new document in Appwrite
                await databases.createDocument(DATABASE_ID, COLLECTION_ID, "unique()", {
                    userId,
                    site,
                    trafficData: storedData[site],
                    timestamp,
                });
            } catch (error) {
                console.error(`Error sending data for ${site}:`, error);
            }
        }

        // Clear local storage after sending
        chrome.storage.local.set({ dataUsage: {} });
        dataUsage = {}; // Reset in-memory storage as well
    });
};

// Send data to Appwrite every 10 seconds
setInterval(sendDataToAppwrite, 10000);
