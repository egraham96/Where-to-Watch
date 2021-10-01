const router = require('express').Router();
const { User, Movie, MovieList, MovieStreamer, StreamingService } = require('../../models');
const withAuth = require('../../utils/auth')

router.get('/:id', async (req, res) => {
  console.log('getting movie subscription service ' +req.params.id);
  try {
    const movieData = await Movie.findByPk(req.params.id);
    const movie = movieData.get( {plain: true});
    const subscriptionData = await movieData.getStreamingservices();
    const subscriptions = await subscriptionData.map((sub) => sub.get({ plain: true }));

    console.log("subscriptions");
    console.log(subscriptions[0]);
    res.render('moviedetails', { 
      logged_in: req.session.logged_in,
      movie: movie, 
      subscriptions: subscriptions,
    });
    return;
    
  }catch (error) {
    console.log(error)
  }
})

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



router.post('/', withAuth, async (req, res) => {
  //add to movies
  console.log(`in movie routes post / user id ${req.session.user_id} title ${req.body.title}`);
  console.log('subscription links');
  console.log(req.body.subServiceList);
  console.log(req.body.imageURL);
  try {
    const movieData = await Movie.create({
      title: req.body.title,
      number_of_ratings: 0,
      rating_total: 0,
      current_rating: 0,
      image: req.body.imageURL
    });

    //sanitize movie data
    const movie = movieData.get({ plain: true});
    //add subscritpion links
    req.body.subServiceList.forEach(async (subscriptionLink) => {
      console.log(subscriptionLink)
      const subLinkData = await StreamingService.create({
        name: subscriptionLink
      });
      const streamerData = await MovieStreamer.create({
        movie_id: movieData.id,
        streamingservice_id: subLinkData.id,
      });


    });

    //add to movie list
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
  
  res.render('mymovies',{
    logged_in: req.session.logged_in,
    });
})

module.exports = router;