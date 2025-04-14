// Importación de funciones de Cucumber para definir los pasos Given/When/Then
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Importación de las páginas necesarias para interactuar con la UI
import { dashboardPage } from "../../pages/sunnyDay/DashboardPage";
import { createThirdPartyPage } from "../../pages/sunnyDay/CreateThirdPartyPage";
import { profileCreatedPage } from "../../pages/sunnyDay/ProfileCreatedPage";

// ========== PASOS CUANDO (When) ==========

/**
 * @step When hago clic en el botón superior {string}
 * @param {string} buttonName - Nombre del botón usado para logging.
 * @description Hace clic en el botón principal de creación en el Dashboard.
 */
When("hago clic en el botón superior {string}", (buttonName) => {
    // Llama al método correspondiente en DashboardPage
    dashboardPage.clickCreateButton();
    console.log("Clic en botón superior: ", buttonName);
});

/**
 * @step When selecciono la opción {string}
 * @param {string} optionSelected - Opción seleccionada
 * @description Selecciona una opción del menú principal (ej. "Clientes").
 */
When("selecciono la opción {string}", (optionSelected) => {
    // Llama al método correspondiente en DashboardPage
    dashboardPage.clickClientsMenuOption();
    console.log("Opción seleccionada", optionSelected);
});

/**
 * @step When completo el formulario de Datos básicos con datos válidos
 * @description Llena la sección de datos básicos del formulario de creación.
 */
When("completo el formulario de Datos básicos con datos válidos", () => {
    // Llama al método de llenado del formulario en CreateThirdPartyPage 
    createThirdPartyPage.fillBasicDataForm();
    console.log("Formulario de Datos Básicos completado.");
});

/**
 * @step When completo el formulario de Datos para facturación y envío con datos válidos
 * @description Llena la sección de facturación y envío del formulario.
 */
When("completo el formulario de Datos para facturación y envío con datos válidos", () => {
    // Llama al método correspondiente en CreateThirdPartyPage 
    createThirdPartyPage.fillBillingAndShippingForm();
    cy.log("Formulario de Datos para Facturación y Envío completado.");
});

/**
 * @step When completo el formulario de Contactos con datos válidos
 * @description Llena la sección de contactos del formulario.
 */
When("completo el formulario de Contactos con datos válidos", () => {
    // Llama al método correspondiente en CreateThirdPartyPage 
    createThirdPartyPage.fillContactsForm();
    cy.log("Formulario de Contactos completado.");
});

/**
 * @step When completo el formulario de Vendedor y cobrador con datos válidos
 * @description Llena la sección de vendedor y cobrador del formulario.
 */
When("completo el formulario de Vendedor y cobrador con datos válidos", () => {
    // Llama al método correspondiente en CreateThirdPartyPage
    createThirdPartyPage.fillSellerAndCollectorForm();
    cy.log("Formulario de Vendedor y Cobrador completado.");
});

/**
 * @step When completo el formulario de Observaciones con datos válidos
 * @description Llena la sección de observaciones del formulario.
 */
When("completo el formulario de Observaciones con datos válidos", () => {
    cy.log("ingresa al paso completo el formulario de Observaciones con datos válidos");
    // Llama al método correspondiente en CreateThirdPartyPage
    createThirdPartyPage.fillObservationsForm();
    cy.log("Formulario de Observaciones completado.");
});

/**
 * @step When hago clic en {string}
 * @param {string} buttonName - Nombre del botón 
 * @description Hace clic en un botón de acción
 */
When("hago clic en {string}", (buttonName) => {
    // Llama al método correspondiente en CreateThirdPartyPage
    profileCreatedPage.clickSaveButton();
    cy.log(`Clic en botón: "${typeof buttonName}"`);
});

// ==================== PASOS 'THEN' (Validaciones) ====================

/**
 * @step Then el sistema muestra un mensaje de éxito {string}
 * @param {string} successMessage - El mensaje de éxito esperado.
 * @description Valida que aparezca un mensaje de confirmación/éxito.
 */
Then("el sistema muestra un mensaje de éxito {string}", (successMessage) => {
    // Llama al método de validación en ProfileCreatedPage 
    profileCreatedPage.validateSuccessMessageIsVisible(successMessage);
    cy.log(`Validado mensaje de éxito: "${typeof successMessage}"`);
});

/**
 * @step Then puedo visualizar el {string}
 * @param {string} profilePageTitle - El título esperado en la página de perfil.
 * @description Valida que se muestre la página de perfil del tercero creado.
 */
Then("puedo visualizar el {string}", (profilePageTitle) => {
    // Llama al método de validación en ProfileCreatedPage
    profileCreatedPage.validateProfilePageTitleIsVisible(profilePageTitle);
    cy.log(`Validado título de página de perfil: "${typeof profilePageTitle}"`);
});