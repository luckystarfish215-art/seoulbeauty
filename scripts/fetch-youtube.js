
// SeoulBeauty Phase 2.4
// YouTube API Connector (Starter)

const fs = require("fs");

const apiKey = process.env.YOUTUBE_API_KEY;

if (!apiKey) {
  console.log("Missing YOUTUBE_API_KEY");
  process.exit(1);
}

console.log("YouTube API key detected");

// Next phase:
// Search YouTube
// Filter Shorts
// Save videos.json

fs.writeFileSync(
  "./data/videos.json",
  JSON.stringify([], null, 2)
);

console.log("videos.json updated");
