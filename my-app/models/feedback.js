import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";
import { User } from "./user.js";


const Feedback = sequelize.define("feedback", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    startingPoint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    destinationPoint: {
        type: DataTypes.STRING,
        allowNull: false
    },
    transportType: {
        type: DataTypes.STRING,
        validate: {
            validateType(value) {
                if (!(value === 'BUS' || value === 'METRO' || value === 'TRAM')) {
                    throw new Error('Transport type can only be: BUS, METRO or TRAM');
                }
            }
        }

    },
    departureHour: {
        type: DataTypes.TIME,
        allowNull: false
    },
    tripDuration: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    crowdednessLevel: {
        type: DataTypes.STRING,
        validate: {
            validateType(value) {
                if (!(value === 'LOW' || value === 'MEDIUM' || value === 'HIGH')) {
                    throw new Error('Transport type can only be: LOW, MEDIUM or HIGH');
                }
            }
        }
    },
    observations: {
        type: DataTypes.STRING
    },
    satisfactionLevel: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    author: {
        type: DataTypes.STRING,
        alowNull: false
    }
});

User.hasMany(Feedback, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});




  export {Feedback};