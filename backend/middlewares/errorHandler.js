const errorHandler = (err, req, res, next) => {
    console.error(err.stack);

    // erros de validação do Mongoose
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ error: messages.join(', ') });
    }

    // erros de ID inválido do Mongoose
    if (err.name === 'CastError') {
        return res.status(400).json({ error: 'ID inválido' });
    }
    
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Erro interno do servidor.';
    res.status(statusCode).json({ error: message });
};

module.exports = errorHandler;