const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// get all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product
        }
      ],
    });
    if (!categoryData) {
      res.status(404).json({ message: 'No categories!'});
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id);
    if (!categoryData) {
      res.status(404).json({ message: 'No category for this id!' });
      return;
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new 
  if (req.body.category_name) {
    try {
      Category.create({
        category_name: req.body.category_name
      });
      return res.status(200).json(`${req.body.category_name} category creation successful!`)
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json("Could not create category, must include category_name in body of request.")
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  // TODO:
  if (req.body.category_name && req.params.id) {
    try {
      await Category.update(
        {
          category_name: req.body.category_name
        },
        {
          where: {
            id: req.params.id
          }
        });
      res.status(200).json(`Updated category ID ${req.params.id} to ${req.body.category_name}.`)
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    return res.status(400).json("Could not create category, must include id in request params and category_name in body of request.")
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` 
  if (req.params.id) {
    try {
      await Category.destroy({
        where: {
          id: req.params.id
        }
      });
      return res.status(200).json(`Deleted category where id = ${req.params.id}`);
    } catch (err) {
      return res.status(500).json(err);
    }
  } else {
    return res.status(400).json("Could not find that ID. Please ensure the ID is specified in the URL parameters.");
  }
});

module.exports = router;
