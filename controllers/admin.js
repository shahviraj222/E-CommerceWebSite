const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
 
  Product.findAll().then(products =>{
    res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
   
  })
  .catch(err => console.log(err));
 
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // using this method we can creat
//   req.user
//   .createProduct(
//      // we are instantly create a databse entry
//      {
//       title:title,
//       imageUrl:imageUrl,
//       price:price,
//       description:description,
//       // userId:req.user.Id if we are not using sequelizer inbuilt method
//     }
//   )
//   .then(result=>{
//     console.log("Product is created")
//     res.redirect('/admin/products')

// })
// .catch(err=>{
//   console.log(err)
// })
  // 1 **here we are creating databse**
  Product.create(
    // we are instantly create a databse entry
    {
      title:title,
      imageUrl:imageUrl,
      price:price,
      description:description,
      userId:req.user //if we are not using sequelizer inbuilt method
    }
  )
  .then(result=>{
      console.log("Product is created")
      res.redirect('/admin/products')

  })
  .catch(err=>{
    console.log(err)
  })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.findByPk(prodId)
  .then( product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    });
  })
  .catch(err =>{
    console.log(err)
  })
  
};

// onclick update button in admin 
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
  
  .then(product =>{ // this then is for the method findByPk method one
    product.title=updatedTitle;
    product.price=updatedPrice;
    product.description=updatedDesc;
    product.imageUrl=updatedImageUrl;
    
    // to save the updated one we have method that update the object
    return product.save();
  })
  .then(result =>{ //this then use for the save() wala method
    console.log("Your Product is updated",result)
    res.redirect('/admin/products');
  })
  .catch(err =>{
    console.log("Not saved!",err)
  })
};

exports.getProducts = (req, res, next) => {
  
  Product.findAll().then(products =>{
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
   
  })
  .catch(err => console.log(err));
};


exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findByPk(prodId)
  .then(product =>{
    return product.destroy();
  })
  .then( result =>{
    console.log("Destroyed Product");
    res.redirect('/admin/products')
  })
  .catch(err =>{
    console.log(err)
  });

  res.redirect('/admin/products');
};
