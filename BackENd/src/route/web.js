import homePage from "../controllers/homeController";
import express from "express";
import cors from 'cors'
import userController from "../controllers/userController";
let router = express.Router();
let initWebRouter = (app) => {
  router.get("/", homePage.homePage);
  router.get("/crud", homePage.CrudPage);
  router.post("/post-crud", homePage.PostCrud);
  router.post("/pust-crud", homePage.PUTCRUD);
  router.get("/get-crud", homePage.getCrud);
  router.get("/edit-crud", homePage.editCrud);
  router.get("/delete-crud", homePage.deleteCrud);
  router.post("/api/login", userController.handleLogin);
  router.post("/api/crete-new-user", userController.handleCreateNewUser);
  router.get("/api/get-all-user", userController.handleGetAllUsers);
  router.put("/api/eidt-user", userController.handleEditUsers);
  router.delete("/api/delete-user", userController.handleDeleteUsers);
  return app.use("/", router);
};

module.exports = initWebRouter;
