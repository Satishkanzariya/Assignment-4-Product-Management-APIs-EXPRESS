const express = require('express')
const app = express()
app.use(express.json());
const port = 8082

const productrouter = require("./router/product");
const sellerrouter = require("./router/seller");
const companyrouter = require("./router/company");

const arraydata = productrouter.productaaray;

const companydata = require("./data/company");
const productaaray = require('./data/product');
const sellerdata = require("./data/seller");

app.get('/list', (req, res) => {
    res.json({ data: arraydata });
})


//fetch company form product name

//app.get('/pname/:pn', (req, res) => {
app.post('/pname', (req, res) => {
    const pname = req.body.pname;
    //const pname = req.params.pn;
    const pdata = productaaray.filter((p) => p.title === pname);
    //const ciid = pdata.filter((c) => (c.cid));
    const fcid = companydata.filter((p) => p.cid === pdata[0].cid);

    if (pdata.length == 0) {
        //res.json({ data: pdata.cid });
        res.json({ data: "not found" });
    } else {
        res.json({ "passing product name fetch company details": fcid });
    }
});


//fetch seller form product name
app.get("/sname/:pn",(req,res)=> {
    const pname = req.params.pn;
    var sid = [];

    const pdata = productaaray.filter((p) => p.title === pname);
    const ssid = pdata[0].sid;
    


    for (let i = 0; i < ssid.length; i++) {
        const s = sellerdata.filter((x) => x.sid === ssid[i]);
        sid.push(s);
    }
    //const sid = sellerdata.filter((s) => s.sid === );
    //sid = sellerdata.filter((x) => x.sid === ssid[1]);
    res.json({ "passing product name fetch seller details": sid });

    if (pdata.length == 0) {
        res.json({ data: "not found" });
    } else {
        
        /*sid.forEach(s => {
            res.json({ "passing product name fetch seller details": s.sid});
        });*/
    }
});

//fetch all product of company

app.get('/cname/:cn', (req, res) => {
    const cname = req.params.cn;
    var cn = [];

    const compayd = companydata.filter((c) => c.name === cname);
    const pid = compayd[0].pid;

    for (let i = 0; i < pid.length; i++) {
        const fcid = productaaray.filter((p) => p.pid === pid[i]);
        cn.push(fcid);
    };
    res.json({ data: cn });
});


//fetch all product of seller
app.post("/sname",(req,res) => {
    const sa = req.body.name;
    const sid = [];

    const sdata = sellerdata.filter((s) => s.name === sa);
    const ssid = sdata[0].pid;

    for (let i = 0; i < ssid.length; i++) {
        const s = productaaray.filter((x) => x.pid === ssid[i]);
        sid.push(s);
    }

    res.json({data: sid});
});

//delete company

app.post("/delete_company",(req,res) => {

    const cname = req.body.name;
    const fetch = companydata.filter((x) => x.name === cname);


    for (let i = 0; i < companydata.length; i++) {

        const f = fetch.filter((x) => x.name === companydata[i].name);
        
        if(f.length === 1)
        {
            delete companydata[i];
            res.json({data:companydata})
        }
    }
});

//delete seller

app.post("/delete_seller", (req, res) => {
    const cname = req.body.name;
    const fetch = sellerdata.filter((x) => x.name === cname);

    for (let i = 0; i < sellerdata.length; i++) {

        const f = fetch.filter((x) => x.name === sellerdata[i].name);

        if (f.length === 1) {
            delete sellerdata[i];
            res.json({ data: sellerdata })
        }
    }
});
//delete product
app.post("/delete_product", (req, res) => {
    const cname = req.body.title;
    const fetch = productaaray.filter((x) => x.title === cname);

    for (let i = 0; i < productaaray.length; i++) {

        const f = fetch.filter((x) => x.title === productaaray[i].title);

        if (f.length === 1) {
            delete productaaray[i];
            res.json({ data: productaaray })
        }
    }
});

//update seller

app.post("/update_seller", (req, res) => {
    const sid = req.body.sid;
    const add = req.body.addpid;
    const del = req.body.delpid;

    const fsid = sellerdata.filter((x) => x.sid === sid);

    if(add.length != 0){
        
        for (let i = 0; i < sellerdata.length; i++) {

            const f = fsid.filter((x) => x.sid === sellerdata[i].sid);

            if (f.length === 1) {
                sellerdata[i].pid.push(add);
            }
        }

    }
    if(del.length != 0)
    {
        var index;
        for (let i = 0; i < sellerdata.length; i++) {

            const f = fsid.filter((x) => x.sid === sellerdata[i].sid);

            if (f.length === 1) {
                index = i;

            }
        }
        for (let j = 0; j < fsid[0].pid.length; j++) {

            const z = fsid.filter((x) => x.pid[j] === del);

            if (z.length === 1) {
                delete sellerdata[index].pid[j];
            }
        }
    }
    res.json({data: sellerdata});
});

//update company


app.post("/update_company", (req, res) => {
    const cid = req.body.cid;
    const add = req.body.addpid;
    const del = req.body.delpid;

    const fsid = companydata.filter((x) => x.cid === cid);

    if (add.length != 0) {

        for (let i = 0; i < companydata.length; i++) {

            const f = fsid.filter((x) => x.cid === companydata[i].cid);

            if (f.length === 1) {
                companydata[i].pid.push(add);
            }
        }
    }
    if (del.length != 0) {
        var index;
        for (let i = 0; i < companydata.length; i++) {

            const f = fsid.filter((x) => x.cid === companydata[i].cid);

            if (f.length === 1) {
                index = i;
            }

        }
        for (let j = 0; j < fsid[0].pid.length; j++) {

            const z = fsid.filter((x) => x.pid[j] === del);

            if (z.length === 1) {
                delete companydata[index].pid[j];
            }
        }
    }
    res.json({ data: companydata });
});



//update product

app.post("/update_product", (req, res) => {
    const cid = req.body.pid;
    const add = req.body.addpid;
    const del = req.body.delpid;

    const fsid = productaaray.filter((x) => x.pid === cid);

    if (add.length != 0) {

        for (let i = 0; i < productaaray.length; i++) {

            const f = fsid.filter((x) => x.category === productaaray[i].category);

            if (f.length === 1) {
                productaaray[i].category.push(add);
            }
        }
    }
    if (del.length != 0) {
        var index;
        for (let i = 0; i < productaaray.length; i++) {
            const f = fsid.filter((x) => x.category === productaaray[i].category);

            if (f.length === 1) {
                index = i;
            }
            
        }
        for (let j = 0; j < fsid[0].category.length; j++) {

            const z = fsid.filter((x) => x.category[j] === del);

            if (z.length === 1) {
                //delete productaaray[index].category[j];
            }
        }
    }
    res.json({ data: productaaray });
});



app.use("/product", productrouter);
app.use("/seller", sellerrouter);
app.use("/company", companyrouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
