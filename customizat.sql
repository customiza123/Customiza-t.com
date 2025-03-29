-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 24-03-2025 a las 03:38:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `customizat`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `busqueda`
--

CREATE TABLE `busqueda` (
  `id` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `idProducto` int(11) DEFAULT NULL,
  `Nombre_busqueda` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detallespedido`
--

CREATE TABLE `detallespedido` (
  `IdPedido` int(11) NOT NULL,
  `IdProducto` int(11) NOT NULL,
  `talla` varchar(10) NOT NULL,
  `color` varchar(50) NOT NULL,
  `Cantidad` int(11) NOT NULL,
  `Diseño` varchar(255) DEFAULT NULL,
  `Diseño2` varchar(255) DEFAULT NULL,
  `Diseño3` varchar(255) DEFAULT NULL,
  `Diseño4` varchar(255) DEFAULT NULL,
  `status` enum('Recibido','Pendiente','Entregado') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dudas`
--

CREATE TABLE `dudas` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(150) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `Email` varchar(100) DEFAULT NULL,
  `mensaje` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `envio`
--

CREATE TABLE `envio` (
  `id` int(11) NOT NULL,
  `idPedido` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `direccionUsuario` varchar(100) DEFAULT NULL,
  `fecha_Envio` date DEFAULT NULL,
  `Fecha_Entrega_EST` date DEFAULT NULL,
  `status` enum('Enviado','Recibido') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario`
--

CREATE TABLE `inventario` (
  `idProducto` int(11) NOT NULL,
  `nombre` varchar(100) DEFAULT NULL,
  `descripcion` varchar(100) DEFAULT NULL,
  `categoria` varchar(255) NOT NULL,
  `stok` int(11) NOT NULL,
  `stok_minimo` int(11) NOT NULL,
  `Costo` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario`
--

INSERT INTO `inventario` (`idProducto`, `nombre`, `descripcion`, `categoria`, `stok`, `stok_minimo`, `Costo`) VALUES
(1, 'Playera Cuello Redondo Manga Corta ', '100% algodón', 'Hombre', 1000, 50, 39.00),
(2, 'Playera Cuello V Manga Corta', '100% algodón', 'Hombre', 1000, 50, 39.00),
(3, 'Playera Cuello V Manga Corta ', '100% algodón', 'Mujer', 1000, 50, 39.00),
(4, 'Payera Cuello Redondo Sin Mangas ', '100% algodón', 'Hombre', 1000, 50, 39.00),
(5, 'Playera Cuello Redondo Manga Corta ', '100% algodón', 'Mujer', 1000, 50, 39.00),
(6, 'Playera Cuello Redondo Manga Larga ', '100% algodón', 'Mujer', 1000, 50, 39.00),
(7, 'Playera Peso Completo Cuello Redondo Manga Corta ', '100% Algodón', 'Hombre', 1000, 50, 39.00),
(8, 'Playera Peso Completo Cuello Redondo Manga Larga', '100% Algodón', 'Hombre', 1000, 50, 39.00),
(9, 'Playera Peso Completo Cuello Redondo Manga Corta', '100% Algodón', 'Mujer', 1000, 50, 39.00),
(11, 'Playera Tipo Polo Piqué Manga Corta ', '100% algodón', 'Hombre', 1000, 50, 69.00),
(12, 'Playera Tipo Polo Piqué Manga Corta ', '100% Algodón', 'Mujer', 1000, 50, 69.00),
(13, 'Playera Cuello Redondo Manga Larga ', '100% Algodón', 'Hombre', 1000, 50, NULL),
(14, 'Playera Tipo Polo Manga Corta', '100% Algodón', 'Hombre', 1000, 50, 69.00),
(15, 'Playera Tipo Polo Manga Corta', '100% Algodón', 'Mujer', 1000, 50, 69.00),
(16, 'Sudadera Cuello Redondo', '50% algodón 50% Poliéster', 'Unisex', 1000, 50, 89.00),
(17, 'Sudadera Con Capucha y Caguera ', '50% algodón 50% Poliéster', 'Unisex', 1000, 50, 89.00),
(18, 'Sudadera Con Capucha, Cangurera y Cierre', '50% algodón 50% Poliéster', 'Unisex', 1000, 50, 89.00),
(19, 'Sudadera 1/4 de Cierre ', '50% algodón 50% Poliéster', 'Unisex', 1000, 50, 89.00),
(20, 'Camisa de Mezclilla Manga Corta', '100% Algodón', 'Hombre', 1000, 50, 174.00),
(21, 'Camisa de Mezclilla Manga Corta', '100% Algodón', 'Mujer', 1000, 50, 174.00),
(22, 'Camisa de Mezclilla Manga Larga', '100% Algodón', 'Hombre', 1000, 50, 174.00),
(23, 'Camisa de Mezclilla Manga Larga', '100% Algodón', 'Mujer', 1000, 50, 174.00),
(24, 'Camisa Oxford Manga Corta', '75% Algodón 25% Poliéster', 'Hombre', 1000, 50, 208.00),
(25, 'Camisa Oxford Manga Corta', '75% Algodón 25% Poliéster', 'Mujer', 1000, 50, 208.00),
(26, 'Camisa Oxford Manga Larga', '75% Algodón 25% Poliéster', 'Hombre', 1000, 50, 208.00),
(27, 'Camisa Oxford Manga Larga', '75% Algodón 25% Poliéster', 'Mujer', 1000, 50, 208.00),
(28, 'Camisa de Gabardina Manga Corta', '50% Algodón 50% Poliéster', 'Hombre', 1000, 50, 208.00),
(29, 'Camisa de Gabardina Manga Corta', '50% Algodón 50% Poliéster', 'Mujer', 1000, 50, 208.00),
(30, 'Camisa de Gabardina Manga Larga', '50% Algodón 50% Poliéster', 'Hombre', 1000, 50, 208.00),
(31, 'Camisa de Gabardina Manga Larga', '50% Algodón 50% Poliéster', 'Mujer', 1000, 50, 208.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `metododepago`
--

CREATE TABLE `metododepago` (
  `id` int(11) NOT NULL,
  `IdUsuario` int(11) DEFAULT NULL,
  `NombreTitular` varchar(255) DEFAULT NULL,
  `tarjeta` enum('Crédito','Debito') NOT NULL,
  `TipoTarjeta` enum('Visa','Mastercard','AmericanExpress','Otro') NOT NULL,
  `NumeroTarjeta` varchar(20) DEFAULT NULL,
  `FechaExpiracion` date NOT NULL,
  `CVV` varchar(3) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

CREATE TABLE `pedido` (
  `Id` int(11) NOT NULL,
  `IdUsuario` int(11) NOT NULL,
  `FechaPedido` date NOT NULL,
  `Descripcion` text DEFAULT NULL,
  `Cantidad` int(11) DEFAULT NULL,
  `Subtotal` decimal(10,2) DEFAULT NULL,
  `Total` decimal(10,2) DEFAULT NULL,
  `Status` varchar(50) DEFAULT NULL,
  `IdPago` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

CREATE TABLE `producto` (
  `id` int(11) NOT NULL,
  `Nombre` varchar(100) DEFAULT NULL,
  `Material` varchar(200) NOT NULL,
  `Categoria` enum('Hombre','Mujer','Unisex') NOT NULL,
  `Precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`id`, `Nombre`, `Material`, `Categoria`, `Precio`) VALUES
(1, 'Playera Cuello Redondo Manga Corta ', '100% algodón', 'Hombre', 250.00),
(2, 'Playera Cuello V Manga Corta', '100% algodón', 'Hombre', 250.00),
(3, 'Playera Cuello V Manga Corta ', '100% algodón', 'Mujer', 260.00),
(4, 'Payera Cuello Redondo Sin Mangas ', '100% algodón', 'Hombre', 250.00),
(5, 'Playera Cuello Redondo Manga Corta ', '100% algodón', 'Mujer', 260.00),
(6, 'Playera Cuello Redondo Manga Larga ', '100% algodón', 'Mujer', 260.00),
(7, 'Playera Peso Completo Cuello Redondo Manga Corta ', '100% Algodón', 'Hombre', 250.00),
(8, 'Playera Peso Completo Cuello Redondo Manga Larga', '100% Algodón', 'Hombre', 250.00),
(9, 'Playera Peso Completo Cuello Redondo Manga Corta', '100% Algodón', 'Mujer', 260.00),
(11, 'Playera Tipo Polo Piqué Manga Corta ', '100% algodón', 'Hombre', 250.00),
(12, 'Playera Tipo Polo Piqué Manga Corta ', '100% Algodón', 'Mujer', 250.00),
(13, 'Playera Cuello Redondo Manga Larga ', '100% Algodón', 'Hombre', 250.00),
(14, 'Playera Tipo Polo Manga Corta', '100% Algodón', 'Hombre', 250.00),
(15, 'Playera Tipo Polo Manga Corta', '100% Algodón', 'Mujer', 260.00),
(16, 'Sudadera Cuello Redondo', '50% algodón 50% Poliéster', 'Unisex', 350.00),
(17, 'Sudadera Con Capucha y Caguera ', '50% algodón 50% Poliéster', 'Unisex', 350.00),
(18, 'Sudadera Con Capucha, Cangurera y Cierre', '50% algodón 50% Poliéster', 'Unisex', 360.00),
(19, 'Sudadera 1/4 de Cierre ', '50% algodón 50% Poliéster', 'Unisex', 360.00),
(20, 'Camisa de Mezclilla Manga Corta', '100% Algodón', 'Hombre', 300.00),
(21, 'Camisa de Mezclilla Manga Corta', '100% Algodón', 'Mujer', 300.00),
(22, 'Camisa de Mezclilla Manga Larga', '100% Algodón', 'Hombre', 300.00),
(23, 'Camisa de Mezclilla Manga Larga', '100% Algodón', 'Mujer', 300.00),
(24, 'Camisa Oxford Manga Corta', '75% Algodón 25% Poliéster', 'Hombre', 280.00),
(25, 'Camisa Oxford Manga Corta', '75% Algodón 25% Poliéster', 'Mujer', 280.00),
(26, 'Camisa Oxford Manga Larga', '75% Algodón 25% Poliéster', 'Hombre', 290.00),
(27, 'Camisa Oxford Manga Larga', '75% Algodón 25% Poliéster', 'Mujer', 290.00),
(28, 'Camisa de Gabardina Manga Corta', '50% Algodón 50% Poliéster', 'Hombre', 280.00),
(29, 'Camisa de Gabardina Manga Corta', '50% Algodón 50% Poliéster', 'Mujer', 280.00),
(30, 'Camisa de Gabardina Manga Larga', '50% Algodón 50% Poliéster', 'Hombre', 290.00),
(31, 'Camisa de Gabardina Manga Larga', '50% Algodón 50% Poliéster', 'Mujer', 290.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Apellido` varchar(255) DEFAULT NULL,
  `Correo` varchar(255) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Telefono` varchar(20) DEFAULT NULL,
  `Direccion` varchar(255) DEFAULT NULL,
  `Tipo` enum('Cliente','Administrador','Desarrollador') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id`, `Nombre`, `Apellido`, `Correo`, `Contraseña`, `Telefono`, `Direccion`, `Tipo`) VALUES
(1, 'Carlos Eduardo', 'Garcia Tecuatl', '6232200177@univermilenium.edu.mx', 'Teresa123', '5591098897', NULL, 'Administrador'),
(2, 'Adrián Benitez', 'Benitez Arcos ', '6432300031@univermilenium.edu.mx', 'Adrian123', '5618931765', NULL, 'Administrador');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `busqueda`
--
ALTER TABLE `busqueda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `FK_busqueda_producto` (`idProducto`);

--
-- Indices de la tabla `detallespedido`
--
ALTER TABLE `detallespedido`
  ADD PRIMARY KEY (`IdPedido`,`IdProducto`),
  ADD KEY `IdProducto` (`IdProducto`);

--
-- Indices de la tabla `dudas`
--
ALTER TABLE `dudas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `envio`
--
ALTER TABLE `envio`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idPedido` (`idPedido`),
  ADD KEY `IdUsuario` (`IdUsuario`);

--
-- Indices de la tabla `metododepago`
--
ALTER TABLE `metododepago`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IdUsuario` (`IdUsuario`);

--
-- Indices de la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IdUsuario` (`IdUsuario`),
  ADD KEY `IdPago` (`IdPago`);

--
-- Indices de la tabla `producto`
--
ALTER TABLE `producto`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `Precio` (`id`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `busqueda`
--
ALTER TABLE `busqueda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dudas`
--
ALTER TABLE `dudas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `envio`
--
ALTER TABLE `envio`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `metododepago`
--
ALTER TABLE `metododepago`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedido`
--
ALTER TABLE `pedido`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `producto`
--
ALTER TABLE `producto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `busqueda`
--
ALTER TABLE `busqueda`
  ADD CONSTRAINT `FK_busqueda_producto` FOREIGN KEY (`idProducto`) REFERENCES `producto` (`id`),
  ADD CONSTRAINT `busqueda_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`Id`);

--
-- Filtros para la tabla `detallespedido`
--
ALTER TABLE `detallespedido`
  ADD CONSTRAINT `detallespedido_ibfk_1` FOREIGN KEY (`IdPedido`) REFERENCES `pedido` (`Id`),
  ADD CONSTRAINT `detallespedido_ibfk_2` FOREIGN KEY (`IdProducto`) REFERENCES `producto` (`id`);

--
-- Filtros para la tabla `envio`
--
ALTER TABLE `envio`
  ADD CONSTRAINT `envio_ibfk_1` FOREIGN KEY (`idPedido`) REFERENCES `pedido` (`Id`),
  ADD CONSTRAINT `envio_ibfk_2` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`Id`);

--
-- Filtros para la tabla `metododepago`
--
ALTER TABLE `metododepago`
  ADD CONSTRAINT `metododepago_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`Id`);

--
-- Filtros para la tabla `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`Id`),
  ADD CONSTRAINT `pedido_ibfk_2` FOREIGN KEY (`IdPago`) REFERENCES `metododepago` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
