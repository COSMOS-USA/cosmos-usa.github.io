'use strict';

function firstScreen() {
  return `
    <div class="container">
        <h1>Dog API: Randomizer</h1>

        <form id = "dog-form">
          <p>Select a number from 3 to 50:</p>
          <input type="text" class= "numbers" id = "num-dog" size="3" name="num" min="3" max="50" value="3">
          <input type="submit" value="Get a dog pic!">
        </form>`
}
function mainRender() {
  const mainRender = firstScreen();
  $('body').html(firstScreen())
}

$(function() {
  console.log('App loaded! Waiting for submit!');
  mainRender();
  watchUserInput();
});

function watchUserInput() {
  $('form').submit(e => {
    e.preventDefault();
    let counts = $("input[class=numbers]").val();
    //Pass the number value to getDogImage
    getDogImage(counts);
  });
}

function getDogImage(counts) {
if (counts < 3) {
    fetch('https://dog.ceo/api/breeds/image/random/3')
    .then(response => response.json())
    .then(responseJson => 
    displayResults(responseJson))
    .catch(error => alert('Something went wrong. Try again later.'));
} else if (counts > 50) {
return alert("Please choose a number equal or less than 50");
} else {
    fetch(`https://dog.ceo/api/breeds/image/random/${counts}`)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson));
  }
  console.log(counts)
  $('.container').addClass('hidden')
}

function resultScreen() {
return `<h3>Look at these beautiful dogs!</h3>
  <div class="results"> 
   <section class="results">
     <h2>Look at this dog!</h2>
     <img class="results-img" alt="placeholder">
   </section>
  </div>`
}
function resultRender() {
  const secresultRenderondRender = resultScreen();
  $('body').html(resultScreen())
}

function displayResults(responseJson) {
  console.log(responseJson);
  resultRender();
  $(".results").html("");
  responseJson.message.forEach(renderedImg => {
    $(".results").append(`<img src="${renderedImg}" class="results">`);
  });
  //display the results section
}
