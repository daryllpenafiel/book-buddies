module.exports = function (sequelize, DataTypes)
{
    var books = sequelize.define("books", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
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
        image: {
            type: DataTypes.STRING,
            allowNull: true
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
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }    
    });

    books.associate = function (models) {
        books.belongsTo(models.users,{targetKey:'email',foreignKey:'email'});
    }

    return books;
};

