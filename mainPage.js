//mainPage.js -- controls the main html page
const {ipcRenderer} = require('electron');
var sys = require('sys');
var exec = require('child_process').exec;
function startUp(){
  document.getElementById('startPage').style.display = "flex"
  document.getElementById('libTitle').style.display = "block"
  //Here is where we will be adding the intro page for Library
  document.getElementById('start').addEventListener('click', function(){
    try {clearInterval(rcolor);}
    catch(error){console.log(error);}
    try{clearInterval(bcolor);}
    catch(error){console.log(error);}
    var writeFirstOpen = exec("py pythonClient.py");
    writeFirstOpen.stdin.write("writeFirstOpen()#none"+"\n");
    document.getElementById('startPage').style.display = "none";
    document.getElementById('body').style.display = "flex";
    document.body.style.overflowY = "scroll"
    document.getElementById('libTitle').style.display = "none";
    main();
  })
}
function main() {
  //check for a manifest.json for downloaded lessons
  try {
    //Just to check if the elements are still there
    try {clearInterval(rcolor);}
    catch(error){console.log(error);}
    try{clearInterval(bcolor);}
    catch(error){console.log(error);}
    try{document.getElementById('startPage').style.display = "none";}
    catch(error){console.log(error)} //I put the display seperate because I could see it tossing another error
    document.getElementById('body').style.display = "flex";
    document.body.style.overflowY = "scroll"
    document.getElementById('libTitle').style.display = "none";
  }
  catch(error){
    console.log(error);
  }
  var checkForLessons = exec("py pythonClient.py"); //On windows we can change this out to a compiled .exe of the program later -- We don't need to check if it fails or not really :shrug:
  checkForLessons.stdout.on('data', function(data){
    if(data==1) {
      // There is no manifest implying either the user deleted it like a dick (or is forcing the program to reinstall it) or this is a first run of the Program
      // lets just tell the user there is no manifest and ask if he wants to download it
      document.getElementById('details').innerHTML = "You don't seem to have a manifest.\n Let us download one from our servers!";
      document.getElementById('main').innerHTML = "Manifest";
      checkForLessons.stdout.end(); //End the old pythonClient since we're done with it ((we ended it on the python side, but we're gonna do it again juuuuuust to make sure))
      var downloadManifest = exec("py pythonClient.py");
      downloadManifest.stdout.on("data", function(data){
        if(data==0){
          location.reload();
        }
        if(data==1){
          document.getElementById("main").innerHTML = "Oh no"
          document.getElementById("details").innerHTML = "We failed to download the manifest"
        }
      });
      downloadManifest.stdin.write("downloadManifest()#none"+"\n")
    }
    if(data==0){
      checkForLessons.stdout.end();
      document.getElementById("details").innerHTML = "Loading the Manifest"
      var getManifestData = exec("py pythonClient.py");
      getManifestData.stdout.on('data', function(data){

        data = JSON.parse(data)
        var mainDiv = document.getElementById("mainCont")
        //mainDiv.id = "mainDiv"
        //make our main div
        var mainButDiv = document.createElement("div")
        mainDiv.appendChild(mainButDiv)

        for (var topics in data){

          //each topics in this list is a topic we have
          var topicDiv = document.createElement("div")
          topicDiv.id = "topicDiv"
          mainButDiv.appendChild(topicDiv)
          //Buttons

          //Make our topics div

          var button = document.createElement("button")
          topicDiv.appendChild(button);
          button.innerHTML = topics
          button.id = topics
          button.className = "buttonsL"
          var lessonsDiv = document.createElement("div")
          lessonsDiv.id = topics+"lessonsDiv"
          lessonsDiv.style.display = "none"
          topicDiv.appendChild(lessonsDiv)
          button.addEventListener("click",  function(y, x = this.id){

            x = x + "lessonsDiv"

            if(document.getElementById(x).style.display=="none"){
              document.getElementById(x).style.display = "block";


            }else {
              document.getElementById(x).style.display = "none";

            }
          });



          //Add the lessons buttons

          for (var lessons in data[topics]) {
            var buttonDiv = document.createElement('div')
            lessonsDiv.appendChild(buttonDiv)

            var button = document.createElement("button")
            button.id = topics+":"+lessons
            button.className = "lessonButtons"
            button.addEventListener('click', function(x, name = this.id){
              //Get rid of the buttons
              var myElements = document.querySelectorAll(".buttonsL");
              for (var i = 0; i < myElements.length; i++) {
                myElements[i].style.visibility = "hidden" // So we can load the new page, and if they choose to go back we can re pull it up
              }
              var myElements = document.querySelectorAll(".lessonButtons");
              for (var i = 0; i < myElements.length; i++) {
                myElements[i].style.visibility = "hidden" // So we can load the new page, and if they choose to go back we can re pull it up
              }
              var nameStripped = name.replace(/_/g, " ")

              document.getElementById("main").innerHTML = "Loading "+nameStripped
              var checkForLesson = exec("py pythonClient.py");
              checkForLesson.stdout.on('data', function(data){
                if(data==0){
                  checkForLesson.stdout.end()
                  //open lesson "name"
                  var lessonData = name.split(":")
                  var topic = lessonData[0]
                  var lesson = lessonData[1]
                  //console.log('switching windows')
                  ipcRenderer.send("loadLesson()", topic, lesson)
                }
                if(data==1){

                  document.getElementById('main').innerHTML = "You don't have this topic on disk, would you like to download it?"
                  buttonDivs = document.createElement("div")
                  document.getElementById('mainCont').appendChild(buttonDivs) //need to change this
                  //yes
                  yesButton = document.createElement('button')
                  yesButton.innerHTML = "Yes"
                  yesButton.className = "buttons"
                  buttonDivs.appendChild(yesButton)
                  yesButton.addEventListener("click", function(){
                    var downloadLesson = exec("py pythonClient.py")
                    downloadLesson.stdout.on('data', function(data){
                      console.log("data");
                      if(data == 1) {
                        document.getElementById("main").innerHTML = "There was an error downloading the lessons!"
                      }else {
                        document.getElementById("main").innerHTML = "Lesson downloaded, loading the lesson now!"
                        var lessonData = name.split(":")
                        var topic = lessonData[0]
                        var lesson = lessonData[1]
                        ipcRenderer.send("loadLesson()", topic, lesson);
                      }
                    });
                    var myElements = document.querySelectorAll(".buttons");
                    for (var i = 0; i < myElements.length; i++) {
                      myElements[i].style.visibility = "hidden" // So we can load the new page, and if they choose to go back we can re pull it up
                    }
                    document.getElementById("main").innerHTML = "Downloading your lesson please wait"
                    document.getElementById("details").innerHTML = "..."
                    downloadLesson.stdin.write("downloadLesson()#"+name+"\n")

                  });
                  //no
                  noButton = document.createElement('button')
                  noButton.innerHTML = "No"
                  document.getElementById('mainCont').appendChild(noButton)
                  noButton.className = "buttons"
                  noButton.addEventListener("click", function(){
                    location.reload(); //Just sends us back to the start
                  });

                }
              });
              checkForLesson.stdin.write("checkForLesson()#"+name+"\n");
            });
            var nameStripped = lessons.replace(/_/g, " ")
            button.innerHTML = nameStripped
            buttonDiv.appendChild(button)

          }
          document.getElementById("main").innerHTML = "Topics"
          document.getElementById('details').innerHTML = "Click on a topic to look at its avalible lessons"
        }
      });
      getManifestData.stdin.write("getManifestData()#none"+"\n")
    }
  });
  checkForLessons.stdin.write("checkManifest()#none"+"\n"); //Sends the command to the client

}
document.addEventListener('DOMContentLoaded', function() {
  var checkForFirstOpen = exec("py pythonClient.py");
  checkForFirstOpen.stdout.on('data', function(data){
    console.log(data)
    if(data==0) {
      //Run through first run
      startUp();
    }
    if(data==1) {
      //Run through main without start up
      main()
    }
  });
  checkForFirstOpen.stdin.write("checkForFirstOpen()#none"+"\n");

});
