import express from 'express';
import { join } from 'path';

const app = express();
const port = process.env.PORT || 5000;

// Define your catch-all route
app.get('/*', function (req, res) {
  // Perform any logic you want here
  // For example, you could route requests to a specific function or serve a React app
  // You can use path.join to construct the absolute path to your React build directory
  const indexPath = join(__dirname, '../client/dist', 'index.html');
  res.sendFile(indexPath);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
