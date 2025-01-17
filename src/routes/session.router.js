const express = require('express');
const router = express.Router();

const sessionController = require('../controllers/session.controller');

router.post('/start-session', sessionController.startSession);
router.post('/stop-session', sessionController.stopSession);
router.post('/send-session', sessionController.sendSession);

module.exports = router;
