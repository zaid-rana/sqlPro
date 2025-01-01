const express = require('express');
const { getPassengers, createPassengers, updatePassengers, deletePassenger } = require('../controllers/PassengersController');

const router = express.Router()

//getting all students list
router.get('/list' , getPassengers);

router.post('/create' , createPassengers);

router.put('/update/:id' , updatePassengers);

router.delete('/delete/:id' , deletePassenger);

module.exports = router;