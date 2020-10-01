const express=require("express");

const app =express();
const bodyParser=require("body-parser"); //implemnetamos la libreria para parsear

const appProveddor=require ("./routes/proveedor") //nombre proveddor pertenede al nombre de js
const appPedido=require ("./routes/pedido") //nombre proveddor pertenede al nombre de js

let message="HOla Maxiste es Hola Mungd"

app.get("/",(req,res)=>{
res.status(200).json({
    //mensaje:"Hola Mundo  Mensaje res"
    //message,
    mensaje:message
})
})


//luego de parsear
app.use(bodyParser.urlencoded({extended:true}))

app.use("/proveedor",appProveddor); //con esto enrutamos al js que esta en la route
app.use("/pedido",appPedido); //con esto enrutamos al js que esta en la route para pedidos

const port=3000
app.listen(port,()=>{
    console.log(`Servidor escuhcahndo en el puetto https://locoalhost:${port}`)
})