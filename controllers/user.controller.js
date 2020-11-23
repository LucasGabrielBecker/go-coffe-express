const User = require("../models/user.model")
const Yup = require('yup');
const { reset } = require("nodemon");


 module.exports = {
    async create(req, res, next){
        const user = req.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            password: Yup.string().min(8).required(),
            age:Yup.number().min(16).required(),
            interesses:Yup.array(Yup.string()),
            email: Yup.string().email().required()
        });


        schema.validate(user, {abortEarly: false})
            .then(async()=>{
                try {
                    const newUser = new User(user)
                    return res.json({user: await newUser.save()})
                } catch (error) {
                    console.log(error)
                    return res.json({succes:false, error: error.message}).status(500)                
                }

            }).catch((err)=>{
                console.log(err)
                let errors = []
                err.errors.map(error=>{
                    errors.push(error)
                })

                return res.json({succes:false, errors}).status(400)
            })
    },

    async getAllUsers(req, res, next){
        try {
            const users = await User.find({});
            return res.json(users).status(200)
        } catch (error) {
            console.log(error)
            return res.json({succes:false, msg:"Server error"}).status(500)            
        }
    },

}
