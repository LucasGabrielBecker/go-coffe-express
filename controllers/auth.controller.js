const User = require('../models/user.model');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/auth.json')


module.exports ={
    async login(req, res){
        const {email, password} = req.body;
        try {
            const user = await User.findOne({email}).select("+password")
            if(!user) return res.json({succes:false, msg:"Invalid email"})
            if(!await bcrypt.compareSync(password, user.password)) return res.json({succes:false, msg:"Invalid password"}).status(401)
            user.password = undefined;
            const token = jwt.sign({id: user.id},)

            res.json({succes:true, msg:"Logged succesfully", user}).status(200)
            
        } catch (error) {
            console.debug(error)
            return res.json({succes: false, msg:"Server error"}).status(500)            
        }
        


    }
}