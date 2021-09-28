const router = require('express').Router();
const { User, Movie, MovieList } = require('../../models');

router.get('/', async (req, res) => {
  console.log(`in movie routes get / user id ${req.session.user_id}`);
  
  try {

    const user = await User.findByPk(req.session.user_id);
    console.log(`user ${user}`);
    const movieData = await user.getMovies();
    
    const movies = movieData.map((movie) => movie.get({ plain: true }));
    console.log(movies);

  } catch (err) {
    res.status(500).json(err);
  }
  return "success";
});

module.exports = router;