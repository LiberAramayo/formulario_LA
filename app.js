// Seleccionamos el formulario y el contenedor del mensaje
const formulario = document.querySelector('.formulario-grid');
const mensajeEstado = document.getElementById('mensaje-estado');

// Función que simula una validación asincrónica (ej. consultar una API o base de datos)
const validarCorreoEnServidor = async (email) => {
    return new Promise((resolve, reject) => {
        // Simulamos el tiempo de espera de una red real (2 segundos)
        setTimeout(() => {
            // Simulamos que un correo específico ya está en uso para probar el error
            if (email === 'correo@falso.com') {
                reject('Este correo ya se encuentra registrado.');
            } else {
                resolve('Validación exitosa.');
            }
        }, 2000);
    });
};

// Escuchamos el evento de envío (submit) del formulario
formulario.addEventListener('submit', async (evento) => {
    // Prevenimos que la página se recargue automáticamente
    evento.preventDefault();

    // Capturamos el valor que el usuario escribió en el input de email
    const emailInput = document.getElementById('email').value;

    // Mostramos un estado de carga mientras se resuelve la promesa
    mensajeEstado.style.color = 'var(--text-main)';
    mensajeEstado.textContent = 'Validando datos, por favor espera...';

    try {
        // Pausamos la ejecución hasta que la validación responda
        await validarCorreoEnServidor(emailInput);

        // Si la promesa se resuelve correctamente:
        mensajeEstado.style.color = 'green';
        mensajeEstado.textContent = '¡Formulario enviado exitosamente!';

        // Vaciamos los campos del formulario tras el éxito
        formulario.reset();

    } catch (error) {
        // Si la promesa es rechazada (error en la validación):
        mensajeEstado.style.color = 'red';
        mensajeEstado.textContent = error;
    }
});