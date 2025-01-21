document.addEventListener("DOMContentLoaded", function () {
    // Fetch traffic data from local storage
    chrome.storage.local.get(["webTraffic"], function (result) {
        const trafficList = document.getElementById("trafficData");

        // Check if there is data
        if (result.webTraffic && result.webTraffic.length > 0) {
            result.webTraffic.forEach((entry) => {
                const listItem = document.createElement("li");
                listItem.textContent = `${entry.url} - ${entry.timestamp}`;
                trafficList.appendChild(listItem);
            });
        } else {
            const listItem = document.createElement("li");
            listItem.textContent = "No data available.";
            trafficList.appendChild(listItem);
        }
    });
});
