// Clase que encapsula la pantalla de autenticación en Siigo web.
// Define selectores y acciones para el proceso de login.
class AuthenticationPage {
// ================= PROPIEDADES / ATRIBUTOS =================

    // Selectores de los elementos clave en la UI
    ui = {
      // userField: función que devuelve el input de usuario, con un timeout de 15s
      userField: () => cy.get('input-atom#username', { timeout: 15000 }),
  
      // passField: función que devuelve el input de contraseña, con un timeout de 15s
      passField: () => cy.get('input-atom#current-password', { timeout: 15000 }),
  
      // submitButton: función que devuelve el botón de envío de credenciales
      submitButton: () => cy.get('#login-submit'),
  
      // userLabel: función que devuelve el elemento que muestra el nombre de usuario tras login
      userLabel: () => cy.get('.company-header-title', { timeout: 20000 }),
    };
  
// ================= MÉTODOS =================
  
    /**
     * enterUsername(name)
     *   - name: string con el nombre de usuario a escribir
     *
     * 1. Captura cualquier excepción no controlada y la ignora para evitar que falle el test.
     * 2. Obtiene el componente userField (Web Component con Shadow DOM).
     * 3. Verifica que el shadowRoot exista en el elemento.
     * 4. Entra al Shadow DOM con .shadow().
     * 5. Busca el input interno con id "username-input" (timeout 15s).
     * 6. Verifica que el input sea visible.
     * 7. Escribe el valor 'name' forzadamente en el campo.
     */
    enterUsername(name) {
      cy.on('uncaught:exception', () => false); // evita que errores rompan el test
  
      this.ui.userField()                           // obtiene el host del Shadow DOM
        .should(($el) => {                          // aserción para comprobar existencia del shadowRoot
          expect($el[0].shadowRoot).to.exist;
        })
        .shadow()                                   // penetra el Shadow DOM
        .find('input#username-input', { timeout: 15000 }) // localiza el input interno
        .should('be.visible')                       // comprueba visibilidad
        .type(name, { force: true });               // escribe el usuario
    }
  
    /**
     * enterPassword(secret)
     *   - secret: string con la contraseña a escribir
     *
     * Funciona de manera análoga a enterUsername, pero para el campo de contraseña.
     */
    enterPassword(secret) {
      cy.on('uncaught:exception', () => false); // ignora excepciones no capturadas
  
      this.ui.passField()                          // obtiene el host del Shadow DOM
        .should(($el) => {                         // asegura que el shadowRoot exista
          expect($el[0].shadowRoot).to.exist;
        })
        .shadow()                                  // penetra el Shadow DOM
        .find('input#password-input', { timeout: 15000 }) // localiza el input de contraseña
        .should('be.visible')                      // comprueba que sea visible
        .type(secret, { force: true });            // escribe la contraseña
    }
  
    /**
     * clickSubmit()
     *
     * Hace clic en el botón de envío de credenciales para iniciar el login.
     */
    clickSubmit() {
      this.ui.submitButton().click(); // dispara el evento click en el botón
    }
  
    /**
     * verifyUserVisible()
     *
     * Verifica que, tras el login, el label con el nombre de usuario sea visible en la UI.
     */
    verifyUserVisible() {
      this.ui.userLabel().should('be.visible'); // aserción de visibilidad
    }
  
    /**
     * performLogin(username, password)
     *   - username: nombre de usuario
     *   - password: contraseña
     *
     * Método compuesto que orquesta todo el flujo de autenticación:
     * 1. Ingresar usuario
     * 2. Ingresar contraseña
     * 3. Hacer clic en submit
     */
    performLogin(username, password) {
      this.enterUsername(username); // paso 1
      this.enterPassword(password); // paso 2
      this.clickSubmit();           // paso 3
    }
  }
  
  // Exporta una instancia de AuthenticationPage para reutilizar en los tests
  export const authenticationPage = new AuthenticationPage();
  