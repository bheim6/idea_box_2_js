$(document).ready( function() {
  addIdeas();
});

function addIdeas() {
  $.getJSON("/api/v1/ideas")
  .then(function(allIdeas){
    allIdeas.forEach(renderIdea);
  })
  .then(attachDeleteEvent)
  .then(attachEditEvent)
  .then(attachQualityEvents)
  .then
  .fail(displayFailure)
}

function renderIdea(idea) {
  $("#ideas-list").append(`<div class='idea' data-id='${idea.id}'>
                            <p class='idea-data-title'>${ idea.title.toUpperCase()}</p>
                            <p class='idea-data-body'>${idea.body}</p>
                            <p data-id='${idea.id}' >
                            <button class="upgrade-quality">+</button>
                            <button class="downgrade-quality">-</button>
                            <span>${idea.quality}</span>
                            <button class='delete-idea'>Bad Idea</button>
                            </p>
                          </div>`)
}

function attachQualityEvents() {
  $(".upgrade-quality").on("click", upgradeQuality)
  $(".downgrade-quality").on("click", downgradeQuality)
}

function upgradeQuality() {
  var id = $(this).closest(".idea").data('id');

  var quality = $(this).siblings("span").text();
  if (quality === "swill") {quality = "plausible"}
  else if (quality === "plausible") {quality = "genius"}

  $(this).siblings("span").text(quality);

  updateQuality(quality, id);
}

function downgradeQuality() {
  var id = $(this).closest(".idea").data('id');

  var quality = $(this).siblings("span").text();
  if (quality === "genius") {quality = "plausible"}
  else if (quality === "plausible") {quality = "swill"}

  $(this).siblings("span").text(quality);

  updateQuality(quality, id);
}

function updateQuality(quality, id) {
  $.ajax({
    url: `/api/v1/ideas/${id}`,
    method: 'put',
    data: {idea: {quality: quality}}
  })
}
