import Chart from 'chart.js';

const historyDiv = document.getElementById('history');
const ctx = document.getElementById('chart').getContext('2d');

chrome.storage.local.get(['searchHistory', 'videoHistory'], (result) => {
  const searchHistory = result.searchHistory || [];
  const videoHistory = result.videoHistory || [];

  searchHistory.forEach(item => {
    const div = document.createElement('div');
    div.textContent = `Title: ${item.title}, URL: ${item.url}, Visited: ${new Date(item.visitTime).toLocaleString()}`;
    historyDiv.appendChild(div);
  });

  const videoTitles = videoHistory.map(item => item.title);
  const videoCounts = videoTitles.reduce((acc, title) => {
    acc[title] = (acc[title] || 0) + 1;
    return acc;
  }, {});

  const chartData = {
    labels: Object.keys(videoCounts),
    datasets: [{
      label: 'Video Watch Count',
      data: Object.values(videoCounts),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1
    }]
  };

  new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
});