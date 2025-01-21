// background.js

chrome.runtime.onInstalled.addListener(() => {
  console.log("Web Traffic Logger Extension Installed.");
});

// Listen to the webNavigation API for page loads
chrome.webNavigation.onCompleted.addListener((details) => {
  console.log("Page loaded:", details);

  // Reset the total data loaded for the next page
  chrome.storage.local.set({ totalDataLoaded: 0 });

  // Retrieve and update web traffic data
  chrome.storage.local.get(["webTraffic"], (result) => {
    let webTraffic = result.webTraffic || [];
    webTraffic.push({
      url: details.url,
      timestamp: Date.now(),
      resourceType: "page"
    });
    chrome.storage.local.set({ webTraffic });
  });
});
