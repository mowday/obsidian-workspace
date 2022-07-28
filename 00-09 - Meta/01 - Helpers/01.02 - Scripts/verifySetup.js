async function verifySetup() {
  return {
    'structure-report': await generateReport([
      {
        title: '00-09 - Meta folder is present',
        state: assertFileOrFolder('00-09 - Meta')
      },
      {
        title: 'Templates are present',
        state: assertFileOrFolder('00-09 - Meta/01 - Helpers/01.01 - Obsidian Templates')
      },
      {
        title: 'Scripts are present',
        state: assertFileOrFolder('00-09 - Meta/01 - Helpers/01.02 - Scripts')
      },
      {
        title: 'Executables are present',
        state: assertFileOrFolder('00-09 - Meta/01 - Helpers/01.03 - Executables')
      },
      {
        title: 'Journal folder is present',
        state: assertFileOrFolder('Journal')
      },
      {
        title: 'Meeting Notes folder is present',
        state: assertFileOrFolder('Meeting Notes')
      }
    ]),
    'templater-report': await generateReport([
      {
        title: 'Plugin is installed',
        state: assertInstalled('templater-obsidian')
      },
      {
        title: 'Plugin is enabled',
        state: assertEnabled('templater-obsidian')
      },
      {
        title: 'Correct template folder set',
        state: assertPluginSetting('templater-obsidian', 'templates_folder', '00-09 - Meta/01 - Helpers/01.01 - Obsidian Templates')
      },
      {
        title: 'Correct scripts folder set',
        state: assertPluginSetting('templater-obsidian', 'user_scripts_folder', '00-09 - Meta/01 - Helpers/01.02 - Scripts')
      },
      {
        title: 'CMD+R will auto apply the update daily template',
        state: assertCustomKey('templater-obsidian:00-09 - Meta/01 - Helpers/01.01 - Obsidian Templates/Update Daily Template.md', (key => key.modifiers[0] === 'Mod' && key.modifiers.length === 1 && key.key === 'R')),
        message: 'This is not required, but nice'
      },
      {
        title: 'CMD+T will open the insert template modal',
        state: assertCustomKey('templater-obsidian:insert-templater', (key => key.modifiers[0] === 'Mod' && key.modifiers.length === 1 && key.key === 'T')),
        message: 'This is not required, but nice'
      },
    ]),
    'auto-mover-report': await generateReport([
      {
        title: 'Plugin is installed',
        state: assertInstalled('auto-note-mover')
      },
      {
        title: 'Plugin is enabled',
        state: assertEnabled('auto-note-mover')
      },
      {
        title: 'Daily > Journal rule setup',
        state: assertPluginSettingArr('auto-note-mover', 'folder_tag_pattern', (rule => rule.folder === 'Journal' && rule.pattern === '^\\d{4}-\\d{2}-\\d{2}$')) || 'Verify that the rule is setup correctly, should be set to "^\\d{4}-\\d{2}-\\d{2}$"'
      },
      {
        title: 'Weekly > Journal rule setup',
        state: assertPluginSettingArr('auto-note-mover', 'folder_tag_pattern', (rule => rule.folder === 'Journal' && rule.pattern === '^\\d{4}-W\\d{2}$')) || 'Verify that the rule is setup correctly, should be set to "^\\d{4}-W\\d{2}$"'
      },
      {
        title: 'Quarterly > Journal rule setup',
        state: assertPluginSettingArr('auto-note-mover', 'folder_tag_pattern', (rule => rule.folder === 'Journal' && rule.pattern === '^\\d{4}-Q\\d$')) || 'Verify that the rule is setup correctly, should be set to "^\\d{4}-Q\\d$"'
      },
    ]),
    'periodic-notes-report': await generateReport([
      {
        title: 'Plugin is installed',
        state: assertInstalled('periodic-notes')
      },
      {
        title: 'Plugin is enabled',
        state: assertEnabled('periodic-notes')
      },
      {
        title: 'Daily notes enabled',
        state: assertPluginSetting('periodic-notes', 'daily.enabled', true)
      },
      {
        title: 'Daily notes template',
        state: assertPluginSetting('periodic-notes', 'daily.template', '00-09 - Meta/01 - Helpers/01.01 - Obsidian Templates/Daily Template.md')
      },
      {
        title: 'Daily notes folder',
        state: assertPluginSetting('periodic-notes', 'daily.folder', 'Journal')
      },
      {
        title: 'Weekly notes enabled',
        state: assertPluginSetting('periodic-notes', 'weekly.enabled', true)
      },
      {
        title: 'Weekly notes template',
        state: assertPluginSetting('periodic-notes', 'weekly.template', '00-09 - Meta/01 - Helpers/01.01 - Obsidian Templates/Weekly Template.md')
      },
      {
        title: 'Weekly notes folder',
        state: assertPluginSetting('periodic-notes', 'weekly.folder', 'Journal')
      },
      {
        title: 'Quarterly notes enabled',
        state: assertPluginSetting('periodic-notes', 'quarterly.enabled', true)
      },
      {
        title: 'Quarterly notes template',
        state: assertPluginSetting('periodic-notes', 'quarterly.template', '00-09 - Meta/01 - Helpers/01.01 - Obsidian Templates/Quarterly Template.md')
      },
      {
        title: 'Quarterly notes folder',
        state: assertPluginSetting('periodic-notes', 'quarterly.folder', 'Journal')
      },
    ]),
    'config-report': await generateReport([
      {
        title: 'config.js is present',
        state: assertFileOrFolder('00-09 - Meta/01 - Helpers/01.02 - Scripts/config.js')
      }
    ]),
    'calendar-events-report': await generateReport([
      {
        title: 'CalendarEvents.js is present',
        state: assertFileOrFolder('00-09 - Meta/01 - Helpers/01.03 - Executables/CalendarEvents.js')
      }
    ])
  }
}

async function generateReport(data) {
  return data
    .map(test => {
      let message = `- [${test.state === true ? 'x' : ' '}] ${test.title}`

      if (test.state !== true) {
        message += ` (${test.state || test.message})`
      }

      return message
    })
    .join('\n');
}

function assertFileOrFolder(path) {
  const folderStructure = path.split('/')
  let layer = app.fileManager.vault.root
  for(let i=0; i<folderStructure.length; i++) {
    const wantedLayer = folderStructure[i]
    layer = layer.children.find(c => c.name === wantedLayer)
    if (!layer) {
      return `Missing required folder structure \`${folder}\`. Create the required folders in your vault.`
    }
  }

  return true
}

function assertInstalled(plugin) {
  return app.plugins.manifests[plugin] != undefined ? true : `Install \`${plugin}\` from Community Plugins`
}

function assertEnabled(plugin) {
  return app.plugins.enabledPlugins.has(plugin) ? true : `Ensure that \`${plugin}\`is enabled in Community Plugins`
}

function assertCustomKey(command, keyValidation) {
  return app.hotkeyManager.customKeys[command] && app.hotkeyManager.customKeys[command].find(k => keyValidation(k)) != undefined
}

function assertPluginSetting(plugin, setting, value) {
  let targetSetting = app.plugins.plugins[plugin].settings;
  const nestedSettingLayers = setting.split('.')
  let currentLayer
  while((currentLayer = nestedSettingLayers.shift())) {
    targetSetting = targetSetting[currentLayer]
  }

  return targetSetting == value ? true : `The value of \`${setting}\` in the settings for \`${plugin}\` is incorrect. It should be \`${value}\` but is currently set to \`${targetSetting}\``
}

function assertPluginSettingArr(plugin, setting, find) {
  let targetSetting = app.plugins.plugins[plugin].settings;
  const nestedSettingLayers = setting.split('.')
  let currentLayer
  while((currentLayer = nestedSettingLayers.shift())) {
    targetSetting = targetSetting[currentLayer]
  }

  return targetSetting.find(v => find(v)) != undefined
}

module.exports = verifySetup