const router = require('express').Router();

// destructure method name from object and use names directly
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller.js');

// Set up GET all and POST at /api/pizzas
router
  .route('/')
  .get(getAllPizza)
  .post(createPizza);

// Set up GET one, PUT, and DELETE at /api/pizzas/:id
router
  .route('/:id')
  .get(getPizzaById)
  .put(updatePizza)
  .delete(deletePizza);

module.exports = router;