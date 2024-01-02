import app from "./src/index"; // Import your main app from the index file

const port = 9000; // Choose a suitable port

const test_server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default test_server;
