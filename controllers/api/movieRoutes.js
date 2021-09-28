const router = require('express').Router();
const { User, Movie, MovieList } = require('../../models');

router.get('/', async (req, res) => {
  console.log(`in movie routes get / user id ${req.session.user_id}`);
  
  // try {
  //   // Get all projects and JOIN with user data
  //   const movieListData = await MovieList.findAll({
  //     where: {user_id: req.session.user_id},
  //     // include: [
  //     //   {
  //     //     model: User,
  //     //     attributes: ['name'],
  //     //   },
  //     // ],
  //   });

  //   // Serialize data so the template can read it
  //   const movieList = movieListData.map((listItem) => listItem.get({ plain: true }));
  //   console.log(movieList);
  //   // Pass serialized data and session flag into template
  //   // res.render('homepage', { 
  //   //   projects, 
  //   //   logged_in: req.session.logged_in 
  //   // });
  // } catch (err) {
  //   res.status(500).json(err);
  // }
  return "success";
});

module.exports = router;