import express from 'express';
import pricingService from './service';

const app = express();
const port = process.env.PORT || 8081;

app.get('/quote/:from-:to-:weight', pricingService);

app.listen(port, () => {
  console.log(`Pricing service listening on ${port}`);
});
