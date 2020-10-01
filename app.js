const express=require('express');
//const { json } = require('express');
//const { process_params } = require('express/lib/router');

const app= express();
const bodyParser=require('body-parser');//implementacion de la libreria 
app.use(bodyParser.urlencoded({extended:true})); //directamente parte de parametro de libreria implementar para que todas las esntradas las convierta los json en un objeto javaSCript

let proveedores=[
    {_id:1, nombre:"Gas",cif:"A00011",domicilio:"Calle Sanblas"},
    {_id:2, nombre:"Iberdrola",cif:"A0001",domicilio:"Calle Sanblas2"},
    {_id:3, nombre:"GvC",cif:"A15141",domicilio:"Calle Palacio Real"}

]
/*
//1 epidosido
app.get('/',(req,res)=>{
    //res.status(200).json({nombre:"Maxiste",apellido:"Ledezma"});
    res.status(200).json(proveedores);
})
*/

//manejo de parametros y en la peticion debe recibir un signo de interorgacion
//http://localhost:3000/? y alli le pasas el valro que debe pedir

/*
    app.get('/:_id',(req,res)=>{
        console.log(req.params._id);
        //res.status(200).json({nombre:"Maxiste",apellido:"Ledezma"});
    // res.status(200).json(proveedores);
    });
*/
/*
2dedo episodio
//buscar en el json
//si queremeno enviar mas de una paremetro en la url
//app.get('/:p_id/:cif',(req,res)=>{
    //y en la url deberia colocar http://localhost:3000/2/555 donde los 2 ultimos son parametros de entrada
app.get('/:p_id',(req,res)=>{
    let proveedor =proveedores.find((prov)=>{
        return prov._id==req.params.p_id;
    })
    if (proveedor===undefined){
        // return res.status(200).json({mensaje:"no se encuentra el proveedor"}); //se esta frozando con respuesta 200 por que en 204 no se corta el mensaje segun docuemnttacion alli no necesitaria  reruren
        res.status(200).json({mensaje:"no se encuentra el proveedor usando la respuesta ok 200"}); //se esta frozando con respuesta 200 por que en 204 no se corta el mensaje
    }
     res.status(200).json(proveedor);
})
*/
//get con consultas Query string  en la url 
//3er Epsisodio
app.get('/',(req,res)=>{
    //con esto pdemo tener n paramtros de busqueda de consulta
    let nombre=req.query.nombre;
    let cif=req.query.cif;
    //no funciona si no le pasas el parametro
    //    console.log("mi Salida por Consola del Query solicitado "+cif+ "\n" +nombre); //puedes teenr varios pripiedads y en l url lo concatenas con & ejemplo en la url http://localhost:3005/?nombre=Gas
    console.log("mi Salida por Consola del Query solicitado "+nombre); //puedes teenr varios pripiedads y en l url lo concatenas con & ejemplo en la url http://localhost:3005/?nombre=Gas
    res.status(200).json({mensaje:"Mensaje al Servidor de Peticiones Test de prueba queries-String, Saca por Consola el Resultado del Query "});
})
//Utilizacion Metodo Post y agrgano un registro
app.post('/',(req,res)=>{
    let proveedor=req.body;
    //sgregamos un rpveedor al arrglo
    proveedor._id=proveedores.length+1;//incrementamos el id
    proveedores.push(proveedor);//agregamos un proveedor que colocmoe el post
    //console.log(proveedor);
    res.status(200).json({mensaje:"El proveedor se ha creado correctamente",
proveedores:proveedores}); //vemos todos los prveedores del arreglo
//emac6 si le quitas al final objeto proveedores se llama igual uedes simplifcar solocolocando proveedores una sola vez y ya
//proveedores
})

//put para actualilzar registros
app.put('/:_id',(req,res)=>{
    let posicion =proveedores.findIndex(proveedor=>{
        return proveedor._id==req.params._id;
    })//buscar la posicion deun elemento

    if(posicion < 0){
        return res.status(200).json({mensaje:"El proveedor no existe valida"});

    }
    //condicionado
    if(req.body.nombre!==undefined){
        proveedores[posicion].nombre=req.body.nombre;    
    }
   
    if(req.body.cif!==undefined){
        proveedores[posicion].cif=req.body.cif;
    }

    if(req.body.domicilio!==undefined){
        proveedores[posicion].domicilio=req.body.domicilio;
    }
    
    res.status(200).json({mensaje:"El proveedor se ha creado correctamente",
    proveedores}); 
    //si quiero devolver la posicion modificada
    //
    /* 
    res.status(200).json({mensaje:"El proveedor se ha creado correctamente",
    proveedor: proveedores[posicion]}); 
    
    */

}) //se esta cambiando a cañon todas las propiedaddes del 


//delete, recibe parametro o consulta de un registro 
//y necesita un identifiador unico en nuestr caso _id
app.delete('/:_id',(req,res)=>{
    //
    let posicion =proveedores.findIndex(proveedor=>{
        return proveedor._id==req.params._id;
    })//buscar la posicion de un elemento

    proveedores.splice(posicion,1);//te toma el valor y te corre las posiciones y te lo borra saco
    res.status(200).json({mensaje:"El proveedor se ha borrado corrctamente...!",
    proveedores}); 
})

app.listen(3005,()=>{
    console.log("el servidor esta escuchando en htpp:\\localhost:3005");
})