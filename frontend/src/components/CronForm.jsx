import React, { useState, useEffect } from 'react';
import { createCron, updateCron } from '../api/cronApi';

import FormField from './FormField';
import FormSelect from './FormSelect';
import FormTextArea from './FormTextArea';

const CronForm = ({ editingCron, onClose, onSuccess, onError }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    url: 'http://localhost:3001/api/receiver',
    httpMethod: 'POST',
    body: '{"message": "Hello from CRON"}',
    schedule: '*/1 * * * *',
    timeZone: 'Europe/Lisbon'
  });

  useEffect(() => {
    if (editingCron) {
      setFormData({
        name: editingCron.name,
        url: editingCron.url,
        httpMethod: editingCron.httpMethod,
        body: editingCron.body || '',
        schedule: editingCron.schedule,
        timeZone: editingCron.timeZone
      });
    }
  }, [editingCron]);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    onError('');

    try {
      const dataToSend = {
        ...formData,
        body: formData.body || null
      };

      if (editingCron) {
        await updateCron(editingCron._id, dataToSend); 
      } else {
        await createCron(dataToSend);
      }

      onSuccess();
    } catch (err) {
      onError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content shadow-lg border-0 rounded-4">
          <div className="modal-header bg-primary text-white border-0 rounded-top-4">
            <h5 className="modal-title">{editingCron ? 'Editar CRON' : 'Novo CRON'}</h5>
            <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
          </div>
          <div className="modal-body p-4 bg-light rounded-bottom-4">
            <form onSubmit={handleSubmit}>
              <FormField
                label="Nome *"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Nome do CRON"
                required
              />

              <FormField
                label="URL *"
                type="url"
                value={formData.url}
                onChange={(value) => handleInputChange('url', value)}
                placeholder="http://localhost:3001/api/receiver"
                required
              />

              <FormSelect
                label="Método HTTP *"
                value={formData.httpMethod}
                onChange={(value) => handleInputChange('httpMethod', value)}
                options={[
                  { value: 'GET', label: 'GET' },
                  { value: 'POST', label: 'POST'}
                ]}
              />

              <FormTextArea
                label="Body (JSON)"
                value={formData.body}
                onChange={(value) => handleInputChange('body', value)}
                placeholder='{"message": "Olá"}'
                rows={3}
              />

              <FormField
                label="Schedule (CRON) *"
                value={formData.schedule}
                onChange={(value) => handleInputChange('schedule', value)}
                placeholder="*/1 * * * *"
                required
              />
              <small className="form-text text-muted mb-3">
                Formato: minuto / hora / dia / mês / dia-da-semana
              </small>

              <FormSelect
                label="Timezone"
                value={formData.timeZone}
                onChange={(value) => handleInputChange('timeZone', value)}
                options={[
                  { value: 'UTC', label: 'UTC' },
                  { value: 'America/Sao_Paulo', label: 'America/Sao_Paulo' },
                  { value: 'America/New_York', label: 'America/New_York' },
                  { value: 'Europe/London', label: 'Europe/London' },
                  { value: 'Europe/Lisbon', label: 'Europe/Lisbon' },
                  { value: 'Asia/Tokyo', label: 'Asia/Tokyo' }
                ]}
              />

              <div className="d-flex gap-2 mt-4">
                <button type="submit" className="btn btn-primary flex-fill" disabled={loading}>
                  {loading ? 'A guardar...' : editingCron ? 'Atualizar' : 'Criar'}
                </button>
                <button type="button" className="btn btn-secondary flex-fill" onClick={onClose}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};;

export default CronForm;