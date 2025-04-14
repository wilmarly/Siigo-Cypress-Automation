/**
 * @class ProfileCreatedPage
 * @description Representa la página que se muestra después de guardar exitosamente
 * la creación o edición de un tercero (Perfil del tercero).
 * Uso principalmente para validar mensajes de éxito y la presencia de elementos clave.
 * @author [Wilmar Sánchez]
 * @version 1.1 (Modificado 2025-04-13)
 */
class ProfileCreatedPage {
    // Tiempo máximo de espera para los elementos de esta página
    static _maxWaitTime = 20000; // 20 segundos

    /**
     * @memberof ProfileCreatedPage
     * @description Selectores de elementos UI de la página de perfil creado.
     */
    uiElements = {
        saveButton: () => cy.get('button.button.green.filled', {
            timeout: ProfileCreatedPage._maxWaitTime,
        }).contains('Guardar'), // Busca por texto 'Guardar'

        // Mensaje de notificación/toast de éxito
        successMessageToast: (expectedMessage) => cy.contains('div', expectedMessage, { timeout: ProfileCreatedPage._maxWaitTime }),

        // Título principal de la página de perfil (H2)
        profileTitleHeader: (expectedTitle) => cy.contains('h2', expectedTitle, { timeout: ProfileCreatedPage._maxWaitTime })
    }

    // ==================== ACTION METHODS ====================

    /**
     * Hace clic en el botón "Guardar".
     */
    clickSaveButton() {
        cy.log("Intentando hacer clic en el botón 'Guardar' en la página de perfil creado...");
        this.uiElements.saveButton()
            .should('be.visible')
            .click();
        cy.log("Clic en 'Guardar' realizado.");
    }

    // ==================== VALIDATION METHODS ====================

    /**
     * Valida que un mensaje de éxito (toast o similar) esté visible en la página.
     * @param {string} expectedMessage - El texto exacto del mensaje a validar.
     */
    validateSuccessMessageIsVisible(expectedMessage) {
        cy.log(`Validando visibilidad del mensaje de éxito: "${expectedMessage}"`);
        this.uiElements.successMessageToast(expectedMessage).should('be.visible');
        cy.log("Mensaje de éxito encontrado y visible.");
    }

    /**
     * Valida que el título principal (H2) de la página de perfil creado sea visible y contenga el texto esperado.
     * @param {string} expectedTitle - El texto esperado en el título H2.
     */
    validateProfilePageTitleIsVisible(expectedTitle) {
        cy.log(`Validando visibilidad del título de la página: "${expectedTitle}"`);
        this.uiElements.profileTitleHeader(expectedTitle).should('be.visible');
        cy.log("Título de la página encontrado y visible.");
    }

    // ========== MÉTODOS GENERALES ==========
    /**No hay por el momento*/
}
// Exporta una instancia reutilizable de la clase PerfilCreadoPage
export const profileCreatedPage = new ProfileCreatedPage();