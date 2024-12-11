# UCJC TOUR 

# Índice

1. [Descripción](#descripción)
2. [Requisitos](#requisitos)
   - [Tecnologia necesaria](#tecnologia-necesaria)
3. [Personalización](#personalización)
4. [Archivos del proyecto](#archivos-del-proyecto)
5. [Funcionalidades](#funcionalidades)
6. [Integración con Aplicaciones de Guía](#integración-con-aplicaciones-de-guía)
7. [Ejemplo de Uso](#ejemplo-de-uso)
8. [Conclusión](#conclusión)


## Descripción

**UCJC TOUR** UCJC Tour es una aplicación interactiva basada en A-Frame que permite explorar virtualmente la Universidad Camilo José Cela. Los usuarios pueden navegar entre diferentes escenas, interactuar con puntos de interés (hotspots) y experimentar un recorrido inmersivo en 360 grados.

## Requisitos
### Tecnologia necesarias

- **A-Frame**:Framework para crear experiencias de realidad virtual en la web
  -aframe-animation-component
  -aframe-look-at-component
  -aframe-asset-on-demand-component
- **JSON**:Para la configuración de escenas y hotspots
- **HTML y JavaScript**: Para la estructura y la lógica del proyecto
  
### Personalización

-**Agregar Nuevas Escenas**

    Agrega una nueva imagen en el directorio img/.
    
    Actualiza el archivo json/map.json para incluir la nueva escena y sus relaciones con otros hotspots.
    
    La función addHotspots generará automáticamente los elementos necesarios.

## Archivos del Proyecto
- **index.html**: Archivo principal que define la estructura HTML de la aplicación y conecta las bibliotecas y scripts necesario
- **index.js**: Define los componentes de A-Frame y gestiona la interacción entre los hotspots y las escenas
- **zoom.js**: Controla la funcionalidad de zoom para la cámara
- **map.json**: Archivo JSON que define las escenas, sus relaciones y los datos de navegación
- **music.mp3**: Archivo de audio que se reproduce durante el recorrido

## Funcionalidades

El proyecto UCJC Tour incluye las siguientes funcionalidades destacadas:
1. **Exploración Interactiva**: Navega por diferentes ubicaciones mediante hotspots que conectan escenas interactivas.
2. **Experiencia Inmersiva**: Controla la cámara con el ratón
3. **Música de Fondo Personalizable**: Mejora la experiencia del usuario con audio ambiental que puede ser adaptado según las necesidades
4. **Configuración Dinámica de Escenarios**:Escenas y conexiones gestionadas a través de un archivo JSON para facilitar la expansión y personalización

## Integración con Aplicaciones de Guía
Para mejorar la accesibilidad, **UCJC Tour** puede usarse como herramienta para desarrollar recorridos interactivos complementados con guías o subtítulos generados por software de transcripción

## Ejemplo de Uso
- Un ejemplo práctico del funcionamiento de UCJC Tour sería el siguiente:

    1º-El usuario accede al tour y visualiza la primera escena de la universidad.
    2º-Al hacer clic en un hotspot, la escena cambia para mostrar otra ubicación, como el auditorio o cafeteria.
    3º-Mientras explora, se reproduce música de fondo y los iconos del tour apuntan automáticamente hacia la cámara para facilitar la interacción.

## Conclusión
  **UCJC Tour** es una herramienta potente y flexible para crear experiencias interactivas e inmersivas. Gracias a su diseño basado en A-Frame y a la gestión dinámica de recursos mediante JSON, el proyecto es fácil de extender y personalizar. Este tour ofrece una forma innovadora de explorar la Universidad Camilo José Cela, sirviendo como base para futuros proyectos en entornos educativos o promocionales.
de texto en nuestra aplicación, lo que amplía aún más sus posibilidades de comunicación y aprendizaje. Amigo no solo promueve la inclusión, sino que también empodera a las personas a expresarse de manera efectiva y confiada.
