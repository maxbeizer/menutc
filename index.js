const { app, Tray, nativeImage } = require('electron');
const { menubar } = require('menubar');
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
  tray = new Tray(nativeImage.createEmpty());
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
  return `${formatNumber(new Date().getUTCHours())}:${formatNumber(new Date().getUTCMinutes())} UTC`
}

const formatNumber = number => `0${number}`.slice(-2)
