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

    1. Project Overview
Project Name: Smart Menu App

Tech Stack: React Native (Expo Router), Zustand, Node.js / Express, PostgreSQL + Prisma ORM.

UI/UX Design Standard: Premium Dark Theme (#121212, #1B1B1B, #2A2A2A) with Vibrant Orange Accent (#FF6B00).

2. Completed Prompts & UI Screen Logs
🔹 Prompt #01: Root Layout & Global Setup
User Request: Configurer l-layout d-app m3a l-colors w Status Bar.

JavaScript
// app/_layout.js
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: "#121212" } }} />
    </SafeAreaProvider>
  );
}
🔹 Prompt #02: Home Screen UI
User Request: Create Home Screen code with Best Seller banner, categories, and popular meals grid.

File Location: app/(tabs)/home.js

Features Included:

Brand Header ("Smart Menu") & Profile Quick Icon.

Search Input & Filter Button.

Best Seller Banner ("Double Beef Burger Deluxe" with "Order now").

Horizontal Category Selector (Burger, Pizza, Chicken, Salad, Drinks).

2-column Grid for Popular Meals with prices, ratings, and Quick Add + buttons.

🔹 Prompt #03: Categories Screen UI
User Request: Create Categories Page code.

File Location: app/(tabs)/categories.js

Features Included:

Filter Chips ("All Offerings", "Chef's Choice", "Most Popular", "Late Night").

2x3 Grid layout for Categories (Burgers, Pizza, Sushi, Chicken, Grill, Shawarma) with badges (★ 4.9, Hot, Fresh, Crispy).

Chef AI "Surprise ✦" callout card at the bottom.

🔹 Prompt #04: Meal Detail Screen UI
User Request: Create Meal Detail View code with image overlay and custom options.

File Location: app/menu-item/[id].js

Features Included:

Full-width burger image with "CHEF'S SPECIAL" badge and favorite button.

Interactive Quantity Counter (- / +).

Nutritional & Preparation Meta Badges (650 kcal, 4.9 rating, 15-20 min).

Customization Checkboxes (Extra Aged Cheddar, Bacon Strips, Caramelized Onions, Truffle Mayo).

Sticky Bottom Price Bar ($14.99) & "Add to cart" CTA.

🔹 Prompt #05: Digital Waiter AI Chat UI
User Request: Create Digital Waiter AI Assistant Page code.

File Location: app/(tabs)/assistant.js

Features Included:

Header with "Table 14 • Instant Replies" & "Call Waiter" action button.

Conversational chat UI (Bot messages & User speech bubbles).

AI-generated Order Summary Card inside chat with item preview photos, tax calculations, kitchen ETA, and "Modify" / "Confirm Order" buttons.

Quick Preference Suggestion Chips ("Add Craft Soda", "Nut Allergy Notes").

Voice & Text Input synchronized with Table 14 POS.

🔹 Prompt #06: Smart Menu Cart UI
User Request: Create Cart Screen code.

File Location: app/(tabs)/cart.js

Features Included:

Table 14 Dine-In info bar with "PRIORITY" badge.

Itemized selection list with image placeholders, item subtitles, and quantity adjusters.

Kitchen Instructions / Allergies trigger.

Promo Code Box (CHEFSPECIAL applied, -$2.00 credit).

Detailed Payment Summary (Subtotal, Service Fee, Tax, Total $23.79).

"Send Order to Kitchen" action button.

🔹 Prompt #07: Checkout Screen UI
User Request: Create Checkout Screen code.

File Location: app/order/checkout.js

Features Included:

Address Selection Cards (Home - Default vs Work).

Payment Method Radio Selectors (Mastercard •••• 4829, Apple Pay, Cash on Delivery).

Breakdown with CHEFPROMO applied ($24.79 total).

Secure "Confirm & Place Order" button with legal terms notice.

🔹 Prompt #08: Order Confirmation Modal UI
User Request: Create Confirmation Modal / Popup code.

File Location: app/order/index.js

Features Included:

Dark transparent blur overlay modal.

🎉 Party Popper Icon & "Congratulations!" celebration header.

Order Receipt Badge (ORDER #SM-84920 • DELIVERY).

"Track Order / Ok" redirection button.

🔹 Prompt #09: Order History (My Orders) UI
User Request: Create Order History Screen code.

File Location: app/order/orders.js

Features Included:

Status filter chips ("All Orders", "Active (2)", "Completed", "Cancelled").

Order cards with dynamic status indicators (PREPARING, READY, DELIVERED).

Live preparation progress bar ("On the grill & assembling", ~7 mins left).

Contextual action buttons ("Track Order", "Receipt", "View QR Code", "Reorder", "Rate").

🔹 Prompt #10: Order Live Tracking UI (#1234)
User Request: Create Order Tracking Screen code.

File Location: app/order/[id].js

Features Included:

Header banner ("Grilling in Progress", Table #04, 15–20 min estimate).

Vertical Order Journey Timeline (Order Received ➔ In the Kitchen ➔ Ready for Table ➔ Served & Enjoy).

Ordered item list and Apple Pay payment summary.

"Call Waiter / Support" & "View Digital Receipt & Split" buttons.

🔹 Prompt #11: Folder Layout (app/order/_layout.js)
User Request: Provide exact layout code for order folder routing.

JavaScript
// app/order/_layout.js
import { Stack } from 'expo-router';

export default function OrderLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#121212' },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="checkout" />
      <Stack.Screen name="orders" />
      <Stack.Screen name="[id]" />
    </Stack>
  );
}
🔹 Prompt #12: Profile Screen UI
User Request: Create Profile Page code.

File Location: app/(tabs)/profile.js

Features Included:

Profile card with VIP badge, email, table info, and stats (Total Visits, Ember Pts, Level 3 Tier).

Smart Wallet Card ($148.50 USD balance) with "Top Up" button.

Preferences section with Dark Mode & Push Alerts switches.

Menu list (Order History, Favorites, Language, Settings, Help, Terms, Privacy).

Red Logout Button.

🔹 Prompt #13: Onboarding Screens (Steps 01, 02 & 03)
User Request: Create Onboarding code for all 3 steps.

File Locations:

app/onboarding.js (Step 01 - Grid Collage - Choose your meal!)

app/onboarding-offer.js (Step 02 - Special Offer - First order perk 30% discount)

app/onboarding-tracking.js (Step 03 - Track your order now - Live GPS map preview)

## 17 Octobre 2026 — Bug critique : double exécution de place_order

Incident : Lors des tests du scénario complet (recherche → intention → confirmation),
l'agent a créé DEUX commandes réelles pour une seule confirmation utilisateur.

Cause racine : une duplication accidentelle de la fonction runAgentConversation()
dans orchestrator.js (deux définitions dans le même fichier, la seconde écrasant
la première sans la logique de garde-fou).

Correction : fusion en une seule fonction + ajout d'un flag orderPlacedThisTurn
qui bloque toute réexécution de place_order au sein d'un même tour de boucle,
indépendamment de la décision du modèle (protection côté serveur, pas seulement
côté prompt).

Leçon retenue : un modèle 20B (openai/gpt-oss-20b) est moins fiable qu'un modèle
GPT-4-class pour respecter des instructions de confirmation strictes — un garde-fou
dans le code est indispensable, le system prompt seul ne suffit pas.