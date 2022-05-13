const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const seedTags = require('../../seeds/tag-seeds');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    ],
  }).then((data) => {
    res.json(data);
  });
  // be sure to include its associated Product data
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ['id', 'tag_name'],
    include: [
      {
        model: Product,
        attributes: ['product_name', 'price', 'stock', 'category_id'],
      },
    ],
  }).then((data) => {
    res.json(data);
  });
  // be sure to include its associated Product data
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name,
  }).then((data) => {
    res.json(data);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(
    {
      tag_name: req.body.tag_name,
    },
    {
      where: {
        id: req.params.id,
      },
    },
  ).then((data) => {
    if (!data) {
      res.status(404).json({ message: 'no tag found with that id' });
    }
    res.json(data);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  }).then((data) => {
    if (!data) {
      res.status(404).json({ message: 'no tag found with that id' });
    }
    res.json(data);
  });
});

module.exports = router;
