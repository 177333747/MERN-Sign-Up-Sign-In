const express = require('express')
const config = require('config')
const mongoose = require('mongoose') 

const app = express()

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))

app.use('/api/link', require('./routes/link.routes'))



const PORT = config.get('port') || 5000

async function start(){
    try{
        mongoose.connect(config.get('databaseUri'), {

            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(PORT, ()=> console.log(`Startedd on PORT ${PORT}`))


    }catch(e){
    console.log('Error', e.message)
}
}
start()

