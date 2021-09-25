const sequelize = require('../config/connection');
const { User, Movie, StreamingService } = require('../models');

const userData = require('./user.json');
//const postData = require('./movie.json');
//const commentData = require('./commentData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  
  process.exit(0);
};

seedDatabase();