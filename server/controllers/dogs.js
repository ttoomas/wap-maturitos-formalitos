import DogModel from '../models/dogs.js';

async function getDogs(req, res){
    try{
        const result = await DogModel.find().sort({ _id: -1 });

        if(!result || !result.length){
            return res.status(500).send({
                msg: "Dogs were not found"
            });
        }

        return res.status(200).send({
            data: result
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
}

async function getDogById(req, res){
    try{
        const id = req.params.id;
        const result = await DogModel.findById(id);

        if(!result){
            return res.status(500).send({
                msg: "Dog was not found"
            });
        }

        return res.status(200).send({
            data: result
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
}

async function createDog(req, res){
    try{
        const dogData = {
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            color: req.body.color,
        };
        const result = new DogModel(dogData);
        await result.save();

        if(!result){
            return res.status(500).send({
                msg: "Dogs was not created"
            });
        }

        return res.status(200).send({
            data: result
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
}

async function updateDog(req, res){
    try{
        const dogData = {
            name: req.body.name,
            age: req.body.age,
            breed: req.body.breed,
            color: req.body.color,
        }

        const result = await DogModel.findByIdAndUpdate(req.params.id, dogData);

        if(!result){
            return res.status(500).send({
                msg: "Dogs was not updated"
            });
        }

        return res.status(200).send({
            data: result
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
}

async function deleteDog(req, res){
    try{
        const result = await DogModel.findByIdAndDelete(req.params.id);

        if(!result){
            return res.status(500).send({
                msg: "Dogs was not deleted"
            });
        }

        return res.status(200).send({
            data: result
        });
    }
    catch(err){
        return res.status(500).send(err);
    }
}


export default {
    getDogs,
    getDogById,
    createDog,
    updateDog,
    deleteDog
}