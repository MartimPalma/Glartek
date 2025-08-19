import React from 'react';
import { Globe, Eye, Activity, Play, Square, Edit, Trash2 } from 'lucide-react';

const CronItem = ({ cron, onEdit, onDelete, onToggle, onExecute, onViewLogs }) => {

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

  return (
    <div className="card mb-3 shadow-sm rounded-3">
      <div className="card-body d-flex justify-content-between align-items-center p-3">
        <div className="flex-grow-1">
          <div className="d-flex align-items-center gap-2 mb-2">
            <h5 className="card-title mb-0">{cron.name}</h5>
            <span className={`badge ${
              cron.isActive ? 'bg-success' : 'bg-secondary'
            }`}>
              {cron.isActive ? 'Ativo' : 'Inativo'}
            </span>
          </div>

          <div className="row g-2 text-muted small">
            <div className="col-12 col-md-6 col-lg-3">
              <strong>URL:</strong>
              <p className="mb-0 text-truncate">{cron.url}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <strong>Método:</strong>
              <p className="mb-0">{cron.httpMethod}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <strong>Schedule:</strong>
              <p className="mb-0" style={{ fontFamily: 'monospace' }}>{cron.schedule}</p>
            </div>
            <div className="col-12 col-md-6 col-lg-3">
              <strong>Timezone:</strong>
              <p className="mb-0 d-flex align-items-center gap-1">
                <Globe size={14} /> {cron.timeZone}
              </p>
            </div>
          </div>

          {cron.logs && cron.logs.length > 0 && (
            <div className="small mt-2">
              <strong>Última execução:</strong>
              <span className={`ms-2 fw-medium ${
                cron.logs[0].status === 'success' ? 'text-success' : 'text-danger'
              }`}>
                {formato(cron.logs[0].timestamp)} - {cron.logs[0].status === 'success' ? 'Sucesso' : 'Erro'}
              </span>
              {cron.logs[0].responseData && cron.logs[0].responseData.log && (
                <p className="mb-0 text-muted small mt-1">
                  <strong>Log:</strong> {cron.logs[0].responseData.log}
                </p>
              )}
            </div>
          )}
        </div>

        <div className="d-flex flex-column gap-2 ms-3">
          <button
            onClick={() => onViewLogs(cron)}
            className="btn btn-light btn-sm"
            title="Ver logs"
          >
            <Eye size={16} />
          </button>
          <button
            onClick={() => onExecute(cron._id)}
            className="btn btn-light btn-sm"
            title="Executar agora"
          >
            <Activity size={16} />
          </button>
          <button
            onClick={() => onToggle(cron._id, cron.isActive)}
            className={`btn btn-sm ${
              cron.isActive ? 'btn-danger' : 'btn-success'
            }`}
            title={cron.isActive ? 'Parar' : 'Iniciar'}
          >
            {cron.isActive ? <Square size={16} /> : <Play size={16} />}
          </button>
          <button
            onClick={() => onEdit(cron)}
            className="btn btn-light btn-sm"
            title="Editar"
          >
            <Edit size={16} />
          </button>
          <button
            onClick={() => onDelete(cron._id)}
            className="btn btn-light btn-sm"
            title="Eliminar"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CronItem;