<%*
const date = moment(`${tp.file.title}-01`)
const quarter = date.quarter()
const quarterLink = date.format('YYYY-[Q]Q')
const month = date.format('MMMM')
-%>
# <% date.year() %>-[[<% quarterLink %>|Q<% quarter %>]] <% month %>
## Quartely goals
![[<% quarterLink %>#Goals]]

## Goals
- [ ] 