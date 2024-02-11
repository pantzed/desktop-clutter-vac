#!/usr/bin/env node

const fs = require('fs');
const { exec } = require('child_process');
const path = require('path');
const os = require('os');
const updateCrontab = require('./updateCrontab');

function init() {
    const homeDir = os.homedir();
    const destinationDir = path.join(homeDir, 'cronscripts');
    const sourceFilePath = './clutterVac.js';
    const fileName = path.basename(sourceFilePath);
    const destinationFilePath = path.join(destinationDir, fileName);

    try {
        fs.mkdirSync(destinationDir, { recursive: true });
    } catch (error) {
        console.error('Error making new directory:', error)
    }

    // Copy the clutterVac script to local cronscripts
    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
            console.error('Error copying file:', err);
        } else {
            console.log('File copied successfully');
            exec(`chmod +x ${destinationFilePath}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`Error making file executable: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`Error making file executable: ${stderr}`);
                    return;
                }
            console.log('File made executable successfully');
            });
        }
    }); 
    // Add clutterVac to crontab
    updateCrontab(`*/15 * * * * source ~/.zprofile && node ${destinationFilePath}`);
}

init();