require('./app');
const { server } = require('./configs/socket');
const connectDB = require('./configs/connectDB');

(async () => {
  const PORT = process.env.PORT || 3000;
  await connectDB();

  server.listen(PORT, () => {
    console.log(`app is listening on ${PORT}`);
  });
})();
