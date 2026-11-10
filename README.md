# Savannah Drake: desktop portfolio

Open `index.html` in a browser or with VS Code Live Server. You don't need a build step. Fonts and project images load from online URLs.

## Photos and video
Everything lives in `images/`. Your phone's saved location and camera info have been removed from these files.

- `desk.jpg`: the polaroid on the desktop
- `me-1.jpg` to `me-4.jpg`: the About me profile photos, in order
- `fresh-food-presenting.jpg`: the photo on the Fresh Food Access project page
- `ootd_internship_edition.mp4` and `ootd-poster.jpg`: the "fit check" video, on the profile and in `ootd.mov` on the desktop

To swap a photo, replace the file and keep the name.

## What's where
- **Layout:** sections open full screen between the top bar and the dock. The dock is the main way to get around. The red and amber dots go back to the desktop, and the green dot puts the browser in full screen.
- **Desktop:** folders, résumé.pdf (opens `docs/Savannah_Drake_Resume.pdf`), trash (with jokes about old work), a to-do sticky note and a polaroid. You can drag the note and the polaroid on desktop screens.
- **About me:** runs the "system check" popups once per visit. Then it shows a dating-app-style profile with photos, prompt cards, basics and check / pass buttons. Edit the prompts in `about-template` in `index.html`.
- **Toolkit:** a `requirements.txt`. Project names in the comments open that project.
- **Contact:** a compose window that opens the visitor's email app with the subject and message filled in.
- **Project data:** the `projects` array in `script.js`. The other pages are templates in `index.html`.
