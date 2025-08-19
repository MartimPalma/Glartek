const API_BASE_URL = 'http://localhost:3001/api';

// fazer requisições HTTP
const makeRequest = async (url, options = {}) => {
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Erro na requisição');
  }

  // veerifica se tem conteúdo para retornar
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  }
  
  return null;
};

export const getAllCrons = async () => {
  return await makeRequest(`${API_BASE_URL}/crons`);
};

export const createCron = async (cronData) => {
  return await makeRequest(`${API_BASE_URL}/crons`, {
    method: 'POST',
    body: JSON.stringify(cronData)
  });
};

export const updateCron = async (cronId, cronData) => {
  return await makeRequest(`${API_BASE_URL}/crons/${cronId}`, {
    method: 'PUT',
    body: JSON.stringify(cronData)
  });
};

export const deleteCron = async (cronId) => {
  return await makeRequest(`${API_BASE_URL}/crons/${cronId}`, {
    method: 'DELETE'
  });
};

// iniciar ou parar 
export const toggleCronStatus = async (cronId, isActive) => {
  const action = isActive ? 'stop' : 'start';
  return await makeRequest(`${API_BASE_URL}/crons/${cronId}/${action}`, {
    method: 'POST'
  });
};

export const executeCron = async (cronId) => {
  return await makeRequest(`${API_BASE_URL}/crons/${cronId}/execute`, {
    method: 'POST'
  });
};

export const getCronLogs = async (cronId) => {
  return await makeRequest(`${API_BASE_URL}/crons/${cronId}/logs`);
};
