// popup.js

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
  
  function sendMessageToContentScript(action) {
    console.log('FlipTube action:', action);
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs.length === 0) return;
      const tab = tabs[0];
      console.log('Active tab URL:', tab.url);
      if (isYouTubePlaylistURL(tab.url)) {
        chrome.tabs.sendMessage(tab.id, { action: action }, (response) => {
          if (chrome.runtime.lastError) {
            console.error('Error sending message:', chrome.runtime.lastError);
            alert('Error: ' + chrome.runtime.lastError.message);
          } else {
            console.log('Message sent successfully:', response);
          }
        });
        window.close(); // Close the popup after sending the message
      } else {
        alert('Please navigate to a YouTube playlist page.');
      }
    });
  }
  
  function isYouTubePlaylistURL(url) {
    try {
      const urlObj = new URL(url);
      return urlObj.hostname.includes('youtube.com') && urlObj.searchParams.has('list');
    } catch (e) {
      console.error('Invalid URL:', url);
      return false;
    }
  }
  