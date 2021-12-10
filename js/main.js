/* global data */
/* exported data */

var $photoUrl = document.getElementById('photoUrl');
var $photoPreview = document.querySelector('.photo-preview');
var $form = document.querySelector('.form');
var $entriesContainer = document.querySelector('.entries-container');
var $noEntry = document.querySelector('.no-entry');
var $entriesNav = document.querySelector('.entries-nav');
var $formButton = document.querySelector('.form-button');
var $entryForm = document.querySelector('[data-view="entry-form"]');
var $entries = document.querySelector('[data-view="entries"]');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = event.target.value;
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();
  var entry = {
    title: $form.elements.title.value,
    photoUrl: $form.elements.photoUrl.value,
    notes: $form.elements.notes.value,
    id: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.unshift(entry);

  $noEntry.classList.add('hidden');
  $entriesContainer.prepend(renderEntry(entry));
  $entries.classList.remove('hidden');
  $entryForm.classList.add('hidden');

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
  $entryPhoto.setAttribute('alt', 'entry image');

  var $entryInformationContainer = document.createElement('div');
  $entryInformationContainer.setAttribute(
    'class',
    'column-half entry-information-container'
  );

  var $infoRow1 = document.createElement('div');
  $infoRow1.setAttribute('class', 'row info-row-1');

  var $titleEditContainer = document.createElement('div');
  $titleEditContainer.setAttribute('class', 'column-full title-edit-container');

  var $entryTitle = document.createElement('h2');
  $entryTitle.setAttribute('class', 'entry-title');
  $entryTitle.innerText = entry.title;

  var $entryEdit = document.createElement('i');
  $entryEdit.setAttribute('class', 'fas fa-pen entry-edit');

  var $infoRow2 = document.createElement('div');
  $infoRow2.setAttribute('class', 'row info-row-2');

  var $notesContainer = document.createElement('div');
  $notesContainer.setAttribute('class', 'column-full notes-container');

  var $entryNotes = document.createElement('p');
  $entryNotes.setAttribute('class', 'entry-notes');
  $entryNotes.innerText = entry.notes;

  $entry.append($entryPhotoContainer, $entryInformationContainer);
  $entryPhotoContainer.appendChild($entryPhoto);
  $entryInformationContainer.append($infoRow1, $infoRow2);
  $infoRow1.appendChild($titleEditContainer);
  $titleEditContainer.append($entryTitle, $entryEdit);
  $infoRow2.appendChild($notesContainer);
  $notesContainer.appendChild($entryNotes);

  return $entry;
}

window.addEventListener('DOMContentLoaded', function (event) {
  if (data.entries.length > 0) {
    $noEntry.classList.add('hidden');
  }

  for (let index = 0; index < data.entries.length; index++) {
    var element = renderEntry(data.entries[index]);
    $entriesContainer.appendChild(element);
  }
});

$formButton.addEventListener('click', function (event) {
  $entryForm.classList.remove('hidden');
  $entries.classList.add('hidden');
});

$entriesNav.addEventListener('click', function (event) {
  $entries.classList.remove('hidden');
  $entryForm.classList.add('hidden');
});
