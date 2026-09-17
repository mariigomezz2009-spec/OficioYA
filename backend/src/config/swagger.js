const { version } = require("react");
const swaggerAutogen = require("swagger-autogen");

const outputFile = './src/swagger.json'
const endpooints = ['./src/app.js']

const doc ={
    info:{
        version:"1.0.0",
        title:"api de productos",
        description:"documentacion automatica"

    },
    host:"localhost:3000",
    schemes:["http"],
    
}



swaggerAutogen(outputFile, endpooints, doc)