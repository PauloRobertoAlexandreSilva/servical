function CriaQRCode(tag, texto) {
    var options = {
        width: 180,
        height: 180,
        background:"#ffffff",
        foreground:"#000000",
        text: texto
    }
    tag.qrcode(options);
}

window.addEventListener('load', function() {
    CriaQRCode($("#qrcode"), 'https://paulorobertoalexandresilva.github.io/servical/');
});
