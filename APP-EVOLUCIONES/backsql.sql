PGDMP  (                    |            AppHC    16.3    16.3     5           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            6           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            7           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            8           1262    16566    AppHC    DATABASE     i   CREATE DATABASE "AppHC" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C';
    DROP DATABASE "AppHC";
                postgres    false            ,          0    16587    ACTIVIDADES 
   TABLE DATA           =   COPY public."ACTIVIDADES" ("ID_ACT", "NAME_ACT") FROM stdin;
    public          postgres    false    218   �       .          0    16601    HABILIDADES 
   TABLE DATA           =   COPY public."HABILIDADES" ("ID_HAB", "NAME_HAB") FROM stdin;
    public          postgres    false    220          2          0    16694    HABILIDADES-ACTIVIDADES 
   TABLE DATA           W   COPY public."HABILIDADES-ACTIVIDADES" ("ID_HAB_ACT", "ID_HAB2", "ID_ACT2") FROM stdin;
    public          postgres    false    224   �       0          0    16677    OBJETIVO-HABILIDAD 
   TABLE DATA           P   COPY public."OBJETIVO-HABILIDAD" ("ID_OBJ_HAB", "ID_OBJ", "ID_HAB") FROM stdin;
    public          postgres    false    222   8       *          0    16580 	   OBJETIVOS 
   TABLE DATA           ;   COPY public."OBJETIVOS" ("ID_OBJ", "NAME_OBJ") FROM stdin;
    public          postgres    false    216   s       >           0    0    ACTIVIDADES_Id_Act_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."ACTIVIDADES_Id_Act_seq"', 3, true);
          public          postgres    false    217            ?           0    0 &   HABILIDADES-ACTIVIDADES_ID_HAB_ACT_seq    SEQUENCE SET     V   SELECT pg_catalog.setval('public."HABILIDADES-ACTIVIDADES_ID_HAB_ACT_seq"', 4, true);
          public          postgres    false    223            @           0    0    HABILIDADES_ID_HAB_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public."HABILIDADES_ID_HAB_seq"', 12, true);
          public          postgres    false    219            A           0    0 !   OBJETIVO-HABILIDAD_ID_OBJ_HAB_seq    SEQUENCE SET     Q   SELECT pg_catalog.setval('public."OBJETIVO-HABILIDAD_ID_OBJ_HAB_seq"', 1, true);
          public          postgres    false    221            B           0    0    OBJETIVOS_ID_OBJ_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public."OBJETIVOS_ID_OBJ_seq"', 4, false);
          public          postgres    false    215            ,   "  x�]�=r�0�k�<A&�ߤL�&��tn 
^ӡ =��M�#���Hy�M:I|����/���d��$��_��[�B<���]L���VZd�6Ε�s�-�ǘ�]NA�(o�\u��Wf-�[䌳x���h������P�DVc������|!%�JZ��]o��G��R;�_b�A��%>��#TZ����+[��9ĭcړ*w�C��V�/d�f�TXk�����'�����=b��[����h�=�[*k�@3������_���S��9.�lԕ�h�Q����v;��<ӰR�A����3�@9��7H���6A��S�Z��+Utd��dƴ�������[O�*e+h�z�'|=��aW�~�|r���ar�;k�mu��:��v�v,���]zP�e+������k8²��絴�LI��]Nw
-*р3��S����f�*W��P�nw���RJ��|�T���l���d<��������m$ysZ�u4��'I�?��-���ع�b���d
߆�s?���݅{��gw��9�֝i�      .   �   x�U�An1E��)r�"uJ]�rVl<��e�֞T���\����������sکZe��׋�	E���0�}'��|Ε|6��$7�[�Co1+UuxI�ߝ��F�W�AB��(�~t9�LR�Խ���(6���s�`�>q��������D2/ئ/�4� o�tl�YQG��̦p\��VT�      2   Q   x�ʱ�0���P̏N")��_Ǔ	6�e��ݜ�!�T��nr�/�`�a�4/>
y�={\��r��x�UɅ�����?U,2      0   +   x�Ĺ 0�Z7L �������e���T(��h����}�g�      *   [   x�3�T��/)�L�LILQH��K�2�DI/*M-N�2�L,-����=�6Q!5O!1�$�� �X!%U!'Q�SH�L,�LT�ps������ Z      