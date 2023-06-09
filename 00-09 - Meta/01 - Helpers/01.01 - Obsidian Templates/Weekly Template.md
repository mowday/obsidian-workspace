<%*
const date = moment(`${tp.file.title}`, tp.user.config().weeklyFormat)
const quarter = date.quarter()
const quarterLink = date.format(tp.user.config().quarterlyFormat)
const month = date.format('MMMM')

let weekDays = []
for(let i=0; i<7; i++) {
  let day = moment(date).day(i+1)
  weekDays.push(`[[${day.format(tp.user.config().dailyFormat)}|${day.format('ddd (Do)')}]]`)
}
_%>
# Week <% date.week() %>, [[<% quarterLink %>|Q<% quarter %> of <% date.year() %>]]
[[<% moment(date).subtract(1, 'w').format(tp.user.config().weeklyFormat) %>|«]] <% weekDays.join('-') %> [[<% moment(date).add(1, 'w').format(tp.user.config().weeklyFormat) %>|»]]

## Quartely initiatives
![[<% quarterLink %>#Initiatives]]

## Initiatives
- [ ] 