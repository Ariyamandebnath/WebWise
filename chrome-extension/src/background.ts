chrome.history.onVisited.addListener((historyItem) => {
  const searchData = {
    title: historyItem.title,
    url: historyItem.url,
    visitTime: historyItem.lastVisitTime,
  };
  chrome.storage.local.get(['searchHistory'], (result) => {
    const history = result.searchHistory || [];
    history.push(searchData);
    chrome.storage.local.set({ searchHistory: history });
  });
});