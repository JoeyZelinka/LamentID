// debug
const debug = require('debug')("scanner")
// snoostorm
const { CommentStream } = require("snoostorm");
// snoowrap
const Snoowrap = require("snoowrap");
// snoowrap credentials
const creds = {
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
};
// sentiment analysis
const Sentiment = require("sentiment");
// fs for saving seeder data
const fs = require("fs");
const db = require("../models");
// create objects
var sentiment = new Sentiment();
const client = new Snoowrap(creds);

// get keywords
async function getKeywords() {
  // get keywords from db
  const keywords = await db.Keyword.findAll();
  return keywords;
}

async function getSubreddits() {
  const subreddits = await db.Keyword.findAll({
    group: "subreddit",
    attributes: ["subreddit"],
  });
  return subreddits.map((x) => x.subreddit);
}

function getCommentStream(subreddits) {
  debug(subreddits)
  debug(subreddits.join("+"))
  return new CommentStream(client, {
    subreddit: subreddits.join("+"),
    // subreddit: "baseball+javascript",
    limit: 200,
    pollTime: 2000,
  });
}

async function scan() {
  let commentCount = 0;
  let keywords = await getKeywords();
  let subreddits = await getSubreddits();
  debug("starting scan");
  // get all keywords to scan

  // console.log(subreddits)
  const commentStream = getCommentStream(subreddits)

  commentStream.on("item", (comment) => {
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

      // uncomment below to generate seed data, then copy from ./comment_data to ./seeders/seeder_data
      // fs.writeFile(__dirname + `/seeder_data/${comment.id}.json`, JSON.stringify(commentContainer), function (err) {
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
        .then( async (comment) => {
          debug("comment id: ", commentContainer.data.id);
          // console.log(keywords[0]);
          comment.addKeywords(keywordsFound);
          commentCount++;
          if (commentCount > 1000) {
            commentCount = 0
            keywords = await getKeywords();
            subreddits = await getSubreddits();
            debug("getting new keywords: ", keywords)
            commentStream.end()
            commentStream = getCommentStream(subreddits)
          }
        })
        .catch((err) => {
          console.error("error failed to add comment to db: ", comment.id);
        });
    }
  });
  return commentStream;
}

module.exports = scan;
