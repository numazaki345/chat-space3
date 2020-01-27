$(function () {

  function buildHTML(message) {
    
   var image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : ""; 

    var html = `<div class="message" data-message-id="${message.id}"> 
          <div class="upper-message">
            <div class="upper-message__user-name">
              ${message.name}
            </div>
            <div class="upper-message__date">
              ${message.time}
            </div>
          </div>
          <div class="lower-meesage">
            <p class="lower-message__content">
              ${message.body}
            </p>
            ${image}
          </div>
        </div>`
    return html;
  }

  $('#new_message').on('submit', function(e) {
    e.preventDefault();
    var formdata = new FormData($(this).get(0));

    $.ajax({
      type: 'POST',
      url: location.href,
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data) {
      var chat = buildHTML(data);
      $('.messages').append(chat);
      $("#new_message")[0].reset();
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('.js-form__text-field').val('');
    })
    .fail(function(data) {
      alert('メッセージを入力してください');
    });
  return false;
  });

 
  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
      var last_message_id = $('.message:last').data("message-id");

      $.ajax({ 
        url: "api/messages", 
        type: 'get', 
        dataType: 'json', 
        data: {last_id: last_message_id} 
      })
      .done(function (messages) { 
        if (messages.length !== 0){
        var insertHTML = '';
        messages.forEach(function (message) {
          insertHTML = buildHTML(message);
        })
        $('.messages').append(insertHTML);
        $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
        $("#new_message")[0].reset();
        $(".form__submit").prop("disabled", false);
       }
      })
      .fail(function () {
        alert('自動更新に失敗しました');
      });
    }
  };
   setInterval(reloadMessages, 7000);
})