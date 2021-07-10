window.addEventListener('load', event => {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js')
        .then(sw => {
            // console.log('SW register (success): ', sw);
        })
        .catch(sw => {
            console.error('SW register (error): ', sw);
        });
    }

    var btnInstalar = document.getElementById("btnInstalar");

    window.addEventListener("beforeinstallprompt", eventBeforeInstall => {

        // console.log('aplicativo ainda não instalado', event.platforms);

        btnInstalar.style.display = 'block';
        eventBeforeInstall.preventDefault();

        btnInstalar.addEventListener("click", event => {
            btnInstalar.style.display = 'none';
    
            eventBeforeInstall.prompt();
            eventBeforeInstall.userChoice.then(choice => {
                if (choice.outcome === 'accepted') {

                    // console.log('User accepted');

                } else {

                    // console.log('User dismissed');

                }
                eventBeforeInstall = null;
            });
        });
    
    });
    window.addEventListener('appinstalled', event => {
        console.log('aplicativo instalado');
    });
});