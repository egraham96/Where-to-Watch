const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
  console.log(`recieved the following request: ${req.body.email} and pwd ${req.body.password}`);
  try {
    const userData = await User.findOne({ where: { user_email: req.body.email } });
    console.log('we got user data');
    if (!userData) {
      console.log('invalid user data');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    } else {
      console.log('user data is good');
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      console.log('invalid password');
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    } else {
      console.log('password is valid');
    }

    req.session.save(() => {
      console.log('start saving user id to session');
      req.session.user_id = userData.id;
      console.log('end saving user id to session');
      req.session.logged_in = true;
      console.log('end saving logged_in true to session');
      
       res.json({ user: userData, message: 'You are now logged in!' });
       console.log('session saved');
     });

  } catch (err) {
    console.log('fucked up error! ');
    res.status(500).json(err);
  }
});

module.exports = router;
