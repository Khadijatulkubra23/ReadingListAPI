# API Design

## Resource
A book.

```json
{
  "id": 1,
  "title": "Atomic Habits",
  "author": "James Clear",
  "status": "reading",
  "rating": 4
}
```

## Validation rules

| Field | Rule |
|---|---|
| `title` | required, string, not empty, max 100 characters |
| `author` | required, string, not empty, max 100 characters |
| `status` | optional, must be `to-read`, `reading`, or `finished` (defaults to `to-read`) |
| `rating` | optional, whole number from 1 to 5, and only allowed when status is `finished` |

## Endpoints

| Method | Route | What it does | Success | Errors |
|---|---|---|---|---|
| GET | `/books` | List all books (optional `?status=reading`) | 200 | 400 if status is invalid |
| GET | `/books/:id` | Get one book | 200 | 400 if id isn't a number, 404 if not found |
| POST | `/books` | Add a book | 201 | 400 with a list of what's wrong |
| (any) | unknown route | Fallback | | 404 |
| (any) | server crash | Fallback | | 500 |

## Response shapes

Success: the book object itself, or an array of books.

Error:

```json
{
  "error": "Validation failed",
  "details": ["title is required", "rating must be a whole number from 1 to 5"]
}
```

## Storage
Books live in memory (an array) and reset when the server restarts.