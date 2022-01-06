# Dependencies

- express
- mongoose
- dotenv
- jsonwebtoken
- argon2
- cors
- mongoose-slug-generator

# Dev dependencies

- nodemon

# Unit test

## Auth

> Account test

```javascript
{
  username: 'test@001',
  password: '123'
}
```

### Register

- Chưa nhập username hoặc password
- Username đã tồn tại
- Register thành công => Hash password

### Login

- Chưa nhập username hoặc password
