const router = require('express').Router();
const { Movie, User, StreamingService } = require('../models');
const withAuth = require('../utils/auth');
const path = require('path');
//const { where } = require('sequelize/types');

router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/api/mylist');
  } 
  
  res.render('login')
  
});

router.get('/signup', async (req, res) => {
  res.render('signup');
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/api/mylist');
    return;
  }

  res.render('login');
});


module.exports = router;
