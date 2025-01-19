let totalDataLoaded = 0;  // This variable will store the total data loaded

// Listen for completed network requests
chrome.declarativeNetRequest.onCompleted.addListener((details) => {
  // Sum up the size of each resource
  totalDataLoaded += details.responseHeaders.reduce((total, header) => {
    if (header.name.toLowerCase() === 'content-length') {
      return total + parseInt(header.value, 10);
    }
    return total;
  }, 0);

}, {
  urls: ["<all_urls>"], // Listen for all URLs
  types: ["main_frame", "sub_frame", "script", "image", "stylesheet", "font", "xmlhttprequest"]
});

// Listen for when the page finishes loading (onCompleted)
chrome.webNavigation.onCompleted.addListener((details) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    let tab = tabs[0];
    let url = tab.url;
    let hostname = new URL(url).hostname;  // Extract the hostname from the URL

    // Store the total data loaded in local storage
    chrome.storage.local.get(["webTraffic"], function (result) {
      let webTraffic = result.webTraffic || [];
      webTraffic.push({
        url: url,
        hostname: hostname,
        totalDataLoaded: totalDataLoaded
      });
      // Save the updated traffic data back to local storage
      chrome.storage.local.set({ webTraffic: webTraffic });
    });

    // Reset total data loaded for the next page
    totalDataLoaded = 0;
  });
});
