# RESTful-Database-API (v0.1)

**What is this?**

An API for doing CRUD operations on databases with HTTP requests, hence the name: *RESTful Database API*. It is (initially) designed for MongoDB, and not yet complete. I have only used it to fetch data, and did not have the time to complete it. 

I will eventually finish it though. Right now, I'm busy with other projects that's all. When the v1.0 is released, it means that the MongoDB part is finished. The next verison, v2.0 will focuss on mySQL/mariaDB.

**What is this API made out of?**
* NodeJS. 
* Express (framework) 
* Native MongoDB driver for NodeJS  
* Love, *obviously.* 

**What is this capable of so far?**

You can track the progress [here](https://docs.google.com/spreadsheets/d/1ZRqfYvO7V3WECDWmgJTmC2M6SJjsmy8ZVwzqAFwpMKA/edit?usp=sharing). 

---

**Note_1:** This was my first NodeJS project. Thus, I took notes for myself to remind me what is what, and why I used them. There will be lots of comment lines pointing out obvious stuff in the source code. On the bright side, if you have interns to teach NodeJS in your company, you can pass this project to them so they can learn the API design basics.  

**Note_2:** I'm locally connecting to databases that do not ask for authentication. You might wanna modify the API so that authentication would not be a problem for you.  

---
**Why is this even a thing?** 

**Story time:** The place I have been working as an intern was using MongoDB for one of their projects, and they were using Postman to automate end-point tests. There was a problem, we needed the mobile authentication codes to automate user account creation process. I could have modified the source code of the project to return that code as a result of account creation requests, but that would possibly cause securtity leaks if I were to forget about that modified code. Also, I did not want to make modifications on every project in the future. So, I decided on writing this API to directly access and modify MongoDB. I also wanted this API to be database agnostic. You can use it for any database for any purpose. *Have fun!*    
