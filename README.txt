----Steps to Deploy----



1) creating the database
	
	- The application require mongoDB as the database
	
	- Run the mongoDB and execute the code in "db-script.txt". (copy the content and paste to mongo.exe cmd)
	
	- "db-script.txt" file mainly contains railway routes, credit card and mobile phone details (user payment details validated with this data)
	  
	  and government employee data.
	- database name should be "railway" and database creation is also included in "db-script.txt"		



2) deploy back-end services
	
	- go inside services folder
	
	- run "npm install" using cmd
	
	- after installing node modules, edit the "config.json" file if your configurations are different. 
	  
	  (eg: if you have the database in seperate server, change the database config in the config.json file) more details available in the report.
	
	- then execute the command, "node index.js"
	
	- then the back-end services will be started in port 3001



3) deploy WSO2 EI
	
	- go inside "wso2-ei/RailwayESBDist/target" folder
	
	- copy the RailwayESBDist_1.0.0.car file to the WSO2 server.
	
	- the folder to copy the above car file in the server looks like "6.4.0/repository/deployment/server/carbonapps"

	

	- If you want to create new .car file, open three projects inside "wso2-ei" folder using Eclipse Developer Studio.
	
	- Three projects are,
		
		- RailwayESB -> maven multi module project
		
		- RailwayESBConfig -> ESB config project
		
		- RailwayESBDist -> composite application project
	
	- right click on "RailwayESBDist" and click Export Composite Application Project and export the .car file

	
	
	- go WSO2 management console and ensure all the APIs and Endpoints are deployed.



4) deploy front-end
	
	- go inside "web" folder
	
	- run "npm install" using cmd
	
	- once the node modules are installed, ensure the base url in "src/config.json" file is valid.
	  
	  (base url should be the where wso2 server's APIs are hosted)
	
	- then execute the command, "npm start"



5) Then you are ready to use the web application. (localhost:3000)
