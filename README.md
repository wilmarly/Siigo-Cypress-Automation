# Siigo-Cypress-Automation
# Automatización de Pruebas FrontEnd E2E con Cypress - SIIGO WEB

![Cypress Logo](https://www.bugraptors.com/blog/public/blog_images/cypress_logo_1679648945.png)

## 🚀 Descripción General

Este proyecto implementa un marco de pruebas de automatización End-to-End (E2E) utilizando **Cypress** y **Cucumber (Gherkin)** para validar la funcionalidad de la aplicación **SIIGO WEB**. El objetivo principal es asegurar la calidad y estabilidad de los flujos críticos y transversales del sistema a través de pruebas automatizadas robustas, legibles y fáciles de mantener.

Este framework está diseñado para ser integrado en pipelines de Integración Continua y Despliegue Continuo (CI/CD), facilitando la detección temprana de regresiones.

## ✨ Características Principales

* **Pruebas E2E:** Cubre flujos completos de usuario simulando la interacción real.
* **Cucumber (Gherkin):** Define escenarios de prueba en lenguaje natural (BDD), mejorando la comunicación entre equipos técnicos y no técnicos.
* **Page Object Model (POM):** Estructura el código de UI para mayor mantenibilidad y reutilización.
* **Reportes Detallados:** Genera reportes HTML interactivos con **Mochawesome**.
* **Datos Dinámicos:** Utiliza `@faker-js/faker` para generar datos de prueba realistas y variados.
* **Integración CI/CD:** Preparado para ser ejecutado en entornos de integración continua.
* **Comandos Personalizados:** Incluye comandos customizados de Cypress para tareas repetitivas (ver `cypress/support/commands.js`).
* **Manejo de Shadow DOM:** Configurado para interactuar con Web Components que usan Shadow DOM.

## 🛠️ Tecnologías y Herramientas

* **Framework de Pruebas:** [Cypress](https://www.cypress.io/) (v12+)
* **BDD:** [Cucumber](https://cucumber.io/) (via `@badeball/cypress-cucumber-preprocessor`)
* **Lenguaje:** [JavaScript](https://developer.mozilla.org/es/docs/Web/JavaScript) (ES6+)
* **Gestor de Paquetes:** [npm](https://www.npmjs.com/) (v6+)
* **Entorno de Ejecución:** [Node.js](https://nodejs.org/) (v14+)
* **Generación de Datos:** [@faker-js/faker](https://fakerjs.dev/)
* **Reportes:** [Mochawesome](https://github.com/adamgruber/mochawesome)
* **Shadow DOM:** [cypress-shadow-dom](https://github.com/component-driven/cypress-shadow-dom)

## ⚙️ Puesta en Marcha del Proyecto

Sigue estos pasos para descargar, configurar e iniciar el entorno de automatización en tu máquina local.

### 📋 Pre-requisitos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu sistema:

* **Node.js:** Versión 14 o superior (Recomendada: LTS).
    * _Verifica con:_ `node -v`
    * _[Descargar Node.js](https://nodejs.org/)_
* **npm (Node Package Manager):** Versión 6 o superior (Usualmente viene con Node.js).
    * _Verifica con:_ `npm -v`
* **Git:** Necesario para clonar el código fuente.
    * _Verifica con:_ `git --version`
    * _[Descargar Git](https://git-scm.com/)_

### 💻 Pasos de Instalación

1.  **Clonar el Repositorio:**
    Abre tu terminal o consola y ejecuta (reemplaza `<URL_DEL_REPOSITORIO>` con la URL real):
    ```bash
    git clone <URL_DEL_REPOSITORIO>

2.  **Navegar al Directorio:**
    Accede a la carpeta del proyecto recién clonado:
    ```bash
    cd <NOMBRE_CARPETA_PROYECTO>
    ```

3.  **Instalar Dependencias:**
    Este comando descargará Cypress y todas las librerías necesarias (Cucumber, Mochawesome, etc.) listadas en `package.json`:
    ```bash
    npm install
    ```
    *(Este proceso puede tardar unos minutos la primera vez).*

4.  **(Opcional pero Recomendado) Configurar Variables de Entorno:**
    Si el proyecto utiliza credenciales, URLs u otras configuraciones específicas por entorno, usualmente se gestionan a través de un archivo `.env`.
    * Busca si existe un archivo llamado `.env.example` en la raíz del proyecto.
    * Si lo encuentras, crea una copia de este archivo y renómbrala a `.env`.
    * Abre el archivo `.env` con tu editor y rellena los valores necesarios (ej. `CYPRESS_BASE_URL`, `CYPRESS_USERNAME_QA`, `CYPRESS_PASSWORD_QA`).
    * **Importante:** El archivo `.env` **no debe** subirse al repositorio Git (asegúrate de que esté en tu `.gitignore`).

### ✅ Verificación Rápida
Para comprobar rápidamente que la instalación fue exitosa y que Cypress reconoce el proyecto, puedes abrir el **Cypress Test Runner** (la interfaz gráfica interactiva):

    npm run cypress:open
 
## 📁 Estructura del Proyecto

La estructura sigue las mejores prácticas recomendadas para proyectos Cypress con Cucumber:

```plaintext
siigo-nube-javascript-cypress/
├── cypress/
│   ├── downloads/            # Archivos descargados durante las pruebas
│   ├── e2e/                  # Contiene todas las pruebas E2E
│   │   ├── features/         # Archivos .feature (Gherkin)
│   │   │   ├── flujos-criticos/
│   │   │   │   └── FCE2E_CreacionDeCliente.feature
│   │   │   └── flujos-transversales/
│   │   │       └── FT_IniciarSesion.feature
│   │   ├── pages/            # Page Objects (Abstracción de UI)
│   │   │   ├── CreateThirdPartyPage.js 
│   │   │   ├── DashboardPage.js
│   │   │   ├── LoginPage.js             
│   │   │   └── ProfileCreatedPage.js    
│   │   └── step_definitions/ # Implementación de los pasos Gherkin
│   │       ├── flujos-criticos/
│   │       │   └── FCE2E_CreacionDeCliente.js
│   │       └── flujos-transversales/
│   │           └── FT_IniciarSesion.js
│   ├── report/               # Reporte HTML final combinado
│   ├── screenshots/          # Capturas de pantalla en caso de fallo
│   ├── support/              
│   │   ├── utils/            
│   │   │   └── DataGenerator # Utilidades (ej. generador de datos)
│   │   ├── commands.js       # Comandos personalizados de Cypress
│   │   └── e2e.js            # Configuraciones globales antes de cada test
│   └── videos/               # Grabaciones de video de las ejecuciones
├── node_modules/             # Dependencias del proyecto      
├── .cypress-cucumber-preprocessorrc.json # Configuración del preprocesador Cucumber
├── .env                      # Variables de entorno
├── .gitignore                # Archivos y carpetas ignorados por Git
├── cypress.config.js         # Archivo principal de configuración de Cypress
├── jsconfig.json             # Configuración JS (IntelliSense, alias de paths)
├── package-lock.json         # Lockfile de dependencias
├── package.json              # Dependencias y scripts del proyecto
└── README.md                 # Este archivo

