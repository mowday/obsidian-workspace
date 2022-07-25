<%*
const split = tp.file.title.split(' - ')
const date = split.shift()
const title = split.join(' - ')
const event = await tp.user.getSpecificMeeting(tp, date, title, tp.user.config().whitelistedCalendars)
-%>
# <% title %>
#meeting [[<% date %>]]
<%-* if (event.videoMeetingLink) { tR += `\n${event.videoMeetingLink}` }%>

## Invitation
> <% event.notes.replace(/\n/g, '\n> ') %>

## Notes
<% tp.file.cursor() %>