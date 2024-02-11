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

    console.log('Making a directory for cron scripts...')
    try {
        fs.mkdirSync(destinationDir, { recursive: true });
        console.log('Directory created successfully');
    } catch (error) {
        console.error('Error making new directory:', error)
    }

    // Copy the clutterVac script to local cronscripts
    console.log(`Copying clutterVac script to ${destinationDir}...`);
    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
        if (err) {
            console.error('Error copying file:', err);
        } else {
            console.log('File copied successfully');
            console.log('Modifying file permissions...');
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