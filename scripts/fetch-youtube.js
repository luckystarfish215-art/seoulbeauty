import fs from "fs";

const API_KEY = process.env.YOUTUBE_API_KEY;

async function searchYoutube(query) {
const url =
`https://www.googleapis.com/youtube/v3/search` +
`?part=snippet&type=video&maxResults=10&q=${encodeURIComponent(query)}` +
`&key=${API_KEY}`;

const response = await fetch(url);
const data = await response.json();

if (data.error) {
console.error("YouTube API Error:", data.error);
return [];
}

return data.items || [];
}

async function main() {
const rules = JSON.parse(
fs.readFileSync(
new URL("../data/search-rules.json", import.meta.url),
"utf8"
)
);

const results = [];
const seen = new Set();

for (const rule of rules) {
for (const query of rule.searches) {
const videos = await searchYoutube(query);

  videos.forEach((v) => {
    if (!v?.id?.videoId) return;

    if (seen.has(v.id.videoId)) return;
    seen.add(v.id.videoId);

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
new URL("../data/videos.json", import.meta.url),
JSON.stringify(results, null, 2)
);

console.log(`Saved ${results.length} videos`);
}

main().catch(console.error);
