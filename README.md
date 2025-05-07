# URL Shortener API

A RESTful API service that shortens long URLs into more manageable short codes. Built with Node.js, Express, TypeScript, and MongoDB.

## Features

- URL shortening with custom short codes
- URL validation
- MongoDB integration for persistent storage
- TypeScript for type safety
- Jest for unit testing
- Docker support

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- Docker (optional)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd url-shortener-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=3000
MONGO_URI=mongodb://admin:password@localhost:27017/url-shortener?authSource=admin
```

## Running the Application

### Development Mode
```bash
npm run dev
```

### Production Mode
```bash
npm run build
npm start
```

### Using Docker
```bash
docker-compose up
```

## API Endpoints

### Shorten a URL
```http
POST /shorten
Content-Type: application/json

{
    "url": "https://example.com"
}
```

Response:
```json
{
    "short": "abc123"
}
```

### Access Shortened URL
```http
GET /:short
```

Redirects to the original URL.

## Testing

Run the test suite:
```bash
npm test
```

Run tests in watch mode:
```bash
npm run test:watch
```

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Route controllers
├── models/         # Database models
├── routes/         # API routes
├── services/       # Business logic
└── app.ts         # Application entry point
```

## Error Handling

The API returns appropriate HTTP status codes:
- 200: Success
- 201: URL successfully shortened
- 400: Invalid URL format
- 404: Short code not found
- 500: Server error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License. 