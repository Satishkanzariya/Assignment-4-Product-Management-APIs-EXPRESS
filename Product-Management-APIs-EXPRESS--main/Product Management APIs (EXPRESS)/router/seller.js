const express = require('express');
const router = express.Router();
router.use(express.json());

//const app = express()
//app.use(express.json());
//const port = 8082

router.get('/', (req, res) => res.send('product page!'))

//const seller = [];

const seller = require('../data/seller');

router.post('/addseller', (req, res) => {
    const sdata = req.body;
    seller.push(sdata);
    return res.json({ data: seller });
});


module.exports = router;
//module.exports = router, seller;

/*{
    "sid":"123",
    "name":"hardik",
    "pid":["101","102","103"]
},
{
    "sid":"123",
    "name":"Rajesh",
    "pid":["103","123","152"]
},
{
    "sid":"123",
    "name":"jonshan",
    "pid":["102","152","521"]
}*/