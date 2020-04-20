const fs = require("fs");
const path = require("path");
const chokidar = require("chokidar");

const watchDir = "/watch";
const watchPath = path.join(watchDir, process.env.WATCH_FILES_GLOB || "*");
console.log(`Watching ${watchPath}`);

chokidar
  .watch(watchPath, {
    ignored: process.env.IGNORE, // Example: /(^|[\/\\])\../ ignore dotfiles
    ignoreInitial: true, // Do not print all files when starting, only changes
  })
  .on("all", (event, path) => {
    console.log(`\u001b[32m${event} ${path}\u001b[39m`);
    console.log(fs.readFileSync(path, "utf8"));
  });
