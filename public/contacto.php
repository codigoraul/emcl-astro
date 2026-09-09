<?php
/**
 * Formulario de contacto - EMCL / plantilla estándar DiseñoPaginas.cl
 * Envía por mail() nativo de PHP (funciona en cualquier hosting compartido con PHP).
 * Configurado para pruebas a: codigoraul@gmail.com
 */

// ---- CONFIGURACIÓN ----
$destinatario   = "codigoraul@gmail.com"; // cambiar por el correo real del cliente cuando pase a producción
$asuntoPrefijo  = "[EMCL - Contacto Web]";
$emailRemitente = "no-reply@emcl.cl"; // usar un correo del mismo dominio que el hosting para evitar spam

// ---- SOLO ACEPTAR POST ----
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header("Content-Type: application/json");
    echo json_encode(["ok" => false, "error" => "Método no permitido"]);
    exit;
}

header("Content-Type: application/json; charset=utf-8");

// ---- HONEYPOT ANTI-SPAM ----
// El formulario debe incluir un input oculto name="website" que un humano nunca llena
if (!empty($_POST["website"])) {
    // Se responde como éxito para no delatar el honeypot a los bots
    echo json_encode(["ok" => true]);
    exit;
}

// ---- RECEPCIÓN Y SANEAMIENTO DE CAMPOS ----
function limpiar($valor) {
    return htmlspecialchars(trim($valor), ENT_QUOTES, 'UTF-8');
}

$nombre   = isset($_POST["nombre"]) ? limpiar($_POST["nombre"]) : "";
$email    = isset($_POST["email"]) ? trim($_POST["email"]) : "";
$telefono = isset($_POST["telefono"]) ? limpiar($_POST["telefono"]) : "";
$empresa  = isset($_POST["empresa"]) ? limpiar($_POST["empresa"]) : "";
$mensaje  = isset($_POST["mensaje"]) ? limpiar($_POST["mensaje"]) : "";

// ---- VALIDACIÓN ----
$errores = [];

if ($nombre === "" || mb_strlen($nombre) < 2) {
    $errores[] = "El nombre es obligatorio.";
}

if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errores[] = "El correo no es válido.";
}

if ($mensaje === "" || mb_strlen($mensaje) < 5) {
    $errores[] = "El mensaje es obligatorio.";
}

if (!empty($errores)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => implode(" ", $errores)]);
    exit;
}

$emailLimpio = filter_var($email, FILTER_SANITIZE_EMAIL);

// ---- CONSTRUCCIÓN DEL CORREO ----
$asunto = $asuntoPrefijo . " Nuevo mensaje de " . $nombre;

$cuerpo = "Has recibido un nuevo mensaje desde el formulario de contacto del sitio web.\n\n";
$cuerpo .= "Nombre: {$nombre}\n";
$cuerpo .= "Correo: {$emailLimpio}\n";
if ($telefono !== "") $cuerpo .= "Teléfono: {$telefono}\n";
if ($empresa !== "")  $cuerpo .= "Empresa: {$empresa}\n";
$cuerpo .= "\nMensaje:\n{$mensaje}\n";
$cuerpo .= "\n---\nEnviado el " . date("d-m-Y H:i:s") . " desde IP " . $_SERVER["REMOTE_ADDR"];

$headers = "From: " . $asuntoPrefijo . " <{$emailRemitente}>\r\n";
$headers .= "Reply-To: {$nombre} <{$emailLimpio}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ---- ENVÍO ----
$enviado = mail($destinatario, $asunto, $cuerpo, $headers);

if ($enviado) {
    echo json_encode(["ok" => true, "mensaje" => "¡Gracias! Tu mensaje fue enviado correctamente."]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo enviar el mensaje. Intenta nuevamente más tarde."]);
}
