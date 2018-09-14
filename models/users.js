module.exports = function (sequelize, DataTypes) {
    var users = sequelize.define("users", {
        userName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
            // validate: {
            //     len: [6]
            // }
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number: {
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode: {
            type: DataTypes.STRING,
            allowNull: false
        },
        school: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    
    users.associate = function (models)
    {
        users.hasMany(models.books, {
            onDelete: "cascade"
        });
    };

    return users;
};