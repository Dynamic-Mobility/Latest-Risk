const express = require('express');
const router = express.Router();
const needle = require('needle');

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/v1';

//get risk controls
router.get('/', async (req, res) => {
    const options = {
        headers: {
            Authorization : req.header('Authorization')
        }
    }
    try{
        await needle('get',`${API_URL}/categorycontrol`, options).then(response => {
            res.status(response.statusCode).json(response.body);
        }).catch(error => res.json(error))

    } catch (e) {
        res.json(e)
    }
});

//add risk control
router.post('/create', async(req, res) => {
    const options = {
        headers: {
            Authorization : req.header('Authorization')
        },
        json: true
    }
    const formData = req.body;
    try {
        await needle('post', `${API_URL}/categorycontrol`,formData, options).then(response => {
            res.status(response.statusCode).json(response.body);
        }).catch(error => res.json(error))
    } catch (e) {
        res.status(500).json(e)
    }
});
//update risk control
router.post('/update', async (req, res) => {
    try {
        const formData = req.body;
        const options = {
            headers: {
                Authorization : req.header('Authorization')
            },
            json: true
        }
        const url = `${API_URL}/categorycontrol/${formData.id}`;
        await needle('put', url, formData, options). then( response =>{
            res.status(response.statusCode).json(response.body);
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
