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
        label:"Open Github",
        click: async () => {
          const win2 = new BrowserWindow({
            height:200,
            width:400,
            show:false,
            backgroundColor:"#444",
          })

          win2.loadFile("index2.html");
          // win2.loadURL("https://github.com")
          win2.once("ready-to-show",()=> {
            win2.show()
          })
        }
      },
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