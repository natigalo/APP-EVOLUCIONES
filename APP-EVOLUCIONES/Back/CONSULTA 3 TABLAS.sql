SELECT o."NAME_OBJ", h."NAME_HAB", a."NAME_ACT" FROM "HABILIDADES-ACTIVIDADES" AS ah
INNER JOIN "HABILIDADES" h ON ah."ID_HAB2" = h."ID_HAB"
INNER JOIN "ACTIVIDADES" a ON ah."ID_ACT2" = a."ID_ACT"
INNER JOIN "OBJETIVO-HABILIDAD" AS oh ON ah."ID_HAB2" = oh."ID_HAB"
INNER JOIN "OBJETIVOS" AS o ON o."ID_OBJ" = oh."ID_OBJ"

