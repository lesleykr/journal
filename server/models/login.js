module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define('login', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Login;
}