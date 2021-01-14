const router = require('express').Router();
const { filterByQuery, findById, createNewAnimal, validateAnimal} = require('../../lib/animals');
const { animals } = require('../../data/animals');

// Route for showing all animals json
router.get('/animals', (req, res) => {
    let results = animals;
    if (req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

// Route for finding animals json by id 
router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result); 
    } else {
        res.send(404);
    }
});

// Route for posting a new animal
router.post('/animals', (req, res) => {
    // req.body is where our incoming content will be
    // Set id based on what the next index of the array will be
    req.body.id = animals.length.toString();

    // If any data in req.body is incorrect, send 400 error back
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        // Add animal to json file and animals array in this function
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
});

module.exports = router;