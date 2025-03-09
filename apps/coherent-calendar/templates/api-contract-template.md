# API Contract Template

This template provides a standardized format for defining API contracts between services in the Coherent Calendar application. Use this template when creating new API endpoints or modifying existing ones to ensure consistency and clarity.

## Overview

```
Service Name: [Service Name]
Endpoint: [HTTP Method] [Path]
Description: [Brief description of what this endpoint does]
Authentication: [Required/Optional/None]
Rate Limiting: [Limits if applicable]
```

## Request

### Headers

```
Content-Type: application/json
Authorization: Bearer [token] (if authentication required)
[Any other required headers]
```

### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| [param1]  | [type] | [Yes/No] | [Description] |
| [param2]  | [type] | [Yes/No] | [Description] |

### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| [param1]  | [type] | [Yes/No] | [default] | [Description] |
| [param2]  | [type] | [Yes/No] | [default] | [Description] |

### Request Body

```json
{
  "property1": "value1",
  "property2": "value2",
  "nestedObject": {
    "nestedProperty": "value"
  },
  "arrayProperty": [
    "item1",
    "item2"
  ]
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| property1 | string | Yes | [Description] |
| property2 | string | No | [Description] |
| nestedObject | object | No | [Description] |
| nestedObject.nestedProperty | string | Yes | [Description] |
| arrayProperty | array | No | [Description] |

## Response

### Success Response (200 OK)

```json
{
  "status": "success",
  "data": {
    "property1": "value1",
    "property2": "value2"
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| status | string | Always "success" for successful responses |
| data | object | The response data |
| data.property1 | string | [Description] |
| data.property2 | string | [Description] |

### Error Responses

#### 400 Bad Request

```json
{
  "status": "error",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request was invalid",
    "details": {
      "property1": "Error details for property1"
    }
  }
}
```

#### 401 Unauthorized

```json
{
  "status": "error",
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Authentication is required"
  }
}
```

#### 403 Forbidden

```json
{
  "status": "error",
  "error": {
    "code": "FORBIDDEN",
    "message": "You do not have permission to access this resource"
  }
}
```

#### 404 Not Found

```json
{
  "status": "error",
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested resource was not found"
  }
}
```

#### 500 Internal Server Error

```json
{
  "status": "error",
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  }
}
```

## Examples

### Example Request

```bash
curl -X POST https://api.example.com/endpoint \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "property1": "value1",
    "property2": "value2"
  }'
```

### Example Success Response

```json
{
  "status": "success",
  "data": {
    "property1": "value1",
    "property2": "value2",
    "id": "123e4567-e89b-12d3-a456-426614174000"
  }
}
```

### Example Error Response

```json
{
  "status": "error",
  "error": {
    "code": "INVALID_REQUEST",
    "message": "The request was invalid",
    "details": {
      "property1": "Property1 is required"
    }
  }
}
```

## Notes

- [Any additional notes about the endpoint]
- [Special considerations]
- [Edge cases]
- [Rate limiting details]

## Changelog

| Date | Version | Description |
|------|---------|-------------|
| [Date] | [Version] | [Description of changes] |

---

## Example: Scraping Service - Trigger Scrape Endpoint

### Overview

```
Service Name: Scraping Service
Endpoint: POST /api/sources/{sourceId}/scrape
Description: Triggers a scraping job for the specified source
Authentication: Required
Rate Limiting: 10 requests per minute
```

### Request

#### Headers

```
Content-Type: application/json
Authorization: Bearer [token]
```

#### Path Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| sourceId  | UUID | Yes | The ID of the source to scrape |

#### Query Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| force  | boolean | No | false | Force scraping even if not scheduled |

#### Request Body

```json
{
  "options": {
    "maxPages": 5,
    "includeDetails": true
  }
}
```

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| options | object | No | Scraping options |
| options.maxPages | number | No | Maximum number of pages to scrape |
| options.includeDetails | boolean | No | Whether to fetch detailed event pages |

### Response

#### Success Response (200 OK)

```json
{
  "status": "success",
  "data": {
    "jobId": "123e4567-e89b-12d3-a456-426614174000",
    "sourceId": "123e4567-e89b-12d3-a456-426614174001",
    "status": "queued",
    "estimatedCompletionTime": "2025-03-08T15:30:00Z"
  }
}
```

| Property | Type | Description |
|----------|------|-------------|
| status | string | Always "success" for successful responses |
| data | object | The response data |
| data.jobId | UUID | The ID of the created scraping job |
| data.sourceId | UUID | The ID of the source being scraped |
| data.status | string | The status of the job (queued, running, completed, failed) |
| data.estimatedCompletionTime | ISO date | Estimated time when the job will complete |

### Error Responses

[Standard error responses as defined above]

### Examples

#### Example Request

```bash
curl -X POST https://api.coherent-calendar.com/api/sources/123e4567-e89b-12d3-a456-426614174001/scrape \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{
    "options": {
      "maxPages": 5,
      "includeDetails": true
    }
  }'
```

#### Example Success Response

```json
{
  "status": "success",
  "data": {
    "jobId": "123e4567-e89b-12d3-a456-426614174000",
    "sourceId": "123e4567-e89b-12d3-a456-426614174001",
    "status": "queued",
    "estimatedCompletionTime": "2025-03-08T15:30:00Z"
  }
}
```

### Notes

- Scraping jobs are asynchronous and may take some time to complete
- The job status can be checked using the GET /api/jobs/{jobId} endpoint
- If force=false and the source was recently scraped, the endpoint may return a 409 Conflict

### Changelog

| Date | Version | Description |
|------|---------|-------------|
| 2025-03-08 | 1.0.0 | Initial version | 