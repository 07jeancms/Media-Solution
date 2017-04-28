DELIMITER //
	CREATE PROCEDURE addGenre
		(IN pGenero VARCHAR(100), IN pDescripcion VARCHAR(500))
		
		BEGIN
		
			INSERT INTO generos (genero, descripcion) VALUES (pGenero, pDescripcion);
				
		END //	
DELIMITER ;

-- call addGenre("Terror", "Peliculas de Terror");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
	CREATE PROCEDURE addCategory
		(IN pCategoria VARCHAR(100))
		
		BEGIN
		
			INSERT INTO categorias (categoria) VALUES (pCategoria);
			
		END //
DELIMITER ;

-- call addCategory("Top 10");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
	CREATE PROCEDURE addLanguage
		(IN pIdioma VARCHAR(100))
		
		BEGIN
		
			INSERT INTO idiomas (idioma) VALUES (pIdioma);
			
		END //
DELIMITER ;

-- call addLanguage("English");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
	CREATE PROCEDURE addActor
		(IN pActor VARCHAR(100))
		
		BEGIN
		
			INSERT INTO actores (actor) VALUES (pActor);
			
		END //
DELIMITER ;

-- call addActor("Vin Diesel");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
	CREATE PROCEDURE addSubtitle
		(IN pSubtitulo VARCHAR(100))
		
		BEGIN
		
			INSERT INTO subtitulos (subtitulo) VALUES (pSubtitulo);
			
		END //
DELIMITER ;

-- call addSubtitle("Espanol");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addGenreByMovie
	(IN pIdPelicula BIGINT, IN pIdGenero BIGINT)
	
	BEGIN
	
		INSERT INTO generosxpelicula (idPelicula, idGenero) VALUES (pIdPelicula, pIdGenero);
		
	END //
DELIMITER ;

-- call addGenreByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addCategoryByMovie
	(IN pIdPelicula BIGINT, IN pIdCategoria BIGINT)
	
	BEGIN
	
		INSERT INTO categoriasxpelicula (idPelicula, idCategoria) VALUES (pIdPelicula, pIdCategoria);
		
	END //
DELIMITER ;

-- call addGenreByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addLanguageByMovie
	(IN pIdIdioma BIGINT, IN pIdPelicula BIGINT)
	
	BEGIN
	
		INSERT INTO idiomasxpelicula (idIdioma, idPelicula) VALUES (pIdIdioma, pIdPelicula);
		
	END //
DELIMITER ;

-- call addLanguageByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addActorsByMovie
	(IN pIdPelicula BIGINT, IN pIdActor BIGINT)
	
	BEGIN
	
		INSERT INTO actoresxpelicula (idPelicula, idActor) VALUES (pIdPelicula, pIdActor);
		
	END //
DELIMITER ;

-- call addActorsByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addSubtitlesByMovie
	(IN pIdPelicula BIGINT, IN pIdSubtitulo BIGINT)
	
	BEGIN
	
		INSERT INTO subtitulosxpelicula (idPelicula, idSubtitulo) VALUES (pIdPelicula, pIdSubtitulo);
		
	END //
DELIMITER ;

-- call addSubtitlesByMovie(1, 1);
------------------------------------------------------------------------
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
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addSale
	(IN pDescripcion VARCHAR(500))
	
	BEGIN
	
		INSERT INTO ventas (fecha, descripcion) VALUES (now(), pDescripcion);
		
	END //
DELIMITER ;

-- call addSale("2 peliculas de Cars");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addMoviesBySale
	(IN pIdPelicula BIGINT, IN pIdVenta BIGINT)
	
	BEGIN
	
		INSERT INTO peliculasxventa (idPelicula, idVenta) VALUES (pIdPelicula, pIdVenta);
		
	END //
DELIMITER ;

-- call addMoviesBySale(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addSuggestion
	(IN pSugerencia VARCHAR(1000), IN pIdUsuario BIGINT)
	
	BEGIN
	
		INSERT INTO sugerencias (sugerencia, idUsuario, fecha) VALUES (pSugerencia, pIdUsuario, now());
		
	END //
DELIMITER ;

-- call addSuggestion("Seria util si se habilita un espacio para ingresar el nombre de la persona que va a recoger la pelicula", 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addSuggestionsByUser
	(IN pIdUsuario BIGINT, IN pIdSugerencia BIGINT)
	
	BEGIN
	
		INSERT INTO sugerenciasxusuario (idUsuario, idSugerencia) VALUES (pIdUsuario, pIdSugerencia);
		
	END //
DELIMITER ;

-- call addSuggestionsByUser(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addUser
	(IN pToken VARCHAR(300), IN pIdRolXusuario BIGINT, IN pCorreo VARCHAR(75), IN pTelefono VARCHAR(50))
	
	BEGIN
	
		INSERT INTO usuarios (token, idRolXusuario, fechaIngreso, correo, telefono) VALUES (pToken, pIdRolXusuario, now(), pCorreo, pTelefono);
		
	END //
DELIMITER ;

-- call addUser(null, 1, "jean.cms@hotmail.es", "88888888");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE rolesByUser
	(IN pIdUsuario BIGINT, IN pIdRol BIGINT)
	
	BEGIN
	
		INSERT INTO rolesxusuario (isUsuario, idRol) VALUES (pIdUsuario, pIdRol);
		
	END //
DELIMITER ;

-- call rolesByUser(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addRole
	(IN pRole VARCHAR(75))
	
	BEGIN
	
		INSERT INTO roles (rol) VALUES (pRole);
		
	END //
DELIMITER ;

-- call addRole("Admin");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addStore
	(IN pLocal VARCHAR(100), IN pUbicacion VARCHAR(500), IN pImagen LONGBLOB, IN pTelefono VARCHAR(50), IN pCorreo VARCHAR(50))
	
	BEGIN
	
		INSERT INTO locales (local, ubicacion, imagen, telefono, correo) VALUES (pLocal, pUbicacion, pImagen, pTelefono, pCorreo);
		
	END //
DELIMITER ;

-- call addStore("Video Extrem Coro", "Del parque de coronado 100 mts este y 25 mts sur", null, "88888888", "video_extrem@hotmail.com");
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addDiscount
	(IN pPromocion VARCHAR(200), IN pDescripcion VARCHAR(500), IN pImagen LONGBLOB)
	
	BEGIN
	
		INSERT INTO promociones (promocion, descripcion, imagen) VALUES (pPromocion, pDescripcion, pImagen);
		
	END //
DELIMITER ;

-- call addDiscount("Peliculas de accion 2x1", "Descuento", null);
------------------------------------------------------------------------
------------------------------------------------------------------------