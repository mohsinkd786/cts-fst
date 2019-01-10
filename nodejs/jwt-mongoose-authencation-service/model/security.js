const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/jwt-auth-sample');
const Schema = mongoose.Schema;
const securitySchema = new Schema({
    _id: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    }
});
const Security = mongoose.model('security',securitySchema);
module.exports={
    Security: Security
}