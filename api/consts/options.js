module.exports = {
  CORS_OPTIONS : {
    origin: process.env.API_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type'],
  }
};

