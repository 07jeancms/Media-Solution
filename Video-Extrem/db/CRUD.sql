DELIMITER //
	CREATE PROCEDURE addGenre
		(IN pGenero VARCHAR(100), IN pDescripcion VARCHAR(500))
		
		BEGIN
		
			INSERT INTO Generos (genero, descripcion) VALUES (pGenero, pDescripcion);

				
		END //	
DELIMITER ;

-- call addGenre("Terror", "Peliculas de Terror");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE deleteGenre
		(IN pIdGenero BIGINT)
		
		BEGIN

			DELETE FROM Generos WHERE idGenero = pIdGenero;
				
		END //	
DELIMITER ;

-- call deleteGenre(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE updateGenre
		(IN pIdGenero BIGINT, pGenero VARCHAR(100), IN pDescripcion VARCHAR(500))
		
		BEGIN

			UPDATE Generos SET genero = pGenero, descripcion = pDescripcion WHERE idGenero = pIdGenero;
				
		END //	
DELIMITER ;

-- call updateGenre(1, "nuevo genero", "nueva descripcion");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE addCategory
		(IN pCategoria VARCHAR(100))
		
		BEGIN
		
			INSERT INTO Categorias (categoria) VALUES (pCategoria);
			
		END //
DELIMITER ;

-- call addCategory("Top 10");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE deleteCategory
		(IN pidCategoria BIGINT)
		
		BEGIN
		
			DELETE FROM Categorias WHERE idCategoria = pIdCategoria;
			
		END //
DELIMITER ;

-- call deleteCategory("Top 10");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE updateCategory
		(IN pCategoria VARCHAR(100), pidCategoria BIGINT)
		
		BEGIN
			UPDATE Categorias SET categoria = pCategoria WHERE pIdCategoria = idCategoria;
			
		END //
DELIMITER ;


-- call updateCategory("Top 10");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE addLanguage
		(IN pIdioma VARCHAR(100))
		
		BEGIN
		
			INSERT INTO Idiomas (idioma) VALUES (pIdioma);
			
		END //
DELIMITER ;

-- call addLanguage("English");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE deleteLanguage
		(IN pIdLanguage BIGINT)
		
		BEGIN

			DELETE FROM Idiomas WHERE idIdioma = pIdLanguage;
				
		END //	
DELIMITER ;

-- call deleteLanguage(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE updateLanguage
		(IN pIdLanguage BIGINT,pIdioma VARCHAR(100)))
		
		BEGIN

			UPDATE Idiomas SET idioma = pIdioma WHERE idIdioma = pIdLanguage;
				
		END //	
DELIMITER ;

-- call updateLanguage(1,"idioma a borrar");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE addActor
		(IN pActor VARCHAR(100))
		
		BEGIN
		
			INSERT INTO Actores (actor) VALUES (pActor);
			
		END //
DELIMITER ;

-- call addActor("Vin Diesel");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE deleteActor
		(IN pIdActor BIGINT)
		
		BEGIN

			DELETE FROM Actores WHERE idActor = pIdActor;
				
		END //	
DELIMITER ;

-- call deleteActor(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE updateActor
		(IN pIdActor BIGINT,pActor VARCHAR(100))
		
		BEGIN

			UPDATE Actores SET actor = pActor WHERE idActor = pIdActor;
				
		END //	
DELIMITER ;

-- call updateActor(1,"actor a borrar");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE addSubtitle
		(IN pSubtitulo VARCHAR(100))
		
		BEGIN
		
			INSERT INTO Subtitulos (subtitulo) VALUES (pSubtitulo);
			
		END //
DELIMITER ;

-- call addSubtitle("Espanol");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE deleteSubtitle
		(IN pIdSubtitulo BIGINT)
		
		BEGIN

			DELETE FROM Subtitulos WHERE idSubtitulo = pIdSubtitulo;
				
		END //	
DELIMITER ;

-- call deleteSubtitle(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
	CREATE PROCEDURE updateSubtitle
		(IN pIdSubtitulo BIGINT,pSubtitulo VARCHAR(100))
		
		BEGIN

			UPDATE Subtitulos SET subtitulo = pSubtitulo WHERE idSubtitulo = pIdSubtitulo;
				
		END //	
DELIMITER ;

-- call updateSubtitle(1, "subtitulo");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addGenreByMovie
	(IN pIdMovie BIGINT, IN pGenre VARCHAR(100))
	
	BEGIN
	
		DECLARE _idGenero BIGINT;
		SET _idGenero = (SELECT idGenero from Generos where genero = pGenre);
		INSERT INTO GenerosXpelicula (idPelicula, idGenero) VALUES (pIdMovie, _idGenero);
		
	END //
DELIMITER ;

-- call addGenreByMovie(1, "Terror");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addLanguageByMovie
	(IN pIdMovie BIGINT, IN pLanguage VARCHAR(100))
	
	BEGIN
	
		DECLARE _idIdioma BIGINT;
		SET _idIdioma = (SELECT idIdioma from Idiomas where idioma = pLanguage);
		INSERT INTO IdiomasXpelicula (idPelicula, idIdioma) VALUES (pIdMovie, _idIdioma);
		
	END //
DELIMITER ;

------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addActorByMovie
	(IN pIdMovie BIGINT, IN pActor VARCHAR(100))
	
	BEGIN
	
		DECLARE _idActor BIGINT;
		SET _idActor = (SELECT idActor from Actores where actor = pActor);
		INSERT INTO ActoresXpelicula (idPelicula, idActor) VALUES (pIdMovie, _idActor);
		
	END //
DELIMITER ;

-- call addLanguageByMovie(1, "Terror");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addActorByMovie
	(IN pIdMovie BIGINT, IN pActor VARCHAR(100))
	
	BEGIN
	
		DECLARE _idActor BIGINT;
		SET _idActor = (SELECT idActor from Actores where actor = pActor);
		INSERT INTO ActoresXpelicula (idPelicula, idActor) VALUES (pIdMovie, _idActor);
		
	END //
DELIMITER ;

------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addSuggestion
	(IN pIdMovie BIGINT, IN pActor VARCHAR(100))
	
	BEGIN
	
		DECLARE _idActor BIGINT;
		SET _idActor = (SELECT idActor from Actores where actor = pActor);
		INSERT INTO ActoresXpelicula (idPelicula, idActor) VALUES (pIdMovie, _idActor);
		
	END //
DELIMITER ;

-- call addGenreByMovie(1, "Terror");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteGenreByMovie
	(IN pIdPelicula BIGINT)
	
	BEGIN
	
		DELETE FROM GenerosXpelicula WHERE idPelicula = pIdPelicula;
		
	END //
DELIMITER ;

-- call deleteGenreByMovie(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteGenreByMovieSpecific
	(IN pGenre VARCHAR(100), IN pIdMovie BIGINT)
	
	BEGIN
	
		DECLARE _idGenero BIGINT;
		SET _idGenero = (SELECT idGenero from Generos where genero = pGenre);
		
		DELETE FROM GenerosXpelicula where idGenero = _idGenero and idPelicula = pIdMovie;
		
	END //
DELIMITER ;

-- call deleteGenreByMovieSpecific(5, 8);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteActorByMovieSpecific
	(IN pActor VARCHAR(100), IN pIdMovie BIGINT)
	
	BEGIN
	
		DECLARE _idActor BIGINT;
		SET _idActor = (SELECT idActor from Actores where actor = pActor);
		
		DELETE FROM ActoresXpelicula where idActor = _idActor and idPelicula = pIdMovie;
		
	END //
DELIMITER ;

-- call deleteGenreByMovieSpecific(5, 8);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteLanguageByMovieSpecific
	(IN pLanguage VARCHAR(100), IN pIdMovie BIGINT)
	
	BEGIN
	
		DECLARE _idIdioma BIGINT;
		SET _idIdioma = (SELECT idIdioma from Idiomas where idioma = pLanguage);
		
		DELETE FROM IdiomasXpelicula where idIdioma = _idIdioma and idPelicula = pIdMovie;
		
	END //
DELIMITER ;

-- call deleteLanguageByMovieSpecific(5, 8);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateGenreByMovie
	(IN pIdGeneroXPelicula BIGINT, pIdGenero BIGINT)
	
	BEGIN
	
		UPDATE GenerosXpelicula SET idGenero = pIdGenero WHERE idGeneroXpelicula = pIdGeneroXPelicula;
		
	END //
DELIMITER ;

-- call updateGenreByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------


DELIMITER //
CREATE PROCEDURE addCategoryByMovie
	(IN pIdPelicula BIGINT, IN pIdCategoria BIGINT)
	
	BEGIN
	
		INSERT INTO CategoriasXpelicula (idPelicula, idCategoria) VALUES (pIdPelicula, pIdCategoria);
		
	END //
DELIMITER ;

-- call addGenreByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteCategoryByMovie
	(IN pIdPelicula BIGINT)
	
	BEGIN
	
		DELETE FROM CategoriasXpelicula WHERE idPelicula = pIdPelicula;
		
	END //
DELIMITER ;

-- call deleteCategoryByMovie(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateCategoryByMovie
	(IN pIdCategoriaXPelicula BIGINT, pIdCategoria BIGINT)
	
	BEGIN
	
		UPDATE CategoriasXpelicula SET idCategoria = pIdCategoria WHERE idCategoriaXpelicula = pIdCategoriaXPelicula;
		
	END //
DELIMITER ;

-- call updateCategoryByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addLanguageByMovie
	(IN pIdIdioma BIGINT, IN pIdPelicula BIGINT)
	
	BEGIN
	
		INSERT INTO IdiomasXpelicula (idIdioma, idPelicula) VALUES (pIdIdioma, pIdPelicula);
		
	END //
DELIMITER ;

-- call addLanguageByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteLanguageByMovie
	(IN pIdPelicula BIGINT)
	
	BEGIN
	
		DELETE FROM IdiomasXpelicula WHERE idPelicula = pIdPelicula;
		
	END //
DELIMITER ;

-- call deleteLanguageByMovie(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateLanguageByMovie
	(IN pIdIdiomaXPelicula BIGINT, pIdIdioma BIGINT)
	
	BEGIN
	
		UPDATE IdiomasXpelicula SET idIdioma = pIdIdioma WHERE idIdiomaXpelicula = pIdIdiomaXPelicula;
		
	END //
DELIMITER ;

-- call updateLanguageByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addActorsByMovie
	(IN pIdPelicula BIGINT, IN pIdActor BIGINT)
	
	BEGIN
	
		INSERT INTO ActoresXpelicula (idPelicula, idActor) VALUES (pIdPelicula, pIdActor);
		
	END //
DELIMITER ;

-- call addActorsByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteActorsByMovie
	(IN pIdPelicula BIGINT)
	
	BEGIN
	
		DELETE FROM ActoresXpelicula WHERE idPelicula = pIdPelicula;
		
	END //
DELIMITER ;

-- call deleteActorsByMovie(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateActorsByMovie
	(IN pIdActorXPelicula BIGINT, pIdActor BIGINT)
	
	BEGIN
	
		UPDATE ActoresXpelicula SET idActor = pIdActor WHERE idActorXpelicula = pIdActorXPelicula;
		
	END //
DELIMITER ;

-- call updateActorsByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addSubtitlesByMovie
	(IN pIdPelicula BIGINT, IN pIdSubtitulo BIGINT)
	
	BEGIN
	
		INSERT INTO SubtitulosXpelicula (idPelicula, idSubtitulo) VALUES (pIdPelicula, pIdSubtitulo);
		
	END //
DELIMITER ;

-- call addSubtitlesByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteSubtitlesByMovie
	(IN pIdPelicula BIGINT)
	
	BEGIN
	
		DELETE FROM SubtitulosXpelicula WHERE idPelicula = pIdPelicula;
		
	END //
DELIMITER ;

-- call deleteSubtitlesByMovie(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateSubtitlesByMovie
	(IN pIdSubtituloXPelicula BIGINT, pIdSubtitulo BIGINT)
	
	BEGIN
	
		UPDATE SubtitulosXpelicula SET idSubtitulo = pIdSubtitulo WHERE idSubXpelicula = pIdSubtituloXPelicula;
		
	END //
DELIMITER ;

-- call updateSubtitlesByMovie(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addMovie
	(IN pAno INT, IN pPelicula VARCHAR(200), IN pTrama VARCHAR(1000), IN pPrecio DECIMAL, IN pFechaIngreso DATETIME, pLinkImagen VARCHAR(500))

	BEGIN
		DECLARE _CurrentDateTime DATETIME;
		SET _CurrentDateTime = now();
		
		INSERT INTO Peliculas (ano, pelicula, trama, precio, fechaIngreso, linkImagen) 
		VALUES (pAno, pPelicula, pTrama, pPrecio, _CurrentDateTime, pLinkImagen);
	END //
DELIMITER ;

-- call addMovie(2000, "Lord of the Rings", "This is a movies based on Frodo's adventures", 1000, now(), "http://vignette4.wikia.nocookie.net/lotr/images/3/3a/The_Lord_of_the_Rings_Characters.jpg/revision/latest?cb=20150328111911");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteMovie
	(IN pIdPelicula BIGINT)
	
	BEGIN

		call deleteGenreByMovie(pIdPelicula);
		call deleteActorsByMovie(pIdPelicula);
		call deleteSubtitlesByMovie(pIdPelicula);
		call deleteCategoryByMovie(pIdPelicula);
		call deleteLanguageByMovie(pIdPelicula);
		DELETE FROM Peliculas WHERE idPelicula = pIdPelicula;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateMovie
	(IN pIdPelicula BIGINT, 
		IN pPelicula VARCHAR(200), 
		IN pAno INT, 
		IN pTrama VARCHAR(1000),
		IN pPrecio DECIMAL,
		IN pLinkImagen VARCHAR(500))
	
	BEGIN
	
		UPDATE Peliculas SET
			pelicula = pPelicula,
			ano = pAno,
			trama = pTrama,
			precio = pPrecio,
			linkImagen = pLinkImagen 
		WHERE idPelicula = pIdPelicula;
		
	END //
DELIMITER ;

-- call updateMovie(3, "DEADPOOL Updated", "2000", "Trama Updated", "40000", "https://pmcdeadline2.files.wordpress.com/2016/02/deadpool-teaser.jpg");
------------------------------------------------------------------------
------------------------------------------------------------------------


DELIMITER //
CREATE PROCEDURE addSale
	(IN pDescripcion VARCHAR(500))
	
	BEGIN
	
		INSERT INTO Ventas (fecha, descripcion) VALUES (now(), pDescripcion);
		
	END //
DELIMITER ;

-- call addSale("2 peliculas de Cars");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteSale
	(IN pIdVenta BIGINT)
	
	BEGIN
	
		DELETE FROM Ventas WHERE idVenta = pIdVenta;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateSale
	(IN pIdVenta BIGINT, pDescripcion VARCHAR(500))
	
	BEGIN
	
		UPDATE Ventas SET descripcion = pDescripcion WHERE idVenta = pIdVenta;
		
	END //
DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addMoviesBySale
	(IN pIdPelicula BIGINT, IN pIdVenta BIGINT)
	
	BEGIN
	
		INSERT INTO PeliculasXventa (idPelicula, idVenta) VALUES (pIdPelicula, pIdVenta);
		
	END //
DELIMITER ;

-- call addMoviesBySale(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteMoviesBySale
	(IN pIdPeliculaXventa BIGINT)
	
	BEGIN
	
		DELETE FROM PeliculasXventa WHERE idPelliculaXventa = pIdPeliculaXventa;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateMoviesBySale
	(IN pIdPeliculaXventa BIGINT, IN pPelicula BIGINT)
	
	BEGIN
	
		UPDATE PeliculasXventa SET pelicula = pPelicula WHERE idPelliculaXventa = pIdPeliculaXventa;
		
	END //
DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addSuggestion
	(IN pSugerencia VARCHAR(1000), IN pIdUsuario BIGINT)
	
	BEGIN
	
		INSERT INTO Sugerencias (sugerencia, idUsuario, fecha) VALUES (pSugerencia, pIdUsuario, now());
		
	END //
DELIMITER ;

-- call addSuggestion("Seria util si se habilita un espacio para ingresar el nombre de la persona que va a recoger la pelicula", 1);
------------------------------------------------------------------------
------------------------------------------------------------------------
DELIMITER //
CREATE PROCEDURE addSuggestionsByUser
	(IN pIdUsuario BIGINT, IN pIdSugerencia BIGINT)
	
	BEGIN
	
		INSERT INTO SugerenciasXusuario (idUsuario, idSugerencia) VALUES (pIdUsuario, pIdSugerencia);
		
	END //
DELIMITER ;

-- call addSuggestionsByUser(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addUser
	(IN pToken VARCHAR(300), IN pIdRolXusuario BIGINT, IN pCorreo VARCHAR(75), IN pTelefono VARCHAR(50))
	
	BEGIN
	
		INSERT INTO Usuarios (token, idRolXusuario, fechaIngreso, correo, telefono) VALUES (pToken, pIdRolXusuario, now(), pCorreo, pTelefono);
		
	END //
DELIMITER ;

-- call addUser(null, 1, "jean.cms@hotmail.es", "88888888");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteUser
	(IN pIdUser BIGINT)
	
	BEGIN
	
		DELETE FROM Usuarios WHERE idUsuario = pIdUser;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateUser
	(IN pIdUsuario BIGINT, pToken VARCHAR(300), IN pIdRolXusuario BIGINT, IN pCorreo VARCHAR(75), IN pTelefono VARCHAR(50))
	
	BEGIN
	
		UPDATE PeliculasXventa SET pelicula = pPelicula WHERE idUsuario = pIdUsuario;
		
	END //
DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE rolesByUser
	(IN pIdUsuario BIGINT, IN pIdRol BIGINT)
	
	BEGIN
	
		INSERT INTO RolesXusuario (isUsuario, idRol) VALUES (pIdUsuario, pIdRol);
		
	END //
DELIMITER ;

-- call rolesByUser(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteRolesByUser
	(IN pIdRolXusuario BIGINT)
	
	BEGIN
	
		DELETE FROM RolesXusuario WHERE idRolXusuario = pIdRolXusuario;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateRolesByUser
	(IN pIdRolXusuario BIGINT, IN pIdRol BIGINT)
	
	BEGIN
	
		UPDATE RolesXusuario SET idRol = pIdRol WHERE idRolXusuario = pIdRolXusuario;
		
	END //
DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addRole
	(IN pRole VARCHAR(75))
	
	BEGIN
	
		INSERT INTO Roles (rol) VALUES (pRole);
		
	END //
DELIMITER ;

-- call addRole("Admin");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteRole
	(IN pIdRol BIGINT)
	
	BEGIN
	
		DELETE FROM Roles WHERE idRol = pIdRol;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateRole
	(IN pIdRol BIGINT, pRole VARCHAR(75))
	
	BEGIN
	
		UPDATE Roles SET rol = pRole WHERE idRol = pIdRol;
		
	END //
DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addStore
	(IN pLocal VARCHAR(100), IN pUbicacion VARCHAR(500), IN pImagen LONGBLOB, IN pTelefono VARCHAR(50), IN pCorreo VARCHAR(50))
	
	BEGIN
	
		INSERT INTO Locales (local, ubicacion, imagen, telefono, correo) VALUES (pLocal, pUbicacion, pImagen, pTelefono, pCorreo);
		
	END //
DELIMITER ;

-- call addStore("Video Extrem Coro", "Del parque de coronado 100 mts este y 25 mts sur", null, "88888888", "video_extrem@hotmail.com");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteStore
	(IN pIdLocal BIGINT)
	
	BEGIN
	
		DELETE FROM Locales WHERE idLocal = pIdLocal;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateStore
	(IN pIdLocal BIGINT, pLocal VARCHAR(100), IN pUbicacion VARCHAR(500), IN pImagen LONGBLOB, IN pTelefono VARCHAR(50), IN pCorreo VARCHAR(50))
	
	BEGIN
	
		UPDATE Locales SET local = pLocal, ubicacion = pUbicacion, imagen = pImagen, telefono = pTelefono, correo = pCorreo WHERE idLocal = pIdLocal;
		
	END //
DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addDiscount
	(IN pPromocion VARCHAR(200), IN pDescripcion VARCHAR(500), IN pImagen LONGBLOB)
	
	BEGIN
	
		INSERT INTO Promociones (promocion, descripcion, imagen) VALUES (pPromocion, pDescripcion, pImagen);
		
	END //
DELIMITER ;

-- call addDiscount("Peliculas de accion 2x1", "Descuento", null);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteDiscount
	(IN pIdPromocion BIGINT)
	
	BEGIN
	
		DELETE FROM Promociones WHERE idPromocion = pIdPromocion;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateDiscount
	(IN pIdLocal BIGINT, pLocal VARCHAR(100), IN pUbicacion VARCHAR(500), IN pImagen LONGBLOB, IN pTelefono VARCHAR(50), IN pCorreo VARCHAR(50))
	
	BEGIN
	
		UPDATE Locales SET local = pLocal, ubicacion = pUbicacion, imagen = pImagen, telefono = pTelefono, correo = pCorreo WHERE idLocal = pIdLocal;
		
	END //
DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------