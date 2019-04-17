import fetch from 'node-fetch';

export default function (req, res) {
  const getDistance = (from, to) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    return fetch(`http://www.astro-phys.com/api/de406/states?date=${currentDate}&bodies=${from},${to}`, { timeout: 1000 });
  };

  const getPrice = (position1, position2, weight) => {
    const distance = Math.sqrt(position1.reduce(
      (acc, cur, i) => acc + ((position2[i] - cur) ** 2),
      0,
    ));
    return Math.round(distance * weight / 1000);
  };

  const { from, to, weight } = req.params;
  getDistance(from, to)
    .then(response => response.json())
    .then((data) => {
      if (!data.results) throw new Error('No results');
      const price = getPrice(data.results[from][0], data.results[to][0], weight);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ price }));
    })
    .catch((err) => {
      res.status(400);
      res.setHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ error: err.message }));
    });
}
