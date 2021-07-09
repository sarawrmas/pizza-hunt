const router = require('express').Router();

// destructure method name from object and use names directly
const {
  getAllPizza,
  getPizzaById,
  createPizza,
  updatePizza,
  deletePizza
} = require('../../controllers/pizza-controller.js');

// GET all and POST routes at /api/pizzas
router.route('/')
.get(getAllPizza)
.post(createPizza);

// GET one, PUT, and DELETE routes at /api/pizzas/:id
router.route('/:id')
.get(getPizzaById)
.put(updatePizza)
.delete(deletePizza);

module.exports = router;