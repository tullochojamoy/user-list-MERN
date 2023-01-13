const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: [true, "Please provide a First Name"],
        },
        lastName: {
            type: String,
            required: [true, "Please provide a Last Name"],
        },
        email: {
            type: String,
            required: [true, "Please provide a email"],
            unique: true,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please provide a valid email",
            ],
        }
    }
);

//Handle Error for Duplicates in a User Friendly Manner
UserSchema.post('save', function(error, doc, next){
    if(error.name === 'MongoServerError' && error.code === 11000){
        next(new Error('This Email already exist in our Database'));
    } else {
        console.log(error.name)
        next(error);
    }
})

module.exports = mongoose.model("Users", UserSchema);