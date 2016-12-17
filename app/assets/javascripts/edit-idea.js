function attachEditEvent() {
  $(".idea-data-title").on("click", editIdea)
  $(".idea-data-body").on("click", editIdea)
  $(".idea-data-title").blur(confirmEditIdea)
  $(".idea-data-body").blur(confirmEditIdea)
}

function editIdea() {
  $(this).attr('contenteditable','true');
}

function confirmEditIdea() {
  var id = $(this).parent().data('id');

  var newValue = this.innerText;

  if(this.className == 'idea-data-title') {
    var newData = {title: newValue};
  } else if (this.className == 'idea-data-body') {
    var newData = {body: newValue};
  }

  $(this).attr('contenteditable','false');

  $.ajax({
    url: `/api/v1/ideas/${id}`,
    method: 'put',
    dataType: 'json',
    data: {idea: newData}
  })
}
