// content.js

console.log('FlipTube content script loaded.');

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('FlipTube received action:', request.action);
  if (request.action === 'playFirst') {
    playFromFirst();
  } else if (request.action === 'playLast') {
    playFromLast();
  } else if (request.action === 'playNextOrder') {
    playNextInOrder();
  } else if (request.action === 'playReverseInOrder') {
    playReverseInOrder();
  } else if (request.action === 'nextVideo') {
    playNextVideo();
  } else if (request.action === 'prevVideo') {
    playPrevVideo();
  }
});

function playFromFirst() {
  waitForPlaylist(() => {
    const videoElements = getVideoElements();
    if (videoElements.length === 0) return;

    // Start playing the first video
    videoElements[0].querySelector('a#thumbnail').click();
  });
}

function playFromLast() {
  waitForPlaylist(() => {
    const videoElements = getVideoElements();
    if (videoElements.length === 0) return;

    // Start playing the last video
    videoElements[videoElements.length - 1].querySelector('a#thumbnail').click();
  });
}

function playNextInOrder() {
  alert('Playing playlist in order from the current video.');
}

function playReverseInOrder() {
  waitForPlaylist(() => {
    const videoElements = getVideoElements();
    if (videoElements.length === 0) return;

    const playlistContainer = document.querySelector('ytd-playlist-video-list-renderer #contents');

    // Detach all video elements to prevent reflow issues
    videoElements.forEach((videoElement) => {
      videoElement.remove();
    });

    // Reverse the order and re-append to the container
    videoElements.reverse().forEach((videoElement) => {
      playlistContainer.appendChild(videoElement);
    });

    // Start playing from the first video in the reversed list
    videoElements[0].querySelector('a#thumbnail').click();
  });
}

function playNextVideo() {
  waitForPlaylist(() => {
    const currentVideoId = getCurrentVideoId();
    const videoElements = getVideoElements();
    if (videoElements.length === 0 || !currentVideoId) return;

    let foundCurrent = false;
    for (let i = 0; i < videoElements.length; i++) {
      const videoId = getVideoIdFromElement(videoElements[i]);
      if (foundCurrent) {
        // Play the next video
        videoElements[i].querySelector('a#thumbnail').click();
        return;
      }
      if (videoId === currentVideoId) {
        foundCurrent = true;
      }
    }
    alert('This is the last video in the playlist.');
  });
}

function playPrevVideo() {
  waitForPlaylist(() => {
    const currentVideoId = getCurrentVideoId();
    const videoElements = getVideoElements();
    if (videoElements.length === 0 || !currentVideoId) return;

    let previousVideoElement = null;
    for (let i = 0; i < videoElements.length; i++) {
      const videoId = getVideoIdFromElement(videoElements[i]);
      if (videoId === currentVideoId) {
        if (previousVideoElement) {
          // Play the previous video
          previousVideoElement.querySelector('a#thumbnail').click();
          return;
        } else {
          alert('This is the first video in the playlist.');
          return;
        }
      }
      previousVideoElement = videoElements[i];
    }
    alert('Current video not found in the playlist.');
  });
}

// Helper functions
function waitForPlaylist(callback) {
  const checkExist = setInterval(() => {
    const playlistPanel = document.querySelector('ytd-playlist-video-list-renderer #contents');
    if (playlistPanel && playlistPanel.children.length > 0) {
      clearInterval(checkExist);
      callback();
    }
  }, 500);
}

function getVideoElements() {
  const videoElements = Array.from(
    document.querySelectorAll('ytd-playlist-video-list-renderer ytd-playlist-video-renderer')
  );

  console.log('Number of videos found:', videoElements.length);

  if (videoElements.length === 0) {
    alert('No videos found in the playlist.');
  }

  return videoElements;
}

function getCurrentVideoId() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('v');
}

function getVideoIdFromElement(element) {
  const url = element.querySelector('a#thumbnail').href;
  const urlParams = new URLSearchParams(new URL(url).search);
  return urlParams.get('v');
}
