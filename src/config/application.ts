export default {
  nodeEnv: process.env.NODE_ENV?.toLowerCase() || 'development',
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiry: parseInt(process.env.JWT_EXPIRY),
  weatherApiKey: process.env.WEATHER_API_KEY,
  weatherHost: process.env.WEATHER_HOST,
  googleHost: process.env.GOOGLE_HOST,
  googleApiKey: process.env.GOOGLE_API_KEY,
  host: process.env.HOST
};
