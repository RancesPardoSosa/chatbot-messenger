-- CREACION DE BASE DE DATOS
-- ============================================================
CREATE DATABASE IF NOT EXISTS ferreteria_bot;

USE ferreteria_bot;

-- TABLA USUARIO
-- ============================================================
CREATE TABLE user (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(100),
    phone VARCHAR(15),
    address VARCHAR(255),
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- TABLA PRODUCTOS
-- ============================================================
CREATE TABLE product (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock INT DEFAULT 0,
    image_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE
);

-- TABLA PEDIDOS
-- ============================================================
CREATE TABLE `order` (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100) NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    state ENUM(
        'pending',
        'confirmed',
        'delivered'
    ) DEFAULT 'pending',
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES user (id)
);

-- TABLA DETALLE PEDIDO
-- ============================================================
CREATE TABLE order_detail (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES `order` (id),
    FOREIGN KEY (product_id) REFERENCES product (id)
);

-- TABLA HISTORIAL CHAT
-- ============================================================
CREATE TABLE chat_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id VARCHAR(100),
    user_message TEXT,
    bot_response TEXT,
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES user (id)
);