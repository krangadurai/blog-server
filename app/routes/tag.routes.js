const { authJwt } = require("../middlewares");
const tagController = require("../controllers/tag.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
    next();
  });

  app.get("/api/tags", tagController.getAllTags);

  app.get("/api/tags/:id", tagController.getTagById);

  app.post(
    "/api/tags",
    [authJwt.verifyToken], // Example middleware - only allow admins to create tags
    tagController.createTag
  );

  app.put(
    "/api/tags/:id",
    [authJwt.verifyToken ], // Example middleware - only allow admins to update tags
    tagController.updateTagById
  );

  app.delete(
    "/api/tags/:id",
    [authJwt.verifyToken, authJwt.isAdmin], // Example middleware - only allow admins to delete tags
    tagController.deleteTagById
  );
};
