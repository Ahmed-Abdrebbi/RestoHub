## 24 septembre 2026

### 16:30 — Audit et complétion du backlog Jira
* **Prompt :** Vérification du backlog Jira existant (projet RES/RestoHub) puis création d'un nouveau projet Jira (SMART) avec la liste de tâches complète.
* **Résultat :** Audit du projet RES : structure hiérarchique propre (pas d'orphelins, pas de doublons) mais contenu incomplet par rapport au cahier des charges. Création du projet SMART (89 issues, 5 Epics) reprenant l'intégralité du RES corrigée.

### 16:40 — Cadrage du projet
* **Prompt :** Choix et cadrage du projet de fin de formation à partir du brief officiel ; demande d'idées de projet exploitant RAG + function calling.
* **Résultat :** Choix de "Smart Menu & Ordering Assistant" — application de commande pour restaurant avec agent IA hybride (RAG pour les questions sur le menu/allergènes, function calling pour les actions).

### 17:00 — Mise en place de l'environnement
* **Tâche / Prompt :** Initialisation des environnements de développement Backend et Mobile.
* **Résultat :** Structure monorepo (backend/, mobile/), `docker-compose.yml` configuré avec l'image `pgvector/pgvector:pg16`, backend Express initialisé avec une route `/health`, mobile Expo initialisé (workflow managé, template blank) avec Expo Router.
* **Corrections apportées :** Aucune à ce stade — étape de setup pur, validée par un test end-to-end (`/health` répond, `npx expo start` fonctionne, `docker compose ps` montre Postgres actif).

### 17:15 — Schéma de base de données (Prisma)
* **Tâche / Prompt :** Définition du schéma Prisma complet (8 modèles) et exécution de la migration.
* **Résultat :** Schéma Prisma créé avec les modèles `User`, `MenuItem`, `Order`, `OrderItem`, `Conversation`, `Message`, `RefreshToken`, et `AgentActionLog`. Migration exécutée avec succès via `npx prisma migrate dev --name init`.
* **Corrections apportées :** Aucune correction post-génération — les décisions de conception ont été validées en amont plutôt que corrigées après coup.

---

## 29 septembre 2026

### 20:00 — Structure Frontend & Génération du design de l'UI mobile avec Stitch
* **Prompt :** "Dans la partie frontend de ce projet, je souhaite générer le design de toutes les pages de cette application mobile sur Stitch. Je veux d'abord que tu me donnes la structure complète du frontend, puis je te fournirai un design d'application mobile pour que tu me donnes les prompts de toutes les pages de mon application basés sur ce design."
* **Résultat :** Structure complète du frontend établie et génération de la totalité des prompts pour le design des 16 pages de l'interface utilisateur (UI) mobile.

### 20:15 — Authentification API (JWT complet)
* **Tâche / Prompt :** Implémentation de l'API d'authentification complète (register, login, refresh, logout, middlewares).
* **Résultat :** Endpoints `POST /api/auth/register`, `/login`, `/refresh`, `/logout` opérationnels ; intégration des middlewares `authenticate` et `requireRole`.

### 20:40 — API de Commandes (Ordering API)
* **Tâche / Prompt :** Implémentation de l'API de commande (création, liste, détail, changement de statut) avec calcul du prix côté serveur.
* **Résultat :** Logique de création extraite dans `order.service.js` (réutilisable plus tard par l'outil `place_order` de l'agent IA afin d'éviter la duplication) ; le prix est toujours recalculé depuis la base de données et n'est jamais reçu du client ; isolation des données par rôle (un client ne voit que ses propres commandes, l'administrateur voit tout) ; vérification de la disponibilité des articles avant la création de la commande.

### 21:30 — API de Gestion du Menu (Admin)
* **Tâche / Prompt :** Implémentation du CRUD complet pour `MenuItem` (Admin) avec pagination, filtrage et tri, en réutilisant les rôles définis dans l'API d'authentification.
* **Résultat :** Endpoints `POST/PUT/DELETE /api/menu-items` protégés par `requireRole('ADMIN')` ; l'endpoint `GET /api/menu-items` est rendu accessible à tout utilisateur authentifié, intégrant la pagination (`page/limit`), le filtrage (`category`, `available`, `search`) et le tri (`price_asc`, `price_desc`, `name_asc`).

---

## 03 Octobre 2026

### 🎯 Objectif de la session
Finaliser l'intégration de l'Agent IA conversationnel côté Backend, valider la recherche vectorielle (RAG) avec `pgvector`, et déboguer les erreurs de connexion réseau lors des appels aux API externes (Hugging Face et Groq).

### Itération 1 : Test de l'Agent et gestion des erreurs réseau
* **Prompt :** "Je veux tester mon agent IA en utilisant Postman. J'obtiens une erreur `fetch failed` lors de l'appel à l'API Hugging Face pour les embeddings. Comment puis-je corriger la connexion et structurer la requête ?"
* **Résultat :** L'API renvoyait une erreur 500 avec le message `{"error": "fetch failed"}` côté client. L'assistant IA a suggéré d'analyser les logs du terminal pour obtenir la trace exacte de l'erreur.
* **Corrections apportées :**
    * Remplacement de la méthode native `fetch` par `axios` dans `embedding.service.js` pour une meilleure gestion des requêtes HTTP et des interceptions d'erreurs.
    * Débogage de l'erreur terminal `getaddrinfo ENOTFOUND api-inference.huggingface.co`. L'IA a aidé à identifier un blocage DNS/FAI au niveau du réseau local.
    * Résolution du problème réseau en contournant le DNS du FAI via le partage de connexion (4G) et le vidage du cache DNS (`ipconfig /flushdns`).

### Itération 2 : Configuration du modèle LLM et architecture
* **Prompt :** "J'ai encore des problèmes. Le réseau fait un timeout ou donne des erreurs 400. Vérifie aussi la structure de mon backend car j'ai l'impression d'avoir des dossiers dupliqués."
* **Résultat :** Le modèle Groq utilisé initialement causait des instabilités pour le *Function Calling*, et l'arborescence du projet présentait des redondances (dossier `scripts` dupliqué).
* **Corrections apportées :**
    * **Mise à jour LLM :** Changement du modèle LLM dans `orchestrator.js` vers `llama-3.1-70b-versatile`, optimisé pour l'utilisation d'outils (Tool Calling).
    * **Refactoring (Architecture Clean) :** Nettoyage de l'arborescence en déplaçant le dossier `scripts` à la racine du projet. L'IA a validé la bonne séparation des responsabilités (MVC) avec un dossier isolé `services/agent/` contenant `orchestrator.js` et `tools.js`.
    * **Génération de vecteurs :** Exécution réussie du script de migration pour mettre à jour la colonne à `vector(384)` dans PostgreSQL et génération des embeddings pour 9 articles du menu.