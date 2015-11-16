# ConferencesApp
Academic conference information system built with Angular.js and Bootstrap.

## Ejecutar
Para ver la aplicación en funcionamiento, es necesario primero instalar todas las dependencias de Bower y de Node.

    bower install
    npm install

Tras esto, basta con abrir app/index.html en un navegador normal.

## Pruebas
Las pruebas se encuentran en el archivo `test/spec/ConferenceService.spec.js`.

Éstas se encuentran implementadas utilizando Jasmine, con Karma como motor. El navegador utilizado por Karma es PhantomJS, por lo que las pruebas son headless. Para correrlas, se debe utilizar Grunt.

    grunt karma

Por defecto, la tarea de Grunt ejecuta Karma.
