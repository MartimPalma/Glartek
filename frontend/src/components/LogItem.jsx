import React from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import LogDetails from './LogDetails';

const LogItem = ({ log }) => {

    const formato = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    return date.toLocaleString('pt-PT', options);
};
    const isSuccess = log.status === 'success';

    return (
        <div className={`mb-3 p-3 border-start rounded ${isSuccess ? 'border-success' : 'border-danger'}`}>
            <div className="d-flex justify-content-between mb-2">
                <span className={`fw-bold d-flex align-items-center gap-1 ${isSuccess ? 'text-success' : 'text-danger'}`}>
                    {isSuccess ? <CheckCircle size={16} /> : <XCircle size={16} />}
                    {isSuccess ? 'Sucesso' : 'Erro'}
                </span>
                <span className="text-muted small">{formato(log.timestamp)}</span>
            </div>

            <p className={`mb-2 small ${isSuccess ? 'text-success' : 'text-danger'}`}>
                {log.message}
            </p>

            {log.statusCode && <p className="small text-muted mb-1">Status Code: {log.statusCode}</p>}

            {log.responseData && <LogDetails title="Resposta" data={log.responseData} />}
            {log.error && <LogDetails title="Erro" data={log.error} isError />}
        </div>
    );
};

export default LogItem;