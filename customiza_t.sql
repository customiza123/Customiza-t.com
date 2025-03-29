-- Active: 1739395784044@@127.0.0.1@3306@customiza_t
-- Active: 1739395784044@@127.0.0.1@3306@ejemplouno
-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-02-2025 a las 21:58:13
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `customiza_t`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `busquedas_recientes`
--

CREATE TABLE `busquedas_recientes` (
  `busqueda_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `termino_busqueda` varchar(100) NOT NULL,
  `fecha_busqueda` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `busquedas_recientes`
--

INSERT INTO `busquedas_recientes` (`busqueda_id`, `cliente_id`, `termino_busqueda`, `fecha_busqueda`) VALUES
(1, 1, 'playera negra', '2025-02-26 14:46:54'),
(2, 1, 'sudadera con logo', '2025-02-26 14:46:54'),
(3, 2, 'gorra deportiva', '2025-02-26 14:46:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `carrito`
--

CREATE TABLE `carrito` (
  `carrito_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `talla_id` int(11) DEFAULT NULL,
  `diseno_predeterminado_id` int(11) DEFAULT NULL,
  `diseno_personalizado_id` int(11) DEFAULT NULL,
  `cantidad` int(11) NOT NULL DEFAULT 1,
  `fecha_agregado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `carrito`
--

INSERT INTO `carrito` (`carrito_id`, `cliente_id`, `producto_id`, `talla_id`, `diseno_predeterminado_id`, `diseno_personalizado_id`, `cantidad`, `fecha_agregado`) VALUES
(1, 1, 7, 31, 25, NULL, 2, '2025-02-26 14:46:54'),
(2, 2, 1, 2, 12, NULL, 1, '2025-02-26 14:46:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias_productos`
--

CREATE TABLE `categorias_productos` (
  `categoria_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias_productos`
--

INSERT INTO `categorias_productos` (`categoria_id`, `nombre`, `descripcion`) VALUES
(1, 'Gorras', 'Gorras personalizables'),
(2, 'Chamarras', 'Chamarras personalizables'),
(3, 'Sudaderas', 'Sudaderas personalizables'),
(4, 'Playeras', 'Playeras personalizables'),
(5, 'Camisas', 'Camisas personalizables');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `clientes`
--

CREATE TABLE `clientes` (
  `cliente_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `telefono` varchar(20) DEFAULT NULL,
  `direccion` text DEFAULT NULL,
  `fecha_registro` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `clientes`
--

INSERT INTO `clientes` (`cliente_id`, `nombre`, `email`, `telefono`, `direccion`, `fecha_registro`) VALUES
(1, 'Cliente Ejemplo', 'cliente@ejemplo.com', '5551234567', 'Calle Ejemplo #123, Ciudad', '2025-02-26 14:45:11'),
(2, 'Juan Pérez', 'juan@ejemplo.com', '5552345678', 'Av. Reforma #234, CDMX', '2025-02-26 14:45:56'),
(3, 'María González', 'maria@ejemplo.com', '5553456789', 'Calle Juárez #56, Guadalajara', '2025-02-26 14:45:57'),
(4, 'Carlos Rodríguez', 'carlos@ejemplo.com', '5554567890', 'Blvd. Insurgentes #789, Monterrey', '2025-02-26 14:45:57');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedido`
--

CREATE TABLE `detalles_pedido` (
  `detalle_pedido_id` int(11) NOT NULL,
  `pedido_id` int(11) DEFAULT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `talla_id` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `diseno_predeterminado_id` int(11) DEFAULT NULL,
  `diseno_personalizado_id` int(11) DEFAULT NULL,
  `precio_por_unidad` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `detalles_pedido`
--

INSERT INTO `detalles_pedido` (`detalle_pedido_id`, `pedido_id`, `producto_id`, `talla_id`, `cantidad`, `diseno_predeterminado_id`, `diseno_personalizado_id`, `precio_por_unidad`) VALUES
(1, 1, 7, 31, 2, 25, NULL, 180.00),
(2, 2, 5, 21, 2, NULL, 1, 375.00),
(3, 3, 7, 31, 1, NULL, 5, 180.00),
(4, 3, 1, 2, 1, NULL, NULL, 195.00),
(5, 4, 3, 9, 1, NULL, 7, 550.00),
(6, 4, 7, 32, 2, NULL, NULL, 225.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disenos_personalizados`
--

CREATE TABLE `disenos_personalizados` (
  `diseno_personalizado_id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `nombre_diseno` varchar(100) DEFAULT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `fecha_subida` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disenos_personalizados`
--

INSERT INTO `disenos_personalizados` (`diseno_personalizado_id`, `cliente_id`, `nombre_diseno`, `ruta_imagen`, `fecha_subida`) VALUES
(1, 1, 'Mi Logo Personal', 'images/custom_designs/cliente1_logo1.jpg', '2025-01-15 10:30:00'),
(2, 1, 'Diseño Aniversario', 'images/custom_designs/cliente1_aniversario.jpg', '2025-01-20 14:45:00'),
(3, 1, 'Logo Empresa', 'images/custom_designs/cliente1_empresa.jpg', '2025-02-05 09:15:00'),
(4, 2, 'Dibujo Familia', 'images/custom_designs/cliente2_familia.jpg', '2025-01-10 11:20:00'),
(5, 2, 'Mascota Favorita', 'images/custom_designs/cliente2_mascota.jpg', '2025-01-25 16:30:00'),
(6, 2, 'Frase Motivacional', 'images/custom_designs/cliente2_frase.jpg', '2025-02-10 13:45:00'),
(7, 3, 'Logo Equipo', 'images/custom_designs/cliente3_equipo.jpg', '2025-01-05 15:10:00'),
(8, 3, 'Diseño Deportivo', 'images/custom_designs/cliente3_deporte.jpg', '2025-01-30 10:00:00'),
(9, 3, 'Arte Abstracto', 'images/custom_designs/cliente3_arte.jpg', '2025-02-15 12:20:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `disenos_predeterminados`
--

CREATE TABLE `disenos_predeterminados` (
  `diseno_id` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `ruta_imagen` varchar(255) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `costo_adicional` decimal(10,2) DEFAULT 0.00,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `disenos_predeterminados`
--

INSERT INTO `disenos_predeterminados` (`diseno_id`, `nombre`, `ruta_imagen`, `descripcion`, `costo_adicional`, `categoria_id`) VALUES
(1, 'Diseño 1', 'https://drive.google.com/file/d/1-YKd4ctTn-vOG-_SU7TyWH7uej5INUP9/view?usp=drive_link', 'Diseño abstracto con patrones geométricos', 50.00, NULL),
(2, 'Diseño 2', 'https://drive.google.com/file/d/1-ZEjxS0hdKgR7HUfNkowQK831rxsjvi0/view?usp=drive_link', 'Patrón de ondas con colores vibrantes', 55.00, NULL),
(3, 'Diseño 3', 'https://drive.google.com/file/d/1-ahkAHGvxGZQrGhQwb24QIADhT6aOUN_/view?usp=drive_link', 'Diseño minimalista con líneas simples', 45.00, NULL),
(4, 'Diseño 4', 'https://drive.google.com/file/d/1-cP9YmHlxysBShzOp9oQwiopQsluSGAY/view?usp=drive_link', 'Patrón floral estilizado', 60.00, NULL),
(5, 'Diseño 5', 'https://drive.google.com/file/d/1-lv7-wq0vnIwbaDOsk0jtewkjxXW_ych/view?usp=drive_link', 'Diseño urbano con elementos graffiti', 65.00, NULL),
(6, 'Diseño 6', 'https://drive.google.com/file/d/1-dF0QB-duRN40RlWh5ylXdR6lEj6wuQ1/view?usp=drive_link', 'Estampado de arte pop', 70.00, NULL),
(7, 'Diseño 7', 'https://drive.google.com/file/d/1-iOrYBpfaMOOyoSPJST19pcAVBLb_ZRc/view?usp=drive_link', 'Patrón geométrico en colores pastel', 50.00, NULL),
(8, 'Diseño 8', 'https://drive.google.com/file/d/1-ihWunFsvwJK81oavJ44T7pasISgmWtR/view?usp=drive_link', 'Diseño retro con elementos vintage', 60.00, NULL),
(9, 'Diseño 9', 'https://drive.google.com/file/d/1-rtK16oPnFs7SR3cuODeiiJGraqw6W91/view?usp=drive_link', 'Estampado de camuflaje moderno', 55.00, NULL),
(10, 'Diseño 10', 'https://drive.google.com/file/d/1-uzU0wPOT9VsH2mtQD6wCNhgMMzdpBVX/view?usp=drive_link', 'Diseño de montañas y naturaleza', 65.00, NULL),
(11, 'Diseño 11', 'https://drive.google.com/file/d/1-wVoC_CbnoRgMVdAs1IwFnp0rPXZ7huv/view?usp=drive_link', 'Logo minimalista para gorras', 40.00, 1),
(12, 'Diseño 12', 'https://drive.google.com/file/d/101s738LHyV8jwNvrj0mdJpsWxaZha1cF/view?usp=drive_link', 'Estampado frontal para gorras', 45.00, 1),
(13, 'Diseño 13', 'https://drive.google.com/file/d/107qs1QApuRLnt6CGfied5J2M2Loqzo8I/view?usp=drive_link', 'Diseño lateral para gorras', 40.00, 1),
(14, 'Diseño 14', 'https://drive.google.com/file/d/109vZlx2v7gdY-13W9TJY1ijepGMd1PjD/view?usp=drive_link', 'Patrón para visera de gorra', 35.00, 1),
(15, 'Diseño 15', 'https://drive.google.com/file/d/10Az_9tONwkKsCrWMH25QvfCq90ZeHGye/view?usp=drive_link', 'Estampado para espalda de chamarra', 100.00, 2),
(16, 'Diseño 16', 'https://drive.google.com/file/d/10IbaOj2lI3oq29i8yUiNxlJ9fGStSPda/view?usp=drive_link', 'Diseño para mangas de chamarra', 80.00, 2),
(17, 'Diseño 17', 'https://drive.google.com/file/d/10Lms_E1Rgu_Tpox6zFBPiMRvW8xqq85d/view?usp=drive_link', 'Logo para bolsillo de chamarra', 50.00, 2),
(18, 'Diseño 18', 'https://drive.google.com/file/d/10OW9xLHbhGAEbNjPcQIhIQcWCz9wblUY/view?usp=drive_link', 'Patrón para cuello de chamarra', 60.00, 2),
(19, 'Diseño 19', 'https://drive.google.com/file/d/10QqlWCyuynIChu8weQaPzlZ92u_z-CW4/view?usp=drive_link', 'Estampado completo para chamarra', 150.00, 2),
(20, 'Diseño 20', 'https://drive.google.com/file/d/10_APlTbLpFb8q-R-CgHd0jL9HiiNJPxR/view?usp=drive_link', 'Estampado frontal para sudadera', 80.00, 3),
(21, 'Diseño 21', 'https://drive.google.com/file/d/10_CTXi09Cdt4I0fMybBfzDoFIFSLj_Sn/view?usp=drive_link', 'Diseño para capucha de sudadera', 60.00, 3),
(22, 'Diseño 22', 'https://drive.google.com/file/d/10bI2Fe9ctNEhgB_NFRXnk-p2qHYy5f5R/view?usp=drive_link', 'Patrón para bolsillo de sudadera', 50.00, 3),
(23, 'Diseño 23', 'https://drive.google.com/file/d/10d9jtNrvkx06LkmhVq9riBZrefTtvQFt/view?usp=drive_link', 'Estampado para mangas de sudadera', 70.00, 3),
(24, 'Diseño 24', 'https://drive.google.com/file/d/10dRzPa-MfMgmSRs23Hyan4M1uhbKU1hQ/view?usp=drive_link', 'Diseño minimalista para sudadera', 75.00, 3),
(25, 'Diseño 25', 'https://drive.google.com/file/d/10dxXZw3H_wSfh_gizlre3i83Qnhgd0LY/view?usp=drive_link', 'Estampado frontal para playera', 60.00, 4),
(26, 'Diseño 26', 'https://drive.google.com/file/d/10mGJI3Em2YVdBo73KxkxQjADBJ2Ig-LS/view?usp=drive_link', 'Diseño para manga de playera', 40.00, 4),
(27, 'Diseño 27', 'https://drive.google.com/file/d/10mtCW_XxqSQg4WAzmWyvVB3sg6ZK9VSa/view?usp=drive_link', 'Estampado completo para playera', 90.00, 4),
(28, 'Diseño 28', 'https://drive.google.com/file/d/10pzc0VUMS6AmKNKiGlAqlSV0bcJlbt5T/view?usp=drive_link', 'Logo pequeño para playera', 30.00, 4),
(29, 'Diseño 29', 'https://drive.google.com/file/d/111J9F5DC2KNfAdTVpqOSlTbafpxdiAxH/view?usp=drive_link', 'Diseño de bolsillo para playera', 45.00, 4),
(30, 'Diseño 30', 'https://drive.google.com/file/d/11-0UB1FW-uBNIBLpJzHpZCGJ_RuLUgYh/view?usp=drive_link', 'Patrón elegante para camisa', 70.00, 5),
(31, 'Diseño 31', 'https://drive.google.com/file/d/10xLZ0V0bOaraG6xO9tzMfhzxBTjY3oiC/view?usp=drive_link', 'Diseño para puños de camisa', 40.00, 5),
(32, 'Diseño 32', 'https://drive.google.com/file/d/10v5w7k-PmeGm7HZdTGJi_wg4gyS32MwK/view?usp=drive_link', 'Estampado para cuello de camisa', 45.00, 5),
(33, 'Diseño 33', 'https://drive.google.com/file/d/10uaa6TTmeZAgiZdMHEwJtGI-fNogblM6/view?usp=drive_link', 'Logo discreto para camisa', 35.00, 5),
(34, 'Diseño 34', 'https://drive.google.com/file/d/111xFq6ejZdkMDRYBjQchIzh78ic5eFXr/view?usp=drive_link', 'Diseño para bolsillo de camisa', 40.00, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `favorito_id` int(11) NOT NULL,
  `cliente_id` int(11) NOT NULL,
  `producto_id` int(11) NOT NULL,
  `fecha_agregado` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`favorito_id`, `cliente_id`, `producto_id`, `fecha_agregado`) VALUES
(1, 1, 2, '2025-02-26 14:46:54'),
(2, 1, 5, '2025-02-26 14:46:54'),
(3, 2, 7, '2025-02-26 14:46:54');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `pedido_id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `fecha_pedido` datetime DEFAULT current_timestamp(),
  `monto_total` decimal(10,2) DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'pendiente'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `pedidos`
--

INSERT INTO `pedidos` (`pedido_id`, `cliente_id`, `fecha_pedido`, `monto_total`, `estado`) VALUES
(1, 1, '2025-02-26 14:45:11', 650.00, 'completado'),
(2, 1, '2025-02-26 14:45:57', 750.00, 'entregado'),
(3, 2, '2025-02-26 14:45:57', 520.00, 'en proceso'),
(4, 3, '2025-02-26 14:45:57', 890.00, 'pendiente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_base`
--

CREATE TABLE `productos_base` (
  `producto_id` int(11) NOT NULL,
  `categoria_id` int(11) DEFAULT NULL,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `precio_base` decimal(10,2) NOT NULL,
  `stock` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_base`
--

INSERT INTO `productos_base` (`producto_id`, `categoria_id`, `nombre`, `descripcion`, `precio_base`, `stock`) VALUES
(1, 1, 'Gorra Básica', 'Gorra de algodón personalizable', 150.00, 100),
(2, 1, 'Gorra Premium', 'Gorra premium con tejido de alta calidad', 200.00, 75),
(3, 2, 'Chamarra Casual', 'Chamarra ligera para uso diario', 450.00, 50),
(4, 2, 'Chamarra de Cuero', 'Chamarra de cuero sintético', 850.00, 30),
(5, 3, 'Sudadera con Capucha', 'Sudadera cómoda con bolsillo tipo canguro', 350.00, 80),
(6, 3, 'Sudadera Deportiva', 'Sudadera de material térmico para deportes', 400.00, 60),
(7, 4, 'Playera Básica', 'Playera de algodón 100%', 120.00, 200),
(8, 4, 'Playera Cuello V', 'Playera con cuello en V', 150.00, 150),
(9, 5, 'Camisa Formal', 'Camisa para ocasiones formales', 300.00, 70),
(10, 5, 'Camisa Casual', 'Camisa para uso diario', 250.00, 90);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tallas`
--

CREATE TABLE `tallas` (
  `talla_id` int(11) NOT NULL,
  `producto_id` int(11) DEFAULT NULL,
  `nombre_talla` varchar(10) NOT NULL,
  `costo_adicional` decimal(10,2) DEFAULT 0.00
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tallas`
--

INSERT INTO `tallas` (`talla_id`, `producto_id`, `nombre_talla`, `costo_adicional`) VALUES
(1, 1, 'S', 0.00),
(2, 1, 'M', 0.00),
(3, 1, 'L', 10.00),
(4, 1, 'XL', 15.00),
(5, 2, 'S', 0.00),
(6, 2, 'M', 0.00),
(7, 2, 'L', 10.00),
(8, 2, 'XL', 15.00),
(9, 3, 'S', 0.00),
(10, 3, 'M', 0.00),
(11, 3, 'L', 30.00),
(12, 3, 'XL', 50.00),
(13, 3, 'XXL', 70.00),
(14, 4, 'S', 0.00),
(15, 4, 'M', 0.00),
(16, 4, 'L', 50.00),
(17, 4, 'XL', 80.00),
(18, 4, 'XXL', 100.00),
(19, 5, 'S', 0.00),
(20, 5, 'M', 0.00),
(21, 5, 'L', 20.00),
(22, 5, 'XL', 40.00),
(23, 5, 'XXL', 60.00),
(24, 6, 'S', 0.00),
(25, 6, 'M', 0.00),
(26, 6, 'L', 20.00),
(27, 6, 'XL', 40.00),
(28, 6, 'XXL', 60.00),
(29, 7, 'S', 0.00),
(30, 7, 'M', 0.00),
(31, 7, 'L', 15.00),
(32, 7, 'XL', 25.00),
(33, 7, 'XXL', 35.00),
(34, 8, 'S', 0.00),
(35, 8, 'M', 0.00),
(36, 8, 'L', 15.00),
(37, 8, 'XL', 25.00),
(38, 8, 'XXL', 35.00),
(39, 9, 'S', 0.00),
(40, 9, 'M', 0.00),
(41, 9, 'L', 20.00),
(42, 9, 'XL', 35.00),
(43, 9, 'XXL', 50.00),
(44, 10, 'S', 0.00),
(45, 10, 'M', 0.00),
(46, 10, 'L', 20.00),
(47, 10, 'XL', 35.00),
(48, 10, 'XXL', 50.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `busquedas_recientes`
--
ALTER TABLE `busquedas_recientes`
  ADD PRIMARY KEY (`busqueda_id`),
  ADD KEY `cliente_id` (`cliente_id`);

--
-- Indices de la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD PRIMARY KEY (`carrito_id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `talla_id` (`talla_id`),
  ADD KEY `diseno_predeterminado_id` (`diseno_predeterminado_id`),
  ADD KEY `diseno_personalizado_id` (`diseno_personalizado_id`);

--
-- Indices de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  ADD PRIMARY KEY (`categoria_id`);

--
-- Indices de la tabla `clientes`
--
ALTER TABLE `clientes`
  ADD PRIMARY KEY (`cliente_id`);

--
-- Indices de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD PRIMARY KEY (`detalle_pedido_id`),
  ADD KEY `pedido_id` (`pedido_id`),
  ADD KEY `producto_id` (`producto_id`),
  ADD KEY `talla_id` (`talla_id`),
  ADD KEY `diseno_predeterminado_id` (`diseno_predeterminado_id`),
  ADD KEY `diseno_personalizado_id` (`diseno_personalizado_id`);

--
-- Indices de la tabla `disenos_personalizados`
--
ALTER TABLE `disenos_personalizados`
  ADD PRIMARY KEY (`diseno_personalizado_id`);

--
-- Indices de la tabla `disenos_predeterminados`
--
ALTER TABLE `disenos_predeterminados`
  ADD PRIMARY KEY (`diseno_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`favorito_id`),
  ADD KEY `cliente_id` (`cliente_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`pedido_id`);

--
-- Indices de la tabla `productos_base`
--
ALTER TABLE `productos_base`
  ADD PRIMARY KEY (`producto_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `tallas`
--
ALTER TABLE `tallas`
  ADD PRIMARY KEY (`talla_id`),
  ADD KEY `producto_id` (`producto_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `busquedas_recientes`
--
ALTER TABLE `busquedas_recientes`
  MODIFY `busqueda_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `carrito`
--
ALTER TABLE `carrito`
  MODIFY `carrito_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `categorias_productos`
--
ALTER TABLE `categorias_productos`
  MODIFY `categoria_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `clientes`
--
ALTER TABLE `clientes`
  MODIFY `cliente_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  MODIFY `detalle_pedido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `disenos_personalizados`
--
ALTER TABLE `disenos_personalizados`
  MODIFY `diseno_personalizado_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `disenos_predeterminados`
--
ALTER TABLE `disenos_predeterminados`
  MODIFY `diseno_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `favorito_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `pedido_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `productos_base`
--
ALTER TABLE `productos_base`
  MODIFY `producto_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tallas`
--
ALTER TABLE `tallas`
  MODIFY `talla_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `busquedas_recientes`
--
ALTER TABLE `busquedas_recientes`
  ADD CONSTRAINT `busquedas_recientes_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`);

--
-- Filtros para la tabla `carrito`
--
ALTER TABLE `carrito`
  ADD CONSTRAINT `carrito_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`),
  ADD CONSTRAINT `carrito_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos_base` (`producto_id`),
  ADD CONSTRAINT `carrito_ibfk_3` FOREIGN KEY (`talla_id`) REFERENCES `tallas` (`talla_id`),
  ADD CONSTRAINT `carrito_ibfk_4` FOREIGN KEY (`diseno_predeterminado_id`) REFERENCES `disenos_predeterminados` (`diseno_id`),
  ADD CONSTRAINT `carrito_ibfk_5` FOREIGN KEY (`diseno_personalizado_id`) REFERENCES `disenos_personalizados` (`diseno_personalizado_id`);

--
-- Filtros para la tabla `detalles_pedido`
--
ALTER TABLE `detalles_pedido`
  ADD CONSTRAINT `detalles_pedido_ibfk_1` FOREIGN KEY (`pedido_id`) REFERENCES `pedidos` (`pedido_id`),
  ADD CONSTRAINT `detalles_pedido_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos_base` (`producto_id`),
  ADD CONSTRAINT `detalles_pedido_ibfk_3` FOREIGN KEY (`talla_id`) REFERENCES `tallas` (`talla_id`),
  ADD CONSTRAINT `detalles_pedido_ibfk_4` FOREIGN KEY (`diseno_predeterminado_id`) REFERENCES `disenos_predeterminados` (`diseno_id`),
  ADD CONSTRAINT `detalles_pedido_ibfk_5` FOREIGN KEY (`diseno_personalizado_id`) REFERENCES `disenos_personalizados` (`diseno_personalizado_id`);

--
-- Filtros para la tabla `disenos_predeterminados`
--
ALTER TABLE `disenos_predeterminados`
  ADD CONSTRAINT `disenos_predeterminados_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_productos` (`categoria_id`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`cliente_id`) REFERENCES `clientes` (`cliente_id`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`producto_id`) REFERENCES `productos_base` (`producto_id`);

--
-- Filtros para la tabla `productos_base`
--
ALTER TABLE `productos_base`
  ADD CONSTRAINT `productos_base_ibfk_1` FOREIGN KEY (`categoria_id`) REFERENCES `categorias_productos` (`categoria_id`);

--
-- Filtros para la tabla `tallas`
--
ALTER TABLE `tallas`
  ADD CONSTRAINT `tallas_ibfk_1` FOREIGN KEY (`producto_id`) REFERENCES `productos_base` (`producto_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
