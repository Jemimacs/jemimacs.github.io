
var deferredPrompt;

if (!window.Promise) {
  window.Promise = Promise;
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(function () {
      console.log('Service worker registered!');
    })
    .catch(function(err) {
      console.log(err);
    });
}

window.addEventListener('beforeinstallprompt', function(event) {
  console.log('beforeinstallprompt fired');
  event.preventDefault();
  deferredPrompt = event;
  // btnAdd.style.display = 'block';
  //showAddToHomeScreen();
  addToHomeScreen2();
  return false;
});

function showAddToHomeScreen() {
  var a2hsBtn = document.querySelector("#install-button");
  a2hsBtn.style.display = "block";
  a2hsBtn.addEventListener("click", addToHomeScreen);
}

function addToHomeScreen() {  
var a2hsBtn = document.querySelector("#install-button");  // hide our user interface that shows our A2HS button
  a2hsBtn.style.display = 'none';  // Show the prompt
  deferredPrompt.prompt();  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice
    .then(function(choiceResult){

  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the A2HS prompt');
  } else {
    console.log('User dismissed the A2HS prompt');
  }

  deferredPrompt = null;

});}

function addToHomeScreen() {  
  if (deferredPrompt) {
    deferredPrompt.prompt();

    deferredPrompt.userChoice.then(function(choiceResult) {
      console.log(choiceResult.outcome);

      if (choiceResult.outcome === 'dismissed') {
        console.log('User cancelled installation');
      } else {
        console.log('User added to home screen');
      }
    });

    deferredPrompt = null;
  }
}

window.addEventListener('appinstalled', (evt) => {
  console.log('a2hs installed');
});


function getData(isbn, i)
{
    fetch('https://openlibrary.org/api/books?bibkeys='+isbn+'&jscmd=data&format=json')
    .then(response => response.json())
    .then(data => {
        let people = data;
        
        // console.log("<a href='"+people[Object.keys(people)].url+"'>Book</a>");
        // console.log(people[Object.keys(people)].url);
        return Object.keys(people).map(function(key) {
            
            //$("#titleOne").html(people[key].title); 
            var $btn_text  = $('#title'+i).find('.ui-collapsible-heading-toggle'),
            $btn_child = $btn_text.find('.ui-collapsible-heading-status');
            $btn_text.text(people[key].title).append($btn_child);

            document.getElementById('image'+i).innerHTML = "<picture>"+
            "<source media='(min-width: 1000px)' srcset=\'"+people[key].cover.large+" 1x'\>"+
            "<source media='(min-width: 500px)' srcset=\'"+people[key].cover.medium+" 1x'\>"+
            "<img style='width: 20vw; box-shadow: 5px 5px 5px grey;' alt='A Medium Picture' src=\'"+people[key].cover.medium+"'\>"+
            "</picture>"
            ;

            var author = document.getElementById('author'+i);
            author.innerHTML = "Author : " + people[key].authors['0'].name;
            // document.getElementById('author'+i).innerHTML = people[key].authors['0'].name;//Author

            var country = document.getElementById('country'+i);
            country.innerHTML = "Country : " + people[key].publish_places['0'].name;
            //document.getElementById('country'+i).innerHTML = people[key].publish_places['0'].name;//Country

            var subject = document.getElementById('subject'+i);
            subject.innerHTML = "Subject : " + people[key].subjects['0'].name;
            //document.getElementById('subject'+i).innerHTML = people[key].subjects['0'].name;//Subject

            var publisher = document.getElementById('publisher'+i);
            publisher.innerHTML = "Publisher : " + people[key].publishers['0'].name;
            //document.getElementById('publisher'+i).innerHTML = people[key].publishers['0'].name;//Publisher

            var notes = document.getElementById('notes'+i);
            notes.innerHTML = "Notes : ";
            notes.innerHTML += typeof(people[key].notes)=="undefined"? "-" : people[key].notes;
            //document.getElementById('notes'+i).innerHTML = typeof(people[key].notes)=="undefined"? "" : people[key].notes;//Notes

            var url = document.getElementById('url'+i);
            url.innerHTML = "Url : " + "<a href='"+people[Object.keys(people)].url+"'>"+people[Object.keys(people)].url+"</a>";
            //document.getElementById('url'+i).innerHTML = "<a href='"+people[Object.keys(people)].url+"'>"+people[Object.keys(people)].url+"</a>";//Url
            });
        });
}
$( document ).ready(function() {
    var isbn = [];
    isbn[0] = "ISBN:9780980200447";
    isbn[1] = "ISBN:9784915512476";
    isbn[2] = "ISBN:9781856136129";
    isbn[3] = "ISBN:9780020442400";
    isbn[4] = "ISBN:9780060890155";
    for (var i = 0; i < isbn.length; i++) { 
        getData(isbn[i], i+1);
    }
});

function modeSwitch() {
    theme='a';
    if($('#page').attr("data-theme") === "a")
    {
        theme = 'b'
    }
//the only difference between this block of code and the same code above is that it doesn't target list-dividers by calling: `.not('.ui-li-divider')`
    $('#page').removeClass('ui-page-theme-a ui-page-theme-b ui-page-theme-c ui-page-theme-d ui-page-theme-e')
              .addClass('ui-page-theme-' + theme)
              .attr('data-theme', theme);
}
