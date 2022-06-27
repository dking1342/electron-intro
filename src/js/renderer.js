const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const { shell } = require('electron/common');
const { ipcRenderer } = require('electron/renderer');
const path = require("path");

window.addEventListener('load', (e) => {
  e.preventDefault()
  ipcRenderer.on('context-menu-command', (e, command) => {
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
              const win2 = new BrowserWindow({
                height:200,
                width:400,
                show:false,
                backgroundColor:"#444",
              })
    
              win2.loadURL("https://github.com")
              win2.once("ready-to-show",()=> {
                win2.show()
              })
            }
          },
          {
            label:"Open Camera",
            click: async () => {
              const win2 = new BrowserWindow({
                height:200,
                width:400,
                show:false,
                backgroundColor:"#444",
              })
    
              win2.loadFile(path.join(__dirname, '/src/pages/camera.html'))
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
    
    
    // menu setup
    const menu = Menu.buildFromTemplate(menuItems);
    Menu.setApplicationMenu(menu);  
  })
  // ipcRenderer.send('show-context-menu')
})


// main
// ipcMain.on('activate', (event) => {
  // const template = [
  //   {
  //     label: 'Menu Item 1',
  //     click: () => { event.sender.send('context-menu-command', 'menu-item-1') }
  //   },
  //   { type: 'separator' },
  //   { label: 'Menu Item 2', type: 'checkbox', checked: true }
  // ]
  // const menu = Menu.buildFromTemplate(template)
  // menu.popup(BrowserWindow.fromWebContents(event.sender))
// })

