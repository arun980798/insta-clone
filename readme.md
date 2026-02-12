# 📸 Instagram Clone - Backend API

A full-featured Instagram clone backend built with Node.js, Express, and MongoDB. This project implements core Instagram functionalities including user authentication, post creation with image uploads, and social features.

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)

## 🚀 Features

### Authentication
- ✅ User Registration with secure password hashing (Bcryptjs)
- ✅ User Login with JWT token generation
- 🔄 Logout with token blacklisting (Coming Soon)
- 🔄 OTP verification system (Coming Soon)

### Posts
- ✅ Create posts with image uploads
- 🔄 View personalized feed
- 🔄 Like/Unlike posts
- 🔄 Save/Unsave posts

### User Profile
- 🔄 Follow/Unfollow users
- 🔄 View followers and following lists
- 🔄 Edit profile information

## 🛠️ Tech Stack

- **Backend Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** Bcryptjs
- **File Upload:** Multer
- **Cloud Storage:** ImageKit
- **Environment Variables:** dotenv

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (local or Atlas cloud)
- [ImageKit Account](https://imagekit.io/) (for image storage)

## ⚙️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/arun980798/insta-clone.git
   cd insta-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create `.env` file in the root directory**
   ```env
   # Server Configuration
   PORT=3000
   
   # MongoDB Connection
   MONGO_URI=mongodb://localhost:27017/insta-clone
   # OR use MongoDB Atlas
   # MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/insta-clone
   
   # JWT Secret
   JWT_SECRET=your_super_secret_jwt_key_here_minimum_32_characters
   
   # ImageKit Configuration
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
   ```

4. **Start the server**
   ```bash
   # Development mode with nodemon
   npm run dev
   
   # Production mode
   npm start
   ```

5. **Server should be running on**
   ```
   http://localhost:3000
   ```

## 📁 Project Structure

```
insta-clone/
├── src/
│   ├── controllers/        # Route controllers
│   │   ├── auth.controllers.js
│   │   └── post.controllers.js
│   ├── models/            # Database models
│   │   ├── user.model.js
│   │   └── post.model.js
│   └── routes/            # API routes
│       ├── auth.routes.js
│       └── post.routes.js
├── .env                   # Environment variables
├── .gitignore            # Git ignore file
├── server.js             # Entry point
└── package.json          # Project dependencies
```

## 🔌 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register a new user
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securePassword123",
  "bio": "Hello, I'm John!",
  "profileImage": "https://example.com/image.jpg" (optional)
}
```

**Response:**
```json
{
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Hello, I'm John!",
    "profileImage": "https://ik.imagekit.io/..."
  }
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "johndoe",  // or use email
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "message": "User logged in successfully",
  "user": {
    "username": "johndoe",
    "email": "john@example.com",
    "bio": "Hello, I'm John!",
    "profileImage": "https://ik.imagekit.io/..."
  }
}
```

### Post Routes (`/api/post`)

#### Create a new post
```http
POST /api/post/create
Content-Type: multipart/form-data

Form Data:
- image: [file]
- caption: "Check out this amazing view!"
```

**Response:**
```json
{
  "fileId": "unique_file_id",
  "name": "uploaded_image.jpg",
  "url": "https://ik.imagekit.io/your_id/path/to/image.jpg",
  "thumbnailUrl": "https://ik.imagekit.io/your_id/tr:n-media_library_thumbnail/path/to/image.jpg",
  "height": 1080,
  "width": 1920,
  "size": 245678,
  "filePath": "/path/to/image.jpg"
}
```

## 🔐 Authentication Flow

1. **Register:** User creates an account with username, email, and password
2. **Password Hashing:** Password is hashed using Bcryptjs before storing in database
3. **Login:** User provides credentials (username/email + password)
4. **Token Generation:** JWT token is generated and sent as a cookie
5. **Protected Routes:** Token is verified for accessing protected endpoints

## 📤 File Upload Flow

1. **Client sends multipart/form-data** with image file
2. **Multer middleware** processes the file upload
3. **File buffer** is extracted from the request
4. **ImageKit API** uploads the file to cloud storage
5. **URL is returned** and can be saved to the database

## 🗄️ Database Models

### User Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  bio: String,
  profileImage: String (default provided),
  createdAt: Date,
  updatedAt: Date
}
```

### Post Model
```javascript
{
  // Coming soon - will include:
  // - imageUrl
  // - caption
  // - user (reference to User)
  // - likes
  // - comments
  // - createdAt, updatedAt
}
```

## 🧪 Testing with Postman

### Register User
```
Method: POST
URL: http://localhost:3000/api/auth/register
Body: raw (JSON)
{
  "username": "testuser",
  "email": "test@example.com",
  "password": "testpassword123",
  "bio": "Test bio"
}
```

### Login User
```
Method: POST
URL: http://localhost:3000/api/auth/login
Body: raw (JSON)
{
  "username": "testuser",
  "password": "testpassword123"
}
```

### Upload Post Image
```
Method: POST
URL: http://localhost:3000/api/post/create
Body: form-data
Key: image (File)
Value: [Select your image file]
```

## 🔒 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `3000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/insta-clone` |
| `JWT_SECRET` | Secret key for JWT signing | `your_secret_key_min_32_chars` |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public API key | `public_xxx...` |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private API key | `private_xxx...` |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | `https://ik.imagekit.io/your_id` |

## 🐛 Common Issues & Solutions

### Issue: "IMAGEKIT_PRIVATE_KEY environment variable is missing"
**Solution:** Ensure your `.env` file exists in the root directory and `require('dotenv').config()` is at the top of `server.js`

### Issue: "Cannot GET /api/auth/login"
**Solution:** You're using GET instead of POST. Change the request method to POST in Postman

### Issue: "ValidationError: username is required"
**Solution:** Check your JSON payload - ensure field names match exactly (no typos like "uusername")

### Issue: MongoDB connection failed
**Solution:** Ensure MongoDB is running locally or check your MongoDB Atlas connection string

## 🚧 Roadmap

- [ ] Implement logout with token blacklisting
- [ ] Add OTP verification for email
- [ ] Complete post model and save functionality
- [ ] Implement like/unlike post feature
- [ ] Add feed algorithm
- [ ] Implement follow/unfollow system
- [ ] Add comments on posts
- [ ] Profile page with user's posts
- [ ] Search functionality
- [ ] Real-time notifications (Socket.io)

## 📚 Learning Resources

This project helped me learn:
- RESTful API design patterns
- JWT authentication and authorization
- File upload handling with Multer
- Cloud storage integration (ImageKit)
- MongoDB relationships and references
- Environment variable management
- Error handling and validation
- Bcryptjs for password security

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/arun980798/insta-clone/issues).

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Arun**
- GitHub: [@arun980798](https://github.com/arun980798)
- LinkedIn: [Connect with me](https://www.linkedin.com/in/yourprofile)

## ⭐ Show your support

Give a ⭐️ if this project helped you learn something new!

---

**Note:** This is a learning project and not intended for production use. Feel free to use it as a reference for your own projects!























==> auth 
    =rigster  kam = user ka data save karna uske  device me cookie dalna or data dalna   (done)
    =login (done)
    =logout(token blacklisting)
    =otp system 


==>post 
    =create
    =can see feed 
    =like post 
    =save post 

==>user 
    =fillowing 
    =followers










