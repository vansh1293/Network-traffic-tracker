// content.js

window.addEventListener("load", function () {
    let totalDataLoaded = 0;

    // Get all resources loaded on the page
    const resources = performance.getEntriesByType("resource");

    resources.forEach((resource) => {
        totalDataLoaded += resource.transferSize; // transferSize gives the resource size
    });

    function bytesToMB(bytes) {
        return (bytes / (1024 * 1024)).toFixed(2);
    }
    console.log("Total data loaded on page:", bytesToMB(totalDataLoaded), "Mb");

    // Store the data size into chrome storage for use in background
    chrome.storage.local.get("webTraffic", function (result) {
        let webTraffic = result.webTraffic || [];
        webTraffic.push({
            url: window.location.href,
            timestamp: Date.now(),
            totalDataLoaded: totalDataLoaded,
            resourceType: "page"
        });
        chrome.storage.local.set({ webTraffic: webTraffic });
    });

    // Optionally, store the total data size separately
    chrome.storage.local.set({ totalDataLoaded: totalDataLoaded });
});
