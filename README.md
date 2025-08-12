Thank you for providing the directory structure. Here’s a detailed explanation of the main files and folders in your project at `Rema_IP/Server`:

---

### Top-Level Files and Folders

- **node_modules/**  
  Contains all the installed dependencies for your Node.js project. Each subfolder is a package/library used by your application.

- **package.json**  
  The manifest file for your Node.js project. It defines metadata, scripts, dependencies, and other configurations.

- **package-lock.json**  
  Automatically generated to lock the versions of dependencies installed, ensuring consistent installs across environments.

- **vercel.json**  
  Configuration file for deploying your project on Vercel, specifying build and routing settings.

- **src/**  
  The main source code directory for your application.

---

### Inside `src/`

- **app.js**  
  Likely the main Express app setup file, where middleware and routes are registered.

- **index.js**  
  Typically the entry point for starting the server (e.g., listening on a port).

- **logger.js**  
  Handles logging functionality, possibly using a library like Winston.

#### Subfolders:

- **controllers/**  
  - `all.controller.js`: Contains controller logic for handling requests and responses for various endpoints.

- **db/**  
  - `index.js`: Handles database connection logic (e.g., connecting to MongoDB or another database).

- **middlewares/**  
  - `req.js`: Contains custom middleware functions for request processing (e.g., authentication, validation).

- **models/**  
  Contains Mongoose (or similar ORM) schema definitions for different entities:
  - `equipmentSchema.js`
  - `expenseSchema.js`
  - `financeBudgetSchema.js`
  - `leaveSchema.js`
  - `minutesOfMeetingSchema.js`
  - `notificationSchema.js`
  - `projectSchema.js`
  - `sponsorProjectSchema.js`
  - `supervisorSchema.js`
  - `userSchema.js`
  - `venueListSchema.js`

  Each file defines the structure and rules for a specific collection/table in your database.

- **routes/**  
  Contains route definitions for different resources, mapping HTTP endpoints to controller functions:
  - `equipment.routes.js`
  - `expense.routes.js`
  - `financeBudget.routes.js`
  - `leave.routes.js`
  - `minutesOfMeeting.routes.js`
  - `notification.routes.js`
  - `project.routes.js`
  - `sponsorProject.routes.js`
  - `supervisor.routes.js`
  - `user.routes.js`
  - `venueList.routes.js`

---

### Summary

- **node_modules/**: All third-party libraries and dependencies.
- **package.json / package-lock.json**: Project configuration and dependency management.
- **vercel.json**: Deployment configuration for Vercel.
- **src/**: Main application code, organized into:
  - **Controllers**: Business logic for handling requests.
  - **DB**: Database connection setup.
  - **Middlewares**: Custom middleware functions.
  - **Models**: Database schema definitions.
  - **Routes**: API endpoint definitions.
  - **Logger**: Logging utilities.
  - **app.js / index.js**: Application and server entry points.

If you need a more detailed explanation of any specific file or folder, or want to know about the contents of a particular file, let me know!
### 2. Install Dependencies
npm install

### 3. Configure Environment Variables
- Create a .env file in the root directory.
- Add your database URI and other required environment variables:
  ```plaintext
  PORT=3000
  ADMIN_PASSWORD=your_admin_password
  MONGODB_URI=mongodb://127.0.0.1:27017
  DB_NAME=REMA_DATABASE
  JWT_SECRET=your_jwt_secret
  CORS_ORIGIN=http://localhost:5173
  YOUR_EMAIL=your_email@gmail.com
  YOUR_EMAIL_PASS=your_email_app_password
  EMAIL_PORT=465
  EMAIL_URL=http://localhost:5173
  ```

### 4. Set Up Admin User
Before using the system, you must create an admin user. The admin user is required to add other users to the system. The admin user has the following role:
- Role: 'admin'
- Can add/manage other users (faculty, btech, mtech, phd, intern, projectstaff)
- Has access to all system features

To create the admin user directly in MongoDB, use these commands:
```bash
# Start mongo shell
mongosh

# Connect to the database
use REMA_DATABASE

# Insert admin user (replace values in < >)
db.users.insertOne({
  email: "<admin_email>",
  password: "<hashed_password> or simple password (but need to reset after this otherwise you want be able to login)",  # Use bcrypt to hash the password
  role: "admin",
  name: "Admin User",
  createdAt: new Date(),
  updatedAt: new Date()
})

# Verify admin user was created
db.users.findOne({role: "admin"})
```

### 5. Access Local Database
To view and manage your data in REMA_DATABASE:

1. Install MongoDB Compass (GUI Tool):
   - Download from: https://www.mongodb.com/try/download/compass
   - Connect using: `mongodb://127.0.0.1:27017`
   - Select database: `REMA_DATABASE`

2. Or use MongoDB Shell (Command Line):
   ```bash
   # Start mongo shell
   mongosh
   # Connect to database
   use REMA_DATABASE
   # View collections
   show collections
   # Query users collection
   db.users.find()
   ```

### 6. Start the Server
```bash
npm run dev
```

The server will start on the port specified in your .env file or default to 3000.# project-back
# project-back
