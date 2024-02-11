# Desktop ClutterVac
This repository provides a script for automatically organizing cluttered files on your desktop into categorized folders. The script is installed as a cronjob that runs once every 15 minutes.

> **Important!** This script is only intended to be run on macOS.

By default, the script looks for the following file types and places them in a corresponding named folder.

| Folder Name | File Types |
|-------------|------------|
| image    |  .jpg, .jpeg, .png, .gif, .psd, .raw, .bpm, .svg, .svgz |
| pdf    |  .eps, .pdf  |
| text    | .txt, .doc, .docx |
| ppt    | .ppt, .pptx |

## Installation
1. Clone the repository
```
git clone https://github.com/pantzed/desktop-clutter-vac.git
```
2. Navigate to the project root
```
cd /path/to/project/root
```
3. Run the script
```
node index.js
```