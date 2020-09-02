const { app, Tray } = require('electron');
const path = require('path');
const { menubar } = require('menubar');
const assetsDirectory = path.join(__dirname, 'assets')
const iconPath = path.join(assetsDirectory, 'utc.png');
let mb = undefined
let tray = undefined

// Don't show the app in the doc
app.dock.hide()

app.on('ready', () => {
  tray = createTray()
  mb = createMb({tray})

	mb.on('ready', () => {
		console.log('menutc is ready.');
    setInterval(() => {
      checkTime()
    }, 1000); // every second
  });
});

const checkTime = () => {
  setTrayTitle({tray})
}

const createTray = () => {
  tray = new Tray(iconPath);
  setTrayTitle({tray})
  return tray
}

const createMb = ({tray}) => {
	return menubar({
		tray,
	});
}

const setTrayTitle = ({tray}) => {
  tray.setTitle(buildTime())
}

const buildTime = () => {
  return `${new Date().getUTCHours()}:${new Date().getUTCMinutes()} UTC`
}
