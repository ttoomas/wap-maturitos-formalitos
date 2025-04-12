import express from 'express';
import dogsController from '../controllers/dogs.js';

const router = express.Router()

// Routes
router.get('/', dogsController.getDogs);
router.get('/:id', dogsController.getDogById);

router.post('/', dogsController.createDog);
router.put('/:id', dogsController.updateDog);

router.delete('/:id', dogsController.deleteDog);


export default router