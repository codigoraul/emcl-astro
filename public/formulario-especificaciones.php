<?php
/**
 * Formulario de Especificaciones (RG-001) - EMCL
 * Página independiente para clientes que ya confirmaron el servicio.
 * Configurado para pruebas a: codigoraul@gmail.com
 */

$destinatario   = "codigoraul@gmail.com"; // cambiar a info@emcl.cl / leonel.cortes@emcl.cl cuando esté validado
$asuntoPrefijo  = "[EMCL - Solicitud RG-001]";
$emailRemitente = "no-reply@emcl.cl";

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    header("Content-Type: application/json");
    echo json_encode(["ok" => false, "error" => "Método no permitido"]);
    exit;
}

header("Content-Type: application/json; charset=utf-8");

// Honeypot anti-spam
if (!empty($_POST["website"])) {
    echo json_encode(["ok" => true]);
    exit;
}

function limpiar($valor) {
    return htmlspecialchars(trim((string) $valor), ENT_QUOTES, 'UTF-8');
}

function limpiarArray($valores) {
    if (!is_array($valores)) return [];
    return array_map('limpiar', $valores);
}

$cliente          = limpiar($_POST["cliente"] ?? "");
$contactoCliente  = limpiar($_POST["contacto_cliente"] ?? "");
$digestion        = limpiar($_POST["digestion"] ?? "");
$determinacion    = limpiarArray($_POST["determinacion"] ?? []);
$enviarProtocolos = !empty($_POST["enviar_protocolos"]) ? "Sí" : "No";
$granulometria    = limpiar($_POST["granulometria"] ?? "");

$envasado      = limpiarArray($_POST["envasado"] ?? []);
$envasadoOtro  = limpiar($_POST["envasado_otro"] ?? "");
$sellado       = limpiarArray($_POST["sellado"] ?? []);
$selladoOtro   = limpiar($_POST["sellado_otro"] ?? "");
$productoEnvasado = limpiar($_POST["producto_envasado"] ?? "");

$numLaboratorios = limpiar($_POST["num_laboratorios"] ?? "");
$laboratorios    = limpiarArray($_POST["laboratorios"] ?? []);
$numReplicas     = limpiar($_POST["num_replicas"] ?? "");

$disposicion      = limpiarArray($_POST["disposicion"] ?? []);
$disposicionOtro  = limpiar($_POST["disposicion_otro"] ?? "");

$transporte        = limpiar($_POST["transporte"] ?? "");
$transporteDetalle = limpiar($_POST["transporte_detalle"] ?? "");

$devolucionMr        = limpiar($_POST["devolucion_mr"] ?? "");
$devolucionMrDetalle = limpiar($_POST["devolucion_mr_detalle"] ?? "");

$otrosRequisitos = limpiar($_POST["otros_requisitos"] ?? "");
$email = trim($_POST["email"] ?? "");

// Validación mínima
$errores = [];
if ($cliente === "") $errores[] = "El campo Cliente es obligatorio.";
if ($contactoCliente === "") $errores[] = "El campo Contacto Cliente es obligatorio.";
if ($email === "" || !filter_var($email, FILTER_VALIDATE_EMAIL)) $errores[] = "El correo no es válido.";

if (!empty($errores)) {
    http_response_code(400);
    echo json_encode(["ok" => false, "error" => implode(" ", $errores)]);
    exit;
}

$emailLimpio = filter_var($email, FILTER_SANITIZE_EMAIL);

$asunto = $asuntoPrefijo . " - " . $cliente;

$cuerpo  = "Nueva solicitud de especificaciones (RG-001) recibida desde el sitio web.\n\n";
$cuerpo .= "1. Cliente: {$cliente}\n";
$cuerpo .= "2. Contacto Cliente: {$contactoCliente}\n";
$cuerpo .= "3. Digestión: {$digestion}\n";
$cuerpo .= "4. Determinación Final: " . (empty($determinacion) ? "-" : implode(", ", $determinacion)) . "\n";
$cuerpo .= "5. Enviar protocolos de análisis: {$enviarProtocolos}\n";
$cuerpo .= "6. Granulometría final (#Ty): {$granulometria}\n";
$cuerpo .= "7. Envasado final: " . (empty($envasado) ? "-" : implode(", ", $envasado));
if ($envasadoOtro !== "") $cuerpo .= " (Otro: {$envasadoOtro})";
$cuerpo .= "\n   Sellado: " . (empty($sellado) ? "-" : implode(", ", $sellado));
if ($selladoOtro !== "") $cuerpo .= " (Otro: {$selladoOtro})";
$cuerpo .= "\n   Producto final envasado: {$productoEnvasado}\n";
$cuerpo .= "8. N° Laboratorios Participantes: {$numLaboratorios} (" . (empty($laboratorios) ? "-" : implode(", ", $laboratorios)) . ")\n";
$cuerpo .= "9. N° Réplicas por Laboratorio: {$numReplicas}\n";
$cuerpo .= "10. Disposición Final: " . (empty($disposicion) ? "-" : implode(", ", $disposicion));
if ($disposicionOtro !== "") $cuerpo .= " (Especificar: {$disposicionOtro})";
$cuerpo .= "\n11. Transporte: {$transporte}";
if ($transporteDetalle !== "") $cuerpo .= " (Detalle: {$transporteDetalle})";
$cuerpo .= "\n12. Devolución del MR: {$devolucionMr}";
if ($devolucionMrDetalle !== "") $cuerpo .= " (Detalle: {$devolucionMrDetalle})";
$cuerpo .= "\n13. Otros Requisitos:\n{$otrosRequisitos}\n";
$cuerpo .= "\nCorreo de contacto del cliente: {$emailLimpio}\n";
$cuerpo .= "\n---\nEnviado el " . date("d-m-Y H:i:s") . " desde IP " . $_SERVER["REMOTE_ADDR"];

$headers = "From: " . $asuntoPrefijo . " <{$emailRemitente}>\r\n";
$headers .= "Reply-To: {$contactoCliente} <{$emailLimpio}>\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$enviado = mail($destinatario, $asunto, $cuerpo, $headers);

if ($enviado) {
    echo json_encode(["ok" => true, "mensaje" => "¡Formulario enviado correctamente! Nos pondremos en contacto pronto."]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo enviar el formulario. Intenta nuevamente más tarde."]);
}
