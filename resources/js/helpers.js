/**
 * Get configuration
 * 
 * @returns {Promise<string>}
 */
 async function getCfg() {
  const defaultConf = {
    gameexe: '',
    serverFolder: '',
    lastConnect: '',
    enableKillswitch: false,
    serverLaunchPanel: false,
    language: 'en',
    useHttps: true,
  }
  const cfgStr = await Neutralino.storage.getData('config').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('config', JSON.stringify(defaultConf))

    // Show the first time notice if there is no config
    document.querySelector('#firstTimeNotice').style.display = 'block'
  })

  const config = cfgStr ? JSON.parse(cfgStr) : defaultConf

  return config
}

/**
 * Get the list of favorite IPs
 * 
 * @returns {Promise<string[]>}
 */
 async function getFavIps() {
  const ipStr = await Neutralino.storage.getData('favorites').catch(e => {
    // The data isn't set, so this is our first time opening
    Neutralino.storage.setData('favorites', JSON.stringify([]))
  })

  const ipArr = ipStr ? JSON.parse(ipStr) : []

  return ipArr
}

async function proxyIsInstalled() {
  // Check if the proxy server is installed
  const curDirList = await filesystem.readDirectory(NL_CWD)

  if (curDirList.find(f => f.entry === 'ext')) {
    const extFiles = await filesystem.readDirectory(NL_CWD + '/ext')

    if (extFiles.find(f => f.entry === 'mitmdump.exe')) {
      return true
    }
  }

  return false
}

/**
 * Minimize the window
 */
 function minimizeWin() {
  console.log('min')
  Neutralino.window.minimize()
}

/**
 * Close the window
 */
function closeWin() {
  console.log('close')
  Neutralino.app.exit()

  window.close()
}
