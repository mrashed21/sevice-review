# Service Review System

## 🚀 Project Overview

Service Review System is a full-stack web application that allows users to review and interact with services listed by others. The platform supports user authentication, dynamic CRUD operations, and secure database management.

## 🌐 Live Demo

[Live Website URL](https://services-review.netlify.app/)

---

## 🔗 Repositories

### Client-Side
[Frontend Repository](https://github.com/mrashed21/service-review-client)

### Server-Side
[Backend Repository](https://github.com/mrashed21/service-review-server)

---

## 🎯 Key Features

### 🛠 User Capabilities

- **Add/Update/Delete Services:** Users can manage their services with full CRUD operations.
- **View Service Details:** Explore service details and user reviews.
- **Manage Reviews:** Logged-in users can post, update, or delete reviews.
- **My Reviews Page:** Easily manage all user reviews with edit and delete options.

### 🔑 Authentication System

- **Login/Registration:** Email-password authentication with Google login integration.
- **Validation:** Strong password validation for registration.
- **Security:** Firebase keys and MongoDB credentials are secured with environment variables.

### 📊 Extra Features

- **Dynamic Titles:** Dynamic route-based page titles.
- **Pagination:** Display services with 6-9 entries per page.
- **Search and Filters:** Search services by keyword and filter them by category.
- **Responsive Design:** Works flawlessly on mobile, tablet, and desktop.
- **Animations:** Framer Motion for smooth animations.
- **Review Ratings:** Integrated rating system using react-rating-stars-component.
- **CountUp Stats:** Displays platform stats for users, services, and reviews.
- **Loading Spinner:** Ensures a smooth experience during data fetching.
- **Toast Notifications:** Provides feedback on CRUD operations.
- **404 Page:** Custom Not Found page for invalid routes.

---

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - Core UI framework.
- **React Router DOM 7.1.0** - Client-side routing.
- **Tailwind CSS 3.4.17** - Utility-first styling.
- **Material Tailwind 2.1.10** - Pre-designed components.
- **Framer Motion 11.15.0** - Smooth animations.
- **React Toastify 11.0.2** - Notifications.
- **React Rating Stars Component 2.2.0** - Review ratings.
- **React CountUp 6.5.3** - Animated counters.
- **React Hook Form 7.54.2** - Form handling.

### Backend

- **Node.js & Express.js** - Server-side framework.
- **MongoDB with Mongoose** - Database management.
- **JWT Authentication** - Token-based security.

---

## 🚀 How to Run This Project

### 🔧 Prerequisites

Make sure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (Locally or MongoDB Atlas)
- **Git**
- **.env file** (For sensitive credentials like Firebase, MongoDB URI, and JWT secret)

---

### 🖥️ Running the Frontend

1. Clone the frontend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-client.git
   cd service-review-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your Firebase configuration.
   ```sh
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

### 🖥️ Running the Backend

1. Clone the backend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-server.git
   cd service-review-server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the required environment variables:
   ```sh
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The backend will be running at `http://localhost:5000`.

---

### 🧪 Testing

1. Open `http://localhost:5173` to access the frontend.
2. Ensure the backend is running at `http://localhost:5000`.
3. Register/Login and start testing services and reviews.

---

## 🛠 Deployment

### 🚀 Deploy Frontend to Netlify
1. Push your frontend code to GitHub.
2. Go to [Netlify](https://www.netlify.com/) and connect your GitHub repository.
3. Set environment variables in Netlify's dashboard.
4. Deploy the site.

### 🚀 Deploy Backend to Vercel/Render
1. Push your backend code to GitHub.
2. Deploy on [Render](https://render.com/) or [Vercel](https://vercel.com/).
3. Set environment variables in the dashboard.
4. Deploy the backend.

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 📞 Contact
For any inquiries or issues, contact [rashedjaman768@gmail.com](mailto:rashedjaman768@gmail.com).

# Service Review System

## 🚀 Project Overview

Service Review System is a full-stack web application that allows users to review and interact with services listed by others. The platform supports user authentication, dynamic CRUD operations, and secure database management.

## 🌐 Live Demo

[Live Website URL](https://services-review.netlify.app/)

---

## 🔗 Repositories

### Client-Side
[Frontend Repository](https://github.com/mrashed21/service-review-client)

### Server-Side
[Backend Repository](https://github.com/mrashed21/service-review-server)

---

## 🎯 Key Features

### 🛠 User Capabilities

- **Add/Update/Delete Services:** Users can manage their services with full CRUD operations.
- **View Service Details:** Explore service details and user reviews.
- **Manage Reviews:** Logged-in users can post, update, or delete reviews.
- **My Reviews Page:** Easily manage all user reviews with edit and delete options.

### 🔑 Authentication System

- **Login/Registration:** Email-password authentication with Google login integration.
- **Validation:** Strong password validation for registration.
- **Security:** Firebase keys and MongoDB credentials are secured with environment variables.

### 📊 Extra Features

- **Dynamic Titles:** Dynamic route-based page titles.
- **Pagination:** Display services with 6-9 entries per page.
- **Search and Filters:** Search services by keyword and filter them by category.
- **Responsive Design:** Works flawlessly on mobile, tablet, and desktop.
- **Animations:** Framer Motion for smooth animations.
- **Review Ratings:** Integrated rating system using react-rating-stars-component.
- **CountUp Stats:** Displays platform stats for users, services, and reviews.
- **Loading Spinner:** Ensures a smooth experience during data fetching.
- **Toast Notifications:** Provides feedback on CRUD operations.
- **404 Page:** Custom Not Found page for invalid routes.

---

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - Core UI framework.
- **React Router DOM 7.1.0** - Client-side routing.
- **Tailwind CSS 3.4.17** - Utility-first styling.
- **Material Tailwind 2.1.10** - Pre-designed components.
- **Framer Motion 11.15.0** - Smooth animations.
- **React Toastify 11.0.2** - Notifications.
- **React Rating Stars Component 2.2.0** - Review ratings.
- **React CountUp 6.5.3** - Animated counters.
- **React Hook Form 7.54.2** - Form handling.

### Backend

- **Node.js & Express.js** - Server-side framework.
- **MongoDB with Mongoose** - Database management.
- **JWT Authentication** - Token-based security.

---

## 🚀 How to Run This Project

### 🔧 Prerequisites

Make sure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (Locally or MongoDB Atlas)
- **Git**
- **.env file** (For sensitive credentials like Firebase, MongoDB URI, and JWT secret)

---

### 🖥️ Running the Frontend

1. Clone the frontend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-client.git
   cd service-review-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your Firebase configuration.
   ```sh
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

### 🖥️ Running the Backend

1. Clone the backend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-server.git
   cd service-review-server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the required environment variables:
   ```sh
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The backend will be running at `http://localhost:5000`.

---

### 🧪 Testing

1. Open `http://localhost:5173` to access the frontend.
2. Ensure the backend is running at `http://localhost:5000`.
3. Register/Login and start testing services and reviews.

---

## 🛠 Deployment

### 🚀 Deploy Frontend to Netlify
1. Push your frontend code to GitHub.
2. Go to [Netlify](https://www.netlify.com/) and connect your GitHub repository.
3. Set environment variables in Netlify's dashboard.
4. Deploy the site.

### 🚀 Deploy Backend to Vercel/Render
1. Push your backend code to GitHub.
2. Deploy on [Render](https://render.com/) or [Vercel](https://vercel.com/).
3. Set environment variables in the dashboard.
4. Deploy the backend.

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 📞 Contact
For any inquiries or issues, contact [rashedjaman768@gmail.com](mailto:rashedjaman768@gmail.com).

# Service Review System

## 🚀 Project Overview

Service Review System is a full-stack web application that allows users to review and interact with services listed by others. The platform supports user authentication, dynamic CRUD operations, and secure database management.

## 🌐 Live Demo

[Live Website URL](https://services-review.netlify.app/)

---

## 🔗 Repositories

### Client-Side
[Frontend Repository](https://github.com/mrashed21/service-review-client)

### Server-Side
[Backend Repository](https://github.com/mrashed21/service-review-server)

---

## 🎯 Key Features

### 🛠 User Capabilities

- **Add/Update/Delete Services:** Users can manage their services with full CRUD operations.
- **View Service Details:** Explore service details and user reviews.
- **Manage Reviews:** Logged-in users can post, update, or delete reviews.
- **My Reviews Page:** Easily manage all user reviews with edit and delete options.

### 🔑 Authentication System

- **Login/Registration:** Email-password authentication with Google login integration.
- **Validation:** Strong password validation for registration.
- **Security:** Firebase keys and MongoDB credentials are secured with environment variables.

### 📊 Extra Features

- **Dynamic Titles:** Dynamic route-based page titles.
- **Pagination:** Display services with 6-9 entries per page.
- **Search and Filters:** Search services by keyword and filter them by category.
- **Responsive Design:** Works flawlessly on mobile, tablet, and desktop.
- **Animations:** Framer Motion for smooth animations.
- **Review Ratings:** Integrated rating system using react-rating-stars-component.
- **CountUp Stats:** Displays platform stats for users, services, and reviews.
- **Loading Spinner:** Ensures a smooth experience during data fetching.
- **Toast Notifications:** Provides feedback on CRUD operations.
- **404 Page:** Custom Not Found page for invalid routes.

---

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - Core UI framework.
- **React Router DOM 7.1.0** - Client-side routing.
- **Tailwind CSS 3.4.17** - Utility-first styling.
- **Material Tailwind 2.1.10** - Pre-designed components.
- **Framer Motion 11.15.0** - Smooth animations.
- **React Toastify 11.0.2** - Notifications.
- **React Rating Stars Component 2.2.0** - Review ratings.
- **React CountUp 6.5.3** - Animated counters.
- **React Hook Form 7.54.2** - Form handling.

### Backend

- **Node.js & Express.js** - Server-side framework.
- **MongoDB with Mongoose** - Database management.
- **JWT Authentication** - Token-based security.

---

## 🚀 How to Run This Project

### 🔧 Prerequisites

Make sure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (Locally or MongoDB Atlas)
- **Git**
- **.env file** (For sensitive credentials like Firebase, MongoDB URI, and JWT secret)

---

### 🖥️ Running the Frontend

1. Clone the frontend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-client.git
   cd service-review-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your Firebase configuration.
   ```sh
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

### 🖥️ Running the Backend

1. Clone the backend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-server.git
   cd service-review-server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the required environment variables:
   ```sh
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The backend will be running at `http://localhost:5000`.

---

### 🧪 Testing

1. Open `http://localhost:5173` to access the frontend.
2. Ensure the backend is running at `http://localhost:5000`.
3. Register/Login and start testing services and reviews.

---

## 🛠 Deployment

### 🚀 Deploy Frontend to Netlify
1. Push your frontend code to GitHub.
2. Go to [Netlify](https://www.netlify.com/) and connect your GitHub repository.
3. Set environment variables in Netlify's dashboard.
4. Deploy the site.

### 🚀 Deploy Backend to Vercel/Render
1. Push your backend code to GitHub.
2. Deploy on [Render](https://render.com/) or [Vercel](https://vercel.com/).
3. Set environment variables in the dashboard.
4. Deploy the backend.

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 📞 Contact
For any inquiries or issues, contact [rashedjaman768@gmail.com](mailto:rashedjaman768@gmail.com).

# Service Review System

## 🚀 Project Overview

Service Review System is a full-stack web application that allows users to review and interact with services listed by others. The platform supports user authentication, dynamic CRUD operations, and secure database management.

## 🌐 Live Demo

[Live Website URL](https://services-review.netlify.app/)

---

## 🔗 Repositories

### Client-Side
[Frontend Repository](https://github.com/mrashed21/service-review-client)

### Server-Side
[Backend Repository](https://github.com/mrashed21/service-review-server)

---

## 🎯 Key Features

### 🛠 User Capabilities

- **Add/Update/Delete Services:** Users can manage their services with full CRUD operations.
- **View Service Details:** Explore service details and user reviews.
- **Manage Reviews:** Logged-in users can post, update, or delete reviews.
- **My Reviews Page:** Easily manage all user reviews with edit and delete options.

### 🔑 Authentication System

- **Login/Registration:** Email-password authentication with Google login integration.
- **Validation:** Strong password validation for registration.
- **Security:** Firebase keys and MongoDB credentials are secured with environment variables.

### 📊 Extra Features

- **Dynamic Titles:** Dynamic route-based page titles.
- **Pagination:** Display services with 6-9 entries per page.
- **Search and Filters:** Search services by keyword and filter them by category.
- **Responsive Design:** Works flawlessly on mobile, tablet, and desktop.
- **Animations:** Framer Motion for smooth animations.
- **Review Ratings:** Integrated rating system using react-rating-stars-component.
- **CountUp Stats:** Displays platform stats for users, services, and reviews.
- **Loading Spinner:** Ensures a smooth experience during data fetching.
- **Toast Notifications:** Provides feedback on CRUD operations.
- **404 Page:** Custom Not Found page for invalid routes.

---

## 🛠 Tech Stack

### Frontend

- **React 18.3.1** - Core UI framework.
- **React Router DOM 7.1.0** - Client-side routing.
- **Tailwind CSS 3.4.17** - Utility-first styling.
- **Material Tailwind 2.1.10** - Pre-designed components.
- **Framer Motion 11.15.0** - Smooth animations.
- **React Toastify 11.0.2** - Notifications.
- **React Rating Stars Component 2.2.0** - Review ratings.
- **React CountUp 6.5.3** - Animated counters.
- **React Hook Form 7.54.2** - Form handling.

### Backend

- **Node.js & Express.js** - Server-side framework.
- **MongoDB with Mongoose** - Database management.
- **JWT Authentication** - Token-based security.

---

## 🚀 How to Run This Project

### 🔧 Prerequisites

Make sure you have the following installed:
- **Node.js** (>= 14.x)
- **MongoDB** (Locally or MongoDB Atlas)
- **Git**
- **.env file** (For sensitive credentials like Firebase, MongoDB URI, and JWT secret)

---

### 🖥️ Running the Frontend

1. Clone the frontend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-client.git
   cd service-review-client
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add your Firebase configuration.
   ```sh
   VITE_FIREBASE_API_KEY=your_api_key
   VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```

---

### 🖥️ Running the Backend

1. Clone the backend repository:
   ```sh
   git clone https://github.com/mrashed21/service-review-server.git
   cd service-review-server
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file in the root directory and add the required environment variables:
   ```sh
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the server:
   ```sh
   npm start
   ```
   The backend will be running at `http://localhost:5000`.

---

### 🧪 Testing

1. Open `http://localhost:5173` to access the frontend.
2. Ensure the backend is running at `http://localhost:5000`.
3. Register/Login and start testing services and reviews.


---

## 📞 Contact
For any inquiries or issues, contact [rashedjaman768@gmail.com](mailto:rashedjaman768@gmail.com).

