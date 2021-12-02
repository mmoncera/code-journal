/* global data */
/* exported data */

var $photoUrl = document.getElementById('photo-url');
var $image = document.querySelector('.image');

$photoUrl.addEventListener('input', function (event) {
  $image.src = event.target.value;
});
