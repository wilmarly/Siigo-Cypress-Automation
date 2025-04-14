// ***********************************************************
// Este archivo support/e2e.js se carga automáticamente 
// antes de los archivos de prueba.
//
// Es un buen lugar para colocar configuraciones globales 
// y comportamientos personalizados que modifiquen Cypress.
//
// Puedes cambiar la ubicación de este archivo o desactivar
// su carga automática con la opción 'supportFile' en la configuración.
//
// Más información aquí:
// https://on.cypress.io/configuration
// ***********************************************************

// ========== IMPORTACIÓN DE COMANDOS PERSONALIZADOS ==========

// Importación de comandos personalizados desde el archivo commands.js
import './commands';

// Integración del plugin Allure para generación de reportes avanzados
import '@shelex/cypress-allure-plugin';

// También se podría usar la sintaxis CommonJS si se prefiere:
// require('./commands');

// ========== CONFIGURACIÓN GLOBAL ANTES DE CADA TEST ==========

beforeEach(() => {
    // Limpia todas las cookies antes de cada prueba
    cy.clearCookies();

    // Limpia el localStorage para evitar datos persistentes entre pruebas
    cy.clearLocalStorage();

    // Opcional: Limpia el sessionStorage si es necesario
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
});
