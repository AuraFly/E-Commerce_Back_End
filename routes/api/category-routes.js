const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
  // find all categories
  // be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const catInfo = await Category.findAll(
      {
        include: {
          model: Product,
          attributes: ['product_name']
        }
      }
    );
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // find one category by its `id` value
  // be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const catInfo = await Category.findByPk(req.params.id, {
      include: {
        model: Product,
        attributes: ['category_id']
      }
    });
    if (!catInfo) {
      res.status(404).json({message: 'Could not find a category with this ID.'});
      return;
    }
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // create a new category
router.post('/', async (req, res) => {
  try {
    const catInfo = await Category.create({
      category_name: req.body.category_name
    });
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
  });

  // update a category by its `id` value
router.put('/:id', async (req, res) => {
try {
  const catInfo = await Category.update(
    {
      category_name: req.body.category_name
    },
    {
      where: {
        id: req.params.id
      }
    });
    if (!catInfo) {
      res.status(404).json({ message: 'Could not find a category with this ID.' });
      return;
    }
    res.status(200).json(catInfo);
  } catch (err) {
    res.status(500).json(err);
  }
});

  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
try {
  const catInfo = await Category.destroy({
    where: {
      id: req.params.id
    }
  });
  if (!catInfo) {
    res.status(404).json({ message: 'Could not find a category with this ID.' });
    return;
}
res.status(200).json(catInfo);
} catch (err) {
  res.status(500).json(err);
}
});

module.exports = router;
