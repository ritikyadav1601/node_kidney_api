const express = require("express")
const app = express()


app.use(express.json());



let john= [{
    name: "John",
    kidneys: [
        {isHealthy: true},
        {isHealthy: true},
        {isHealthy: false},
        {isHealthy: false},
]
}]

let kidneys = john[0].kidneys
app.get("/", (req,res)=>{

    let totalKidneys = kidneys.length

    let healthyKidney = 0;
    for(let i = 0; i < kidneys.length; i++){
        if(kidneys[i].isHealthy === true){
            healthyKidney = healthyKidney + 1
        }
    }

    let unhealthyKidney = 0;
    for (let i = 0; i <kidneys.length; i++){
        if (kidneys[i].isHealthy ===false){
            unhealthyKidney +=1
        }
    }


    res.send(` 
        Total kidneys = ${totalKidneys} <br>
        Healthy Kidneys = ${healthyKidney} <br>
        Unhealthy Kidneys = ${unhealthyKidney}`)
})

app.post("/",(req,res)=>{
    let isHealthy = req.body.isHealthy
        john[0].kidneys.push({isHealthy})
        res.send("Kidney Added")
})

app.put("/", (req,res)=>{

    let noFalsekidney = false;

    for(let i = 0 ; i< kidneys.length; i++){
        if(kidneys[i].isHealthy == false){
            noFalsekidney = true;
            break;
        }
    }

    if(!noFalsekidney){
        return res.send("No faulty kidney")
    }
   for(let i = 0; i < kidneys.length; i++){
    kidneys[i].isHealthy = true
   }
   res.send("Kidney is healthy now")
})


app.delete("/", (req,res)=>{

        let noFalsekidney = false;

        for(let i = 0 ; i< kidneys.length; i++){
            if(kidneys[i].isHealthy == false){
                noFalsekidney = true;
                break;
            }
        }

        if(!noFalsekidney){
            return res.send("No faulty kidney")
        }


    let newKidneyArr = []
    for(let i = 0; i<kidneys.length; i++){
        

        if(kidneys[i].isHealthy == true){
                newKidneyArr.push(kidneys[i])
        }
    }

    john[0].kidneys = newKidneyArr; // ✅ update the real source of truth
    kidneys = john[0].kidneys;  

    res.send("Delete works")
})



app.listen(3000, ()=>{
    console.log("Server is running")
})