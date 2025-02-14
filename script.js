document.addEventListener('DOMContentLoaded', () => {
    const bgVideo = document.getElementById('bg-video');
    bgVideo.playbackRate = 0.5; // Slow down the video playback speed

    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    // Fetch images and videos from the server
    fetch('/images')
        .then(response => response.json())
        .then(files => {
            files.forEach(file => {
                const fileExtension = file.split('.').pop().toLowerCase();
                let element;

                if (['mp4', 'webm'].includes(fileExtension)) {
                    element = document.createElement('video');
                    element.src = `images/${file}`;
                    element.controls = true;
                } else {
                    element = document.createElement('img');
                    element.src = `images/${file}`;
                }

                element.alt = file;
                element.classList.add('gallery-image');
                gallery.appendChild(element);

                element.addEventListener('click', () => {
                    lightboxImg.src = element.src;
                    lightbox.style.display = 'flex';
                });
            });
        })
        .catch(error => console.error('Error loading files:', error));

    lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            lightbox.style.display = 'none';
        }
    });
});
