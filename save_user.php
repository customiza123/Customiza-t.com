<?php
// Elimina cualquier salida anterior
ob_clean();

header('Content-Type: application/json');

// Habilitar registro de errores en un archivo
error_log("Iniciando save_user.php");

// Obtener los datos JSON enviados por POST
$json_data = file_get_contents('php://input');
error_log("Datos recibidos: " . $json_data);

// Verificar que los datos no estén vacíos
if (empty($json_data)) {
    echo json_encode([
        'success' => false,
        'message' => 'No se recibieron datos'
    ]);
    exit;
}

// Intentar decodificar los datos JSON
$user_data = json_decode($json_data, true);

// Verificar si el JSON se decodificó correctamente
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode([
        'success' => false,
        'message' => 'Error en formato JSON: ' . json_last_error_msg()
    ]);
    exit;
}

// Verificar que los datos requeridos existan
if (!isset($user_data['uid']) || !isset($user_data['email'])) {
    echo json_encode([
        'success' => false,
        'message' => 'Faltan datos requeridos (uid o email)'
    ]);
    exit;
}

// Configuración de la conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "customizat";

try {
    // Crear conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verificar conexión
    if ($conn->connect_error) {
        throw new Exception("Conexión fallida: " . $conn->connect_error);
    }

    // Preparar los datos para inserción
    $uid = $conn->real_escape_string($user_data['uid']);
    $name = $conn->real_escape_string($user_data['name'] ?? '');
    $email = $conn->real_escape_string($user_data['email']);
    $provider = $conn->real_escape_string($user_data['provider'] ?? 'email');
    $photoURL = $conn->real_escape_string($user_data['photoURL'] ?? '');
    $created_at = $conn->real_escape_string($user_data['created_at'] ?? date('Y-m-d H:i:s'));

    // IMPORTANTE: Cambiamos el nombre de la tabla a 'usuarios' para que coincida con tu esquema
    // Primero verificar si el usuario ya existe
    $check_query = "SELECT uid FROM usuarios WHERE uid = '$uid'";
    $result = $conn->query($check_query);

    if ($result->num_rows > 0) {
        // Usuario existe, actualizar información
        $sql = "UPDATE usuarios SET 
                nombre = '$name', 
                email = '$email', 
                provider = '$provider', 
                photo_url = '$photoURL', 
                updated_at = NOW() 
                WHERE uid = '$uid'";
    } else {
        // Usuario no existe, insertar nuevo registro
        $sql = "INSERT INTO usuarios (uid, nombre, email, provider, photo_url, created_at) 
                VALUES ('$uid', '$name', '$email', '$provider', '$photoURL', '$created_at')";
    }

    // Ejecutar la consulta
    if ($conn->query($sql) === TRUE) {
        echo json_encode([
            'success' => true,
            'message' => 'Usuario guardado correctamente'
        ]);
    } else {
        throw new Exception("Error al guardar usuario: " . $conn->error);
    }

    $conn->close();
} catch (Exception $e) {
    error_log("Error en save_user.php: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>