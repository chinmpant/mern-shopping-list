# Shopping List

A shopping list app made using the [MERN stack](https://www.mongodb.com/mern-stack).

## Running

See [`.env.example`](.env.example) for setting up your environment variables.

```bash
# Install deps
$ npm install
$ npm install --prefix frontend
```

### Development

```bash
# Run dev server
$ npm run dev
```

### Production

Set `NODE_ENV` to `production` in your `.env` file to serve frontend build files. This will also remove stack traces from backend error messages.

```bash
# Build frontend
$ npm run build
# Run production server
$ npm start
```

## License

[MIT](LICENSE)
