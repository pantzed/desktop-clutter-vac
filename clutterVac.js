#!/usr/bin/env node

const { mkdir } = require("fs/promises");
const { readdirSync, renameSync } = require("fs");
const { extname, join } = require("path");

function clutterVac() {
    const root = "/Users/ed-pantzar/Desktop";
    const files = readdirSync(root);
    const fileTypeMap = {
        image: [
            ".jpg",
            ".jpeg",
            ".png",
            ".gif",
            ".psd",
            ".raw",
            ".bpm",
            ".svg",
            ".svgz",
        ],
        pdf: [".eps", ".pdf"],
        text: [".txt", ".doc", ".docx"],
        ppt: [".ppt", ".pptx"],
    };

    files.forEach((file) => {
        const fileType = extname(file);
        for (let type in fileTypeMap) {
            if (fileTypeMap[type].includes(fileType)) {
                mkdir(join(root, type), { recursive: true }).then(() => {
                    renameSync(join(root, file), join(root, type, file));
                });
            }
        }
    });
}

clutterVac();