var versao = '0.0.1';
var arquivos = [
    'app.js',
    'favicon.ico',
    'manifest.json',
    'img/offline.png',
    'img/splash_480x640.jpg',
    'img/splash_920x1280.jpg',
    'img/ico/ico_72.png',
    'img/ico/ico_96.png',
    'img/ico/ico_128.png',
    'img/ico/ico_144.png',
    'img/ico/ico_152.png',
    'img/ico/ico_192.png',
    'img/ico/ico_384.png',
    'img/ico/ico_512.png',
    'pages/offline.html',
    'https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jquery.qrcode/1.0/jquery.qrcode.min.js',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
    'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js',
    'js/qrcodelib.js',
    'js/DecoderWorker.js'
];

self.addEventListener('install', event => {
    //console.log('SW install');

    event.waitUntil(
        caches.open(versao).then(cache => {
            return cache.addAll(arquivos);
        })
    );
});

self.addEventListener('activate', event => {
    //console.log('SW activate');

    event.waitUntil(
        caches.keys().then(versoes => {
            return Promise.all(versoes.map(key => {
                if(key !== versao) {
                    //console.log('apangando versão antiga: ' + key);
                    return caches.delete(key);
                }
            }));
        })
      );
});

self.addEventListener('fetch', event => {
    //console.log('SW fetch');

    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                return response;
            }
            console.log('SW fetch da rede: ' + event.request.url);
            return fetch(event.request);
        }).catch(() => {
            console.log('estamos offline');

            return caches.match('/pages/offline.html');
        })
    );
});

self.addEventListener('message', event => {
    console.log('SW message: ', event.data);
});

self.addEventListener('sync', event => {
    console.log('SW sync', event.tag);
});

self.addEventListener('push', event => {
    console.log('SW push: ', event);
});
