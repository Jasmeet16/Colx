const { Product } = require("../models/productModel");
const { User } = require("../models/userModel");
const asyncHandler = require('express-async-handler');

//get products
// to api/products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.error(error);
  }
};

//getsingleproduct
//to api/products/:id
const getSingleProduct = async (req, res) => {
  try {
    const prod = await Product.findById(req.params.id);
    res.json(prod);
  } catch (error) {
    console.error(error);
  }
};

//post a product
//to api/products
const createProduct = asyncHandler( async (req, res) => {
  const { name, description, brand, category, price } = req.body;

  try {
    const user = await User.findById(req.user._id).select('-password');
      const newProd = await Product.create({
          name,
          image: 'default-image',
          description,
          brand,
          category,
          price,
          user: user
      });

      if (user) {
          const prodArr = user.products;
          prodArr.push(newProd);
          user.products = prodArr;
          await user.save();
      }
     res.json(newProd);
  } catch (error) {
    console.error(error);
  }
});


///  route  api/products/:id
/// only users that created the post are allowed to delete
const deleteProduct = async ( req , res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return res.status(401).json("User needd to be logged in");
  }
  try {
    const product = await Product.findById(req.params.id);
    //console.log(user._id);
   // console.log(product.user._id);

    if (user._id.toString() === product.user._id.toString()) {
      await product.delete();
      res.status(202).json("Product deleted successfully");
    }
  } catch (error) {
    console.error(error);
  }

}

module.exports.getProducts = getProducts;
module.exports.getSingleProduct = getSingleProduct;
module.exports.createProduct = createProduct;
module.exports.deleteProduct = deleteProduct