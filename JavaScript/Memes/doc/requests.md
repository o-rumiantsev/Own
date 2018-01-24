## `/`
Request method: `GET`,

Request body: *none*,

Response data: HTML page.



## `/getMemesStats`
Request method: `GET`,

Request body: *none*,

Response data: Array of memes with non-zero rating.



## `/handleRegistration`
Request method: `POST`,

Request body:
```javascript
{
  credentials: {
    login: 'string',
    password: 'string'
  }
}
```

Response data: `sessionId`.



## `/login`
Request method: `POST`,

Request body:
```javascript
{
  credentials: {
    login: 'string',
    password: 'string'
  }
}
```

Response data:
```javascript
{
  sessionId: 'string',
  regStatus: 'string'
}
```



## `/getMemes`
Request method: `POST`,

Request body:
```javascript
{
  sessionId: 'string',
  data: [
    { _id: 'string', clicked: 'boolean' },
    { _id: 'string', clicked: 'boolean' }
  ]
}
```

Response data: Array of two random memes(`url` and `_id`).



## `/updateMemesDb`
Request method: `POST`,

Request body:
```javascript
{
  sessionId: 'string',
}
```

Response data: Status code(`200` or `500`).
