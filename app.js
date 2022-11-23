import express, { static } from 'express';
const app=express();
import ejs from 'ejs';
import { get } from "axios";
let baseurl="https://gorest.co.in/public/v2/users";
import { urlencoded } from 'body-parser';
app.set('view engine','ejs');
app.use(urlencoded({extended:true}));
app.use(static('public'));
let array=[],active=[],inactive=[];

    get(baseurl)
    .then(res=>{
    // temp.push(res.data);
    res.data.forEach(element => {
    array.push(element);
        // console.log(element);
        if(element.status=='active'){
            active.push(element);
        }else if(element.status=='inactive'){
            inactive.push(element);
        }
    });
    // res.send(array)
  
    })
    
    

app.get("/",(req,res)=>{
res.render("assign3",{res:array})
})
app.post("/filter",(req,res)=>{
    let filter=req.body.status;
    console.log(filter);
if(filter=='active'){
    res.render("assign3",{res:active})
}else if(filter=='inactive'){
    res.render("assign3",{res:inactive});
}else{
    res.render("assign3",{res:array});
}
})

app.listen(process.env.PORT||80,(req,res)=>{
console.log("start the server");
})