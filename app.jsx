const { useState, useRef, useEffect, useCallback } = React;

const PRAXIS = [
  { cat: "💼 Business & Beruf", color: "#8b5cf6", items: [
    { title: "E-Mail-Antworten automatisieren", desc: "Professionelle E-Mails für Beschwerden, Anfragen, Follow-ups.", prompt: "Du bist mein E-Mail-Assistent. Schreibe eine professionelle, freundliche Antwort auf folgende Kunden-Beschwerde:\n\n[Beschwerde hier einfügen]\n\nTon: Empathisch, lösungsorientiert\nLänge: 150-200 Wörter\nEnde mit einem konkreten nächsten Schritt.", tool: "ChatGPT / Claude", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Meeting-Protokolle erstellen", desc: "Strukturiertes Protokoll mit Action Items aus Notizen.", prompt: "Erstelle aus folgenden Meeting-Notizen ein strukturiertes Protokoll:\n\n[Notizen hier]\n\nFormat:\n1. Teilnehmer\n2. Besprochene Themen (je 2-3 Sätze)\n3. Entscheidungen\n4. Action Items (Wer / Was / Bis wann)\n5. Nächster Termin", tool: "Claude / ChatGPT", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Bewerbung optimieren", desc: "KI passt Lebenslauf und Anschreiben auf eine Stelle an.", prompt: "Ich bewerbe mich auf folgende Stelle:\n[Stellenausschreibung]\n\nMein Lebenslauf:\n[Lebenslauf]\n\nBitte:\n1. Fehlende Keywords identifizieren\n2. 3 passende Bullet-Points formulieren\n3. Anschreiben (250 Wörter) schreiben", tool: "Claude / ChatGPT", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Wettbewerbsanalyse", desc: "Konkurrenten systematisch analysieren und Chancen finden.", prompt: "Erstelle eine Wettbewerbsanalyse:\n\nMein Produkt: [Beschreibung]\nKonkurrenten: [Namen]\n\nPro Konkurrent: Stärken, Schwächen, Preismodell, USP\nLeite 5 Chancen für mich ab.", tool: "ChatGPT + Perplexity", level: "Fortgeschritten", needs: "Modul 3.2" },
    { title: "Prozesse automatisieren", desc: "KI identifiziert Automatisierungspotenziale in deinen Workflows.", prompt: "Analysiere meinen Geschäftsprozess und schlage KI-Automatisierungen vor:\n\nProzess: [Beschreibung]\n\nPro Schritt: Welches Tool? Zeitgewinn? Aufwand (1-5)? Nächster Schritt?", tool: "Claude + Make.com", level: "Fortgeschritten", needs: "Modul 4.1" },
    { title: "KI-Beratungsangebot schreiben", desc: "Professionelles Angebot für einen Beratungskunden.", prompt: "Erstelle ein KI-Beratungsangebot:\n\nKunde: [Branche, Größe]\nProblem: [Was lösen?]\nBudget: [Rahmen]\n\nInhalt: Problemzusammenfassung, KI-Lösung (2-3 Optionen), Projektphasen, Preise, ROI, nächste Schritte.", tool: "Claude", level: "Profi", needs: "Modul 8.1" },
  ]},
  { cat: "📝 Content & Marketing", color: "#f43f5e", items: [
    { title: "Social Media Content-Plan", desc: "Kompletter Monatsplan mit Posts, Hooks und Hashtags.", prompt: "Erstelle einen 4-Wochen Social-Media-Plan:\n\nBranche: [z.B. Fitness]\nPlattformen: Instagram + LinkedIn\nZielgruppe: [Beschreibung]\n\nPro Woche: 3 IG Posts (Hook + Caption + Hashtags), 2 LinkedIn Posts, 1 Story-Idee\nMix: 60% Educational, 30% Entertaining, 10% Promotional", tool: "ChatGPT / Claude", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "SEO-Blogartikel", desc: "Keyword-optimierter Artikel mit Struktur und Meta-Description.", prompt: "Schreibe einen SEO-Blogartikel:\n\nKeyword: [Hauptkeyword]\nZielgruppe: [Beschreibung]\nLänge: 1500 Wörter\n\nMit: H1 mit Keyword, Meta-Description, H2/H3, Intro mit Hook, Praxisbeispiele, FAQ (3 Fragen), CTA", tool: "Claude / ChatGPT", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Komplettes Branding", desc: "Tagline, Brand Voice, Farbpalette — alles in einem Prompt.", prompt: "Entwickle ein Branding-Konzept:\n\nUnternehmen: [Name + Branche]\nWerte: [3 Werte]\nZielgruppe: [Beschreibung]\n\nErstelle: 5 Taglines, Brand Voice Guide, Farbpalette (3 Hex-Codes), Logo-Briefing, Elevator Pitch (30 Sek)", tool: "Claude + Midjourney", level: "Fortgeschritten", needs: "Modul 2.2 + 3.2" },
    { title: "Video-Skript + KI-Avatar", desc: "Skript schreiben und Video mit HeyGen/Synthesia produzieren.", prompt: "Schreibe ein 90-Sekunden Erklärvideo-Skript:\n\nThema: [Beschreibung]\nStil: Professionell, nahbar\n\nStruktur: Hook (5 Sek), Problem, Lösung, 3 Benefits, Social Proof, CTA\nAls Teleprompter-Text mit [PAUSE]-Markierungen.", tool: "Claude + HeyGen", level: "Fortgeschritten", needs: "Modul 2.3" },
  ]},
  { cat: "💻 Entwicklung", color: "#10b981", items: [
    { title: "Landing Page generieren", desc: "Komplette HTML/CSS Landing Page mit KI.", prompt: "Erstelle eine moderne Landing Page (HTML/CSS/Tailwind CDN):\n\nProdukt: [Beschreibung]\nZiel: Newsletter-Anmeldungen\nSections: Hero + CTA, 3 Features, Testimonials, FAQ Accordion, Footer\nMobile-first, Dark Theme, Smooth Scroll", tool: "Claude / Bolt.new", level: "Einsteiger", needs: "Modul 7.1" },
    { title: "Python Datenanalyse", desc: "CSV einlesen, auswerten, Diagramme erstellen.", prompt: "Python-Skript:\n1. CSV einlesen (Datum, Umsatz, Kategorie)\n2. Monatliche Umsätze pro Kategorie\n3. Top/Flop 5 Produkte\n4. Trend mit gleitendem Durchschnitt\n5. 3 Matplotlib-Charts\n6. Report als Text\n\nNutze pandas, matplotlib. Deutsche Kommentare.", tool: "Claude Code", level: "Fortgeschritten", needs: "Modul 6.1" },
    { title: "Website-Chatbot bauen", desc: "Chatbot mit eigenen FAQ-Daten für deine Website.", prompt: "Chatbot für meine Website:\n\nBusiness: [Beschreibung]\nTypische Fragen: [5-10 Beispiele]\n\nErstelle: Conversation Flow, Knowledge Base (20 FAQs), Fallback-Antworten, Setup-Anleitung für Botpress", tool: "Botpress / Tidio", level: "Fortgeschritten", needs: "Modul 5.1" },
    { title: "Multi-Agenten Research", desc: "Team aus KI-Agenten das automatisch recherchiert.", prompt: "CrewAI Research-Team (3 Agenten):\n\nAgent 1 'Researcher': Web durchsuchen\nAgent 2 'Analyst': Infos bewerten\nAgent 3 'Writer': 500-Wort-Bericht\n\nThema: [z.B. KI-Trends Einzelhandel 2026]\nOutput: Markdown + Quellen", tool: "Python + CrewAI", level: "Profi", needs: "Modul 6.2" },
    { title: "RAG für Firmenwissen", desc: "Mitarbeiter stellen Fragen an Firmendokumente.", prompt: "RAG-System (Python + LangChain + ChromaDB):\n\n1. PDFs einlesen + chunken\n2. Embeddings in ChromaDB\n3. Chat-Interface für Fragen\n4. Quelle (Dokument + Seite) angeben\n5. 'Weiß ich nicht' wenn nicht in Docs", tool: "Python + LangChain", level: "Profi", needs: "Modul 6.3" },
  ]},
  { cat: "🏠 Privat & Alltag", color: "#f59e0b", items: [
    { title: "Reiseplanung", desc: "Komplette Reise: Route, Hotels, Budget, Packliste.", prompt: "Plane eine 7-Tage-Reise:\n\nZiel: [Land]\nBudget: [pro Person]\nInteressen: [z.B. Essen, Kultur]\n\nErstelle: Tagesplan, Hotel-Tipps, Kosten/Tag, Packliste, 5 nützliche Sätze, Food-Guide", tool: "ChatGPT / Perplexity", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Persönlicher Lernplan", desc: "30-Tage-Lernplan für jedes Thema.", prompt: "30-Tage-Lernplan:\n\nThema: [z.B. Python]\nVorkenntnisse: [Level]\nZeit/Tag: [z.B. 45 Min]\n\nPro Tag: Thema, Lernmethode + Link, Mini-Projekt, Zeit\nMeilensteine alle 7 Tage.", tool: "Claude / ChatGPT", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Kochen nach Zutaten", desc: "Kreative Rezepte aus vorhandenen Zutaten.", prompt: "Zutaten: [Liste]\n\n3 Rezepte:\n1. Schnell (unter 20 Min)\n2. Restaurant-Niveau\n3. Meal-Prep (3 Tage)\n\nJeweils: Zubereitungszeit, Schritte, Nährwerte, Pro-Tipp", tool: "ChatGPT / Claude", level: "Einsteiger", needs: "Modul 1.3" },
    { title: "Fitness-Plan", desc: "Individueller Trainings- und Ernährungsplan.", prompt: "Fitness + Ernährungsplan:\n\nZiel: [Muskelaufbau/Abnehmen]\nAktuell: [Gewicht, Level]\nVerfügbar: [Gym/Home]\nZeit: [4x/Woche, 45 Min]\n\nErstelle: Wochenplan, 5-Tage-Ernährung + Makros, Einkaufsliste, 3 Meal-Prep Rezepte", tool: "ChatGPT / Claude", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Verträge prüfen", desc: "KI erklärt Verträge und schreibt Kündigungen.", prompt: "Prüfe diesen Vertrag:\n[Text]\n\n1. Wichtigste Punkte in einfacher Sprache\n2. Problematische Klauseln + Risiken\n3. Was fehlt?\n4. Schreibe eine [Kündigung/Antwort]\n\nHinweis: Keine Rechtsberatung.", tool: "Claude / ChatGPT", level: "Einsteiger", needs: "Modul 1.3" },
  ]},
  { cat: "📊 Daten & Analyse", color: "#06b6d4", items: [
    { title: "Excel mit KI auswerten", desc: "Tabellen hochladen und Insights finden.", prompt: "Analysiere diese Daten:\n[Tabelle/CSV]\n\n1. Wichtigste Kennzahlen\n2. Trends + Auffälligkeiten\n3. Vergleich Vorperiode\n4. 3 Handlungsempfehlungen\n5. Passende Visualisierung", tool: "ChatGPT Advanced", level: "Einsteiger", needs: "Modul 3.1" },
    { title: "Marktforschung", desc: "KI + Websuche für fundierte Marktanalysen.", prompt: "Marktanalyse:\n\nBranche: [z.B. E-Learning DACH]\n\nErstelle: Marktgröße, Top 10 Wettbewerber, 5 Trends, SWOT für Neueinsteiger, Markteintritts-Strategie\nMit Quellen.", tool: "Perplexity / ChatGPT", level: "Fortgeschritten", needs: "Modul 3.2" },
  ]},
  { cat: "🎨 Kreativ", color: "#ec4899", items: [
    { title: "Produktfotos generieren", desc: "Fotorealistische Produktbilder für Shop/Social.", prompt: "Produktfoto:\n\nProdukt: [z.B. schwarze Armbanduhr]\nStil: Lifestyle auf Marmortisch, Morgenlicht\nHintergrund: Blurred Coffee-Shop\nKamera: 85mm, f/1.8, geringe Tiefenschärfe", tool: "Midjourney / DALL-E", level: "Einsteiger", needs: "Modul 2.2" },
    { title: "Musik für Content", desc: "Lizenzfreie Musik passend zu Videos.", prompt: "Song erstellen:\n\nStil: [z.B. Lo-fi Chill-Hop]\nStimmung: Entspannt, motivierend\nLänge: 60 Sekunden\nAufbau: 0-10s sanft, 10-40s Hauptteil, 40-60s Ausklang", tool: "Suno / Udio", level: "Einsteiger", needs: "Modul 2.3" },
    { title: "Brand-Video produzieren", desc: "Vom Skript bis zum fertigen Video mit KI.", prompt: "60-Sek Brand-Video Pipeline:\n\n1. Skript (Claude)\n2. Voice-Over (ElevenLabs)\n3. B-Roll (Runway)\n4. Musik (Suno)\n5. Thumbnail (Midjourney)\n\nThema: [Beschreibung]\nTon: [z.B. inspirierend]", tool: "Claude + ElevenLabs + Runway", level: "Profi", needs: "Modul 2.3 + 3.2" },
  ]},
];

const QUIZZES = {
  "1.1": [{ q: "Unterschied KI vs. ML?", opts: ["KI ist Teil von ML", "ML ist Teil von KI", "Kein Unterschied", "ML nur für Bilder"], ans: 1 }, { q: "Was ist starke KI?", opts: ["Viel Rechenleistung", "Löst jede Aufgabe wie Mensch", "Verschlüsselt", "Großer Kontext"], ans: 1 }],
  "1.2": [{ q: "Supervised Learning?", opts: ["Ohne Daten", "Gelabelte Beispiele", "Durch Belohnung", "Kopiert KIs"], ans: 1 }, { q: "Was ist Overfitting?", opts: ["Modell zu klein", "Daten auswendig gelernt", "Zu wenig Daten", "Zu schnell"], ans: 1 }],
  "1.3": [{ q: "Was ist ein Token?", opts: ["Passwort", "Texteinheit", "Pixel", "Befehl"], ans: 1 }, { q: "KI-Halluzinationen?", opts: ["Fieber", "Falsche Fakten erfinden", "Bilder generieren", "Langsam werden"], ans: 1 }],
  "2.1": [{ q: "Beste Code-Qualität?", opts: ["ChatGPT", "Gemini", "Claude", "Grok"], ans: 2 }],
  "2.2": [{ q: "Lokal kostenlose Bild-KI?", opts: ["DALL-E", "Midjourney", "Stable Diffusion", "Ideogram"], ans: 2 }],
  "2.3": [{ q: "Bestes Voice Cloning?", opts: ["Suno", "Whisper", "ElevenLabs", "Runway"], ans: 2 }],
  "2.4": [{ q: "Bester KI-Einstieg?", opts: ["API kaufen", "Free-Pläne testen", "$300 Plan", "Nur YouTube"], ans: 1 }],
  "3.1": [{ q: "Few-Shot Prompt?", opts: ["Ohne Beispiele", "Wenige Beispiele", "Kurzer Prompt", "Bild-Prompt"], ans: 1 }],
  "3.2": [{ q: "Chain-of-Thought?", opts: ["Mehrere Prompts", "Schrittweises Denken", "Ketten-Emoji", "Auto-Prompt"], ans: 1 }],
  "4.1": [{ q: "Kein Automation-Tool?", opts: ["Make.com", "n8n", "Zapier", "Midjourney"], ans: 3 }],
  "4.2": [{ q: "Custom GPT braucht?", opts: ["Programmieren", "Instruktionen + KB", "Server", "Enterprise"], ans: 1 }],
  "5.1": [{ q: "Social Media Bot?", opts: ["Rasa", "ManyChat", "Dialogflow", "Intercom"], ans: 1 }],
  "5.2": [{ q: "Omnichannel-Bot?", opts: ["Eine Plattform", "Mehrere Kanäle", "Nur Text", "Ohne KI"], ans: 1 }],
  "5.3": [{ q: "RAG bei Chatbots?", opts: ["Framework", "KI + eigene Daten", "Design", "Bezahlung"], ans: 1 }],
  "5.4": [{ q: "White-Label-Bot?", opts: ["Ohne Farben", "Eigene Marke", "Nur WA", "Kostenlos"], ans: 1 }],
  "6.1": [{ q: "Python-Lib für APIs?", opts: ["pandas", "requests", "matplotlib", "numpy"], ans: 1 }],
  "6.2": [{ q: "CrewAI ist?", opts: ["Bild-Gen", "Multi-Agent Framework", "Widget", "Editor"], ans: 1 }],
  "6.3": [{ q: "Vektor-DB speichert?", opts: ["Bilder", "Text-Embeddings", "Videos", "Passwörter"], ans: 1 }],
  "7.1": [{ q: "KI-Demos mit?", opts: ["Photoshop", "Streamlit", "Excel", "PPT"], ans: 1 }],
  "7.2": [{ q: "Vercel AI SDK?", opts: ["Bild-Tool", "KI-Web-App Framework", "DB", "Chat-Plugin"], ans: 1 }],
  "7.3": [{ q: "MCP steht für?", opts: ["Multi Chat", "Model Context Protocol", "Machine Code", "Mobile Chat"], ans: 1 }],
  "8.1": [{ q: "KI-Strategie startet mit?", opts: ["Günstigste KI", "Use Cases priorisieren", "MA entlassen", "Logo"], ans: 1 }],
  "8.2": [{ q: "EU AI Act regelt?", opts: ["Preise", "Risikoklassen", "Internet", "Social Media"], ans: 1 }],
  "8.3": [{ q: "Erster Schritt Berater?", opts: ["Werbung", "Nische finden", "Tools kaufen", "Podcast"], ans: 1 }],
};

const AI_TOOLS = {
  textKIs: [
    { name: "ChatGPT", provider: "OpenAI", free: "✅ (limitiert)", proPlan: "$20/Mo", premiumPlan: "$200/Mo", best: "Allrounder, Plugins", context: "128K" },
    { name: "Claude", provider: "Anthropic", free: "✅ (Tageslimit)", proPlan: "$20/Mo", premiumPlan: "$100-200/Mo", best: "Code, Texte, Analyse", context: "200K-1M" },
    { name: "Gemini", provider: "Google", free: "✅", proPlan: "$20/Mo", premiumPlan: "$250/Mo", best: "Google, Multimodal", context: "1M" },
    { name: "Grok", provider: "xAI", free: "✅", proPlan: "$30/Mo", premiumPlan: "$300/Mo", best: "Social Media", context: "128K" },
    { name: "Perplexity", provider: "Perplexity", free: "✅", proPlan: "$20/Mo", premiumPlan: "-", best: "Recherche", context: "Var." },
    { name: "DeepSeek", provider: "DeepSeek", free: "✅ OS", proPlan: "API", premiumPlan: "-", best: "Preis/Leistung", context: "128K" },
  ],
  bildKIs: [
    { name: "DALL-E 3", preis: "In ChatGPT", best: "Fotorealistisch" },
    { name: "Midjourney", preis: "$10+/Mo", best: "Ästhetik" },
    { name: "Flux", preis: "Teils free", best: "Open Source" },
    { name: "Stable Diffusion", preis: "Kostenlos", best: "Lokal" },
  ],
  videoKIs: [
    { name: "Sora", preis: "In ChatGPT", best: "Text zu Video" },
    { name: "Runway", preis: "$12+/Mo", best: "Video-Edit" },
    { name: "HeyGen", preis: "$24+/Mo", best: "Avatare" },
  ],
  audioKIs: [
    { name: "ElevenLabs", preis: "$5+/Mo", best: "Voice Clone" },
    { name: "Suno", preis: "$10+/Mo", best: "Musik" },
    { name: "Whisper", preis: "Free", best: "Transkription" },
  ],
  codingKIs: [
    { name: "Claude Code", preis: "API", best: "Agentic Coding" },
    { name: "Cursor", preis: "$20+/Mo", best: "KI-Editor" },
    { name: "Copilot", preis: "$10+/Mo", best: "IDE" },
    { name: "Bolt.new", preis: "Freemium", best: "Browser-Apps" },
  ],
  chatbotPlatforms: [
    { name: "Botpress", typ: "Low-Code", preis: "Free/$77+", channels: "Web, WA, Slack", best: "KI-Bots", level: "Mittel" },
    { name: "Voiceflow", typ: "No-Code", preis: "Free/$60+", channels: "Web, Voice", best: "Prototyping", level: "Einsteiger" },
    { name: "ManyChat", typ: "No-Code", preis: "Free/$15+", channels: "IG, FB, WA", best: "Social Media", level: "Einsteiger" },
    { name: "Tidio", typ: "No-Code", preis: "Free/$29+", channels: "Web, Mail", best: "E-Commerce", level: "Einsteiger" },
    { name: "Intercom", typ: "SaaS", preis: "$39+/Seat", channels: "Web, Mobile", best: "Enterprise", level: "Profi" },
    { name: "Rasa", typ: "OSS", preis: "Free/$35K+", channels: "Custom", best: "Kontrolle", level: "Profi" },
  ],
};

const CURRICULUM = [
  { id: 1, phase: "GRUNDLAGEN", pl: "Phase 1", icon: "🧠", col: "#0ea5e9", mods: [
    { id: "1.1", t: "Was ist KI?", dur: "~45m", desc: "KI, ML, Deep Learning verstehen.", topics: ["KI vs. ML vs. DL", "Geschichte", "Schwache/Starke KI", "Beispiele"], vids: [{ t: "KI in 5 Min", url: "https://www.youtube.com/embed/3lMBEMoUMWY", ch: "simpleclub" }, { t: "ML erklärt", url: "https://www.youtube.com/embed/UZe0tMJxrFY", ch: "Morpheus" }], prac: "Mind-Map aller KI-Begriffe erstellen.", res: ["KI-Campus", "Elements of AI"], tools: null },
    { id: "1.2", t: "Wie Maschinen lernen", dur: "~60m", desc: "Supervised, Unsupervised, Reinforcement.", topics: ["Supervised", "Unsupervised", "Reinforcement", "Overfitting"], vids: [{ t: "Wie lernen Maschinen?", url: "https://www.youtube.com/embed/nIxCBSEdUaM", ch: "Informatik" }, { t: "Neuronale Netze", url: "https://www.youtube.com/embed/quer0hJAVOg", ch: "Morpheus" }], prac: "Google Teachable Machine ausprobieren.", res: ["Teachable Machine", "Kaggle"], tools: null },
    { id: "1.3", t: "Generative KI & LLMs", dur: "~60m", desc: "ChatGPT, Claude, Gemini verstehen.", topics: ["Transformer", "Tokens", "Modell-Vergleich", "Halluzinationen"], vids: [{ t: "ChatGPT erklärt", url: "https://www.youtube.com/embed/BhKGv-ikPHo", ch: "Breaking Lab" }, { t: "Modelle Vergleich", url: "https://www.youtube.com/embed/kEv6olSBsJk", ch: "Noel Lang" }], prac: "Selben Prompt in 3 KIs testen.", res: ["OpenAI", "Claude.ai", "Gemini"], tools: null },
  ]},
  { id: 2, phase: "KI-ATLAS", pl: "Phase 2", icon: "🗺️", col: "#f43f5e", mods: [
    { id: "2.1", t: "Text-KIs Vergleich", dur: "~60m", desc: "Alle Text-KIs mit Preisen.", topics: ["ChatGPT", "Claude", "Gemini", "Grok, Perplexity, DeepSeek"], vids: [{ t: "KI-Vergleich", url: "https://www.youtube.com/embed/kEv6olSBsJk", ch: "Noel Lang" }, { t: "Welche KI?", url: "https://www.youtube.com/embed/W0B4sfrpgn8", ch: "Noel Lang" }], prac: "5 Aufgaben in jeder KI testen.", res: ["openai.com", "claude.ai"], tools: "textKIs" },
    { id: "2.2", t: "Bild-KIs", dur: "~45m", desc: "Midjourney, DALL-E, Flux.", topics: ["DALL-E 3", "Midjourney", "Flux", "Stable Diffusion"], vids: [{ t: "Midjourney Tutorial", url: "https://www.youtube.com/embed/fXJgkvXMvyo", ch: "Simon Ong" }, { t: "Bild-KIs", url: "https://www.youtube.com/embed/EAvXqBkEGHk", ch: "KI Kompass" }], prac: "Selbes Motiv in 4 Tools.", res: ["Midjourney", "Leonardo.ai"], tools: "bildKIs" },
    { id: "2.3", t: "Video/Audio/Code-KIs", dur: "~60m", desc: "Sora, ElevenLabs, Cursor.", topics: ["Video-KIs", "Audio-KIs", "Code-KIs", "Wann welches?"], vids: [{ t: "KI-Videos", url: "https://www.youtube.com/embed/EAvXqBkEGHk", ch: "KI Kompass" }, { t: "Coding-KIs", url: "https://www.youtube.com/embed/SstY1Jnpqjc", ch: "Noel Lang" }], prac: "Content-Paket mit 4 Tools.", res: ["Runway", "ElevenLabs", "Cursor"], tools: "multiKIs" },
    { id: "2.4", t: "Welche KI für wen?", dur: "~45m", desc: "Budget-Guide Einsteiger bis Profi.", topics: ["Free-Pläne", "$20/Mo Tier", "Multi-KI Profi", "Budget-Tipps"], vids: [{ t: "Beste Tools", url: "https://www.youtube.com/embed/W0B4sfrpgn8", ch: "Noel Lang" }, { t: "KI kostenlos", url: "https://www.youtube.com/embed/s6dCWrP0nik", ch: "Noel Lang" }], prac: "Eigenen KI-Stack erstellen.", res: ["theresanaiforthat.com"], tools: null },
  ]},
  { id: 3, phase: "PROMPTS", pl: "Phase 3", icon: "✍️", col: "#8b5cf6", mods: [
    { id: "3.1", t: "Prompt Basics", dur: "~45m", desc: "Effektive Prompts schreiben.", topics: ["Prompt-Anatomie", "Zero/Few-Shot", "System-Prompts", "Rollen"], vids: [{ t: "Grundlagen", url: "https://www.youtube.com/embed/1bk_0d3_4Rs", ch: "KI Kompass" }, { t: "Anfänger", url: "https://www.youtube.com/embed/s6dCWrP0nik", ch: "Noel Lang" }], prac: "10 Prompts für eine Aufgabe.", res: ["Anthropic Library", "LearnPrompting"], tools: null },
    { id: "3.2", t: "Advanced Prompting", dur: "~60m", desc: "Chain-of-Thought, Mega-Prompts.", topics: ["CoT", "ToT", "ReAct", "Mega-Prompts"], vids: [{ t: "Fortgeschritten", url: "https://www.youtube.com/embed/Y5TR6j_1sKQ", ch: "KI Kompass" }, { t: "Profi", url: "https://www.youtube.com/embed/SstY1Jnpqjc", ch: "Noel Lang" }], prac: "Mega-Prompt Marketingstrategie.", res: ["LearnPrompting", "Claude Docs"], tools: null },
  ]},
  { id: 4, phase: "AUTOMATION", pl: "Phase 4", icon: "⚡", col: "#f59e0b", mods: [
    { id: "4.1", t: "Workflows", dur: "~90m", desc: "Make.com, n8n, Zapier + KI.", topics: ["Make.com", "n8n", "APIs", "Webhooks"], vids: [{ t: "Make.com", url: "https://www.youtube.com/embed/ySWdK9GWNIY", ch: "Automate" }, { t: "n8n + KI", url: "https://www.youtube.com/embed/qoCnVPVLjOc", ch: "n8n" }], prac: "RSS Pipeline bauen.", res: ["Make.com", "n8n.io"], tools: null },
    { id: "4.2", t: "Custom GPTs", dur: "~60m", desc: "Eigene KI-Assistenten.", topics: ["GPT Builder", "Claude Projects", "KB", "Persona"], vids: [{ t: "Custom GPTs", url: "https://www.youtube.com/embed/Y-wuB7WGHME", ch: "Noel Lang" }, { t: "Assistent", url: "https://www.youtube.com/embed/6AcORPRukkA", ch: "KI Kompass" }], prac: "3 GPTs erstellen.", res: ["GPT Builder", "Claude Projects"], tools: null },
  ]},
  { id: 5, phase: "CHATBOTS", pl: "Phase 5", icon: "💬", col: "#06b6d4", mods: [
    { id: "5.1", t: "Plattformen", dur: "~60m", desc: "Botpress, ManyChat, Tidio.", topics: ["No-Code", "Low-Code", "Enterprise", "OSS"], vids: [{ t: "Ohne Code", url: "https://www.youtube.com/embed/sHTfGncJeMk", ch: "Noel Lang" }, { t: "Botpress", url: "https://www.youtube.com/embed/6AcORPRukkA", ch: "KI Kompass" }], prac: "Bot für fiktive Firma.", res: ["Botpress", "ManyChat"], tools: "chatbotPlatforms" },
    { id: "5.2", t: "Multi-Channel", dur: "~90m", desc: "Web + WA + IG gleichzeitig.", topics: ["WA API", "IG Bots", "Omnichannel", "Handover"], vids: [{ t: "WA Bot", url: "https://www.youtube.com/embed/Y-wuB7WGHME", ch: "Noel Lang" }, { t: "IG Bot", url: "https://www.youtube.com/embed/1bk_0d3_4Rs", ch: "KI Kompass" }], prac: "ManyChat IG+WA.", res: ["ManyChat", "Meta Dev"], tools: null },
    { id: "5.3", t: "Wissensdatenbank", dur: "~90m", desc: "Bot mit eigenen Docs.", topics: ["KB", "RAG", "Guardrails", "Handover"], vids: [{ t: "Eigene Daten", url: "https://www.youtube.com/embed/u5Vcrwpzoz8", ch: "Tim" }, { t: "KB Tutorial", url: "https://www.youtube.com/embed/nKG_kbQUDDE", ch: "AI Jason" }], prac: "Support-Bot mit FAQs.", res: ["Botpress KB", "Chatbase"], tools: null },
    { id: "5.4", t: "Bots als Service", dur: "~60m", desc: "Bot-Erstellung verkaufen.", topics: ["Agentur", "Preise", "White-Label", "Wartung"], vids: [{ t: "Agentur", url: "https://www.youtube.com/embed/AzdlbR9x7LE", ch: "Digital Beat" }, { t: "Verkaufen", url: "https://www.youtube.com/embed/o7VaGd5WNUE", ch: "Digital Beat" }], prac: "Zahnarzt-Bot Angebot.", res: ["Botpress WL"], tools: null },
  ]},
  { id: 6, phase: "KI-AGENTEN", pl: "Phase 6", icon: "🤖", col: "#ef4444", mods: [
    { id: "6.1", t: "Python", dur: "~120m", desc: "Python Basics für KI.", topics: ["Basics", "requests", "APIs", "Daten"], vids: [{ t: "Crashkurs", url: "https://www.youtube.com/embed/oxXAb8IikHM", ch: "Progr. Starten" }, { t: "Python KI", url: "https://www.youtube.com/embed/rfscVS0vtbw", ch: "freeCodeCamp" }], prac: "API E-Mail-Generator.", res: ["Python.org", "Kaggle"], tools: null },
    { id: "6.2", t: "LangChain & CrewAI", dur: "~120m", desc: "Multi-Agenten bauen.", topics: ["LangChain", "CrewAI", "ADK", "Tools"], vids: [{ t: "LangChain", url: "https://www.youtube.com/embed/aywZrzNaKjs", ch: "Chris" }, { t: "CrewAI", url: "https://www.youtube.com/embed/nKG_kbQUDDE", ch: "AI Jason" }], prac: "Research-Agent.", res: ["LangChain", "CrewAI"], tools: null },
    { id: "6.3", t: "RAG-Systeme", dur: "~90m", desc: "KI + eigene Daten.", topics: ["Vektor-DBs", "Embeddings", "Chunking", "Pipeline"], vids: [{ t: "RAG bauen", url: "https://www.youtube.com/embed/u5Vcrwpzoz8", ch: "Tim" }, { t: "Vektor-DBs", url: "https://www.youtube.com/embed/klTvEwg3oJ4", ch: "Fireship" }], prac: "PDF Q&A System.", res: ["Pinecone", "ChromaDB"], tools: null },
  ]},
  { id: 7, phase: "KI-APPS", pl: "Phase 7", icon: "📱", col: "#10b981", mods: [
    { id: "7.1", t: "No-Code Apps", dur: "~60m", desc: "Streamlit, Bolt.new.", topics: ["Streamlit", "Bolt.new", "Gradio", "Replit"], vids: [{ t: "Ohne Code", url: "https://www.youtube.com/embed/sHTfGncJeMk", ch: "Noel Lang" }, { t: "Streamlit", url: "https://www.youtube.com/embed/D0D4Pa22iG0", ch: "Data Prof" }], prac: "Chatbot-App.", res: ["Streamlit", "Bolt.new"], tools: null },
    { id: "7.2", t: "Full-Stack", dur: "~120m", desc: "Komplette KI-Web-Apps.", topics: ["Next.js", "AI SDK", "Supabase", "Deploy"], vids: [{ t: "KI-SaaS", url: "https://www.youtube.com/embed/mkJbEP5GeRA", ch: "Coding Flow" }, { t: "AI SDK", url: "https://www.youtube.com/embed/dQw4w9WgXcQ", ch: "Vercel" }], prac: "Angebots-Tool.", res: ["Vercel AI", "Next.js"], tools: null },
    { id: "7.3", t: "MCP & Functions", dur: "~90m", desc: "KI + externe Tools.", topics: ["Function Calling", "Tool Use", "MCP", "Claude Code"], vids: [{ t: "Functions", url: "https://www.youtube.com/embed/0lOSvOoF2to", ch: "AI Jason" }, { t: "MCP", url: "https://www.youtube.com/embed/JU8aTSIts00", ch: "Anthropic" }], prac: "MCP Agent.", res: ["MCP Docs"], tools: null },
  ]},
  { id: 8, phase: "KI-BUSINESS", pl: "Phase 8", icon: "💼", col: "#6366f1", mods: [
    { id: "8.1", t: "KI-Strategie", dur: "~60m", desc: "Strategien entwickeln.", topics: ["Reifegrad", "Use Cases", "ROI", "Roadmap"], vids: [{ t: "Strategie", url: "https://www.youtube.com/embed/8LKGA3grsFQ", ch: "McKinsey" }, { t: "Transform.", url: "https://www.youtube.com/embed/21EiKfQYZXc", ch: "Google" }], prac: "Strategie erstellen.", res: ["McKinsey", "Gartner"], tools: null },
    { id: "8.2", t: "Recht & AI Act", dur: "~60m", desc: "DSGVO, AI Act, Ethik.", topics: ["AI Act", "DSGVO", "Urheberrecht", "Ethik"], vids: [{ t: "AI Act", url: "https://www.youtube.com/embed/nCWtmpEMJRs", ch: "KI Kompass" }, { t: "DSGVO", url: "https://www.youtube.com/embed/t8Tii_DfMtQ", ch: "Solmecke" }], prac: "3 Apps einordnen.", res: ["AI Act", "Bitkom"], tools: null },
    { id: "8.3", t: "KI-Business", dur: "~90m", desc: "Als Berater starten.", topics: ["Nische", "Angebote", "LinkedIn", "Cases"], vids: [{ t: "Berater", url: "https://www.youtube.com/embed/AzdlbR9x7LE", ch: "Digital Beat" }, { t: "Business", url: "https://www.youtube.com/embed/v_WpoTt0Xys", ch: "Consulting" }], prac: "Website erstellen.", res: ["LinkedIn", "Calendly"], tools: null },
  ]},
];

const TOTAL = CURRICULUM.reduce((s, p) => s + p.mods.length, 0);

function ToolCards({ type }) {
  const cardStyle = { background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 11, padding: 12, marginBottom: 7 };
  const labelStyle = { fontSize: 9, color: "rgba(255,255,255,.38)", fontWeight: 600, textTransform: "uppercase" };
  const valStyle = { fontSize: 12, color: "rgba(255,255,255,.82)", lineHeight: 1.3 };
  const rowStyle = { display: "flex", gap: 8, marginBottom: 5 };

  const simpleCards = (items) => items.map((x, i) => (
    <div key={i} style={{ ...cardStyle, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8 }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{x.name}</div>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,.4)", marginTop: 1 }}>{x.best}</div>
      </div>
      <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", whiteSpace: "nowrap" }}>{x.preis}</div>
    </div>
  ));

  const levelBadge = (lvl) => {
    const isE = lvl.includes("Einsteiger");
    const isP = lvl.includes("Profi");
    return { background: isE ? "rgba(16,185,129,.15)" : isP ? "rgba(239,68,68,.15)" : "rgba(245,158,11,.15)", color: isE ? "#34d399" : isP ? "#f87171" : "#fbbf24", padding: "2px 7px", borderRadius: 5, fontSize: 9, fontWeight: 700 };
  };

  if (type === "textKIs") {
    return AI_TOOLS.textKIs.map((x, i) => (
      <div key={i} style={cardStyle}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 5 }}>{x.name} <span style={{ fontSize: 10, fontWeight: 400, color: "rgba(255,255,255,.3)" }}>{x.provider}</span></div>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}><div style={labelStyle}>Free</div><div style={valStyle}>{x.free}</div></div>
          <div style={{ flex: 1 }}><div style={labelStyle}>Kontext</div><div style={valStyle}>{x.context}</div></div>
        </div>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}><div style={labelStyle}>Standard</div><div style={valStyle}>{x.proPlan}</div></div>
          <div style={{ flex: 1 }}><div style={labelStyle}>Premium</div><div style={valStyle}>{x.premiumPlan}</div></div>
        </div>
        <div style={{ ...labelStyle, marginTop: 2 }}>Stärke</div>
        <div style={{ fontSize: 11, color: "#a78bfa" }}>{x.best}</div>
      </div>
    ));
  }
  if (type === "bildKIs") return simpleCards(AI_TOOLS.bildKIs);
  if (type === "multiKIs") return (
    <div>
      <div style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e", margin: "0 0 6px" }}>🎬 Video</div>
      {simpleCards(AI_TOOLS.videoKIs)}
      <div style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e", margin: "12px 0 6px" }}>🎵 Audio</div>
      {simpleCards(AI_TOOLS.audioKIs)}
      <div style={{ fontSize: 12, fontWeight: 700, color: "#f43f5e", margin: "12px 0 6px" }}>💻 Code</div>
      {simpleCards(AI_TOOLS.codingKIs)}
    </div>
  );
  if (type === "chatbotPlatforms") {
    return AI_TOOLS.chatbotPlatforms.map((x, i) => (
      <div key={i} style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 5 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{x.name}</div>
          <span style={levelBadge(x.level)}>{x.level}</span>
        </div>
        <div style={rowStyle}>
          <div style={{ flex: 1 }}><div style={labelStyle}>Typ</div><div style={valStyle}>{x.typ}</div></div>
          <div style={{ flex: 1 }}><div style={labelStyle}>Preis</div><div style={valStyle}>{x.preis}</div></div>
        </div>
        <div style={labelStyle}>Kanäle</div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)", marginBottom: 3 }}>{x.channels}</div>
      </div>
    ));
  }
  return null;
}


function Quiz({ moduleId, color, onPass }) {
  const questions = QUIZZES[moduleId] || [];
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  if (!questions.length) return <div style={{ color: "rgba(255,255,255,.4)", fontSize: 12, textAlign: "center", padding: 16 }}>Kein Quiz verfügbar.</div>;

  const question = questions[currentIdx];

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelected(null);
    } else {
      setFinished(true);
      const finalScore = score + (selected === question.ans ? 1 : 0);
      if (finalScore >= Math.ceil(questions.length * 0.6)) onPass();
    }
  };

  const handlePick = (idx) => {
    if (selected !== null) return;
    setSelected(idx);
    if (idx === question.ans) setScore(s => s + 1);
  };

  if (finished) {
    const passed = score >= Math.ceil(questions.length * 0.6);
    return (
      <div style={{ textAlign: "center", padding: 16 }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>{passed ? "🎉" : "😅"}</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 4 }}>{passed ? "Bestanden!" : "Nochmal versuchen!"}</div>
        <div style={{ fontSize: 13, color: "rgba(255,255,255,.5)", marginBottom: 14 }}>{score}/{questions.length} richtig</div>
        <button onClick={() => { setCurrentIdx(0); setSelected(null); setScore(0); setFinished(false); }} style={{ background: "rgba(255,255,255,.08)", border: "none", borderRadius: 7, padding: "9px 20px", color: "#fff", fontFamily: "inherit", fontSize: 12, cursor: "pointer" }}>Nochmal</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", fontFamily: "monospace" }}>Frage {currentIdx + 1}/{questions.length}</span>
        <span style={{ fontSize: 10, color, fontFamily: "monospace" }}>{score} richtig</span>
      </div>
      <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 12, color: "#fff" }}>{question.q}</div>
      {question.opts.map((opt, idx) => {
        const isPicked = selected === idx;
        const isCorrect = idx === question.ans;
        const showResult = selected !== null;
        return (
          <button key={idx} onClick={() => handlePick(idx)} style={{
            width: "100%", textAlign: "left", fontFamily: "inherit", fontSize: 12, display: "flex", alignItems: "center", gap: 8, marginBottom: 5, cursor: showResult ? "default" : "pointer",
            background: showResult ? (isCorrect ? "rgba(16,185,129,.12)" : isPicked ? "rgba(239,68,68,.12)" : "rgba(255,255,255,.02)") : "rgba(255,255,255,.04)",
            border: `1px solid ${showResult ? (isCorrect ? "rgba(16,185,129,.35)" : isPicked ? "rgba(239,68,68,.35)" : "rgba(255,255,255,.05)") : "rgba(255,255,255,.07)"}`,
            borderRadius: 8, padding: "10px 12px",
            color: showResult ? (isCorrect ? "#34d399" : isPicked ? "#f87171" : "rgba(255,255,255,.5)") : "rgba(255,255,255,.75)",
          }}>
            <span style={{ width: 20, height: 20, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, flexShrink: 0, background: showResult ? (isCorrect ? "rgba(16,185,129,.2)" : isPicked ? "rgba(239,68,68,.2)" : "rgba(255,255,255,.05)") : "rgba(255,255,255,.05)" }}>
              {showResult ? (isCorrect ? "✓" : isPicked ? "✗" : String.fromCharCode(65 + idx)) : String.fromCharCode(65 + idx)}
            </span>
            {opt}
          </button>
        );
      })}
      {selected !== null && (
        <button onClick={handleNext} style={{ width: "100%", background: color, border: "none", borderRadius: 7, padding: 10, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 600, cursor: "pointer", marginTop: 6 }}>
          {currentIdx < questions.length - 1 ? "Weiter →" : "Ergebnis"}
        </button>
      )}
    </div>
  );
}

function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [activeModule, setActiveModule] = useState(null);
  const [completed, setCompleted] = useState({});
  const [checks, setChecks] = useState({});
  const [notes, setNotes] = useState({});
  const [tab, setTab] = useState("learn");
  const [showWelcome, setShowWelcome] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [currentView, setCurrentView] = useState("course");
  const [praxisCatIdx, setPraxisCatIdx] = useState(0);
  const [praxisItemIdx, setPraxisItemIdx] = useState(null);
  const [copied, setCopied] = useState(false);
  const mainRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const d = {value: localStorage.getItem("ki-done")};
        const c = {value: localStorage.getItem("ki-checks")};
        const n = {value: localStorage.getItem("ki-notes")};
        if (d && d.value) setCompleted(JSON.parse(d.value));
        if (c && c.value) setChecks(JSON.parse(c.value));
        if (n && n.value) setNotes(JSON.parse(n.value));
      } catch (e) { /* storage not available */ }
      setLoaded(true);
    })();
  }, []);

  const saveData = useCallback(async (d, c, n) => {
    try {
      localStorage.setItem("ki-done", JSON.stringify(d));
      localStorage.setItem("ki-checks", JSON.stringify(c));
      localStorage.setItem("ki-notes", JSON.stringify(n));
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    if (loaded) saveData(completed, checks, notes);
  }, [completed, checks, notes, loaded, saveData]);

  const doneCount = Object.keys(completed).length;
  const progressPct = Math.round((doneCount / TOTAL) * 100);
  const phase = CURRICULUM[activePhase];
  const mod = activeModule !== null ? phase.mods[activeModule] : null;

  const goTo = (phaseIdx, modIdx) => {
    setActivePhase(phaseIdx);
    setActiveModule(modIdx);
    setTab("learn");
    setMenuOpen(false);
    setCurrentView("course");
    if (mainRef.current) mainRef.current.scrollTop = 0;
  };

  const toggleDone = (id) => setCompleted(prev => {
    const next = { ...prev };
    if (next[id]) delete next[id]; else next[id] = true;
    return next;
  });

  const toggleCheck = (modId, key) => setChecks(prev => {
    const k = modId + "-" + key;
    const next = { ...prev };
    if (next[k]) delete next[k]; else next[k] = true;
    return next;
  });

  const isChecked = (modId, key) => !!checks[modId + "-" + key];

  const copyPrompt = (text) => {
    if (navigator.clipboard) navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const levelBadge = (level) => {
    const isE = level === "Einsteiger";
    const isP = level === "Profi";
    return {
      background: isE ? "rgba(16,185,129,.15)" : isP ? "rgba(239,68,68,.15)" : "rgba(245,158,11,.15)",
      color: isE ? "#34d399" : isP ? "#f87171" : "#fbbf24",
      padding: "2px 8px", borderRadius: 5, fontSize: 9, fontWeight: 700, display: "inline-block"
    };
  };

  const CheckRow = ({ modId, label, checkKey }) => (
    <button onClick={() => toggleCheck(modId, checkKey)} style={{
      width: "100%", textAlign: "left", fontFamily: "inherit", fontSize: 12, display: "flex", alignItems: "center", gap: 9, marginBottom: 4, cursor: "pointer",
      background: isChecked(modId, checkKey) ? "rgba(16,185,129,.08)" : "rgba(255,255,255,.03)",
      border: `1px solid ${isChecked(modId, checkKey) ? "rgba(16,185,129,.25)" : "rgba(255,255,255,.06)"}`,
      borderRadius: 8, padding: "10px 12px",
      color: isChecked(modId, checkKey) ? "#34d399" : "rgba(255,255,255,.6)",
    }}>
      <span style={{
        width: 18, height: 18, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, flexShrink: 0,
        border: `2px solid ${isChecked(modId, checkKey) ? "#34d399" : "rgba(255,255,255,.18)"}`,
        background: isChecked(modId, checkKey) ? "rgba(16,185,129,.2)" : "transparent",
      }}>{isChecked(modId, checkKey) ? "✓" : ""}</span>
      {label}
    </button>
  );

  const cssBlock = `
    @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600;9..40,700&family=Space+Mono:wght@400;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    @keyframes fadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-16px); } }
    @keyframes glow { 0%,100% { box-shadow: 0 0 16px rgba(139,92,246,.3); } 50% { box-shadow: 0 0 32px rgba(139,92,246,.5); } }
    html, body { overscroll-behavior: none; }
    ::-webkit-scrollbar { width: 0; height: 0; }
  `;

  if (!loaded) {
    return (
      <div style={{ minHeight: "100dvh", background: "#0c0a1a", display: "flex", alignItems: "center", justifyContent: "center", color: "#8b5cf6", fontFamily: "monospace", fontSize: 13 }}>
        <style>{cssBlock}</style>Laden...
      </div>
    );
  }

  if (showWelcome) {
    return (
      <div style={{ minHeight: "100dvh", background: "linear-gradient(150deg,#0c0a1a,#1a1040 50%,#0f172a)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans',system-ui,sans-serif", padding: "20px 14px", position: "relative", overflow: "hidden" }}>
        <style>{cssBlock}</style>
        <div style={{ position: "absolute", top: "-12%", left: "-8%", width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,.14),transparent 70%)", animation: "float 8s ease-in-out infinite" }} />
        <div style={{ maxWidth: 420, textAlign: "center", position: "relative", zIndex: 1, animation: "fadeIn .8s ease", width: "100%" }}>
          <div style={{ fontSize: "clamp(44px,13vw,68px)", marginBottom: 8 }}>🚀</div>
          <h1 style={{ fontSize: "clamp(24px,7vw,44px)", fontWeight: 700, color: "#fff", lineHeight: 1.1 }}>KI Masterclass</h1>
          <div style={{ fontSize: "clamp(10px,2.8vw,14px)", fontFamily: "monospace", color: "#8b5cf6", margin: "6px 0 16px", letterSpacing: 3, textTransform: "uppercase" }}>Von Null zum KI-Profi</div>
          <p style={{ fontSize: "clamp(12px,3.2vw,15px)", color: "rgba(255,255,255,.55)", lineHeight: 1.5, marginBottom: 22 }}>{TOTAL} Module + Praxis-Bibliothek + Quizze</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 24 }}>
            {[{ i: "🗺️", l: "KIs + Preise" }, { i: "💡", l: "Praxis-Prompts" }, { i: "🤖", l: "Agenten bauen" }, { i: "💼", l: "KI-Business" }].map((x, j) => (
              <div key={j} style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 9, padding: "10px 6px" }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{x.i}</div>
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 10 }}>{x.l}</div>
              </div>
            ))}
          </div>
          {doneCount > 0 && <div style={{ background: "rgba(139,92,246,.1)", border: "1px solid rgba(139,92,246,.25)", borderRadius: 10, padding: "9px 12px", marginBottom: 14, fontSize: 12, color: "#a78bfa" }}>🎯 Fortschritt: {progressPct}% ({doneCount}/{TOTAL})</div>}
          <button onClick={() => setShowWelcome(false)} style={{ background: "linear-gradient(135deg,#8b5cf6,#6366f1)", color: "#fff", border: "none", padding: "14px 0", borderRadius: 50, fontSize: "clamp(14px,3.8vw,16px)", fontWeight: 600, cursor: "pointer", animation: "glow 2s ease-in-out infinite", fontFamily: "inherit", width: "100%", maxWidth: 280 }}>
            {doneCount > 0 ? "Weiterlernen →" : "Starten →"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100dvh", background: "#0c0a1a", fontFamily: "'DM Sans',system-ui,sans-serif", color: "#fff", display: "flex", flexDirection: "column" }}>
      <style>{cssBlock}</style>

      <header style={{ background: "rgba(12,10,26,.97)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "8px 10px", display: "flex", alignItems: "center", gap: 6, position: "sticky", top: 0, zIndex: 200 }}>
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: "none", border: "none", color: "#fff", fontSize: 18, cursor: "pointer", padding: "4px 5px", lineHeight: 1, minWidth: 28 }}>{menuOpen ? "✕" : "☰"}</button>
        <div style={{ fontWeight: 700, fontSize: "clamp(11px,3.2vw,15px)", flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>🚀 KI Masterclass</div>
        <div style={{ display: "flex", background: "rgba(255,255,255,.05)", borderRadius: 6, padding: 2, gap: 1 }}>
          <button onClick={() => { setCurrentView("course"); setMenuOpen(false); }} style={{ background: currentView === "course" ? "rgba(255,255,255,.12)" : "transparent", border: "none", borderRadius: 4, padding: "5px 8px", fontSize: 10, color: currentView === "course" ? "#fff" : "rgba(255,255,255,.35)", cursor: "pointer", fontFamily: "inherit", fontWeight: currentView === "course" ? 600 : 400 }}>📖 Kurs</button>
          <button onClick={() => { setCurrentView("praxis"); setMenuOpen(false); setPraxisItemIdx(null); }} style={{ background: currentView === "praxis" ? "rgba(255,255,255,.12)" : "transparent", border: "none", borderRadius: 4, padding: "5px 8px", fontSize: 10, color: currentView === "praxis" ? "#fff" : "rgba(255,255,255,.35)", cursor: "pointer", fontFamily: "inherit", fontWeight: currentView === "praxis" ? 600 : 400 }}>💡 Praxis</button>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 4, flexShrink: 0 }}>
          <div style={{ width: "clamp(32px,10vw,70px)", height: 4, background: "rgba(255,255,255,.08)", borderRadius: 2, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${progressPct}%`, background: "linear-gradient(90deg,#8b5cf6,#0ea5e9)", borderRadius: 2, transition: "width .4s" }} />
          </div>
          <span style={{ fontFamily: "monospace", fontSize: 9, color: "#8b5cf6" }}>{progressPct}%</span>
        </div>
      </header>

      {menuOpen && (
        <div style={{ position: "fixed", inset: 0, top: 44, zIndex: 190, background: "rgba(10,8,22,.98)", backdropFilter: "blur(14px)", overflowY: "auto", padding: "8px 8px 80px", WebkitOverflowScrolling: "touch" }}>
          <button onClick={() => { setCurrentView("praxis"); setMenuOpen(false); setPraxisItemIdx(null); }} style={{ width: "100%", background: "rgba(236,72,153,.08)", border: "1px solid rgba(236,72,153,.2)", borderRadius: 9, padding: "12px", marginBottom: 8, cursor: "pointer", textAlign: "left", color: "#fff", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 16 }}>💡</span>
            <div>
              <div style={{ fontFamily: "monospace", fontSize: 8, color: "#ec4899", textTransform: "uppercase", letterSpacing: 1 }}>Nachschlagewerk</div>
              <div style={{ fontSize: 12, fontWeight: 600 }}>Praxis-Bibliothek</div>
            </div>
          </button>
          {CURRICULUM.map((p, pi) => {
            const cnt = p.mods.filter(m => completed[m.id]).length;
            return (
              <div key={p.id}>
                <button onClick={() => goTo(pi, null)} style={{ width: "100%", background: activePhase === pi && currentView === "course" ? `${p.col}12` : "transparent", border: "none", borderRadius: 9, padding: "10px", cursor: "pointer", textAlign: "left", color: "#fff", fontFamily: "inherit" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 15 }}>{p.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: "monospace", fontSize: 7, color: p.col, textTransform: "uppercase", letterSpacing: 1 }}>{p.pl}</div>
                      <div style={{ fontSize: 11, fontWeight: 600 }}>{p.phase}</div>
                    </div>
                    <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", fontFamily: "monospace" }}>{cnt}/{p.mods.length}</span>
                  </div>
                  <div style={{ height: 2, background: "rgba(255,255,255,.06)", borderRadius: 1, marginTop: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${(cnt / p.mods.length) * 100}%`, background: p.col }} />
                  </div>
                </button>
                {activePhase === pi && currentView === "course" && p.mods.map((m, mi) => (
                  <button key={m.id} onClick={() => goTo(pi, mi)} style={{ width: "calc(100% - 18px)", marginLeft: 18, background: "none", border: "none", borderLeft: `2px solid ${completed[m.id] ? p.col : "rgba(255,255,255,.06)"}`, padding: "6px 8px", cursor: "pointer", textAlign: "left", color: completed[m.id] ? "#fff" : "rgba(255,255,255,.4)", fontFamily: "inherit", fontSize: 10, display: "flex", alignItems: "center", gap: 5 }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: completed[m.id] ? p.col : "rgba(255,255,255,.06)", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 6, flexShrink: 0 }}>{completed[m.id] ? "✓" : ""}</span>
                    {m.t}
                  </button>
                ))}
              </div>
            );
          })}
        </div>
      )}

      <main ref={mainRef} style={{ flex: 1, overflowY: "auto", padding: "10px 10px 28px", WebkitOverflowScrolling: "touch" }}>

        {currentView === "praxis" && praxisItemIdx === null && (
          <div style={{ maxWidth: 560, margin: "0 auto", animation: "fadeIn .3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 28 }}>💡</span>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: "#ec4899", textTransform: "uppercase", letterSpacing: 1.5 }}>Nachschlagewerk</div>
                <h2 style={{ fontSize: "clamp(16px,4.5vw,22px)", fontWeight: 700 }}>Praxis-Bibliothek</h2>
              </div>
            </div>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: 11, lineHeight: 1.4, marginBottom: 14 }}>Kopierbare Prompts fuer Beruf, Marketing, Technik, Alltag und mehr.</p>
            <div style={{ display: "flex", gap: 3, overflowX: "auto", paddingBottom: 8, marginBottom: 12 }}>
              {PRAXIS.map((c, i) => (
                <button key={i} onClick={() => setPraxisCatIdx(i)} style={{ background: praxisCatIdx === i ? `${c.color}20` : "rgba(255,255,255,.04)", border: `1px solid ${praxisCatIdx === i ? c.color + "44" : "rgba(255,255,255,.06)"}`, borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: praxisCatIdx === i ? "#fff" : "rgba(255,255,255,.5)", fontFamily: "inherit", fontSize: 11, fontWeight: praxisCatIdx === i ? 600 : 400, whiteSpace: "nowrap", flexShrink: 0 }}>{c.cat}</button>
              ))}
            </div>
            {PRAXIS[praxisCatIdx].items.map((item, i) => (
              <button key={i} onClick={() => setPraxisItemIdx(i)} style={{ width: "100%", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 11, padding: "12px 10px", cursor: "pointer", textAlign: "left", color: "#fff", fontFamily: "inherit", marginBottom: 7, display: "flex", alignItems: "flex-start", gap: 9 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{item.title}</div>
                  <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10, lineHeight: 1.3, marginBottom: 5 }}>{item.desc}</div>
                  <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <span style={levelBadge(item.level)}>{item.level}</span>
                    <span style={{ background: "rgba(255,255,255,.06)", borderRadius: 4, padding: "2px 6px", fontSize: 9, color: "rgba(255,255,255,.45)" }}>{item.tool}</span>
                  </div>
                </div>
                <span style={{ color: "rgba(255,255,255,.15)", fontSize: 13, marginTop: 2, flexShrink: 0 }}>›</span>
              </button>
            ))}
          </div>
        )}

        {currentView === "praxis" && praxisItemIdx !== null && (() => {
          const item = PRAXIS[praxisCatIdx].items[praxisItemIdx];
          const cat = PRAXIS[praxisCatIdx];
          return (
            <div style={{ maxWidth: 560, margin: "0 auto", animation: "fadeIn .25s ease" }}>
              <button onClick={() => setPraxisItemIdx(null)} style={{ background: "none", border: "none", color: cat.color, cursor: "pointer", fontSize: 12, fontFamily: "inherit", padding: 0, marginBottom: 10 }}>← Zurück</button>
              <h2 style={{ fontSize: "clamp(16px,4.5vw,22px)", fontWeight: 700, lineHeight: 1.2, marginBottom: 5 }}>{item.title}</h2>
              <p style={{ color: "rgba(255,255,255,.5)", fontSize: 12, lineHeight: 1.4, marginBottom: 12 }}>{item.desc}</p>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 16 }}>
                <span style={levelBadge(item.level)}>{item.level}</span>
                <span style={{ background: "rgba(255,255,255,.06)", borderRadius: 5, padding: "3px 8px", fontSize: 10, color: "rgba(255,255,255,.6)" }}>{item.tool}</span>
                <span style={{ background: "rgba(139,92,246,.12)", borderRadius: 5, padding: "3px 8px", fontSize: 10, color: "#a78bfa" }}>Braucht: {item.needs}</span>
              </div>
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 12, overflow: "hidden", marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: cat.color }}>Beispiel-Prompt</span>
                  <button onClick={() => copyPrompt(item.prompt)} style={{ background: copied ? "rgba(16,185,129,.2)" : "rgba(255,255,255,.08)", border: "none", borderRadius: 6, padding: "5px 12px", cursor: "pointer", color: copied ? "#34d399" : "rgba(255,255,255,.6)", fontFamily: "inherit", fontSize: 11 }}>{copied ? "Kopiert!" : "Kopieren"}</button>
                </div>
                <pre style={{ padding: 12, fontSize: 12, lineHeight: 1.6, color: "rgba(255,255,255,.75)", whiteSpace: "pre-wrap", wordBreak: "break-word", fontFamily: "'DM Sans',system-ui", margin: 0, maxHeight: 400, overflowY: "auto" }}>{item.prompt}</pre>
              </div>
              <div style={{ background: "rgba(139,92,246,.06)", border: "1px solid rgba(139,92,246,.15)", borderRadius: 10, padding: 12, marginBottom: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6, color: "#a78bfa" }}>Dafuer brauchst du</div>
                <div style={{ fontSize: 12, color: "rgba(255,255,255,.65)", lineHeight: 1.5 }}>{item.needs} — Lerne das im Kurs.</div>
                <button onClick={() => {
                  const modId = item.needs.match(/\d+\.\d+/);
                  if (modId) {
                    const id = modId[0];
                    for (let pi = 0; pi < CURRICULUM.length; pi++) {
                      for (let mi = 0; mi < CURRICULUM[pi].mods.length; mi++) {
                        if (CURRICULUM[pi].mods[mi].id === id) { goTo(pi, mi); return; }
                      }
                    }
                  }
                }} style={{ background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)", borderRadius: 7, padding: "8px 14px", cursor: "pointer", color: "#a78bfa", fontFamily: "inherit", fontSize: 11, fontWeight: 600, marginTop: 8 }}>Zum Modul springen</button>
              </div>
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 6 }}>Tipps</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.5)", lineHeight: 1.6 }}>
                  Ersetze alle [Platzhalter] mit deinen Infos. Iteriere wenn noetig. Probiere verschiedene KIs. Speichere gute Prompts.
                </div>
              </div>
            </div>
          );
        })()}

        {currentView === "course" && mod === null && (
          <div style={{ maxWidth: 560, margin: "0 auto", animation: "fadeIn .3s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 5 }}>
              <span style={{ fontSize: "clamp(26px,7vw,36px)" }}>{phase.icon}</span>
              <div>
                <div style={{ fontFamily: "monospace", fontSize: 8, color: phase.col, textTransform: "uppercase", letterSpacing: 1.2 }}>{phase.pl}</div>
                <h2 style={{ fontSize: "clamp(16px,4.5vw,24px)", fontWeight: 700 }}>{phase.phase}</h2>
              </div>
            </div>
            {phase.mods.map((m, mi) => (
              <button key={m.id} onClick={() => goTo(activePhase, mi)} style={{ width: "100%", background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 11, padding: "12px 10px", cursor: "pointer", textAlign: "left", color: "#fff", fontFamily: "inherit", display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 7 }}>
                <div style={{ width: 30, height: 30, borderRadius: 7, flexShrink: 0, background: completed[m.id] ? `${phase.col}20` : "rgba(255,255,255,.04)", border: `1px solid ${completed[m.id] ? phase.col + "44" : "rgba(255,255,255,.07)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{completed[m.id] ? "✅" : m.id.split(".")[1]}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 1 }}>{m.t}</div>
                  <div style={{ color: "rgba(255,255,255,.4)", fontSize: 10, lineHeight: 1.3 }}>{m.desc}</div>
                  <div style={{ marginTop: 4, display: "flex", gap: 4, flexWrap: "wrap" }}>
                    <span style={{ background: "rgba(255,255,255,.05)", borderRadius: 4, padding: "1px 5px", fontSize: 8, color: "rgba(255,255,255,.4)" }}>{m.dur}</span>
                    {QUIZZES[m.id] && <span style={{ background: "rgba(139,92,246,.15)", borderRadius: 4, padding: "1px 5px", fontSize: 8, color: "#a78bfa", fontWeight: 600 }}>Quiz</span>}
                    {m.tools && <span style={{ background: `${phase.col}18`, borderRadius: 4, padding: "1px 5px", fontSize: 8, color: phase.col, fontWeight: 600 }}>Preise</span>}
                  </div>
                </div>
                <span style={{ color: "rgba(255,255,255,.13)", fontSize: 13, marginTop: 2 }}>›</span>
              </button>
            ))}
          </div>
        )}

        {currentView === "course" && mod !== null && (
          <div style={{ maxWidth: 560, margin: "0 auto", animation: "fadeIn .25s ease" }}>
            <button onClick={() => setActiveModule(null)} style={{ background: "none", border: "none", color: phase.col, cursor: "pointer", fontSize: 12, fontFamily: "inherit", padding: 0, marginBottom: 10 }}>← Zurück</button>
            <div style={{ fontFamily: "monospace", fontSize: 8, color: phase.col, textTransform: "uppercase", letterSpacing: 1.2 }}>Modul {mod.id}</div>
            <h2 style={{ fontSize: "clamp(16px,4.5vw,22px)", fontWeight: 700, lineHeight: 1.2, margin: "2px 0 5px" }}>{mod.t}</h2>
            <p style={{ color: "rgba(255,255,255,.45)", fontSize: 11, lineHeight: 1.4, marginBottom: 10 }}>{mod.desc}</p>

            <div style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10, padding: 10, marginBottom: 12 }}>
              <div style={{ fontSize: 11, fontWeight: 700, marginBottom: 6, color: "rgba(255,255,255,.65)" }}>Checkliste</div>
              <CheckRow modId={mod.id} label="Lernziele" checkKey="learn" />
              <CheckRow modId={mod.id} label="Videos" checkKey="video" />
              <CheckRow modId={mod.id} label="Praxis" checkKey="prac" />
              <CheckRow modId={mod.id} label="Quiz" checkKey="quiz" />
              {!completed[mod.id] && isChecked(mod.id, "learn") && isChecked(mod.id, "video") && isChecked(mod.id, "prac") && isChecked(mod.id, "quiz") && (
                <button onClick={() => toggleDone(mod.id)} style={{ width: "100%", background: "linear-gradient(135deg,#10b981,#059669)", border: "none", borderRadius: 7, padding: 10, color: "#fff", fontFamily: "inherit", fontSize: 12, fontWeight: 700, cursor: "pointer", marginTop: 4 }}>🎉 Modul abschliessen!</button>
              )}
              {completed[mod.id] && <div style={{ textAlign: "center", padding: 6, fontSize: 12, color: "#34d399", fontWeight: 600 }}>✅ Abgeschlossen!</div>}
            </div>

            <div style={{ display: "flex", gap: 2, marginBottom: 12, background: "rgba(255,255,255,.04)", borderRadius: 7, padding: 2, position: "sticky", top: 44, zIndex: 50, backdropFilter: "blur(12px)" }}>
              {[{ k: "learn", l: "📖" }, { k: "videos", l: "🎬" }, { k: "quiz", l: "📝" }, { k: "practice", l: "💪" }, { k: "notes", l: "✏️" }].map(t => (
                <button key={t.k} onClick={() => setTab(t.k)} style={{ flex: 1, background: tab === t.k ? "rgba(255,255,255,.1)" : "transparent", border: "none", borderRadius: 5, padding: "7px 2px", cursor: "pointer", color: tab === t.k ? "#fff" : "rgba(255,255,255,.3)", fontFamily: "inherit", fontSize: 15 }}>{t.l}</button>
              ))}
            </div>

            {tab === "learn" && (
              <div style={{ animation: "fadeIn .2s ease" }}>
                {mod.tools && <div style={{ marginBottom: 10 }}><div style={{ fontSize: 11, fontWeight: 700, color: phase.col, marginBottom: 7 }}>Preise (Maerz 2026)</div><ToolCards type={mod.tools} /></div>}
                <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: 11, marginBottom: 7 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: phase.col, marginBottom: 7 }}>Lernziele</div>
                  {mod.topics.map((t, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 7px", background: "rgba(255,255,255,.03)", borderRadius: 6, marginBottom: 3 }}>
                      <span style={{ width: 16, height: 16, borderRadius: 4, background: `${phase.col}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 8, fontWeight: 700, color: phase.col, flexShrink: 0 }}>{i + 1}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,.72)" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: 11 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: phase.col, marginBottom: 7 }}>Ressourcen</div>
                  {mod.res.map((r, i) => (
                    <div key={i} style={{ padding: "5px 7px", background: "rgba(255,255,255,.03)", borderRadius: 6, fontSize: 10, color: "rgba(255,255,255,.55)", marginBottom: 3 }}>🔗 {r}</div>
                  ))}
                </div>
              </div>
            )}

            {tab === "videos" && (
              <div style={{ display: "grid", gap: 10, animation: "fadeIn .2s ease" }}>
                {mod.vids.map((v, i) => {
                  const videoId = v.url.split("/embed/")[1]?.split("?")[0];
                  const thumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                  return (
                    <a key={i} href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, overflow: "hidden", cursor: "pointer", textAlign: "left", padding: 0, width: "100%", display: "block", textDecoration: "none" }}>
                      <div style={{ position: "relative" }}>
                        <img src={thumb} alt={v.t} style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }} onError={e => { e.target.style.display = "none"; }} />
                        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,.25)" }}>
                          <div style={{ width: 54, height: 54, borderRadius: "50%", background: "rgba(255,0,0,.92)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, paddingLeft: 3 }}>▶</div>
                        </div>
                        <div style={{ position: "absolute", top: 6, right: 8, background: "rgba(0,0,0,.6)", borderRadius: 4, padding: "2px 6px", fontSize: 9, color: "#fff", fontWeight: 600 }}>YouTube</div>
                      </div>
                      <div style={{ padding: "8px 10px" }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: "#fff" }}>{v.t}</div>
                        <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", marginTop: 1 }}>{v.ch}</div>
                      </div>
                    </a>
                  );
                })}
              </div>
            )}

            {tab === "quiz" && (
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: 12, animation: "fadeIn .2s ease" }}>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 10, color: phase.col }}>Wissens-Quiz</div>
                <Quiz moduleId={mod.id} color={phase.col} onPass={() => toggleCheck(mod.id, "quiz")} />
              </div>
            )}

            {tab === "practice" && (
              <div style={{ animation: "fadeIn .2s ease" }}>
                <div style={{ background: `${phase.col}0a`, border: `1px solid ${phase.col}1a`, borderRadius: 10, padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 5 }}>Praxisaufgabe</div>
                  <p style={{ color: "rgba(255,255,255,.72)", fontSize: 12, lineHeight: 1.5, padding: 10, background: "rgba(0,0,0,.2)", borderRadius: 7, borderLeft: `3px solid ${phase.col}` }}>{mod.prac}</p>
                </div>
              </div>
            )}

            {tab === "notes" && (
              <div style={{ animation: "fadeIn .2s ease" }}>
                <textarea value={notes[mod.id] || ""} onChange={e => setNotes(prev => ({ ...prev, [mod.id]: e.target.value }))} placeholder="Notizen..." style={{ width: "100%", minHeight: 180, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 10, padding: 11, color: "#fff", fontFamily: "'DM Sans',system-ui", fontSize: 12, lineHeight: 1.5, resize: "vertical", outline: "none" }} />
              </div>
            )}

            <div style={{ display: "flex", gap: 6, marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,.06)" }}>
              <button onClick={() => { if (activeModule > 0) goTo(activePhase, activeModule - 1); else if (activePhase > 0) goTo(activePhase - 1, CURRICULUM[activePhase - 1].mods.length - 1); }} disabled={activePhase === 0 && activeModule === 0} style={{ flex: 1, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 7, padding: "9px 4px", cursor: "pointer", color: activePhase === 0 && activeModule === 0 ? "rgba(255,255,255,.1)" : "rgba(255,255,255,.5)", fontFamily: "inherit", fontSize: 11 }}>← Zurück</button>
              <button onClick={() => { if (activeModule < phase.mods.length - 1) goTo(activePhase, activeModule + 1); else if (activePhase < CURRICULUM.length - 1) goTo(activePhase + 1, 0); }} disabled={activePhase === CURRICULUM.length - 1 && activeModule === phase.mods.length - 1} style={{ flex: 1, background: phase.col, border: "none", borderRadius: 7, padding: "9px 4px", cursor: "pointer", color: "#fff", fontFamily: "inherit", fontSize: 11, fontWeight: 600 }}>Weiter →</button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
