import db from "../models/index";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPasswordbcrypt = await hashUserPass(data.password);
      await db.User.create({
        email: data.email,
        password: hashPasswordbcrypt,
        firstName: data.firstName,
        lastName: data.lastName,
        adress: data.adress,
        gender: data.gender === "1" ? true : false,
        phoneNumber: data.phoneNumber,
        roleId: data.role,
      });
      resolve("ok create news a user succeed");
    } catch (error) {
      reject(error);
    }
  });
};
let hashUserPass = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await bcrypt.hashSync(password, salt);
      resolve(hashPassword);
    } catch (error) {
      reject(error);
    }
  });
};
let getAlluser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let users = db.User.findAll({
        raw: true,
      });
      resolve(users);
    } catch (e) {
      reject(e);
    }
  });
};
let getUserinfobyId = (userid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userid },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (e) {
      reject(e);
    }
  });
};
let updateUserData = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: data.id },
      });
      if (user) {
        (user.firstName = data.firstName),
          (user.lastName = data.lastName),
          (user.adress = data.adress),
          await user.save();
        let allUser = await db.User.findAll();
        resolve(allUser);
      } else {
        resolve();
      }
      await db.User.update({});
    } catch (e) {
      reject(e);
    }
  });
};
let deleteUserById = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: userId },
      });
      if (user) {
        await user.destroy();
      }
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
module.exports = {
  createNewUser,
  getAlluser,
  getUserinfobyId,
  updateUserData,
  deleteUserById,
};
