"""
This is the python client for library, within we will have every function the program needs to run C:
"""
import sys
import glob
import json
import os
import urllib.request
class commands:
    def __init__(self):
        x = """
        This is the commands class where we run commands given to us via Library
        """
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
        self.server = "127.0.0.1" #Local host for now due to testing
        self.url = "http://"+self.server+"/lessons/manifest.json"
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
        self.server = "127.0.0.1" #Local host for now due to testing
        topic, lesson  = lessonName.split(":")

        self.url = "http://"+self.server+"/lessons/"+topic+"/"+lesson+"/"
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
                    print(self.url+str(jsonData[topic][lesson][items]))
                    self.path2 = self.path + str(jsonData[topic][lesson][items])
                    print(self.path2)
                    self.file = urllib.request.urlretrieve(self.url+str(jsonData[topic][lesson][items]), self.path2)
            return jsonData[topic][lesson]["main"]
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
            #downloadLesson()
            self.com = commands()
            self.output = self.com.downloadLesson(self.args)
            return self.output
libInput = sys.stdin.readline()

procC = proc() #The data processing class
output = procC.checkInput(libInput)
print(output)
sys.exit()
