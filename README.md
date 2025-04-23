GlamUp – Makeup Appointment Booking App

-Project Overview-
GlamUp is a responsive web application designed to allow users to seamlessly book makeup appointments online. It provides a modern, user-friendly interface where clients can select a time slot, confirm their booking, and view their scheduled appointments—all connected to a backend for real-time data handling. The app is built with web technologies that support both dynamic frontend interactions and persistent backend storage.

-Technologies Used-
Frontend: AngularJS (1.8) with responsive HTML and CSS
Backend: Node.js + Express.js
Database: MongoDB (local or cloud)
Communication: RESTful API (GET, POST, DELETE)
Other Tools: Confetti.js for interaction feedback, Flatpickr for date selection
Version Control: Git and GitHub

----!!!!----Installation & Running the Application----!!!!----
1. Clone the Repository
   git clone https://github.com/MzSnn/ProjectUniMakeupapp.git
   cd ProjectUniMakeupapp
2. Backend Setup (Node + Express)
   cd makeupapp\server
   npm install
Create a .env file inside the server directory and add your MongoDB URI: MONGO_URI=mongodb://localhost:27017/makeupApp
   node index.js
This will launch your server at: http://localhost:5000/api/appointments
3. Frontend Setup
In a new terminal window
  cd makeupapp\frontend
  start index.html

Application will now connect to the backend and allow you to:
  Enter their name
  Select a date and time
  Book an appointment (stored in MongoDB)
  See real-time feedback and updated list

