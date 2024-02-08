#!/usr/bin/env node

const {access, copyFile} = require('fs');
const { exec } = require('child_process');
const path = require('path');
const updateCrontab = require('./updateCrontab');

function init() {
    const sourceFilePath = './clutterVac.js';
    const destinationDir = '/usr/local/cronscripts/';
    const fileName = path.basename(sourceFilePath);
    const destinationFilePath = path.join(destinationDir, fileName);

    // Copy the clutterVac script to local cronscripts
    access(destinationFilePath, fs.constants.F_OK, (err) => {  
    if (err) {
        copyFile(sourceFilePath, destinationFilePath, (err) => {
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
    } else {
        console.log('Destination file already exists. Skipping copy.');
    }
    });

    // Add clutterVac to crontab
    updateCrontab(`*/1 * * * * source ~/.zprofile && node ${destinationFilePath}`);
}

init();