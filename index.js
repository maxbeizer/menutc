const { app, Tray, nativeImage } = require("electron");
const { menubar } = require("menubar");
let MenUTC = undefined;
let tray = undefined;
const MENU_BAR_OPTIONS = {
  showDockIcon: false,
  index: false,
  browserWindow: { height: 0, width: 0 },
};

app.on("ready", () => {
  // Don't show the app in the doc
  app.dock.hide();
  tray = createTray();
  MenUTC = createMb({ tray });

  MenUTC.on("ready", () => {
    setInterval(() => {
      checkTime();
    }, 1000); // every second
  });

  // debug only
  // MenUTC.on("after-create-window", () => {
  //   MenUTC.window.openDevTools();
  // });
});

const checkTime = () => {
  setTrayTitle({ tray });
};

const createTray = () => {
  tray = new Tray(nativeImage.createEmpty());
  setTrayTitle({ tray });
  return tray;
};

const createMb = ({ tray }) => {
  return menubar({
    tray,
    ...MENU_BAR_OPTIONS,
  });
};

const setTrayTitle = ({ tray }) => tray.setTitle(buildTime());

const buildTime = () => {
  const time = [new Date().getUTCHours(), new Date().getUTCMinutes()]
    .map(formatNumber)
    .join(":");

  return `${time} UTC`;
};

const formatNumber = (number) => `0${number}`.slice(-2);
