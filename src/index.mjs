import mongoose from 'mongoose';
import './strategies/local-strategy.mjs';
import { createApp } from './createApp.mjs';
// import './strategies/discord-strategy.mjs';
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected to Database'))
  .catch((err) => console.log(err));

const app = createApp();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});
