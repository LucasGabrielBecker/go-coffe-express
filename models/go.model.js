const mongoose = require('mongoose')

const goSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:false,
        trim:true
    },
    address:{
        type:String,
        required:true,
        trim:true
    },
    latitude:{
        type:Number,
        required:true,
        trim:true,
    },
    longitude:{
        type:Number,
        required:true,
        trim:true,
    },
    participants:[{
        type:[mongoose.Schema.Types.ObjectId],
        ref: 'User',
        unique:false,
        trim:true,
        required:false
    }],
    hour:{
        type:String,
        unique:false,
        trim:true,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    category:{
        type:String,
        unique:false,
        trim:true,
        required:true
    },
    __v:{
        type: Number,
        select: false
    }
});

goSchema.pre('find', function() {
    this.start = Date.now();
});

goSchema.post('find', function(result) {
    // prints number of milliseconds the query took
    console.log('find() took ' + (Date.now() - this.start) + ' milliseconds');
  });

goSchema.post('save', function(error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
      next(new Error(`${Object.keys(error.keyValue)} must be unique`));
    } else {
      next(error);
    }
});


const Go = mongoose.model('Go', goSchema)

module.exports = Go;