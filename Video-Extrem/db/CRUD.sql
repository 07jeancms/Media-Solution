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
		
			DELETE FROM GenerosXpelicula WHERE idGenero = pIdGenero;
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
			
			DELETE FROM CategoriasXpelicula WHERE idCategoria = pIdCategoria; 
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

			DELETE FROM IdiomasXpelicula WHERE idIdioma = pIdLanguage;
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

			DELETE FROM ActoresXpelicula WHERE idActor = pIdActor;
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

			DELETE FROM SubtitulosXpelicula WHERE idSubtitulo = pIdSubtitulo;
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
CREATE PROCEDURE addGenreByMovieNoID
	(IN pGenero VARCHAR(100))
	
	BEGIN
	
		DECLARE _idGenre BIGINT;
		DECLARE _idMovie BIGINT;
		
		SET _idGenre = (SELECT idGenero from Generos where genero = pGenero);
		SET _idMovie = (select (auto_increment-1) from information_schema.tables where table_name = 'Peliculas' and table_schema = 'video_extrem');
		
		INSERT INTO GenerosXpelicula (idPelicula, idGenero) VALUES (_idMovie, _idGenre);
		
	END //
DELIMITER ;

-- call addGenreByMovieNoID("Terror")

------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addLanguageByMovieNoID
	(IN pIdioma VARCHAR(100))
	
	BEGIN
	
		DECLARE _idLanguage BIGINT;
		DECLARE _idMovie BIGINT;
		
		SET _idLanguage = (SELECT idIdioma from Idiomas where idioma = pIdioma);
		SET _idMovie = (select (auto_increment-1) from information_schema.tables where table_name = 'Peliculas' and table_schema = 'video_extrem');
		
		INSERT INTO IdiomasXpelicula (idIdioma, idPelicula) VALUES (_idLanguage, _idMovie);
		
	END //
DELIMITER ;

-- call addLanguageByMovieNoID("Patua");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addActorByMovieNoID
	(IN pActor VARCHAR(100))
	
	BEGIN
	
		DECLARE _idActor BIGINT;
		DECLARE _idMovie BIGINT;
		
		SET _idActor = (SELECT idActor from Actores where actor = pActor);
		SET _idMovie = (select (auto_increment-1) from information_schema.tables where table_name = 'Peliculas' and table_schema = 'video_extrem');
		
		INSERT INTO ActoresXpelicula (idPelicula, idActor) VALUES (_idMovie, _idActor);
		
	END //
DELIMITER ;

-- call addActorByMovieNoID("El Negro de Whatsapp");

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
	(IN pAno INT, IN pPelicula VARCHAR(200), IN pTrama VARCHAR(1000), IN pPrecio DECIMAL, IN  DATETIME, pLinkImagen VARCHAR(500), pCodigo VARCHAR(50))

	BEGIN
		DECLARE _CurrentDateTime DATETIME;
		SET _CurrentDateTime = now();
		
		INSERT INTO Peliculas (ano, pelicula, trama, precio, fechaIngreso, linkImagen, codigo) 
		VALUES (pAno, pPelicula, pTrama, pPrecio, _CurrentDateTime, pLinkImagen, pCodigo);
	END //
DELIMITER ;

-- call addMovie(2000, "Lord of the Rings", "This is a movies based on Frodo's adventures", 1000, now(), "http://vignette4.wikia.nocookie.net/lotr/images/3/3a/The_Lord_of_the_Rings_Characters.jpg/revision/latest?cb=20150328111911");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addNewMovie
	(IN pAno INT, IN pPelicula VARCHAR(200), IN pTrama VARCHAR(1000), IN pPrecio DECIMAL, pLinkImagen VARCHAR(500), In pTipoPelicula INT)

	BEGIN
		DECLARE _CurrentDateTime DATETIME;
		DECLARE _Code VARCHAR(50);
		SET _CurrentDateTime = now();
		IF pTipoPelicula == 0 then
			SET _Code = (select (codigo + 1) from Peliculas order by CAST(codigo AS SIGNED) DESC LIMIT 1);
			
			INSERT INTO Peliculas (ano, pelicula, trama, precio, fechaIngreso, linkImagen, codigo) 
			VALUES (pAno, pPelicula, pTrama, pPrecio, _CurrentDateTime, pLinkImagen, _Code);
		END IF;

		IF pTipoPelicula == 1 then
			SET _Code = (SELECT max(REPLACE(codigo,'BR-','')) + 1 as 'Codigo' FROM Peliculas where codigo Like '%BR-%' order by CAST(codigo AS SIGNED));
			
			INSERT INTO Peliculas (ano, pelicula, trama, precio, fechaIngreso, linkImagen, codigo) 
			VALUES (pAno, pPelicula, pTrama, pPrecio, _CurrentDateTime, pLinkImagen, CONCAT("BR-",_Code));
		END IF;

		IF pTipoPelicula == 2 then
			SET _Code = (SELECT max(REPLACE(codigo,'3D-','')) + 1 as 'Codigo' FROM Peliculas where codigo Like '%3D-%' order by CAST(codigo AS SIGNED));
			
			INSERT INTO Peliculas (ano, pelicula, trama, precio, fechaIngreso, linkImagen, codigo) 
			VALUES (pAno, pPelicula, pTrama, pPrecio, _CurrentDateTime, pLinkImagen, CONCAT("3D-",_Code));
		END IF;
	END //
DELIMITER 
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
		DELETE FROM ReservacionMaestra WHERE ReservacionMaestra.idPelicula = pIdPelicula;
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

-- call addSuggestion("Seria util si se habilita un espacio para ingresar el nombre de la persona que va a recoger la pelicula", 9);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addSuggestionByStore
	(IN pStore VARCHAR(100))
	
	BEGIN
		
		DECLARE _idSuggestion BIGINT;
		DECLARE _idStore BIGINT;
		
		SET _idSuggestion = (select (auto_increment-1) from information_schema.tables where table_name = 'Sugerencias' and table_schema = 'video_extrem');
		SET _idStore = (SELECT idLocal from Locales where local = pStore);
	
		INSERT INTO SugerenciasXlocal (idSugerencia, idLocal) VALUES (_idSuggestion, _idStore);
		
	END //
DELIMITER ;

-- call addSuggestionByStore("Coronado");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteSuggestion
	(IN pIdSuggestion BIGINT)
	
	BEGIN
		
		DELETE FROM SugerenciasXusuario WHERE idSugerencia = pIdSuggestion;
		DELETE FROM SugerenciasXlocal WHERE idSugerencia = pIdSuggestion;
		DELETE FROM Sugerencias WHERE idSugerencia = pIdSuggestion;
		
	END //
DELIMITER ;

-- call deleteSuggestion(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addSuggestionsByUser
	(IN pIdUsuario BIGINT)
	
	BEGIN
		
		DECLARE _idSuggestion BIGINT;
		
		SET _idSuggestion = (select (auto_increment-1) from information_schema.tables where table_name = 'Sugerencias' and table_schema = 'video_extrem');
	
		INSERT INTO SugerenciasXusuario (idUsuario, idSugerencia) VALUES (pIdUsuario, _idSuggestion);
		
	END //
DELIMITER ;

-- call addSuggestionsByUser(1, 1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addUser
	(IN pToken VARCHAR(300),IN pUserName VARCHAR(50), IN pCorreo VARCHAR(30), IN pTelefono VARCHAR(15), IN pPassword VARCHAR(45))
	
	BEGIN
	
		INSERT INTO Usuarios (token, fechaIngreso, userName, correo, telefono, password) VALUES (pToken, now(), pUserName, pCorreo, pTelefono, SHA1(pPassword));
		
	END //
DELIMITER ;

-- call addUser(null, '07jeancms', "jean.cms@hotmail.es", "88888888", "123");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addRoleByUserNoRoleID
	(IN pRole VARCHAR(75))
	
	BEGIN
	
		DECLARE _idUser BIGINT;
		DECLARE _idRole BIGINT;
		
		SET _idUser = (select (auto_increment-1) from information_schema.tables where table_name = 'Usuarios' and table_schema = 'video_extrem');
		SET _idRole = (select idRol from Roles where rol = pRole);
		
		INSERT INTO RolesXusuario (idUsuario, idRol) VALUES (_idUser, _idRole);
		
	END //
DELIMITER ;

-- call addRoleByUserNoRoleID(1, 'Administrador');
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addRoleByUser
	(IN pUserId BIGINT, IN pRole VARCHAR(75))
	
	BEGIN
	
		DECLARE _idRole BIGINT;
		
		SET _idRole = (select idRol from Roles where rol = pRole);
		
		INSERT INTO RolesXusuario (idUsuario, idRol) VALUES (pUserId, _idRole);
		
	END //
DELIMITER ;

------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteUser
	(IN pIdUser BIGINT)
	
	BEGIN
	
		DELETE FROM RolesXusuario WHERE idUsuario = pIdUser;
		DELETE FROM Usuarios WHERE idUsuario = pIdUser;
		
	END //
DELIMITER ;

-- call deleteSale(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateUser
	(IN pIdUsuario BIGINT, IN pUserName VARCHAR(50), IN pEmail VARCHAR(75), IN pPhone VARCHAR(15), IN pPassword VARCHAR(45))
	
	BEGIN
	
		UPDATE Usuarios SET userName = pUserName, 
							correo = pEmail,
							telefono = pPhone,
							password = SHA1(pPassword)
							WHERE idUsuario = pIdUsuario;
							
	END //
DELIMITER ;
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
CREATE PROCEDURE deleteRoleByUser
	(IN pUserId BIGINT, IN pRole VARCHAR(75))
	
	BEGIN
	
		DECLARE _idRole BIGINT;
		
		SET _idRole = (select idRol from Roles where rol = pRole);
	
		DELETE FROM RolesXusuario WHERE idUsuario = pUserId and idRol = _idRole;
		
	END //
DELIMITER ;

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
	(IN pLocal VARCHAR(100), IN pUbicacion VARCHAR(500), IN pImagen VARCHAR(500), IN pTelefono VARCHAR(50), IN pCorreo VARCHAR(50))
	
	BEGIN
	
		INSERT INTO Locales (local, ubicacion, link, telefono, correo) VALUES (pLocal, pUbicacion, pImagen, pTelefono, pCorreo);
		
	END //
DELIMITER ;

-- call addStore("Video Extrem Coro", "Del parque de coronado 100 mts este y 25 mts sur", "www.", "88888888", "video_extrem@hotmail.com");
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteStore
	(IN pIdLocal BIGINT)
	
	BEGIN
	
		DELETE FROM SugerenciasXlocal WHERE idLocal = pIdLocal;
		DELETE FROM Locales WHERE idLocal = pIdLocal;
		
	END //
DELIMITER ;

-- call deleteStore(1);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE updateStore
	(IN pIdLocal BIGINT, pLocal VARCHAR(100), IN pUbicacion VARCHAR(500), IN pImagen VARCHAR(500), IN pTelefono VARCHAR(50), IN pCorreo VARCHAR(50))
	
	BEGIN
	
		UPDATE Locales SET local = pLocal, ubicacion = pUbicacion, link = pImagen, telefono = pTelefono, correo = pCorreo WHERE idLocal = pIdLocal;
		
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

DELIMITER //

create procedure validateAuthentication
	(IN pUserName VARCHAR(50), IN pPassword VARCHAR(45))
	
	BEGIN

	IF EXISTS (select * from Usuarios where( userName = pUserName AND password = SHA1(pPassword))) THEN
		SELECT 1;
	ELSE 
		SELECT -1;
	END IF;

	END //

DELIMITER ;

-- call updateSale(1, nueva descripcion);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //

create procedure inserTest
	(IN pTest VARCHAR(45), IN pNum1 INT, IN pNum2 INT, IN pNum3 INT)
	
	BEGIN
	
		INSERT INTO Test (test, num, num2, num3) VALUES (pTest, pNum1, pNum2, pNum3);

	END //

DELIMITER ;

-- call inserTest("test", 1,2,3);
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE addBooking
	(IN pDescripcion VARCHAR(400))

	BEGIN
		DECLARE _CurrentDateTime DATETIME;
		SET _CurrentDateTime = now();
		
		INSERT INTO Reservaciones(descripcion, fecha) 
		VALUES (pDescripcion, _CurrentDateTime);
	END //
DELIMITER ;

-- call addBooking("test");

--    _____ _____  _____  _____ ____  _    _ _   _ _______ 
--   |  __ \_   _|/ ____|/ ____/ __ \| |  | | \ | |__   __|
--   | |  | || | | (___ | |   | |  | | |  | |  \| |  | |   
--   | |  | || |  \___ \| |   | |  | | |  | | . ` |  | |   
--   | |__| || |_ ____) | |___| |__| | |__| | |\  |  | |   
--   |_____/_____|_____/ \_____\____/ \____/|_| \_|  |_|   
--                                                                                                             

DELIMITER //

create procedure createDiscount
	(IN pLink VARCHAR(500), IN pStatus INT)
	
	BEGIN
		
		INSERT INTO Promociones (link, estado) VALUES (pLink, pStatus);
		
	END //
	
DELIMITER ;

------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE addBookingMaster
	(IN pidLocal INT, IN pidReservacion INT, IN pidPelicula INT, IN pidUsuario INT)

	BEGIN		
		INSERT INTO ReservacionMaestra(idLocal, idReservacion, idPelicula, idUsuario) 
		VALUES (pidLocal, pidReservacion, pidPelicula, pidUsuario);
	END //
DELIMITER ;

-- call addBookingMaster(2,1,28,9);

create procedure readActiveDiscounts
	()
	
	BEGIN
		
		SELECT * FROM Promociones WHERE estado = 1;
		
	END //
	
DELIMITER ;
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //

create procedure updateDiscount
	(IN pIdDiscount BIGINT, IN pLink VARCHAR(500), IN pStatus INT)
	
	BEGIN
		
		UPDATE Promociones SET link = pLink, estado = pStatus WHERE idPromocion = pIdDiscount;
		
	END //
	
DELIMITER ;
------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //
CREATE PROCEDURE deleteMasterReservation
	(IN pIdMasterReservation BIGINT)
	
	BEGIN
	
		DELETE FROM ReservacionMaestra WHERE idReservacionMaestra = pIdMasterReservation;
		
	END //
DELIMITER ;

-- call deleteMasterReservation(14);

create procedure deleteDiscount
	(IN pIdDiscount BIGINT)
	
	BEGIN
	
		DELETE FROM Promociones WHERE idPromocion = pIdDiscount;
		
	END //
	
DELIMITER ;
------------------------------------------------------------------------
------------------------------------------------------------------------


--    _____ _____  _____  _____ ____  _    _ _   _ _______ ______     _______          _____   ____  _    _  _____ ______ _      
--   |  __ \_   _|/ ____|/ ____/ __ \| |  | | \ | |__   __|  _ \ \   / / ____|   /\   |  __ \ / __ \| |  | |/ ____|  ____| |     
--   | |  | || | | (___ | |   | |  | | |  | |  \| |  | |  | |_) \ \_/ / |       /  \  | |__) | |  | | |  | | (___ | |__  | |     
--   | |  | || |  \___ \| |   | |  | | |  | | . ` |  | |  |  _ < \   /| |      / /\ \ |  _  /| |  | | |  | |\___ \|  __| | |     
--   | |__| || |_ ____) | |___| |__| | |__| | |\  |  | |  | |_) | | | | |____ / ____ \| | \ \| |__| | |__| |____) | |____| |____ 
--   |_____/_____|_____/ \_____\____/ \____/|_| \_|  |_|  |____/  |_|  \_____/_/    \_\_|  \_\\____/ \____/|_____/|______|______|
--                                                   ______       ______                                                         
--                                                  |______|     |______|                                                        

DELIMITER //

create procedure createDiscountByCarousel
	(IN pCarouselName VARCHAR(45))
	
	BEGIN
		
		DECLARE _idPromocion BIGINT;
		DECLARE _idTipoCarrusel BIGINT;
		
		SET _idPromocion = (SELECT (auto_increment-1) from information_schema.tables where table_name = 'Promociones' and table_schema = 'video_extrem');
		SET _idTipoCarrusel = (SELECT idTipoCarrusel from TipoCarrusel where nombre = pCarouselName);
		
		INSERT INTO PromocionesXcarrusel (idPromocion, idTipoCarrusel) VALUES (_idPromocion, _idTipoCarrusel);
		
	END //
	
DELIMITER ;

------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //

CREATE PROCEDURE deleteReservation
	(IN pIdReservation BIGINT)
	
	BEGIN
	
		DELETE FROM Reservaciones WHERE idReservacion = pIdReservation;
		
	END //
DELIMITER ;

-- call deleteReservation(14);
------------------------------------------------------------------------
------------------------------------------------------------------------

create procedure deleteDiscountXcarouselByCarouselName
	(IN pIdDiscount BIGINT, IN pCarouselName VARCHAR(45))
	
	BEGIN
	
		DECLARE _idCarouselType BIGINT;
		
		SET _idCarouselType = (select idTipoCarrusel from TipoCarrusel where nombre = pCarouselName);
		
		DELETE FROM PromocionesXcarrusel WHERE idTipoCarrusel = _idCarouselType and idPromocion = pIdDiscount;
		
	END //
	
DELIMITER ;


--     _____          _____   ____  _    _  _____ ______ _     _________     _______  ______ 
--    / ____|   /\   |  __ \ / __ \| |  | |/ ____|  ____| |   |__   __\ \   / /  __ \|  ____|
--   | |       /  \  | |__) | |  | | |  | | (___ | |__  | |      | |   \ \_/ /| |__) | |__   
--   | |      / /\ \ |  _  /| |  | | |  | |\___ \|  __| | |      | |    \   / |  ___/|  __|  
--   | |____ / ____ \| | \ \| |__| | |__| |____) | |____| |____  | |     | |  | |    | |____ 
--    \_____/_/    \_\_|  \_\\____/ \____/|_____/|______|______| |_|     |_|  |_|    |______|
--                                                           ______                          
--                                                          |______|                         

DELIMITER //

create procedure createCarouselType
	(IN pType INT, IN pName VARCHAR(45))
	
	BEGIN
		
		INSERT INTO TipoCarrusel (tipo, nombre) VALUES (pType, pName);
		
	END //
	
DELIMITER ;

------------------------------------------------------------------------
------------------------------------------------------------------------

DELIMITER //

create procedure deleteCarouselType
	(IN pIdCarousel BIGINT)
	
	BEGIN
		
		DELETE FROM TipoCarrusel WHERE idTipoCarrusel = pIdCarousel;
		
	END //
	
DELIMITER ;
