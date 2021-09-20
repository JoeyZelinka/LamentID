var express = require('express');
const db = require('../models');
var router = express.Router();


// Create New Project
router.post('/new', async (req, res) =>{
  // check for content
  if (!req.body || !req.body.name || !req.body.keywords ) {
    res.status(400).json({
      error: 'Please include all required fields.'
    })
    return
  }
  //find logged in user
  const user = await db.User.findByPk(req.session.user.id)
  //create project
    //create name for project
    const project = await user.createProject({
      name: req.body.name
    })
    //add searchTerm and subreddit
    if( req.body.keywords ) {
      req.body.keywords.forEach(async keyword => {
        await project.createKeyword({
          searchTerm: keyword.searchTerm,
          subreddit: keyword.subreddit
        })
      });
    }
    //respond with success/error
    res.json({
      success: 'Created new project.'
    })
});


//Get Projects
router.get('/', async (req, res) => {
  const user = await db.User.findByPk(req.session.user.id)
  //find all projects
  const projects = await db.Project.findAll({
    where: {
      UserId: user.id
    }
  })
  //send back
  res.send(projects)
})



//Get Project
router.get("/:project_id", async (req, res) => {
  // const user = await db.User.findByPk(req.session.user.id)
  //find one project
  const project = await db.Project.findByPk(req.params.project_id);
  //send back
  res.send(project);
});

router.get("/:project_id/keywords", async (req, res) => {
  // const user = await db.User.findByPk(req.session.user.id)
  //find one project
  const keywords = await db.Keyword.findAll({
    where: {
      ProjectId: req.params.project_id,
    },
  });
  //send back
  res.send(keywords);
});


router.post("/:project_id/keywords", async (req, res) => {
  // check for content
  if (!req.body || !req.body.keywords ) {
    res.status(400).json({
      error: 'Please include all required fields.'
    })
    return
  }
  //create project where project id matches
  const project = await db.Project.findByPk(req.params.project_id)
  if (project.UserId !== req.session.user.id) {
    res.status(400).json({
      error: 'Can not edit projects that are not attributed to your account.'
    })
  }
      //add searchTerm and subreddit
      if( req.body.keywords ) {
        req.body.keywords.forEach(async keyword => {
          await project.createKeyword({
            searchTerm: keyword.searchTerm,
            subreddit: keyword.subreddit
          })
        });
      }

  //send back
  res.send(project);
});

router.get("/:project_id/comments", async (req, res) => {
  // const user = await db.User.findByPk(req.session.user.id)
  //find one project
  const keywords = await db.Keyword.findAll({
    where: {
      ProjectId: req.params.project_id,
    },
    include: [
      db.Comment
    ]
  });
  //send back
  res.send(keywords)
});

module.exports = router;