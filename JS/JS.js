let textInput = document.querySelector(".textInput");
let textOutput = document.querySelector(".textOutput");
let btnEncriptar = document.querySelector(".btnEncriptar");
let btnDesencriptar = document.querySelector(".btnDesencriptar");
let btnCopiar = document.querySelector(".btnCopiar");
let mensaje = document.querySelector('.mensaje');
let encriptado = '';
let desencriptado = '';

const arrayVocales = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];

window.onload = () => {
    textInput.focus();
}

textInput.onkeyup = () => {
    textInput.value = textInput.value.toLowerCase();
    textInput.value = eliminarAcentos(textInput);
}


btnEncriptar.onclick = () => {
    if (validarInput(textInput) == false) {
        if (validarPosibilidadEncript(textInput, arrayVocales)) {
            if (encriptado) {
                op = confirm('Texto ya Encriptado, deseas volver a Encriptarlo?');
                if (op) {
                    encriptado = false;
                }
            } else {
                textoEncryptado = encriptarTexto(textInput, arrayVocales);
                textOutput.value = textoEncryptado;
                limpiarInput();
            }
        } else {
            alert('No se puede Encriptar el texto!!!');
        }
    }
}

btnDesencriptar.onclick = () => {
    if (validarInput(textInput) == false) {
        if (validarPosibilidadDesencript(textInput, arrayVocales)) {
            if (desencriptado) {
                op = confirm('Texto ya Desencriptado, deseas volver a Desencriptarlo?');
                if (op) {
                    desencriptado = false;
                }
            } else {
                textoDesencryptado = desencriptarTexto(textInput, arrayVocales);
                textOutput.value = textoDesencryptado;
                limpiarInput();
            }
        } else {
            alert('No se puede Desencriptar el texto!!!');
        }
    }
}

btnCopiar.onclick = () => {
    if (validarInput(textOutput) == false) {
        encriptado = validarPosibilidadDesencript(textOutput, arrayVocales);
        copiarTexto();
    }
}

/*
 * Funciones para encriptar y desencriptar el texto ingreaso
 */

function encriptarTexto(texto, array) {
    let textoEncryptado = texto.value;
    let i = 0;

    for (i; i < array.length; i++) {
        if (textoEncryptado.includes(array[i][0])) {
            textoEncryptado = textoEncryptado.replaceAll(array[i][0], array[i][1]);
            encriptado = true;
        }
    }
    return textoEncryptado;
}

function desencriptarTexto(texto, array) {
    let textoDesencryptado = texto.value;
    let i = 0;

    for (i; i < array.length; i++) {
        if (textoDesencryptado.includes(array[i][1])) {
            textoDesencryptado = textoDesencryptado.replaceAll(array[i][1], array[i][0]);
            desencriptado = true;
        }
    }
    return textoDesencryptado;
}

/*
 * Funciones para verificar si el texto se puede encriptar o desencriptar
 */

function validarPosibilidadEncript(texto, array) {
    let textoEncryptado = texto.value;
    let i = 0;

    for (i; i < array.length; i++) {
        if (textoEncryptado.includes(array[i][0])) {
            return true;
        }
    }
    return false;
}

function validarPosibilidadDesencript(texto, array) {
    let textoDesencryptado = texto.value;
    let i = 0;

    for (i; i < array.length; i++) {
        if (textoDesencryptado.includes(array[i][1])) {
            return true;
        }
    }
    encriptado = false;
    desencriptado = false;
    return false;
}

/*
 * Funciones para validar el input (no vacio, mayor a 3 caracteres) y que no tenga acentaos/caracteres especiales
 */

function validarInput(input) {
    texto = input.value;
    let vacio = '';
    let patron = /^[^0-9`~!@#$%^&*()_|+\-=¿¡!º?;:'"<>´·.\{\}\[\]\\\/]*$/;

    if (texto.length >= 3 && !(patron.test(input.value)) == false) {
        textInput.style.background = "";
        vacio = false;
    } else if (texto.length < 3) {
        mostrarError(input, "Campo Vacío");
        vacio = true;
    }
    else {
        mostrarError(input, "Numeros y Caracteres especiales no válidos");
        vacio = true;
    }
    return vacio;
}

function eliminarAcentos(input) {
    texto = input.value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return texto;
}

/*
 * Funciones para DOM
 */

function copiarTexto() {
    textOutput.select();
    navigator.clipboard.writeText(textOutput.value)
    document.querySelector('.copiar').style.display = 'contents';
    document.querySelector('.copiar').textContent = 'Texto copiado al portapapeles!!!!';
    setTimeout(() => { document.querySelector('.copiar').textContent = "" }, 500);
    textInput.value = textOutput.value;
    textOutput.style.opacity = .2;
    setTimeout(() => {
        descolorearOutput()
    }, 500)
}

function limpiarInput() {
    textInput.value = '';
    textOutput.disabled = true;
    textOutput.style.background = "rgba(0, 255, 255, 0.611)";
    textOutput.style.opacity = .4;
}

function descolorearOutput() {
    textOutput.value = "";
    textOutput.style.opacity = "";
    textOutput.style.background = "";
}

function mostrarError(campo, string) {
    campo.style.background = "rgba(225, 166, 176, 0.675)";
    mensaje.style.color = "red";
    mensaje.textContent = `*¡${string}!`;
    campo.disabled = true;
    setTimeout(() => {
        campo.style.background = "";
        mensaje.style.color = "black";
        mensaje.textContent = '¡Recuerde solo escribir en minúscula!';
        campo.disabled = false;
    }, 1000);
}

