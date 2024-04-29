# online-mysql
my assignment program, to implement a online mysql execution website

# 1. Install plugin
	npm install mysql 
 	
  	num install express --save -g
	num install body-parser
	num install cors


# 2.introduce:
It's a project with server and web
server has three files: app.js, mysql.js, router.js
	1.app.js is the start of server,when run it, server will start.the server address is http://127.0.0.1:8085/
	2.mysql.js has the connect information of mysql, and it encapsulate the function to excute SQL 
	3.router.js encapsulate the interface for web:/searchPopulation
	
web has one file:searchSql.html
	it contains the web of this project .when excute it, it will show on website .
	input on left and output on right.
	There has four quick query buttons on top of the web:list citys\list states\count query\remove query 
	when we click it, it will show the SQL query on the input window .
	when we click the run button, it will excute the sql and show its result on right


	
3.reference:
	js connect sql: https://blog.csdn.net/weixin_46441425/article/details/123265906
	
	
	
	
