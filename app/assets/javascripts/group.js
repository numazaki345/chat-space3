$(function() {
  var search_list = $("#user-search-result");
  var users_list = $("#chat-group-users");

  function appendMembers(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${ msg }</p>
                </div>`
    search_list.append(html);
  }

  function appendUser(user_id,name) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${ name }</p>
                  <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                </div>`
    users_list.append(html);
  }

  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(data) {
      $("#user-search-result").empty();
      if (input.length !== 0 && data != input) {
        data.forEach(function(user){
          appendMembers(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません");
      }
     })
     .fail(function() {
      alert('検索に失敗しました');
    })
  })

  $(document).on("click", ".chat-group-user__btn--add",function(){
    var user_id = $(this).attr("data-user-id")
    var name = $(this).attr("data-user-name")
    appendUser(user_id,name)
    $(this).parent().remove();
  })

  $(document).on("click", ".user-search-remove",function(){
    $(this).parent().remove();
  })
});