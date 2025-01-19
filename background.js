chrome.webNavigation.onCompleted.addListener((details) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      let tab = tabs[0];
      let url = tab.url;
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: logPageSize
      });
    });
  });
  
  function logPageSize() {
    const size = document.documentElement.innerHTML.length;
    console.log("URL:", window.location.href);
    console.log("Page Size:", size, "bytes");
  }
  