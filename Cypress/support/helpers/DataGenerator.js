import { faker , es } from "@faker-js/faker"; // Importación de la librería faker para generación de datos aleatorios
// Configura el locale de la instancia global

/**
 * @class DataGenerator
 * @description Clase helper para generar diversos tipos de datos de prueba dinámicos
 * utilizando la librería Faker.js. Ayuda a crear pruebas más robustas al no depender de datos estáticos.
 * @author [Wilmar Sánchez]
 * @version 1.1 (Modificado 2025-04-13)
 */
export class DataGenerator {

  // ==================== DATA GENERATION METHODS ====================

  /**
   * Genera un número de identificación único (ej. Cédula, NIT).
   * Formato: 1 seguido de 9 dígitos aleatorios.
   * @returns {string} Número de identificación generado.
   */
  generateIdentificationNumber() {
    // Genera un número entre 0 y 999,999,999
    const randomNumberPart = faker.number.int({ min: 0, max: 999_999_999 });
    // Convierte a string y rellena con ceros a la izquierda hasta tener 9 dígitos
    const paddedNumber = randomNumberPart.toString().padStart(9, '0');
    return `1${paddedNumber}`; // Concatena el '1' inicial
  }

  /**
   * Genera un código de sucursal de 3 dígitos numéricos.
   * El primer dígito no puede ser 0.
   * @returns {string} Código de sucursal generado.
   */
  generateBranchCode() {
    // Asegura que el primer dígito sea entre 1 y 9
    const firstDigit = faker.number.int({ min: 1, max: 9 });
    // Los otros dos dígitos pueden ser de 0 a 9
    const secondDigit = faker.number.int({ min: 0, max: 9 });
    const thirdDigit = faker.number.int({ min: 0, max: 9 });
    // Concatena los dígitos como string
    return `${firstDigit}${secondDigit}${thirdDigit}`;
  }

  /**
   * Genera un nombre completo (nombre + apellido).
   * @returns {string} Nombre completo generado.
   */
  generateFullName() {
    return `${faker.person.firstName()} ${faker.person.lastName()}`;
  }

  /**
   * Genera dos apellidos concatenados.
   * Útil para campos que requieren específicamente dos apellidos.
   * @returns {string} Dos apellidos generados.
   */
  generateCompleteLastNames() {
    return `${faker.person.lastName()} ${faker.person.lastName()}`;
  }

  /**
   * Genera un nombre de empresa aleatorio.
   * @returns {string} Nombre comercial generado.
   */
  generateCommercialName() {
    return faker.company.name();
  }

  /**
   * Genera una dirección postal aleatoria (calle y número).
   * @returns {string} Dirección generada.
   */
  generateAddress() {
    return faker.location.streetAddress();
  }

  /**
   * Genera un indicativo telefónico de 3 dígitos.
   * @returns {number} Indicativo generado.
   */
  generateIndicative() {
    // Rango común para indicativos telefónicos
    return faker.number.int({ min: 100, max: 999 });
  }

  /**
   * Genera un número de teléfono.
   * Elimina caracteres no numéricos y limita a 10 dígitos.
   * @returns {string} Número de teléfono generado.
   */
  generatePhoneNumber() {
    // Genera un número con formato y luego lo limpia
    const rawPhoneNumber = faker.phone.number();
    // Elimina cualquier cosa que no sea dígito (\D) y toma los primeros 10
    return rawPhoneNumber.replace(/\D/g, '').slice(0, 10);
  }

  /**
   * Genera un número de extensión de 4 dígitos.
   * @returns {number} Extensión generada.
   */
  generateExtension() {
    return faker.number.int({ min: 1000, max: 9999 });
  }

  /**
   * Genera una dirección de correo electrónico válida y aleatoria.
   * @returns {string} Correo electrónico generado.
   */
  generateEmail() {
    return faker.internet.email();
  }

  /**
   * Selecciona aleatoriamente un tipo de régimen de IVA de una lista predefinida.
   * @returns {string} Tipo de régimen de IVA seleccionado ('Responsable de IVA' o 'No responsable de IVA').
   */
  generateVatRegimeType() {
    const regimes = ['Responsable de IVA', 'No responsable de IVA'];
    return faker.helpers.arrayElement(regimes); // Elige uno al azar
  }

  /**
   * Genera un código postal.
   * Elimina caracteres no numéricos.
   * @returns {string} Código postal numérico generado.
   */
  generatePostalCode() {
    const rawZipCode = faker.location.zipCode();
    // Limpia para obtener solo números 
    return rawZipCode.replace(/\D/g, '');
  }

  /**
   * Genera un nombre de pila para un contacto.
   * @returns {string} Nombre de contacto generado.
   */
  generateContactFirstName() {
    return faker.person.firstName();
  }

  /**
   * Genera un apellido para un contacto.
   * @returns {string} Apellido de contacto generado.
   */
  generateContactLastName() {
    return faker.person.lastName();
  }

  /**
   * Genera un cargo o puesto de trabajo aleatorio.
   * @returns {string} Cargo generado.
   */
  generateJobTitle() {
    return faker.person.jobTitle();
  }

  /**
   * Genera un texto corto de observación.
   * Toma un párrafo de 'lorem ipsum' y lo corta a 20 caracteres.
   * @returns {string} Observación generada.
   */
  generateObservation() {
    // Genera un párrafo corto y toma solo los primeros 20 caracteres
    return faker.lorem.paragraph(1).slice(0, 20); 
  }
}
// Exportación de una instancia única de la clase para ser utilizada globalmente
export const dataGenerator = new DataGenerator();
