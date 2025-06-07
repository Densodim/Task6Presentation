import {pool} from "../db";


async function createTables() {
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();

        await conn.query(`
      CREATE TABLE IF NOT EXISTS presentations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        creator_nickname VARCHAR(100) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);
        console.log(' Table "presentations" created');

        await conn.query(`
      CREATE TABLE IF NOT EXISTS presentation_users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        presentation_id INT NOT NULL,
        nickname VARCHAR(100) NOT NULL,
        role ENUM('creator', 'editor', 'viewer') NOT NULL DEFAULT 'viewer',
        FOREIGN KEY (presentation_id) REFERENCES presentations(id) ON DELETE CASCADE
      )
    `);
        console.log('Table "presentation_users" created');


        await conn.query(`
      CREATE TABLE IF NOT EXISTS slides (
        id INT AUTO_INCREMENT PRIMARY KEY,
        presentation_id INT NOT NULL,
        \`order\` INT NOT NULL,
        background VARCHAR(20) DEFAULT '#ffffff',
        FOREIGN KEY (presentation_id) REFERENCES presentations(id) ON DELETE CASCADE
      )
    `);
        console.log('Table "slides" created');

        await conn.query(`
      CREATE TABLE IF NOT EXISTS elements (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slide_id INT NOT NULL,
        type ENUM('text', 'shape', 'image') NOT NULL,
        content JSON,
        style JSON,
        position_x INT,
        position_y INT,
        FOREIGN KEY (slide_id) REFERENCES slides(id) ON DELETE CASCADE
      )
    `);
        console.log('Table "elements" created');

        await conn.commit();
        console.log('🎉 All tables created successfully!');
    } catch (error) {
        await conn.rollback();
        console.error('Failed to create tables:', error);
    } finally {
        conn.release();
    }
}

createTables().then(() => process.exit());