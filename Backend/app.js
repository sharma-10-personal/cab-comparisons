const express = require('express');
const cors = require('cors');
const prices = require('./Routes/Prices');

const app = express();
app.use(cors());
app.use('/v1/', prices)

// Start the Express server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
