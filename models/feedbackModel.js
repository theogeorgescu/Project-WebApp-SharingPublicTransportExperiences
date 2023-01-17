import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Feedback=sequelize.define("feedback",{
    id:{
        type:DataTypes.UUID,
        defaultValue:DataTypes.UUIDV4,
        primaryKey:true
    },
    startingPoint:{
        type:DataTypes.STRING,
        
    },
    endingPoint:{
        type:DataTypes.STRING,
       
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
        
    }

});



export{Feedback};