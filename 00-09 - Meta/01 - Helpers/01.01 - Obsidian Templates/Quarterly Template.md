# <% tp.file.title %>
<%*
let date = moment(tp.file.title, tp.user.config().quarterlyFormat)
const correctQuarter = date.quarter()
const weeks = [];
while(date.quarter() === correctQuarter) {
	weeks.push(moment(date))
	date.add(1, 'w')
}
const linkFormat = tp.user.config().weeklyFormat + '[|W]W'
const weekLinks = weeks.map(w => w.format(linkFormat))
console.log(weekLinks)
tR += weekLinks.map(l => `[[${l}]]`).join('-')
%>

## Key Results

## Initiatives