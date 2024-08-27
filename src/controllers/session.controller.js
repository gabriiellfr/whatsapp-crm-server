const { httpService } = require('../services');

const startSession = async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const result = await httpService.post(`/start`, { sessionId });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const stopSession = async (req, res) => {
    const { sessionId } = req.body;

    if (!sessionId) {
        return res.status(400).json({ error: 'Session ID is required' });
    }

    try {
        const result = await httpService.post(`/stop`, { sessionId });

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const sendSession = async (req, res) => {
    const { sessionId, type, data } = req.body;

    try {
        const result = await httpService.post(`/send`, {
            sessionId,
            type,
            data,
        });

        res.status(200).send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = {
    startSession,
    stopSession,
    sendSession,
};
