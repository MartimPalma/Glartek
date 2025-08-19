const axios = require('axios');

// Fazer requisição HTTP
const makeHttpRequest = async (cronJob) => {
  const config = {
    method: cronJob.httpMethod.toLowerCase(),
    url: cronJob.url,
    timeout: 10000
  };

  // adiciona o corpo da requisição apenas se o método for POST
  if (cronJob.body && config.method === 'post') {
    config.data = cronJob.body;
    config.headers = { 'Content-Type': 'application/json' };
  }

  try {
    const response = await axios(config);
    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  makeHttpRequest
};