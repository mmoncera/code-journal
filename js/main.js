/* global data */
/* exported data */

var $photoUrl = document.getElementById('photoUrl');
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

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.setAttribute('class', 'row entry');

  var $entryPhotoContainer = document.createElement('div');
  $entryPhotoContainer.setAttribute(
    'class',
    'column-half entry-photo-container'
  );

  var $entryPhoto = document.createElement('img');
  $entryPhoto.setAttribute('class', 'photo-preview entry-photo');
  $entryPhoto.setAttribute('src', entry.photoUrl);
  $entryPhoto.setAttribute('alt', 'placeholder image');

  var $entryInformationContainer = document.createElement('div');
  $entryInformationContainer.setAttribute(
    'class',
    'column-half entry-information-container'
  );

  var $entryTitle = document.createElement('h2');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.textContent = entry.title;

  var $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'entry-notes');
  $entryNotes.textContent = entry.notes;

  $entry.append($entryPhotoContainer, $entryInformationContainer);
  $entryPhotoContainer.appendChild($entryPhoto);
  $entryInformationContainer.append($entryTitle, $entryNotes);

  return $entry;
}

// Test to see if it displays in DOM
var example = {
  title: 'JavaScript',
  photoUrl:
    'https://images.unsplash.com/photo-1619410283995-43d9134e7656?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8amF2YXNjcmlwdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
  notes:
    'This is challenging and fun. Learning a lot and looking forward to more!!!'
};

var $entriesContainer = document.querySelector('.entries-container');

$entriesContainer.appendChild(renderEntry(example));
