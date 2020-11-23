const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        unique:false,
        trim:true,
        select:false,
        set: value => bcrypt.hashSync(value, 10)
    },
    age:{
        type: Number,
        trim:true,
        unique:false,
        required:true
    },
    interesses:{
        type:[String],
        unique:false,
        trim:true,
        required:false
    },
    __v:{
        type: Number,
        select: false
    }
});

userSchema.pre('find', function() {
    this.start = Date.now();
});

userSchema.post('find', function(result) {
    // prints number of milliseconds the query took
    console.log('find() took ' + (Date.now() - this.start) + ' millis');
  });

userSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error(`${Object.keys(error.keyValue)} must be unique`));
    } else {
      next(error);
    }
});


const User = mongoose.model('User', userSchema)

module.exports = User;