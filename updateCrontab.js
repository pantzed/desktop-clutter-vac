#!/usr/bin/env node

const { exec } = require('child_process');

function updateCrontab(newCronJob) {
    const readCronCommand = 'crontab -l';

    // Read and update existing crontab
    exec(readCronCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error reading crontab: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Error reading crontab: ${stderr}`);
        return;
    }

    const combinedCron = stdout.trim() + '\n' + newCronJob;
    const updateCronCommand = `echo "${combinedCron}" | crontab -`;

        // Update crontab
        exec(updateCronCommand, (error, stdout, stderr) => {
            if (error) {
            console.error(`Error updating crontab: ${error.message}`);
            return;
            }
            if (stderr) {
            console.error(`Error updating crontab: ${stderr}`);
            return;
            }
            console.log('Crontab updated successfully');
        });
    });
}

module.exports = updateCrontab;


