-- Table: public.USUARIOS

-- DROP TABLE IF EXISTS public."USUARIOS";

CREATE TABLE IF NOT EXISTS public."USUARIOS"
(
    "Id_Usuario" integer NOT NULL DEFAULT nextval('"USUARIOS_Id_Usuario_seq"'::regclass),
    "Nombre" text COLLATE pg_catalog."default" NOT NULL,
    "Identificacion" bigint NOT NULL,
    "Correo" text COLLATE pg_catalog."default" NOT NULL,
    "Contrasena" text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT "USUARIOS_pkey" PRIMARY KEY ("Id_Usuario")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."USUARIOS"
    OWNER to postgres;