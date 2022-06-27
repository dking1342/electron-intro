const { app, BrowserWindow, Menu } = require('electron');
const { shell } = require('electron/common');
const path = require("path");

module.exports = function(window){
  return [
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
}

