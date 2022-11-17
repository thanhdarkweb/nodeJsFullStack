import userServices from "../services/userServices";

let handleLogin = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  if (!email || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing Input ",
    });
  }
  let userData = await userServices.handleUserLogin(email, password);
  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user:userData.user ?userData.user :[],
  });
};
let handleGetAllUsers =async (req,res) =>{
  let id = req.query.id;
  let user = await userServices.getAllusers(id);
  return res.status(200).json({
    errCode:0,
    errMessage:'ok',
    user
  })
}
let handleCreateNewUser = async(req,res)=>{
  let message = await userServices.createNewUser(req.body);
  return res.status(200).json(message)
}
let handleDeleteUsers = async (req,res)=>{
  if (!req.body.id) {
    return res.status(200).json({
      errCode:1,
      errMessage:'thieeus id'
    })
  }
  let messege  = await userServices.deleteUser(req.body.id);
  return res.status(200).json(messege)
}
let handleEditUsers = async(req,res)=>{
let data = req.body;
let message = await userServices.updateUserData(data);
return res.status(200).json(message)

}

module.exports = {
  handleLogin,handleGetAllUsers,handleCreateNewUser,handleDeleteUsers,handleEditUsers
};
