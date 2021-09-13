// snoostorm
const { CommentStream } = require("snoostorm");
// snoowrap
const Snoowrap = require("snoowrap");
// snoowrap credentials
const creds = {
  "userAgent": process.env.REDDIT_USER_AGENT,
  "clientId": process.env.REDDIT_CLIENT_ID,
  "clientSecret": process.env.REDDIT_CLIENT_SECRET,
  "refreshToken": process.env.REDDIT_REFRESH_TOKEN
}
// sentiment analysis
const Sentiment = require("sentiment");
// fs for saving seeder data
const fs = require("fs");
const db = require("../models");
// create objects
var sentiment = new Sentiment();
const client = new Snoowrap(creds);

// keep track of comments
const comments = [];

// hard-coded words to scan
const wordsToScan = [
  "kia",
  "nissan",
  "honda",
  "ford",
  "soul",
  "seltos",
  "sportage",
  "niro",
  "sorento",
  "telluride",
  "carnival",
  "versa",
  "senta",
  "altima",
  "maxima",
  "leaf",
  "gt-r",
  "gtr",
  "kicks",
  "rogue sport",
  "rogue",
  "murano",
  "pathfinder",
  "armada",
  "ariya",
  "frontier",
  "titan",
  "hr-v",
  "hrv",
  "cr-v",
  "crv",
  "passport",
  "pilot",
  "civic",
  "accord",
  "insight",
  "clarity",
  "type-r",
  "typer",
  "odyssey",
  "ridgeline",
  "prologue",
  "ecosport",
  "escape",
  "bronco",
  "edge",
  "explorer",
  "mach-e",
  "mache",
  "expediton",
  "maverick",
  "ranger",
  "Transit",
  "f-150",
  "f150",
  "superduty",
  "mustang",
];

// track number of comments scanned
let numberOfCommentsScanned = 0;

// get keywords
async function getKeywords() {
  // build keyword storage
  // get keywords from db
  const keywords = await db.Keyword.findAll();
  // do something with each keyword
  // keywords.forEach((keyword) => {
  //   const data = keyword.dataValues
  //   const thing = {};
  //   const subreddit = data.subreddit;
  //   if (!thing[`${subreddit}`]) {
  //     newSubreddit = thing[`${subreddit}`];
  //     newSubreddit.keywords = [];
  //     newSubreddit.keywords.push(keyword.searchTerm);
  //   }
  //   console.log(data);
  // });
  return keywords;
}

async function getSubreddits() {
  const subreddits = await db.Keyword.findAll({
    group: "subreddit",
    attributes: ["subreddit"],
  });
  return subreddits.map((x) => x.subreddit);
}

async function scan() {
  console.log("starting scan")
  // get all keywords to scan
  // Options object is a Snoowrap Listing object, but with subreddit and pollTime options
  const keywords = await getKeywords();
  const subreddits = await getSubreddits();
  // console.log(subreddits)
  const commentStream = new CommentStream(client, {
    subreddit: subreddits.join("+"),
    limit: 200,
    pollTime: 2000,
  });
  // get keywords
  // console.log(keywords);
  // call the loop

  commentStream.on("item", (comment) => {
    // console.log('new comment: ', comment.subreddit)
    numberOfCommentsScanned++;

    // scan comment for sentiment
    const sentimentResult = sentiment.analyze(comment.body);
    keywordsFound = [];

    sentimentResult.tokens.forEach((word) => {
      keywords.forEach((keyword) => {
        if (
          word == keyword.searchTerm &&
          comment.subreddit.display_name == keyword.subreddit
        ) {
          keywordsFound.push(keyword);
        }
      });
    });

    if (keywordsFound.length) {
      const commentContainer = {};
      commentContainer.data = comment;
      commentContainer.sentiment = sentimentResult;

      // todo replace with db.create to postgress
      // uncomment below to generate seed data, then copy from ./comment_data to ./seeders/seeder_data
      // fs.writeFile(`./comment_data/${comment.id}.json`, JSON.stringify(commentContainer), function (err) {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log(`${comment.id} saved`);
      // });
      db.Comment.create({
        data: JSON.stringify(commentContainer.data),
        sentiment: JSON.stringify(commentContainer.sentiment),
        redditId: comment.id,
      })
        .then((comment) => {
          console.log("comment id: ", commentContainer.data.id);
          // console.log(keywords[0]);
          comment.addKeywords(keywordsFound);
        })
        .catch((err) => {
          console.error("error failed to add comment to db: ", comment.id);
        });
    }
  });
}

module.exports = scan;
