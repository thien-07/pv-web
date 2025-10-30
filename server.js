const express = require('express');
const sql = require('mssql');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static(path.join(__dirname)));

const dbConfig = {
    user: 'sa',
    password: 'Thien31102007',
    server: '127.0.0.1',
    database: 'QLTW',
    options: { encrypt: false, trustServerCertificate: true },
    port: 1433
};


const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('DB Connected');
        return pool;
    })
    .catch(err => console.log('DB Connection Failed:', err));


app.post('/register', async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || !password) return res.status(400).send('Username & password required');

    try {
        const pool = await poolPromise;
        const hashedPassword = await bcrypt.hash(password, 10);
        await pool.request()
            .input('username', sql.NVarChar, username)
            .input('password', sql.NVarChar, hashedPassword)
            .input('email', sql.NVarChar, email || null)
            .query('INSERT INTO Users (Username, Password, Email) VALUES (@username, @password, @email)');
        res.status(200).send('User registered');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

/*app.post('/checkout', async (req, res) => {
    const { userId, cart } = req.body;
    if (!userId || !cart || cart.length === 0) return res.status(400).send('Invalid request');

    try {
        const pool = await poolPromise;
        for (let item of cart) {
            await pool.request()
                .input('UserId', sql.Int, userId)
                .input('ProductName', sql.NVarChar, item.title)
                .input('Price', sql.Int, item.price)
                .input('Quantity', sql.Int, item.quantity)
                .query('INSERT INTO Cart (UserId, ProductName, Price, Quantity) VALUES (@UserId, @ProductName, @Price, @Quantity)');
        }
        res.status(200).send('Thanh toán thành công!');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error: ' + err.message);
    }
});*/

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).send('Username & password required');

    try {
        const pool = await poolPromise;
        const result = await pool.request()
            .input('username', sql.NVarChar, username)
            .query('SELECT * FROM Users WHERE Username = @username');

        if (result.recordset.length === 0) return res.status(400).send('User not found');

        const user = result.recordset[0];
        const match = await bcrypt.compare(password, user.Password);
        if (!match) return res.status(400).send('Invalid password');

        res.status(200).send('Login successful');
    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});


app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}/main.html`));
