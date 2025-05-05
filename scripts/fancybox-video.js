// Fancybox video gallery init (отдельный файл)

document.addEventListener('DOMContentLoaded', function () {
    if (window.Fancybox) {
        Fancybox.bind('[data-fancybox="video-gallery"]', {
            Toolbar: {
                display: [
                    { id: "counter", position: "center" },
                    "close"
                ]
            },
            Thumbs: false,
            closeButton: "top",
            animated: true,
            dragToClose: true,
            showClass: "fancybox-zoomIn",
            hideClass: "fancybox-zoomOut",
            Image: {
                zoom: false
            },
            Video: {
                autoplay: true,
                controls: true
            },
            compact: false,
            idle: false
        });
    }
}); 