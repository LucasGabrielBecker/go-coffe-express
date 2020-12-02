const app = require('express')();
const cors = require('cors')

app.use(cors())

const data = [
    {
        id:1,
        name:"Servico de dados",
    },
    {
        id:2,
        name:"Servico de autenticação"
    },
    {
        id:3,
        name:"Servico de Gos"
    },
    {
        id:4,
        name:"Servico de Users"
    },

]

app.get('/dataservice', (req, res)=>{
    res.json({succes:true, data})
})


app.listen(8080, () => console.log('data service running on http://localhost:8080'))