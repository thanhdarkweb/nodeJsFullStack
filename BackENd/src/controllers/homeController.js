import db from "../models/index";
import CRUDservices from "../services/CRUDservices";
let homePage = async (req, res) => {
  try {
    let data = await db.User.findAll();

    return res.render("homePage.ejs", {
      data: JSON.stringify(data),
    });
  } catch (error) {
    console.log(error);
  }
};

let CrudPage = (req, res) => {
  return res.render("crud.ejs");
};
let PostCrud = async (req, res) => {
  let message = await CRUDservices.createNewUser(req.body);

  console.log(message);
  return res.send("post crud from server");
};

let getCrud = async (req, res) => {
  let data = await CRUDservices.getAlluser();
  return res.render("display-crud.ejs", {
    data: data,
  });
};
let editCrud = async (req, res) => {
  let userid = req.query.id;
  if (userid) {
    let userData = await CRUDservices.getUserinfobyId(userid);
    return res.render("editcrud", {
      userData,
    });
  } else {
    return res.send("user nodufaboi");
  }
};
let PUTCRUD = async (req, res) => {
  let data = req.body;
  let allUser = await CRUDservices.updateUserData(data);
  return res.render("display-crud.ejs", {
    data: allUser,
  });
};
let deleteCrud = async (req, res) => {
  let id = req.query.id;
  if (id) {
    await CRUDservices.deleteUserById(id);
    return res.send("delete succeed ");
  } else {
    return res.send("user not found ");
  }
};

module.exports = {
  homePage: homePage,
  CrudPage: CrudPage,
  PostCrud: PostCrud,
  getCrud,
  deleteCrud,
  editCrud,
  PUTCRUD,
};
