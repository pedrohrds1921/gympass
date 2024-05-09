# App

Gypass styles app

## RFs( Requisitos funcionais)

-[] Deve ser possivel se cadastrar
-[] Deve ser possivel se autenticar
-[] Deve ser possivel obter o perfil de um usuario logado
-[] Deve ser possivel obter o numero de check - ins realizados pelo usuario logado

- [] Deve ser possivel o usuario ver seu historico de check-ins;
-[] Deve ser possivel o usuario buscar academias proximas;
-[] Deve ser possivel o usuario buscar academia pelo nome;
-[] Deve ser possivel o usuario realizar check in em uma academia;
-[] Deve ser possivel  validar o check-in de um usuario;
-[] Deve ser possivel o cadastrar uma academia

## RNs(Regras de Negocios)

-[] o usuario não deve poder se cadastrar com um e-mail duplicado;
-[] o usuario não pode fazer 2 check-in no mesmo dia;
-[] o usuario não pode fazer check-in se não estiver perto de 100m da academia;
-[] o check-in so pode ser validado ate 20min apos criado;
-[] o check- in so pode ser validado por admnistradores
-[] A academia so pode poder ser cadastrada por administradores

## RNFs (Requisitos não-funcionais)

-[] A senha do usuario precisa estar criptografada
-[] Dados persistos em banco de dados postgresSql
-[] Todas listas de dados prescisam estar paginadas com 20 item por pagina;
