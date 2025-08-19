const express = require('express');
const router = express.Router();
const cronController = require('../controllers/cronController');

router.get('/crons', cronController.getAllCrons);
router.get('/crons/:id', cronController.getCronById);
router.post('/crons', cronController.createCron);
router.put('/crons/:id', cronController.updateCron);
router.delete('/crons/:id', cronController.deleteCron);

router.post('/crons/:id/start', cronController.startCron);
router.post('/crons/:id/stop', cronController.stopCron);
router.post('/crons/:id/execute', cronController.executeManually);

router.get('/crons/:id/logs', cronController.getCronLogs);

router.post('/receiver', (req, res) => {

    const { message } = req.body;

    if (message) {
        const timestamp = new Date().toISOString();
        const logMessage = `${timestamp} - ${message}`;

        console.log(logMessage);
        
        res.status(200).json({ status: 'success', log: logMessage });
    } else {
        res.status(400).json({ status: 'error', message: 'Body parameter "message" is missing.' });
    }
});

module.exports = router;