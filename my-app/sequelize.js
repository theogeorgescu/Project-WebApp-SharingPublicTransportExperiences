import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
    dialect:"sqlite",
    
    storage:"./sqlite/Feedback.db",
    storage:"./sqlite/User.db"
})


sequelize.sync({alter:true}).then(()=>{
    console.log('All the models has been synchronized')
})
export {sequelize}