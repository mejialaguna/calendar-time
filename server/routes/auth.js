const { Router } = require('express');
const { check } = require('express-validator');
const { fieldValidators } = require('../middlewares/fieldValidators');
const { addNewUser, loginUser, revalidateToken: renew } = require('../controllers/auth-controller');
const { validateToken } = require('../middlewares/validateJwToken');

const router = Router();

router.post(
  '/login',
  [
    // !!! middleware
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required to contain more than 6 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 }),
    fieldValidators, // !calling this function after every check
  ],
  loginUser
);

router.post(
  '/new-user',
  [
    // !!! middleware
    check('username', 'username is required').not().isEmpty(),
    check('password', 'Password is required to contain more than 6 characters')
      .not()
      .isEmpty()
      .isLength({ min: 6, max: 20 }),
    check('email', 'Please include a valid email').isEmail(),
    fieldValidators, // !calling this function after every check
  ],
  addNewUser
);

router.get('/renew', validateToken, renew);

module.exports = router;
