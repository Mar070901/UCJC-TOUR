/**
  AFRAME.registerComponent(param1, param2)
  * Los componentes deben registrarse antes de usarse en cualquier parte dentro de <a-scene>.
  * Esto significa que desde un archivo HTML, los componentes deben declararse antes de <a-scene>.
  * Parámetros:
  *   1. {string} name - Nombre del componente, representado como el nombre del atributo HTML.
  *   2. {Object} definition - Definición del componente, contiene el esquema y métodos de manejo del ciclo de vida.
  * --------------------------------------------------------------------------------------------------
  * *'schema' - es un objeto que define y describe las propiedades del componente.
  *   Las claves del esquema son los nombres de las propiedades, y los valores del esquema definen los tipos y
  *   valores de las propiedades.
*/

// Registrar el componente 'spot'
AFRAME.registerComponent('spot', {
    schema: {
      linkTo: {type: 'string', default: ''},
      spotGroup: {type: 'string', default: ''}
    },
    init: function() {
      addSpot(this.el, this.data);
    }
  });
  
  // Registrar el componente 'hotspots'
  AFRAME.registerComponent('hotspots', {
    init: async function() {
      const jsonURL = './json/map.json';
      const hotspotsEl = this.el;
  
      const map = await fetchMap(jsonURL);
      const reloadedHotspots = await addReloadSpotsEvent(hotspotsEl, map);
      const hotSpots = await addHotspots(map, reloadedHotspots);
    }
  });
  
  /**
   * Agregar un spot a la escena.
   * @param {HTMLObject} spotAImage - Elemento <a-image> que representa el spot.
   * @param {HTMLObject} navData - Datos de navegación, incluyendo el enlace a la imagen de destino y el grupo del spot.
   */
  function addSpot(spotAImage, navData) {
    // Agregar la fuente de la imagen del ícono del hotspot
    spotAImage.setAttribute("src", "#hotspot");
    // Hacer que el ícono mire siempre hacia la cámara
    spotAImage.setAttribute("look-at", "#cam");
  
    spotAImage.addEventListener('click', function() {
      // Establecer la fuente del skybox a la nueva imagen según el spot
      const sky = document.getElementById("skybox");
      sky.setAttribute("src", navData.linkto);
  
      const spotcomp = document.getElementById("spots");
      const currspots = this.parentElement.getAttribute("id");
  
      // Crear un evento especial para la entidad 'spots' (elemento del DOM) para cambiar los datos de los spots
      spotcomp.emit('reloadspots', {newspots: navData.spotgroup, currspots: currspots});
    });
  }
  
  /**
   * Agregar un listener de eventos para el evento 'reloadspots', cargar al cambiar de escena.
   * @param {HTMLObject} hotspotsEl - Entidad <a-entity hotspots ...>.
   * @param {object} map - Mapa de dependencias entre escenas desde un archivo JSON externo.
   */
  function addReloadSpotsEvent(hotspotsEl, map) {
    hotspotsEl.addEventListener('reloadspots', function(evt) {
      // Obtener el grupo de spots actual y escalarlo a 0
      const currspotgroup = document.getElementById(evt.detail.currspots);
      currspotgroup.setAttribute('scale', '0 0 0');
  
      // Obtener el grupo de spots nuevo y escalarlo a 1
      const newspotgroup = document.getElementById(evt.detail.newspots);
      newspotgroup.setAttribute('scale', '1 1 1');
  
      const currentSceneID = currspotgroup.getAttribute('id');
      const nextSceneID = newspotgroup.getAttribute('id');
  
      map.spots.forEach(spot => {
        if (spot.id === currentSceneID) {
          spot.nav.forEach(nav => {
            // Obtener todos los caracteres después del prefijo 'p:' -> nombre de un grupo, por ejemplo, 'group-scene3'
            const navLinkTo = nav.spotProp.substr(nav.spotProp.indexOf("p:") + 2);
  
            if (navLinkTo === nextSceneID) {
              // Agregar rotación a la cámara dependiendo de la dirección del movimiento
              const cam = document.getElementById('cam');
              cam.setAttribute('rotation', nav.rotation);
            }
          });
        }
      });
    });
  
    return hotspotsEl;
  }
  
  /**
   * Cargar el mapa de dependencias entre escenas desde un archivo JSON externo.
   * @param {string} jsonURL - Ruta al archivo: ./json/map.json.
   * @returns {Promise<Object>} - Mapa de dependencias cargado.
   */
  function fetchMap(jsonURL) {
    return fetch(jsonURL).then(res => res.json());
  }
  
  /**
   * Agregar hotspots para todas las escenas.
   * @param {object} map - Mapa de dependencias entre escenas desde un archivo JSON externo.
   * @param {HTMLObject} reloadedHotspots - Objeto HTML que ya contiene todas las acciones recargadas - <a-entity hotspots ...>.
   */
  function addHotspots(map, reloadedHotspots) {
    map.spots.forEach(spot => {
      // Crear una entidad vacía y establecer sus atributos
      const newSpotEl = document.createElement('a-entity');
      newSpotEl.setAttribute('id', spot.id);
      newSpotEl.setAttribute('scale', spot.scale);
  
      spot.nav.forEach(nav => {
        // Expresión regular para obtener el nombre del punto objetivo - #<pointX>;
        const regex = /\#(.*?)\;/gm;
        const spotScene = regex.exec(nav.spotProp)[1];
  
        // Obtener el punto desde 'points' que incluye el punto buscado
        const scene = map.scenes.filter(scene => (
          scene.id === spotScene
        ))[0];
  
        // Establecer nueva variable según el valor de spot.spotProp
        const newSpot = `linkto:${scene.src}; spotgroup:${scene.id}`;
  
        // Crear una imagen en un plano y establecer sus atributos
        const newImage = document.createElement('a-image');
        newImage.setAttribute('spot', newSpot);
        newImage.setAttribute('position', nav.position);
  
        // Adjuntar la imagen al elemento del hotspot
        newSpotEl.appendChild(newImage);
      });
  
      // Adjuntar <a-entity> a la escena de hotspots
      reloadedHotspots.appendChild(newSpotEl);
    });
  }
  