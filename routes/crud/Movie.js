const express = require('express')
const router = express.Router()
const Movie = require('../../models/Movie')


// router.post('/', async (req, res) => {
//   const { error } = MovieSchema.validate(req.body)
//   if (error) {
//     return res.status(400).json({ error: error.details })
//   }

//   const { name, logo } = req.body
//   try {
//     let movie = await Movie.findOne({ name })

//     if (movie) {
//       return res.status(400).json({ errors: [{ msg: 'Movie already exists' }] })
//     }

//     movie = new movie({
//       name,
//       logo
//     })

//     await movie.save()

//     res.json({ message: 'Movie inserted successfully' })
//   } catch (err) {
//     console.error(err.message)
//     res.status(500).send('Server error')
//   }

//   //see if user already exists
// })

router.get('/', async (req, res) => {
  let movie = await Movie.find()
  res.send(movie).status(200)
})


module.exports = router