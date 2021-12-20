const express = require('express');
const router = express.Router();
router.use(express.json());

//const app = express()
//app.use(express.json());
//const port = 8082

router.get('/', (req, res) => res.send('product page!'))
const companydata = require("../data/company");
const productaaray = require('../data/product');

//const productaaray = [];

router.post('/addpro',(req,res) => {
    const product = req.body;
    productaaray.push(product);
    return res.json({ data: productaaray });
});

router.post('/pname',(req,res) => {
    const pname = req.body.pname;
	const productdata = productaaray.filter((p) => p.title === pname);
	//const ciid = productdata.filter((c) => (c.cid));
	const fcid = companydata.filter((p) => p.cid === productdata[0].cid);

	if (productdata.length == 0) {
		//res.json({ data: productdata.cid });
		res.json({data : "not found"});
	} else {
		res.json({ data:  fcid});
	}
});

//module.exports = productaaray;
module.exports = router;

/*{
	"pid":"101",
	"title":"fan",
	"price":"2000",
	"category":["Tower Fans","Wall Mounted Fans","Misting Fans"],
    "cid":"456",
	"sid":["123","456","152"]
},
{
    "pid":"102",
	"title":"refrigerator",
	"price":"15000",
	"category":["Top freezer","Bottom freezer"],
    "cid":"456",
	"sid":["123","456","152"]
},
{
    "pid":"103",
	"title":"television",
	"price":"12000",
	"category":["LCD","LED","4K"],
    "cid":"456",
	"sid":["123","456","152"]
}*/