import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";


const User=sequelize.define("user",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    username:{
        type:DataTypes.STRING,
        // allowNull:false,
        unique:true
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }
   
});

export{User}