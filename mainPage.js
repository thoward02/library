//mainPage.js -- controls the main html page
const {ipcRenderer} = require('electron');
var sys = require('sys');
var exec = require('child_process').exec;
function startUp(){

  document.getElementById('startPage').style.display = "block"
  document.getElementById('libTitle').style.display = "block"
  try{document.getElementById('body').style.display="none";}
  catch(error){pass}
  //Here is where we will be adding the intro page for Library
  document.getElementById('start').addEventListener('click', function(){
    try {clearInterval(rcolor);}
    catch(error){}
    try{clearInterval(bcolor);}
    catch(error){}
    var writeFirstOpen = exec("py pythonClient.py");
    writeFirstOpen.stdin.write("writeFirstOpen()#none"+"\n");
    document.getElementById('startPage').style.display = "none";
    document.getElementById('body').style.display = "block";
    document.getElementById('libTitle').style.display = "none";
    main();
  })
}
function main() {
  //check for a manifest.json for downloaded lessons
  try{document.getElementById('startPage').style.display = "none";}
  catch(error){} //I put the display seperate because I could see it tossing another error
  document.getElementById('body').style.display = "block";
  document.getElementById('libTitle').style.display = "none";
  try{document.getElementById('start').remove();document.getElementById('libTitle').remove();}
  catch(error){}
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
        //data = JSON.stringify(data);
        var mainDiv = document.getElementById("mainCont")
        //mainDiv.id = "mainDiv"
        //make our main div
        var mainButDiv = document.createElement("div")
        mainDiv.appendChild(mainButDiv)
        var topicDiv = document.createElement("div")
        topicDiv.id = "topicDiv"
        topicDiv.style.margin = "10%"; //To pull the elements away from the wall <3
        mainButDiv.appendChild(topicDiv)

        for (var topics in data){


          //each topics in this list is a topic we have
          //Buttons

          //Make our topics div
          console.log(topics)
          var button = document.createElement("div")
          button.className = "buttonsL"
          button.style.marginTop = "10px";
          button.style.marginLeft = "2%";
          var butttonTextDiv = document.createElement('div')
          var butttonText = document.createElement('p')
          butttonText.style.textAlign = "center"
          butttonText.style.fontWeight = "bold";
          butttonTextDiv.appendChild(butttonText);
          butttonText.innerHTML = topics
          var buttonImage = document.createElement('img')
          buttonImage.src = "assets/"+topics+".png"
          buttonImage.style.height = "50%";
          buttonImage.style.width = "66.666666%"
          buttonImage.style.paddingLeft = "25px"

          topicDiv.appendChild(button);
          button.appendChild(butttonText);
          button.appendChild(buttonImage)
          button.id = topics
          var lessonsDiv = document.createElement("div")
          lessonsDiv.id = topics+"lessonsDiv"
          lessonsDiv.style.display = "none"
          topicDiv.appendChild(lessonsDiv)
          button.addEventListener("click",  function(y, x = this.id){
            console.log('started')
            var body = document.createElement("div");
            //body == The black background C;
            document.getElementById('body').style.position =  "absolute";
            document.getElementById('body').style.width = "100%";
            document.getElementById('body').style.zIndex = "-3";
            document.body.style.overflowX = "hidden";

            document.body.appendChild(body);
            body.style.zIndex = "2";
            body.style.width = "100%";
            body.style.height = "100%"
            body.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
            //body.style.position = "relative";
            body.style.left = "0"
            body.style.marginTop = "20px"
            body.style.paddingTop = "50px"
            body.style.display = "block";
            //create content div
            var cBody = document.createElement("div");
            cBody.id = "cBody"
            body.appendChild(cBody);
            cBody.style.width = "90%";
            cBody.style.height = "80%";
            cBody.style.overflowY = "auto"
            cBody.style.backgroundColor = "#1e3137";
            cBody.style.margin = "5%";
            cBody.style.marginTop = "0%";

            //Fill Div
            var topContent = document.createElement("div");
            cBody.appendChild(topContent);
            topContent.style.margin = "0px";
            topContent.style.width  = "100%";
            var exitButton = "<div style='width:100%;'><svg id='exitDiv' class= 'systemButtons'height='20' width='20'><circle id='exit'cx='10'cy='10' r='10' stroke-color='red' width='3' fill='red' /></svg></div>"
            cBody.innerHTML = exitButton;
            var exitButton = document.getElementById("exitDiv");
            exitButton.style.zIndex = '5'
            exitButton.style.padding = "5px";
            exitButton.style.float = "left";
            exitButton.style.position = "relative"
            exitButton.addEventListener('click', function(){console.log('exiting');cBody.remove();body.remove();document.getElementById('body').style.zIndex = "1";});//
            var title = document.createElement("div")
            title.id = "lessonTitle"
            title.innerHTML = x
            title.style.position = "relative"
            title.style.zIndex = "4";
            title.style.paddingTop = "0"
            title.style.letterSpacing = "10px";
            title.style.fontWeight = "bold";
            title.style.fontSize = "50px";
            title.style.width = "60%"
            title.style.marginLeft = "20%";
            title.style.marginTop = "26px";
            title.style.color = "#337d99"
            title.style.textAlign = "center";
            title.style.fontFamily = "Kiona"
            cBody.appendChild(title)
            var tDetail = document.createElement("div"); //Why use divs? Less hassel with that new line and formatting that <p> gives us. Don't ask, but just switch things around and see how it looks with <p> instead of div
            tDetail.innerHTML = data[x]["data"]["description"];
            tDetail.style.textAlign = "center";
            tDetail.style.padding = "2%";
            tDetail.style.fontSize = "20px";
            tDetail.style.fontFamily = "Comfortaa";
            cBody.appendChild(tDetail);
            var lnBrk = document.createElement('hr')
            cBody.appendChild(lnBrk);
            lnBrk.style.width = "80%"
            lnBrk.style.color = "#337d99"
            dataDiv = document.createElement("div");
            document.getElementById('cBody').appendChild(dataDiv);
            // Add main content

            for (var lessons in data[x]) {
              //console.log(lessons)
              if(lessons=="data"){try{}catch(error){}}//I did this so we can skip the data blocks
              else{
                lessonStripped = lessons.replace(/_/g, " ")
                //console.log(lessons) Use this var to pull data from manifest
                //var cBody = document.getElementById("cBody");
                //Create the div for the lesson
                var lessonDiv = document.createElement("div");
                cBody.appendChild(lessonDiv)

                //Populate Div
                var lessonTitles = document.createElement('p')
                lessonDiv.appendChild(lessonTitles)
                lessonTitles.innerHTML = lessonStripped;
                lessonTitles.style.fontWeight = "bold";
                lessonTitles.style.fontSize = "25px";
                lessonTitles.style.paddingLeft = "10px";
                lessonTitles.style.textDecoration = "underline";
                var lessonDetails = document.createElement("p")
                lessonDiv.appendChild(lessonDetails);
                lessonDetails.innerHTML = data[x][lessons]["description"];
                lessonDetails.style.paddingLeft = "10px";
                lessonDetails.style.fontSize = "20px";
                lessonDetails.style.fontFamily = "Comfortaa";
                var button = document.createElement("button")

                button.id = x+":"+lessons
                button.className = "lessonButtons"
                button.addEventListener('click', function(x, name = this.id){
                  //When lesson button clicked, load download//open page
                  document.getElementById('cBody').remove()
                  var cBody = document.createElement("div");
                  cBody.id = "cBody"
                  body.appendChild(cBody);
                  body.style.paddingTop = "0px";
                  cBody.style.width = "100%";
                  cBody.style.height = "100%";
                  cBody.style.overflowY = "auto"
                  cBody.style.backgroundColor = "#1e3137";
                  cBody.style.margin = "0";
                  //Create text
                  var text = document.createElement('p')
                  text.style.textAlign = "center";
                  text.style.fontSize = "20px";
                  text.style.paddingTop = "22%"
                  text.style.fontWeight = "bold";
                  cBody.appendChild(text)
                  //Tell the user we're loading

                  var nameStripped = name.replace(/_/g, " ")
                  var nameStripped = nameStripped.replace(/:/g, " ")
                  text.innerHTML = "Loading "+nameStripped
                  var checkForLesson = exec("py pythonClient.py");
                  checkForLesson.stdout.on('data', function(data){
                    //Check if the lesson is on disk
                    if(data==0){
                      // The lesson is on file
                      checkForLesson.stdout.end()
                      //open lesson "name"
                      var lessonData = name.split(":")
                      var topic = lessonData[0]
                      var lesson = lessonData[1]
                      //console.log('switching windows')

                      ipcRenderer.send("loadLesson()", topic, lesson)
                    }
                    if(data==1){

                      //The lesson is not on file and needs to be downloaded
                      text.innerHTML = "You don't have this topic on disk, would you like to download it?"
                      buttonDivs = document.createElement("div")
                      cBody.appendChild(buttonDivs)
                      //yes
                      yesButton = document.createElement('div')
                      yesButton.innerHTML = "Yes"
                      yesButton.className = "buttons"
                      buttonDivs.appendChild(yesButton)
                      yesButton.addEventListener("click", function(){
                        var downloadLesson = exec("py pythonClient.py")
                        downloadLesson.stdout.on('data', function(data){
                          //Downloading the lesson
                          console.log("data");
                          if(data == 1) {
                            text.innerHTML = "There was an error downloading the lessons!"
                          }else {
                            text.innerHTML = "Lesson downloaded, loading the lesson now!"
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
                        text.innerHTML = "Downloading your lesson please wait"
                        console.log("downloadLesson()#"+name)
                        downloadLesson.stdin.write("downloadLesson()#"+name+"\n")

                      });

                      //no
                      noButton = document.createElement('div')
                      noButton.innerHTML = "No"
                      buttonDivs.appendChild(noButton)
                      noButton.className = "buttons"
                      noButton.addEventListener("click", function(){
                        cBody.remove()
                        body.remove()
                        document.getElementById('body').style.zIndex = "4"
                      });
                    }
                  });
                  checkForLesson.stdin.write("checkForLesson()#"+name+"\n");
                });
                var nameStripped = lessons.replace(/_/g, " ")
                button.innerHTML = "Load " + nameStripped
                lessonDiv.appendChild(button)

            }
            }
          });
          //Add the foreground
          document.getElementById('body').style.zIndex = "-4";


          //Add the lessons data to the main page


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
