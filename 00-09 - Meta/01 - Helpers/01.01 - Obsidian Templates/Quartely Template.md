# <% tp.file.title %>
<%*
const startMonth = (Number(tp.file.title.split('Q')[1])-1)*3
let months = []
for(let i = startMonth; i<startMonth+3; i++) {
	const d = moment(tp.file.title, 'YYYY-[Q]Q').month(i)
	months.push(d.format('YYYY-MM[|]MMMM'))
}
months = months.map(month => `[[${month}]]`)
monthLinks = months.join(' - ')
%><% monthLinks %>

## Goals
