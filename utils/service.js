
const jwt = require("jsonwebtoken");
const secret = "Ashish!@#$%";
 
const genetrateToken = function(user){
    const payload = {
        name:user.fullname,
        id:user._id,
        email:user.email,
        role:user.role,
        profileImageUrl: user.profileImage,
    }
    const token = jwt.sign(payload,secret);
    return token;
}


const validateUserToken = function(token){
    const tokenDetailsPayload = jwt.verify(token,secret);
    return tokenDetailsPayload;
}





module.exports = {
    genetrateToken,
    validateUserToken,
  
}