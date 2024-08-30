---

# Documentation

## User Listing Project Backend

This project is a Django-based application that fetches user data from an external API, stores it in a local database, and provides endpoints to list, search, and retrieve user information.

#### Features

- Fetch random user data from an external API.
- Store user data in a local database.
- List all users with pagination.
- Search users by various fields.
- Retrieve detailed information for a specific user.

## Prerequisites

- Python
- Django
- Django Rest Framework
- Javascript
- ReactJS

## Installation

- Clone the repository using given link: 
  git clone https://github.com/shantanu-02/User-Listing.git
- Change the directory to backend using terminal:
  cd backend
- Create a virtual environment using terminal(optional but recommended):
  python -m venv venv
- Activate the virtual environment using terminal:
  source venv/bin/activate (On Windows, use: venv\Scripts\activate)
- Install the required dependencies using terminal:
  pip install -r requirements.txt


## Setup

- Change directory to project directory using terminal:
cd userListing

- Apply database migrations using terminal:
python manage.py migrate

- Create a superuser (optional) using terminal:
Copypython manage.py createsuperuser

- Run the development server using terminal:
python manage.py runserver

- The application should now be running at `http://127.0.0.1:8000/`.


## Usage

#### Fetch and Store Random Users
- To fetch random user data and store it in the database:
- Method: GET
- URL: http://127.0.0.1:8000/users/fetch-random-users/
  
#### List Users 
- To list all users (paginated):
- Method: GET
- URL: http://127.0.0.1:8000/users/
  
#### Search Users
- To search for users:
- Method: GET
- URL: http://127.0.0.1:8000/search/?query=<search_term>
- (Replace <search_term> with the desired search query.)

#### Get Single User Details
- To retrieve details for a specific user:
- Method: GET
- URL: http://127.0.0.1:8000/users/id/
- (Replace id with the user's ID.)

## API Endpoints

#### Endpoint: /users/
- List all users (paginated).
  
#### Endpoint: /users/fetch-random-users/
- Fetch and store random user data.
  
#### Endpoint: /users/<id>/
- Retrieve details for a specific user.
  
#### Endpoint: /search/?query=<search_term>
- Search for users.
  
---

---

# User Documentation

This documentation provides a guide on how to set up and use the application for managing users.

## Table of Contents

- [1. Overview](#1-overview)
- [2. Setting Up the App](#2-setting-up-the-web-app)
- [3. Managing Users](#3-managing-users)
  - [3.1. Fetch new Users](#31-fetch-new-users)
  - [3.2. Updating an Overlay](#32-search-for-users)
  - [3.3. Sort the Users](#33-sort-the-users)
  - [3.4. Single user detail using inner-navigation](#34-user-detail-using-inner-navigation)

## 1. Overview

### User Listing Project Frontend
- Frontend of this project is react-based application that fetches user data from the above defined URL's to list, search, sort and retrieve user information.

## 2. Setting Up the Web App

- Change directory to project directory using terminal:
cd client

- Open the terminal and install all the necessary dependencies using following command:
  npm install

- Run the following command in terminal to start the web application:
  npm run dev

## 3. Managing Users

![image](https://github.com/shantanu-02/User-Listing/blob/main/client/public/Assets/Paginated_data.PNG)
- On the home page, you will get the all User's aata in paginated manner.

### 3.1. Fetch new Users

![image](https://github.com/shantanu-02/User-Listing/blob/main/client/public/Assets/Fetching%20new%20users.PNG)

- Go to the `Add New Users` button.
- Click on it to fetch new users.

### 3.2. Search for Users

![image](https://github.com/shantanu-02/User-Listing/blob/main/client/public/Assets/User_searchar.PNG)

- Go to the searchbar.
- Enter for the id/name/gender/contact/email of the user you want to search for.
- You will get the results.
![image](https://github.com/shantanu-02/User-Listing/blob/main/client/public/Assets/User_searchresults.PNG)

### 3.3. Sort the Users

![image](https://github.com/shantanu-02/User-Listing/blob/main/client/public/Assets/Users_sorted.PNG)

- Click on the any field from the column header.
- You will get the users data sorted on that specific field.
- Above image shows the data sorted on `last-name`.

### 3.3. User detail using inner navigation

![image](https://github.com/shantanu-02/User-Listing/blob/main/client/public/Assets/User_single.PNG)

- Select user from the list of the data displayed.
- Or search for the user specifically.
- Click on the user row and you will get complete user details in inner-navigation. 

---
