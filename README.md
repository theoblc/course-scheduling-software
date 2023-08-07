# Course Scheduling Software for Télécom SudParis

## Introduction

This repository contains a comprehensive course scheduling software designed specifically for the instructors at Télécom SudParis. The software is developed as a web application using React for the frontend and Django for the backend, providing an intuitive and efficient platform for managing and organizing course schedules. This teamwork project was carried out as part of the second-year curriculum at Télécom SudParis, a French engineering school.


## Features

- Web-based application for managing course schedules.
- Intuitive user interface designed with React.
- Backend powered by Django, offering robust data management and manipulation.
- Data managed using MySQL database.

## Authors

- Devan PRIGENT [devan.prigent@telecom-sudparis.eu](mailto:devan.prigent@telecom-sudparis.eu)
- Théo BLANCHONNET [theo.blanchonnet@telecom-sudparis.eu](mailto:theo.blanchonnet@telecom-sudparis.eu)

## Prerequisites

- Node.js and npm (for the frontend)
- Python and Django (for the backend)
- MySQL database

## Getting Started

1. Clone this repository.
2. Set up the frontend by navigating to the `frontend` directory and running `npm install`.
3. Start the frontend development server: `npm start`.
4. Set up the backend by navigating to the `backend` directory and creating a virtual environment: `python -m venv venv`.
5. Activate the virtual environment: `source venv/bin/activate` (Linux/macOS) or `venv\Scripts\activate` (Windows).
6. Install required Python packages: `pip install -r requirements.txt`.
7. Apply database migrations: `python manage.py migrate`.
8. Start the Django development server: `python manage.py runserver`.
9. Access the web application through your browser at `http://localhost:3000`.

