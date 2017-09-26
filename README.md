### Introduction

This shiny application is an animated graphic that shows the evolution of Luxembourg steel moved by road to different Europeen countries between 1952 and 2000.  
This application is composed of an interface file (**ui.R**) and a server file (**server.R**).

**d6152.csv** is the data file and the www folder regroups all files that are related to the d3js graphic:

 - **d3.min.js** is the library used.
 
 - **multiLines.js** is the application.
 
 - **stylessheet2.css** is the css file for the style associated to the multiLine.js file.

You can see the shiny application in action [here](http://wozametrics.com/visualization/steel)




### Before running the code

You have to provide the complete path on where you saved the d6152.csv file. You have to insert the path at the line 8 of the server.R code.

<!-- -->

    7   #Path to read data
    8   d6 = read.table("Path/d6152.csv", sep=",")
    

Enjoy this application and if you have any issues to make it work correctly, you can always watch my [tutorial video](https://youtu.be/GHRZaiYh2Ac) or [contact me](mailto:kevinrosamont@ymail.com).
