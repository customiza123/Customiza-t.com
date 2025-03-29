<?php
// Elimina cualquier salida anterior
ob_clean();

header('Content-Type: application/json');
error_log("Iniciando check_user.php");

// Verificar que se recibió el parámetro uid
if (!isset($_GET['uid'])) {
    echo json_encode([
        'success' => false,
        'message' => 'No se proporcionó el UID del usuario',
        'exists' => false
    ]);
    exit;
}

$uid = $_GET['uid'];
error_log("Verificando UID: " . $uid);

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

    // Escapar el UID para prevenir inyección SQL
    $uid = $conn->real_escape_string($uid);

    // IMPORTANTE: Cambiamos el nombre de la tabla a 'usuarios' y los nombres de los campos
    // Consulta para verificar si existe el usuario
    $sql = "SELECT * FROM usuarios WHERE uid = '$uid'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Usuario encontrado
        $user_data = $result->fetch_assoc();
        echo json_encode([
            'success' => true,
            'exists' => true,
            'user' => [
                'uid' => $user_data['uid'],
                'name' => $user_data['nombre'], // Cambio de 'name' a 'nombre'
                'email' => $user_data['email'],
                'provider' => $user_data['provider'],
                'photoURL' => $user_data['photo_url'],
                'created_at' => $user_data['created_at']
            ]
        ]);
    } else {
        // Usuario no encontrado
        echo json_encode([
            'success' => true,
            'exists' => false,
            'message' => 'Usuario no encontrado'
        ]);
    }

    $conn->close();
} catch (Exception $e) {
    error_log("Error en check_user.php: " . $e->getMessage());
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage(),
        'exists' => false
    ]);
}
?>