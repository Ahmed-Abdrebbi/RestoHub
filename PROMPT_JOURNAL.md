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

## 29 septembre 2026 ___ 20:15PM — Authentication API (JWT complet)

`Task : Implémentation de l'API d'authentification complète (register, login, refresh, logout, middlewares).`

`Résultat : Endpoints POST /api/auth/register, /login, /refresh, /logout ; middleware authenticate + requireRole.`

## 29 septembre 2026 ___  21:30PM— Menu Management API (Admin)

`Task : Implémentation du CRUD complet MenuItem (Admin) avec pagination, filtrage et tri, en réutilisant les rôles définis dans l'Auth API.`

`Résultat : Endpoints POST/PUT/DELETE /api/menu-items protégés par requireRole('ADMIN') ; GET /api/menu-items accessible à tout utilisateur authentifié, avec pagination (page/limit), filtrage (category, available, search) et tri (price_asc, price_desc, name_asc).`

## 29 septembre 2026 ___ 20:40PM — Ordering API

`Task : Implémentation de l'API de commande (création, liste, détail, changement de statut) avec calcul du prix côté serveur.`

`Résultat : Logique de création extraite dans order.service.js (réutilisable plus tard par place_order de l'agent IA — évite la duplication) ; prix toujours recalculé depuis la base, jamais reçu du client ; isolation des données par rôle (un client ne voit que ses propres commandes, l'admin voit tout) ; vérification de disponibilité des articles avant création.`

## 29 septembre 2026 ___ 20:00PM - Frontend structure & Generate Design mobile UI using Stitch 

`Prompt : in frontend part of this project , i want to generate design of all pages of this mobile app on stitch and i want first to give me the full frontend structure and i will give you a design a mobile app and give me prompts of all pages of my mobile app i want like the design that i will give you`

`Résultat: Full frontend structure & Full 16 design pages of mobile UI Prompt`

