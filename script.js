const video = document.getElementById("gameplay");
let source2 = "Video/Trailer.mp4";
let toggle = 0;


var canvas = document.getElementById("unity-canvas");
  var loadingBar = document.getElementById("unity-loading-bar");
  var progressBarFull = document.getElementById("unity-progress-bar-full");
  var fullscreenButton = document.getElementById("unity-fullscreen-button");
  var warningBanner = document.getElementById("unity-warning");

  function unityShowBanner(msg, type) {
    var div = document.createElement('div');
    div.innerHTML = msg;
    warningBanner.appendChild(div);
    if (type === 'error') div.style = 'background: red; padding: 10px;';
    else if (type === 'warning') div.style = 'background: yellow; padding: 10px;';
    if (type !== 'error') setTimeout(() => { warningBanner.removeChild(div); }, 5000);
  }

  var buildUrl = "./Build"; // relative path to Unity build folder
  var loaderUrl = buildUrl + "/MathEscapeRoom.loader.js";
  var config = {
    dataUrl: buildUrl + "/MathEscapeRoom.data",
    frameworkUrl: buildUrl + "/MathEscapeRoom.framework.js",
    codeUrl: buildUrl + "/MathEscapeRoom.wasm",
    streamingAssetsUrl: "./StreamingAssets",
    companyName: "P-Seminar EscapeRooms",
    productName: "EscapeRoom",
    productVersion: "1.0",
    showBanner: unityShowBanner
  };

  loadingBar.style.display = "block";

  var unityInstance = null; // global variable

  var script = document.createElement("script");
  script.src = loaderUrl;
  script.onload = () => {
    createUnityInstance(canvas, config, (progress) => {
      progressBarFull.style.width = 100 * progress + "%";
    }).then((instance) => {
      unityInstance = instance; // store it for later
      loadingBar.style.display = "none";
    }).catch(alert);
  };
  document.body.appendChild(script);
  


video.addEventListener("ended", playNextVideo);

function playNextVideo() {
  video.src = source2;
  video.play();

}



function openTopic(evt, Name,icon) {
  var i, x, tablinks;
  x = document.getElementsByClassName("Topic");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  iconID = document.getElementsByClassName("icon");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" current", "");
    iconID[i].className = iconID[i].className.replace("1 now", "2");
  }
  document.getElementById(Name).style.display = "block";
  evt.currentTarget.className += " current";
  document.getElementById(icon).className += "1 now";
}

function OpenEdge() {
  let URL = "https://hans-sachs-gymnasium.com/mathescape/index.html";
  if (navigator.userAgent.indexOf("Edg") != -1) {
    window.location = "index.html";
  }else {
    window.open("microsoft-edge:"+URL);
  }
}

function toggleFullscreen() {
  if (unityInstance) {
    unityInstance.SetFullscreen(1);
  } else {
    console.warn("Unity instance not ready yet!");
  }
}
