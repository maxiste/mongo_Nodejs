
var db=db.getSiblingDB("maraton");
var nombres=["Laura","Juan","Fernando","Maria"];
var apellidos=["Fernandez","Gonzalez","Perez","López"];
var varras = ["A","B","C","P","X","D"];
var participantes=[];

for (i=0; i <100000; i++){
    participantes.push({
        nombre:nombres[Math.floor(Math.random()*nombres.length)], //obtener 
        apellido1:apellidos[Math.floor(Math.random()*apellidos.length)], //obtener 
        apellido2:apellidos[Math.floor(Math.random()*apellidos.length)], //obtener 
        edad:Math.floor(Math.random()*100),
        dni: Math.floor(Math.random()*10000000)+varras[Math.floor(Math.random()*varras.length)]
    })
}
db.participantes.insert(participantes);