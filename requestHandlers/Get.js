const fs=require('fs');
const path=require('path');
const url = require('url');
const root=path.resolve(__dirname, '../')
  const Get=async (req,res)=>{
    const parsedUrl = url.parse(req.url, true);
    console.log(parsedUrl.pathname)
    if(parsedUrl.pathname==='/'){
            fs.readFile(path.join(__dirname,'../public/index.html'),(err,data)=>{
                if(err) throw err;
                res.writeHead(200,{'Content-Type':'text/html'})
                res.end(data)
            })
          }
    else if(parsedUrl.pathname==='/default'){
        fs.readdir(root, (err, files) => { 
          let _files=[]
          if (err) 
            console.log(err); 
          else { 
            files.forEach(file => { 
              _files.push(file)
            }) 
          }
          res.end(JSON.stringify(_files)) 
        })
       } 
      else if(parsedUrl.pathname==='/favicon.ico'){
          res.end("")
      }
      else if(parsedUrl.pathname==='/main.js'){
        fs.readFile(`${root}/public/main.js`,(err,data)=>{
          if(err) throw err;
          res.writeHead(200,{'Content-Type':'text/javascript'})
          res.end(data)
      })
      }
      else if(parsedUrl.pathname==='/style.css'){
        fs.readFile(`${root}/public/style.css`,(err,data)=>{
          if(err) throw err;
          res.writeHead(200,{'Content-Type':'text/css'})
          res.end(data)
      })
      }
      else{
        if(parsedUrl.pathname.includes('.')){
          fs.readFile(`${root}${parsedUrl.pathname}`,'utf-8',(err,data)=>{
            if(err) throw err;
            res.writeHead(200,{'Content-Type':'text/plain'})
            res.end(JSON.stringify(data))
        })
        }
        else{
          fs.readdir(`${root}${parsedUrl.pathname}`, (err, files) => { 
            let _files=[]
            if (err) 
              console.log(err); 
            else { 
              files.forEach(file => { 
                _files.push(file)
              }) 
            }
            console.log(_files)
            res.end(JSON.stringify(_files)) 
          })
        }
      }      
    }
 module.exports=Get;