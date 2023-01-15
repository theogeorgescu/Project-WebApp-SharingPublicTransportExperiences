import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";
import { User } from "./userModel.js";

const Feedback=sequelize.define("feedback",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    startingPoint:{
        type:DataTypes.STRING,
        allowNull:false
    },
    destnationPoint:{
        type:DataTypes.STRING,
        allowNull:false
    },
    transportType:{
        type:DataTypes.STRING,
        validateL:{
            validateType(value){
                if(!(value==='BUS' || value==='METRO'||value==='TRAM')){
                    throw new Error('Transport type wrong. Please type: BUS, METRO or TRAM')
                }
            }
        }
    },
    observations:{
        type:DataTypes.STRING
    },
    statisfactionLevel:{
        type:DataTypes.INTEGER,
        allowNull:false
    }

});

User.hasMany(Feedback, {
    foreignKey: {
        name: 'userID',
        allowNull: false
    }
});

export{Feedback};