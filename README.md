## MERN + Stripe Starter

Simple MERN app that creates Stripe Payment Intents, updates orders via webhooks, and includes a minimal React checkout.

### Prerequisites

- Node.js 18+ and npm
- A MongoDB connection string (Atlas or local)
- Stripe account with Publishable and Secret keys

## 1) Clone and install

```bash
git clone https://github.com/aniketxz/mern-stripe
cd mern-stipe

# install server deps
cd server && npm install

# install client deps
cd ../client && npm install
```

## 2) Configure environment variables

Create `server/.env`:

```bash
PORT=5000
MONGO_URI=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx   # fill after creating webhook below
```

Create `client/.env`:

```bash
VITE_API_URL=http://localhost:5000
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
```

Notes:

- The server expects the client origin in `CLIENT_URL` for CORS.
- The client uses `VITE_API_URL` and will call `${VITE_API_URL}/api` (defaults to `http://localhost:5000/api` if unset).

## 3) Run the app (two terminals)

```bash
# Terminal A
cd server
npm run dev

# Terminal B
cd client
npm run dev
```

Vite runs on `http://localhost:5173`. The API runs on `http://localhost:5000/api`.

## 4) Webhook setup with ngrok

The server exposes a Stripe webhook at `POST /api/webhook` and verifies events using `STRIPE_WEBHOOK_SECRET`.

### A) Start ngrok

```bash
ngrok http 5000
```

Copy the generated HTTPS URL, e.g. `https://abcd-1234.ngrok-free.app`.

### B) Create a Stripe webhook endpoint

1. In Stripe Dashboard → Developers → Webhooks → Add an endpoint.
2. Endpoint URL: `https://YOUR_NGROK_HOST/api/webhook`
3. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
4. Create endpoint and then click to reveal the Signing secret (starts with `whsec_...`).

### C) Set the signing secret

Update `server/.env` with the value:

```bash
STRIPE_WEBHOOK_SECRET=whsec_your_secret
```

Restart the server so it picks up the change.

### D) Test a payment

- Use Stripe test mode and the card `4242 4242 4242 4242` for success and `4000 0000 0000 0002` for failure, any future expiry, any CVC.
- On success/failure, Stripe will send events to your ngrok URL → `POST /api/webhook`.
- The server updates the order status to `paid` or `cancelled` based on the event.

## API and routes (quick reference)

- Products: `GET /api/products`
- Orders:
  - `POST /api/orders` → creates order + PaymentIntent, returns `clientSecret` and `orderId`
  - `GET /api/orders/:id` → fetch order
- Webhook: `POST /api/webhook` (raw body; handled internally)

## Troubleshooting

- 403/blocked requests from the client: make sure `CLIENT_URL` matches your client origin.
- Webhook signature errors: confirm your ngrok URL matches the Dashboard endpoint and the `STRIPE_WEBHOOK_SECRET` is correct; restart the server after edits.
- Mongo connection errors: verify `MONGO_URI` and that your IP is allowed in Atlas Network Access.
