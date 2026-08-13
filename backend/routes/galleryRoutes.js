const express = require("express");
const router = express.Router();
const Photo = require("../models/Photo");
const upload = require("../middleware/upload");


// ===============================
// GET ALL PHOTOS
// ===============================

router.get("/", async (req, res) => {

    try {

        const photos = await Photo.find()
            .sort({ createdAt: -1 });

        res.json(photos);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});


// ===============================
// GET ALBUMS
// ===============================
router.get("/albums", async (req, res) => {

    try {

        const albums = await Photo.aggregate([

            {
                $match: {
                    category: "wedding",
                    album: {
                        $exists: true,
                        $ne: ""
                    }
                }
            },

            {
                $group: {
                    _id: "$album",

                    count: {
                        $sum: 1
                    },

                    coverImage: {
                        $first: "$image"
                    }
                }
            },

            {
                $sort: {
                    _id: 1
                }
            }

        ]);

        res.json(albums);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: err.message
        });

    }

});

// ===============================
// UPLOAD MULTIPLE PHOTOS
// ===============================

router.post(
    "/upload",
    upload.array("images"),
    async (req, res) => {

        try {

            console.log("FILES:", req.files);
            console.log("BODY:", req.body);


            if (!req.files || req.files.length === 0) {

                return res.status(400).json({
                    success: false,
                    message: "No images uploaded"
                });

            }


            const {
                category,
                album,
                title,
                description
            } = req.body;


            const photos = [];


            for (const file of req.files) {

                const photo = await Photo.create({

                    category: category,

                    album: album,

                    image: `/uploads/${file.filename}`,

                    title: title,

                    description: description

                });


                photos.push(photo);

            }


            res.status(201).json({

                success: true,

                message: "Images uploaded successfully",

                photos: photos

            });


        } catch (err) {

            console.log("UPLOAD ERROR:", err);

            res.status(500).json({

                success: false,

                message: "Upload failed",

                error: err.message

            });

        }

    }
);


// ===============================
// DELETE PHOTO
// ===============================

router.delete("/:id", async (req, res) => {

    try {

        const photo = await Photo.findByIdAndDelete(
            req.params.id
        );


        if (!photo) {

            return res.status(404).json({

                success: false,

                message: "Photo not found"

            });

        }


        res.json({

            success: true,

            message: "Photo deleted successfully"

        });


    } catch (err) {

        console.log(err);

        res.status(500).json({

            success: false,

            message: err.message

        });

    }

});


module.exports = router;