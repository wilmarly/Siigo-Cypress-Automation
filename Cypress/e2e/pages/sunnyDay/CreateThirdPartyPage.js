import { dataGenerator } from "Cypress/support/helpers/DataGenerator.js";

// Clase que encapsula toda la lógica y elementos de la página para crear un tercero en el sistema
class CreateThirdPartyPage {
    // Tiempo máximo de espera general para los elementos de la página (en milisegundos)
    static _maxWaitTime = 20000; // 20 segundos

    /**
     * @memberof CreateThirdPartyPage
     * @description Objeto que contiene los selectores de los elementos de la UI.
     * Se utilizan funciones para obtener los elementos con `cy.get()`,
     * permitiendo reintentos y manejo de timeouts.
     */
    uiElements = {
        // --- Selectores Principales (Hosts de Web Components) ---
        hostIdentificationInput: () => cy.get('siigo-identification-input-web', { timeout: CreateThirdPartyPage._maxWaitTime }),
        hostBranchCodeInput: () => cy.get('siigo-textfield-web[type="number"][maxlength="3"]', { timeout: CreateThirdPartyPage._maxWaitTime }),
        hostCityAutocomplete: () => cy.get('siigo-autocomplete-web[key-id="city"]', { timeout: CreateThirdPartyPage._maxWaitTime }),
        hostBasicDataTextFields: () => cy.get('siigo-textfield-web', { timeout: CreateThirdPartyPage._maxWaitTime }), // Selector genérico para campos de texto
        hostContactPhoneGroup: () => cy.get('siigo-phone-web', { timeout: CreateThirdPartyPage._maxWaitTime }),
        hostContactEmailConditional: () => cy.get('siigo-textfield-web[name="contactemail"]'), // Email de contacto (puede no estar siempre visible)
        hostVatRegimeDropdown: () => cy.get('siigo-dropdownlist-web'), // Dropdown para régimen de IVA
        hostBillingPhoneIndicative: () => cy.get('siigo-textfield-web[name="indicativephone"]'), // Indicativo tel. facturación
        hostBillingPhoneNumber: () => cy.get('siigo-textfield-web[name="contactphone"]'), // Número tel. facturación
        hostContactFirstName: () => cy.get('siigo-textfield-web[name="FirstName"]'), // Nombre del contacto
        hostContactLastName: () => cy.get('siigo-textfield-web[name="LastName"]'), // Apellido del contacto
        hostContactEmail: () => cy.get('siigo-emailinput-web[name="Email"]'), // Email del contacto

        // --- Botones para expandir/colapsar secciones ---
        expandContactsSectionButton: () => cy.contains('div', 'Contactos').find('i.clickable.arrow.down'),
        expandSellerCollectorSectionButton: () => cy.contains('div', 'Vendedor y cobrador').find('i.clickable.arrow.down'),
        expandObservationsSectionButton: () => cy.contains('div', 'Observaciones').find('i.clickable.arrow.down'),

        // --- Otros Campos de Contacto ---
        hostContactPosition: () => cy.get('siigo-textfield-web[name="Charge"]'), // Cargo del contacto
        hostContactIndicative: () => cy.get('siigo-textfield-web[name="Indicative"]'), // Indicativo tel. contacto
        hostContactNumber: () => cy.get('siigo-textfield-web[name="Number"]'), // Número tel. contacto

        // --- Campos de Autocompletado (Vendedor/Cobrador) ---
        hostSellerAutocomplete: () => cy.get('siigo-autocomplete-web[key-id="salesman"]'),
        hostCollectorAutocomplete: () => cy.get('siigo-autocomplete-web[key-id="collector"]'),

        // --- Campo de Observaciones ---
        hostObservationTextarea: () => cy.get('siigo-textarea-web'),

        // --- Selectores Internos (Dentro de Shadow DOM o Inputs directos) ---
        // Nota: Estos selectores se usan con `.shadow().find()` sobre los hosts anteriores.
        cityInput: () => 'input[id="inputAutocompletecity"]',
        contactIndicativeInput: () => 'input.mdc-text-field__input.siigo-phone[name="Indicativo"]',
        contactPhoneInput: () => 'input.mdc-text-field__input.siigo-phone[name="# de Teléfono"]',
        contactExtensionInput: () => 'input.mdc-text-field__input.siigo-phone[name="Extensión"]',
        contactEmailConditionalInput: () => 'input.mdc-text-field__input[name="contactemail"]',
        vatRegimeDropdownIcon: () => 'i.mdc-select__dropdown-icon.azure', // Icono para abrir dropdown
        billingIndicativeInput: () => 'input.mdc-text-field__input[name="indicativephone"]',
        billingPhoneInput: () => 'input.mdc-text-field__input[name="contactphone"]',
        contactFirstNameInput: () => 'input.mdc-text-field__input[name="FirstName"]',
        contactLastNameInput: () => 'input.mdc-text-field__input[name="LastName"]',
        contactEmailInput: () => 'input[id="emailinput"]',
        contactPositionInput: () => 'input.mdc-text-field__input[name="Charge"]',
        contactPhoneIndicativeInput: () => 'input.mdc-text-field__input[name="Indicative"]',
        contactPhoneNumberInput: () => 'input.mdc-text-field__input[name="Number"]',
        sellerAutocompleteInput: () => 'input.mdc-text-field__input[name="inputAutocompletesalesman"]',
        collectorAutocompleteInput: () => 'input.mdc-text-field__input[name="inputAutocompletecollector"]',
        observationTextareaInput: () => 'textarea[id="textareainput"]',
        identificationInput: () => 'input.input-identification',
        branchCodeInput: () => 'input.mdc-text-field__input[type="number"]',

        // --- Inputs identificados por Label (para campos genéricos) ---
        // Se usa en `fillHiddenInputByLabel` para encontrar el input correcto basado en su etiqueta visible.
        firstNameInputAndLabel: () => ({ inputSelector: 'input.mdc-text-field__input[type="text"]', labelText: 'Nombres' }),
        lastNameInputAndLabel: () => ({ inputSelector: 'input.mdc-text-field__input[type="text"]', labelText: 'Apellidos' }),
        commercialNameInputAndLabel: () => ({ inputSelector: 'input.mdc-text-field__input[type="text"]', labelText: 'Nombre comercial' }),
        addressInputAndLabel: () => ({ inputSelector: 'input.mdc-text-field__input[type="text"]', labelText: 'Dirección' }),
        postalCodeInputAndLabel: () => ({ inputSelector: 'input.mdc-text-field__input[type="text"]', labelText: 'Código postal' }),
        // Nota: El selector de ciudad `inputYLabelCiudad` parece redundante con `hostCityAutocomplete`, se omite por claridad.
    }

    // ==================== ACTION METHODS ====================

    /**
     * Escribe el número de identificación en el campo correspondiente.
     * @param {string} identificationNumber - El número de identificación a escribir.
     */
    enterIdentificationNumber(identificationNumber) {
        this.uiElements.hostIdentificationInput().shadow()
            .find(this.uiElements.identificationInput())
            .should('be.visible')
            .type(identificationNumber, { force: true }); // force: true útil si el elemento está parcialmente cubierto
    }

    /**
     * Escribe el código de la sucursal.
     * @param {string} branchCode - El código de sucursal a escribir.
     */
    enterBranchCode(branchCode) {
        // .first() es necesario si el selector 'siigo-textfield-web[type="number"]' puede encontrar más de uno
        this.uiElements.hostBranchCodeInput().first().shadow()
            .find(this.uiElements.branchCodeInput())
            .should('be.visible')
            .type(branchCode, { force: true });
    }

    /**
   * Escribe los nombres completos usando el método genérico `fillInputByLabel`.
   * @param {string} firstNames - Los nombres a escribir.
   */
    enterFirstNames(firstNames) {
        // --- Log dentro del método que llama al problemático ---
        console.log("--- DEBUG: Entering enterFirstNames ---"); // <-- NUEVO
        // --- FIN LOG ---
        // Obtiene los selectores específicos para este campo (la función devuelve un objeto)
        const field = this.uiElements.firstNameInputAndLabel();
        // Llama al método genérico pasando:
        // 1. El resultado de ejecutar la función selectora del host (un Cypress Chainable)
        // 2. El selector del input interno (string)
        // 3. El texto de la etiqueta a buscar (string)
        // 4. El valor a escribir
        this.fillInputByLabel(
            this.uiElements.hostBasicDataTextFields(), // <-- Llamada a la función selectora con ()
            field.inputSelector,
            field.labelText,
            firstNames
        );
    }


    /**
     * Escribe los apellidos completos usando `fillInputByLabel`.
     * @param {string} lastNames - Los apellidos a escribir.
     */
    enterLastNames(lastNames) {
        const field = this.uiElements.lastNameInputAndLabel();
        this.fillInputByLabel(
            this.uiElements.hostBasicDataTextFields(),
            field.inputSelector,
            field.labelText,
            lastNames
        );
    }

    /**
     * Escribe el nombre comercial usando `fillInputByLabel`.
     * @param {string} commercialName - El nombre comercial a escribir.
     */
    enterCommercialName(commercialName) {
        const field = this.uiElements.commercialNameInputAndLabel();
        this.fillInputByLabel(
            this.uiElements.hostBasicDataTextFields(),
            field.inputSelector,
            field.labelText,
            commercialName
        );
    }

    /**
     * Selecciona una ciudad del campo de autocompletado.
     * @param {string} cityName - La ciudad a buscar y seleccionar.
     */
    selectCity(cityName) {
        // Asegura que el componente host sea visible
        this.uiElements.hostCityAutocomplete().should('be.visible');
        // Intenta hacer clic en la etiqueta dentro del shadow DOM para activar el input
        this.uiElements.hostCityAutocomplete().shadow().find('label').click({ force: true });

        // Escribe el nombre de la ciudad en el input de autocompletado
        this.uiElements.hostCityAutocomplete()
            .shadow()
            .find(this.uiElements.cityInput(), { timeout: CreateThirdPartyPage._maxWaitTime })
            .should('be.visible')
            .type(cityName);

        // Espera a que aparezca la opción en el dropdown y haz clic en ella
        cy.contains('div', cityName, { timeout: CreateThirdPartyPage._maxWaitTime })
            .should('be.visible')
            .click();
    }

    /**
     * Escribe la dirección usando `fillInputByLabel`.
     * @param {string} address - La dirección a escribir.
     */
    enterAddress(address) {
        const field = this.uiElements.addressInputAndLabel();
        this.fillInputByLabel(
            this.uiElements.hostBasicDataTextFields(),
            field.inputSelector,
            field.labelText,
            address
        );
    }

    /**
     * Escribe el indicativo telefónico en la sección de contacto principal.
     * @param {string} indicative - El indicativo a escribir.
     */
    enterContactIndicative(indicative) {
        this.uiElements.hostContactPhoneGroup().shadow()
            .find(this.uiElements.contactIndicativeInput())
            .should('be.visible')
            .type(indicative, { force: true });
    }

    /**
     * Escribe el número de teléfono en la sección de contacto principal.
     * @param {string} phoneNumber - El número de teléfono a escribir.
     */
    enterContactPhoneNumber(phoneNumber) {
        this.uiElements.hostContactPhoneGroup().shadow()
            .find(this.uiElements.contactPhoneInput())
            .should('be.visible')
            .type(phoneNumber, { force: true });
    }

    /**
     * Escribe la extensión telefónica en la sección de contacto principal.
     * @param {string} extension - La extensión a escribir.
     */
    enterContactExtension(extension) {
        this.uiElements.hostContactPhoneGroup().shadow()
            .find(this.uiElements.contactExtensionInput())
            .should('be.visible')
            .type(extension, { force: true });
    }

    /**
     * Escribe el correo electrónico de contacto (campo condicional).
     * @param {string} email - El correo electrónico a escribir.
     */
    enterConditionalContactEmail(email) {
        this.uiElements.hostContactEmailConditional().shadow()
            .find(this.uiElements.contactEmailConditionalInput())
            .should('be.visible')
            .type(email, { force: true });
    }

    /**
     * Selecciona el tipo de régimen de IVA del dropdown.
     * @param {string} vatRegimeType - El texto de la opción a seleccionar (ej. 'Responsable de IVA').
     */
    selectVatRegimeType(vatRegimeType) {
        // .eq(3) sugiere que hay varios dropdowns; esto puede ser frágil.
        // Considera usar un selector más específico si es posible.
        this.uiElements.hostVatRegimeDropdown().eq(3)
            .should('exist') // Asegura que el elemento exista antes de interactuar
            .shadow()
            .find(this.uiElements.vatRegimeDropdownIcon()) // Encuentra el icono para hacer clic
            .should('be.visible')
            .click({ force: true }); // force: true por si hay elementos superpuestos

        // Espera a que la opción del dropdown sea visible y haz clic
        cy.contains('span', vatRegimeType, { timeout: CreateThirdPartyPage._maxWaitTime })
            .should('be.visible')
            .click();
    }

    /**
     * Escribe el indicativo telefónico de facturación.
     * @param {string} billingIndicative - El indicativo a escribir.
     */
    enterBillingIndicative(billingIndicative) {
        this.uiElements.hostBillingPhoneIndicative().shadow()
            .find(this.uiElements.billingIndicativeInput())
            .should('be.visible')
            .type(billingIndicative, { force: true });
    }

    /**
     * Escribe el número de teléfono de facturación.
     * @param {string} billingPhoneNumber - El número a escribir.
     */
    enterBillingPhoneNumber(billingPhoneNumber) {
        this.uiElements.hostBillingPhoneNumber().shadow()
            .find(this.uiElements.billingPhoneInput())
            .should('be.visible')
            .type(billingPhoneNumber, { force: true });
    }

    /**
     * Escribe el código postal usando `fillInputByLabel`.
     * @param {string} postalCode - El código postal a escribir.
     */
    enterPostalCode(postalCode) {
        const field = this.uiElements.postalCodeInputAndLabel();
        this.fillInputByLabel(
            this.uiElements.hostBasicDataTextFields(),
            field.inputSelector,
            field.labelText,
            postalCode
        );
    }

    // --- Métodos para Secciones Colapsables ---

    /**
     * Expande la sección de 'Contactos'.
     */
    expandContactsSection() {
        this.uiElements.expandContactsSectionButton()
            .should('be.visible')
            .click({ force: true });
    }

    /**
     * Escribe el nombre del contacto en la sección 'Contactos'.
     * @param {string} contactFirstName - Nombre del contacto.
     */
    enterContactFirstName(contactFirstName) {
        this.uiElements.hostContactFirstName().shadow()
            .find(this.uiElements.contactFirstNameInput())
            .should('be.visible')
            .type(contactFirstName, { force: true });
    }

    /**
     * Escribe el apellido del contacto en la sección 'Contactos'.
     * @param {string} contactLastName - Apellido del contacto.
     */
    enterContactLastName(contactLastName) {
        this.uiElements.hostContactLastName().shadow()
            .find(this.uiElements.contactLastNameInput())
            .should('be.visible')
            .type(contactLastName, { force: true });
    }

    /**
     * Escribe el correo electrónico del contacto en la sección 'Contactos'.
     * @param {string} contactEmail - Correo del contacto.
     */
    enterContactEmail(contactEmail) {
        this.uiElements.hostContactEmail().shadow()
            .find(this.uiElements.contactEmailInput())
            .should('be.visible')
            .type(contactEmail, { force: true });
    }

    /**
     * Escribe el cargo del contacto en la sección 'Contactos'.
     * @param {string} contactPosition - Cargo del contacto.
     */
    enterContactPosition(contactPosition) {
        this.uiElements.hostContactPosition().shadow()
            .find(this.uiElements.contactPositionInput())
            .should('be.visible')
            .type(contactPosition, { force: true });
    }

    /**
     * Escribe el indicativo telefónico del contacto en la sección 'Contactos'.
     * @param {string} contactPhoneIndicative - Indicativo del contacto.
     */
    enterContactPhoneIndicative(contactPhoneIndicative) {
        this.uiElements.hostContactIndicative().shadow()
            .find(this.uiElements.contactPhoneIndicativeInput())
            .should('be.visible')
            .type(contactPhoneIndicative, { force: true });
    }

    /**
     * Escribe el número de teléfono del contacto en la sección 'Contactos'.
     * @param {string} contactPhoneNumber - Número del contacto.
     */
    enterContactPhoneNumberInSection(contactPhoneNumber) { // Renombrado para diferenciar del principal
        this.uiElements.hostContactNumber().shadow()
            .find(this.uiElements.contactPhoneNumberInput())
            .should('be.visible')
            .type(contactPhoneNumber, { force: true });
    }

    /**
     * Expande la sección 'Vendedor y cobrador'.
     */
    expandSellerCollectorSection() {
        this.uiElements.expandSellerCollectorSectionButton()
            .should('be.visible')
            .click({ force: true });
    }

    /**
     * Escribe y selecciona un vendedor del campo de autocompletado.
     * @param {string} sellerName - Nombre/email del vendedor a buscar y seleccionar.
     */
    selectSeller(sellerName) {
        this.uiElements.hostSellerAutocomplete().shadow()
            .find(this.uiElements.sellerAutocompleteInput())
            .should('be.visible')
            .type(sellerName, { force: true });

        // Selecciona la opción que aparece en el dropdown
        cy.contains('div', sellerName, { timeout: CreateThirdPartyPage._maxWaitTime })
            .should('be.visible')
            .click();
    }

    /**
     * Escribe y selecciona un cobrador del campo de autocompletado.
     * @param {string} collectorName - Nombre/email del cobrador a buscar y seleccionar.
     */
    selectCollector(collectorName) {
        this.uiElements.hostCollectorAutocomplete().shadow()
            .find(this.uiElements.collectorAutocompleteInput())
            .should('be.visible')
            .type(collectorName, { force: true });

        // Selecciona la opción que aparece en el dropdown
        cy.contains('div', collectorName, { timeout: CreateThirdPartyPage._maxWaitTime })
            .should('be.visible')
            .click();
    }

    /**
     * Expande la sección 'Observaciones'.
     */
    expandObservationsSection() {
        this.uiElements.expandObservationsSectionButton()
            .should('be.visible')
            .click({ force: true });
    }

    /**
     * Escribe texto en el campo de observaciones.
     * @param {string} observationText - El texto de la observación.
     */
    enterObservation(observationText) {
        this.uiElements.hostObservationTextarea().shadow()
            .find(this.uiElements.observationTextareaInput()) // Manteniendo nombre original si es específico
            .should('be.visible')
            .type(observationText, { force: true });
    }

    // ==================== HELPER METHODS ====================

    /**
* @private
 * Método auxiliar reutilizable para llenar campos de texto genéricos (`siigo-textfield-web`)
 * que se identifican por la etiqueta (label) visible asociada.
 * Útil cuando varios inputs comparten el mismo selector de host y de input interno,
 * diferenciándose solo por la etiqueta.
 *
 * @param {Cypress.Chainable<JQuery<HTMLElement>>} hostSelector - Chainable del selector del componente host (ej. el resultado de `this.uiElements.hostBasicDataTextFields()`).
 * @param {string} inputSelector - Selector CSS del input *dentro* del Shadow DOM del host.
 * @param {string} labelText - Texto exacto de la etiqueta (label) que identifica al campo deseado.
 * @param {string} valueToType - El valor que se escribirá en el campo.
 */

    fillInputByLabel(hostSelector, inputSelector, labelText, valueToType) {

    
        hostSelector.each(($hostElement) => {
            cy.wrap($hostElement)
                .shadow()
                .find('label')
                .invoke('text')
                .then((actualLabelText) => {
                    const cleanedLabel = actualLabelText.replace(/\*/g, '').trim();
                    if (cleanedLabel === labelText) {
                        cy.wrap($hostElement)
                            .shadow()
                            .find(inputSelector)
                            .should('be.visible')
                            .clear()
                            .type(valueToType, { force: true });
                    }
                });
        });
    }


    // ==================== FORM FILLING METHODS ====================
    // Métodos que agrupan el llenado de secciones completas del formulario,
    // utilizando el DataGenerator para obtener datos de prueba.

    /**
     * Llena todos los campos de la sección 'Datos básicos'.
     */
    fillBasicDataForm() {
        this.enterIdentificationNumber(dataGenerator.generateIdentificationNumber());
        this.enterBranchCode(dataGenerator.generateBranchCode());
        this.enterFirstNames(dataGenerator.generateFullName()); // Asumiendo que genera solo nombre(s)
        this.enterLastNames(dataGenerator.generateCompleteLastNames());
        this.enterCommercialName(dataGenerator.generateCommercialName());
        // Se usa un valor fijo 'CiudadPrueba', podría venir del generador si se necesita variedad
        this.selectCity("CiudadPrueba");
        this.enterAddress(dataGenerator.generateAddress());
        this.enterContactIndicative(dataGenerator.generateIndicative());
        this.enterContactPhoneNumber(dataGenerator.generatePhoneNumber());
        this.enterContactExtension(dataGenerator.generateExtension());
    }

    /**
     * Llena todos los campos de la sección 'Datos para facturación y envío'.
     */
    fillBillingAndShippingForm() {
        this.enterConditionalContactEmail(dataGenerator.generateEmail());
        this.selectVatRegimeType(dataGenerator.generateVatRegimeType());
        this.enterBillingIndicative(dataGenerator.generateIndicative());
        this.enterBillingPhoneNumber(dataGenerator.generatePhoneNumber());
        this.enterPostalCode(dataGenerator.generatePostalCode());
    }

    /**
     * Llena todos los campos de la sección 'Contactos'.
     */
    fillContactsForm() {
        this.expandContactsSection();
        this.enterContactFirstName(dataGenerator.generateContactFirstName());
        this.enterContactLastName(dataGenerator.generateContactLastName());
        this.enterContactEmail(dataGenerator.generateEmail()); // Reutiliza email genérico
        this.enterContactPosition(dataGenerator.generateJobTitle());
        this.enterContactPhoneIndicative(dataGenerator.generateIndicative());
        this.enterContactPhoneNumberInSection(dataGenerator.generatePhoneNumber());
    }

    /**
     * Llena los campos de la sección 'Vendedor y cobrador'.
     */
    fillSellerAndCollectorForm() {
        this.expandSellerCollectorSection();
        // Usando valores fijos como en el original, podrían venir de variables de entorno o del generador
        this.selectSeller("retoautomationsiigo@yopmail.com");
        this.selectCollector("retoautomationsiigo@yopmail.com");
    }

    /**
     * Llena el campo de la sección 'Observaciones'.
     */
    fillObservationsForm() {
        cy.log("ingresa al PAGE completo el formulario de Observaciones con datos válidos");
        this.expandObservationsSection();
        this.enterObservation(dataGenerator.generateObservation());
    }

}

// Exportación de la instancia de la clase para su uso en pruebas
export const createThirdPartyPage = new CreateThirdPartyPage();