export default {
  mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/clean-survey-api',
  port: process.env.PORT || 3030,
  jwtSecret: process.env.JWT_SECRET || 'ahje8374*&%$prg90'
}
