const mongoose = require("mongoose");

const connectDb = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log(`Database connected: ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
		process.exit();
	}
};

module.exports = connectDb;
