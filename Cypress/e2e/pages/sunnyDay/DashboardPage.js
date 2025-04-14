/**
 * @class DashboardPage
 * @description Representa la página principal (Dashboard) después del inicio de sesión.
 * Contiene elementos y acciones comunes para la navegación desde el dashboard.
 * @author [Wilmar Sánchez]
 * @version 1.1 (Modificado 2025-04-13)
 */
class DashboardPage {

    // Tiempo máximo de espera para elementos específicos del dashboard
    static _maxWaitTime = 20000; // 20 segundos

    /**
     * @memberof DashboardPage
     * @description Selectores de elementos UI del Dashboard.
     */
    uiElements = {
        // Botón "+ Crear" en la cabecera
        createButton: () => cy.get('siigo-button-atom[data-id="header-create-button"]', { timeout: DashboardPage._maxWaitTime }),
        // Opción "Clientes" en el menú desplegable que aparece al hacer clic en "+ Crear"
        clientsMenuOption: () => cy.get('a[data-value="Clientes"]', { timeout: DashboardPage._maxWaitTime }),
    }

    // ==================== ACTION METHODS ====================

    /**
     * Hace clic en el botón "+ Crear" de la cabecera.
     * Maneja el acceso al Shadow DOM del web component del botón.
     * Incluye un manejador para ignorar excepciones no capturadas que a veces ocurren en Cypress.
     */
    clickCreateButton() {
        console.log("Clic en el botón de creación del Dashboard");
        // Ignora excepciones no capturadas que puedan ocurrir durante la ejecución
        cy.on('uncaught:exception', (err, runnable) => {
            console.error('Excepción no capturada ignorada:', err);
            return false; // Previene que Cypress falle el test
        });

        // Accede al botón dentro del shadow DOM
        this.uiElements.createButton()
            // Verifica que el shadowRoot exista antes de intentar accederlo
            .should(($element) => {
                expect($element[0].shadowRoot).to.exist;
            })
            .shadow() // Accede al shadow DOM
            .find('button') // Encuentra el elemento <button> real dentro
            .should('be.visible') // Espera a que sea visible
            .click({ force: true }); // Clic forzado si es necesario
    }
    /**
     * Hace clic en la opción "Clientes" del menú (después de hacer clic en "+ Crear").
     */
    clickClientsMenuOption() {
        this.uiElements.clientsMenuOption()
            .should('be.visible') // Asegura que la opción sea visible antes de hacer clic
            .click();
    }
}
export const dashboardPage = new DashboardPage();
