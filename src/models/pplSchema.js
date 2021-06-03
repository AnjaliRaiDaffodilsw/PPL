const mongoose = require('mongoose');
const validator = require('validator');

const pplSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        minLength: 3
    },
    lastname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique : true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email id 😞");
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 6
    },
    confirmpassword: {
        type: String,
        required: true,
        minLength: 6
    }
})


const PPLSchema = mongoose.model("PPLSchema", pplSchema);


module.exports = PPLSchema;