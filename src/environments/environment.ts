export const typeOrmConfiguration = {
	type: 'mysql',
	host: process.env.HOST,
	port: process.env.PORT,
	username: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
	synchronize: true,
	logging: true,
	keepConnectionAlive: true,
};
