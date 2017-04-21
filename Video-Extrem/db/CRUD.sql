DELIMITER //
	CREATE PROCEDURE addGenre
		(IN pGenero VARCHAR(100), IN pDescripcion VARCHAR(500))
		
		BEGIN
		
			INSERT INTO generos (genero, descripcion) VALUES (pGenero, pDescripcion);
				
		END //	
DELIMITER ;

-- call addGenre("Terror", "Peliculas de Terror");
------------------------------------------------------------------------
DELIMITER //
	CREATE PROCEDURE addCategory
		(IN pCategoria VARCHAR(100))
		
		BEGIN
		
			INSERT INTO categorias (categoria) VALUES (pCategoria);
			
		END //
DELIMITER ;

-- call addCategory("Top 10")
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addGenreByMovie
	(IN pIdPelicula BIGINT, IN pIdGenero BIGINT)
	
	BEGIN
	
		INSERT INTO generosxpelicula (idPelicula, idGenero) VALUES (idPelicula, idGenero);
		
	END //
DELIMITER ;

-- call addGenreByMovie(1, 1);
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addMovie
	(IN pAno INT, IN pPelicula VARCHAR(200), IN pIdActorXpelicula BIGINT, IN pIdGeneroXpelicula BIGINT, IN pIdIdiomaXpelicula BIGINT, IN pTrama VARCHAR(1000),
		IN pIdCategoriaXpelicula BIGINT, IN pIdSubXpelicula BIGINT, IN pPrecio DECIMAL, IN pFechaIngreso DATETIME, pLinkImagen VARCHAR(500))

	BEGIN
	
		DECLARE _CurrentDateTime DATETIME;
		
		SET _CurrentDateTime = now();
		
		INSERT INTO peliculas (ano, pelicula, idActorXpelicula, idGeneroXpelicula, idIdiomaXpelicula, trama, idCategoriaXpelicula, idSubXpelicula, precio, fechaIngreso, 
			linkImagen) 
		VALUES (pAno, pPelicula, pIdActorXpelicula, pIdGeneroXpelicula, pIdIdiomaXpelicula, pTrama, pIdCategoriaXpelicula, pIdSubXpelicula, pPrecio, _CurrentDateTime, 
				pLinkImagen);
	END //
DELIMITER ;

-- call addMovie(null, "Harry Potter", null,null,null,null,null,null,1000,now(),null);
------------------------------------------------------------------------