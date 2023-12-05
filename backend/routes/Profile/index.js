const express = require('express');
const router = express.Router();
const needle = require('needle');

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/personal';

//get profile details
router.get('/', async (req, res) => {
    const options = {
        headers: {
            Authorization : req.header('Authorization')
        }
    }
    try{
        await needle('get',`${API_URL}/profile`, options).then(response => {
            res.status(response.statusCode).json(response.body);
        }).catch(error => res.json(error))

    } catch (e) {
        res.json(e)
    }
});


//edit profile details
router.post('/update', async (req, res) => {
    try {
      const formData = req.body;
      const options = {
        headers: {
          Authorization: req.header('Authorization'),
        },
        json: true,
      };
      await needle('put', `${API_URL}/profile`, formData, options)
        .then(response => {
          res.status(response.statusCode).json(response.body);
        })
        .catch(error => {
          res.status(500).json(error);
        });
    } catch (e) {
      res.status(500).json(e);
    }
  });


module.exports = router;
