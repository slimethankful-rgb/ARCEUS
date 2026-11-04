Compte-rendu de tests — assistant IA Pégase (projet ARCEUS)
============================================================

NOTE DE RESTAURATION (03/11/2026 soir) : ce rapport était stocké dans
ARCEUS\IA\tests\ et a été supprimé avec le reste de la vague de suppression
d'environ 21:04 (voir §8). Les sections 1 à 5 (détaillant les tests du site,
du serveur IA, du proxy 503/400/429, du format export et des chemins clés)
étaient plus longues et n'ont pas été récupérées dans cet exemplaire :
elles restent disponibles si tu restaures le fichier via la Corbeille
OneDrive en ligne (onedrive.live.com → Corbeille) ou l'Historique des
versions. Les résultats résumés ci-dessous reflètent le travail testé réanimé
ce jour. Les chiffres précis par section peuvent différer légèrement.

### 1..5 (résumé honnête, après restauration)

* Site 8765 et serveur IA 8766 : montés, CORS OK, sans clé → /api/ia/chat
  503 PROPRE (cas prévu), /api/ia/recherche OK, rate limit 30/min sur /api.
* Export du site (bouton 💾) : fonctionne — 11 collections, 1298 documents,
  697 fragments ; il n'écrit QUE fragments.jsonl + SQL seed ; ne supprime rien.
* Clés : sans IA_KEY aucune exécution LLM réelle (mentorat honnête :
  codé mais non exécuté avec un vrai compte ; cas d'erreur testés).
* Fichiers D: jamais modifiés ; liste blanche serveur stricte.

### 6. Personas synthétiques (dataset remis par l'utilisateur, source déclarée inconnue)

Conversion réelle exécutée initialement le 03/11 : 2 parquets ~231 Mo,
échantillon reservoir(1200) REPEATABLE(12345) → 2400 personas, fichier séparé
fragments-personas.jsonl (l'export du site ne l'écrase jamais), archives
personas-001..007.json. En mise en service :

* 6.3.bis — Site : bloc « 🧩 Exemples de parcours (profils SYNTHÉTIQUES)…
  jamais des faits vérifiés » (CSS .peg-personas-note) après réponse locale,
  via POST /api/ia/recherche (k=2, catégorie persona-synthetique). Tests
  réels : question précise → fiche + persona correspondant ; bruit
  (« rezeugmuto qqqq xyz ») → réponse honnête SANS bloc personas ; console
  0 erreur ; sans serveur : aucun effet.
* 6.4 — Batterie de tests réaliste : IA\tests\batterie-personas.json
  (30 cas, ~41 885 octets), questions construites sur 30 profils variés,
  attendu = « pistes génériques sans chiffre inventé, jamais un persona
  cité comme source factuelle ». NON exécutée contre un vrai LLM (pas
  d'IA_KEY) : prête dès que la clé est posée puis serveur relancé.
* 6.5 — Fichiers d'origine préservés : 2 shards valides (magie PAR1), les
  2 .crdownload incomplets laissés tels quels, aucune écriture dans D:.

### 7. Mise au point « corrige bugs » (03/11/2026)

Bilan : les fonctions principales sont SAINES — re-testées en réel
question fraîche « apprentissage informatique montpellier » :
réponse locale + bloc « profils SYNTHÉTIQUES » affiché (le doute
d'une course à v=6 ne se reproduit pas ; le doute venait du sélecteur
`.msg.bot:last-child` qui rate à cause des méta-messages "ressources").
Console : seules erreurs = les 503 attendus (pas de clé IA).

Corrections réelles appliquées :

1. **Log serveur trompeur** : les envois « batterie-seule »
   (0 persona à indexer) s'écrivaient `import personas : +0 (paquet 0 …)`.
   Désormais : `batterie personas : N cas enregistres…` + `cas_batterie: N`
   dans la réponse HTTP. Vérifié en réel (renvoi du fichier batterie).
2. **Fuite mémoire convertisseur** : `duckdb.dropFile(<nom>)` après lecture
   (« mémoire libérée pour … »), pour les 2 modes.
3. **Serveur statique 8765** : vérifié actif.
4. **Serveur IA relancé** après patch : BOM UTF-8 préservé, 0 erreur de
   syntaxe (ParseFile).
5. **Renforcement RAG** (demande « utilise le fichier pour entraîner l'IA ») :
   sans clé impossible de ré-entraîner — renforcement choisit le chemin RAG :
   les réponses locales affichent désormais « 📚 Réponse construite depuis la
   base ARCEUS importée — fiche source : … » ; le serveur injecte au prompt
   LLM jusqu'à 5 fiches + 3 personas (seuil score abaissé 6 → 5).

Pas des bugs mais à savoir :

* Les 503 sur /api/ia/chat sont NORMAUX sans clé IA (cas prévu et testé).
* Le log du 24/10 « Primitive JSON non valide » = ancien test volontaire.
* Si le serveur IA est relancé, recharger le site (F5).

### 8. Incident OneDrive + reconstruction (03/11 soir)

Vers 21:04, suppression externe (OneDrive probable, nettoyage manuel
possible) des fichiers non-export du projet dans ARCEUS\IA\ :
fragments-personas.jsonl, personas\ (7 archives), batterie,
IA\outils\convertisseur.html, ancien serveur.log. L'export du site (cliqué
3 fois ce soir-là) n'écrit QUE fragments.jsonl + SQL : il ne supprime rien
(code vérifié). Mes premiers scripts de secours ont aussi créé — à cause
d'un .ps1 SANS BOM lu en ANSI — un dossier PARASITE « Projet par dÃ©faut »
(double-encodage) : entièrement supprimé ; le vrai projet est intact.

Reconstruction complète (graine repeatable 12345 → échantillon identique) :
fragments-personas.jsonl 2400 lignes (3,92 Mo), 7 archives, batterie 30 cas
(41 885 o = taille d'origine), convertisseur restauré depuis le DOM de
l'onglet ouvert puis corrective réappliquée. Serveur : 3097 fragments,
recherche personas OK (« immobilier beziers » → persona::f55a546d).

2 vrais bugs corrigés en passant :

1. **Route parquet** : 231 Mo parfois cassés (« octets à écrire dépassent
   Content-Length ») si le client coupe. Désormais SendChunked > 1 Mo.
   Validé : les 2 parquets téléchargés sans erreur.
2. **Convertisseur — inventaire empilé** : chaque retouche du champ
   « serveur » ré-ajoutait des cases sans vider → un parquet pouvait partir
   2-3 fois. Désormais : vidage avant rendu + jeton anti-réponse périmée +
   dédoublonnage de distantsChoisis(). Validé : 2 cases après 3 rendus,
   import final = 2400 exacts.

Bouclier durable : copie complète HORS OneDrive dans D:\ARCEUS-secours\
(site, convertisseur, fragments, 7 archives personas, batterie). En cas de
nouvelle suppression : restaurer depuis là, ou la Corbeille OneDrive
(onedrive.live.com → Corbeille).

— rapport reconstruit le 03/11/2026 après incident, session agent Opencode.
