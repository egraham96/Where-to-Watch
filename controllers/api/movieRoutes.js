const router = require('express').Router();
const { User, Movie, MovieList } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/', withAuth, async (req, res) => {
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

});

router.get('/search', async (req, res) => {
  res.render('search',{
    logged_in: req.session.logged_in,
    });
});

router.post('/', withAuth, async (req, res) => {
  //add to movies
  console.log(`in movie routes post / user id ${req.session.user_id} title ${req.body.title}`);
  try {
    const movieData = await Movie.create({
      title: req.body.title,
      number_of_ratings: 0,
      rating_total: 0,
      current_rating: 0
    });

    //sanitize movie data
    const movie = movieData.get({ plain: true});

    const movieListData = await MovieList.create({
      movie_id: movie.id, 
      user_id: req.session.user_id
    });
    req.session.save(() => {
      req.session.user_id = movieListData.user_id;
      req.session.logged_in = true;

    });

  } catch (err) {
    res.status(400).json(err)
  }
  //add to movie list
  res.render('mymovies',{
    logged_in: req.session.logged_in,
    });
})

module.exports = router;