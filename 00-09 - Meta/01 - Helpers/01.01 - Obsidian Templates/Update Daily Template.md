<%_*
const nextDayRE = /\[\[\d{4}-\d{2}-\d{2}\|»\]\]/
const lastDayRE = /\[\[\d{4}-\d{2}-\d{2}\|«\]\]/
const dailyRE = /^\d{4}-\d{2}-\d{2}$/

if (dailyRE.test(tp.file.title)) {
  const file = app.workspace.getActiveFile()
  const content = await app.vault.read(file)
  const agenda = /## Agenda\s*\n[\s\S]+##/m

  const newAgenda = await tp.file.include('[[Agenda Template]]')
  const nextDay = await tp.user.nextJournalDate(tp, 14, tp.file.title)
  const lastDay = await tp.user.lastJournalDate(tp, 14, tp.file.title)

  let newContent = content
    .replace(agenda, newAgenda + '\n\n##') // Update the agenda
    .replace(nextDayRE, `[[${nextDay}|»]]`) // Update the next day link
    .replace(lastDayRE, `[[${lastDay}|«]]`) // Update the last day link


  app.vault.modify(file, newContent)
  new tp.obsidian.Notice("Daily note updated")
} else {
  new tp.obsidian.Notice("Ignored update request - not a valid daily note")
}
_%>
