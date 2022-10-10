const pool = require("../config/dbconnector").pool;

// GET

const getRecipient = (request, response, next) => {
  const getRecipientQuery = {
    text: `SELECT 
     *
    FROM (
      SELECT 
      r.recipient_id, 
      r.recipient_name, 
      r.recipient_type, 
      r.recipient_institution, 
      r.recipient_superordinate_department,
      r.recipient_hash,
      COUNT(survey_answers.survey_recipient) AS recipient_survey_answers
      FROM survey_recipients r
      LEFT JOIN survey_answers ON r.recipient_id = survey_answers.survey_recipient
      GROUP BY r.recipient_id) r
      WHERE r.recipient_hash = $1
      ;`,
    values: [request.params.hash]
  }

  pool.query(getRecipientQuery, (error, results) => {
    if (error) {
      next(error)
    }
    try {
      const recipient = results.rows[0]

      //Add another click to Survey-Clicks
      const clickQuery = {
        text: 'INSERT INTO survey_clicks(recipient_id) VALUES ($1);',
        values: [recipient.recipient_id]
      }

      pool.query(clickQuery, (error, results) => {
        if (error) {
          next(error)
        }
        try {
          response.status(200).json(recipient);
        } catch (err) {
          next(err)
        }
      });

    } catch (err) {
      next(err)
    }

  })


};

const getSurveyClicks = (request, response, next) => {
  const getSurveyClicksQuery = {
    text: 'SELECT * FROM survey_clicks;'
  }

  pool.query(getSurveyClicksQuery, (error, results) => {
    if (error) {
      console.log(error)
    }
    try { response.status(200).json(results.rows) } catch (err) { next(err) }
  })

};

const getComments = (request, response, next) => {


  const auth_query = {
    text: `SELECT CASE WHEN EXISTS (
                SELECT *
                FROM survey_recipients
                WHERE recipient_hash = '`+ request.query.h + `'
                )
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END;`}

  pool.query(auth_query, (error, results) => {
    if (error) {
      console.log(error)
    }
    try {
      //console.log(results.rows[0].case)
      if (results.rows[0].case == 1) {

        let filter = ""

        if (request.query.c == "idee") {
          filter = " AND c.category = 'Idee'"
        } else if (request.query.c == "wunsch") {
          filter = " AND c.category = 'Wunsch'"
        } else if (request.query.c == "frage") {
          filter = " AND c.category = 'Frage'"
        } else if (request.query.c == "allgemein") {
          filter = " AND c.category = 'Allgemein'"
        }

        const getCommentsQuery = {
          text: `SELECT 
                    c.id, 
                    c.title, 
                    c.text, 
                    c.category, 
                    c.date, 
                    c.number_replies, 
                    c.comment_reference, 
                    c.simulation_reference, 
                    survey_recipients.recipient_name AS writer, 
                    survey_recipients.recipient_type AS writer_type
                    FROM (
                      SELECT 
                      c.comment_id AS id, 
                      c.comment_title AS title, 
                      c.comment_text AS text, 
                      c.comment_category AS category, 
                      c.comment_date AS date, 
                      COUNT(replies.comment_id) AS number_replies, 
                      c.comment_reference AS comment_reference, 
                      c.comment_anonymous AS anonymous,
                      c.writer_id,
                      c.simulation_reference
                      FROM comments c
                      LEFT JOIN comments replies ON c.comment_id = replies.comment_reference
                      
                      GROUP BY c.comment_id 
                      
                    ) c 
                    
                    LEFT JOIN survey_recipients ON (c.writer_id = survey_recipients.recipient_id) AND (c.anonymous = FALSE)
                    WHERE c.comment_reference IS NULL`+ filter + `
                    
                    ORDER BY date DESC;`
        }

        pool.query(getCommentsQuery, (error, results) => {
          if (error) {
            console.log(error)
          }
          try { response.status(200).json(results.rows) } catch (err) { next(err) }
        })

      } else {
        response.status(401).json({ error: "Please authenticate!" })
      }

    } catch (err) {
      console.log(err)
    }
  })

};


const getSurveyEvaluation = (request, response, next) => {
  const getSurveyEvaluationQuery = {
    text: `

      SELECT 
      r.recipient_id, 
      r.recipient_name, 
      r.recipient_type, 
      r.recipient_institution, 
      r.recipient_hash,
      COUNT(survey_answers.survey_recipient) AS number_survey_submissions, 
      MAX(survey_submission) AS latest_survey_submission,
      COUNT(survey_clicks.click_id) AS number_website_clicks,
      MAX(survey_clicks.click_date) AS latest_website_click
      FROM survey_recipients r
      LEFT JOIN survey_answers ON r.recipient_id = survey_answers.survey_recipient
      LEFT JOIN survey_clicks ON r.recipient_id = survey_clicks.recipient_id
      GROUP BY r.recipient_id
      ORDER BY r.recipient_id;
    `
  }

  pool.query(getSurveyEvaluationQuery, (error, results) => {
    if (error) {
      console.log(error)
    }
    try { response.status(200).json(results.rows) } catch (err) { next(err) }
  })

};


const getReplies = (request, response, next) => {

  const auth_query = {
    text: `SELECT CASE WHEN EXISTS (
                SELECT *
                FROM survey_recipients
                WHERE recipient_hash = '`+ request.query.h + `'
                )
            THEN CAST(1 AS BIT)
            ELSE CAST(0 AS BIT) END;`}

  pool.query(auth_query, (error, results) => {
    if (error) {
      console.log(error)
    }
    try {

      if (results.rows[0].case == 1) {


        const getReplyQuery = {
          text: `SELECT 
          comment_id AS reply_id,
          comment_text AS reply_text, 
          comment_date AS reply_date, 
          survey_recipients.recipient_name AS reply_writer,
          survey_recipients.recipient_type AS reply_writer_type
          FROM comments 
          LEFT JOIN survey_recipients ON (writer_id = survey_recipients.recipient_id AND comment_anonymous = FALSE)
          WHERE comment_reference = $1 
          ORDER BY reply_date DESC;`,
          values: [request.query.commentId]
        }

        pool.query(getReplyQuery, (error, results) => {
          if (error) {
            console.log(getReplyQuery)
            next(error)
          }
          try {
            response.status(200).json(results.rows)

          } catch (err) {
            next(err)
          }

        })

      } else {
        response.status(401).json({ error: "Please authenticate!" })
      }

    } catch (err) {
      console.log(err)
    }
  })

};



const getSurveyAnswers = (request, response, next) => {
  const getSurveyAnswersQuery = {
    text: 'SELECT * FROM survey_answers LEFT JOIN modelliste ON survey_answers.answer_id = modelliste.answer_id;'
  }

  pool.query(getSurveyAnswersQuery, (error, results) => {
    if (error) {
      console.log(error)
    }
    try {
      response.status(200).json(results.rows)
    }
    catch (err) { next(err) }
  })

};


const getContributionReactions = (request, response, next) => {
  const getContributionReactionsQuery = {
    text: "SELECT contribution_reaction_type AS type, COUNT(contribution_reaction_id) AS count, 0 AS clicked FROM contribution_reactions WHERE comment_reference = " + request.query.cId + " GROUP BY contribution_reaction_type;"
  }

  pool.query(getContributionReactionsQuery, (error, results) => {
    if (error) {
      console.log(error)
    }
    try { response.status(200).json(results.rows) } catch (err) { next(err) }
  })

};


const getAllReactions = (request, response, next) => {
  const getAllReactionsQuery = {
    text: 'SELECT * FROM contribution_reactions;'
  }

  pool.query(getAllReactionsQuery, (error, results) => {
    if (error) {
      console.log(error)
    }
    try { response.status(200).json(results.rows) } catch (err) { next(err) }
  })

};


const getStatus = (request, response, next) => {

  let status = {
    api: true,
    database: false
  }

  const getSurveyClicksQuery = {
    text: 'SELECT * FROM survey_clicks;'
  }

  pool.query(getSurveyClicksQuery, (error, results) => {
    if (error) {
      console.log(error)
    } else {
      status["database"] = true
    }
    try { response.status(200).json(status) } catch (err) { next(err) }

  })



};

//POST

const addSurveyAnswer = (request, response, next) => {
  //console.log(request.body)
  let privacy = false
  if (request.body.Datenschutz == 'ja') {
    privacy = true
  }

  let contact = false
  if (request.body.Kontaktaufnahme == 'Ja') {
    contact = true
  }

  const query_add_survey_answers = {
    text: 'INSERT INTO survey_answers (datenschutz, berufsabschluss, dienststelle, dienstbezeichnung, diensttaetigkeit, berufserfahrung, system, system_comment, raumrelevanz, kontaktaufnahme, contact_name, mail, tel, survey_recipient) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING answer_id;',
    values: [privacy, request.body.Berufsabschluss, request.body.Dienststelle, request.body.Dienstbezeichnung, request.body.Diensttätigkeit, request.body.Berufserfahrung, request.body.System, request.body['System-Comment'], request.body.Raumrelevanz, contact, request.body.question1.Name, request.body.question1.Mail, request.body.question1.Telefon, request.body.survey_recipient],
  }

  var answer_id = null

  pool.query(query_add_survey_answers, (error, results) => {
    if (error) {
      next(error)
    }
    try {
      answer_id = results.rows[0].answer_id
      //console.log(answer_id)

      for (let i = 0; i < request.body.Modelliste.length; i++) {
        const query_add_survey_answers_q5 = {
          text: 'INSERT INTO modelliste (answer_id, model_name, beschreibung, zweck, verwendung) VALUES ($1,$2,$3,$4,$5);',
          values: [answer_id, request.body.Modelliste[i].Name, request.body.Modelliste[i].Beschreibung, request.body.Modelliste[i].Zweck, request.body.Modelliste[i].Verwendung],
        }
        pool.query(query_add_survey_answers_q5, (error, results) => {
          if (error) {
            next(error)
          }
          try {
            //response.status(201).send({ success: true })
          } catch (err) { next(err); }
        })
      }
      response.status(201).send({ success: true })
    } catch (err) { next(err); }
  })
};




const addComment = (request, response, next) => {

  const query_add_comment = {
    text: 'INSERT INTO comments (writer_id, comment_title, comment_text, comment_category, comment_reference, simulation_reference, comment_anonymous) VALUES ($1,$2,$3,$4,$5,$6,$7)',
    values: [request.body.writer_id, request.body.comment_title, request.body.comment_text, request.body.comment_category, request.body.comment_reference, request.body.simulation_reference, request.body.comment_anonymous],
  }


  pool.query(query_add_comment, (error, results) => {
    if (error) {
      next(error)
    }
    try {
      response.status(201).send({ success: true })
    } catch (err) { next(err); }
  })
};


const addReaction = (request, response, next) => {

  const query_add_reaction = {
    text: 'INSERT INTO contribution_reactions (contribution_reaction_type, comment_reference, contribution_reactor_id) VALUES ($1,$2,$3)',
    values: [request.body.contribution_reaction_type, request.body.comment_reference, request.body.contribution_reactor_id],
  }

  //console.log(request.body)

  pool.query(query_add_reaction, (error, results) => {
    if (error) {
      next(error)
    }
    try {
      response.status(201).send({ success: true })
    } catch (err) { next(err); }
  })
};


const addSurveyRecipient = (request, response, next) => {

  // Function to create a new hash
  function make_hash(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }


  // Get all current Hashes
  const getRecipientHashes = {
    text: 'SELECT recipient_hash FROM survey_recipients;'
  }

  pool.query(getRecipientHashes, (error, results) => {
    if (error) {
      console.log(error)
    }
    try {
      let new_hash = make_hash(5)
      let hashes = []
      results.rows.map(hash => hashes.push(hash["recipient_hash"]))

      // Check that the hash that is generated does not exist yet
      while (hashes.includes(new_hash)) {
        console.log("Warning: Hash already exists. Creating a new one...")
        new_hash = make_hash(5)
      }


      const query_add_survey_recipient = {
        text: 'INSERT INTO survey_recipients (recipient_name, recipient_type, recipient_institution, recipient_hash) VALUES ($1,$2,$3,$4)',
        values: [request.body.recipient_name, request.body.recipient_type, request.body.recipient_institution, new_hash],
      }

      //console.log(request.body)

      pool.query(query_add_survey_recipient, (error, results) => {
        if (error) {
          next(error)
        }
        try {
          response.status(201).send({ success: true })
        } catch (err) { next(err); }
      })

    } catch (err) { next(err) }

  })
};






module.exports = {
  getRecipient,
  getSurveyClicks,
  getSurveyEvaluation,
  getComments,
  getReplies,
  getSurveyAnswers,
  getContributionReactions,
  getAllReactions,
  getStatus,
  addComment,
  addSurveyAnswer,
  addReaction,
  addSurveyRecipient
}