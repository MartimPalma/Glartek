import React from 'react';
import { Activity } from 'lucide-react';
import LogItem from './LogItem';

const LogsContent = ({ logs }) => {

    console.log('LogsContent logs:', logs)

    if (logs.length === 0) {
        return (
            <div className="modal-body text-center py-5">
                <Activity size={48} className="mb-3 text-secondary" />
                <p className="text-muted">Nenhum log encontrado</p>
            </div>
        );
    }

    return (
        <div className="modal-body p-4 bg-light rounded-bottom-4" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
            {logs.map((log, index) => (
                <LogItem key={log.id || index} log={log} />
            ))}
        </div>
    );
};

export default LogsContent;