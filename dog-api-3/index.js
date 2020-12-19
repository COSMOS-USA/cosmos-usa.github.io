'use strict';

function firstScreen() {
  return `
    <div class="container">
        <h1>Dog API: Breed Randomizer</h1>
        <form id = "dog-form">
          <p>Write the breed of the dog:</p>
          <input type="text" class= "breed" id = "num-dog" size="15" name="num" min="3" max="50" placeholder = "e.g. doberman">
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

function getTypeBreed() {
    let breed = $("input[class=breed]").val();
    return breed;
}

function watchUserInput() {
  $('form').submit(e => {
    e.preventDefault();
    let breed = $("input[class=breed]").val();
    getDogImage(breed);
  });
}
function getDogImage(breed) {
  fetch("https://dog.ceo/api/breed/" + getTypeBreed() + "/images/random")
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Hmmm. Cannot find that breed of dog. Try again."));
  console.log(breed)
  $('.container').addClass('hidden')
}

function resultScreen() {
return `<h3>Look at these beautiful dog!</h3>
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
if (responseJson.status !== "success") {
    alert("Ooops. Cannot find that breed of dog. Try again.");
    return mainRender();
  } else if (responseJson.status === "success") {
    $(".results").replaceWith(
      `<img src="${responseJson.message}" class="results">`
    );
  }
}
