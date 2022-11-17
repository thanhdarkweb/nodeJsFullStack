import db from "../models/index";
import bcrypt, { hash } from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
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
let handleUserLogin = (email, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userData = {};
      let isExits = await checkUserMail(email);
      if (isExits) {
        let user = await db.User.findOne({
            raw:true,
          where: { email: email },
        attributes:['email','roleId','password']
        });
        if (user) {
            // let check =password===user.password;
           let check = await bcrypt.compare(password,user.password)
           if (check) {
            userData.errCode=0,
            userData.errMessage="ok",
            delete user.password
            userData.user=user;
           }else{
            userData.errCode=3,
            userData.errMessage="wrong password",
            userData.user=user;
           }
        }
        else{
            userData.errCode = 2;
            userData.errMessage = `Password not exits`;
        }
      } else {
        userData.errCode = 1;
        userData.errMessage = `Your's Email exits`;
      }
      resolve(userData);

    } catch (e) {
      reject(e);
    }
  });
};

let checkUserMail = (userEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { email: userEmail },
      });
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};
let getAllusers = (userId)=>{
  return new Promise(async(resolve, reject) => {
    let user = "";
    try {
      if (userId=='ALL') {
        user=await db.User.findAll({
          raw:true,
          attributes:{
            exclude:['password']
          }

        })
      }if (userId && userId!=='ALL') {
        user =await db.User.findOne({
          where:{id:userId},
          attributes:{
            exclude:['password']
          }
      })
       
    }
      resolve(user)
    } catch (e) {
      reject(e)
    }
  })
}
let createNewUser = (data)=>{
  return new Promise(async (resolve, reject) => {
    try {
      let check = await checkUserMail(data.email);
      if (check==true) {
        resolve({
          errCode:1,message:'nhap 1 email khac'
        })
      }
      else{
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
      resolve({
        errCode:0,
        message:'ok'
      });
      }
      
    } catch (error) {
      reject(error)
    }
  })
}
let deleteUser =(id)=>{
return new Promise(async(resolve, reject) => {
  try {
    let user = await db.User.findOne({
      where:{id}
    })
    if (!user) {
      resolve({
        errCode:2,
        errMessage:'nguoi dung khong ton tai'
      })
    }
    if (user) {
      
      await db.User.destroy({
        where:{id}
      })
    }
    resolve({
      errCode:0,
      message:'nguoi dung da bi xoa'

    })
  } catch (error) {
    reject(error)
  }
})
}
let updateUserData = (data)=>{
  return new Promise(async(resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where:{id:data.id},
        raw:false
      })
      if (user) {
        user.firstName = data.firstName;
        user.lastName = data.lastName;
        user.adress = data.adress;
        await user.save()
        resolve({
          errCode:0,
          message:'update thanh cong'
        })
      }
    } catch (error) {
      reject({
        errCode:1,
        message:'user not found'
      })
    }
  })
}
module.exports = {
  handleUserLogin,getAllusers,createNewUser,deleteUser,updateUserData
};
