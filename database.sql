CREATE TABLE contractors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    contractor_id INT NOT NULL,
    sign_in_time DATETIME DEFAULT NULL,
    sign_out_time DATETIME DEFAULT NULL,
    site VARCHAR(255) NOT NULL,
    FOREIGN KEY (contractor_id) REFERENCES contractors(id)
);
