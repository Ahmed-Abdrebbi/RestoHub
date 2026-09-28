## 24 septembre 2026 ___ 16:30PM — Audit et complétion du backlog Jira

`Prompt : Vérification du backlog Jira existant (projet RES/RestoHub) puis création d'un nouveau projet Jira (SMART) avec la liste de tâches complète.`

`Résultat : Audit du projet RES : structure hiérarchique propre (pas d'orphelins, pas de doublons) mais contenu incomplet par rapport au cahier des charges. Création du projet SMART (89 issues, 5 Epics) reprenant l'intégralité du RES corrigée.`



## 24 septembre 2026 ___ 16:40PM — Cadrage du projet

## Prompt : Choix et cadrage du projet de fin de formation à partir du brief officiel ; demande d'idées de projet exploitant RAG + function calling.
`Résultat : Choix de "Smart Menu & Ordering Assistant" — app de commande restaurant avec agent IA hybride (RAG pour les questions menu/allergènes, function calling pour les actions).`


## 24 septembre 2026 ___ 17:00PM — Mise en place de l'environnement

`Résultat : Structure monorepo (backend/, mobile/), docker-compose.yml avec l'image pgvector/pgvector:pg16, backend Express initialisé avec route /health, mobile Expo initialisé (workflow managé, template blank) avec Expo Router.`

`Corrections apportées : Aucune à ce stade — étape de setup pur, validée par un test end-to-end (/health répond, npx expo start fonctionne, docker compose ps montre Postgres actif).`



## 24 septembre 2026 ___ 17:15PM — Schéma de base de données (Prisma)

`Task` : Définition du schéma Prisma complet (8 modèles) et exécution de la migration.

`Résultat : Schéma Prisma avec User, MenuItem, Order, OrderItem, Conversation, Message, RefreshToken, AgentActionLog. Migration exécutée avec npx prisma migrate dev --name init.`

`Corrections apportées : Aucune correction post-génération — décisions de conception validées en amont (voir choix ci-dessous) plutôt que corrigées après coup.`
