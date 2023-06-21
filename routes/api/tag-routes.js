const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
          through: ProductTag,
        },
      ]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag for this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
   try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [
      {
        model: Product,
        through: ProductTag,
      },
    ]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No tag for this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  if (req.body.tag_name) {
    try {
      await Tag.create({
        tag_name: req.body.tag_name
      });
      return res.status(200).json(`${req.body.tag_name} tag created.`)
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(400).json("Could not create tag, must include tag_name in body of request.")
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  // TODO:
   try {
    await Tag.update(
      {
        tag_name: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        }
      });
    res.status(200).json(`Updated tag ID ${req.params.id} to ${req.body.tag_name}.`)
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    return res.status(200).json(`Deleted tag where id = ${req.params.id}`);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
