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


