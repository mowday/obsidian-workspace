# <% moment(tp.file.title).format('dddd, MMMM Do YYYY') %>
<%*
const date = moment(tp.file.title)
const month = date.format('MMMM')
const quarter = date.quarter()

const quarterLink = date.format('YYYY-[Q]Q')
const monthLink = date.format('YYYY-MM')
-%>
[[<% tp.user.lastJournalDate(tp, 14, tp.file.title) %>|«]] [[<% quarterLink %>|Q<% quarter %>]]-[[<% monthLink %>|<% month %>]] [[<% tp.user.nextJournalDate(tp, 14, tp.file.title) %>|»]]

## Monthly goal
![[<% monthLink %>#Goals]]

## Todo
<% tp.file.cursor() %>
<% tp.file.include('[[Agenda Template]]') %>

## Notes
[Add a new log](obsidian://log)