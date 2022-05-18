const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

  // find all tags
  // be sure to include its associated Product data

//Route for getting all tag data
router.get('/', async (req, res) => {
  try {
  const tagData = await Tag.findAll({
      include: {
      model: Product
      }
    });
  res.status(200).json(tagData);
    } catch (err) {
  res.status(500).json(err);
  };
  });

  // find a single tag by its `id`
  // be sure to include its associated Product data
router.get('/:id', (req, res) => {
  try {
    const tagbyId = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product
      }]
    });
    if (!tagbyId) {
      res.status(404).json({ message: 'Could not find a tag with this ID.' });
      return;
    }
    res.status(200).json(tagbyId);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new tag
router.post('/', (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  try {
    const tagbyId = await Tag.update({
      tag_name: req.body.tag_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    if (!tagbyId) {
      res.status(404).json({ message: 'Could not find a tag with this ID.' });
      return;
    };
    res.status(200).json(tagbyId);
  } catch (err) {
    res.status(500).json(err);
  };
});

  // delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  try {
    const tagbyId = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagbyId) {
      res.status(404).json({ message: 'Could not find a tag with this ID.' });
      return;
    };
    res.status(200).json(tagbyId);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
