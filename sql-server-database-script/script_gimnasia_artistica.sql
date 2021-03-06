USE [master]
GO
/****** Object:  Database [gimnasia_artistica]    Script Date: 30/10/2020 18:32:02 ******/
CREATE DATABASE [gimnasia_artistica]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'gimnasia_artistica', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\gimnasia_artistica.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'gimnasia_artistica_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL15.MSSQLSERVER\MSSQL\DATA\gimnasia_artistica_log.ldf' , SIZE = 73728KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [gimnasia_artistica] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [gimnasia_artistica].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [gimnasia_artistica] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET ARITHABORT OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [gimnasia_artistica] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [gimnasia_artistica] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET  DISABLE_BROKER 
GO
ALTER DATABASE [gimnasia_artistica] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET TRUSTWORTHY ON 
GO
ALTER DATABASE [gimnasia_artistica] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [gimnasia_artistica] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET RECOVERY FULL 
GO
ALTER DATABASE [gimnasia_artistica] SET  MULTI_USER 
GO
ALTER DATABASE [gimnasia_artistica] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [gimnasia_artistica] SET DB_CHAINING OFF 
GO
ALTER DATABASE [gimnasia_artistica] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [gimnasia_artistica] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [gimnasia_artistica] SET DELAYED_DURABILITY = DISABLED 
GO
EXEC sys.sp_db_vardecimal_storage_format N'gimnasia_artistica', N'ON'
GO
ALTER DATABASE [gimnasia_artistica] SET QUERY_STORE = OFF
GO
USE [gimnasia_artistica]
GO
/****** Object:  Table [dbo].[alumno]    Script Date: 30/10/2020 18:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[alumno](
	[id_alumno] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NULL,
	[apellido] [nvarchar](50) NULL,
	[dni] [int] NOT NULL,
	[fecha_nacimiento] [datetime2](7) NULL,
	[mail] [nvarchar](100) NULL,
	[obrasocial] [nvarchar](50) NULL,
	[certificadomedico] [nvarchar](max) NULL,
	[numerosocio] [nvarchar](50) NULL,
	[nivel] [nvarchar](50) NULL,
	[categoria] [nvarchar](50) NULL,
	[edad] [int] NULL,
	[dias_practica] [nvarchar](50) NULL,
	[valor] [decimal](18, 0) NULL,
 CONSTRAINT [PK_alumno] PRIMARY KEY CLUSTERED 
(
	[id_alumno] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[asistencia]    Script Date: 30/10/2020 18:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[asistencia](
	[id_asistencia] [int] IDENTITY(1,1) NOT NULL,
	[dni] [int] NOT NULL,
	[asistencia_1] [bit] NULL,
	[asistencia_2] [bit] NULL,
	[asistencia_3] [bit] NULL,
	[asistencia_4] [bit] NULL,
	[pago_mensual] [decimal](18, 0) NULL,
	[pago_fecha] [date] NULL,
	[pago_realizado] [bit] NULL,
 CONSTRAINT [PK_asistencia] PRIMARY KEY CLUSTERED 
(
	[id_asistencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[tutor]    Script Date: 30/10/2020 18:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[tutor](
	[id_tutor] [int] IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](50) NOT NULL,
	[apellido] [nvarchar](50) NOT NULL,
	[dni] [int] NOT NULL,
	[mail] [nvarchar](100) NULL,
	[telefono] [nvarchar](100) NOT NULL,
	[id_alumno] [int] NULL,
 CONSTRAINT [PK_tutor] PRIMARY KEY CLUSTERED 
(
	[id_tutor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[asistencia] ADD  CONSTRAINT [DF_asistencia_pago_fecha]  DEFAULT (getdate()) FOR [pago_fecha]
GO
ALTER TABLE [dbo].[tutor]  WITH CHECK ADD  CONSTRAINT [FK_tutor_alumno] FOREIGN KEY([id_alumno])
REFERENCES [dbo].[alumno] ([id_alumno])
ON UPDATE CASCADE
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[tutor] CHECK CONSTRAINT [FK_tutor_alumno]
GO
/****** Object:  StoredProcedure [dbo].[SpReporteAsistenciaNivel]    Script Date: 30/10/2020 18:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO



CREATE PROCEDURE [dbo].[SpReporteAsistenciaNivel]
 AS
 BEGIN
select al.nivel, al.id_alumno, al.nombre, al.apellido, al.dni, al.dias_practica, asis.asistencia_1, asis.asistencia_2, asis.asistencia_3, asis.asistencia_4 from asistencia asis, alumno al 
where al.dni = asis.dni
 END
 
GO
/****** Object:  StoredProcedure [dbo].[SpReportePagoNivel]    Script Date: 30/10/2020 18:32:03 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SpReportePagoNivel]
 AS
 BEGIN
select al.nivel, al.id_alumno, al.nombre, al.apellido, al.dni, al.valor, asis.pago_fecha , asis.pago_mensual, asis.pago_realizado from asistencia asis, alumno al 
where al.dni = asis.dni
 END
 
GO
USE [master]
GO
ALTER DATABASE [gimnasia_artistica] SET  READ_WRITE 
GO
