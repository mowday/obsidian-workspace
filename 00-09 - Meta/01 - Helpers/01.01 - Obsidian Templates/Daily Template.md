# <% moment(tp.file.title, tp.user.config().dailyFormat).format('dddd, MMMM Do YYYY') %>
<%*
const date = moment(tp.file.title, tp.user.config().dailyFormat)
const month = date.format('MMMM')
const week = date.format('ww')
const quarter = date.quarter()

const quarterLink = date.format(tp.user.config().quarterlyFormat)
const monthLink = date.format('YYYY-MM')
const weekLink = date.format(tp.user.config().weeklyFormat)
-%>
[[<% tp.user.lastJournalDate(tp, 14, tp.file.title) %>|«]] [[<% quarterLink %>|Q<% quarter %>]]-[[<% weekLink %>|W<% week %>]] [[<% tp.user.nextJournalDate(tp, 14, tp.file.title) %>|»]]

## Agenda 
<% tp.file.include('[[Agenda Template]]') %>

## Aktiva projekt
```dataview
LIST
FROM "20-29 - Projects/20 - Active Projects"
```

## Todo
<% tp.file.cursor() %>

## Notes
[Add a new log](obsidian://log)