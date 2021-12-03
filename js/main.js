/* global data */
/* exported data */

var $photoUrl = document.getElementById('photo-url');
var $image = document.querySelector('.image');

$photoUrl.addEventListener('input', function (event) {
  $image.src = event.target.value;
});

var $form = document.querySelector('.form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photoUrl.value,
    notes: $form.elements.notes.value,
    nextEntryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entry);
  $image.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
