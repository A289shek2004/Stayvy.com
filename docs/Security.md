# Security Guidelines

- Do NOT commit `.env` files
- Use `.env.example` for shared configuration
- Rotate secrets regularly
- Use HTTPS in production
- JWT access tokens should be short-lived, with refresh tokens
- Passwords stored using hashing (bcrypt/argon2)
