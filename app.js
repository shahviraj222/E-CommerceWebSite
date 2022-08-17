// we are adding database here if it have table in sql
const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const db = require('./util/database');

const sequelize=require('./util/database')

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// here Product and User is imported to map together
const Product =require('./models/user');
const User =require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// when ever incoming request register 
app.use((req,res,next)=>{

    //here my findByPk() returns the object which is findin database 
    User.findByPk(1)
    .then(user=>{
        //req.user is not predefine in req we are adding that 
        // storing user which retrive form the database
        req.user =user;
        next();
    })
})


// here we are adding relation that prodyuct belongs to user
Product.belongsTo(User,{constraints:true, onDelete:'CASCADE'})
User.hasMany(Product);

// this sync method synchronyze all the database work

// below code is run if npm start or server listen
sequelize.sync(/*{force:true}*/).then(result =>{
    
    return User.findByPk(1);
    console.log(result)
    // app.listen(3000)
})
.then(user=>{
    if(!user)
    {
        return User.create({name:"Viraj",email:"shahviraj030@gmail.com"})
    }
})

.catch(err => {
    console.log(err)
})
app.listen(3000);
