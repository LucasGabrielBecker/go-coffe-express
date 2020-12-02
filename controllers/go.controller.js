const Go = require('../models/go.model')
const User = require('../models/user.model')
const Yup = require('yup')

module.exports ={
    async create(req, res, next){
        const go = req.body;

        const schema = Yup.object().shape({
            name: Yup.string().required(),
            address: Yup.string().required(),
            latitude:Yup.number().required(),
            longitude:Yup.number().required(),
            participants: Yup.array(Yup.string()),
            hour: Yup.string().required(),
            date:Yup.string().required(),
            category: Yup.string().required()
        });


        schema.validate(go, {abortEarly: false})
            .then(async()=>{
                try {
                    const newGo = new Go(go)
                    return res.json({go: await newGo.save()})
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

    async getAllgos(req,res){
        //return res.json({ gos:await Go.find().populate('participants').exec(function(err, list){
        const gos = await Go.find().populate('participants')
        if (!gos) res.json({succes:false, msg:"No go founded"}).status(500)

        res.json({succes:true, msg:"Go founded", gos})
    },
    

    async getGoById(req, res){
        // const go = await Go.findOne({_id: req.params.id}).populate({path:'participants',select:'name'}).exec()
        const go = await Go.findOne({_id: req.params.id}).populate('participants')
        
        
        res.json(go).status(200)
    },

    async deleteGoById(req, res){
        try {
            await Go.findByIdAndRemove(req.params.id)
            res.json({succes:true, msg:"Deleted succesfully"}).status(200)
        } catch (error) {
            res.json({succes:false, msg:"Error on deleting Go"})            
        }
    },

    async asignParticipantToGo(req, res){
        var {user, go} = req.body;
        var goToUpdate = await Go.findById({_id: go})
        goToUpdate.participants.push(user)
        await goToUpdate.save()
        res.json({succes:true})

    }

}