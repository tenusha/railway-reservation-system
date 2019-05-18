# Railway Reservation System

## Introduction

This is the report of the “Train Ticket Reservation System” web application, in which front end (client side) is developed using React JS and back end (server side) is developed using Node JS and Express JS. This web application use MongoDB as the database, which is a cross-platform document-oriented database. 
 
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

## Workflow 
 
Following system workflow diagrams and system workflow scenario will help to get a better understanding on how the system works. 

### System Workflow 

<img src="https://i.ibb.co/XkMzjyq/Capture29.png" alt="Capture29" border="0">
Figure_6: user make reservation  
<p></p><br />

<img src="https://i.ibb.co/cCM4vnY/Capture30.png" alt="Capture30" border="0">
Figure_7: user update profile data  
<p></p><br />

<img src="https://i.ibb.co/X4zGdfD/Capture31.png" alt="Capture31" border="0">
Figure_8: user make customer support request  
<p></p><br />

### System Workflow Scenario 

The figure below shows the landing page of the web application. Any user can fill the reservation details in the form and view the cost of tickets, but if user want to make a reservation user should login first. 
<p></p><br />

<img src="https://i.ibb.co/nbPDk3m/Capture5.png" alt="Capture5" border="0">
Figure_9: landing page   
<p></p><br />

Firstly, user have to fill the “From” station, then the “To” stations are filtered according to the route of the selected “From” station. Once user filled the form, they can view the cost of tickets. 
<p></p><br />

<img src="https://i.ibb.co/25mHT50/Capture6.png" alt="Capture6" border="0">
Figure_10: user enter booking details   
<p></p><br />

If user need to make a reservation, user need to login first. If user is not registered before, they can register their account first. 
 
Users can click join now link in navigation bar and enter their details in the modal shown after clicking the link. NIC field is optional and if you enter a NIC it will be validated using government service to ensure that user is eligible to discounts. 
<p></p><br />

<img src="https://i.ibb.co/njn612Y/Capture7.png" alt="Capture7" border="0">
Figure_11: register modal 
<p></p><br />

Once user has successfully register user can login to the system and make reservations. 
<p></p><br />

<img src="https://i.ibb.co/FXQbYMM/Capture8.png" alt="Capture8" border="0">
Figure_12: login modal   
<p></p><br />

Once user login successfully the navigation bar will change and show user’s first name in dropdown and the “My Reservations” link. The user data will be saved in local storage until they sign out. 
<p></p><br />

<img src="https://i.ibb.co/9y5xFYJ/Capture9.png" alt="Capture9" border="0">
Figure_13: logged user    
<p></p><br />

If the user is a government employee, user is eligible for 10% discount and the discount amount is shown.
<p></p><br />

<img src="https://i.ibb.co/Nyvz54c/Capture10.png" alt="Captur10e" border="0">
Figure_14: gov employees can have discounts   
<p></p><br />

Then user can click “Make Reservation” button in the bottom of the form and the user will directed to “Payment” page. Only logged in users are allowed in payment page, otherwise they are asked to login. 
 
In the payment page it shows the amount and user can select a payment method (card or phone). 
<p></p><br />

<img src="https://i.ibb.co/jJww0PF/Capture11.png" alt="Capture11" border="0">
Figure_15: user select card payment   
<p></p><br />

When user select mobile payment, the user’s mobile number (entered when registering) will be auto filled, but user can change it if they want to make the payment with different mobile number.
<p></p><br />

<img src="https://i.ibb.co/0Bf4KvC/Capture12.png" alt="Capture12" border="0">
Figure_16: user select mobile payment 
<p></p><br />

Once user enter valid payment details, the reservation will be made and user will be directed to “My reservation” page, in where user can view all their previous reservations and new reservations. 
<p></p><br />

<img src="https://i.ibb.co/q7WPzmT/Capture13.png" alt="Capture13" border="0">
Figure_17: my reservations page 
<p></p><br />

If user select card payment, an email will be sent to their email address. If user select mobile payment, a text message will be sent to the given mobile number. 
<p></p><br />

<img src="https://i.ibb.co/wwvtTZQ/Capture.png" alt="Capture" border="0">
Figure_18: email sent for card payment (left), text message sent for mobile payment (right) 
<p></p><br />

Users can cancel the reservation by clicking the cancel button in the reservations shown in the “My Reservations” page. User will be asked confirmation after clicking the cancel button. 
<p></p><br />

<img src="https://i.ibb.co/7kcSHG8/Capture15.png" alt="Capture15" border="0">
Figure_19: cancel reservation 
<p></p><br />

<img src="https://i.ibb.co/48Yc0tQ/Capture16.png" alt="Capture16" border="0">
Figure_20: cancel reservation confirmation 
<p></p><br />

Users can edit their profile through the link in the navigation bar.
<p></p><br />

<img src="https://i.ibb.co/jJ0t4Z2/Capture17.png" alt="Capture17" border="0">
Figure_21: change profile data 
<p></p><br />

Users cannot change the username (email). 
<p></p><br />

<img src="https://i.ibb.co/TqkDNBB/Capture18.png" alt="Capture18" border="0">
Figure_22: successfully change profile data 
<p></p><br />

Users can view contact details from “Contact Us” page or they can send a message to support team regarding any of their issues. Once user send support request an email will send to both the user and the support team.
<p></p><br />

<img src="https://i.ibb.co/PQdSvsF/Capture19.png" alt="Capture19" border="0">
Figure_23: contact us page  
<p></p><br />

<img src="https://i.ibb.co/4pRLRky/Capture20.png" alt="Capture20" border="0">
Figure_24: confirmation of support request  
<p></p><br />

##  Authentication and Security Mechanism 

When saving user passwords, it saves the hash value generated by the JavaScript function rather than saving the plane text password. 
 
Following is the JavaScript function used to generate hash code for a given string. 

```c
export function getHash(str) {     
 let hash = 0     
 for (let i = 0; i < str.length; i++) {         
  hash += Math.pow(str.charCodeAt(i) * 31, str.length - i)         
  hash = hash & hash // Convert to 32bit integer     
 }     
 return hash 
};
```

Following is a user document saved in MongoDB with hashed password.

```c
{         
 "_id" : ObjectId("5cda20be69664c34d0968526"),         
 "fname" : "Tenusha",         
 "lname" : "Guruge",         
 "phone" : "0777296705",         
 "nic" : "123456789V",         
 "address" : "506/1, Parackrama Mawatha\nThalahena",         
 "email" : "tenushamadhushan@gmail.com",         
 "password" : "-1144286319",         
 "discount" : true,         
 "__v" : 0 
} 
```

In the front end only one account can be created with one email address. 
<p></p><br />

<img src="https://i.ibb.co/RPGZtMR/Capture21.png" alt="Capture21" border="0">
Figure_25: cannot register two accounts with same email   
<p></p><br />

When users are login entered username and password will send to the back end for the validation. When sending data to back end the password will be hashed before sending. 
<p></p><br />

<img src="https://i.ibb.co/TbbwSP3/Capture22.png" alt="Capture22" border="0">
<img src="https://i.ibb.co/1vMnMfz/Capture22-1.png" alt="Capture22-1" border="0">
Figure_26: login POST request    
<p></p><br />

With only valid username (previously registered) and valid password, Users can login to the system. If a user tries to access a page like “Payment” it will automatically redirect the user to the landing page of the web application. This redirection is handled using ReactJS lifecycle methods ( componentWillUpdate(), componentDidMount() ).
<p></p><br />

<img src="https://i.ibb.co/C7t7rvR/Capture23.png" alt="Capture23" border="0">
Figure_27: cannot login with invalid credentials  
<p></p><br />

## Known Issues 

### • Antivirus software block the “nodemailer” email service in back-end. 
 
If you are getting an error like below, it’s not a fault of the back-end services. It occur because some virus guard applications block “nodemailer” email service. 

```c
{ Error: self signed certificate in certificate chain        
    at TLSSocket.<anonymous> (_tls_wrap.js:1105:38)        
    at emitNone (events.js:106:13)        
    at TLSSocket.emit (events.js:208:7)        
    at TLSSocket._finishInit (_tls_wrap.js:639:8)        
    at TLSWrap.ssl.onhandshakedone (_tls_wrap.js:469:38) code: 'ESOCKET',         
    command: 'CONN' }
```

This is a common problem with Avast antivirus, this problem will not occur in ESET and Kaspersky. 
 
I have also asked the problem in https://stackoverflow.com. They also suggest to disable the virus guard when running the back-end services. 
 
If you are getting some error like this, please disable the virus guard and try again. Anyway, the reservation process will not abort even if the error occurred.

### • “Twilio” free message service will not allow to sent messages to unverified mobile numbers. 
 
If you are getting an error like below, it occurs because I’m using Twilio free trial and the entered mobile number should be validated through Twilio dashboard before send messages to that number. If you have paid Twilio account please add account details in back-end “config.json” file.

```c
{ [Error: The number +94777123456 is unverified. Trial accounts cannot send messages to unverified numbers; verify +94777123456 at twilio.com/user/account/phonenumbers/verified, or purchase a Twilio number to send messages to unverified numbers.]   
  status: 400,   
  message: 'The number +94777123456 is unverified. Trial accounts cannot send messages to unverified numbers; verify +94777123456 at twilio.com/user/account/phonenumbers/verified, or purchase a Twilio number to send messages to unverified numbers.',   
  code: 21608,   
  moreInfo: 'https://www.twilio.com/docs/errors/21608',   
  detail: undefined }
```

## Copyright

(C) 2019 Tenusha Guruge
<br>
[tenusha.wordpress.com](https://tenusha.wordpress.com)


  


