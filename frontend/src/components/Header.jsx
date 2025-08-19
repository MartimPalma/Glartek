import React from 'react';
import { Plus } from 'lucide-react';

const Header = ({ totalCrons, activeCrons, onNewCron }) => {
  return (
    <div className="bg-white p-4 mb-4 rounded-3 shadow-sm">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <h1 className="h3 mb-1 fw-bold">Gerenciador de CRONs</h1>
          <p className="text-muted mb-0">
            <span className="fw-semibold text-dark">{totalCrons}</span> CRONs configurados || <span className="fw-semibold text-dark">{activeCrons}</span> ativos
          </p>
        </div>
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center gap-2 rounded-pill px-4"
          onClick={onNewCron}
        >
          <Plus size={20} />
          Novo CRON
        </button>
      </div>
    </div>
  );
};

export default Header;