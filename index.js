const fs=require('fs')
const http=require('http')
const Get  = require('./requestHandlers/Get')
 
const server=http.createServer((req,res)=>{
    if(req.method=='GET') Get(req,res)
  })
server.listen(3000,()=>console.log('server is running'))