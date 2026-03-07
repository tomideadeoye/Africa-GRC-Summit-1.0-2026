# Africa GRC Summit 1.0 — API Documentation

This document describes the internal Configuration API used by the Africa GRC Summit administration dashboard.

---

## 🛠️ Base URL
`/api/admin/config`

---

## 📡 Endpoints

### 1. `GET /api/admin/config`
Retrieves the full summit configuration.

**Response (JSON)**:
```json
{
  "hero": { ... },
  "agenda": [ ... ],
  "speakers": [ ... ],
  "audience": [ ... ],
  "venue": { ... },
  "contact": { ... }
}
```

---

### 2. `PUT /api/admin/config`
Updates a specific section of the configuration and synchronizes it across Supabase and the local fallback file.

**Request Body (JSON)**:
| Field | Type | Description |
| :--- | :--- | :--- |
| `section` | `string` | The top-level key in the config to update (e.g., `hero`, `agenda`). |
| `data` | `any` | The new data for that section. |

**Example Request**:
```json
{
  "section": "venue",
  "data": {
    "name": "Sheraton Lagos Hotel",
    "address": "30 Mobolaji Bank Anthony Way, Ikeja, Lagos, Nigeria",
    "mapEmbedUrl": "https://maps.google.com/maps?q=Sheraton+Lagos+Hotel+Ikeja&t=&z=15&ie=UTF8&iwloc=&output=embed",
    "backgroundImage": "https://..."
  }
}
```

**Response (JSON)**:
```json
{
  "success": true,
  "message": "venue recalibrated and synchronized successfully.",
  "source": "global"
}
```

---

## 🚨 Error Handling
The API returns appropriate HTTP status codes for failures:

- **400 Bad Request**: Missing `section` or `data` in the PUT body.
- **500 Internal Server Error**: Database synchronization or file system failure.

---

## 🔐 Future Enhancements
- **X-Admin-Key**: Implement a header-based key check for write operations.
- **History Tracking**: Maintain a historical log of configuration changes in a separate table.
- **Payload Validation**: Add Zod schemas to validate incoming calibration data.
