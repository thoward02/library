
# library
This is a project founded by SALT, designed to bring teaching materials to the public.
It is an open source program built in electron and python, using cloud hosting to distribute lessons. Within the program we have topics, (such as Programing) that users can look into and study from. We hope to be able to offer tutorials and guides over a large range of subjects within the future, while also letting users create their own lessons. You can find the raw lessons [here]("https://github.com/thoward02/lessons"), we're still working on everything so be patient ;>
# Install
The install is easy and simple. You'll need [node.js]("https://nodejs.org/en"), and [Python 3.6 or above]("https://www.python.org/").
The back end of the program is pythonClient.py, so obviously you'll need python. The python program is activated in the JS scripts using `exec("py pythonClient.py)`. The program is only meant to be ran on windows for now, if you're on linux change `py`, to `python` in `exec("py pythonClient.py)`.
Download the zip and unzip it to an accessible folder. Then change directory in CMD to `library-masters`, for example I stored mine on the desktop, so I would open up CMD and type in `cd C:\Users\jcboe\Desktop\library-master`.
After that you'll wanna type in `npm install electron` to download the node modules to run the program.
Once everything is installed run `npm start` or `electron .` to start the program.
If you have issues email me at thoward20@jcss.us

# Modding
So if you look at our Lessons repo you'll see that we have a "Example Lessons" lesson, but you can't access it via the main program. That's because if you look at your `manifest.json` you'll see that there is no notation about an example lesson. That's quite an easy fix, just change your json file to:
```
{
  "Python": {
      "Basics_Of_Python":{
        "main" : "main.html",
        "mainControl" : "jsMain.js",
        "file1" : "Python_Basics.html",
        "file2" : "Functions_In_Python.html",
        "file3" : "Loops_In_Python.html"

      },
      "discordBot": {
        "main" : "main.html",
        "mainControl" : "jsMain.js",
        "file1" : "gettingYourToken.html",
        "file2" : "writingFirstBot.html",
        "file3" : "understandingAsync.html",
        "file4" : "basics.html"
      }
    },
  "javascript": {
      "basics": {
        "mainControl" : "jsMain.js",
        "main" : "main.html",
        "file1": "jsBasics.html",
        "file2" : "editingHtml.html",
        "file3" : "jsFunctions.html",
        "file4" : "jsLoops.html"
      }

    }
},"Example_Lesson" : {
  "Example": {
    "main": "main.html",
    "mainControl": "jsMain.js",
    "file1": "example_1.html",
    "file2" : "example_2.html"
  }
}
```
What this does, is it enables your system to see the Example lessons lesson within our cloud! (Look at our source and you'll understand how)

# Building a Lesson
If you'd like to build a lesson, you'll need to format it correctly in order for the system to see and use it. Your pathing should look like this:
```
Topic_folder
--Lesson1
---Main_Page.html
---Main_Js_Page.html
---Lesson_File_One.html
---Lesson_File_Two.html
```
The parent folder should be the topic, for example it could be python.  Lesson1 is the name of your first lesson, it could be basics, or perhaps building a discord bot. What ever you want to be teaching. Within that folder would be your content files, the files that host your lessons. main.html is the name of the main page for your topic. Here you'll explain the lesson and provide a way to get to each lesson. Then the main js file will control the buttons and other js features within the script. Your lesson files are... well that's where you put your actual lesson. What ever you're teaching goes there! Check out the example lesson in order to see how your lesson should be built!
