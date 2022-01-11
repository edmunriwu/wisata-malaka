-- MariaDB dump 10.19  Distrib 10.6.4-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: ow_malaka
-- ------------------------------------------------------
-- Server version	10.6.4-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admin` (
  `id_admin` varchar(8) NOT NULL,
  `nama` text DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `telepon` varchar(13) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `password` int(11) DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES ('01','EDMUNDUS YOSKO BUU RIWU','Penfui binilaka','082395865814','edmun762@gmail.com',12345,'6140d95687f51460cdaca1d01.jpeg'),('02','Ferdianus Fahik','BTN Kolhua','085325758459','ferdifahik14@gmail.com',12345,'ff3cdabb9f65042dc1d9b4300.jpeg');
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `buku_tamu`
--

DROP TABLE IF EXISTS `buku_tamu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `buku_tamu` (
  `id_buku_tamu` varchar(8) NOT NULL,
  `tanggal` date DEFAULT NULL,
  `email` text DEFAULT NULL,
  `komentar` text DEFAULT NULL,
  PRIMARY KEY (`id_buku_tamu`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `buku_tamu`
--

LOCK TABLES `buku_tamu` WRITE;
/*!40000 ALTER TABLE `buku_tamu` DISABLE KEYS */;
INSERT INTO `buku_tamu` VALUES ('1','2021-12-18','yosko@gmail.com','website yang menarik,Semoga Bermanfaat bagi Wisatawan Lainnya'),('2','2021-12-04','fendi12@gmail.com','Kalo Bisa Tambahkan fitur Pencarian'),('3','2021-12-25','edmunriwu762@gmail.com','Website Wisata Alama di Kabupaten Malaka ini menurut saya baik, bagus, dan menarik untuk di lihat');
/*!40000 ALTER TABLE `buku_tamu` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `objek_wisata_ow`
--

DROP TABLE IF EXISTS `objek_wisata_ow`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `objek_wisata_ow` (
  `id_ow` varchar(8) NOT NULL,
  `nama_ow` text DEFAULT NULL,
  `lokasi` text DEFAULT NULL,
  `jam_operasi` text DEFAULT NULL,
  `deskripsi_singkat` text DEFAULT NULL,
  `tarif_masuk` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_ow`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `objek_wisata_ow`
--

LOCK TABLES `objek_wisata_ow` WRITE;
/*!40000 ALTER TABLE `objek_wisata_ow` DISABLE KEYS */;
INSERT INTO `objek_wisata_ow` VALUES ('01','Pantai Raihenek','Rainawe, Kobalima, Kab. Malaka, Nusa Tenggara Timur','24 jam','Pantai Raihenek. Pantai ini memiliki kondisi alam yang tidak kalah cantik. Bahkan Pantai ini bisa dibilang memiliki kelebihan yakni sebuah Pantai yang terawat dan terjaga kebersihannya, karena membuang sampah di tempat ini akan diberi Sanksi yang tegas. Kebersihannya membuat pasir putih yang berada di sepanjang bibir Pantai semakin terlihat cantik dan menawan sehingga membuat wisatawan betah berlama-lama di tempat ini. Menikmati indahnya laut biru dan gulungan ombak yang cukup tenang menjadi moment yang paling indah. Saat senja tiba, Keindahan Pantai Raihenek semakin terlihat jelas oleh mata.','5000','c9e10cf38db5ba46c1366f400.jpeg'),('02','Pantai Lo\'o Diik ','G24R+CQG, Rainawe, Kobalima, Kabupaten Belu, Nusa Tenggara Tim.','Setiap Hari','Objek wisata ini sangat menarik untuk di kunjungi untuk mengisih waktu liburan dengan pengalaman baru yang akan didapatkan. Keindahannya mampu menghipnotis siapa saja sehingga betah berlama-lama di tempat ini. Pantai Lo\'o Diik bukan hanya di kunjungi oleh wisatawan lokal saja, namun banyak juga turis asing yang datang untuk berjemur di pantai ini. Indahnya pemandangan laut biru yang sangat luas sejauh mata memandang  membuat pantai ini banyak di minat oleh banyak wisatawan-wisatawan. Selain itu hamparan pasir putih yang mempercantik pantai ini','10000','b58938811d58b770482bea401.jpg'),('03','Pantai Motadikin','Pantai Motadikin Marak bolan style, Railor Tahak, Malaka Tengah, Kab. Malaka, Nusa Tenggara Timur','Setiap Hari','Pesona Wisata Alama Kabupaten Malaka memang tidak ada habis-habisnya. Salah satu Objek Wisata Alam yang patut di kunjungi ialah Pantai Motadikin. Setiap sudut pantai menyajikan keindahan yang membuat mata tidak bisa berkedip. Pemandangan yang luar biasa indah membuat hati terasa nyaman bila berkunjung ke Pantai motadikin ini. Tepi Pantai yang berbentuk seperti pulau-pulau kecil yang berjejer dan pepohonan yang menghiasi serta lautan yang indah mampu menarik berbagai wisatawan untuk datang melihat pantai yang satu ini. ','5000','e2728cfcd2a39db2c2d35a900.jpg'),('04','Pantai Abudenok','8WPW+H3C, Umatoos, Malaka Bar., Malaka, Nusa Tenggara Timur','Setiap Hari','Pantai selatan satu ini letaknya berada di teluk Abudenok, kurang lebih 80 km dari Kota Atambua. Garis pantainya pun cukup panjang, mencapai 81 km, tanpa terhalang tebing dan hanya dipisahkan oleh muara sungai. Hal unik yang hanya bisa dilihat dari Abudenok yaitu wisatawan dapat melihat gunung dan perbukitan yang ada di Australia Utara. Karena Abudenok lokasinya cukup dekat dengan perairan Australia, tak heran bila beberapa nelayan ada saja yang menangkap ikan hingga wilayah perbatasan. Eksotisme Pantai ini semakin bisa kita rasakan menjelang sore hari. Dimana moment matahari terbenam akan terjadi, lembayung senja yang memberikan efek siluet pada beberapa objek semakin terasa romantic.','2000','e2728cfcd2a39db2c2d35a901.jpg'),('05','Pantai Wemasa','Jl. Raya Betun, Lakekun Utara, Kobalima, Kab. Malaka, Nusa Tenggara Timur','Setiap Hari','Pantai Wemasa merupakan tempat wisata di Malaka NTT yang menawarkan eksotisme pesona pantai timur yang khas. Hamparan pasir putih, ombak dan biru air laut adalah beberapa hal yang sudah pasti bisa kita lihat. Ada juga beberapa masyarakat yang kerap mengajak hewan kerbau peliharaannya untuk bermain di pantai. suasananya cenderung sepi. Cocok sekali untuk wisatawan yang lebih senang menikmati alam dengan lebih tenang, tanpa ada gangguan karena banyak lalu-lalang orang.','2000','e2728cfcd2a39db2c2d35a902.jpg'),('06','Air Terjun Mauhalek','W35V+63Q, Raiulun, Lasiolat, Kabupaten Belu, Nusa Tenggara Timur','Setiap Hari',' Air Terjun Mauhalek, berlokasi di Lasiolat, Nusa Tenggara Timur. Banyak yang menyebut tempat ini sebagai Surga Tersembunyi di Batas Negeri, pemandangan menakjubkan yang bisa membuat para pengunjung terpesona. Air terjunnya sendiri bukan satu gelontoran yang langsung jatuh dari ketinggian, tapi jatuh ke sebuah tebing bebatuan dulu. Lalu airnya pecah dan membentuk puluhan alur, terlihat seperti tirai air yang sangat cantik alami. Waktu yang cocok untuk datang ke air terjun mauhalek yaitu saat musim hujan dimana debit airnya lebih besar dan akan membentuk air terjun yang lebih indah. ','1000','e2728cfcd2a39db2c2d35a903.jpg'),('07','Teluk Maubesi','Desa, Fahiluka, Malaka Tengah, Kab. Malaka, Nusa Tenggara Tim.','Setiap Hari','Di sekitar teluk kita bisa melihat beberapa tumbuhan mangrove yang merupakan habitat kelelawar serta lebah. Oleh sebab itulah, saat siang hari wisatawan dapat melihat langsung beberapa kelelawar yang sedang tidur di dahan mangrove. Teluk Maubesi cenderung lebih sepi dibandingkan beberapa pantai lain. Belum banyak orang juga yang tau mengenai tempat wisata ini. So, kalau datang ke sini jangan lupa dokumentasikan lokasi wisatanya, kalau bisa publikasikan juga di sosial media agar semakin banyak orang yang tertarik untuk berkunjung.','2000','e2728cfcd2a39db2c2d35a904.jpg'),('08','Bukit Cinta Alas','Unnamed Road, Kotabiru, East Kobalima, Malaka Regency, East Nusa Tenggara','undefined','Bukit Cinta yang terletak di jalan sabuk perbatasan Indonesia dan Timor Leste. Kobalima Timur, Kabupaten Malaka, Nusa Tenggara Timur. Dari puncak bukit, wisatawan bisa melihat langsung pemandangan pegunungan dan lautan. Bukit Cinta bisa ditempuh selama 20 menit dari Kota Betun. Selain menjadi wisata alam, oleh warga sekitar bukit ini juga menjadi wisata rohani.','2000','e2728cfcd2a39db2c2d35a906.jpg');
/*!40000 ALTER TABLE `objek_wisata_ow` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `penginapan`
--

DROP TABLE IF EXISTS `penginapan`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `penginapan` (
  `id_penginapan` varchar(25) NOT NULL,
  `nama_penginapan` text DEFAULT NULL,
  `lokasi_penginapan` text DEFAULT NULL,
  `biaya` varchar(225) DEFAULT NULL,
  `telepon` varchar(13) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `jam` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_penginapan`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `penginapan`
--

LOCK TABLES `penginapan` WRITE;
/*!40000 ALTER TABLE `penginapan` DISABLE KEYS */;
INSERT INTO `penginapan` VALUES ('1','Wisma Victory','Jalan Tubaki 2,Desa.Kamanasa,Kec.Malaka Tengah,Kab.Malaka,NTT','100/Hari','082395865810','victtory@yahoo.com','24 jam','c2226ad59dc3f0c03f1d0da01.jpeg'),('2','Home Stay Hendrik','Jl.Sukabi Hanawa,Desa.Kamanasa,Kec.Malaka Tengah,Kab.Malaka,NTT','150/Hari','081239890545','tejo12@gmail.com','24 jam','fed2c3d7e8c120c6f3dd3c001.jpg'),('3','Hotel Ramayana','Jl.Manumuti,Desa.Wehali,Kec.Malaka Tengah,Kab.Malaka,NTT','250/Hari','082339890001','ramayana10@gmail.com','24 jam','fed2c3d7e8c120c6f3dd3c003.jpg'),('4','Hotel Cinta Damai','Jalan Raya Betun,Desa.Wehali,Kec.Malaka Tengah,Kab.Malaka,NTT','300/Hari','085239922512','cintadamai@yahoo.com','24 jam','fed2c3d7e8c120c6f3dd3c005.jpeg'),('5','Hotel Sesawi','Jl.wemalae,Desa.Wehali,Kec.Malaka Tengah,Kab.Malaka,NTT','150/Hari','081246969709','sesawihotel55@gmail.com','24 jam','fed2c3d7e8c120c6f3dd3c006.jpg'),('6','Ell Ora Quest House','Jalan Raya Betun,Desa.Wehali,Kec.Malaka Tengah,Kab.Malaka,NTT','220/Hari','0813953865812','houseitakan@gmail.com','24 jam','fed2c3d7e8c120c6f3dd3c007.jpg'),('7','Hotel Nusa Dua','Jl.Bakateu,Desa.Wehali,Kec.Malaka Tengah,Kab.Malaka,NTT','200/Hari','081392449401','nusadua2@yahoo.com','24 jam','fed2c3d7e8c120c6f3dd3c008.jpg'),('8','ASK Homestay - Laran','Jl. Ahmad Yani, Wehali, Malaka Tengah, Kab. Malaka, NTT','175/Hari','082147288255','askhomestay@gmaiol.com','24 jam','fed2c3d7e8c120c6f3dd3c009.jpg');
/*!40000 ALTER TABLE `penginapan` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restoran`
--

DROP TABLE IF EXISTS `restoran`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `restoran` (
  `id_restoran` varchar(25) NOT NULL,
  `nama_restoran` text DEFAULT NULL,
  `lokasi_restoran` text DEFAULT NULL,
  `telepon` varchar(13) DEFAULT NULL,
  `email` text DEFAULT NULL,
  `jam` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_restoran`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restoran`
--

LOCK TABLES `restoran` WRITE;
/*!40000 ALTER TABLE `restoran` DISABLE KEYS */;
INSERT INTO `restoran` VALUES ('1','Depot Sei Ceria','jl.Sukabi Hanawa,Betun,Kec.Malaka Tengah,Malaka,NTT','081395865813','ceria112@gmail.com','12 jam','fed2c3d7e8c120c6f3dd3c00d.jpg'),('2','Rumah Makan Dinda','jl.Batateu 1,Betun,Kec.Malaka Tengah,Malaka,NTT','082395865814','dinda19@gmail.com','24 jam','fed2c3d7e8c120c6f3dd3c00a.jpg'),('3','RM.Sederhana Betun','jl.Wemalae,Betun,Kec.Malaka Tengah,Malaka,NTT','0822238220990','rmsederhana@gmail.com','12 jam','fed2c3d7e8c120c6f3dd3c00b.jpeg'),('4','Bakso Sableng','jl.Wemalae,Betun,Kec.Malaka Tengah,Malaka,NTT','082339870005','Sableng@gmai.com','12 jam','fed2c3d7e8c120c6f3dd3c00c.jpg'),('5','Ayam Bakar Betun','jl.Beiabuk 1,Desa Wehali,Kec.Malaka Tengah,Malaka,NTT','082451229008','rumahmakanayam@gmail.com','7 jam','fed2c3d7e8c120c6f3dd3c00e.jpg'),('6','Warung Makan Ika','jl.Beiabuk 5,Desa Wehali,Kec.Malaka Tengah,Malaka,NTT','081238995990','ika12@gmai.com','5 jam','fed2c3d7e8c120c6f3dd3c00f.jpeg'),('7','Cafe We Banibin','Jl.Sukabi We dik A,Desa Kamanasa,Kec.Malaka Tengah,Malaka,NTT','082456712990','webanibin@gmail.com','24 jam','fed2c3d7e8c120c6f3dd3c010.jpg'),('8','Cafe Gaul Harekakae','Jl.Translok Harekakae,Desa Harekakae,Kec.Malaka Tengah,Malaka,NTT','081236123002','cafegaul@gmail.com','12 jam','fed2c3d7e8c120c6f3dd3c011.jpg');
/*!40000 ALTER TABLE `restoran` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimoni`
--

DROP TABLE IF EXISTS `testimoni`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testimoni` (
  `id_testimoni` varchar(25) NOT NULL,
  `nama` text DEFAULT NULL,
  `email` text DEFAULT NULL,
  `tanggal_posting` date DEFAULT NULL,
  `testimoni` text DEFAULT NULL,
  `gambar` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_testimoni`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimoni`
--

LOCK TABLES `testimoni` WRITE;
/*!40000 ALTER TABLE `testimoni` DISABLE KEYS */;
INSERT INTO `testimoni` VALUES ('1','maria agatha nahak klau','mariaagatha@gmail.com','2022-01-02','website yang menarik. website ini juga bagus karena memperlihatkan bergabai jenis keindahan wisata di kabupaten malaka','c9e10cf38db5ba46c1366f401.jpg'),('2','Edmundus yosko buu riwu','edmun762@gmail.com','2022-01-06','website ini bukan hanya memperlihatkan berbagai objek wisata alam di kabupaten Malaka sekaligus website ini memperkenalkan kita kepada kabupaten malaka dan menunjukkan letak kabupaten malaka','c9e10cf38db5ba46c1366f402.jpeg'),('3','Ferdianus Fahik','ferdifahik14@gmail.com','2022-01-17','apa yang di sajikan oleh website ini cukup lengkap dan juga bagus di mana pada setiap objek wisata, rumah makan maupun restoran yang ada di malaka telah di arahkan letak dan lokasi setiap tempat. website ini mempermudah kita ketika kita ingin pergi berliburan di kabupaten malaka','c9e10cf38db5ba46c1366f403.jpeg');
/*!40000 ALTER TABLE `testimoni` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` varchar(25) NOT NULL,
  `user_nama` varchar(25) DEFAULT NULL,
  `user_password` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('edmun','Edmundus Riwu','edmun');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-11  3:05:36
