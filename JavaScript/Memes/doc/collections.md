# Memes
```javascript
meme {
  _id: 'string',
  url: 'string',
  rating: 'number',
  usersWatched: 'number'
}
```
# Users
```javascript
user {
  _id: 'string',
  login: 'string',
  password: 'string',
  regStatus: 'string',
  memes: [
    {
      _id: 'string',
      lulz: 'number',
      views: 'number',
      rating: 'number'
    }
  ],
  sessionId: 'string',
  lastRequest: 'number'
}
```
