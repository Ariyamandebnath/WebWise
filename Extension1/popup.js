document.addEventListener('DOMContentLoaded', () => {
  const activityList = document.getElementById('activityList');

  // Maximum number of items to show initially
  const ITEMS_TO_SHOW = 6;

  // Fetch browsing data from chrome.storage.local
  chrome.storage.local.get(['browsingData'], (result) => {
    const data = result.browsingData || [];

    // Reverse the data to show the most recent first
    const reversedData = data.reverse();

    // If no data is available
    if (reversedData.length === 0) {
      activityList.innerHTML = '<li>No browsing activity tracked yet.</li>';
    } else {
      // Show the initial set of items
      renderItems(reversedData.slice(0, ITEMS_TO_SHOW));

      // If there are more items, add the "Show More" button
      if (reversedData.length > ITEMS_TO_SHOW) {
        const showMoreButton = document.createElement('button');
        showMoreButton.innerText = 'Show More';
        showMoreButton.style.margin = '10px auto';
        showMoreButton.style.display = 'block';
        showMoreButton.style.padding = '10px';
        showMoreButton.style.cursor = 'pointer';
        
        activityList.appendChild(showMoreButton);

        // When "Show More" is clicked, show the remaining items
        showMoreButton.addEventListener('click', () => {
          renderItems(reversedData.slice(ITEMS_TO_SHOW));
          showMoreButton.style.display = 'none'; // Hide the "Show More" button after clicking
        });
      }
    }
  });

  // Function to render list items and send them to the backend
  function renderItems(items) {
    items.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `
        <div class="url">${item.searchTerm ? `Search Term: ${item.searchTerm}` : item.url}</div>
        ${item.thumbnail ? `<img src="${item.thumbnail}" alt="Video Thumbnail" width="120" height="90"/>` : ''}
        <div class="time">${item.type === 'visited' ? 'Visited' : 'Time spent'}: ${item.type === 'time_spent' ? item.value / 1000 : 'N/A'} seconds</div>
        <div class="time">Timestamp: ${new Date(item.timestamp).toLocaleString()}</div>
      `;
      activityList.appendChild(listItem);

      // Send the data to the backend
      fetch('http://localhost:5000/log-activity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: item.url,
          searchTerm: item.searchTerm,
          thumbnail: item.thumbnail,
          timeSpent: item.value,
          timestamp: item.timestamp,
        }),
      })
        .then((response) => {
          if (response.ok) {
            console.log('Activity logged successfully');
          } else {
            console.error('Failed to log activity');
          }
        })
        .catch((error) => {
          console.error('Error logging activity:', error);
        });
    });
  }
});
