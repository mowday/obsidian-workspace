# Carl's Workspace
This workspace is designed around getting my attention into Obsidian, so pulling the information I need as cleanly and easily as possible, making it the natural place for me to hang out.

## Structure
The workspace is setup around the [Johnny Decimal system](https://johnnydecimal.com/). All of the automation parts are placed in the `00-09 - Meta` area.

There are two types of note that arent organized as part of the JD system.
Periodic notes, as in the daily, monthly and quartely notes, are all placed in the `Journal` folder. Meeting notes are placed in `Meeting notes`.

**Automated Check:**
- [x] 00-09 - Meta folder is present
- [x] Templates are present
- [x] Scripts are present
- [x] Executables are present
- [x] Journal folder is present
- [x] Meeting Notes folder is present

## Plugins and configurations
Here is a list of required or recommended plugins to work with the templates and black magic :)

### Templater
[Github](https://github.com/SilentVoid13/Templater)
Arguably the most important of all plugins for this to work - and if you have updated this page, it's working!

**Automated Check:**
- [x] Plugin is installed
- [x] Plugin is enabled
- [x] Correct template folder set
- [x] Correct scripts folder set
- [x] CMD+R will auto apply the update daily template
- [x] CMD+T will open the insert template modal

### Periodic notes
[Github](https://github.com/liamcain/obsidian-periodic-notes)
Periodic Notes is a crucial plugin as it's used to create the daily, weekly and quarterly notes.

There are three periodic notes setup by default, Daily(`yyyy-MM-DD`), Weekly(`yyyy-[W]ww`) and Quartely(`yyyy-[Q]n`). Using Templater magic, if they are created in the `Journal` folder with the correct title structure, the correct template will be applied to it automatically.

**Automated Check:**
- [x] Plugin is installed
- [x] Plugin is enabled
- [x] Daily notes enabled
- [x] Daily notes template
- [x] Daily notes folder
- [x] Weekly notes enabled
- [x] Weekly notes template
- [x] Weekly notes folder
- [x] Quarterly notes enabled
- [x] Quarterly notes template
- [x] Quarterly notes folder

### Auto Mover
Automatically moves notes into folders based on tags or title structure. This is used to force all Daily, Weekly and Quarterly notes to be placed in the `Journal` folder.
**This is not actually a required plugin** - if you choose not to use it you will have to move files manually

**Automated Check:**
- [x] Plugin is installed
- [x] Plugin is enabled
- [x] Daily > Journal rule setup
- [x] Weekly > Journal rule setup
- [x] Quarterly > Journal rule setup

## Automations
### Custom scripts
There are a bunch of custom scripts to help the templates. They can be configured somewhat in the `config.js` file. This will also change how the templates work.
**Automated Check:**
- [x] config.js is present

### Calendar Events
There is a [javascript file](obsidian://open?file=00-09%20-%20Meta%2F01%20-%20Helpers%2F01.03%20-%20Executables%2FCalendarEvents.js) that interacts with the Mac calendar to pull events, based on [Dean Jackson's](https://www.deanishe.net/post/2020/05/workflow-video-conferences/) work. I have modified it slightly to be more dynamic.
A link to the [[#Meeting notes]] is automatically created in the agenda, and all Team links are also hooked up to easily press to connect. These can be updated by applying the "Update Daily Notes" template to the file, or simply pressing CMD+R (this applies the template).
Updating the daily note will also update the last and next day links.

**Note:** Changing the format of daily, weekly or quarterly notes in Periodic Notes will be reflected by the templates and scripts if not hardcoded otherwise in the `config.js`.

**Automatic Check:**
- [x] CalendarEvents.js is present

#### Meeting notes
Meeting notes are tagged with #meeting and has a backlink to the date they refer to. The filename is the date followed by the meeting subject. For instance, a meeting called "Test meeting" on 2022-03-03 would be named "2022-03-03 - Test meeting".
Thanks to this standard there are automatic rules that moves files with that structure to the meetings notes folder and applies a Templater template as needed.
It will also pull in the notes of the event as part of the invitation block, and a link will appear if a video meeting link has been detected.