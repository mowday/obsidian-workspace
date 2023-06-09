<%*
const filename = tp.yinote.title
	.replace(/[\/\\:]/g, '-')
await tp.file.move(`/yinotes/${filename}.md`)
_%>
---
type: youtube
url: "<% tp.yinote.title %>"
title: "<% tp.yinote.title %>"
---
# [<% tp.yinote.title %>](<% tp.yinote.url %>)
<%* tp.yinote.notes.forEach(function(note) { %>
>[!note]
><% note.description %>
>[<% note.timestamp %>](<% note.url %>)
^seconds-<% note.seconds %>
<%* }) %>