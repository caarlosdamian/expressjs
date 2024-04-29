import express from 'express';

const users = [
  { id: 1, username: 'anson', displayName: 'Anson' },
  { id: 2, username: 'carlos', displayName: 'Carlos' },
  { id: 3, username: 'mariana', displayName: 'Mariana' },
  { id: 4, username: 'emma', displayName: 'Emma' },
  { id: 5, username: 'jackson', displayName: 'Jackson' },
  { id: 6, username: 'sophia', displayName: 'Sophia' },
  { id: 7, username: 'liam', displayName: 'Liam' },
  { id: 8, username: 'olivia', displayName: 'Olivia' },
  { id: 9, username: 'william', displayName: 'William' },
  { id: 10, username: 'ava', displayName: 'Ava' },
  { id: 11, username: 'alexander', displayName: 'Alexander' },
  { id: 12, username: 'isabella', displayName: 'Isabella' },
  { id: 13, username: 'michael', displayName: 'Michael' },
  { id: 14, username: 'sophie', displayName: 'Sophie' },
  { id: 15, username: 'benjamin', displayName: 'Benjamin' },
  { id: 16, username: 'emily', displayName: 'Emily' },
  { id: 17, username: 'lucas', displayName: 'Lucas' },
  { id: 18, username: 'mia', displayName: 'Mia' },
  { id: 19, username: 'jayden', displayName: 'Jayden' },
  { id: 20, username: 'charlotte', displayName: 'Charlotte' },
];

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (request, response) => {
  response.status(200).send({ mssg: 'Hello' });
});

app.get('/api/users', (req, res) => {
  console.log(req.query);
  const {
    query: { filter, value },
  } = req;

  if (filter && value)
    return res.send(users.filter((user) => user[filter].includes(value)));
  return res.send(users);
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) return res.status(400).send({ msg: 'Bad Request' });

  const user = users.find((user) => user.id === parsedId);
  if (!user) return res.sendStatus(404);

  return res.status(200).send(user);
});

app.get('/api/products', (req, res) => {
  res.send([{ id: 1, name: 'keyboard', price: 12.999 }]);
});

app.listen(PORT, () => {
  console.log(`Running on Port: ${PORT}`);
});

// localhost:3000
// localhost:3000/users
// localhost:3000/products
// localhost:3000/products?key=value&key2=value2
