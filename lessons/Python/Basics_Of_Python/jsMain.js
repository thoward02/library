//jsMain.js
//Controls the main menu for py lessons
//Check
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
  var lesson1 = ['Variables', 'Variables_In_Python.html']
  var lesson2 = ['Functions', 'Functions_In_Python.html']
  var lesson3 = ['Loops', 'Loops_In_Python.html']
  var lesson4 = ['Classes', 'Classes_In_Python.html']
  var lessons = [lesson1, lesson2, lesson3, lesson4]

  for (let items in lessons) {
    //lessons[items] -- Gives us the var lessonx where x is the loop number
    let lessonButton = document.createElement('div')
    document.getElementById("lessonButtons").appendChild(lessonButton)
    lessonButton.id = lessons[items][1];
    //To adjust for text centering, i'm going to create a DIV just for text.
    let lessonTitle = document.createElement("div");
    lessonTitle.innerHTML = lessons[items][0];
    lessonTitle.className = "lessonTitle";
    lessonButton.appendChild(lessonTitle);
    lessonButton.className = "buttons";
    //There is a billy joel concert on october the 13 in Salem NC.... I wonder if I can go, always did enjoy Piano Man
    //WHEN I WORE A YOUNGER MANS CLOTHES sorry im bored xd
    lessonButton.addEventListener('click', function(y, name=this.id){
      window.location = name; //This will load what ever page they click on xdddddd dear god i need mental help

    })
  }
}




document.addEventListener('DOMContentLoaded',  function(){
  main(); //lets us run code AFTER dom loads :P
  //Here i am stuck in the middle with you -- sorry im bored, listening to stuck in the middle with you
  //You know its a nice song, not my usual type, but it is my father's, hence why I know it
});
