// popup.js

// Event listeners for each button in the popup
document.getElementById('play-first').addEventListener('click', () => {
    sendMessageToContentScript('playFirst');
  });
  
  document.getElementById('play-last').addEventListener('click', () => {
    sendMessageToContentScript('playLast');
  });
  
  document.getElementById('play-next').addEventListener('click', () => {
    sendMessageToContentScript('playNextOrder');
  });
  
  document.getElementById('play-reverse').addEventListener('click', () => {
    sendMessageToContentScript('playReverseInOrder');
  });
  
  document.getElementById('next-video').addEventListener('click', () => {
    sendMessageToContentScript('nextVideo');
  });
  
  document.getElementById('prev-video').addEventListener('click', () => {
    sendMessageToContentScript('prevVideo');
  });
  
  // Function to send a message to the content script
  function sendMessageToContentScript(action) {
    console.log('FlipTube action:', action);
  
    // Query the active tab in the current Chrome window
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return; // No active tabs found
      const tab = tabs[0]; // Get the active tab
      console.log('Active tab URL:', tab.url);
  
      // Check if the URL belongs to a YouTube playlist
      if (isYouTubePlaylistURL(tab.url)) {
        // Send a message to the content script in the active tab
        chrome.tabs.sendMessage(tab.id, { action: action }, (response) => {
          if (chrome.runtime.lastError) {
            // Handle any errors that occur during message passing
            console.error('Error sending message:', chrome.runtime.lastError);
            alert('Error: ' + chrome.runtime.lastError.message);
          } else {
            // Successfully sent message to content script
            console.log('Message sent successfully:', response);
          }
        });
  
        // Close the popup after sending the message
        window.close();
      } else {
        // Alert the user if they're not on a YouTube playlist page
        alert('Please navigate to a YouTube playlist page.');
      }
    });
  }
  
  // Function to verify if a URL is a valid YouTube playlist URL
  function isYouTubePlaylistURL(url) {
    try {
      const urlObj = new URL(url); // Parse the URL
      return (
        urlObj.hostname.includes('youtube.com') && // Check if the URL is from YouTube
        urlObj.searchParams.has('list') // Check if it contains a 'list' parameter (indicates a playlist)
      );
    } catch (e) {
      // Handle invalid URLs
      console.error('Invalid URL:', url);
      return false;
    }
  }
  