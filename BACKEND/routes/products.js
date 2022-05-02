const router = require("express").Router();
const Products = require("../models/products");

router.route("/create").post(async (req, res) => {
  const { productName, productDescrip, productCategory, image, status } =
    req.body;

  const productPrice = Number(req.body.productPrice);

  const qty = Number(req.body.qty);

  const dateAdded = Date(req.body.dateAdded);

  const newProducts = new Products({
    productName,
    productDescrip,
    productCategory,
    image,
    status,
    productPrice,
    qty,
    dateAdded,
  }); // create a new object using database schema

  const isAvailable = await Products.findOne({
    //check the availability of saving data
    productName: { $regex: new RegExp(productName, "i") },
  });

  if (isAvailable) {
    return res
      .status(401)
      .json({ error: "Product already added, Plz add a new product 🧐" });
  }

  await newProducts
    .save()
    .then(() => res.status(200).json({ success: true }))
    .catch((error) => res.status(500).json({ success: false, error: error })); //else save to the db
});

router.route("/").get(async (req, res) => {
  //route for fetching all the data
  await Products.find()
    .then((products) => res.json(products))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/get/:id").get(async (req, res) => {
  //route for getting a relavant document using id
  const { id } = req.params;

  await Products.findById(id) //find by the document by id
    .then((products) => res.json(products))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/delete/:id").delete(async (req, res) => {
  //route for deleting a relavant document using id
  const { id } = req.params;

  await Products.findByIdAndDelete(id) //find by the document by id and delete
    .then(() => res.json({ message: "Successfully Deleted" }))
    .catch((error) => res.status(500).json({ success: false, error: error }));
});

router.route("/update/:id").put(async (req, res) => {
  //route for updating a relavant document using id
  //backend route for updating relavant data and passing back
  const { id } = req.params;
  const {
    productName,
    productDescrip,
    productCategory,
    image,
    status,
    productPrice,
    qty,
    dateAdded,
  } = req.body;

  await Products.findByIdAndUpdate(id, {
    productName,
    productDescrip,
    productCategory,
    image,
    status,
    productPrice,
    qty,
    dateAdded,
  })
    .then(() => res.json({ success: true }))
    .catch((error) => res.json({ success: false, error: error }));
});

module.exports = router;