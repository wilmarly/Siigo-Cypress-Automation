# langeage: es
Feature: Autenticación de usuario en Siigo web

    Como usuario del sistema
    Quiero autenticarme en Siigo web
    Para acceder a las funcionalidades de l aplicación web

  @e2e @autenticacion @golden-path
  Scenario: Acceso exitoso a la plataforma
    Given que visualizo la página de login
    When introduzco mis datos de acceso válidos
    Then el sistema me permite ingresar a la plataforma
