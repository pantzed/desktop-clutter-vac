#!/usr/bin/env node

const { exec } = require('child_process');

function updateCrontab(newCronJob) {
    console.log('Updating crontab file...');
    exec('crontab -l', (error, stdout, stderr) => {
        if (stdout.includes(newCronJob)) {
            console.log('Job already exists in crontab, skipping.');
            return;
        }
        if (!error) {
            const combinedCron = stdout.trim() + '\n' + newCronJob;
            const updateCronCommand = `echo "${combinedCron}" | crontab -`;
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
        } else {
            const newCronCommand = `echo "${newCronJob}" | crontab -`;
            exec(newCronCommand, (error, stdout, stderr) => {
                if (error) {
                    console.error('Error creating crontab:', error);
                    return;
                }
                console.log(`New crontab created for user ${process.env.USER}`);
            });   
        }
    });
}

module.exports = updateCrontab;


