let activeTabId = null;
let activeUrl = null;
let activeStartTime = null;

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete' && tab.active) {
    activeTabId = tabId;
    activeUrl = tab.url;
    activeStartTime = new Date();

    logActivity(activeUrl, 'visited', activeStartTime);
  }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
  if (activeTabId && activeUrl) {
    const timeSpent = new Date() - activeStartTime;
    logActivity(activeUrl, 'time_spent', timeSpent);
  }

  chrome.tabs.get(activeInfo.tabId, (tab) => {
    activeTabId = activeInfo.tabId;
    activeUrl = tab.url;
    activeStartTime = new Date();
  });
});

// Log the browsing data and save it in chrome.storage
function logActivity(url, type, value) {
  let searchTerm = null;
  let thumbnailUrl = null;

  // Check if the URL is a search query
  if (url.includes('google.com/search')) {
    const urlParams = new URLSearchParams(new URL(url).search);
    searchTerm = urlParams.get('q'); // Extract the search term
  } else if (url.includes('youtube.com/watch')) {
    // For YouTube, retrieve the thumbnail URL
    const videoId = new URL(url).searchParams.get('v');
    thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; // Get the YouTube thumbnail
  }

  chrome.storage.local.get(['browsingData'], (result) => {
    const data = result.browsingData || [];
    data.push({
      url: url,
      type: type,
      value: value,
      searchTerm: searchTerm || null, // Store the search term if available
      thumbnail: thumbnailUrl || null, // Store the thumbnail if available
      timestamp: new Date().toISOString(),
    });
    chrome.storage.local.set({ browsingData: data });
  });
}
