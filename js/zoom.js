AFRAME.registerComponent('zoom', {
    init: function () {
        // Referencia al elemento de la cámara
        let cameraEl = document.querySelector('[camera]');
        
        // Ajustes de zoom
        let isZoomedIn = false; // Estado inicial del zoom
        
        // Evento para detectar clics y alternar el zoom
        document.addEventListener('keydown', function (event) {
            if (event.key === 'z') { // Usa la tecla "Z" para alternar el zoom
                if (!isZoomedIn) {
                    cameraEl.setAttribute('zoom', 2); // Aumenta el zoom
                    isZoomedIn = true;
                } else {
                    cameraEl.setAttribute('zoom', 1); // Restablece el zoom
                    isZoomedIn = false;
                }
            }
        });
    }
});
