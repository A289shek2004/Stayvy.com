

# API Reference

This document lists all available API endpoints from the backend.

---

## Authentication

### POST /auth/register
- **Description:** Create a new user
- **Request:**
```json
{ "name": "John Doe", "email": "john@example.com", "password": "123456" }
