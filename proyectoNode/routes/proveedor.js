const express=require("express");

const appProvedor =express(); //realmente se coloca es "app" para todos

let proveedores=[
    {_id:1,nombre:"Gas Natural", cif:"A12456", domicilio:"Bilbao"},
    {_id:2,nombre:"Iberdrola", cif:"A645321", domicilio:"Madrid"},
    {_id:3,nombre:"Planeta", cif:"A345126", domicilio:"Bilbao"}

]

//get sin consulta con respuesta de todos los datos (no habitual)

appProvedor.get("/",(req,res) => { //base path
    //res.status(200).json({mensaje:"Hola desde el archivo Proveedores en route"})
    res.status(200).json({provedores:proveedores})
})

//get con consulta por _id
appProvedor.get("/consulta", (req,res)=>{
    console.log(req.query);
    res.end();
})


//get con conyslta por _id empleando los parametros de express
appProvedor.get("/:_id/:nombre",(req,res)=>{ //mas de un parametros
    //appProvedor.get("/:_id",(req,res)=>{ un solo aprametro
    console.log(req.params); //me hace un conloge de toda la peticion
    res.end(); //cierra la peticion


}) //lo filtramos por id dentro de la ruta

//otra consulta de otra manera
//nota este get no es el verbo de http es el verb de express de la libreria
appProvedor.get("/:_id",(req,res)=>{ //mas de un parametros
    //appProvedor.get("/:_id",(req,res)=>{ un solo aprametro
    let proveedor = proveedores.find(elem=>{
        return elem._id===Number(req.params._id);
    })
    if(proveedor===undefined){
        res.status(204).json({mensaje:"No se encontro el Proveedor"})
    }else{
        res.status(200).json({proveedor:proveedor})
    }
    //console.log(provedor)
    
    //res.end();
    
    
    res.end(); //cierra la peticion


}) //lo filtramos por id dentro de la ruta




/* prueba con rutas internas par validar el enrutamiento que tiene
appProvedor.get("/internacional",(req,res) => { //base path
    res.status(200).json({mensaje:"Hola desde el archivo Internaciones en route"})
})
*/
/*PETICIONES POST */
appProvedor.post("/",(req,res)=>{
    let proveedor =req.body; //vddnmre aformateado en le cuerpo en esta peticion con la librria se parseado body-parser
    proveedor._id=proveedores.length+1
    proveedores.push(proveedor);
    res.status(200).json({mensaje:"el proveedor se ha creado correctamente"})
})

/*PETICIONES PUT */  //se usa para actulizar
appProvedor.put("/:_id",(req,res)=>{
    //buscadno en harcodeado del objeto
    let posicion = proveedores.findIndex(elem=>{
        return elem._id===Number(req.params._id); //devuelve la posion el primero que encuentre

    })
    if(posicion < 0){
        return res.status(200).json({mensaje:"El proveedor no existe"}); //es como hacer break
    }
    console.log(req.body);
    if(req.body.nombre!==undefined){
        proveedores[posicion].nombre=req.body.nombre;
    }

    if(req.body.cif!==undefined){
        proveedores[posicion].cif=req.body.cif;
    }

    if(req.body.domicilio!==undefined){
        proveedores[posicion].domicilio=req.body.domicilio;
    }
  

    res.status(200).json({mensaje:`El proveedor ${proveedores[posicion].nombre} se ha actualizaco correctamente!!!`}); //es como hacer break
})

appProvedor.delete("/",(req,res)=>{
    let posicion=proveedores.findIndex(elem=>{
        return elem._id===Number(req.params._id);
    })
    if(posicion<0){
        res.sattus(200).json({mensaje:"el roveedor nmo existe"})
    }
    let nombre = proveedores[posicion].nombre;
    proveedores.splice(posicion,1);
    res.status(200).json({
            msg:`El proveedor ${nombre} se ha eliminado correctamente`,
            proveedores:proveedores
    });
})
module.exports=appProvedor; //para llevarlo a la principal que es app.js