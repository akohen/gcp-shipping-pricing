import express from 'express';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 8081;

app.get('/quote/:from-:to-:weight', (req, res) => {
  const { from, to, weight } = req.params;
  const currentDate = new Date().toISOString().slice(0, 10);
  fetch(`http://www.astro-phys.com/api/de406/states?date=${currentDate}&bodies=${from},${to}`, { timeout: 1000 })
    .then(response => response.json())
    .then((data) => {
      if (!data.results) throw new Error('No results');
      const fromPosition = data.results[from][0];
      const toPosition = data.results[to][0];
      const distance = Math.sqrt(toPosition.reduce(
        (acc, cur, i) => acc + ((fromPosition[i] - cur) ** 2),
        0,
      ));
      const price = Math.round(distance * weight / 1000);

      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ price }));
    })
    .catch((err) => {
      res.status(400);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ error: err.message }));
    });
});

app.listen(port, () => {
  console.log(`Pricing service listening on ${port}`);
});
