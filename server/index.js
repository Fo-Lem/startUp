require('dotenv').config()
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const express = require('express')
const cors =require('cors')
var fileUpload = require('express-fileupload');



const routerUser=require('./routes/userRouter')

const app = express()

const sequelize = require('./db')
const PORT = process.env.PORT || 8081;
const models =require('./models/models')

app.use(cors())
app.use(express.json())
app.use(fileUpload({}));
app.use(bodyParser.urlencoded({ extended: true })); 
app.use('/public/userAvatars',express.static('./public/userAvatars'));
app.use('/api',routerUser)


const start = async ()=>{
try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT,()=>console.log(`server started on port ${PORT}`))
} catch (error) {
    console.log(error)
}


}

start();
