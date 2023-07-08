const { authJwt } = require("../middlewares");
const categoryController = require("../controllers/category.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/categories", categoryController.getAllCategories);

  app.get("/api/categories/:id", categoryController.getCategoryById);

  app.post(
    "/api/categories",
    [authJwt.verifyToken], // Example middleware - only allow admins to create categories
    categoryController.createCategory
  );

  app.put(
    "/api/categories/:id",
    [authJwt.verifyToken, ], // Example middleware - only allow admins to update categories
    categoryController.updateCategoryById
  );

  app.delete(
    "/api/categories/:id",
    [authJwt.verifyToken], // Example middleware - only allow admins to delete categories
    categoryController.deleteCategoryById
  );
};
