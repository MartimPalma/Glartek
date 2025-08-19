const express = require('express');
const cors = require('cors'); 
const connectDB = require('./config/db');
const cronRoutes = require('./routes/cronRoutes');
const errorHandler = require('./middlewares/errorHandler');
const cronService = require('./services/cronService');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());


app.use('/api', cronRoutes);

connectDB().then(() => {

    console.log('Base de dados ligada com sucesso!');

    app.listen(PORT, () => {
        console.log(`Servidor a rodar na porta ${PORT}`);
    });

}).catch(error => {
    console.error('Falha na ligação à base de dados:', error);
    process.exit(1); 
});


app.use((req, res, next) => {
    const error = new Error(`Rota não encontrada: ${req.method} ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);

// todos os CRONs são parados ao desligar o servidor
process.on('SIGINT', () => {
    console.log('A parar o servidor...');
    cronService.stopAllCrons();
    process.exit();
});

module.exports = app;