/* global data */
/* exported data */

var $photoUrl = document.getElementById('photo-url');
var $photoPreview = document.querySelector('.photo-preview');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = event.target.value;
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
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
});
