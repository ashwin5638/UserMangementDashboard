# User Management Dashboard

A responsive **React.js User Management Dashboard** that performs complete **CRUD (Create, Read, Update, Delete)** operations using the **JSONPlaceholder REST API**. The application provides a clean and user-friendly interface for managing users with search, filtering, sorting, pagination, and form validation.

## 🚀 Features

* View all users in a responsive table
* Search users in real time
* Sort users by multiple fields
* Filter users dynamically
* Add new users
* Edit existing user details
* Delete users with confirmation
* Responsive pagination
* Form validation
* Loading and error handling
* Modular and reusable component architecture

## 🛠️ Tech Stack

* React.js
* Vite
* Axios
* JavaScript (ES6+)
* CSS3
* JSONPlaceholder REST API

## 📁 Project Structure

```text
user-management-dashboard/
│
├── public/
├── src/
│   ├── api/
│   │   └── userService.js
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── UserTable.jsx
│   │   ├── UserRow.jsx
│   │   ├── UserForm.jsx
│   │   ├── SearchBar.jsx
│   │   ├── FilterPopup.jsx
│   │   ├── Pagination.jsx
│   │   └── ConfirmDelete.jsx
│   ├── hooks/
│   │   └── useUsers.js
│   ├── utils/
│   │   ├── constants.js
│   │   ├── helpers.js
│   │   └── validators.js
│   ├── styles/
│   ├── App.jsx
│   └── main.jsx
├── package.json
└── README.md
```

## 🌐 API

**Base URL**

```text
https://jsonplaceholder.typicode.com/users
```

**HTTP Methods Used**

* GET
* POST
* PUT
* DELETE

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/your-username/user-management-dashboard.git
```

Navigate to the project:

```bash
cd user-management-dashboard
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

## 📌 Functionality

* Fetch users from the REST API
* Display users in a responsive table
* Search by name, username, or email
* Sort users alphabetically
* Filter users using multiple criteria
* Add and edit user information
* Delete users with a confirmation dialog
* Validate form inputs before submission
* Handle API errors gracefully

## 📷 Screenshots

Add screenshots of your application here.

## 📈 Future Improvements

* Authentication and authorization
* Dark mode
* Export users to CSV/PDF
* Advanced filtering
* Backend database integration

## Project Live 
  https://usermanagement126.netlify.app/
