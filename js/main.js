/* global data */
/* exported data */

var $newEntry = document.querySelector('.new-entry');
var $editEntry = document.querySelector('.edit-entry');
var $photoUrl = document.getElementById('photoUrl');
var $photoPreview = document.querySelector('.photo-preview');
var $form = document.querySelector('.form');
var $entriesContainer = document.querySelector('.entries-container');
var $noEntry = document.querySelector('.no-entry');
var $entriesNav = document.querySelector('.entries-nav');
var $newButton = document.querySelector('.new-button');
var $entryForm = document.querySelector('[data-view="entry-form"]');
var $entries = document.querySelector('[data-view="entries"]');
var $saveButtonContainer = document.querySelector('.save-button-container');
var $deleteButtonContainer = document.querySelector('.delete-button-container');

$photoUrl.addEventListener('input', function (event) {
  $photoPreview.src = event.target.value;
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  if (data.editing !== null) {
    data.editing.title = $form.elements.title.value;
    data.editing.photoUrl = $form.elements.photoUrl.value;
    data.editing.notes = $form.elements.notes.value;
    var $editEntryDataEntryId = document.querySelector(
      `[data-entry-id="${data.editing.id}"]`
    );
    $editEntryDataEntryId.replaceWith(renderEntry(data.editing));
  } else {
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
  }

  swapViews($entries, $entryForm);
  resetNewEntry();
});

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.setAttribute('class', 'row entry');
  $entry.setAttribute('data-entry-id', entry.id);

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
  $entryEdit.setAttribute('class', 'fas fa-pen entry-edit-icon');

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
  resetNewEntry();
});

$newButton.addEventListener('click', function (event) {
  swapViews($entryForm, $entries);
  swapViews($saveButtonContainer, $deleteButtonContainer);
  resetNewEntry();
});

$entriesNav.addEventListener('click', function (event) {
  swapViews($entries, $entryForm);
  resetNewEntry();
});

function resetNewEntry() {
  swapViews($newEntry, $editEntry);
  data.editing = null;
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
}

function swapViews(activeElement, hiddenElement) {
  activeElement.classList.remove('hidden');
  hiddenElement.classList.add('hidden');
}

$entriesContainer.addEventListener('click', function (event) {
  if (event.target && event.target.matches('.entry-edit-icon')) {
    swapViews($entryForm, $entries);
    swapViews($editEntry, $newEntry);
    swapViews($deleteButtonContainer, $saveButtonContainer);
    var $closestDataEntryId = event.target.closest('[data-entry-id]');
    for (let index = 0; index < data.entries.length; index++) {
      const element = data.entries[index];
      if (String(element.id) === $closestDataEntryId.dataset.entryId) {
        data.editing = element;
        $form.elements.title.value = element.title;
        $form.elements.photoUrl.value = element.photoUrl;
        $photoPreview.src = element.photoUrl;
        $form.elements.notes.value = element.notes;
        break;
      }
    }
  }
});

var $deleteButton = document.querySelector('.delete-button');
var $modal = document.querySelector('.modal');

$deleteButton.addEventListener('click', function () {
  $modal.classList.remove('hidden');
});

var $cancelButton = document.querySelector('.cancel-button');

$cancelButton.addEventListener('click', function (event) {
  $modal.classList.add('hidden');
});
