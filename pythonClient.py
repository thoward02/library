"""
This is the python client for library, within we will have every function the program needs to run C:
"""
import sys
import glob
import json
import os
import urllib.request
import socket
class commands:
    def __init__(self):
        x = """
        This is the commands class where we run commands given to us via Library
        """
    def checkInternet(self):
            self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            try:
                self.s.connect(('google.com', 80))
                #We can access outside of lan
                return 0
            except:
                #We tried to get out but the ol bastards kept us in lock down .-. (we dont have internet connection lel)
                return 1
    def checkCloudConnection(self):
        self.cloudHost = "saltlibrary.azurewebsites.net"
        self.s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        try:
            self.s.connect((self.cloudHost, 80))
            #We can access outside of lan
            return 0
        except:
            #We tried to get out but the ol bastards kept us in lock down .-. (we dont have internet connection lel)
            return 1
    def checkForUpdates(self):
        #Get our version
        self.jsonFile = "package.json"
        with open(self.jsonFile, "r") as jsonFile:
            self.data = json.load(jsonFile)
        self.currentVersion = self.data["version"]
        jsonFile.close() #Close the file
        #Lets move on and grab the new version
        self.url = "https://raw.githubusercontent.com/thoward02/library/master/package.json"
        try:
            self.file = urllib.request.urlretrieve(self.url, str(os.getcwd()+"/manifest.tmp"))
        except:
            #Download failed
            return 404
        with open(str(os.getcwd()+"/manifest.tmp"), "r") as jsonFile:
            self.data = json.load(jsonFile)
        self.newVersion = self.data["version"]

        if(self.newVersion==self.currentVersion):
            #It's up to date
            os.remove(os.getcwd()+"/manifest.tmp")
            return 1
        if(self.newVersion != self.currentVersion):
            os.remove(os.getcwd()+"/manifest.tmp")
            return 0
    def updateFiles(self):
        try:
            self.url = "https://raw.githubusercontent.com/thoward02/library/master/package.json"
            self.updatedManifest = urllib.request.urlretrieve(self.url, str(os.getcwd()+"/manifest.tmp"))
        except:
            return 404 #could not update
        with open(str(os.getcwd()+"/manifest.tmp"), "r") as jsonFile:
            self.data = json.load(jsonFile)
        #print(self.data)
        self.files = self.data["manifest"]["files"]
        self.assetFiles = self.data["manifest"]["assets"]
        try:
            for self.newFiles in self.files:
                #The file name can be grabbed via print(self.files[self.newFiles])
                self.currentFile = self.files[self.newFiles]
                self.fileUrl = "https://raw.githubusercontent.com/thoward02/library/master/"+str(self.files[self.newFiles])
                urllib.request.urlretrieve(self.fileUrl, str(os.getcwd()+"/"+str(self.files[self.newFiles])))

            #os.remove(str(os.getcwd())+"/manifest.tmp")

        except:
            return 1 #We failed
        try:
            for self.newFiles in self.assetFiles:
                #The file name can be grabbed via print(self.files[self.newFiles])
                self.currentFile = self.assetFiles[self.newFiles]
                self.fileUrl = "https://raw.githubusercontent.com/thoward02/library/master/assets/"+str(self.assetFiles[self.newFiles])
                urllib.request.urlretrieve(self.fileUrl, str(os.getcwd()+"/assets/"+str(self.assetFiles[self.newFiles])))

            os.remove(str(os.getcwd())+"/manifest.tmp")
            return 0 #Everything is all updated and good to go!
        except:
            return 1 #We failed
    def checkForFirstOpen(self):
        with open("package.json", "r") as self.jsonFile:
            self.jsonData = json.load(self.jsonFile) #We could probably drop mem usage here if we really needed it.
            self.firstRun = self.jsonData["options"]["firstOpen"]
        if(self.firstRun=="True"):
            return 0 #This is the users first time opening the program
        if(self.firstRun=="False"):
            return 1 #This is not her first time ;>
    def writeFirstOpen(self):
        try:
            with open("package.json", "r") as self.jsonFile:
                self.jsonData = json.load(self.jsonFile)
            self.jsonFile.close()
            self.jsonData["options"]["firstOpen"] = "False"
            with open("package.json", "w") as self.jsonFile:
                json.dump(self.jsonData, self.jsonFile, indent = 4)
            self.jsonFile.close()
            return 0
        except:
            return 1
    def checkManifest(self):
        self.cDir = os.getcwd()
        self.u = " \ "
        self.u = self.u.replace(' ', '')

        """
        I hate how windows is \ and linux is /, jUst ConNFORm tO lINUX WinDoWs
        """
        try:
            self.cDirF = self.cDir.replace(self.u, '/')
        except:
            #We're on linux?
            self.cDirF = self.cDir
            pass
        self.manifestFileSys = self.cDirF+"/lessons"
        self.checkForFolder = os.path.isdir(self.manifestFileSys)
        if(self.checkForFolder==True):
            pass
        if(self.checkForFolder==False):
            os.mkdir(self.manifestFileSys)
            pass
        self.checkForFile = os.path.isfile(self.manifestFileSys+"/manifest.json")
        if(self.checkForFile == True):
            self.manifest = 0
        if(self.checkForFile == False):
            self.manifest = 1 #There is no manifest so we return 1 basically saying false.
        return self.manifest
    def downloadManifest(self):
        self.server = "saltlibrary.azurewebsites.net" #Local host for now due to testing
        self.url = "https://"+self.server+"/manifest.json"
        self.cDir = os.getcwd()
        self.u = " \ "
        self.u = self.u.replace(' ', '')
        try:
            self.cDirF = self.cDir.replace(self.u, '/')
        except:
            #We're on linux?
            self.cDirF = self.cDir
            pass
        self.manifestFileSys = self.cDirF+"/lessons" #Path to folder
        try:

            self.file = urllib.request.urlretrieve(self.url, self.manifestFileSys+"/manifest.json") #(url, pathToDownloadTo)
            return 0
        except:
            #The download failed
            return 1
    def readManifest(self):
        self.cDir = os.getcwd()
        self.u = " \ "
        self.u = self.u.replace(' ', '')
        try:
            self.cDirF = self.cDir.replace(self.u, '/')
        except:
            #We're on linux?
            self.cDirF = self.cDir
            pass
        self.manifestFileSys = self.cDirF+"/lessons/manifest.json" #Path to file
        with open(self.manifestFileSys, "r") as jsonFile:
            self.data = json.load(jsonFile)
            self.data = str(self.data)
            self.data = self.data.replace("'", '"')
            #Okay so was returning: 'topic':'lesson'
            #Js really didn't like having ' instead of " so we turn ' into "
        return self.data
    def checkLesson(self, lessonName):
        topic, lesson =  lessonName.split(':')
        self.cDir = os.getcwd()
        self.u = " \ "
        self.u = self.u.replace(' ', '')
        try:
            self.cDirF = self.cDir.replace(self.u, '/')
        except:
            #We're on linux?
            self.cDirF = self.cDir
            pass
        self.checkForFolder = os.path.isdir(self.cDirF+"/lessons/"+topic+"/"+lesson) #Path to file
        if(self.checkForFolder==True):
            return 0
        if(self.checkForFolder==False):
            return 1
    def downloadLesson(self, lessonName):
        self.server = "saltlibrary.azurewebsites.net" #Local host for now due to testing
        topic, lesson  = lessonName.split(":")

        self.url = "https://"+self.server+'/'+topic+"/"+lesson+"/" # https://saltlibrary.azurewebsites.net/Python/Basics_Of_Python/
        self.cDir = os.getcwd()
        self.u = " \ "
        self.u = self.u.replace(' ', '')

        self.cDirF = self.cDir.replace(self.u, '/')


        #We're on linux?


        self.manifestFileSys = self.cDirF+"/lessons/manifest.json" #Path to manifest
        self.path = self.cDirF+"/lessons/"+topic+"/"+lesson+"/"
        self.isPath = os.path.isdir(self.path)
        if(self.isPath==True):
            pass
        if(self.isPath==False):
            os.mkdir(self.cDirF+"/lessons/"+topic+"/")
            os.mkdir(self.cDirF+"/lessons/"+topic+"/"+lesson+"/")
        with open(self.manifestFileSys, "r") as jsonFile:
            jsonData = json.load(jsonFile)
        try:
            for items in jsonData[topic][lesson]:
                if(jsonData[topic][lesson][items] != None):
                    if(items != "description"):
                        self.path2 = self.path + str(jsonData[topic][lesson][items])
                        #print(self.url+str(jsonData[topic][lesson][items]))
                        self.file = urllib.request.urlretrieve(self.url+str(jsonData[topic][lesson][items]), self.path2)
            return 0
        except:
            return 1
class proc:
    def __init__(self):
        x = """
        This is the proccessing class, where we take input from library and check it for commands
        """
    def checkInput(self, data):

        data= data.replace("\n", '') # remove the new line that gets added from JS

        self.command, self.args = data.split('#')
        if(self.command=='checkInternet()'):
            #check if we have connection to the internet. er really google lol
            self.com = commands()
            self.output = self.com.checkInternet()
            return self.output
        if(self.command=='checkCloudConnection()'):
            #check if we can connect to our cloudHost
            self.com = commands()
            self.output = self.com.checkCloudConnection()
            return self.output
        if(self.command=="checkForUpdates()"):
            #Check the package.json(s) to see if theyre akin, if not update program, if so pass
            self.com = commands()
            self.output = self.com.checkForUpdates()
            return self.output
        if(self.command=="updateFiles()"):
            self.com = commands()
            self.output = self.com.updateFiles()
            return self.output
        if(self.command=="writeFirstOpen()"):
            #opens package.json and tells the script that the program has already been started
            self.com = commands()
            self.output = self.com.writeFirstOpen()
            return self.output #returns 0 if json was written.
        if(self.command=="checkForFirstOpen()"):
            self.com = commands()
            self.output = self.com.checkForFirstOpen()
            return self.output
        if(self.command=='checkManifest()'):
            #In this case the command `arg` is null --  checkManifest()#none is the input
            self.com = commands()
            self.output = self.com.checkManifest()
            return self.output
        if(self.command=='downloadManifest()'):
            #downloadManifest()#none is the input
            self.com = commands()
            self.output = self.com.downloadManifest()
            return self.output
        if(self.command=='getManifestData()'):
            #getManifestData()#none is the input
            self.com = commands()
            self.output = self.com.readManifest()
            return self.output
        if(self.command=="checkForLesson()"):
            self.com = commands()
            self.output = self.com.checkLesson(self.args)
            return self.output
        if(self.command=="downloadLesson()"):
            #downloadLesson()#python:basics
            self.com = commands()
            self.output = self.com.downloadLesson(self.args)
            return self.output

libInput = sys.stdin.readline()

procC = proc() #The data processing class
output = procC.checkInput(libInput)
print(output)
sys.exit()
