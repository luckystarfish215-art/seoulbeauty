
// SeoulBeauty Phase 2.5
// Real YouTube Search

const fs = require("fs");

const API_KEY = process.env.YOUTUBE_API_KEY;

async function searchYoutube(query) {
  const url =
    `https://www.googleapis.com/youtube/v3/search` +
    `?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}` +
    `&key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  return data.items || [];
}

async function main() {
  const rules = require("../data/search-rules.json");

  const results = [];

  for (const rule of rules) {
    for (const query of rule.searches) {
      const videos = await searchYoutube(query);

      videos.forEach(v => {
        results.push({
          brand: rule.brand,
          videoId: v.id.videoId,
          title: v.snippet.title,
          channel: v.snippet.channelTitle,
          publishedAt: v.snippet.publishedAt,
          thumbnail: v.snippet.thumbnails?.high?.url || ""
        });
      });
    }
  }

  fs.writeFileSync(
    "./data/videos.json",
    JSON.stringify(results, null, 2)
  );

  console.log(`Saved ${results.length} videos`);
}

main().catch(console.error);
