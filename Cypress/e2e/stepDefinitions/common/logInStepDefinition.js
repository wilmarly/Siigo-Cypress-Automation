// Importación de funciones de Cucumber para definir los pasos Given/When/Then
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Importación de la página de inicio de sesión
import { authenticationPage } from "../../pages/common/AuthenticationPage";


Given('que visualizo la página de login', function () {
  cy.visit(`${Cypress.env("STAGING_URL_SIIGO")}#/login`);
});

When("introduzco mis datos de acceso válidos", () => {
    authenticationPage.performLogin(
    Cypress.env("QA_USER"),
    Cypress.env("QA_PASSWORD")
  );
});

Then('el sistema me permite ingresar a la plataforma', function () {
    authenticationPage.verifyUserVisible();
    cy.screenshot('paso_3_Validar nombre de usuario');
});
