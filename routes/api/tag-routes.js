const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findAll({
    attributes: ['id', 'tag_name'],
    include : [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbTagData => res.json(dbTagData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
        id: req.params.id
    },
    include : [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
})
.then(dbTagData => {
    if (!dbTagData){
        res.status(404).json({message: 'No user found with this id'});
        return;
    }
    res.json(dbTagData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create({
    tag_name: req.body.tag_name
    
  })
  .then((tag) => {
    // if there's product tags, we need to create pairings to bulk create in the ProductTag model
    if (req.body.productsIds.length) {
      const productTagIdArr = req.body.productsIds.map((product_id) => {
        return {
          product_id,
          tag_id : tag.id,
        };
      });
      return ProductTag.bulkCreate(productTagIdArr);
    }
    // if no product tags, just respond
    res.status(200).json(tag);
  })
  .then((productTagIds) => res.status(200).json(productTagIds))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {

    where: {
      id: req.params.id,
    },
  })
  .then((Tag) => {
    // find all associated products from ProductTag
    return ProductTag.findAll({ where: { product_id: req.params.id}});
    
  })
  .then((productTags) => {
    // get list of current tag_ids

    const productTagIds = productTags.map(({ product_id }) => product_id);
    // create filtered list of new tag_ids
    const newProductTags = req.body.products
      .filter((product_id) => !productTagIds.includes(product_id))
      .map((product_id) => {
        return {
          product_id,
          tag_id : req.params.id,
        };
      });
    // figure out which ones to remove
    const productTagsToRemove = productTags
      .filter(({ product_id }) => !req.body.products.includes(product_id))
      .map(({ id }) => id);

    // run both actions
    return Promise.all([
      ProductTag.destroy({ where: { id: productTagsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);
  })
  .then((updatedProductTags) => res.json(updatedProductTags))
  .catch((err) => {
    console.log(err);
    res.status(400).json(err);
  });
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
        id: req.params.id
    }
})
.then(dbProductData => {
    if(!dbProductData) {
        res.status(404).json({message: 'No user found with this id'});
        return;
    }
    res.json(dbProductData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

module.exports = router;
