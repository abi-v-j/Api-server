const express = require('express')
const router = express.Router()
const User = require('../../models/User')
const config = require('config');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../../middlewares/Auth')


router.get('/', authMiddleware, async (req, res) => {
    try {
        // Extract user ID from req.user
        const userId = req.user.id;

        // Find the user in the database using the ID
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }

        // Return user information
        res.json( {user} );
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ msg: 'Server error' });
    }
});



router.post('/', async (req, res) => {
    const { email , displayName} = req.body;
    try {
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            email,
            displayName
        });

        await user.save();

        // Generate JWT token
        const payload = {
            user: {
                id: user.id,
            },
        };

        jwt.sign(
            payload,
            config.get('jwtSecret'), // Replace 'yourSecretKey' with your actual secret key
            { expiresIn: '1h' }, // You can adjust the expiration time as per your requirement
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Return the token to the client
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: 'Server error' });
    }
});

// router.get('/', async (req, res) => {
//     let movie = await Movie.find()
//     res.send(movie).status(200)
// })


module.exports = router