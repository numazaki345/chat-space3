$(function() {
  var search_list = $("#user-search-result");
  var users_list = $("#chat-group-users");

  function appendMembers(user) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
              </div>`
    search_list.append(html);
    return html;
  }

  function appendNoUserToSearchList() {
    let html = `
      <div class="chat-group-user clearfix">
        <p class="chat-group-user__name">ユーザーが見つかりません</p>
      </div>
    `;
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

  function addMember(user_id) {
    let html = `<input value="${user_id}" name="group[user_ids][]" type="hidden" id="group_user_ids_${user_id}" />`;
    $(`#${user_id}`).append(html);
  }

  $(function(){
    $("#user-search-field").on("keyup", function() {
      var input = $("#user-search-field").val();

      $.ajax({
        type: 'GET',
        url: '/users',
        data: { keyword: input },
        dataType: 'json'
      })

      .done(function(user) {
        $("#user-search-result").empty();
          if (user.length !== 0) {
            user.forEach(function(user){
              appendMembers(user)
            });
          } else if (input.length == 0) {
            return false;
          }
          else {
            appendNoUserToSearchList();
          }
        })
      .fail(function() {
        alert('ユーザー検索に失敗しました');
      })

    


  });
  });

  $(function(){
    $(document).on('click', '.chat-group-user__btn--add', function() {
      var name = $(this).attr("data-user-name");
      var user_id = $(this).attr("data-user-id");
      $(this).parent().remove();
      appendUser(user_id,name);
      addMember(user_id);
    });
  
  　    $(document).on("click", '.user-search-remove', function() {
      $(this).parent().remove();
    });
  });
});
