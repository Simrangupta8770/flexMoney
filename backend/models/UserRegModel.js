const mongoose = require('mongoose')
const userRegSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    age: { type: Number, required: true},
    slot: { type: String, required: true},
    month: { type: String, required: true},
   
},{
    timeStamps: true
}
    
);


const UserReg = mongoose.model("UserReg", userRegSchema);
module.exports = UserReg;