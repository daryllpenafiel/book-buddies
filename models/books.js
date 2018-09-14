module.exports = function (sequelize, DataTypes)
{
    var books = sequelize.define("books", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isbn: {
            type: DataTypes.CHAR,
            allowNull: false
            // validate: {
            //     len: [20]
            // }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        condition: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.FLOAT,
            defaultValue: 0
        },
        comments: {
            type: DataTypes.STRING
        }
    });

    books.associate = function (models) {
        books.belongsTo(models.users, {
            foreignKey: models.users.email
        })
    }

    return books;
};

