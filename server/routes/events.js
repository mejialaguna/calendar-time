const { Router, response, request } = require("express");
const { check } = require("express-validator");

const { fieldValidators } = require('../middlewares/fieldValidators');
const { validateToken } = require('../middlewares/validateJwToken');
const { getAllEvents, createNewEvent, updateEvent, deleteEvent } = require('../controllers/event-controller');

const router = Router();

/*
    ! event
    ! host +  api/events/ any of the routes bellow
*/

/*
   ! validateToken middleware is responsible for checking if the token is valid before hitting the routes endpoint

   ! this is a different way to use the middleware, by adding the middleware inside its own router.use(validateToken), check the first way how the middleware was implemented inside the AUTH route.
*/

router.use(validateToken); // ! all of the routes need to pass trough the middleware (validateToken) before they can access the routes and only if the token is valid.

router.get('/', getAllEvents);

router.post(
  "/",
  [
    // !!! middleware
    check("title", "title is required").not().isEmpty(),
    check("notes", "").optional(),
    check("start", "Please include a valid email").not().isEmpty(),
    check("end", "Please include a valid email").not().isEmpty(),
    fieldValidators, // !calling this function after every check
  ],
  createNewEvent
);

router.put(
  "/:id",
  [
    // !!! middleware
    check("title", "title is required").not().isEmpty(),
    check("notes", "").optional(),
    check("start", "Please include a valid email").not().isEmpty(),
    check("end", "Please include a valid email").not().isEmpty(),
    fieldValidators, // !calling this function after every check
  ],
  updateEvent
);
router.use("/:id", deleteEvent);

module.exports = router;
