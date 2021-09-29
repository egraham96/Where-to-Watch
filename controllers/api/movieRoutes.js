const router = require('express').Router();
const { User, Movie, MovieList } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', async (req, res) => {
  console.log(`in movie routes get / user id ${req.session.user_id}`);
  
  try {

    const user = await User.findByPk(req.session.user_id);
    console.log(`user ${user}`);
    const movieData = await user.getMovies();
    
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    console.log(movies);
    res.render('mymovies', { 
      logged_in: req.session.logged_in,
      movies: movies, 
    });
    console.log('finished render')

  } catch (err) {
    res.status(500).json(err);
  }
  return "success";
});

module.exports = router;