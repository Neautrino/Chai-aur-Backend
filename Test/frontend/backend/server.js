import express from 'express';


const app = express();

// app.get('/', (req, res) => {
//   res.send('Hello World');
// })
        
// get a list of five jokes

app.get('/api/jokes', (req, res) => {
    res.send([
        {
            id: 1,
            title: "A joke",
            content : "This is a joke"
        },
        {
            id: 2,
            title: "Another joke",
            content : "This is another joke"
        },
        {
            id: 3,
            title: "A third joke",
            content : "This is a third joke"
        },
        {
            id: 4,
            title: "Another fourth joke",
            content : "This is another fourth joke"
        },
        {
            id: 5,
            title: "A fifth joke",
            content : "This is a fifth joke"
        }
    ]);
    });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
})