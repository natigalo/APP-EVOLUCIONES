-- Table: public.INTRODUCCION

-- DROP TABLE IF EXISTS public."INTRODUCCION";

CREATE TABLE IF NOT EXISTS public."INTRODUCCION"
(
    "Id" integer NOT NULL DEFAULT nextval('"INTRODUCCION_Id_seq"'::regclass),
    "IntroduccionText" text COLLATE pg_catalog."default",
    "IdUsuario" integer,
    CONSTRAINT "INTRODUCCION_pkey" PRIMARY KEY ("Id"),
    CONSTRAINT "IdIntro_IdUser" FOREIGN KEY ("IdUsuario")
        REFERENCES public."USUARIOS" ("Id_Usuario") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public."INTRODUCCION"
    OWNER to postgres;