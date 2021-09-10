// snoostorm
const { CommentStream } = require("snoostorm");
// snoowrap
const Snoowrap = require("snoowrap");
// snoowrap credentials
const creds = require("./credentials/reddit-credentials.json");
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
// const wordsToScan = ["the", "and"];

// Options object is a Snoowrap Listing object, but with subreddit and pollTime options
const commentStream = new CommentStream(client, {
  subreddit: "autos+cars+trucks+kia+nissan+honda+ford",
  limit: 20,
  pollTime: 2000,
});

// track number of comments scanned
let numberOfCommentsScanned = 0;

function scan() {
  // call the loop
  commentStream.on("item", (comment) => {
    numberOfCommentsScanned++;

    // scan comment for sentiment
    const sentimentResult = sentiment.analyze(comment.body);
    sentimentResult.wordsFound = [];

    sentimentResult.tokens.forEach((word) => {
      wordsToScan.forEach((wordToScan) => {
        if (word == wordToScan) {
          sentimentResult.wordsFound.push(word);
        }
      });
    });

    if (sentimentResult.wordsFound.length) {
      const commentContainer = {};
      commentContainer.data = comment;
      commentContainer.sentiment = sentimentResult;
      // add comment properties to result
      // sentimentResult.id = comment.id;
      // sentimentResult.body = comment.body;
      // sentimentResult.subreddit_id = comment.subreddit_id;
      // sentimentResult.subreddit_name = comment.subreddit.display_name;
      // sentimentResult.author_id = comment.author_id;
      // sentimentResult.author_name = comment.author.name;
      // sentimentResult.author_fullname = comment.author_fullname;
      // sentimentResult.link_id = comment.link_id;
      // sentimentResult.created_utc = comment.created_utc;
      // sentimentResult.link_title = comment.link_title;
      // sentimentResult.link_url = comment.link_url;
      // sentimentResult.link_id = comment.link_id;
      // sentimentResult.parent_id = comment.parent_id;

      // todo replace with db.create to postgress
      // comments.push(sentimentResult);
      // comments.push(commentContainer);
      // console.log(commentContainer);
      // fs.writeFile(`./comment_data/${comment.id}.json`, JSON.stringify(commentContainer), function (err) {
      //   if (err) {
      //     console.log(err);
      //   }
      //   console.log(`${comment.id} saved`);
      // });
      db.Comment.create({
        data: JSON.stringify(commentContainer.data),
        sentiment: JSON.stringify(commentContainer.sentiment),
      }).then((comment) => {
        console.log('comment log: ', commentContainer.data.id);
      });
    }

    // console.log("number of comments scanned: ", numberOfCommentsScanned);
    // console.log("number of comments saved: ", comments.length);
  });
}

module.exports = scan;
