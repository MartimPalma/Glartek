const cron = require('node-cron');
const Cron = require('../models/cron.model');
const { makeHttpRequest } = require('./httpService');
const mongoose = require('mongoose');

const activeTasks = new Map();

const executeCronJob = async (cronId) => {
    let cronJob; 

    try {
        cronJob = await Cron.findById(cronId);
        if (!cronJob) {
            console.error(`CRON com ID ${cronId} não encontrado para execução.`);
            return; 
        }

        const response = await makeHttpRequest(cronJob);

        const successLog = {
            id: new mongoose.Types.ObjectId(),
            status: 'success',
            message: `Notificação enviada com sucesso para ${cronJob.url}`,
            responseData: response.data
        };
        cronJob.logs.unshift(successLog);

        console.log(`CRON ${cronJob.name} executado com sucesso`);
        
    } catch (error) {
        if (cronJob) { 
            let responseData = null;
            let errorMessage = `Erro ao executar notificação: ${error.message}`;
            if (error.response) {
                statusCode = error.response.status;
                responseData = error.response.data;
                errorMessage = `Erro na requisição: ${error.message}`;
            }

            const errorLog = {
                id: new mongoose.Types.ObjectId(),
                status: 'error',
                message: errorMessage,
                error: responseData || error.message
            };
            cronJob.logs.unshift(errorLog);
            console.error(`Erro no CRON ${cronJob.name}:`, error.message);
        } else {
            console.error(`Erro ao processar CRON com ID ${cronId}:`, error.message);
        }

    } finally {
        if (cronJob) { 
            if (cronJob.logs.length > 10) {
                cronJob.logs = cronJob.logs.slice(0, 10);
            }
            await cronJob.save();
        }
    }
};

const startCron = async (cronJob) => {
    if (activeTasks.has(cronJob._id.toString())) {
        stopCron(cronJob._id.toString());
    }

    const task = cron.schedule(cronJob.schedule, () => {
        executeCronJob(cronJob._id.toString());
    }, {
        scheduled: true,
        timezone: cronJob.timeZone
    });

    activeTasks.set(cronJob._id.toString(), task);
    console.log(`CRON iniciado: ${cronJob.name}`);
};

const stopCron = (cronId) => {
    const task = activeTasks.get(cronId);
    if (task) {
        task.stop();
        activeTasks.delete(cronId);
        console.log(`CRON parado: ${cronId}`);
    } else {
        console.warn(`CRON com ID ${cronId} não encontrado para parar.`);
    }
};

const createCron = async (data) => {
    if (!cron.validate(data.schedule)) {
        throw new Error('Expressão CRON inválida');
    }

    const newCron = new Cron(data);
    await newCron.save();
    await startCron(newCron); 
    return newCron;
};

const getAllCrons = async () => {
    const crons = await Cron.find({});
    return crons.map(cronJob => {
        const result = cronJob.toJSON();
        result.isActive = activeTasks.has(cronJob._id.toString());
        return result;
    });
};

const getCronById = async (id) => {
    const cronJob = await Cron.findById(id);
    if (!cronJob) {
        throw new Error('CRON não encontrado');
    }
    const result = cronJob.toJSON();
    result.isActive = activeTasks.has(id);
    return result;
};

const updateCron = async (id, data) => {
    const cronJob = await Cron.findById(id);
    if (!cronJob) {
        throw new Error('CRON não encontrado');
    }

    cronJob.name = data.name;
    cronJob.url = data.url;
    cronJob.httpMethod = data.httpMethod;
    cronJob.body = data.body;
    cronJob.schedule = data.schedule;
    cronJob.timeZone = data.timeZone;
    cronJob.updatedAt = new Date();
    
    await cronJob.save();

    await startCron(cronJob);
    
    return cronJob;
};

const deleteCron = async (id) => {
    const cronJob = await Cron.findByIdAndDelete(id);
    if (!cronJob) {
        throw new Error('CRON não encontrado');
    }
    stopCron(id);
};

const executeManually = async (id) => {
    await executeCronJob(id);
};

const getCronLogs = async (id) => {
    const cronJob = await Cron.findById(id);
    if (!cronJob) {
        throw new Error('CRON não encontrado');
    }
    return cronJob.logs;
};

const stopAllCrons = () => {
    activeTasks.forEach(task => task.stop());
    activeTasks.clear();
    console.log('Todos os CRONs foram parados.');
};

module.exports = {
    createCron,
    getAllCrons,
    getCronById,
    updateCron,
    deleteCron,
    startCron,
    stopCron,
    executeManually,
    getCronLogs,
    stopAllCrons
};