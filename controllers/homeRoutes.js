const router = require('express').Router();
const { Movie, User, StreamingService } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');
//const { where } = require('sequelize/types');

router.get('/', async (req, res) => {
  return "success";
});


module.exports = router;
