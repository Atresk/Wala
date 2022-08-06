module.exports = (sequelize, DataTypes) => {
	return sequelize.define('用戶', {
		user_id: {
			type: DataTypes.STRING,
			primaryKey: true,
		},
		活躍經驗值: {
			type: DataTypes.INTEGER,
			defaultValue: 0,
			allowNull: false,
		},
	}, {
		timestamps: true,
	});
};