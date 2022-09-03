const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    attributes: ['id', 'category_name'],
    include : [
      {
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id']
      }
    ]
  })
  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
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
.then(dbCategoryData => {
    if (!dbCategoryData){
        res.status(404).json({message: 'No user found with this id'});
        return;
    }
    res.json(dbCategoryData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

router.post('/', (req, res) => {
  // create a new category
  var productid = req.body.productsId;
  Category.create({
    category_name: req.body.category_name
  })
  // .then((tag) => {
  //   // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //   if (req.body.products.length) {
  //     const productTagIdArr = req.body.products.map((product_id) => {
  //       return {
  //         product_id: product_id,
  //         tag_id: tag.id
  //       };
  //     });
  //     return ProductTag.bulkCreate(productTagIdArr);
  //   }
  //   // if no product tags, just respond
  //   res.status(200).json(product);
  // })
  .then(dbCategoryData => {
    if(productid) {
   for (let i = 0; i < productid.length; i++){
     Product.update({
      category_id: dbCategoryData.id,
      },
      {
      where: {
      id: productid[i]
    }})
  }
}
    res.json(dbCategoryData)
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  var productId = req.body.productsId;
  Category.update(req.body, {

    where: {
      id: req.params.id,
    },
  })
  .then(dbCategoryData => {
    if(productId) {
   for (let i = 0; i < productId.length; i++){
     Product.update({
      category_id: req.params.id,
      },
      {
      where: {
      id: productId[i]
    }})
  }
}
    res.json(dbCategoryData)
  })
  

  .then(dbCategoryData => res.json(dbCategoryData))
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  })
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
        id: req.params.id
    }
})
.then(dbCategoryData => {
    if(!dbCategoryData) {
        res.status(404).json({message: 'No user found with this id'});
        return;
    }
    res.json(dbCategoryData);
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});

});

module.exports = router;
