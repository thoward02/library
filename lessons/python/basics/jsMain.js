//jsMain.js
//Controls the main menu for py lessons
const {ipcRenderer} = require('electron');
var sys = require('sys');
var exec = require('child_process').exec;

function main(){
  //Add our menu button function
  document.getElementById('mainMenu').addEventListener('click', function(){
    ipcRenderer.send('main()'); //Sends us back to the main menu
  });
  //Now we load our lesson buttons
  //See we could write a loop to add a button for each lesson, but that would add complications that we don't need :C
  var lesson1 = ['Basics', 'pythonBasics.html']
  var lesson2 = ['Functions', 'pythonFunctions.html']
  var lesson3 = ['Loops', 'pythonLoops.html']
  var lessons = [lesson1, lesson2, lesson3]
  console.log(lessons[1])
  for (var items in lessons) {
    //lessons[items] -- Gives us the var lessonx where x is the loop number
    var lessonButton = document.createElement("button")
    lessonButton.id = lessons[items][1]
    lessonButton.innerHTML = lessons[items][0]
    document.getElementById("lessons").appendChild(lessonButton)
    //There is a billy joel concert on october the 13 in Salem NC.... I wonder if I can go, always did enjoy Piano Man
    //WHEN I WORE A YOUNGER MANS CLOTHES sorry im bored xd
    lessonButton.addEventListener('click', function(y, name=this.id){
      //Why do you do (y, name=this.id), because we need to transfer lessons[items][0] to this function, but its not working just doing (x = var)
      //So we set the id of the button to the var we need and carry it over using the this.id function.
      //We add y, so name doesn't get overwritten by the click data.
      console.log(name)
      window.location = name; //This will load what ever page they click on xdddddd dear god i need mental help

    })
  }
}




document.addEventListener('DOMContentLoaded',  function(){
  main(); //lets us run code AFTER dom loads :P
  //Here i am stuck in the middle with you -- sorry im bored, listening to stuck in the middle with you
  //You know its a nice song, not my usual type, but it is my father's, hence why I know it
});
