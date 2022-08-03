const express = require("express");
const User = require("../../models/userModel");
const router = express.Router();

// create account api
router.post("/", async (req, res) => {
	// destructure body
	const { firstName, lastName, email, password } = req.body;

	// error check if body is emtpy
	if (!firstName || !lastName || !email || !password) {
		res.status(422).json({ error: true, message: "Body is empty." });
		res.end();
	}

	try {
		// structure user request
		const userStructure = new User({
			firstName,
			lastName,
			email,
			password,
		});

		// save user
		const result = await userStructure.save();

		// send response to client
		res.status(200).json({
			success: result,
			message: "User has been created.",
		});
		res.end();
	} catch (error) {
		// if err
		res.status(400).json({ error, message: "Creating user unsucessfull." });
		res.end();
	}
});

// export
module.exports = router;
