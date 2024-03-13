const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA (Progressive Web App)
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => { 
    window.deferredPrompt = event; // store the event for later use
    butInstall.classList.toggle('hidden', false); // remove the hidden class from the install button
});


// TODO: Implement a click event handler on the `butInstall` element
// event handler should call the prompt() method on the `deferredPrompt` object
butInstall.addEventListener('click', async () => { 
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) { // if the event is not defined, return
        return;
    }
    promptEvent.prompt(); // show the install prompt
    window.deferredPrompt = null; // set the deferredPrompt to null so that it can be clicked only once
    butInstall.classList.toggle('hidden', true); // hide the install button once the prompt is shown
});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => { // after the app is installed, log a message to the console
    console.log('PWA installed');
    window.deferredPrompt = null; // set the deferredPrompt to null so that it can be clicked only once
});


