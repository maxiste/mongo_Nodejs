const express=require("express");

const appPedido =express(); //se usa app igual para todos y cada representa la varia del lgugar donde 


appPedido.get("/",(req,res) => { //base path
    res.status(200).json({mensaje:"Hola desde el archivo Pedidos en route"})
})


appPedido.get("/internacionales",(req,res) => { //base path
    res.status(200).json({mensaje:"Hola desde el archivo Internaciones de Pedidos en route"})
})

module.exports=appPedido;