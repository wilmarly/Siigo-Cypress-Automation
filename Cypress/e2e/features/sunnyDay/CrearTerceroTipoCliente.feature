Feature: Creación de Clientes

    Como Usuario del sistema
    Quiero poder crear tercero de tipo cliente
    Para gestionar los terceros de tipo cliente en la aplicación

    Background:
        Given que visualizo la página de login
        When introduzco mis datos de acceso válidos
        Then el sistema me permite ingresar a la plataforma
    
    @e2e @sunny-day 
    Scenario: Crear cliente con datos válidos
        When hago clic en el botón superior "+ Crear"
        When selecciono la opción "Clientes"
        When completo el formulario de Datos básicos con datos válidos
        When completo el formulario de Datos para facturación y envío con datos válidos
        When completo el formulario de Contactos con datos válidos
        When completo el formulario de Vendedor y cobrador con datos válidos
        When completo el formulario de Observaciones con datos válidos
        When hago clic en "Guardar"
        Then el sistema muestra un mensaje de éxito "Tercero guardado exitosamente"
        Then puedo visualizar el "Perfil del tercero"

