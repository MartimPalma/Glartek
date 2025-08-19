import React from 'react';
import LogsHeader from './LogHeader';
import LogsContent from './LogContent';

const CronLogs = ({ cron, onClose }) => {
    return (
        <div
            className="modal show d-block"
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
            <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                <div className="modal-content rounded-4 shadow-lg">
                    <LogsHeader cronName={cron.name} onClose={onClose} />
                    <LogsContent logs={cron.logs || []} />
                </div>
            </div>
        </div>
    );
};

export default CronLogs;