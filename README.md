# FlipTube

FlipTube is a Chrome extension that gives you control over how you play YouTube playlists. Choose to play from the first video, the last video, continue playing in order, or reverse the playlist order.

## Features

- **Play from the First:** Start playing the playlist from the first video.
- **Play from the Last:** Start playing the playlist from the last video.
- **Play Next in Order:** Continue playing the playlist in the current order.
- **Play Reverse in Order:** Reverse the playlist order and continue playing from the current video.

## Installation

1. **Download or Clone the Repository:**

   - Download the ZIP file or clone the repository to your local machine.

2. **Navigate to Chrome Extensions:**

   - Open Google Chrome and go to `chrome://extensions/`.

3. **Enable Developer Mode:**

   - Toggle the **Developer mode** switch in the top right corner.

4. **Load the Unpacked Extension:**

   - Click on **Load unpacked** and select the `flip-tube` folder you downloaded or cloned.

5. **Extension Loaded:**

   - FlipTube should now appear in your list of extensions.

## Usage

1. **Go to a YouTube Playlist:**

   - Navigate to a YouTube playlist page (`https://www.youtube.com/playlist?list=...`).

2. **Open FlipTube:**

   - Click on the **FlipTube** extension icon in your Chrome toolbar.

3. **Choose an Option:**

   - In the popup that appears, select one of the four options:
     - **Play from the First**
     - **Play from the Last**
     - **Play Next in Order**
     - **Play Reverse in Order**

4. **Enjoy:**

   - FlipTube will perform the selected action on your playlist.

## Notes

- **Playlist Not Loading?**

  - If the playlist does not load properly, refresh the page and try again.

- **Default Playlist:**

  - If you're not on a playlist page, FlipTube will attempt to open a default playlist. You can set this in `popup.js` by replacing `'YOUR_PLAYLIST_ID'` with a valid playlist ID.

- **Compatibility:**

  - FlipTube works best with the standard YouTube layout.

## Customization

- **Change the Default Playlist:**

  - In `popup.js`, replace `'YOUR_PLAYLIST_ID'` with your preferred playlist ID.

- **Customize Colors:**

  - Adjust the color scheme by editing `styles.css`.

- **Update Icons:**

  - Use your own icons by replacing the images in the `icons` folder.

## Disclaimer

This extension modifies the YouTube playlist interface in your browser for personal use. Use it responsibly.

## License

This project is licensed under the MIT License.
