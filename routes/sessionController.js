const express = require('express');
const sessionModel = require('../databasefiles/sessionModel');
const sessionroute = express.Router();

sessionroute.get('/allsession', async (req, res) => {
  let allsession = await sessionModel.getAllSession();
  if (allsession === {}) {
    res.json({ Message: 'No session created'});
  } else {
    res.json({ allsession });
  }
});

sessionroute.post('/create_session', async (req, res) => {
  let { session_name, active } = req.body;
  if (!session_name) {
    res.json({ Message: 'No session name sent' });
    return;
  }
  if (active === 'true') {
    active = true;
  } else {
    active = false;
  }
  const session = await sessionModel.createSession(session_name, active);
  if (!session) {
    res.json({ Message: 'Error occured while processing session' });
    return;
  }
  res.json({ Message: 'New Academic Session created' });
});

sessionroute.put('/activate_session', async (req, res) => {
  const { session_name } = req.body;
  let checksession = await sessionModel.getSessionByName(session_name);
  console.log(checksession)
  if (checksession === undefined) {
    res.json({ Message: 'Academic Session does not exist' });
    return;
   }
   const activate = await sessionModel.activateSession(checksession.session_name)
   activate === 1 ? res.json({ Message: 'Session activated'}) : res.json({ Message: 'Error activationg session' });
});

module.exports = sessionroute;
