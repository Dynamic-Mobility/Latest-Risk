const express = require('express');
const router = express.Router();
const needle = require('needle');
const { json } = require('express');

//global variables
const API_BASE_URL = process.env.API_BASE_URL;
const API_URL = API_BASE_URL + '/api/v1/enterprisecompliance';

//GET ENTERPRISE COMPLIANCE
router.get('/', async (req, res) => {
    const options = {
        headers: {
            Authorization : req.header('Authorization')
        }
    }
    try{
        await needle('get',`${API_URL}/all`, options).then(response => {
            res.status(response.statusCode).json(response.body);
        }).catch(error => res.json(error))

    } catch (e) {
        res.json(e)
    }
});


//COMPLY ACTION
router.post("/comply", async (req, res) => {
    try {
      const formData = req.body;
      const options = {
        headers: {
          Authorization: req.header("Authorization")
        },
        json: true
      };
      const url = `${API_URL}/comply/${formData.id}`;
      await needle("post", url, formData, options)
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


//GET MAIN ENTERPRISE COMPLIANCE
router.get('/main', async (req, res) => {
    const options = {
        headers: {
            Authorization : req.header('Authorization')
        }
    }
    try{
        await needle('get',`${API_URL}/main/all`, options).then(response => {
            res.status(response.statusCode).json(response.body);
        }).catch(error => res.json(error))

    } catch (e) {
        res.json(e)
    }
});

//GET SUB ENTERPRISE COMPLIANCE
router.post('/sub', async (req, res) => {
    const formData = req.body;
    const options = {
        headers: {
            Authorization : req.header('Authorization')
        },
        json: true
    }
    try{
        await needle('get',`${API_URL}/sub/${formData.id}`, options).then(response => {
            res.status(response.statusCode).json(response.body);
        }).catch(error => res.json(error))

    } catch (e) {
        res.json(e)
    }
});

//ADD COMPLIANCE
router.post('/create', async(req, res) => {
    const options = {
        headers: {
            Authorization : req.header('Authorization')
        },
        json: true
    }
    const formData = req.body;
    try {
        await needle('post', `${API_URL}`,formData, options).then(response => {
            res.status(response.statusCode).json(response.body);
        }).catch(error => res.json(error))
    } catch (e) {
        res.status(500).json(e)
    }
});
//UPDATE COMPLIANCE
router.post('/update', async (req, res) => {
    try {
        const formData = req.body;
        const options = {
            headers: {
                Authorization : req.header('Authorization')
            },
            json: true
        }
        const url = `${API_URL}/${formData.id}`;
        await needle('put', url, formData, options). then( response =>{
            res.status(response.statusCode).json(response.body);
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

// DELETE ENTERPRISE COMPLIANCE
router.post("/delete", async (req, res) => {
    try {
      const formData = req.body;
      const options = {
        headers: {
          Authorization: req.header("Authorization")
        },
        json: true
      };
      const url = `${API_URL}/${formData.id}`;
      await needle("delete", url, formData, options)
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

  // APPROVE COMPLIANCE
router.post('/approve', async (req, res) => {
    try {
        const formData = req.body;
        console.log("FORM DATA",formData);
        const options = {
            headers: {
                Authorization : req.header('Authorization')
            },
            json: true
        }
        const url = `${API_URL}/approve/${formData.id}`;
        console.log("URL ",url);
        await needle('post', url, formData, options). then( response =>{
            res.status(response.statusCode).json(response.body);
        }).catch(error => {
            res.status(500).json(error);
        });
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
