const { Pizza } = require('../models');

const PizzaController = {
  getAllPizza(req, res) {
    Pizza.find({})
    // populate comment field
    .populate({
      path: 'comments',
      select: '-__v'
    })
    // do not (-) include __v field
    .select('-__v')
    // sort by newest pizza (DESC order)
    .sort({ _id: -1 })
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // destructure params from express req object to avoid returning unnecessary data
  getPizzaById({ params }, res) {
    Pizza.findOne({_id: params.id })
    // populate comment field
    .populate({
      path: 'comments',
      select: '-__v'
    })
    // do not (-) include __v field
    .select('-__v')
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' })
      }
      res.json(dbPizzaData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // destructure body from express req object to avoid returning unnecessary data
  createPizza({ body }, res) {
    Pizza.create(body)
    .then(dbPizzaData => res.json(dbPizzaData))
    .catch(err => res.status(400).json(err));
  },

  updatePizza({ params, body }, res) {
    // return new version of document instead of original
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
  },

  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
    .then(dbPizzaData => {
      if (!dbPizzaData) {
        res.status(404).json({ message: 'No pizza found with this id!' });
        return;
      }
      res.json(dbPizzaData);
    })
    .catch(err => res.status(400).json(err));
  }
};

module.exports = PizzaController;