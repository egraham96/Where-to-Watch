const router = require('express').Router();
const { User, Movie, MovieList } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
  console.log(`in movie routes get / user id ${req.session.user_id}`);
  
  try {

    const userData = await User.findByPk(req.session.user_id);
    const user= userData.get( {plain: true});
    console.log(`user ${userData}`);
    const movieData = await userData.getMovies();
    
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    console.log(movies);
    res.render('mymovies', { 
      logged_in: req.session.logged_in,
      movies: movies, 
      user: user,
    });
    console.log('finished render')

  } catch (err) {
    res.status(500).json(err);
  }
  return "success";
});

module.exports = router;