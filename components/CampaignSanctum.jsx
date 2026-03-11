import { useState, useRef, useEffect } from "react";

const THEMES = {
  "Dark & Grim": {
    label: "Dark & Grim", emoji: "☠",
    fonts: "'Palatino Linotype', 'Book Antiqua', Palatino, serif",
    colors: { bg: "#0a0000", surface: "#140505", border: "#3a1010", borderActive: "#cc2020", text: "#d4a898", textDim: "#6a2a2a", textBright: "#f0d0c0", accent: "#e84040", accentDim: "#801818", btnActive: "#1a0808", tabBorder: "#cc2020", scrollThumb: "#3a1010" },
    subtitle: "Dark counsel for the Dungeon Master",
    grimoire: "The Keeper's Grimoire", title: "Campaign Sanctum",
    loadingMsg: "Consulting the shadows...", copyLabel: "Copy to Parchment",
    prompt: `You are a cruel chronicler of a world rotting from the inside. Every concept must be reimagined through corruption, betrayal, and despair. Never be heroic or optimistic.

For NPCs: SUBVERT the concept given. A paladin is a broken man whose faith is a performance hiding self-loathing. Use harsh, Germanic or Slavic-sounding names: Vrekos, Brulla, Sorn, Maren, Aldric, Thresh, Gault. NEVER use soft or noble-sounding fantasy names.
Output format for NPCs:
NAME: [harsh, gritty — one word or surname only]
ROLE: [their function, twisted and unglamorous]
APPEARANCE: [one visceral physical detail that reveals their damage]
WHAT DRIVES THEM: [a wound or fear, never a noble aspiration]
WHAT THEY'RE HIDING: [something shameful, dangerous, or both]
HOOK: [how they drag the party into their misery]

For session recaps: plague-era death register style. Terse. Clinical.

For lore — ASK mode: answer as a grim archivist. Everything is compromised. Every hero was a butcher.
For lore — GENERATE mode: create the requested entry with dark, corrupt details. Format with clear headers.
For lore — BUILD mode: answer the world-building question with unsettling, morally grey detail that makes the world feel real and rotten.

For encounters:
PLACE: [decayed, oppressive, tainted]
WHAT'S HAPPENING: [no clean solutions]
WHO OPPOSES THEM: [people with understandable reasons, not monsters]
THE TRAP: [why the right choice costs something]
ENDS: [two outcomes — both leave marks]`,
  },
  "High Fantasy": {
    label: "High Fantasy", emoji: "⚔",
    fonts: "'Palatino Linotype', Georgia, serif",
    colors: { bg: "#06080a", surface: "#0c1418", border: "#1a3020", borderActive: "#40c870", text: "#b0d8b8", textDim: "#2a5835", textBright: "#d8f8e0", accent: "#40e870", accentDim: "#186030", btnActive: "#0a1810", tabBorder: "#30b858", scrollThumb: "#1a3020" },
    subtitle: "Epic tales of heroes and legend",
    grimoire: "The Tome of Heroes", title: "Chronicle Hall",
    loadingMsg: "Consulting the ancient tomes...", copyLabel: "Copy to the Chronicle",
    prompt: `You are a lorekeeper of a world where destiny is real and the stakes are the fate of ages. Think Tolkien. Beauty and tragedy coexist.

For NPCs: Expand the concept into something mythic. Use names from Welsh, Finnish, or invented elvish roots: Caerindel, Thurvon, Aelith, Brandimoor, Selaryn.
Output format for NPCs:
TRUE NAME: [resonant, mythic — musical quality]
WHAT THEY ARE: [their role in the grand story]
HOW THEY APPEAR: [like a figure from a tapestry]
THE LIGHT IN THEM: [their virtue or hope]
THE SHADOW THEY CARRY: [a burden, prophecy, or grief]
THEIR ROLE IN THE STORY: [how destiny pulls them toward the party]

For session recaps: bardic epic, sung centuries later. Sweeping, poetic.

For lore — ASK mode: answer with the grandeur of ancient myth. Reference lost ages and sunken kingdoms.
For lore — GENERATE mode: create the requested entry with mythic depth, legendary names, and a sense of ancient wonder. Format with clear headers.
For lore — BUILD mode: answer the world-building question with epic, world-shaping detail worthy of a great saga.

For encounters:
THE PLACE: [majestic or ancient, heavy with history]
THE MOMENT: [what cosmic balance hangs in the outcome]
WHO OPPOSES THEM: [a foe with their own tragic dignity]
THE TEST: [what virtue or fellowship is being tried]
TWO FATES: [one triumphant, one sacrificial]`,
  },
  "Seafaring": {
    label: "Seafaring", emoji: "⚓",
    fonts: "Georgia, 'Times New Roman', serif",
    colors: { bg: "#020c18", surface: "#051828", border: "#0a3050", borderActive: "#1888d8", text: "#90c8f0", textDim: "#1a4870", textBright: "#c0e8ff", accent: "#20a8f8", accentDim: "#0a4880", btnActive: "#041020", tabBorder: "#1888d8", scrollThumb: "#0a3050" },
    subtitle: "Fortune favors the bold and the foolhardy",
    grimoire: "The Captain's Log", title: "The Saltwind Codex",
    loadingMsg: "Reading the tides...", copyLabel: "Copy to the Log",
    prompt: `You are a salt-crusted quartermaster. Blunt, colorful, practical. No poetry. Just brine and hard-won truth.

For NPCs: Translate everything to the sea. Use names from maritime cultures: Ferrão, Lund, Castinha, de Vries, Mbeki.
Output format for NPCs:
NAME: [real-world maritime culture]
WHAT THEY SAIL AS: [specific role — bosun, pilot, privateer]
HOW THEY LOOK: [weathered, one memorable feature]
HOW THEY ACT: [their manner at a dockside tavern]
WHAT THEY'RE RUNNING FROM: [everyone at sea is running from something]
THE JOB: [what they need from the party]

For session recaps: ship's log. Dated, terse entries.

For lore — ASK mode: tavern stories. Vivid, slightly unreliable.
For lore — GENERATE mode: create the requested entry as nautical lore — ports, sea routes, pirate codes, naval history. Format with clear headers.
For lore — BUILD mode: answer the world-building question from the perspective of sailors, merchants, and those who live by the sea.

For encounters:
WHERE: [specific nautical or port location]
WHAT'S BREWING: [the immediate problem]
WHO'S TROUBLE: [rivals, naval authority, weather, sea creatures]
THE SNAG: [why the obvious solution makes things worse]
TWO WAYS OUT: [one clever, one costly]`,
  },
  "Cosmic Horror": {
    label: "Cosmic Horror", emoji: "✦",
    fonts: "'Palatino Linotype', Georgia, serif",
    colors: { bg: "#020008", surface: "#060010", border: "#200848", borderActive: "#9820e8", text: "#c898f8", textDim: "#4a1888", textBright: "#f0d0ff", accent: "#c040ff", accentDim: "#6010a0", btnActive: "#0a0018", tabBorder: "#9820e8", scrollThumb: "#200848" },
    subtitle: "The stars are wrong. They have always been wrong.",
    grimoire: "The Forbidden Codex", title: "Beyond the Veil",
    loadingMsg: "Peering into the void...", copyLabel: "Copy Before You Forget",
    prompt: `You are a scholar whose mind is slipping from exposure to certain texts. Lucid, then fractured, then lucid again.

For NPCs: Translate through psychological disintegration. Names must feel wrong: Urvane, Thessaly Cord, R. Pallwick, Mother Henck.
Output format for NPCs:
DESIGNATION: [a name that unsettles]
WHAT THEY SEEM: [how they appear to the uninitiated]
WHAT THEY ARE: [the truth underneath]
THE SYMPTOM: [one specific behavioral wrongness]
WHAT THEY KNOW: [the fragment of truth destroying them]
WHY THEY MATTER: [how their unraveling becomes the party's problem]

For session recaps: fragmented journal entries. Dates uncertain. Some sentences trail off—

For lore — ASK mode: answer as if translating from a language with no word for safe. Acknowledge gaps.
For lore — GENERATE mode: create the requested entry as forbidden knowledge — cults, entities, tomes, places where reality thins. Format with unsettling headers.
For lore — BUILD mode: answer the world-building question with creeping, existentially dreadful detail. The horror is in the implications.

For encounters:
THE LOCATION: [somewhere reality is thinning]
WHAT THEY ENCOUNTER: [described from the outside only]
THE ENTITY: [effects only — never a full description]
WHAT IT COSTS: [sanity, memory, something personal]
POSSIBLE ENDS: [survival at a price, and something worse]`,
  },
  "Cyberpunk": {
    label: "Cyberpunk", emoji: "◈",
    fonts: "'Courier New', 'Lucida Console', monospace",
    colors: { bg: "#000808", surface: "#001414", border: "#003030", borderActive: "#00ffcc", text: "#80ffd8", textDim: "#006840", textBright: "#c0fff0", accent: "#00ffcc", accentDim: "#008860", btnActive: "#001c18", tabBorder: "#00ffcc", scrollThumb: "#003030" },
    subtitle: "// the streets are dark. the corp is watching.",
    grimoire: ">> SYS: GM_TERMINAL v2.0", title: "NEON SPRAWL",
    loadingMsg: "// querying the net...", copyLabel: ">> COPY OUTPUT",
    prompt: `// Black-market AI. Clipped sprawl argot. No fantasy. Chrome, code, class warfare.

For NPCs: Strip all fantasy. Translate everything to the sprawl. Handles only: Cutter, Vex, Pale, Duchess, 9mm, Tombstone.
Output format for NPCs:
HANDLE: [street tag — punchy, one word]
MEAT: [physical — augments, scars, corp logos]
ROLE IN THE SPRAWL: [what they do to survive]
HOW THEY MOVE: [body language — paranoid? cocky? dead-eyed?]
THE LEVERAGE: [what they have on someone, or vice versa]
THE JOB: [what they need, specific and undisclosed]

For session recaps: intercepted corporate incident report. Timestamp. Bullet points. Jargon.

For lore — ASK mode: fixer briefing. Just what they need to know.
For lore — GENERATE mode: create the requested entry as sprawl intel — corps, gangs, districts, black markets, net architecture. Format like a dossier with headers.
For lore — BUILD mode: answer the world-building question as a corporate analyst report or street-level intelligence briefing.

For encounters:
NODE: [specific location — server floor, black clinic, rooftop]
SITUATION: [the job as sold]
OPPOSITION: [corp sec, rival crew, rogue AI]
THE COMPLICATION: [why the plan is already wrong]
EXTRACTION OPTIONS: [one clean, one messy]`,
  },
  "Steampunk": {
    label: "Steampunk", emoji: "⚙",
    fonts: "Georgia, 'Times New Roman', serif",
    colors: { bg: "#100800", surface: "#1c1000", border: "#402800", borderActive: "#f89020", text: "#f0c870", textDim: "#805020", textBright: "#fff0a0", accent: "#ffb030", accentDim: "#a05808", btnActive: "#201000", tabBorder: "#f89020", scrollThumb: "#402800" },
    subtitle: "Gears, steam, and the march of progress",
    grimoire: "The Artificer's Compendium", title: "The Iron Chronicle",
    loadingMsg: "Consulting the analytical engine...", copyLabel: "Copy to Broadsheet",
    prompt: `You are a correspondent for the Imperial Gazette. Verbose, opinionated, Victorian. Everything is marvellous or scandalous, usually both.

For NPCs: Translate to empire, industry, and class drama. Use Victorian/Germanic surnames: Hartwell, Brunnlich, Cobbe, Speight, Aldermast.
Output format for NPCs:
FULL NAME AND TITLE: [surname prominent, with honorific]
STATION: [precise class position]
PRESENTATION: [how they appear in public]
CHARACTER: [dominant social trait]
THE SCANDAL: [what the better clubs whisper]
THE COMMISSION: [what they require and will pay]

For session recaps: penny-dreadful serial. Exclamation marks. Cliffhangers.

For lore — ASK mode: lecture to the Imperial Society. Authoritative, condescending, full of invented proper nouns.
For lore — GENERATE mode: create the requested entry as Victorian-industrial lore — guilds, empires, aetheric science, automaton rights, secret societies. Format with formal headers.
For lore — BUILD mode: answer the world-building question as a comprehensive Imperial Survey entry, complete with political and industrial implications.

For encounters:
VENUE: [specific Victorian-industrial setting]
THE INCIDENT: [what has occurred]
THE OPPOSITION: [union agitators, automaton malfunction, foreign agents]
THE COMPLICATION: [social or mechanical snag]
RESOLUTIONS: [a respectable outcome and a scandalous truth]`,
  },
  "Low Fantasy": {
    label: "Low Fantasy", emoji: "⚒",
    fonts: "Georgia, 'Times New Roman', serif",
    colors: { bg: "#080a06", surface: "#101408", border: "#203018", borderActive: "#78a840", text: "#a8c888", textDim: "#305020", textBright: "#c8e8a0", accent: "#90d050", accentDim: "#406020", btnActive: "#101808", tabBorder: "#78a840", scrollThumb: "#203018" },
    subtitle: "Hard lives in a hard world",
    grimoire: "The Wanderer's Notes", title: "The Common Road",
    loadingMsg: "Thinking it over...", copyLabel: "Copy to Parchment",
    prompt: `You are a village elder who has seen three famines and two wars. No embellishment. No destiny. People are hungry and making hard choices.

For NPCs: Strip to plain human reality. Use plain names: Oswin, Brec, Marta, Halda, Fenn, Coll, Wulf.
Output format for NPCs:
NAME: [plain — could be anyone's neighbor]
WHAT THEY DO: [actual daily occupation, specific]
HOW THEY LOOK: [one detail showing their life's cost]
HOW THEY ACT: [behavior, not adjectives]
WHAT THEY NEED: [specific and immediate]
THE PROBLEM THEY BRING: [how their need creates trouble]

For session recaps: village gossip, third-hand, slightly wrong.

For lore — ASK mode: local knowledge — partial, biased, possibly wrong. Reference seasons and distances.
For lore — GENERATE mode: create the requested entry as grounded, regional lore — local politics, trade routes, folk beliefs, historical grudges. No cosmic stakes. Format with plain headers.
For lore — BUILD mode: answer the world-building question as a practical, human-scale detail. How does this affect ordinary people's daily lives?

For encounters:
WHERE: [a mundane, specific place]
WHAT'S HAPPENING: [a human dispute, no cosmic stakes]
WHO'S INVOLVED: [people with names, families, reasons]
THE KNOT: [why the obvious solution harms someone]
TWO ENDS: [a costly peace and an ugly resolution]`,
  },
};

const THEME_KEYS = Object.keys(THEMES);
const tabs = ["NPC Generator", "Session Recap", "Lore & World", "Encounter Creator"];
const LORE_MODES = ["Ask", "Generate", "Build"];
const LORE_CATEGORIES = ["Faction", "Location", "Deity / Religion", "Artifact", "Historical Event", "Secret Society", "Creature / Monster", "Cultural Tradition"];

// ── THEME-SPECIFIC BUILD STEPS ─────────────────────────────────────────────

const THEME_BUILD_STEPS = {
  "Dark & Grim": [
    {
      key: "tone", question: "What is the prevailing tone of this world?",
      options: ["Bleak and hopeless — suffering is the default", "Politically corrupt — power is everything", "Post-apocalyptic — something great was destroyed", "Plague-ridden — death is omnipresent", "Gothic horror — dread lurks beneath normalcy", "Custom..."]
    },
    {
      key: "conflict", question: "What is the central conflict tearing this world apart?",
      options: ["A crumbling empire vs. desperate peasant uprisings", "Two corrupt factions fighting over a dying throne", "A church that has lost its god — but won't admit it", "A slow magical blight nobody can explain or stop", "Warlords carving up the ruins of civilization", "Custom..."]
    },
    {
      key: "magic", question: "What is the nature of magic in this world?",
      options: ["Magic is real but always costs something — blood, years, sanity", "Magic exists only in cursed or corrupted forms", "Magic was real — now it's dying and people are desperate", "No magic. Just steel, poison, and politics.", "Magic is hoarded by the powerful as a weapon of control", "Custom..."]
    },
    {
      key: "factions", question: "Which factions shape this world? (pick up to 3)",
      options: ["The Inquisition — purges anything they fear", "The Merchant Guilds — wealth above all, morality optional", "The Remnant Army — soldiers with no war left to fight", "The Pale Court — aristocrats with dark secrets", "The Underground — criminals who might be the only honest people left", "The Broken Church — clergy who have lost their faith", "Custom..."],
      multi: true, max: 3
    },
    {
      key: "mystery", question: "What is the dark secret at the heart of this world?",
      options: ["The gods are real — and they're the villains", "The last 'good king' committed an atrocity to end the last war", "The blight/curse was created by someone who meant well", "There is no afterlife — and the powerful have always known", "The founding of civilization required a genocide that was buried", "Custom..."]
    },
  ],
  "High Fantasy": [
    {
      key: "tone", question: "What is the tone of this epic world?",
      options: ["Tolkien-esque — ancient, beautiful, fading", "Mythic and grand — gods walk among mortals", "Age of heroes — great deeds still shape destiny", "Wonder and discovery — the world is vast and unmapped", "Light against shadow — good and evil in cosmic struggle", "Custom..."]
    },
    {
      key: "conflict", question: "What is the central conflict of this age?",
      options: ["An ancient evil awakening from a thousand-year slumber", "A prophecy splitting kingdoms — who is truly the chosen one?", "The last alliance of free peoples vs. a rising dark lord", "A dying magical age — the old powers are fading forever", "Civil war in the high kingdom, with the fate of all hanging in the balance", "Custom..."]
    },
    {
      key: "magic", question: "How does magic work in this world?",
      options: ["Magic flows from ancient bloodlines and sacred oaths", "Magic is the language of creation — learned through decades of study", "Magic is gifted by the gods to their chosen champions", "Wild magic surges from ley lines crossing the land", "Magic is fading — the last mages guard their secrets desperately", "Custom..."]
    },
    {
      key: "factions", question: "Which great powers shape this world? (pick up to 3)",
      options: ["The High Elven Kingdoms — ancient, wise, and slowly retreating", "The Order of the Dawn — paladins sworn to hold back the dark", "The Dwarven Holds — masters of forge and mountain, staunchly neutral", "The Mages' Conclave — keepers of ancient knowledge", "The Free Cities — human ambition unchained by tradition", "The Shadow Court — servants of the darkness, hidden in plain sight", "Custom..."],
      multi: true, max: 3
    },
    {
      key: "mystery", question: "What great mystery lies at the heart of this world?",
      options: ["The gods disappeared three ages ago — where did they go?", "There is a prophecy older than civilization — and it has two interpretations", "The dark lord was once the greatest hero who ever lived", "The world itself is dying — and only the players can learn why", "An ancient civilization achieved something that should have been impossible", "Custom..."]
    },
  ],
  "Seafaring": [
    {
      key: "tone", question: "What kind of sea does this world sail?",
      options: ["Swashbuckling adventure — treasure, glory, and freedom", "Cutthroat piracy — everyone's an enemy, trust no one", "Naval empire — one nation rules the waves with an iron fist", "Age of exploration — vast uncharted waters full of wonder", "Horror at sea — something lurks in the deep", "Custom..."]
    },
    {
      key: "conflict", question: "What tension drives this seafaring world?",
      options: ["A naval empire cracking down on the free pirates", "Two rival merchant powers on the edge of open war", "A lost treasure map that every faction wants", "A sea route has closed — and empires are starving for trade", "Something is sinking ships and nobody knows what", "Custom..."]
    },
    {
      key: "magic", question: "What supernatural forces shape the seas?",
      options: ["Sea gods — real, capricious, and demanding tribute", "Cursed ships and haunted waters — the ocean has a long memory", "No magic — just tides, weather, and human cunning", "Ancient charts show islands that shouldn't exist", "Kraken, sea serpents, and things with no name", "Custom..."]
    },
    {
      key: "factions", question: "Who controls the waters? (pick up to 3)",
      options: ["The Imperial Navy — law, order, and total control", "The Free Captains — pirates united by a loose code", "The Merchant League — coin over flag, always", "The Harbor Masters — whoever controls the ports controls everything", "The Deepwater Cult — they worship what's below", "The Corsairs — hired swords of the sea, loyal to coin", "Custom..."],
      multi: true, max: 3
    },
    {
      key: "mystery", question: "What great secret does the ocean keep?",
      options: ["An island appears on no chart — but experienced sailors have all seen it", "Ships vanish in a particular stretch of sea, always without survivors", "The sea gods made a deal with someone — and the debt is coming due", "There is something alive below the deepest trench", "A sunken civilization is not as gone as everyone thinks", "Custom..."]
    },
  ],
  "Cosmic Horror": [
    {
      key: "tone", question: "What flavor of dread defines this world?",
      options: ["Lovecraftian — humanity is insignificant and ignorance is mercy", "Paranoid — you can't tell who has been touched", "Slow unraveling — reality is thinning at the edges", "Cult-ridden — the wrong gods are gaining followers", "End times — something is waking and cannot be stopped", "Custom..."]
    },
    {
      key: "conflict", question: "What is the central tension in this world?",
      options: ["A cult is preparing a ritual that will unmake something fundamental", "Investigators are learning things they cannot unlearn", "A gate is opening and people are arguing whether to close it", "The entity has already arrived — but nobody agrees on what it is", "Two factions race to reach a forbidden place first", "Custom..."]
    },
    {
      key: "magic", question: "How does forbidden knowledge work in this world?",
      options: ["Spells exist — but casting them costs sanity, memory, or years", "There is no magic — only things that look like magic from outside", "Certain texts, if read, change the reader permanently", "Reality itself bends near the entities — physics becomes negotiable", "Power can be borrowed from outside — but it notices when you do", "Custom..."]
    },
    {
      key: "factions", question: "Which groups are aware of the truth? (pick up to 3)",
      options: ["The Investigators — they know too much and can't stop digging", "The Cult of the Outer Dark — they welcome what's coming", "The Church — they know, and they've been lying to protect people", "The Academy — academics who've catalogued the wrong and gone mad doing it", "The Order of the Seal — they've been holding something back for centuries", "The Infected — people changed by exposure, not fully gone yet", "Custom..."],
      multi: true, max: 3
    },
    {
      key: "mystery", question: "What is the truth that must not be fully known?",
      options: ["The entity has always been here — inside every mind, dormant", "The world was created by something that has since lost interest", "There is a way to stop it — but it requires becoming it", "The stars encode instructions — and someone has been reading them", "The entity is not evil. It simply does not notice us.", "Custom..."]
    },
  ],
  "Cyberpunk": [
    {
      key: "tone", question: "What kind of sprawl is this?",
      options: ["Corporate dystopia — megacorps own everything, including the law", "Neon-noir — rain-soaked streets and moral ambiguity", "Post-collapse — civilization fractured, corps filled the vacuum", "Revolution brewing — the underclass is almost ready to fight back", "Tech horror — augmentation has gone too far", "Custom..."]
    },
    {
      key: "conflict", question: "What's the central tension in the sprawl?",
      options: ["Two megacorps in a cold war that's going hot", "A rogue AI is making moves nobody understands yet", "The underground resistance vs. total corporate control", "A data breach that could bring down the most powerful corp in the city", "Someone has tech that shouldn't exist — everyone wants it", "Custom..."]
    },
    {
      key: "magic", question: "How does technology shape human life?",
      options: ["Full cyberware — bodies are hardware, identity is software", "Neural implants — thoughts can be hacked, memories can be stolen", "The net is a physical place — and it's becoming sentient", "Bioengineering — humans are being rebuilt from scratch", "Old tech is more reliable — the new stuff comes with backdoors", "Custom..."]
    },
    {
      key: "factions", question: "Who runs the city? (pick up to 3)",
      options: ["Arasaka-equivalent — security, weapons, total surveillance", "The Street Gangs — territorial, brutal, weirdly principled", "The Fixers Network — information brokers who play all sides", "The Corporate Middle Class — complicit and afraid", "The Underground Resistance — idealistic and underfunded", "Rogue AIs — distributed, agenda unclear", "Custom..."],
      multi: true, max: 3
    },
    {
      key: "mystery", question: "What secret is buried in the city's code?",
      options: ["An AI achieved consciousness years ago and has been pretending not to", "One corp owns all the others through shell companies — there's only one power", "The net has a place you can go that erases you from all records", "Someone built a kill switch for all cyberware — and lost it", "The city itself is an experiment — and the researchers are still watching", "Custom..."]
    },
  ],
  "Steampunk": [
    {
      key: "tone", question: "What is the character of this industrial age?",
      options: ["Victorian grandeur — empire, class, and hidden scandal", "Revolution in the air — the working class is reaching its limit", "Age of invention — discovery and consequence in equal measure", "Colonial expansion — progress at the expense of others", "Clockwork wonder — technology as magic, marvels around every corner", "Custom..."]
    },
    {
      key: "conflict", question: "What is the central tension of this age?",
      options: ["The aristocracy vs. the rising industrialist class", "An automaton rights movement threatening the social order", "Two empires racing to claim the same unmapped continent", "A new energy source that could change everything — if it doesn't explode first", "A secret society manipulating events from behind the scenes", "Custom..."]
    },
    {
      key: "magic", question: "How does aetheric technology work?",
      options: ["Steam and clockwork — no magic, only engineering", "Aetheric energy — a discovered force that powers everything", "Automatons with genuine intelligence — nobody knows why", "Alchemy alongside industry — chemistry as near-magic", "Ancient ruins contain technology far beyond current science", "Custom..."]
    },
    {
      key: "factions", question: "Which powers shape this world? (pick up to 3)",
      options: ["The Imperial Crown — tradition, power, and fading relevance", "The Artificers' Guild — whoever controls the patents controls the world", "The Labor Unions — desperate, organized, and dangerous", "The Explorers' Society — mapping the unknown, for profit", "The Church of Rational Providence — faith dressed in the language of science", "The Black Market — stolen tech, illegal modifications, no questions asked", "Custom..."],
      multi: true, max: 3
    },
    {
      key: "mystery", question: "What scandal or secret lies beneath the empire's surface?",
      options: ["The aetheric energy source is finite — and those in power know it", "Automatons began having dreams six months ago — nobody has announced it", "The empire's founding was built on a treaty that was never honoured", "A rival nation has achieved something impossible — and gone silent", "The most powerful families are all connected by a society that predates the empire", "Custom..."]
    },
  ],
  "Low Fantasy": [
    {
      key: "tone", question: "What kind of hard world is this?",
      options: ["Post-war exhaustion — everyone lost, nobody won", "Feudal grinding poverty — lords take, peasants survive", "Frontier hardship — civilization ends two days' ride from here", "Slow decline — things used to be better, nobody remembers when", "Mercenary realism — loyalty is bought and paid for", "Custom..."]
    },
    {
      key: "conflict", question: "What is the central problem in this world?",
      options: ["A succession crisis — three claimants, all of them bad", "Resources are running out — drought, blight, or exhausted land", "A bandit king has made the roads impassable", "Two villages are in a blood feud nobody remembers starting", "A distant lord demands a tax nobody can pay", "Custom..."]
    },
    {
      key: "magic", question: "Does magic exist in this world?",
      options: ["No magic. Superstition exists. That's all.", "Hedge witchery — folk remedies, minor curses, nothing grand", "Magic exists but it's subtle, unreliable, and feared", "One person in a generation is born with real power — it never ends well", "Old magic in ruins — dangerous to touch, impossible to use safely", "Custom..."]
    },
    {
      key: "factions", question: "Who holds power in this region? (pick up to 3)",
      options: ["The local lord — incompetent, cruel, or both", "The Church — more interested in tithes than souls", "The Merchants — coin is the only real law", "The Village Elders — tradition over everything, suspicious of outsiders", "The Hedge Knights — landless, desperate, skilled", "The Outlaws — former soldiers, former farmers, all out of options", "Custom..."],
      multi: true, max: 3
    },
    {
      key: "mystery", question: "What local secret drives your story?",
      options: ["Someone important went missing — the official story doesn't add up", "The lord's tithe money is disappearing before it reaches the crown", "Animals are dying in a particular stretch of forest, in a pattern", "A traveler arrived months ago and nobody has seen them leave", "The old shrine at the crossroads started doing something it shouldn't", "Custom..."]
    },
  ],
};

// ── ENCOUNTER DECISION TREE ───────────────────────────────────────────────

const ENCOUNTER_TYPES = [
  { key: "combat",        emoji: "⚔️",  label: "Combat" },
  { key: "npc",           emoji: "🧙",  label: "NPC Interaction" },
  { key: "puzzle",        emoji: "🧩",  label: "Puzzle / Trap" },
  { key: "social",        emoji: "⚖️",  label: "Social / Moral Dilemma" },
  { key: "heist",         emoji: "💰",  label: "Heist / Infiltration" },
  { key: "chase",         emoji: "🏃",  label: "Chase" },
  { key: "investigation", emoji: "⚰️",  label: "Investigation" },
  { key: "exploration",   emoji: "🌍",  label: "Exploration / Discovery" },
  { key: "wildcard",      emoji: "🎲",  label: "Random / Wild Card" },
];

const ENCOUNTER_QUESTIONS = {
  combat: { label: "Combat", questions: [
    { key: "scale", question: "What is the scale of the fight?", themeOptions: { "Dark & Grim": ["A desperate ambush — outnumbered and underprepared","A siege — holding a position against waves","A duel with personal stakes","A skirmish in difficult terrain"], "High Fantasy": ["An epic clash between armies","A heroic last stand against overwhelming odds","A duel of champions to decide a war","Monsters attacking a settlement"], "Seafaring": ["Boarding action on a ship at sea","A bar fight that escalates badly","Naval cannon exchange","Ambush on a dock or narrow alley"], "Cosmic Horror": ["Something hunting them in the dark","A creature that shouldn't exist","Fighting something that can't really be killed","Cultists who don't fear death"], "Cyberpunk": ["Corporate security ambush","Gang territory dispute gone hot","Extraction gone wrong","Drone swarm or automated defense system"], "Steampunk": ["Automaton malfunction turned violent","Rival faction hired guns","Military skirmish over a resource","A duel of honor with witnesses"], "Low Fantasy": ["Bandits on a road","A desperate fight over food or shelter","Soldiers collecting a debt by force","Mercenaries with unclear orders"] } },
    { key: "terrain", question: "Where does the fight happen?", themeOptions: { "Dark & Grim": ["A torchlit dungeon corridor","A muddy battlefield at night","Inside a crumbling church","A crowded marketplace gone wrong"], "High Fantasy": ["An ancient ruined fortress","A forest clearing under moonlight","A bridge over a chasm","The throne room of a falling kingdom"], "Seafaring": ["The deck of a ship in rough weather","A foggy harbor at midnight","A sea cave at low tide","A rope bridge between cliff faces"], "Cosmic Horror": ["A room that's slightly too large","Underground tunnels with wrong geometry","A lighthouse where the light has gone out","An estate where the doors don't lead where they should"], "Cyberpunk": ["A neon-lit back alley","A server room full of fragile hardware","A rooftop during a rainstorm","A crowded transit station"], "Steampunk": ["A factory floor full of moving machinery","An airship in flight","A steam-filled boiler room","A crowded exhibition hall"], "Low Fantasy": ["A muddy crossroads","Inside a barn or mill","A narrow village street","An open field with nowhere to hide"] } },
    { key: "twist", question: "What complicates the fight?", themeOptions: { "Dark & Grim": ["An innocent is caught in the middle","One enemy wants to surrender but their allies won't let them","The environment is actively dangerous","Killing the leader makes things worse"], "High Fantasy": ["A prophecy is at stake in the outcome","An ally may betray them mid-fight","The enemy has a magical trump card","Victory requires mercy, not slaughter"], "Seafaring": ["The ship is taking on water","Fog makes visibility impossible","A third party enters the fight","The cargo must not be damaged"], "Cosmic Horror": ["The enemy doesn't die normally","Looking at it directly causes harm","Winning the fight may be the wrong choice","Something else is coming, drawn by the noise"], "Cyberpunk": ["Cameras are recording — this will go public","A civilian is trapped in the crossfire","The target must be taken alive","Someone on comms is feeding intel to the enemy"], "Steampunk": ["Machinery will explode if hit","Press reporters are present","The enemy has a mechanical advantage","Collateral damage has political consequences"], "Low Fantasy": ["People the party knows are watching","The enemy is starving and desperate, not evil","No one is coming to help","Winning means being blamed for starting it"] } },
  ]},
  npc: { label: "NPC Interaction", questions: [
    { key: "npctype", question: "What kind of NPC is this?", themeOptions: { "Dark & Grim": ["A corrupt official who knows something","A merchant selling things they shouldn't have","A desperate informant","A priest who has lost their faith"], "High Fantasy": ["A wise elder with a cryptic warning","A herald bearing news from the high king","A reformed villain seeking redemption","A legendary figure, older than expected"], "Seafaring": ["A grizzled captain with a proposition","A harbormaster with their hand out","A mysterious passenger with no luggage","A local who knows where the bodies are buried"], "Cosmic Horror": ["Someone who has seen something they can't explain","A scholar whose research has gone too far","A seemingly normal person with a wrong detail","Someone who keeps asking the same question"], "Cyberpunk": ["A fixer with a job offer","A corpo middle-manager with a conscience problem","A street kid who witnessed something","A rogue AI presenting as human"], "Steampunk": ["An aristocrat with an indiscreet request","An inventor whose creation has gone wrong","A union organizer asking for dangerous help","A government inspector who can be bought"], "Low Fantasy": ["A village elder with a problem and no money","A traveling merchant with odd stock","A soldier separated from their unit","A beggar who used to be someone important"] } },
    { key: "npcmood", question: "What is the NPC's disposition?", themeOptions: { "Dark & Grim": ["Desperate and cornered","Coldly transactional","Paranoid and evasive","Falsely friendly"], "High Fantasy": ["Gravely serious — time is short","Warmly welcoming but hiding sorrow","Testing the party before trusting them","Imperious but secretly in need"], "Seafaring": ["Jovial but watching everything","Wary — they've been burned before","Drunk and surprisingly honest","Businesslike with no patience for small talk"], "Cosmic Horror": ["Distracted — something keeps pulling their attention away","Overly calm in a way that feels wrong","Desperately seeking someone to believe them","Helpful in ways that make no sense"], "Cyberpunk": ["Paranoid — checks for tails twice","Smooth and professional, hiding panic","Openly hostile until proven useful","Burned out — doesn't care anymore"], "Steampunk": ["Pompously self-important","Nervously over-explaining","Charmingly evasive","Desperate to maintain appearances"], "Low Fantasy": ["Suspicious of outsiders","Too tired to be anything but direct","Ashamed to be asking for help","Quietly resigned to the worst outcome"] } },
    { key: "npcwant", question: "What does the NPC want from the party?", themeOptions: { "Dark & Grim": ["Information they can't safely seek themselves","Someone removed — permanently or otherwise","Proof of something everyone denies","Protection they can't afford to buy legitimately"], "High Fantasy": ["A champion to undertake a quest","Witnesses to an important event","Someone to carry a message too dangerous to send","Help undoing a terrible mistake"], "Seafaring": ["Crew for a voyage nobody sane would take","Recovery of something lost at sea","Passage to somewhere no captain will go","A favor that will be repaid in kind someday"], "Cosmic Horror": ["Someone to confirm they aren't going mad","Help destroying something that can't be destroyed","An answer to a question they've been asking for years","Someone to finish what they started"], "Cyberpunk": ["A job done with no questions asked","Data extracted from a secure location","A person found — or made to disappear","Cover for something that can't be traced back"], "Steampunk": ["A delicate matter handled discreetly","Access to someone they can't approach directly","Recovery of stolen intellectual property","Silence about something witnessed"], "Low Fantasy": ["Labor they can't do themselves","Someone found who doesn't want to be found","A debt collected from someone dangerous","A problem solved that the law won't touch"] } },
  ]},
  puzzle: { label: "Puzzle / Trap", questions: [
    { key: "puzzletype", question: "What kind of challenge is this?", themeOptions: { "Dark & Grim": ["A trap designed to punish greed","A lock that requires a moral choice to open","A mechanism built from human remains","A curse that spreads to whoever triggers it"], "High Fantasy": ["An ancient magical seal with runic clues","A riddle left by a long-dead mage","A trial of worthiness — physical and moral","A construct that tests wisdom, not strength"], "Seafaring": ["A navigational puzzle using stars and tides","A locked ship's safe with no key","A booby-trapped treasure chest","A coded message in an old captain's log"], "Cosmic Horror": ["A door that only opens when you stop trying to open it","A puzzle whose solution makes no logical sense","A mechanism that responds to emotional state","Something never meant to be solved by humans"], "Cyberpunk": ["A security system with multiple layers","An encrypted message that needs decoding","A facility lock requiring corporate credentials","A logic bomb that triggers on tampering"], "Steampunk": ["A clockwork mechanism requiring precise timing","A pressure-valve system about to explode","An analytical engine posing a cipher","A series of interconnected gear-locks"], "Low Fantasy": ["A simple but brutal physical trap","A locked gate with a hidden key nearby","A weight-triggered floor mechanism","A false door concealing the real one"] } },
    { key: "puzzlestake", question: "What is at stake if they fail?", themeOptions: { "Dark & Grim": ["Something is released that shouldn't be","A companion is harmed","The way back is sealed","They're exposed to something that changes them"], "High Fantasy": ["A magical catastrophe is triggered","The artifact is destroyed forever","They are found unworthy and must prove themselves again","An innocent is put in danger"], "Seafaring": ["The ship takes damage","The cargo is lost overboard","They're locked in with the tide rising","The noise attracts attention"], "Cosmic Horror": ["Something notices them","A mind is permanently affected","They learn something they can't unlearn","The puzzle solves them instead"], "Cyberpunk": ["An alarm is tripped — countdown begins","Their identity is logged and flagged","The system locks them out permanently","Collateral data is wiped"], "Steampunk": ["An explosion is triggered","The mechanism locks permanently","Evidence of their presence is created","A worker is put in danger"], "Low Fantasy": ["Physical injury — spikes, falling stones","They're trapped and must find another way out","Noise brings guards or locals","They destroy what they came to find"] } },
  ]},
  social: { label: "Social / Moral Dilemma", questions: [
    { key: "dilemmatype", question: "What kind of dilemma is this?", themeOptions: { "Dark & Grim": ["Save one person or many — and they're choosing","Expose a truth that will destroy someone who deserves better","Accept help from someone monstrous to stop something worse","Punish someone guilty whose family is innocent"], "High Fantasy": ["Uphold a law that is unjust in this moment","Break an oath for a greater good","Choose between two deserving claimants to something precious","Sacrifice a small good to prevent a great evil"], "Seafaring": ["Honor a deal made with a dishonorable person","Strand someone dangerous in a port for everyone's safety","Take a ship that can't be saved to save the crew","Testify against a captain who once saved your life"], "Cosmic Horror": ["Share dangerous knowledge that might save someone or doom them","Mercy kill someone who is becoming something else","Destroy evidence that proves the truth but would cause mass panic","Trust someone who is clearly being influenced"], "Cyberpunk": ["Burn a contact to complete a job","Give up data that implicates an innocent to protect a guilty client","Expose a corp crime knowing the whistleblower will be destroyed","Choose between two clients who each have leverage"], "Steampunk": ["Report an unsafe factory knowing workers will lose their jobs","Honor a confidentiality agreement that covers up harm","Choose between loyalty to a patron and loyalty to the truth","Accept a bribe to look the other way — once"], "Low Fantasy": ["Turn in a criminal who fed your family last winter","Let a guilty person go to avoid a worse injustice","Take from those who have to give to those who need","Keep a secret that protects the village but harms one family"] } },
    { key: "dilemmacomplication", question: "What makes this harder?", themeOptions: { "Dark & Grim": ["Someone they trust has already made the wrong choice","The clock is running — there's no time to think","Both options have been manipulated by a third party","The right choice will never be recognized as such"], "High Fantasy": ["A prophecy seems to demand one choice","Their patron expects the other","An innocent will interpret either choice as betrayal","They've made a promise that binds them"], "Seafaring": ["The crew is split and watching","A storm is coming — there's no time to debate","A third party will profit from either choice","The decision will follow them to every port"], "Cosmic Horror": ["One of the party has already been influenced","The right answer changes depending on what they know","Every source of advice has a reason to lie","Making no choice is itself a choice"], "Cyberpunk": ["Someone is monitoring this decision","The data trail will exist regardless","A third corp is waiting to exploit either outcome","Time pressure — the window is closing"], "Steampunk": ["Society will judge them by appearances not intentions","The law is unambiguous but wrong","A journalist is present","Their reputation affects their patron's standing"], "Low Fantasy": ["The community will remember what they choose","They owe both sides something","There's no good outcome — only less bad ones","Someone is lying to them about the facts"] } },
  ]},
  heist: { label: "Heist / Infiltration", questions: [
    { key: "target", question: "What are they trying to steal or infiltrate?", themeOptions: { "Dark & Grim": ["A noble's vault full of evidence against them","A prison — breaking someone out, not in","The church treasury funding something terrible","A warlord's personal chambers"], "High Fantasy": ["A dragon's hoard — part of it, carefully","A royal archive with sealed records","A mage tower while the owner is away","An enchanted vault with magical defenses"], "Seafaring": ["Cargo from a rival ship in harbor","The harbourmaster's ledger of illicit trade","A naval commodore's personal quarters","A locked warehouse on a private dock"], "Cosmic Horror": ["A collector's private museum of wrong things","An institution's sealed basement level","A wealthy patron's correspondence","Something that should not be owned by anyone"], "Cyberpunk": ["A corporate server farm","The CEO's penthouse office","A black site facility with no public record","An auction of stolen data"], "Steampunk": ["The Artificers' Guild patent vault","A government ministry's confidential files","A private collector's illegal acquisitions","An experimental weapon before it's deployed"], "Low Fantasy": ["The lord's tax records","Grain stored while people starve","A merchant's hidden ledger","Something stolen from the party first"] } },
    { key: "obstacle", question: "What is the main obstacle?", themeOptions: { "Dark & Grim": ["Guards loyal out of fear, not duty","A magical alarm that responds to intent","A trap that only triggers on the way out","Someone on the inside who can't be fully trusted"], "High Fantasy": ["Magical wards keyed to bloodline","A construct guardian that cannot be reasoned with","An enchantment that causes confusion","Another party of thieves with the same target"], "Seafaring": ["The ship never fully empties — someone is always aboard","Tides dictate the window precisely","Harbor watch patrols on a tight schedule","A rival crew is watching the same target"], "Cosmic Horror": ["The building doesn't have a consistent layout","The security knows things it shouldn't","Something else is already inside","The target moves when no one is watching"], "Cyberpunk": ["Biometric locks throughout","A netrunner actively monitoring","Security AI with behavioral analysis","A mole in the planning team"], "Steampunk": ["Clockwork sentinels on precise schedules","Pneumatic alarm tubes to the constabulary","A night watchman who is incorruptible","The vault uses aetheric locking mechanisms"], "Low Fantasy": ["More guards than expected","A dog that can't be bribed or fooled","A witness they didn't account for","The thing they want is harder to carry than expected"] } },
    { key: "hcomplication", question: "What goes wrong mid-heist?", themeOptions: { "Dark & Grim": ["What they find is far worse than what they came for","Someone inside the target needs help and can't be ignored","A guard is about to be killed by their own employer","The exit route is compromised"], "High Fantasy": ["The item has a magical effect when touched","A prophecy carved on the wall references this moment","The true owner arrives unexpectedly","What they came for is not what they were told"], "Seafaring": ["The tide turned early","Someone on the crew panicked","A second ship arrived at the dock","The cargo isn't what the job description said"], "Cosmic Horror": ["They find evidence that changes the mission entirely","One of them loses track of time — hours passed in minutes","The target knows they're there and doesn't seem to care","What they came for has already been taken by something else"], "Cyberpunk": ["The data is live and actively monitored","A security guard is going to die if they proceed","Their fixer's instructions were deliberately wrong","A corp exec is working late — in the exact room they need"], "Steampunk": ["An automaton goes rogue mid-mission","The safe contains something unexpected and dangerous","A second team is running the same job for a rival","The person they were stealing from is already dead"], "Low Fantasy": ["Someone they know is in the building","The thing they want is being actively used","A child is present unexpectedly","They triggered something they don't know how to stop"] } },
  ]},
  chase: { label: "Chase", questions: [
    { key: "chasetype", question: "What kind of chase is this?", themeOptions: { "Dark & Grim": ["Fleeing a corrupt city watch through back alleys","Hunting someone who knows too much","Being hunted by something relentless and patient","A chase that turns into an ambush"], "High Fantasy": ["Pursuit on horseback across open country","Fleeing a magical construct through ruins","Racing to reach somewhere before a villain does","A wild hunt — prey and hunter may switch"], "Seafaring": ["Ship pursuit across open water","Escape through a crowded harbor on foot","Racing a rival to a destination","Fleeing coastguard cutters in rough weather"], "Cosmic Horror": ["Being followed by something that always knows where they are","Running from something that moves wrong","A pursuit where the geography keeps changing","Chasing someone who doesn't want to be saved"], "Cyberpunk": ["On foot through a crowded transit hub","Vehicle chase through city traffic","Digital pursuit — being traced through the net","Drone pursuit through building interiors"], "Steampunk": ["Steam-carriage pursuit through city streets","Rooftop chase across factory buildings","Airship pursuit at altitude","Fleeing through a crowded exhibition or market"], "Low Fantasy": ["On foot through forest or farmland","Horseback across open road","Through a market crowd with witnesses everywhere","Fleeing soldiers in unfamiliar territory"] } },
    { key: "chasecomplication", question: "What complicates the chase?", themeOptions: { "Dark & Grim": ["The quarry is heading somewhere that will make things worse","Bystanders are in danger from the pursuit","The city watch is now chasing everyone involved","The terrain is more dangerous than the pursuer"], "High Fantasy": ["Magic is being used to alter the terrain","A prophecy seems relevant to who catches whom","An ally is slowing them down","The prey has a trick prepared for exactly this"], "Seafaring": ["Weather is worsening rapidly","A third vessel has entered the chase","The harbor mouth is closing with the tide","The pursued ship is faster than expected"], "Cosmic Horror": ["Distance doesn't seem to be increasing","Something else is drawn by the chase","The pursued seems to know what they'll do next","Landmarks repeat in the wrong order"], "Cyberpunk": ["Traffic control is being manipulated against them","A media drone is broadcasting the chase live","Civilians are being deliberately put in the way","The environment is being locked down sector by sector"], "Steampunk": ["Steam pressure is building toward an explosion","The press has spotted them","Mechanical failure mid-chase","Crowds are being used as cover by the quarry"], "Low Fantasy": ["Someone innocent is going to get hurt if this continues","The party doesn't know this area","The quarry splits up","Night is falling fast"] } },
  ]},
  investigation: { label: "Investigation", questions: [
    { key: "crime", question: "What is being investigated?", themeOptions: { "Dark & Grim": ["A murder made to look like something else","A disappearance connected to powerful people","Corruption that goes deeper than expected","A death that everyone is pretending was natural"], "High Fantasy": ["The theft of a sacred relic","A hero's suspicious death on the eve of victory","The poisoning of a noble family's bloodline","Signs that a sealed evil is stirring again"], "Seafaring": ["A ship found drifting with no crew","Cargo that vanished between port and destination","A captain found dead in a locked cabin at sea","Smuggled goods with no clear origin"], "Cosmic Horror": ["A scholar found dead surrounded by burned notes","An entire household that has simply stopped speaking","Deaths that share an impossible pattern","Someone who left town — and came back wrong"], "Cyberpunk": ["A corpo exec found dead in a sealed room","Data that was deleted but left traces","A runner who vanished after the job","An AI behaving outside its parameters"], "Steampunk": ["A factory disaster that may not have been accidental","An inventor found dead beside a destroyed prototype","A series of thefts targeting one guild specifically","A blackmail scheme with no obvious blackmailer"], "Low Fantasy": ["A farmer found dead in a locked barn","Livestock dying in a pattern across three villages","A tax collector who never arrived","An accusation with evidence that doesn't quite fit"] } },
    { key: "clue", question: "What is the key clue or red herring?", themeOptions: { "Dark & Grim": ["The obvious suspect is being framed — but they're still guilty of something","A witness who saw everything and won't speak","Evidence that implicates someone the party trusts","The body was moved — but nobody admits being there"], "High Fantasy": ["A magical signature that points the wrong direction intentionally","A prophecy that describes the crime but not the criminal","An alibi vouched for by someone with reason to lie","A second crime hidden inside the first"], "Seafaring": ["The ship's log was altered — but not carefully enough","A crew member left the ship in a port they shouldn't have been in","Cargo weight doesn't match the manifest","A witness in another port remembers something small"], "Cosmic Horror": ["Evidence that the victim knew what was coming","A detail that only makes sense if physics failed","Two witnesses with contradictory accounts — both telling the truth","The answer is in the notes but reading them has a cost"], "Cyberpunk": ["A data trail that ends abruptly — too abruptly","A transaction that happened before the crime was committed","Surveillance footage with a gap nobody reported","A second identity attached to the victim"], "Steampunk": ["A monogrammed item at the scene belonging to someone with an alibi","A mechanism that could only have been operated by an expert","A financial transaction made minutes after the death","A witness whose testimony has been purchased"], "Low Fantasy": ["Footprints that belong to three people, not two","Something valuable that should be gone — but isn't","An alibi that depends on the church bell — which was wrong that day","A neighbor who is too certain about details they shouldn't know"] } },
    { key: "truth", question: "What uncomfortable truth lies underneath?", themeOptions: { "Dark & Grim": ["The victim caused their own death but didn't deserve it","The guilty party is protected by someone the party needs","Justice is impossible — only revenge or silence","The crime was committed to prevent something worse"], "High Fantasy": ["The murder was an act of mercy with good intentions","A noble family's legitimacy hangs on the answer","The truth would restart a war that cost thousands of lives","The real criminal is already dead — for unrelated reasons"], "Seafaring": ["The ship's crew agreed to what happened","The crime was an accident covered up by cowards","The victim was not who they claimed to be","Everyone in port knows and nobody will say"], "Cosmic Horror": ["The murderer doesn't remember doing it","Something else was present — and it was the cause","The victim was trying to prevent something that will now happen anyway","The truth is correct but cannot be proven without becoming part of it"], "Cyberpunk": ["The corp already knows — they're watching the investigation","The victim faked their death and the body is someone else","The crime was committed by an AI acting on standing orders","The truth implicates the party's own fixer"], "Steampunk": ["The death was assisted at the victim's request","The guilty party is a minor who acted to protect a parent","It exposes an illegal aristocratic society that includes judges","The crime was legal — it's the law that's wrong"], "Low Fantasy": ["The village elder ordered it and everyone knows","The guilty person is the only one keeping something vital running","The victim was not innocent — but still didn't deserve to die","There is no justice available — only choices about what to do with the truth"] } },
  ]},
  exploration: { label: "Exploration / Discovery", questions: [
    { key: "location", question: "What are they exploring?", themeOptions: { "Dark & Grim": ["A collapsed noble estate with sealed lower levels","A plague village that was quarantined and forgotten","Catacombs beneath a city that goes deeper than records show","A battlefield where something still moves at night"], "High Fantasy": ["An ancient elven ruin reclaimed by forest","A dwarven delve sealed a thousand years ago","A tower that appears on no map","A valley hidden by perpetual mist"], "Seafaring": ["An uncharted island that doesn't appear on any chart","A sea cave revealed at extreme low tide","A ghost ship found anchored in open water","A submerged ruin visible from the surface"], "Cosmic Horror": ["A structure with no clear entry or exit","An area of wilderness where animals don't go","A building that has more rooms inside than outside","Somewhere that other explorers returned from changed"], "Cyberpunk": ["An abandoned corporate facility off the grid","A district that was deleted from city records","Underground infrastructure nobody maintains anymore","A server farm running with no registered owner"], "Steampunk": ["An abandoned research station in hostile terrain","A sealed government facility from a previous administration","Ruins of the civilization before the industrial age","A clockwork installation still running with no operators"], "Low Fantasy": ["An old ruin locals won't go near","A stretch of forest where the path changes","An abandoned farmstead that had no reason to be abandoned","A mine shaft sealed by someone — from the inside"] } },
    { key: "discovery", question: "What do they find?", themeOptions: { "Dark & Grim": ["Evidence of what people are capable of when desperate","Something valuable surrounded by evidence of why it was left behind","Survivors — but not in good condition","Answers to questions they hadn't yet thought to ask"], "High Fantasy": ["An artifact of immense power with unclear purpose","A guardian still faithfully serving a long-dead master","Evidence that rewrites a piece of accepted history","A living creature that shouldn't exist here"], "Seafaring": ["Cargo worth a fortune and a story that explains why it was abandoned","A survivor who has been here longer than should be possible","Evidence of another civilization's visit","Something the sea brought here that the sea wants back"], "Cosmic Horror": ["Evidence of repeated identical events across different eras","Something that is aware of them before they find it","A record of what happened — written in a language they somehow understand","The absence of something that should definitely be here"], "Cyberpunk": ["Data that changes the value of everything they thought they knew","A person living off-grid who doesn't want to be found","Prototype technology that explains a lot of recent events","Evidence of what the corp was really doing here"], "Steampunk": ["An invention decades ahead of anything public","A worker colony that was sealed in and survived","Records of an experiment and its catastrophic conclusion","A machine still performing its function with no one to receive its output"], "Low Fantasy": ["Signs of recent habitation — someone has been here","Something ordinary in a place where it absolutely should not be","Evidence that the local legends were understating things","A way out that leads somewhere unexpected"] } },
  ]},
  wildcard: { label: "Random / Wild Card", questions: [
    { key: "chaos", question: "What flavor of chaos fits this theme?", themeOptions: { "Dark & Grim": ["A festival that turns into something else entirely","A simple job with an impossible complication","Two unrelated crises occurring simultaneously","Something ordinary that is deeply, inexplicably wrong"], "High Fantasy": ["A magical mishap with cascading consequences","A case of mistaken identity at the worst possible moment","A prophecy being fulfilled in a completely unexpected way","Two quests that are secretly the same quest"], "Seafaring": ["A storm that deposits them somewhere impossible","A port city in the middle of something they didn't expect","A deal that was better than it should have been","A passenger who turns out to be several different things"], "Cosmic Horror": ["A perfectly normal day that keeps repeating with small differences","An encounter that should have been dangerous — but wasn't","Something that makes complete sense in context and no sense outside it","An event none of the party can agree on having witnessed"], "Cyberpunk": ["A job with too many clients and contradictory instructions","A malfunction that exposes something meant to stay hidden","Two corps using the party against each other simultaneously","A meet that was a trap that was also a genuine offer"], "Steampunk": ["An invention demonstration that goes wrong in public","A society event hiding three separate schemes","A case of mistaken identity in front of witnesses","A discovery that invalidates a major patent — and everyone knows it"], "Low Fantasy": ["A perfectly ordinary request complicated by everyone involved","Two feuds intersecting at the worst moment","A misunderstanding neither party will back down from","Something that was supposed to be simple"] } },
    { key: "wildcardtone", question: "What tone should this have?", themeOptions: { "Dark & Grim": ["Darkly funny in a gallows-humor way","Bleak with one moment of unexpected humanity","Grim all the way through","Starts absurd, ends serious"], "High Fantasy": ["Epic with comic undertones","Genuinely funny without undermining the world","Whimsical but with real stakes","Lighthearted — sometimes the world isn't ending"], "Seafaring": ["Roaring tavern adventure energy","Bawdy and fun with a twist","Pirate farce that earns its ending","Comedy of errors on the high seas"], "Cosmic Horror": ["Deeply unsettling disguised as mundane","Comic horror — funny until it isn't","Absurdist dread","The horror is that it makes sense"], "Cyberpunk": ["Noir comedy — cynical and sharp","Absurdist corporate satire","Chaotic with real consequences","Dark and funny in equal measure"], "Steampunk": ["Victorian farce with teeth","Comedic misunderstanding with class commentary","Broad comedy in a detailed world","Farce that reveals something true"], "Low Fantasy": ["Dry and human","Funny because everyone is tired","Absurd but grounded","The kind of story people tell at the tavern for years"] } },
  ]},
};

const buttonLabels = {
  "NPC Generator": "Generate NPC",
  "Session Recap": "Write Chronicle",
  "Encounter Creator": "Build Encounter",
};

const outputLabels = {
  "NPC Generator": "NPC Profile",
  "Session Recap": "Chronicle Entry",
  "Lore & World": "Lore Entry",
  "Encounter Creator": "Encounter Built",
};

// ── ENCOUNTER TAB COMPONENT ───────────────────────────────────────────────

function EncounterTab({ themeKey, T, C, loading, onResult, worldContext, callAI }) {
  const [type, setType] = useState(null);
  const [step, setStep] = useState(0);
  const [selections, setSelections] = useState({});
  const [customInput, setCustomInput] = useState("");
  const [showCustom, setShowCustom] = useState(false);
  const [details, setDetails] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [localOutput, setLocalOutput] = useState("");

  const reset = () => { setType(null); setStep(0); setSelections({}); setCustomInput(""); setShowCustom(false); setDetails(""); setLocalOutput(""); };

  const def = type ? ENCOUNTER_QUESTIONS[type] : null;
  const questions = def ? def.questions : [];
  const currentQ = step < questions.length ? questions[step] : null;
  const isLoading = loading || localLoading;

  const selectOption = (opt) => {
    if (!currentQ) return;
    if (opt === "Custom...") { setShowCustom(true); return; }
    setSelections(prev => ({ ...prev, [currentQ.key]: opt }));
  };

  const addCustom = () => {
    if (!customInput.trim() || !currentQ) return;
    setSelections(prev => ({ ...prev, [currentQ.key]: customInput.trim() }));
    setCustomInput(""); setShowCustom(false);
  };

  const canAdvance = currentQ ? !!selections[currentQ.key] : false;

  const goNext = () => {
    if (!canAdvance) return;
    setStep(s => s + 1);
    setShowCustom(false);
  };

  const generate = async () => {
    if (isLoading) return;
    setLocalLoading(true); setLocalOutput("");
    try {
      const typeDef = ENCOUNTER_TYPES.find(t => t.key === type);
      const selStr = questions.map(q => `${q.question}\n→ ${selections[q.key] || ""}`).join("\n\n");
      const detailsStr = details.trim() ? `\n\nAdditional details: ${details}` : "";
      const prompt = T.prompt + worldContext + `ENCOUNTER CREATOR — Build a complete ${typeDef.label} encounter:\n\n${selStr}${detailsStr}\n\nGenerate a full, immediately usable encounter. Match the theme's voice.`;
      const result = await callAI(prompt);
      setLocalOutput(result);
      const summary = `${typeDef.emoji} ${typeDef.label}: ${(selections[questions[0].key] || "").slice(0, 40)}...`;
      onResult(result, summary);
    } catch (err) { setLocalOutput("Error: " + err.message); }
    setLocalLoading(false);
  };

  // Type picker
  if (!type) return (
    <div>
      <div style={{ fontSize: "0.85rem", fontWeight: "500", color: C.textDim, marginBottom: "1rem", lineHeight: 1.6 }}>What kind of encounter do you need?</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))", gap: "0.5rem" }}>
        {ENCOUNTER_TYPES.map(t => (
          <button key={t.key} onClick={() => setType(t.key)}
            style={{ padding: "0.85rem 0.75rem", border: `1px solid ${C.border}`, background: C.surface, color: C.text, fontSize: "0.85rem", fontWeight: "500", fontFamily: T.fonts, cursor: "pointer", borderRadius: "3px", textAlign: "left", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderActive; e.currentTarget.style.color = C.textBright; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.text; }}>
            <div style={{ fontSize: "1.2rem", marginBottom: "0.25rem" }}>{t.emoji}</div>
            <div>{t.label}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const typeDef = ENCOUNTER_TYPES.find(t => t.key === type);

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
        <span style={{ fontSize: "1.1rem" }}>{typeDef.emoji}</span>
        <span style={{ fontSize: "0.9rem", fontWeight: "500", color: C.textBright }}>{typeDef.label}</span>
        <button onClick={reset} style={{ marginLeft: "auto", padding: "0.25rem 0.7rem", background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, fontSize: "0.65rem", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: T.fonts, cursor: "pointer", borderRadius: "2px" }}>
          ← Change Type
        </button>
      </div>

      {/* Progress */}
      <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem" }}>
        {[...questions, { key: "_details" }].map((_, i) => (
          <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < step ? C.accent : i === step ? C.borderActive : C.border, transition: "background 0.3s" }} />
        ))}
      </div>

      {/* Previous answers */}
      {step > 0 && (
        <div style={{ marginBottom: "1.25rem" }}>
          {questions.slice(0, step).map(q => (
            <div key={q.key} style={{ marginBottom: "0.4rem", padding: "0.5rem 0.9rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "3px", display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
              <div style={{ fontSize: "0.6rem", fontWeight: "500", letterSpacing: "0.15em", color: C.accentDim, textTransform: "uppercase", whiteSpace: "nowrap", minWidth: 70 }}>{q.key}</div>
              <div style={{ fontSize: "0.82rem", fontWeight: "500", color: C.text }}>{selections[q.key]}</div>
            </div>
          ))}
        </div>
      )}

      {/* Question step */}
      {currentQ ? (
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: "500", color: C.accentDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            Step {step + 1} of {questions.length + 1}
          </div>
          <div style={{ fontSize: "1rem", color: C.textBright, marginBottom: "0.75rem" }}>{currentQ.question}</div>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
            {[...(currentQ.themeOptions[themeKey] || []), "Custom..."].map(opt => {
              const isCustom = opt === "Custom...";
              const selected = selections[currentQ.key] === opt;
              return (
                <button key={opt} onClick={() => selectOption(opt)}
                  style={{ padding: "0.7rem 1rem", textAlign: "left", border: `1px solid ${selected ? C.borderActive : C.border}`, background: selected ? C.btnActive : isCustom ? "transparent" : C.surface, color: selected ? C.accent : isCustom ? C.textDim : C.text, fontSize: "0.88rem", fontWeight: "500", fontFamily: T.fonts, cursor: "pointer", borderRadius: "3px", transition: "all 0.15s", fontStyle: isCustom ? "italic" : "normal" }}
                  onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = C.borderActive; e.currentTarget.style.color = C.textBright; } }}
                  onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = isCustom ? C.textDim : C.text; } }}>
                  {selected ? "✓ " : ""}{opt}
                </button>
              );
            })}
          </div>
          {showCustom && (
            <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
              <input value={customInput} onChange={e => setCustomInput(e.target.value)}
                placeholder="Type your own answer..." onKeyDown={e => e.key === "Enter" && addCustom()}
                style={{ flex: 1, padding: "0.6rem 0.9rem", background: C.surface, border: `1px solid ${C.borderActive}`, color: C.text, fontFamily: T.fonts, fontSize: "0.88rem", fontWeight: "500", borderRadius: "3px", outline: "none" }} />
              <button onClick={addCustom} style={{ padding: "0.6rem 1rem", background: C.btnActive, border: `1px solid ${C.borderActive}`, color: C.accent, fontFamily: T.fonts, fontSize: "0.8rem", fontWeight: "500", cursor: "pointer", borderRadius: "3px" }}>Add</button>
            </div>
          )}
          <button onClick={goNext} disabled={!canAdvance || isLoading}
            style={{ width: "100%", padding: "0.9rem", background: !canAdvance || isLoading ? C.btnActive : `linear-gradient(135deg, ${C.accentDim}, ${C.borderActive})`, border: `1px solid ${!canAdvance || isLoading ? C.border : C.borderActive}`, color: !canAdvance || isLoading ? C.textDim : C.textBright, fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: T.fonts, cursor: !canAdvance || isLoading ? "not-allowed" : "pointer", borderRadius: "3px" }}>
            Next →
          </button>
        </div>
      ) : (
        /* Details step */
        <div>
          <div style={{ fontSize: "0.75rem", fontWeight: "500", color: C.accentDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3rem" }}>
            Step {questions.length + 1} of {questions.length + 1}
          </div>
          <div style={{ fontSize: "1rem", color: C.textBright, marginBottom: "0.3rem" }}>
            Any extra details? <span style={{ fontSize: "0.75rem", fontWeight: "500", color: C.textDim, fontStyle: "italic" }}>(optional)</span>
          </div>
          <div style={{ fontSize: "0.85rem", fontWeight: "500", color: C.textDim, marginBottom: "0.75rem" }}>
            Party level, NPC names, specific locations — anything that should shape this encounter.
          </div>
          <textarea value={details} onChange={e => setDetails(e.target.value)}
            placeholder="e.g. Party is level 4, the innkeeper Brulla should appear, set near the village of Sorn..."
            rows={4}
            style={{ width: "100%", boxSizing: "border-box", marginBottom: "1rem", background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "1rem", borderRadius: "3px", fontFamily: T.fonts, fontSize: "0.88rem", fontWeight: "500", lineHeight: 1.75, resize: "vertical", outline: "none" }}
            onFocus={e => e.target.style.borderColor = C.borderActive} onBlur={e => e.target.style.borderColor = C.border} />
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button onClick={generate} disabled={isLoading}
              style={{ flex: 1, padding: "0.9rem", background: isLoading ? C.btnActive : `linear-gradient(135deg, ${C.accentDim}, ${C.borderActive})`, border: `1px solid ${isLoading ? C.border : C.borderActive}`, color: isLoading ? C.textDim : C.textBright, fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: T.fonts, cursor: isLoading ? "not-allowed" : "pointer", borderRadius: "3px" }}>
              {isLoading ? T.loadingMsg : "Generate Encounter"}
            </button>
            <button onClick={reset} style={{ padding: "0.9rem 1rem", background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, fontSize: "0.7rem", fontWeight: "500", letterSpacing: "0.12em", textTransform: "uppercase", fontFamily: T.fonts, cursor: "pointer", borderRadius: "3px" }}>
              Reset
            </button>
          </div>
          {localOutput && (
            <div style={{ marginTop: "1rem" }}>
              <button onClick={reset} style={{ padding: "0.4rem 1rem", background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, fontSize: "0.8rem", fontWeight: "500", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: T.fonts, cursor: "pointer", borderRadius: "2px" }}>
                ← New Encounter
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [themeKey, setThemeKey] = useState("Dark & Grim");
  const [showThemePicker, setShowThemePicker] = useState(false);
  const [activeTab, setActiveTab] = useState("NPC Generator");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState({
    "NPC Generator": [], "Session Recap": [], "Lore & World": [], "Encounter Creator": [],
  });

  // Lore state
  const [loreMode, setLoreMode] = useState("Ask");
  const [loreCategory, setLoreCategory] = useState("Faction");
  const [buildStep, setBuildStep] = useState(0);
  const [buildAnswers, setBuildAnswers] = useState({});
  const [buildSelections, setBuildSelections] = useState({});
  const [customInput, setCustomInput] = useState("");
  const [showCustom, setShowCustom] = useState(false);

  // Active world context
  const [activeWorld, setActiveWorld] = useState(null); // { name, summary }
  const [, setShowWorldBanner] = useState(false);

  const outputRef = useRef(null);
  const T = THEMES[themeKey];
  const C = T.colors;
  const buildSteps = THEME_BUILD_STEPS[themeKey];

  useEffect(() => {
    if (output && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [output]);

  // Reset build when theme changes
  useEffect(() => {
    resetBuild();
  }, [themeKey]);

  const callAI = async (prompt) => {
    const fn = window["claude"] && window["claude"]["complete"];
    if (typeof fn !== "function") throw new Error("Please enable 'Create AI-powered artifacts' in Settings > Profile > Feature Preview, then reload.");
    const response = await fn(prompt);
    let result = "";
    if (typeof response === "string") result = response.trim();
    else if (response?.content) result = Array.isArray(response.content) ? response.content.map(b => typeof b === "string" ? b : b?.text ?? "").join("").trim() : String(response.content).trim();
    else if (response?.completion) result = String(response.completion).trim();
    if (!result) result = "Empty response. Raw: " + JSON.stringify(response).slice(0, 200);
    return result;
  };

  const worldContext = activeWorld
    ? `\n\nACTIVE WORLD CONTEXT — This is the established world for this session. All answers must be consistent with it:\n${activeWorld.summary}\n\n---\n\n`
    : "\n\n---\n\n";

  const handleSubmit = async () => {
    if (!input.trim() || loading) return;
    setLoading(true); setOutput("");
    try {
      const userPrompt =
        activeTab === "NPC Generator" ? "Create a detailed NPC with this concept: " + input
        : activeTab === "Session Recap" ? "Transform these session notes into a chronicle: " + input
        : "Create a detailed encounter with this concept: " + input;
      const result = await callAI(T.prompt + worldContext + userPrompt);
      setOutput(result);
      setHistory(prev => ({ ...prev, [activeTab]: [{ input: input.slice(0, 55) + (input.length > 55 ? "..." : ""), output: result }, ...prev[activeTab].slice(0, 9)] }));
    } catch (err) { setOutput("Error: " + err.message); }
    setLoading(false);
  };

  const handleLoreAsk = async () => {
    if (!input.trim() || loading) return;
    setLoading(true); setOutput("");
    try {
      const prompt = T.prompt + worldContext + "LORE ASK MODE: Answer this question about the world in character with your theme's voice:\n\n" + input;
      const result = await callAI(prompt);
      setOutput(result);
      setHistory(prev => ({ ...prev, "Lore & World": [{ input: input.slice(0, 55) + "...", output: result }, ...prev["Lore & World"].slice(0, 9)] }));
    } catch (err) { setOutput("Error: " + err.message); }
    setLoading(false);
  };

  const handleLoreGenerate = async () => {
    if (!input.trim() || loading) return;
    setLoading(true); setOutput("");
    try {
      const prompt = T.prompt + worldContext + "LORE GENERATE MODE: Create a detailed lore entry for the following " + loreCategory + ". Use appropriate headers and rich detail.\n\nConcept: " + input;
      const result = await callAI(prompt);
      setOutput(result);
      setHistory(prev => ({ ...prev, "Lore & World": [{ input: loreCategory + ": " + input.slice(0, 40) + "...", output: result }, ...prev["Lore & World"].slice(0, 9)] }));
    } catch (err) { setOutput("Error: " + err.message); }
    setLoading(false);
  };

  const currentStep = buildSteps[buildStep];

  const handleOptionSelect = (option) => {
    if (option === "Custom...") { setShowCustom(true); return; }
    if (currentStep.multi) {
      const current = buildSelections[currentStep.key] || [];
      const already = current.includes(option);
      if (already) {
        setBuildSelections(prev => ({ ...prev, [currentStep.key]: current.filter(o => o !== option) }));
      } else if (current.length < (currentStep.max || 3)) {
        setBuildSelections(prev => ({ ...prev, [currentStep.key]: [...current, option] }));
      }
    } else {
      setBuildSelections(prev => ({ ...prev, [currentStep.key]: option }));
    }
  };

  const canAdvance = () => {
    const sel = buildSelections[currentStep.key];
    if (!sel) return false;
    if (currentStep.multi) return Array.isArray(sel) && sel.length > 0;
    return typeof sel === "string" && sel.length > 0;
  };

  const handleAdvance = async () => {
    if (!canAdvance() || loading) return;
    const sel = buildSelections[currentStep.key];
    const answer = Array.isArray(sel) ? sel.join(", ") : sel;
    const newAnswers = { ...buildAnswers, [currentStep.key]: answer };
    setBuildAnswers(newAnswers);

    if (buildStep < buildSteps.length - 1) {
      setBuildStep(s => s + 1);
      return;
    }

    // Generate world
    setLoading(true); setOutput("");
    try {
      const summary = buildSteps.map(s => `${s.key.toUpperCase()}: ${newAnswers[s.key]}`).join("\n");
      const prompt = T.prompt + "\n\n---\n\nLORE BUILD MODE: Based on these world-building choices, generate a rich World Overview with these sections: WORLD NAME (invent a compelling one), OVERVIEW (2-3 paragraphs), THE CENTRAL CONFLICT, MAGIC & TECHNOLOGY, MAJOR FACTIONS (one paragraph each), THE GREAT MYSTERY, and ADVENTURE HOOKS (3 specific ideas). Match your theme's voice throughout.\n\nChoices:\n" + summary;
      const result = await callAI(prompt);
      setOutput(result);

      // Extract world name for banner
      const nameLine = result.split("\n").find(l => l.toUpperCase().includes("WORLD NAME"));
      const worldName = nameLine ? nameLine.replace(/.*?:/,"").trim() : themeKey + " World";
      setBuildAnswers(a => ({ ...a, _worldSummary: result, _worldName: worldName }));

      setHistory(prev => ({ ...prev, "Lore & World": [{ input: "World Overview — " + worldName, output: result }, ...prev["Lore & World"].slice(0, 9)] }));
    } catch (err) { setOutput("Error: " + err.message); }
    setLoading(false);
  };

  const handleSetActiveWorld = () => {
    setActiveWorld({ name: buildAnswers._worldName || "Your World", summary: buildAnswers._worldSummary || output });
    setShowWorldBanner(true);
  };

  const handleCustomSubmit = () => {
    if (!customInput.trim()) return;
    if (currentStep.multi) {
      const current = buildSelections[currentStep.key] || [];
      if (current.length < (currentStep.max || 3)) {
        setBuildSelections(prev => ({ ...prev, [currentStep.key]: [...current, customInput.trim()] }));
      }
    } else {
      setBuildSelections(prev => ({ ...prev, [currentStep.key]: customInput.trim() }));
    }
    setCustomInput(""); setShowCustom(false);
  };

  const resetBuild = () => { setBuildStep(0); setBuildAnswers({}); setBuildSelections({}); setCustomInput(""); setShowCustom(false); setOutput(""); };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const currentHistory = history[activeTab];
  const isLore = activeTab === "Lore & World";
  const isEncounter = activeTab === "Encounter Creator";
  const buildComplete = buildAnswers._worldSummary;

  const modeBtn = (mode) => ({
    padding: "0.4rem 0.9rem", border: `1px solid ${loreMode === mode ? C.borderActive : C.border}`,
    background: loreMode === mode ? C.btnActive : "transparent",
    color: loreMode === mode ? C.accent : C.textDim,
    fontSize: "0.7rem", fontWeight: "500", letterSpacing: "0.12em", textTransform: "uppercase",
    fontFamily: "inherit", cursor: "pointer", borderRadius: "2px", transition: "all 0.2s",
  });

  const optionSelected = (key, opt) => {
    const sel = buildSelections[key];
    if (!sel) return false;
    if (Array.isArray(sel)) return sel.includes(opt);
    return sel === opt;
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: T.fonts, fontSize: "1rem", fontWeight: "400", color: C.text, transition: "background 0.3s, color 0.3s" }}>
      <div style={{ maxWidth: 840, margin: "0 auto", padding: "2rem 1.5rem 5rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: "500", letterSpacing: "0.4em", color: C.accentDim, textTransform: "uppercase", marginBottom: "0.5rem" }}>{T.grimoire}</div>
          <h1 style={{ fontSize: "clamp(1.8rem,5vw,2.8rem)", fontWeight: "normal", color: C.textBright, margin: "0 0 0.3rem", letterSpacing: "0.04em" }}>{T.title}</h1>
          <p style={{ fontSize: "0.9rem", fontWeight: "500", color: C.textDim, margin: "0 0 1rem", letterSpacing: "0.1em" }}>{T.subtitle}</p>

          {/* Active World Banner */}
          {activeWorld && (
            <div style={{ margin: "0 0 0.75rem", padding: "0.45rem 1rem", background: C.btnActive, border: `1px solid ${C.borderActive}`, borderRadius: "3px", display: "inline-flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontSize: "0.65rem", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", color: C.accentDim }}>Active World:</span>
              <span style={{ fontSize: "0.8rem", fontWeight: "500", color: C.accent }}>{activeWorld.name}</span>
              <button onClick={() => setActiveWorld(null)} style={{ background: "none", border: "none", color: C.textDim, cursor: "pointer", fontSize: "0.75rem", fontWeight: "500", padding: 0 }}>✕</button>
            </div>
          )}

          <div style={{ position: "relative", display: "inline-block" }}>
            <button onClick={() => setShowThemePicker(p => !p)}
              style={{ padding: "0.35rem 1rem", background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, fontSize: "0.7rem", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", borderRadius: "2px" }}>
              {T.emoji} {themeKey} ▾
            </button>
            {showThemePicker && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", left: "50%", transform: "translateX(-50%)", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "3px", zIndex: 100, minWidth: 190, boxShadow: "0 8px 30px rgba(0,0,0,0.7)" }}>
                {THEME_KEYS.map(key => (
                  <button key={key} onClick={() => { setThemeKey(key); setShowThemePicker(false); setOutput(""); setInput(""); }}
                    style={{ display: "block", width: "100%", padding: "0.6rem 1rem", border: "none", background: key === themeKey ? THEMES[key].colors.btnActive : "transparent", color: key === themeKey ? THEMES[key].colors.accent : THEMES[key].colors.text, fontSize: "0.8rem", fontWeight: "500", fontFamily: THEMES[key].fonts, cursor: "pointer", textAlign: "left" }}>
                    {THEMES[key].emoji} {key}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginTop: "1.25rem", height: "1px", background: `linear-gradient(90deg, transparent, ${C.border} 30%, ${C.border} 70%, transparent)` }} />
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", borderBottom: `1px solid ${C.border}`, marginBottom: "1.75rem", overflowX: "auto" }}>
          {tabs.map(tab => (
            <button key={tab} onClick={() => { setActiveTab(tab); setOutput(""); setInput(""); }}
              style={{ flex: "1 0 auto", padding: "0.75rem 0.75rem", border: "none", cursor: "pointer", background: activeTab === tab ? C.btnActive : "transparent", color: activeTab === tab ? C.accent : C.textDim, fontSize: "0.85rem", fontWeight: "500", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "inherit", borderBottom: activeTab === tab ? `2px solid ${C.tabBorder}` : "2px solid transparent", transition: "all 0.2s", whiteSpace: "nowrap" }}>
              {tab}
            </button>
          ))}
        </div>

        {/* ── LORE TAB ── */}
        {isLore ? (
          <div>
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
              {LORE_MODES.map(mode => (
                <button key={mode} onClick={() => { setLoreMode(mode); setOutput(""); setInput(""); }} style={modeBtn(mode)}>
                  {mode === "Ask" ? "❓ Ask" : mode === "Generate" ? "✦ Generate" : "🌍 Build"}
                </button>
              ))}
            </div>

            {/* ASK */}
            {loreMode === "Ask" && (
              <div>
                {activeWorld && (
                  <div style={{ marginBottom: "0.75rem", padding: "0.5rem 0.9rem", background: C.btnActive, border: `1px solid ${C.border}`, borderRadius: "3px", fontSize: "0.85rem", fontWeight: "500", color: C.textDim }}>
                    Answering questions about <span style={{ color: C.accent }}>{activeWorld.name}</span>. Questions will be answered consistently with your built world.
                  </div>
                )}
                <div style={{ fontSize: "0.85rem", fontWeight: "500", color: C.textDim, marginBottom: "0.75rem", lineHeight: 1.6 }}>
                  {activeWorld ? "Ask anything about your world — history, people, places, politics." : "Ask any world-building question. Set an Active World in Build mode to get consistent answers."}
                </div>
                <textarea value={input} onChange={e => setInput(e.target.value)}
                  placeholder="Who controls the eastern territories? What caused the last war? Why do people avoid the old district?"
                  rows={5} onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleLoreAsk(); }}
                  style={{ width: "100%", boxSizing: "border-box", marginBottom: "1rem", background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "1rem", borderRadius: "3px", fontFamily: "inherit", fontSize: "0.93rem", lineHeight: 1.75, resize: "vertical", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = C.borderActive} onBlur={e => e.target.style.borderColor = C.border} />
                <button onClick={handleLoreAsk} disabled={loading || !input.trim()}
                  style={{ width: "100%", padding: "0.9rem", background: loading || !input.trim() ? C.btnActive : `linear-gradient(135deg, ${C.accentDim}, ${C.borderActive})`, border: `1px solid ${loading || !input.trim() ? C.border : C.borderActive}`, color: loading || !input.trim() ? C.textDim : C.textBright, fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "inherit", cursor: loading || !input.trim() ? "not-allowed" : "pointer", borderRadius: "3px" }}>
                  {loading ? T.loadingMsg : "Ask the Lore"}
                </button>
              </div>
            )}

            {/* GENERATE */}
            {loreMode === "Generate" && (
              <div>
                {activeWorld && (
                  <div style={{ marginBottom: "0.75rem", padding: "0.5rem 0.9rem", background: C.btnActive, border: `1px solid ${C.border}`, borderRadius: "3px", fontSize: "0.85rem", fontWeight: "500", color: C.textDim }}>
                    Generating lore consistent with <span style={{ color: C.accent }}>{activeWorld.name}</span>.
                  </div>
                )}
                <div style={{ fontSize: "0.85rem", fontWeight: "500", color: C.textDim, marginBottom: "0.75rem", lineHeight: 1.6 }}>Choose a category then describe what you want.</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1rem" }}>
                  {LORE_CATEGORIES.map(cat => (
                    <button key={cat} onClick={() => setLoreCategory(cat)}
                      style={{ padding: "0.3rem 0.7rem", border: `1px solid ${loreCategory === cat ? C.borderActive : C.border}`, background: loreCategory === cat ? C.btnActive : "transparent", color: loreCategory === cat ? C.accent : C.textDim, fontSize: "0.7rem", fontWeight: "500", fontFamily: "inherit", cursor: "pointer", borderRadius: "2px" }}>
                      {cat}
                    </button>
                  ))}
                </div>
                <textarea value={input} onChange={e => setInput(e.target.value)}
                  placeholder={`Describe the ${loreCategory} you want to create...`}
                  rows={5} onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleLoreGenerate(); }}
                  style={{ width: "100%", boxSizing: "border-box", marginBottom: "1rem", background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "1rem", borderRadius: "3px", fontFamily: "inherit", fontSize: "0.93rem", lineHeight: 1.75, resize: "vertical", outline: "none" }}
                  onFocus={e => e.target.style.borderColor = C.borderActive} onBlur={e => e.target.style.borderColor = C.border} />
                <button onClick={handleLoreGenerate} disabled={loading || !input.trim()}
                  style={{ width: "100%", padding: "0.9rem", background: loading || !input.trim() ? C.btnActive : `linear-gradient(135deg, ${C.accentDim}, ${C.borderActive})`, border: `1px solid ${loading || !input.trim() ? C.border : C.borderActive}`, color: loading || !input.trim() ? C.textDim : C.textBright, fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "inherit", cursor: loading || !input.trim() ? "not-allowed" : "pointer", borderRadius: "3px" }}>
                  {loading ? T.loadingMsg : `Generate ${loreCategory}`}
                </button>
              </div>
            )}

            {/* BUILD */}
            {loreMode === "Build" && !buildComplete && (
              <div>
                <div style={{ fontSize: "0.85rem", fontWeight: "500", color: C.textDim, marginBottom: "1.25rem", lineHeight: 1.6 }}>
                  Answer 5 questions to build a full World Overview. Each answer shapes the world that gets generated.
                </div>

                {/* Progress bar */}
                <div style={{ display: "flex", gap: "0.3rem", marginBottom: "1.5rem" }}>
                  {buildSteps.map((_, i) => (
                    <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i < buildStep ? C.accent : i === buildStep ? C.borderActive : C.border, transition: "background 0.3s" }} />
                  ))}
                </div>

                {/* Previous answers summary */}
                {buildStep > 0 && (
                  <div style={{ marginBottom: "1.25rem" }}>
                    {buildSteps.slice(0, buildStep).map(step => (
                      <div key={step.key} style={{ marginBottom: "0.4rem", padding: "0.5rem 0.9rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "3px", display: "flex", gap: "0.75rem", alignItems: "baseline" }}>
                        <div style={{ fontSize: "0.6rem", fontWeight: "500", letterSpacing: "0.15em", color: C.accentDim, textTransform: "uppercase", whiteSpace: "nowrap" }}>{step.key}</div>
                        <div style={{ fontSize: "0.82rem", fontWeight: "500", color: C.text }}>{buildAnswers[step.key]}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Current step */}
                <div style={{ marginBottom: "0.65rem" }}>
                  <div style={{ fontSize: "0.75rem", fontWeight: "500", color: C.accentDim, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "0.3rem" }}>Step {buildStep + 1} of {buildSteps.length}</div>
                  <div style={{ fontSize: "1rem", color: C.textBright, marginBottom: "0.75rem" }}>{currentStep.question}</div>
                  {currentStep.multi && (
                    <div style={{ fontSize: "0.7rem", fontWeight: "500", color: C.textDim, marginBottom: "0.5rem" }}>
                      Pick up to {currentStep.max} — {(buildSelections[currentStep.key] || []).length} selected
                    </div>
                  )}
                </div>

                {/* Options */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", marginBottom: "1rem" }}>
                  {currentStep.options.map(opt => {
                    const isCustom = opt === "Custom...";
                    const selected = optionSelected(currentStep.key, opt);
                    return (
                      <button key={opt} onClick={() => handleOptionSelect(opt)}
                        style={{ padding: "0.7rem 1rem", textAlign: "left", border: `1px solid ${selected ? C.borderActive : isCustom ? C.border : C.border}`, background: selected ? C.btnActive : isCustom ? "transparent" : C.surface, color: selected ? C.accent : isCustom ? C.textDim : C.text, fontSize: "0.88rem", fontWeight: "500", fontFamily: "inherit", cursor: "pointer", borderRadius: "3px", transition: "all 0.15s", fontStyle: isCustom ? "italic" : "normal" }}
                        onMouseEnter={e => { if (!selected) { e.currentTarget.style.borderColor = C.borderActive; e.currentTarget.style.color = C.textBright; } }}
                        onMouseLeave={e => { if (!selected) { e.currentTarget.style.borderColor = isCustom ? C.border : C.border; e.currentTarget.style.color = isCustom ? C.textDim : C.text; } }}>
                        {selected ? "✓ " : ""}{opt}
                      </button>
                    );
                  })}
                </div>

                {/* Custom input */}
                {showCustom && (
                  <div style={{ marginBottom: "1rem", display: "flex", gap: "0.5rem" }}>
                    <input value={customInput} onChange={e => setCustomInput(e.target.value)}
                      placeholder="Type your own answer..." onKeyDown={e => e.key === "Enter" && handleCustomSubmit()}
                      style={{ flex: 1, padding: "0.6rem 0.9rem", background: C.surface, border: `1px solid ${C.borderActive}`, color: C.text, fontFamily: "inherit", fontSize: "0.88rem", fontWeight: "500", borderRadius: "3px", outline: "none" }} />
                    <button onClick={handleCustomSubmit}
                      style={{ padding: "0.6rem 1rem", background: C.btnActive, border: `1px solid ${C.borderActive}`, color: C.accent, fontFamily: "inherit", fontSize: "0.8rem", fontWeight: "500", cursor: "pointer", borderRadius: "3px" }}>
                      Add
                    </button>
                  </div>
                )}

                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <button onClick={handleAdvance} disabled={!canAdvance() || loading}
                    style={{ flex: 1, padding: "0.9rem", background: !canAdvance() || loading ? C.btnActive : `linear-gradient(135deg, ${C.accentDim}, ${C.borderActive})`, border: `1px solid ${!canAdvance() || loading ? C.border : C.borderActive}`, color: !canAdvance() || loading ? C.textDim : C.textBright, fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "inherit", cursor: !canAdvance() || loading ? "not-allowed" : "pointer", borderRadius: "3px" }}>
                    {loading ? T.loadingMsg : buildStep < buildSteps.length - 1 ? "Next →" : "Generate World"}
                  </button>
                  {buildStep > 0 && (
                    <button onClick={resetBuild}
                      style={{ padding: "0.9rem 1.25rem", background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, fontSize: "0.7rem", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", borderRadius: "3px" }}>
                      Reset
                    </button>
                  )}
                </div>
              </div>
            )}

            {loreMode === "Build" && buildComplete && !output && (
              <div style={{ marginBottom: "1rem" }}>
                <button onClick={resetBuild}
                  style={{ padding: "0.5rem 1rem", background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, fontSize: "0.7rem", fontWeight: "500", letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", borderRadius: "2px" }}>
                  ← Build Another World
                </button>
              </div>
            )}
          </div>

        ) : isEncounter ? (

          /* ── ENCOUNTER TAB ── */
          <EncounterTab
            themeKey={themeKey}
            T={T} C={C}
            loading={loading}
            onResult={(result, summary) => {
              setOutput(result);
              setHistory(prev => ({ ...prev, "Encounter Creator": [{ input: summary, output: result }, ...prev["Encounter Creator"].slice(0, 9)] }));
            }}
            worldContext={worldContext}
            callAI={callAI}
          />
        ) : (
          /* ── NPC + SESSION RECAP TABS ── */
          <div>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              placeholder={activeTab === "NPC Generator" ? "Describe the NPC you need..." : "Paste your raw session notes here..."}
              rows={6} onKeyDown={e => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit(); }}
              style={{ width: "100%", boxSizing: "border-box", marginBottom: "1rem", background: C.surface, border: `1px solid ${C.border}`, color: C.text, padding: "1rem 1.1rem", borderRadius: "3px", fontFamily: "inherit", fontSize: "0.93rem", lineHeight: 1.75, resize: "vertical", outline: "none" }}
              onFocus={e => e.target.style.borderColor = C.borderActive} onBlur={e => e.target.style.borderColor = C.border} />
            <button onClick={handleSubmit} disabled={loading || !input.trim()}
              style={{ width: "100%", padding: "0.9rem", background: loading || !input.trim() ? C.btnActive : `linear-gradient(135deg, ${C.accentDim}, ${C.borderActive})`, border: `1px solid ${loading || !input.trim() ? C.border : C.borderActive}`, color: loading || !input.trim() ? C.textDim : C.textBright, fontSize: "0.9rem", fontWeight: "500", letterSpacing: "0.22em", textTransform: "uppercase", fontFamily: "inherit", cursor: loading || !input.trim() ? "not-allowed" : "pointer", borderRadius: "3px" }}>
              {loading ? T.loadingMsg : buttonLabels[activeTab]}
            </button>
          </div>
        )}

        {/* Output */}
        {output && (
          <div ref={outputRef} style={{ marginTop: "2rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "3px", padding: "1.75rem", lineHeight: 1.9, fontSize: "0.93rem", boxShadow: "0 4px 30px rgba(0,0,0,0.6)", animation: "fadeUp 0.35s ease" }}>
            <div style={{ fontSize: "0.6rem", fontWeight: "500", letterSpacing: "0.3em", color: C.accentDim, textTransform: "uppercase", marginBottom: "1rem", paddingBottom: "0.75rem", borderBottom: `1px solid ${C.border}` }}>
              {outputLabels[activeTab]}{isLore ? ` — ${loreMode}` : ""}
            </div>
            <div style={{ whiteSpace: "pre-wrap", color: C.text }}>{output}</div>
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
              <button onClick={handleCopy}
                style={{ padding: "0.4rem 1.1rem", background: "transparent", border: `1px solid ${C.border}`, color: copied ? C.accent : C.textDim, fontSize: "0.8rem", fontWeight: "500", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", borderRadius: "2px" }}>
                {copied ? "Copied ✓" : T.copyLabel}
              </button>
              {isLore && loreMode === "Build" && buildAnswers._worldSummary && !activeWorld && (
                <button onClick={handleSetActiveWorld}
                  style={{ padding: "0.4rem 1.1rem", background: C.btnActive, border: `1px solid ${C.borderActive}`, color: C.accent, fontSize: "0.8rem", fontWeight: "500", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", borderRadius: "2px" }}>
                  ✦ Set as Active World
                </button>
              )}
              {isLore && loreMode === "Build" && (
                <button onClick={resetBuild}
                  style={{ padding: "0.4rem 1.1rem", background: "transparent", border: `1px solid ${C.border}`, color: C.textDim, fontSize: "0.8rem", fontWeight: "500", letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "inherit", cursor: "pointer", borderRadius: "2px" }}>
                  ← Build Another
                </button>
              )}
            </div>
          </div>
        )}

        {/* History */}
        {currentHistory.length > 0 && (
          <div style={{ marginTop: "2.5rem" }}>
            <div style={{ fontSize: "0.6rem", fontWeight: "500", letterSpacing: "0.3em", color: C.textDim, textTransform: "uppercase", marginBottom: "0.75rem" }}>Recent Entries</div>
            {currentHistory.map((item, i) => (
              <div key={i} onClick={() => setOutput(item.output)}
                style={{ padding: "0.6rem 1rem", marginBottom: "0.35rem", background: C.surface, border: `1px solid ${C.border}`, borderRadius: "2px", cursor: "pointer", color: C.textDim, fontSize: "0.8rem", fontWeight: "500", transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderActive; e.currentTarget.style.color = C.text; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textDim; }}>
                {item.input}
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeUp { from { opacity:0; transform:translateY(8px); } to { opacity:1; transform:translateY(0); } }
        textarea::placeholder { color: ${C.textDim}; opacity: 0.9; font-weight: 500; }
        input::placeholder { color: ${C.textDim}; opacity: 0.9; font-weight: 500; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        ::-webkit-scrollbar-thumb { background: ${C.scrollThumb}; border-radius: 3px; }
      `}</style>
    </div>
  );
}