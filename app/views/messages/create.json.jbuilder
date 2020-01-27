json.id    @message.id
json.name  @message.user.name
json.body  @message.content
json.image @message.image.url
json.time  @message.created_at.strftime("%Y/%m/%d %H:%M")