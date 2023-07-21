const http =require('http')
const fs= require('fs')
const { log } = require('console')

const app= http.createServer((req,res)=>{
    const url= req.url
    const method = req.method

    if (url=== '/') {
        res.write('<html>');
        res.write('<body>');
        fs.readFile('message.txt', (err,data)=>{
            if (err) {
                console.log(err);
            }else{
                res.write(`<p>${data}</p>`)
            }
            res.write('<form action="/m" method="post">');
        res.write('<input type="text" name="message">');
        res.write('<button type="submit">Send</button>');
        res.write('</form>');
        res.write('</body>');
        res.write('</html>');
        return res.end()
        })        
    }
    if (url=== '/m' && method=== 'POST') {
        const body=[]
        req.on('data', (chu)=>{
            body.push(chu)
        })
        return req.on('end', ()=>{
            const parsedB = Buffer.concat(body).toString()
            const message= parsedB.split('=')[1]

            fs.writeFile('message.txt', message, (err)=>{
                if (err) {
                    console.log(err);
                }
                res.statusCode=302
                res.setHeader('Location', '/')
                res.end()
            })
        })
    }
})

app.listen(4000, ()=>{
    console.log('run');
})