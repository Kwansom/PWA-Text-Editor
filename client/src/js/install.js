const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener("beforeinstallprompt", (event) => {
  window.defferedPrompt = (event)
  console.log("test");
  butInstall.style.visibility = "visible";
  //   textHeader.textContent = "Click here to install";
});
// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener("click", async (event) => {
window.defferedPrompt.prompt();

  butInstall.setAttribute("disabled", true);
  butInstall.textContent = "Successfully installed!";
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
  butInstall.style.visibility = "hidden";
});
