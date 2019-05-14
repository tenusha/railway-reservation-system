# Railway Reservation System

## Introduction

This is the report of the “Train Ticket Reservation System” web applicatio, in which front end (client side) is developed using React JS and back end (server side) is developed using Node JS and Express JS. This web application use MongoDB as the database, which is a cross-platform document-oriented database. 
 
In this web application users can provide the start and the destination locations, train, class, time, ticket quantity and the date of booking. Users can pay using credit/debit cards or by mobile phone, in which the amount is added to the mobile bill. If the user chooses card payment, the confirmed booking details will send to the email of the user by using “nodemailer” email service. If user chooses mobile payment the booking details will send to the entered mobile number using “Twilio” mobile service. 
 
In the web application booking page, when user select a start location (which contains all the stations of all routes), the destination locations are filtered according to the route of the selected station.  
 
If the user is a government employee, they can have special discounts in this web application. Once user gave their NIC when registering, that NIC is validated using government web service to ensure that user is eligible to have discounts. 
 
Following are sample text emails and text messages sent using previously mentioned services,
<p></p><br />

<img src="https://i.ibb.co/jWRZsx6/Capture1.png" alt="Capture1" border="0">
Figure_1: Email sent using “nodemailer” 
<p></p><br />

<img src="https://i.ibb.co/Qchs3hZ/Screenshot-20190513-100746.png" alt="Screenshot-20190513-100746" border="0">
Figure_2: Text message sent using “Twilio” 
<p></p><br />

## High Level Architectural Diagrams 
 
Front end of the web application is developed using React.js, backend is developed using Node.js and Express.js, MongoDB database is connected to the back end and the front end and the back end communicates with WSO2 EI, which is a comprehensive integration solution that enables communication among various, disparate applications. 
 
### Component Diagram 
<p></p><br />

<img src="https://i.ibb.co/ZL3rYsR/Capture27.png" alt="Capture27" border="0">
Figure_3: component diagram
<p></p><br />

### Overall System Architecture
<p></p><br />

<img src="https://i.ibb.co/GC5MpcN/Capture28.png" alt="Capture28" border="0">
Figure_4: overall system architecture
<p></p><br />

## Rest APIs

### Railway 
 
#### A. /railway/routes 
 
This is a GET endpoint which returns an array of routes which includes route name and the array of stations in that route. 
 
#### B. /railway/route/{id} 
 
This is a GET endpoint which has a path parameter of route id. It returns all the stations for a given route id. 
 
#### C. /railway/trains 
 
This is a GET endpoint which returns array of all the trains in the database. 
 
#### D. /railway/trains/{route} 
 
This is a GET endpoint which has a path parameter of route id. It returns array of all the trains which are running on the specified route. 
 
#### E. /railway/classes 
 
This is a GET endpoint which returns array of all the train classes available in the database. 
 
#### F. /railway/schedules 
 
This is a GET endpoint which returns array of all the train schedules available in the database. 

#### G. /railway/reservations 
 
This endpoint support both GET and POST requests. If it is a GET request it returns all the reservations in the database. If it is a POST request it creates a new reservation according to the data in request body and save it in the database. After the new reservation saving it send email or a text message (according to the payment method, card payment - email, mobile payment - text message). Sample email and text messages are shown in Fig 1 and Fig 2 in introduction section. 
 
#### H. /railway/reservations/{user} 
 
This is a GET endpoint which contains path parameter of user id. It returns an array of all the reservations of the specified user. 
 
#### I. /railway/reservations/{id} 
 
This is a DELETE endpoint, which delete the specified reservation (reservation id) in the request path parameter. 
 
#### J. /railway/contact 
 
This is a POST endpoint, which used to process customer support requests. In this service it saves the support information given by the customer (email, phone, message, etc.) and send the confirmation details in email to both railway customer support team and to the customer. 
<p></p><br />

<img src="https://i.ibb.co/GtTTFT0/Capture4.png" alt="Capture4" border="0">
Figure_5:  sample email sent by contact service 
<p></p><br />

### Users 
 
#### A. /users/{id} 
 
This endpoint supports PUT requests. User id should be specified in path parameter and the new user data should be send along with request body will be updated in the database. 
 
### Payment 
 
Payment services are dummy web services which are used to represent the payment gateway. 
 
#### A. /payment/card 
 
This is a POST endpoint, which validate the credit/debit card details and the payment amount send inside request body and send the validation status in response. 
 
#### B. /payment/phone 
 
This is a POST endpoint, which validate the mobile phone details and the payment amount send inside request body and send the validation status in response. 
 
### Register 
 
#### A. /Register 
 
This is a POST endpoint. It reads the new user details send inside the request body and save them in the database. 
 
### Login 
 
#### A. /login 
 
This is a POST endpoint. It reads the username and password sent inside request body and validate them with values in the database and send the validation status in response. 
 
### Gov 
 
This is a dummy government service which used to validate whether the user is a government employee or not. 
 
#### A. /gov/employee/{nic} 
 
This is a GET endpoint, which accept the NIC number as a path parameter. It checks whether there is any employee with that NIC and validate. The validation status will be sent back in the response.
