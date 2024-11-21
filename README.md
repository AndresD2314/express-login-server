# **Intranet Form Submission App**

This project provides a setup for a form hosted on an IIS server that interacts with a Dockerized Node.js backend and a MySQL database. It saves user credentials securely in the database when the form is submitted.

## **Features**
- **Form Submission**: Collects user credentials (username and password) from a form.
- **Backend API**: Node.js app handles form submissions and stores data in a MySQL database.
- **Dockerized Setup**: Backend and database are containerized for easy deployment.

---

## **Project Structure**
```
.
├── server.js               # Node.js application backend
├── Dockerfile              # Dockerfile for Node.js app
├── docker-compose.yml      # Docker Compose configuration for app and database
├── public/                 # Static assets, including the HTML form
├── init.sql                # SQL script to initialize the database
└── README.md               # Project documentation
```

---

## **Requirements**
- **Docker** and **Docker Compose** installed on your system.
- IIS server to host the HTML form.
- MySQL client (optional, for database inspection).

---

## **Setup Instructions**

### **Step 1: Clone the Repository**
```bash
git clone <REPOSITORY_URL>
cd <PROJECT_DIRECTORY>
```

### **Step 2: Build and Start Docker Containers**
Ensure Docker is running, then execute:
```bash
docker-compose up --build
```

This will:
- Build and start the Node.js app on `http://localhost:4000`.
- Set up a MySQL database with the required schema.

### **Step 3: Host the Form on IIS**
1. Copy the HTML form to your IIS server’s hosting directory.
2. Ensure the form’s `<form>` tag points to the Node.js backend:
   ```html
   <form action="http://<NODE_SERVER_IP>:4000/save-credentials" method="POST" id="loginform">
   ```
3. Open the form in your browser via the IIS server’s URL.

### **Step 4: Test the Setup**
1. Access the form through IIS, e.g., `http://192.168.124.1:443/menu/login3_v2bc9b.html`.
2. Submit the form with a username and password.
3. Verify the data is saved in the database.

---

## **Usage**

### **Access the Node.js App**
- Base URL: `http://localhost:4000`
- API Endpoint: `POST /save-credentials`

### **Database Information**
- MySQL credentials are configured in the `docker-compose.yml` file:
  ```yaml
  MYSQL_ROOT_PASSWORD: 123
  MYSQL_DATABASE: credentials
  ```
- Default table structure:
  ```sql
  CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
  );
  ```

---

## **Troubleshooting**

### Common Issues:
- **CORS Errors**: Ensure the Node.js backend allows requests from the IIS server origin.
- **Port Conflicts**: Check if ports (4000 for Node.js, 3306 for MySQL) are in use.
- **Form Not Submitting**: Ensure the `action` URL in the HTML form points to the correct Node.js server address.

### Logs:
- View Node.js app logs:
  ```bash
  docker logs <NODE_CONTAINER_NAME>
  ```
- Access MySQL container:
  ```bash
  docker exec -it <MYSQL_CONTAINER_NAME> mysql -uroot -p
  ```

---

## **Contributing**
Feel free to submit issues or contribute by creating a pull request.

---

## **License**
This project is licensed under the MIT License.
