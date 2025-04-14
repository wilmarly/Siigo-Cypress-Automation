// ***********************************************
// Archivo: commands.js
// Autor: [Wilmar Sánchez]
// Fecha de Modificación: 2025-04-13
// Descripción: Este archivo es el lugar ideal para definir
// comandos personalizados de Cypress (`Cypress.Commands.add(...)`)
// o para sobrescribir comandos existentes (`Cypress.Commands.overwrite(...)`).
// Los comandos definidos aquí estarán disponibles globalmente en tus pruebas (a través de `cy.`).
 //
// Para ejemplos más completos sobre comandos personalizados:
// https://on.cypress.io/custom-commands
// ***********************************************

// --- Importaciones de Plugins o Comandos Externos ---

// Importa y habilita el soporte para interactuar con elementos dentro de Shadow DOM.
// ¡Esencial para aplicaciones que usan Web Components!
 import "cypress-shadow-dom";

// --- Comandos Personalizados (Ejemplos Comentados) ---

// Ejemplo 1: Comando padre para login (si no se usa Cucumber con Background)
// Cypress.Commands.add('login', (username, password) => {
//   cy.visit('/login'); // Navega a la página de login
//   cy.get('#username').type(username);
//   cy.get('#password').type(password);
//   cy.get('button[type="submit"]').click();
//   cy.url().should('include', '/dashboard'); // Verifica redirección
// });

// Ejemplo 2: Comando hijo para obtener un elemento específico por data-testid
// Cypress.Commands.add('getByTestId', (testId) => {
//   cy.get(`[data-testid="${testId}"]`);
// });
// Uso: cy.getByTestId('boton-guardar').click();

// Ejemplo 3: Comando dual (puede encadenarse o usarse directamente desde `cy`)
// Cypress.Commands.add('logShadowDom', { prevSubject: 'optional' }, (subject, message) => {
//   const element = subject ? cy.wrap(subject) : cy;
//   element.shadow().then(shadowRoot => {
//     console.log(message || 'Shadow DOM content:', shadowRoot);
//   });
// });
// Uso: cy.get('mi-componente').logShadowDom('Contenido de mi-componente:');
//      cy.logShadowDom(undefined, 'Log sin elemento previo');

// Ejemplo 4: Sobrescribir `cy.visit` para añadir logs o acciones comunes
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
//   cy.log(`Visitando URL: ${url}`);
//   // Podría añadirse lógica como esperar a que la red esté inactiva, etc.
//   const result = originalFn(url, options);
//   cy.log(`Navegación a ${url} completada.`);
//   return result; // Siempre retorna el resultado de la función original
// });

// --- Comandos Específicos del Proyecto Actual ---
// (Actualmente no hay comandos personalizados definidos más allá de los importados)

// Nota: Mantén este archivo organizado. Agrupa comandos relacionados
// y añade comentarios claros sobre qué hace cada comando, sus argumentos
// y si es de tipo padre, hijo o dual.