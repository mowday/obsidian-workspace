<%_*
/*
This template simply switches to the correct template based on the filename. It's designed to be used with Templaters auto insertion to my Journal folder to be able to create the right barebone automatically
*/

const daily = /^\d{4}-\d{2}-\d{2}$/
const weekly = /^\d{4}-W\d{2}$/
const quartely = /^\d{4}-Q\d$/
const folder = tp.file.folder()

if (daily.test(tp.file.title)) {
  console.log('Daily note, including template')
  return tp.file.include('[[Daily Template]]')
} else if (weekly.test(tp.file.title)) {
  return tp.file.include('[[Weekly Template]]')
} else if (quartely.test(tp.file.title)) {
  return tp.file.include('[[Quarterly Template]]')
} else {
  // We ignore this, not a filename that is supported
}
_%>