const mongoose = require('mongoose');

const cronSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  httpMethod: { type: String, required: true, enum: ['GET', 'POST'] },
  body: { type: Object },
  schedule: { type: String, required: true },
  timeZone: { type: String, default: 'UTC' },
  logs: [{
    id: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    status: { type: String },
    statusCode: { type: Number },
    message: { type: String },
    responseData: { type: mongoose.Schema.Types.Mixed },
    error: { type: mongoose.Schema.Types.Mixed }
  }],
}, {
  timestamps: true // campos createdAt e updatedAt automaticamente
});

const Cron = mongoose.model('Cron', cronSchema);

module.exports = Cron;