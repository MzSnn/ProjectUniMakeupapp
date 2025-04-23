const express = require('express');
const router = express.Router();
const Appointment = require('../models/Appointment');

// GET all appointments
router.get('/', async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).send({ error: 'Error fetching appointments' });
  }
});

// POST a new appointment
router.post('/', async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.json(appointment);
  } catch (error) {
    res.status(500).send({ error: 'Error saving appointment' });
  }
});

// DELETE appointment by ID
router.delete('/:id', async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).send({ message: 'Deleted' });
  } catch (error) {
    res.status(500).send({ error: 'Error deleting appointment' });
  }
});

module.exports = router;
