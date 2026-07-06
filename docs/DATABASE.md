# Database Design

The application contains three collections.

---

## Profile

Represents a user profile.

Fields

- name
- timezone
- createdAt
- updatedAt

---

## Event

Represents an event.

Fields

- title
- description
- profiles[]
- startUTC
- endUTC
- createdAt
- updatedAt

---

## EventLog

Stores immutable audit history.

Fields

- eventId
- changes[]
- createdAt

---

## Relationships

Profile

⬇ Many-to-Many

Event

⬇ One-to-Many

EventLog
