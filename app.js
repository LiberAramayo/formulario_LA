// Seleccionamos el formulario, el contenedor del mensaje y los inputs
const formulario = document.querySelector('.formulario-grid');
const mensajeEstado = document.getElementById('mensaje-estado');

const nombreInput = document.getElementById('nombre');
const apellidoInput = document.getElementById('apellido');
const paisInput = document.getElementById('pais');
const emailInput = document.getElementById('email');

// Expresiones regulares
const regexSoloLetras = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/; 
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función asincrónica simulada
const validarCorreoEnServidor = async (email) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (email === 'correo@falso.com') {
                reject('Error: Este correo ya se encuentra registrado.');
            } else {
                resolve('Validación exitosa.');
            }
        }, 2000);
    });
};

// Función para verificar un input y pintar el borde si está mal
const validarCampo = (input, regex) => {
    if (!regex.test(input.value.trim())) {
        input.style.borderColor = 'red'; // Pinta el borde rojo
        input.style.boxShadow = '0 0 0 3px rgba(255, 0, 0, 0.2)'; // Agrega un resplandor rojo
        return false;
    } else {
        input.style.borderColor = 'var(--border-input)'; // Restaura el color original
        input.style.boxShadow = 'none';
        return true;
    }
};

// Escuchamos el evento de envío del formulario
formulario.addEventListener('submit', async (evento) => {
    evento.preventDefault();

    // 1. VALIDACIÓN LOCAL
    // Evaluamos cada input individualmente para que se pinten los que estén mal
    const nombreValido = validarCampo(nombreInput, regexSoloLetras);
    const apellidoValido = validarCampo(apellidoInput, regexSoloLetras);
    const paisValido = validarCampo(paisInput, regexSoloLetras);
    const emailValido = validarCampo(emailInput, regexEmail);

    // Si alguno falló, detenemos el envío y mostramos el mensaje centrado
    if (!nombreValido || !apellidoValido || !paisValido || !emailValido) {
        mensajeEstado.style.color = 'red';
        // text-align: center alinea todo el contenido de la caja
        mensajeEstado.innerHTML = `
                <div style="background: #ffe6e6; padding: 15px; border-radius: 4px; border: 1px solid red; font-weight: normal; text-align: left;">
                    <strong style="display: block; margin-bottom: 10px; text-align: center; color: red;">Por favor, revisa los campos marcados en rojo:</strong>
                    <ul style="margin: 0; padding-left: 20px; color: red; font-size: 0.95em;">
                        <li style="margin-bottom: 5px;"><b>Nombre, Apellido y País:</b> Solo letras y espacios.</li>
                        <li><b>Email:</b> Formato válido (ej. <i>usuario@correo.com</i>).</li>
                    </ul>
                </div>
        `;
        return; 
    }

    // 2. VALIDACIÓN ASINCRÓNICA
    mensajeEstado.style.color = 'var(--text-main)';
    mensajeEstado.innerHTML = '<div style="text-align: center;">Validando datos en el servidor, por favor espera...</div>';

    try {
        await validarCorreoEnServidor(emailInput.value.trim());
        
        mensajeEstado.style.color = 'green';
        mensajeEstado.innerHTML = '<div style="text-align: center;">¡Formulario enviado exitosamente!</div>';
        
        formulario.reset(); 
        
        // Restauramos los bordes de los inputs después de un envío exitoso
        [nombreInput, apellidoInput, paisInput, emailInput].forEach(input => {
            input.style.borderColor = 'var(--border-input)';
            input.style.boxShadow = 'none';
        });
        
    } catch (error) {
        mensajeEstado.style.color = 'red';
        mensajeEstado.innerHTML = `<div style="text-align: center;">${error}</div>`;
    }
});