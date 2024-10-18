# CureConnect

CureConnect is a healthcare appointment booking platform that connects patients with doctors. It allows users to view doctor profiles, check their availability, and book appointments in real-time.

## Features

- **Doctor Profiles**: Patients can browse detailed doctor profiles including their name, degree, specialty, experience, and more.
- **Appointment Booking**: View available time slots and book appointments with ease.
- **Real-time Availability**: Check doctor availability for the upcoming week, showing times in an easy-to-understand format.
- **Appointment Fees**: Clear information on the doctor's fees before booking an appointment.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Styling**: Tailwind CSS
- **Authentication**: Context API
- **Routing**: React Router

## Installation

To run the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/CureConnect.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CureConnect
   ```

3. Install dependencies:

```bash
   npm install
```

4. Create a .env file in the root directory and add the necessary environment variables:

```bash
MONGO_URI=your_mongodb_connection_string
PORT=your_port_number
```

5. Start the development server:
```
npm start
```

6. Open your browser and visit ```http://localhost:5173``` to access the application.

## Usage

- Select a doctor from the list of available doctors.
- View the doctor's profile to get information on their specialization, experience, and appointment fee.
- Browse the available time slots for the next 7 days.
- Select a time slot and confirm your booking.


## Doctor Profile Page


## Appointment Booking Page

## Future Enhancements
- Payment Gateway Integration: Allow users to pay for appointments directly through the platform.
- Reviews and Ratings: Enable patients to leave reviews and ratings for doctors after their appointments.
- Search and Filtering: Add advanced search functionality to filter doctors by specialty, location, and ratings.
