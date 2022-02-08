## Getting Started

First, install dependencies:

```bash
yarn install
```

Then, build the app & start up the server:

```bash
next build && next start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Referral based discount popup

Use `referrer` as the key for search params, only with the value `twitch` will get the discount coupon code.

For Example, try the links above:

- [http://localhost:3000/?referrer=twitch](http://localhost:3000/?referrer=twitch)
- [http://localhost:3000/products?referrer=other](http://localhost:3000/products?referrer=other)
- [http://localhost:3000/products/2?referrer=twitch&testing=123](http://localhost:3000/products/2?referrer=twitch&testing=123)
