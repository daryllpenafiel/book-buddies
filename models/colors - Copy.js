module.exports = function (sequelize, DataTypes)
{
    var colors = sequelize.define("colors", {
        colorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hex: {
            type: DataTypes.STRING,
            allowNull: true
            // validate: {
            //     len: [6]
            // }
        },
        rgb: {
            type: DataTypes.STRING,
            allowNull: true
        },
        colorFamily: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colorSource: {
            type: DataTypes.STRING,
            defaultValue:"user"
        },
        likes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });

    return colors;
};

