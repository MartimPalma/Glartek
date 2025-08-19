const cronService = require('../services/cronService');

const getAllCrons = async (req, res, next) => {
    try {
        const crons = await cronService.getAllCrons();
        res.json(crons);
    } catch (error) {
        next(error);
    }
};

const getCronById = async (req, res, next) => {
    try {
        const cron = await cronService.getCronById(req.params.id);
        res.json(cron);
    } catch (error) {
        next(error);
    }
};

const createCron = async (req, res, next) => {
    try {
        const newCron = await cronService.createCron(req.body);
        res.status(201).json(newCron);
    } catch (error) {
        next(error);
    }
};

const updateCron = async (req, res, next) => {
    try {
        const updatedCron = await cronService.updateCron(req.params.id, req.body);
        res.json(updatedCron);
    } catch (error) {
        next(error);
    }
};

const deleteCron = async (req, res, next) => {
    try {
        await cronService.deleteCron(req.params.id);
        res.status(200).json({ message: 'CRON eliminado com sucesso.' });
    } catch (error) {
        next(error);
    }
};

const startCron = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cronJob = await cronService.getCronById(id);
        
        await cronService.startCron(cronJob);
        
        res.status(200).json({ ...cronJob, isActive: true });
    } catch (error) {
        next(error);
    }
};

const stopCron = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cronJob = await cronService.getCronById(id);

        await cronService.stopCron(id);
        
        res.status(200).json({ ...cronJob, isActive: false });
    } catch (error) {
        next(error);
    }
};

const executeManually = async (req, res, next) => {
    try {
        await cronService.executeManually(req.params.id);
        res.json({ message: 'CRON executado manualmente com sucesso.' });
    } catch (error) {
        next(error);
    }
};

const getCronLogs = async (req, res, next) => {0
    try {
        const logs = await cronService.getCronLogs(req.params.id);
        res.json(logs);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllCrons,
    getCronById,
    createCron,
    updateCron,
    deleteCron,
    startCron,
    stopCron,
    executeManually,
    getCronLogs
};