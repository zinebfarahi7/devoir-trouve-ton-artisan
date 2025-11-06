-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 01 nov. 2025 à 01:47
-- Version du serveur : 9.1.0
-- Version de PHP : 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `trouve_ton_artisan`
--

--
-- Déchargement des données de la table `artisan`
--

INSERT INTO `artisan` (`id`, `nom`, `note`, `ville`, `about`, `email`, `site_web`, `top_artisan`, `id_specialite`) VALUES
(1, 'Boucherie Dumont', 4.5, 'Lyon', 'Lorem ipsum...', 'boucherie.dumond@gmail.com', NULL, 0, 1),
(2, 'Au pain chaud', 4.8, 'Montélimar', 'Lorem ipsum...', 'aupainchaud@hotmail.com', NULL, 1, 2),
(3, 'Chocolaterie Labbé', 4.9, 'Lyon', 'Lorem ipsum...', 'chocolaterie.labbe@example.com', NULL, 1, 3),
(4, 'Boucherie Dumont', 4.5, 'Lyon', 'Lorem...', 'artisan1@test.com', NULL, 0, 1),
(5, 'Au Pain Chaud', 4.8, 'Montélimar', 'Lorem...', 'artisan2@test.com', NULL, 1, 2),
(6, 'Chocolaterie Labbé', 4.9, 'Valence', 'Lorem...', 'artisan3@test.com', NULL, 1, 3),
(7, 'Plomberie Martin', 4.1, 'Lyon', 'Lorem...', 'artisan4@test.com', NULL, 0, 5),
(8, 'Menuiserie Dubois', 4.6, 'Grenoble', 'Lorem...', 'artisan5@test.com', 'https://dubois.fr', 0, 6),
(9, 'Informatique Expert', 4.3, 'Clermont-Ferrand', 'Lorem...', 'artisan6@test.com', NULL, 0, 8);

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id`, `nom`) VALUES
(1, 'Alimentation'),
(2, 'Bâtiment'),
(3, 'Fabrication'),
(4, 'Services');

--
-- Déchargement des données de la table `specialite`
--

INSERT INTO `specialite` (`id`, `nom`, `id_categorie`) VALUES
(1, 'Boucherie', 1),
(2, 'Boulangerie', 1),
(3, 'Chocolatier', 1),
(4, 'Maçonnerie', 2),
(5, 'Plomberie', 2),
(6, 'Menuiserie', 2),
(7, 'Métallurgie', 3),
(8, 'Electricité', 4),
(9, 'Informatique', 4);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
