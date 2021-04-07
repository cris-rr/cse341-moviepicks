CREATE TABLE users (
  userid SERIAL NOT NULL PRIMARY KEY,
  firstname VARCHAR(100) NOT NULL,
  lastname VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL
);

CREATE TABLE movies (
  id SERIAL NOT NULL PRIMARY KEY,
  movieid INT NOT NULL,
  title VARCHAR(200) NOT NULL,
  poster_path VARCHAR(100) NOT NULL,
  add_date DATE NOT NULL DEFAULT CURRENT_DATE,
  userid INT NOT NULL REFERENCES users(userid)
);

-- ----------------------------------------------
-- Insert 2 rows in users
INSERT INTO users (firstname, lastname, email, PASSWORD)
  VALUES('Admin', 'Superuser', 'admin@gmail.com', 'pass12345'),
        ('Cris', 'Ruiz', 'cris@gmail.com', 'pass12345');

INSERT INTO movies (movieid, title, poster_path, userid)
  VALUES(1366, 'Rocky', '/i5xiwdSsrecBvO7mIfAJixeEDSg.jpg', 1),
        (1367, 'Rocky II', '/a9UbfUELZHj96tBVWnKrDrtnQcr.jpg', 1),
        (1346, 'Rocky Balboa', '/bgheMOLFVkpiZ3KhG3PGrMAPdXn.jpg', 1),
        (1346, 'Rocky Balboa', '/bgheMOLFVkpiZ3KhG3PGrMAPdXn.jpg', 2),
        (1366, 'Rocky', '/i5xiwdSsrecBvO7mIfAJixeEDSg.jpg', 2),
        (1367, 'Rocky II', '/a9UbfUELZHj96tBVWnKrDrtnQcr.jpg', 2);

ALTER TABLE movies RENAME COLUMN movieid TO id1; 
ALTER TABLE movies RENAME COLUMN id TO movieid; 
ALTER TABLE movies RENAME COLUMN id1 TO id;
 
