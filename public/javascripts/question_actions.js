var QuestionActions = {
  new: function (args) {
    $.ajax({
      type: "POST",
      url: '/question/new_question',
      data: args,
      dataType: 'JSON',
      success: function () {
        alert('hehe');
      }
    });
  }
}