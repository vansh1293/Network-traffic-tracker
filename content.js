function logPageSize(hostname) {
    const size = document.documentElement.innerHTML.length;  // Calculate the size of the HTML content
    console.log("URL:", window.location.href);
    console.log("Page Size:", size, "bytes");
    console.log("Host:", hostname);

    // You can still log the page size, or you can remove this if you only care about the total data loaded
}

// Listen for messages from the background script to log the page size
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "logPageSize") {
        logPageSize(message.hostname);
    }
});
