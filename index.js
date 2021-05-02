const app = require("express")();
const PORT = 80;

app.listen(PORT, () => {
  console.log(`It's alive on http://localhost:${PORT}`);
});

app.get('/getStatus',(req,res)=>{
    res.status(200).send({
        status: '1',
        statusCode: 'Success'
    })
})