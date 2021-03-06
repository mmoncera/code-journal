/* global data */
/* exported data */

/*
************************************************
DOM Nodes
************************************************
*/
var $newEntry = document.querySelector('.new-entry');
var $editEntry = document.querySelector('.edit-entry');
var $photoUrl = document.getElementById('photoUrl');
var $photoPreview = document.querySelector('.photo-preview');
var $form = document.querySelector('.form');
var $entriesContainer = document.querySelector('.entries-container');
var $noEntry = document.querySelector('.no-entry');
var $entriesNav = document.querySelector('.entries-nav');
var $newFormButton = document.querySelector('.new-form-button');
var $entryFormView = document.querySelector('[data-view="entry-form"]');
var $entriesView = document.querySelector('[data-view="entries"]');
var $saveButtonContainer = document.querySelector('.save-button-container');
var $deleteEntryButtonContainer = document.querySelector(
  '.delete-entry-button-container'
);
var $deleteEntryButton = document.querySelector('.delete-entry-button');
var $modal = document.querySelector('.modal');
var $cancelButton = document.querySelector('.cancel-button');
var $confirmButton = document.querySelector('.confirm-button');

/*
************************************************
Utility Functions
************************************************
*/
function renderEntry(entry) {
  /*
  <li class="row entry" data-entry-id=`${entry.id}`>
    <div class="column-half entry-photo-container">
      <img
        class="entry-photo"
        src=`${entry.photoUrl}`
        alt="entry image"
      />
    </div>
    <div class="column-half entry-information-container">
      <div class="row info-row-1">
        <div class="column-full title-edit-container">
          <h2 class="entry-title">`${entry.title}`</h2>
          <i class="fas fa-pen entry-edit-icon"></i>
        </div>
      </div>
      <div class="row info-row-2">
        <div class="column-full notes-container">
          <p class="entry-notes">`${entry.notes}`</p>
        </div>
      </div>
    </div>
  </li>
  */

  var $entry = document.createElement('li');
  $entry.setAttribute('class', 'row entry');
  $entry.setAttribute('data-entry-id', entry.id);

  var $entryPhotoContainer = document.createElement('div');
  $entryPhotoContainer.setAttribute(
    'class',
    'column-half entry-photo-container'
  );

  var $entryPhoto = document.createElement('img');
  $entryPhoto.setAttribute('class', 'entry-photo');
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

function addRemoveHidden(activeElement, hiddenElement) {
  activeElement.classList.remove('hidden');
  hiddenElement.classList.add('hidden');
}

function resetNewEntry() {
  data.editing = null;
  $photoPreview.src = 'images/placeholder-image-square.jpg';
  $form.reset();
}

function swapDataView(dataView) {
  if (dataView === 'entry-form') {
    addRemoveHidden($entryFormView, $entriesView);
    addRemoveHidden($newEntry, $editEntry);
    addRemoveHidden($saveButtonContainer, $deleteEntryButtonContainer);
    data.view = 'entry-form';
    resetNewEntry();
  }
  if (dataView === 'entries') {
    addRemoveHidden($entriesView, $entryFormView);
    if (data.entries.length === 0) {
      $noEntry.classList.remove('hidden');
    } else {
      $noEntry.classList.add('hidden');
    }
    data.view = 'entries';
    resetNewEntry();
  }
  if (dataView === 'editing') {
    var editingEntry = data.entries.find(function (element) {
      return element.id === data.editing.id;
    });
    addRemoveHidden($entryFormView, $entriesView);
    addRemoveHidden($editEntry, $newEntry);
    addRemoveHidden($deleteEntryButtonContainer, $saveButtonContainer);
    $form.elements.title.value = editingEntry.title;
    $form.elements.photoUrl.value = editingEntry.photoUrl;
    $photoPreview.src = editingEntry.photoUrl;
    $form.elements.notes.value = editingEntry.notes;
    data.view = 'editing';
  }
}

/*
************************************************
Event Listener Handlers
************************************************
*/
function handleUpdatePhotoUrl(event) {
  $photoPreview.src = event.target.value;
  if ($photoUrl.value === '') {
    $photoPreview.src = 'images/placeholder-image-square.jpg';
  }
}

function handleSubmitForm(event) {
  event.preventDefault();
  if (data.editing !== null) {
    var $editEntryDataEntryId = document.querySelector(
      `[data-entry-id="${data.editing.id}"]`
    );
    var editingEntryIndex = data.entries.findIndex(function (element) {
      return element.id === data.editing.id;
    });
    data.editing.title = $form.elements.title.value;
    data.editing.photoUrl = $form.elements.photoUrl.value;
    data.editing.notes = $form.elements.notes.value;
    $editEntryDataEntryId.replaceWith(renderEntry(data.editing));
    data.entries[editingEntryIndex] = data.editing;
  } else {
    var entry = {
      title: $form.elements.title.value,
      photoUrl: $form.elements.photoUrl.value,
      notes: $form.elements.notes.value,
      id: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entry);
    $entriesContainer.prepend(renderEntry(entry));
  }
  swapDataView('entries');
}

function handleLoadDomContent(event) {
  for (let index = 0; index < data.entries.length; index++) {
    var element = renderEntry(data.entries[index]);
    $entriesContainer.appendChild(element);
  }
  swapDataView(data.view);
}

function handleViewNewForm(event) {
  swapDataView('entry-form');
}

function handleViewEntries(event) {
  swapDataView('entries');
}

function handleViewEditForm(event) {
  if (event.target && event.target.matches('.entry-edit-icon')) {
    var $closestDataEntryId = event.target.closest('[data-entry-id]');
    var editingEntry = data.entries.find(function (element) {
      return String(element.id) === $closestDataEntryId.dataset.entryId;
    });
    data.editing = editingEntry;
    swapDataView('editing');
  }
}

function handleAddModalView() {
  $modal.classList.remove('hidden');
}

function handleRemoveModalView() {
  $modal.classList.add('hidden');
}

function handleConfirmDeletion() {
  var deleteEntryIndex = data.entries.findIndex(function (element) {
    return element.id === data.editing.id;
  });
  var $deleteEntryDataEntryId = document.querySelector(
    `[data-entry-id="${data.editing.id}"]`
  );
  data.entries.splice(deleteEntryIndex, 1);
  $deleteEntryDataEntryId.remove();
  $modal.classList.add('hidden');
  swapDataView('entries');
}

/*
************************************************
Event Listners
************************************************
*/
$photoUrl.addEventListener('input', handleUpdatePhotoUrl);
$form.addEventListener('submit', handleSubmitForm);
window.addEventListener('DOMContentLoaded', handleLoadDomContent);
$newFormButton.addEventListener('click', handleViewNewForm);
$entriesNav.addEventListener('click', handleViewEntries);
$entriesContainer.addEventListener('click', handleViewEditForm);
$deleteEntryButton.addEventListener('click', handleAddModalView);
$cancelButton.addEventListener('click', handleRemoveModalView);
$confirmButton.addEventListener('click', handleConfirmDeletion);
