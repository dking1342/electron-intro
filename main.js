const { app, BrowserWindow, Menu } = require('electron');
const { shell } = require('electron/common');
const path = require("path");

const menuItems = [
  {
    label: "Menu",
    submenu:[
      {
        label:"About"
      }
    ]
  },
  {
    label: "File",
    submenu:[
      {
        label:"Learn More",
        click: async () => {
          await shell.openExternal("https://www.electronjs.org/")
        }
      },
      {
        type:"separator",
      },
      {
        label:"Exit",
        click: async () => {
          app.quit()
        },
      },
    ]
  },
  {
    label:"Window",
    submenu:[
      {
        role:"minimize",
      },
      {
        role:"close",
      },
    ]
  }
];

const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})