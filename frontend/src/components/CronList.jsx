import React from 'react';
import { Clock } from 'lucide-react';
import CronItem from './CronItem';

const CronList = ({ crons, onEdit, onDelete, onToggle, onExecute, onViewLogs }) => {

  console.log('Crons:', crons);

  if (crons.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center py-5">
          <Clock size={48} className="text-secondary mb-3" />
          <h5 className="mb-2">Nenhum CRON configurado</h5>
          <p className="text-muted">Crie o seu primeiro CRON para começar</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="row g-3">
        {crons.map(cron => (
          <div key={cron._id} className="col-12">
            <CronItem
              cron={cron}
              onEdit={onEdit}
              onDelete={onDelete}
              onToggle={onToggle}
              onExecute={onExecute}
              onViewLogs={onViewLogs}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CronList;