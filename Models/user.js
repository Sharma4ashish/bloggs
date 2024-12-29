const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt'); 

const userSchema = new Schema({
  fullname: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  salt: {
    type: String,
    
  },
  password: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
    default: '/image/default-Profile-image.jpg',
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN'],
    default: 'USER',
  },
}, { timestamps: true }); 


// Pre-save hook to hash the password
userSchema.pre('save', async function(next) {
  const user = this;
  
  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
   
    const salt = await bcrypt.genSalt(10);
   
    const hashedPassword = await bcrypt.hash(user.password, salt);
    
    // Replace the plain text password with the hashed password
    user.password = hashedPassword;
    user.salt = salt;
    next();   
  } catch (error) {
    next(error);
  }
});

const User = model('User', userSchema);

module.exports = User;
