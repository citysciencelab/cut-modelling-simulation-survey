const { Date } = require('core-js');
const express = require('express');
const controllers = require('../controllers/controllers')
require('dotenv').config()

const router = express.Router()

module.exports = router;

const DEV = true


if (process.env.API_VARIANT == "internal" || DEV) {
    // GET
    router.get('/survey-answers', controllers.getSurveyAnswers)
    router.get('/survey-clicks', controllers.getSurveyClicks)
    router.get('/all-reactions', controllers.getAllReactions)
    router.get('/survey-evaluation', controllers.getSurveyEvaluation)

    // POST
    router.post('/add/survey_recipient', controllers.addSurveyRecipient)

}


    // GET
    router.get('/recipient/:hash', controllers.getRecipient)
    router.get('/comments', controllers.getComments)
    router.get('/replies', controllers.getReplies)
    router.get('/reactions', controllers.getContributionReactions)
    router.get('/status', controllers.getStatus)

    // POST
    router.post('/add/comment', controllers.addComment)
    router.post('/add/survey_answer', controllers.addSurveyAnswer)
    router.post('/add/reaction', controllers.addReaction)
