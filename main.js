const { app, BrowserWindow, Menu, ipcRenderer } = require('electron');
const { shell } = require('electron/common');
const { ipcMain } = require('electron/main');
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
        label:"New Window",
        click: async () => {
          const win2 = new BrowserWindow({
            height:200,
            width:400,
            show:false,
            backgroundColor:"#444",
          })

          win2.loadFile(path.join(__dirname, '/src/pages/index2.html')
          );
          win2.once("ready-to-show",()=> {
            win2.show()
          })
        }
      },
      {
        label:"Open Github",
        click: async () => {
          const win3 = new BrowserWindow({
            height:200,
            width:400,
            show:false,
            backgroundColor:"#444",
          })

          win3.loadURL("https://github.com")
          win3.once("ready-to-show",()=> {
            win3.show()
          })
        }
      },
      {
        label:"Open Camera",
        click: async () => {
          const win4 = new BrowserWindow({
            height:1000,
            width:800,
            show:false,
            backgroundColor:"#eee",
            webPreferences: {
              preload: path.join(__dirname, '/src/js/cameraPreload.js')
            }
          })

          // shows dev tools tab
          // win4.webContents.openDevTools()

          win4.loadFile(path.join(__dirname, '/src/pages/camera.html'))
          win4.once("ready-to-show",()=> {
            win4.show()
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


// menu setup
const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '/src/js/preload.js')
    }
  })

  // win.webContents.openDevTools()

  ipcMain.on("set-image", (e,data) => {
    win.webContents.send("get-image",data);
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