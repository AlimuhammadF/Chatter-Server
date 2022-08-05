const express = require("express");
const User = require("../../models/userModel");
const router = express.Router();
const { hash } = require("bcryptjs");

// create account api
router.post("/", async (req, res, next) => {
	// destructure body
	const { firstName, lastName, email, password } = req.body;

	// error check if body is emtpy
	if (!firstName || !lastName || !email || !password) {
		res.status(406).json({ error: true, message: "Body is empty." });
		res.end();
	}

	// hash password
	const hasedPassword = await hash(password, 6);

	try {
		// structure user request
		const userStructure = new User({
			firstName,
			lastName,
			email,
			password: hasedPassword,
		});

		// save user
		const result = await userStructure.save();

		// send response to client when successfull
		res.status(201).json({
			success: result,
			message: "User has been created.",
		});
		res.end();
	} catch (error) {
		// if deplicate error
		if (error.keyValue.email) {
			res.status(406).json({
				error,
				message: "Email is already in use.",
			});
			res.end();
			return;
		} else {
			// if random error
			res.status(400).json({ error, message: "Something went wrong." });
			res.end();
			return;
		}
	}
});

// export
module.exports = router;
