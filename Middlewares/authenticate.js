
// function authenticateUser(cookieName){
//     return (req,res,next)=>{
//         const userCookieToken = req.cookies[cookieName];
//         if(!userCookieToken) {
//             next();
//         }
//         try {
//             const userPayload = validateUserToken(userCookieToken);
//             req.user = userPayload;
            
//         } catch (error) {
//             console.log(error);
            
           
            
//         }
                
//     };
// }
const {validateUserToken} = require("../utils/service")
const authenticate2 = function (tokenName){  

        return (req,res,next)=>{
        const UserCookieToken = req.cookies[tokenName];
        if(!UserCookieToken) {
            return next();
            
        }
        const userPayload = validateUserToken(UserCookieToken);
                    
            req.user = userPayload;
           
            
            return next();
        
    }

}

module.exports = {
  
     authenticate2
}