window.addEventListener('load', function() {
    var options = {
        width: 180,
        height: 180,
        background:"#ffffff",
        foreground:"#000000",
        text: 'https://paulorobertoalexandresilva.github.io/servical/'
    }
    $("#qrcode").qrcode(options);
});
