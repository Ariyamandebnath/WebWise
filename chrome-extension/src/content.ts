const videoElements = document.querySelectorAll('video, iframe');
videoElements.forEach(video => {
  video.addEventListener('play', () => {
    const videoData = {
      title: document.title,
      currentTime: video.currentTime,
      src: video.src || video.getAttribute('src'),
    };
    chrome.storage.local.get(['videoHistory'], (result) => {
      const history = result.videoHistory || [];
      history.push(videoData);
      chrome.storage.local.set({ videoHistory: history });
    });
  });
});