/* ============================================================
   OrientPro — Données des secteurs et questionnaire
   ============================================================ */

const SECTEURS = {
  sante: {
    id: "sante",
    emoji: "🩺",
    titre: "Santé & Médecine",
    resume:
      "Un secteur régi par la rigueur et l'humain. Tu passes de longues années d'études, mais tu repars avec un métier stable, respecté et profondément utile.",
    points: [
      "Études longues et sélectionnée (concours, stages cliniques)",
      "Fort lien humain : soigner, écouter, rassurer",
      "Secteur en tension : les débouchés sont quasi garantis",
      "Responsabilité importante et stress parfois élevé",
    ],
    metiers: [
      { nom: "Médecin généraliste", etudes: "6 ans après le bac (2e cycle)", salaire: "2 500 – 4 500 € / mois" },
      { nom: "Chirurgien", etudes: "8 à 11 ans après le bac", salaire: "4 000 – 8 000 € / mois" },
      { nom: "Infirmier·ère", etudes: "3 ans (IFSI) + concours", salaire: "1 800 – 2 600 € / mois" },
      { nom: "Masseur-kinésithérapeute", etudes: "5 ans après le bac", salaire: "1 900 – 3 200 € / mois" },
      { nom: "Biologiste médical", etudes: "6 ans (biologie médicale)", salaire: "2 800 – 5 000 € / mois" },
      { nom: "Dentiste", etudes: "6 ans après le bac", salaire: "3 000 – 6 000 € / mois" },
      { nom: "Pharmacien", etudes: "6 ans après le bac", salaire: "2 500 – 4 000 € / mois" },
      { nom: "Sage-femme", etudes: "5 ans après le bac", salaire: "2 200 – 3 500 € / mois" },
      { nom: "Aide-soignant·e", etudes: "1 an (débouché rapide)", salaire: "1 600 – 2 100 € / mois" },
    ],
    formations: [
      "Bac général (spécialités SVT, Physique-Chimie, Maths)",
      "Pass / Pacès — 1re année de médecine (sélection par concours)",
      "Licence Sciences de la vie ou Staps (alternative)",
      "Écoles paramédicales : IFSI, écoles de kiné, de sage-femme",
      "Diplômes d'État : ASH, AUX (formations courtes, 10 à 24 mois)",
    ],
    qualites: [
      "Rigueur et mémoire",
      "Empathie et écoute",
      "Gestion du stress",
      "Goût du travail en équipe",
      "Sens de l'éthique",
    ],
  },

  industrie: {
    id: "industrie",
    emoji: "⚙️",
    titre: "Industrie",
    resume:
      "Concevoir, fabriquer, maintenir. L'industrie recrute énormément et valorise les profils qui aiment le concret, la technique et la résolution de problèmes.",
    points: [
      "Bac+2 suffit pour beaucoup de postes bien payés",
      "Recrutement massif : les usines manquent de bras qualifiés",
      "Travail concret : tu vois le résultat de ce que tu fais",
      "Conditions parfois difficiles (bruit, chaleur, horaires décalés)",
    ],
    metiers: [
      { nom: "Opérateur·rice de production", etudes: "CAP / BEP (dès la 3e)", salaire: "1 600 – 2 200 € / mois" },
      { nom: "Technicien·ne de maintenance", etudes: "Bac Pro / BTU (2 ans)", salaire: "1 800 – 2 600 € / mois" },
      { nom: "Soudeur·se qualifié·e", etudes: "CAP / CQP (1 à 2 ans)", salaire: "1 900 – 3 000 € / mois" },
      { nom: "Mécanicien·ne industriel·le", etudes: "Bac Pro / BTS (2 ans)", salaire: "1 800 – 2 700 € / mois" },
      { nom: "Électrotechnicien·ne", etudes: "Bac Pro / BTS (2 ans)", salaire: "1 900 – 2 800 € / mois" },
      { nom: "Contrôleur·se qualité", etudes: "BTS / BUT qualité", salaire: "1 900 – 3 000 € / mois" },
      { nom: "Chef·fe d'équipe", etudes: "Bac + expérience (5 ans)", salaire: "2 300 – 3 500 € / mois" },
      { nom: "Ingénieur·e production", etudes: "Bac+5 (école d'ingénieurs)", salaire: "3 200 – 5 500 € / mois" },
      { nom: "Ingénieur·e méthodes / lean", etudes: "Bac+5 (école d'ingénieurs)", salaire: "3 300 – 5 800 € / mois" },
    ],
    formations: [
      "CAP / BEP — accès direct après la 3e (2 ans)",
      "Bac Pro Maintenance des véhicules, Électrotechnique…",
      "BTU / Bac Technologique STI2D (2 ans)",
      "BTS, BUT (ex DUT) en mécanique, production, qualité",
      "École d'ingénieurs (5 ans après le bac) pour l'encadrement",
      "Alternance : le format le plus courant dans ce secteur",
    ],
    qualites: [
      "Goût du manuel et du concret",
      "Sens de la sécurité",
      "Rigueur et méthode",
      "Résolution de problèmes",
      "Travail en équipe",
    ],
  },

  prive: {
    id: "prive",
    emoji: "💼",
    titre: "Secteur privé",
    resume:
      "Entreprises, commerce, banque, communication, gestion. Le champ est immense : tu peux changer de métier plusieurs fois sans reprendre zéro.",
    points: [
      "Accès très large : du CAP au Bac+5, toutes les portes existent",
      "Mobilité rapide si tu es proactif·ve",
      "Fort contact humain : clients, équipe, négociation",
      "Résultats et chiffres souvent au centre des performances",
    ],
    metiers: [
      { nom: "Commercial·e", etudes: "Bac Pro / BTS (2 ans)", salaire: "1 600 – 3 000 € / mois (+ variable)" },
      { nom: "Chargé·e de clientèle", etudes: "BTS / Bachelor (2 à 3 ans)", salaire: "1 800 – 2 600 € / mois" },
      { nom: "Comptable / A-comptable", etudes: "BTS CG (2 ans)", salaire: "1 800 – 3 000 € / mois" },
      { nom: "Assistant·e de gestion", etudes: "BTS / BUT (2 à 3 ans)", salaire: "1 700 – 2 400 € / mois" },
      { nom: "Chargé·e de communication", etudes: "Bac+3 à Bac+5", salaire: "2 000 – 3 200 € / mois" },
      { nom: "Community manager", etudes: "Bac+2 à Bac+5", salaire: "1 800 – 2 800 € / mois" },
      { nom: "Analyste marketing", etudes: "Bac+3 à Bac+5", salaire: "2 200 – 3 500 € / mois" },
      { nom: "Gestionnaire de paie", etudes: "Bac+2 à Bac+3", salaire: "2 000 – 3 000 € / mois" },
      { nom: "Chef·fe de projet", etudes: "Bac+5 (master / école de commerce)", salaire: "3 000 – 5 000 € / mois" },
    ],
    formations: [
      "Bac Pro Commerce, Gestion-administration, Maintenance…",
      "BTS MCO, NDRC, CG, TSV (2 ans, très employable)",
      "BUT GEA, TC, GPA (3 ans, ancien DUT)",
      "Bachelor en école de commerce (3 ans)",
      "Master / école de commerce (5 ans) pour l'encadrement",
      "Licences pro : communication, e-commerce, ressources humaines",
    ],
    qualites: [
      "Aisance relationnelle",
      "Organisation et rigueur",
      "Sens du chiffre et de la vente",
      "Autonomie et initiative",
      "Adaptabilité",
    ],
  },
};

/* ------------------------------------------------------------
   Questionnaire : chaque réponse attribue des points
   aux secteurs (sante / industrie / prive)
   ------------------------------------------------------------ */
const QUIZ = [
  {
    q: "Qu'est-ce qui t'attire le plus ?",
    options: [
      { texte: "Aider les gens à aller mieux", pts: { sante: 2 } },
      { texte: "Réparer, construire, fabriquer", pts: { industrie: 2 } },
      { texte: "Vendre, convaincre, négocier", pts: { prive: 2 } },
    ],
  },
  {
    q: "Quelle matière préfères-tu ?",
    options: [
      { texte: "SVT et les sciences de la vie", pts: { sante: 2 } },
      { texte: "Technologie et physique appliquée", pts: { industrie: 2 } },
      { texte: "Économie, gestion, langues", pts: { prive: 2 } },
    ],
  },
  {
    q: "Comment réagis-tu face au sang ou à une situation d'urgence ?",
    options: [
      { texte: "Je reste calme, ça ne me dérange pas", pts: { sante: 2 } },
      { texte: "Je préfère réparer la cause du problème", pts: { industrie: 1, sante: 1 } },
      { texte: "Je préfère prendre du recul et organiser", pts: { prive: 2 } },
    ],
  },
  {
    q: "Ton rapport au travail manuel :",
    options: [
      { texte: "J'aime être plutôt sur le terrain", pts: { industrie: 2 } },
      { texte: "Ça me convient si c'est précis et utile", pts: { sante: 1, industrie: 1 } },
      { texte: "Je préfère le bureau, l'écran et les échanges", pts: { prive: 2 } },
    ],
  },
  {
    q: "Combien d'années d'études es-tu prêt·e à faire ?",
    options: [
      { texte: "Le maximum, si le métier me passionne", pts: { sante: 2 } },
      { texte: "2 à 3 ans, et travailler vite", pts: { industrie: 2, prive: 1 } },
      { texte: "3 à 5 ans, avec de la mobilité", pts: { prive: 2, industrie: 1 } },
    ],
  },
  {
    q: "Quel rythme de travail te conviendrait ?",
    options: [
      { texte: "Horaires décalés, astreintes, week-ends", pts: { sante: 2 } },
      { texte: "Équipes de nuit ou horaires postés", pts: { industrie: 2 } },
      { texte: "Horaires de bureau, classiques", pts: { prive: 2 } },
    ],
  },
  {
    q: "Face à un problème, tu…",
    options: [
      { texte: "Cherches d'abord la cause médicale ou humaine", pts: { sante: 2 } },
      { texte: "Ouvres la machine et tu diagnostiques", pts: { industrie: 2 } },
      { texte: "Analyses les données et fais un tableau", pts: { prive: 2 } },
    ],
  },
  {
    q: "Ce qui compte le plus dans un emploi :",
    options: [
      { texte: "La stabilité et le sens du service", pts: { sante: 2 } },
      { texte: "La sécurité de l'emploi et le salaire fixe", pts: { industrie: 2 } },
      { texte: "L'évolution rapide et la variété", pts: { prive: 2 } },
    ],
  },
  {
    q: "En groupe, tu es plutôt…",
    options: [
      { texte: "Celui / celle qui rassure et écoute", pts: { sante: 2 } },
      { texte: "Celui / celle qui bricole et organise le matériel", pts: { industrie: 2 } },
      { texte: "Celui / celle qui parle, présente et convainc", pts: { prive: 2 } },
    ],
  },
  {
    q: "Ton projet idéal dans 5 ans :",
    options: [
      { texte: "Exercer dans un hôpital, une clinique ou un cabinet", pts: { sante: 3 } },
      { texte: "Travailler dans une usine, un atelier ou un chantier", pts: { industrie: 3 } },
      { texte: "Évoluer dans une entreprise, créer mon activité", pts: { prive: 3 } },
    ],
  },
];
