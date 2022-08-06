const express = require("express");
const User = require("../../models/userModel");
const router = express.Router();

// search user post api
router.get("/", async (req, res) => {
	// destructure query
	const search = req.query.search;

	// throw error if no body found
	if (!search) {
		res.status(406).json({ error: true, message: "Body is empty" });
		res.end();
		return;
	}

	// search user
	try {
		const result = await User.aggregate([
			{
				$search: {
					index: "userSearch",
					text: {
						query: search,
						path: {
							wildcard: "*",
						},
						fuzzy: {},
					},
				},
			},
			{
				$project: {
					_id: 1,
					firstName: 1,
					lastName: 1,
					email: 1,
				},
			},
		]);

		res.status(200).json({
			success: true,
			message: "Search operation successfull",
			result,
		});

		res.end();
		return;
	} catch (error) {
		res.status(400).json({
			error,
			message: "Search operation unsuccessfull",
		});

		res.end();
	}
});

// export
module.exports = router;
