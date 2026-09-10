<?php
/**
 * Formulario de Especificaciones (RG-001) - EMCL
 * Página independiente para clientes que ya confirmaron el servicio.
 * Configurado para pruebas a: codigoraul@gmail.com
 */

$destinatario   = "contacto@emcl.cl, codigoraul@gmail.com";
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

function fila($label, $valor) {
    return "<p style=\"margin:0 0 10px;\"><strong>{$label}</strong><br>" . nl2br($valor) . "</p>";
}

$envasadoTexto = (empty($envasado) ? "-" : implode(", ", $envasado));
if ($envasadoOtro !== "") $envasadoTexto .= " (Otro: {$envasadoOtro})";

$selladoTexto = (empty($sellado) ? "-" : implode(", ", $sellado));
if ($selladoOtro !== "") $selladoTexto .= " (Otro: {$selladoOtro})";

$disposicionTexto = (empty($disposicion) ? "-" : implode(", ", $disposicion));
if ($disposicionOtro !== "") $disposicionTexto .= " (Especificar: {$disposicionOtro})";

$transporteTexto = $transporte;
if ($transporteDetalle !== "") $transporteTexto .= " (Detalle: {$transporteDetalle})";

$devolucionMrTexto = $devolucionMr;
if ($devolucionMrDetalle !== "") $devolucionMrTexto .= " (Detalle: {$devolucionMrDetalle})";

$cuerpo  = "<div style=\"font-family:Arial,Helvetica,sans-serif;font-size:14px;color:#1a1a1a;\">";
$cuerpo .= "<p>Nueva solicitud de especificaciones (RG-001) recibida desde el sitio web.</p><hr style=\"border:none;border-top:1px solid #ddd;margin:14px 0;\">";
$cuerpo .= fila("1. Cliente:", $cliente);
$cuerpo .= fila("2. Contacto Cliente:", $contactoCliente);
$cuerpo .= fila("3. Digestión:", $digestion);
$cuerpo .= fila("4. Determinación Final:", empty($determinacion) ? "-" : implode(", ", $determinacion));
$cuerpo .= fila("5. Enviar protocolos de análisis:", $enviarProtocolos);
$cuerpo .= fila("6. Granulometría final (#Ty):", $granulometria);
$cuerpo .= fila("7. Envasado final:", $envasadoTexto . "<br>Sellado: " . $selladoTexto . "<br>Producto final envasado: " . $productoEnvasado);
$cuerpo .= fila("8. N° Laboratorios Participantes:", $numLaboratorios . " (" . (empty($laboratorios) ? "-" : implode(", ", $laboratorios)) . ")");
$cuerpo .= fila("9. N° Réplicas por Laboratorio:", $numReplicas);
$cuerpo .= fila("10. Disposición Final:", $disposicionTexto);
$cuerpo .= fila("11. Transporte:", $transporteTexto);
$cuerpo .= fila("12. Devolución del MR:", $devolucionMrTexto);
$cuerpo .= fila("13. Otros Requisitos:", $otrosRequisitos !== "" ? $otrosRequisitos : "-");
$cuerpo .= "<hr style=\"border:none;border-top:1px solid #ddd;margin:14px 0;\">";
$cuerpo .= fila("Correo de contacto del cliente:", $emailLimpio);
$cuerpo .= "<p style=\"color:#888;font-size:12px;\">Enviado el " . date("d-m-Y H:i:s") . " desde IP " . $_SERVER["REMOTE_ADDR"] . "</p>";
$cuerpo .= "</div>";

$headers = "From: " . $asuntoPrefijo . " <{$emailRemitente}>\r\n";
$headers .= "Reply-To: {$contactoCliente} <{$emailLimpio}>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$enviado = mail($destinatario, $asunto, $cuerpo, $headers);

if ($enviado) {
    echo json_encode(["ok" => true, "mensaje" => "¡Formulario enviado correctamente! Nos pondremos en contacto pronto."]);
} else {
    http_response_code(500);
    echo json_encode(["ok" => false, "error" => "No se pudo enviar el formulario. Intenta nuevamente más tarde."]);
}
