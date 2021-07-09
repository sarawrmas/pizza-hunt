const router = require('express').Router();
const pizzaRoutes = require('./pizza-routes.js');
const commentRoutes = require('./comment-routes.js');

router.use('/pizzas', pizzaRoutes);
router.use('/comments', commentRoutes);

module.exports = router;