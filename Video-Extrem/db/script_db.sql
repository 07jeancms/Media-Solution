SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema video_extrem
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema video_extrem
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `video_extrem` DEFAULT CHARACTER SET utf8 ;
USE `video_extrem` ;

-- -----------------------------------------------------
-- Table `video_extrem`.`Peliculas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Peliculas` (
  `idPelicula` BIGINT NOT NULL AUTO_INCREMENT,
  `ano` INT NULL,
  `pelicula` VARCHAR(200) NOT NULL,
  `idActorXpelicula` BIGINT NULL,
  `idGeneroXpelicula` BIGINT NULL,
  `idIdiomaXpelicula` BIGINT NULL,
  `trama` VARCHAR(1000) NULL,
  `idCategoriaXpelicula` BIGINT NULL,
  `idSubXpelicula` BIGINT NULL,
  `precio` DECIMAL NOT NULL,
  `fechaIngreso` DATETIME NOT NULL,
  `linkImagen` VARCHAR(500) NULL,
  PRIMARY KEY (`idPelicula`),
  UNIQUE INDEX `idPelicula_UNIQUE` (`idPelicula` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Generos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Generos` (
  `idGenero` BIGINT NOT NULL AUTO_INCREMENT,
  `genero` VARCHAR(100) NOT NULL,
  `descripcion` VARCHAR(500) NULL,
  PRIMARY KEY (`idGenero`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`GenerosXpelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`GenerosXpelicula` (
  `idGeneroXpelicula` BIGINT NOT NULL AUTO_INCREMENT,
  `idPelicula` BIGINT NOT NULL,
  `idGenero` BIGINT NOT NULL,
  PRIMARY KEY (`idGeneroXpelicula`, `idPelicula`, `idGenero`),
  INDEX `fk_GenerosXpelicula_Peliculas_idx` (`idPelicula` ASC),
  INDEX `fk_GenerosXpelicula_Generos1_idx` (`idGenero` ASC),
  CONSTRAINT `fk_GenerosXpelicula_Peliculas`
    FOREIGN KEY (`idPelicula`)
    REFERENCES `video_extrem`.`Peliculas` (`idPelicula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_GenerosXpelicula_Generos1`
    FOREIGN KEY (`idGenero`)
    REFERENCES `video_extrem`.`Generos` (`idGenero`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Categorias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Categorias` (
  `idCategoria` BIGINT NOT NULL AUTO_INCREMENT,
  `categoria` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idCategoria`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`CategoriasXpelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`CategoriasXpelicula` (
  `idCategoriaXpelicula` BIGINT NOT NULL AUTO_INCREMENT,
  `idPelicula` BIGINT NOT NULL,
  `idCategoria` BIGINT NOT NULL,
  PRIMARY KEY (`idCategoriaXpelicula`, `idPelicula`, `idCategoria`),
  INDEX `fk_CategoriasXpelicula_Peliculas1_idx` (`idPelicula` ASC),
  INDEX `fk_CategoriasXpelicula_Categorias1_idx` (`idCategoria` ASC),
  CONSTRAINT `fk_CategoriasXpelicula_Peliculas1`
    FOREIGN KEY (`idPelicula`)
    REFERENCES `video_extrem`.`Peliculas` (`idPelicula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_CategoriasXpelicula_Categorias1`
    FOREIGN KEY (`idCategoria`)
    REFERENCES `video_extrem`.`Categorias` (`idCategoria`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Idiomas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Idiomas` (
  `idIdioma` BIGINT NOT NULL AUTO_INCREMENT,
  `idioma` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idIdioma`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`IdiomasXpelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`IdiomasXpelicula` (
  `idIdiomaXpelicula` BIGINT NOT NULL AUTO_INCREMENT,
  `idIdioma` BIGINT NOT NULL,
  `idPelicula` BIGINT NOT NULL,
  PRIMARY KEY (`idIdiomaXpelicula`, `idIdioma`, `idPelicula`),
  INDEX `fk_IdiomasXpelicula_Idiomas1_idx` (`idIdioma` ASC),
  INDEX `fk_IdiomasXpelicula_Peliculas1_idx` (`idPelicula` ASC),
  CONSTRAINT `fk_IdiomasXpelicula_Idiomas1`
    FOREIGN KEY (`idIdioma`)
    REFERENCES `video_extrem`.`Idiomas` (`idIdioma`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_IdiomasXpelicula_Peliculas1`
    FOREIGN KEY (`idPelicula`)
    REFERENCES `video_extrem`.`Peliculas` (`idPelicula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Actores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Actores` (
  `idActor` BIGINT NOT NULL AUTO_INCREMENT,
  `actor` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idActor`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`ActoresXpelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`ActoresXpelicula` (
  `idActoreXpelicula` BIGINT NOT NULL AUTO_INCREMENT,
  `idPelicula` BIGINT NOT NULL,
  `idActor` BIGINT NOT NULL,
  PRIMARY KEY (`idActoreXpelicula`, `idPelicula`, `idActor`),
  INDEX `fk_ActoresXpelicula_Peliculas1_idx` (`idPelicula` ASC),
  INDEX `fk_ActoresXpelicula_Actores1_idx` (`idActor` ASC),
  CONSTRAINT `fk_ActoresXpelicula_Peliculas1`
    FOREIGN KEY (`idPelicula`)
    REFERENCES `video_extrem`.`Peliculas` (`idPelicula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ActoresXpelicula_Actores1`
    FOREIGN KEY (`idActor`)
    REFERENCES `video_extrem`.`Actores` (`idActor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Subtitulos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Subtitulos` (
  `idSubtitulo` BIGINT NOT NULL AUTO_INCREMENT,
  `subtitulo` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`idSubtitulo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`SubtitulosXpelicula`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`SubtitulosXpelicula` (
  `idSubtituloXpelicula` BIGINT NOT NULL AUTO_INCREMENT,
  `idPelicula` BIGINT NOT NULL,
  `idSubtitulo` BIGINT NOT NULL,
  PRIMARY KEY (`idSubtituloXpelicula`, `idPelicula`, `idSubtitulo`),
  INDEX `fk_SubtitulosXpelicula_Peliculas1_idx` (`idPelicula` ASC),
  INDEX `fk_SubtitulosXpelicula_Subtitulos1_idx` (`idSubtitulo` ASC),
  CONSTRAINT `fk_SubtitulosXpelicula_Peliculas1`
    FOREIGN KEY (`idPelicula`)
    REFERENCES `video_extrem`.`Peliculas` (`idPelicula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SubtitulosXpelicula_Subtitulos1`
    FOREIGN KEY (`idSubtitulo`)
    REFERENCES `video_extrem`.`Subtitulos` (`idSubtitulo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Ventas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Ventas` (
  `idVenta` BIGINT NOT NULL AUTO_INCREMENT,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idVenta`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`PeliculasXventa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`PeliculasXventa` (
  `idPelliculaXventa` BIGINT NOT NULL AUTO_INCREMENT,
  `idPelicula` BIGINT NOT NULL,
  `idVenta` BIGINT NOT NULL,
  PRIMARY KEY (`idPelliculaXventa`, `idPelicula`, `idVenta`),
  INDEX `fk_PeliculasXventa_Peliculas1_idx` (`idPelicula` ASC),
  INDEX `fk_PeliculasXventa_Ventas1_idx` (`idVenta` ASC),
  CONSTRAINT `fk_PeliculasXventa_Peliculas1`
    FOREIGN KEY (`idPelicula`)
    REFERENCES `video_extrem`.`Peliculas` (`idPelicula`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PeliculasXventa_Ventas1`
    FOREIGN KEY (`idVenta`)
    REFERENCES `video_extrem`.`Ventas` (`idVenta`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Sugerencias`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Sugerencias` (
  `idSugerencia` BIGINT NOT NULL AUTO_INCREMENT,
  `sugerencia` VARCHAR(1000) NOT NULL,
  `idUsuario` BIGINT NOT NULL,
  `fecha` DATETIME NOT NULL,
  PRIMARY KEY (`idSugerencia`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Usuarios` (
  `idUsuario` BIGINT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR(300) NULL,
  `idRolXusuario` BIGINT NOT NULL,
  `fechIngreso` DATETIME NOT NULL,
  `correo` VARCHAR(75) NOT NULL,
  `telefono` VARCHAR(50) NOT NULL,
  PRIMARY KEY (`idUsuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Roles`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Roles` (
  `idRol` BIGINT NOT NULL AUTO_INCREMENT,
  `rol` VARCHAR(75) NOT NULL,
  PRIMARY KEY (`idRol`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`RolesXusuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`RolesXusuario` (
  `idRolXusuario` BIGINT NOT NULL AUTO_INCREMENT,
  `idUsuario` BIGINT NOT NULL,
  `idRol` BIGINT NOT NULL,
  PRIMARY KEY (`idRolXusuario`, `idUsuario`, `idRol`),
  INDEX `fk_RolesXusuario_Usuarios1_idx` (`idUsuario` ASC),
  INDEX `fk_RolesXusuario_Roles1_idx` (`idRol` ASC),
  CONSTRAINT `fk_RolesXusuario_Usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `video_extrem`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_RolesXusuario_Roles1`
    FOREIGN KEY (`idRol`)
    REFERENCES `video_extrem`.`Roles` (`idRol`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`SugerenciasXusuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`SugerenciasXusuario` (
  `idSugerenciaXusuario` BIGINT NOT NULL AUTO_INCREMENT,
  `idUsuario` BIGINT NOT NULL,
  `idSugerencia` BIGINT NOT NULL,
  PRIMARY KEY (`idSugerenciaXusuario`, `idUsuario`, `idSugerencia`),
  INDEX `fk_SugerenciasXusuario_Usuarios1_idx` (`idUsuario` ASC),
  INDEX `fk_SugerenciasXusuario_Sugerencias1_idx` (`idSugerencia` ASC),
  CONSTRAINT `fk_SugerenciasXusuario_Usuarios1`
    FOREIGN KEY (`idUsuario`)
    REFERENCES `video_extrem`.`Usuarios` (`idUsuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_SugerenciasXusuario_Sugerencias1`
    FOREIGN KEY (`idSugerencia`)
    REFERENCES `video_extrem`.`Sugerencias` (`idSugerencia`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Locales`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Locales` (
  `idLocal` BIGINT NOT NULL AUTO_INCREMENT,
  `local` VARCHAR(100) NOT NULL,
  `ubicacion` VARCHAR(500) NOT NULL,
  `imagen` LONGBLOB NULL,
  `telefono` VARCHAR(50) NULL,
  `correo` VARCHAR(50) NULL,
  PRIMARY KEY (`idLocal`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `video_extrem`.`Test`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `video_extrem`.`Test` (
  `idTest` BIGINT NOT NULL AUTO_INCREMENT,
  `test` VARCHAR(45) NOT NULL,
  `num` INT NULL,
  PRIMARY KEY (`idTest`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
