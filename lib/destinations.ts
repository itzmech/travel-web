// TODO: Replace with API calls or CMS data
export interface Place {
  name: string;
  icon: string;
  description: string;
}

export interface Destination {
  id: string;
  name: string;
  country: string;
  flag: string;
  lat: number;
  lng: number;
  heroImage: string;
  pros: string[];
  cons: string[];
  places: Place[];
}

export const DESTINATIONS: Destination[] = [
  {
    id: "paris",
    name: "Paris",
    country: "France",
    flag: "🇫🇷",
    lat: 48.8566,
    lng: 2.3522,
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&q=80",
    pros: [
      "Best visited in spring (April-June) for perfect weather",
      "World-renowned cuisine and café culture",
      "Exceptional art museums and architecture",
      "Excellent public transportation",
      "Rich romantic atmosphere"
    ],
    cons: [
      "Can be very crowded during summer",
      "Higher prices compared to other European cities",
      "Language barrier for non-French speakers",
      "Pickpockets in tourist areas"
    ],
    places: [
      { name: "Eiffel Tower", icon: "🗼", description: "Iconic iron lattice tower with stunning views" },
      { name: "Louvre Museum", icon: "🎨", description: "World's largest art museum" },
      { name: "Montmartre", icon: "⛪", description: "Artistic hilltop neighborhood" },
      { name: "Champs-Élysées", icon: "🛍️", description: "Famous avenue for shopping" },
      { name: "Seine River", icon: "🚢", description: "Scenic boat cruises" }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo",
    country: "Japan",
    flag: "🇯🇵",
    lat: 35.6762,
    lng: 139.6503,
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    pros: [
      "Perfect blend of tradition and modernity",
      "Exceptional food scene from street to Michelin",
      "Extremely safe city to explore",
      "Efficient and punctual public transit",
      "Unique cultural experiences"
    ],
    cons: [
      "Language barrier can be significant",
      "High cost of accommodation",
      "Crowded trains during rush hours",
      "Summer humidity can be intense"
    ],
    places: [
      { name: "Shibuya Crossing", icon: "🚶", description: "World's busiest pedestrian crossing" },
      { name: "Senso-ji Temple", icon: "⛩️", description: "Tokyo's oldest Buddhist temple" },
      { name: "Shinjuku Gyoen", icon: "🌸", description: "Beautiful national garden" },
      { name: "Tsukiji Market", icon: "🍣", description: "Fresh seafood paradise" },
      { name: "Akihabara", icon: "🎮", description: "Electronics and anime district" }
    ]
  },
  {
    id: "newyork",
    name: "New York",
    country: "United States",
    flag: "🇺🇸",
    lat: 40.7128,
    lng: -74.006,
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80",
    pros: [
      "Endless entertainment and cultural options",
      "World-class dining from every cuisine",
      "Iconic landmarks and architecture",
      "24/7 city that never sleeps",
      "Excellent subway system"
    ],
    cons: [
      "Very high cost of living and visiting",
      "Can feel overwhelming for first-timers",
      "Crowded tourist attractions",
      "Harsh winters and hot summers"
    ],
    places: [
      { name: "Central Park", icon: "🌳", description: "Urban oasis in Manhattan" },
      { name: "Statue of Liberty", icon: "🗽", description: "Symbol of freedom" },
      { name: "Times Square", icon: "✨", description: "Bright lights, big city" },
      { name: "Brooklyn Bridge", icon: "🌉", description: "Historic suspension bridge" },
      { name: "Empire State", icon: "🏙️", description: "Art Deco masterpiece" }
    ]
  },
  {
    id: "dubai",
    name: "Dubai",
    country: "UAE",
    flag: "🇦🇪",
    lat: 25.2048,
    lng: 55.2708,
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&q=80",
    pros: [
      "Best visited November to March for mild weather",
      "Tax-free shopping paradise",
      "Ultra-modern architecture and luxury",
      "Very safe for tourists",
      "Beach and desert experiences"
    ],
    cons: [
      "Extremely hot in summer months",
      "Can feel artificial and commercial",
      "Expensive dining and activities",
      "Conservative dress codes in some areas"
    ],
    places: [
      { name: "Burj Khalifa", icon: "🏗️", description: "World's tallest building" },
      { name: "Palm Jumeirah", icon: "🏝️", description: "Iconic artificial island" },
      { name: "Dubai Mall", icon: "🛒", description: "Massive shopping destination" },
      { name: "Desert Safari", icon: "🐪", description: "Dune bashing adventure" },
      { name: "Dubai Marina", icon: "⛵", description: "Stunning waterfront district" }
    ]
  },
  {
    id: "bali",
    name: "Bali",
    country: "Indonesia",
    flag: "🇮🇩",
    lat: -8.3405,
    lng: 115.092,
    heroImage: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800&q=80",
    pros: [
      "Incredibly affordable destination",
      "Beautiful beaches and rice terraces",
      "Rich spiritual and cultural heritage",
      "Excellent wellness retreats",
      "Friendly locals"
    ],
    cons: [
      "Overtourism in popular areas",
      "Traffic congestion in main areas",
      "Rainy season (Nov-Mar) can disrupt plans",
      "Persistent vendors at tourist spots"
    ],
    places: [
      { name: "Ubud", icon: "🌾", description: "Cultural heart with rice paddies" },
      { name: "Tanah Lot", icon: "⛩️", description: "Iconic sea temple" },
      { name: "Seminyak Beach", icon: "🏖️", description: "Trendy beach area" },
      { name: "Tegallalang", icon: "🌿", description: "Famous rice terrace" },
      { name: "Mount Batur", icon: "🌋", description: "Active volcano sunrise trek" }
    ]
  },
  {
    id: "rome",
    name: "Rome",
    country: "Italy",
    flag: "🇮🇹",
    lat: 41.9028,
    lng: 12.4964,
    heroImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&q=80",
    pros: [
      "Unparalleled ancient history",
      "Incredible Italian cuisine",
      "Walkable historic center",
      "Art masterpieces everywhere",
      "Vibrant street life"
    ],
    cons: [
      "Very crowded at major sites",
      "Summer heat can be intense",
      "Pickpockets near tourist areas",
      "Long queues without reservations"
    ],
    places: [
      { name: "Colosseum", icon: "🏛️", description: "Ancient gladiator arena" },
      { name: "Vatican City", icon: "⛪", description: "Center of Catholic Church" },
      { name: "Trevi Fountain", icon: "⛲", description: "Baroque masterpiece" },
      { name: "Pantheon", icon: "🏺", description: "Best-preserved ancient temple" },
      { name: "Roman Forum", icon: "🏚️", description: "Heart of ancient Rome" }
    ]
  },
  {
    id: "sydney",
    name: "Sydney",
    country: "Australia",
    flag: "🇦🇺",
    lat: -33.8688,
    lng: 151.2093,
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=800&q=80",
    pros: [
      "Beautiful harbor and beaches",
      "Excellent weather most of the year",
      "Outdoor lifestyle culture",
      "Safe and clean city",
      "Diverse food scene"
    ],
    cons: [
      "Very expensive destination",
      "Long flight from most places",
      "Strong UV requires protection",
      "Limited late-night options"
    ],
    places: [
      { name: "Opera House", icon: "🎭", description: "Iconic architectural marvel" },
      { name: "Bondi Beach", icon: "🏄", description: "Famous surfing spot" },
      { name: "Harbour Bridge", icon: "🌉", description: "Climb for panoramic views" },
      { name: "Taronga Zoo", icon: "🦘", description: "Wildlife with harbor views" },
      { name: "The Rocks", icon: "🏘️", description: "Historic waterfront area" }
    ]
  },
  {
    id: "capetown",
    name: "Cape Town",
    country: "South Africa",
    flag: "🇿🇦",
    lat: -33.9249,
    lng: 18.4241,
    heroImage: "https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&q=80",
    pros: [
      "Stunning natural beauty",
      "Excellent wine regions nearby",
      "Favorable exchange rates",
      "Adventure activities galore",
      "Rich cultural diversity"
    ],
    cons: [
      "Safety concerns in some areas",
      "Load shedding (power cuts)",
      "Car needed to explore",
      "Water scarcity issues"
    ],
    places: [
      { name: "Table Mountain", icon: "⛰️", description: "Flat-topped iconic landmark" },
      { name: "V&A Waterfront", icon: "🛥️", description: "Shopping and dining hub" },
      { name: "Cape Point", icon: "🌊", description: "Where two oceans meet" },
      { name: "Robben Island", icon: "🏛️", description: "Historic prison museum" },
      { name: "Boulders Beach", icon: "🐧", description: "African penguin colony" }
    ]
  },
  {
    id: "rio",
    name: "Rio de Janeiro",
    country: "Brazil",
    flag: "🇧🇷",
    lat: -22.9068,
    lng: -43.1729,
    heroImage: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=800&q=80",
    pros: [
      "World-famous beaches",
      "Vibrant music and nightlife",
      "Spectacular natural setting",
      "Carnival atmosphere year-round",
      "Friendly locals"
    ],
    cons: [
      "Safety concerns in certain areas",
      "Language barrier (Portuguese)",
      "High humidity in summer",
      "Tourist scams common"
    ],
    places: [
      { name: "Christ the Redeemer", icon: "✝️", description: "Iconic mountain-top statue" },
      { name: "Copacabana", icon: "🏖️", description: "Famous crescent beach" },
      { name: "Sugarloaf Mountain", icon: "🚡", description: "Cable car with views" },
      { name: "Tijuca Forest", icon: "🌴", description: "Urban rainforest" },
      { name: "Lapa Arches", icon: "🎺", description: "Historic nightlife district" }
    ]
  },
  {
    id: "barcelona",
    name: "Barcelona",
    country: "Spain",
    flag: "🇪🇸",
    lat: 41.3851,
    lng: 2.1734,
    heroImage: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&q=80",
    pros: [
      "Unique Gaudí architecture",
      "Mediterranean beach access",
      "Excellent tapas and wine",
      "Walkable Gothic Quarter",
      "Vibrant arts scene"
    ],
    cons: [
      "Heavily crowded in summer",
      "Pickpocketing is common",
      "Beach can be overrated",
      "Noise in tourist areas"
    ],
    places: [
      { name: "Sagrada Familia", icon: "⛪", description: "Gaudí's unfinished masterpiece" },
      { name: "Park Güell", icon: "🦎", description: "Whimsical mosaic gardens" },
      { name: "La Rambla", icon: "🚶", description: "Famous tree-lined boulevard" },
      { name: "Gothic Quarter", icon: "🏰", description: "Medieval streets and plazas" },
      { name: "Camp Nou", icon: "⚽", description: "FC Barcelona stadium" }
    ]
  },
  {
    id: "london",
    name: "London",
    country: "United Kingdom",
    flag: "🇬🇧",
    lat: 51.5074,
    lng: -0.1278,
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&q=80",
    pros: [
      "World-class museums (many free)",
      "Rich history and royal heritage",
      "Excellent theater scene",
      "Diverse food from everywhere",
      "Easy to navigate with tube"
    ],
    cons: [
      "Rainy weather year-round",
      "Very expensive city",
      "Crowded public transport",
      "Major attractions get packed"
    ],
    places: [
      { name: "Big Ben", icon: "🕐", description: "Iconic clock tower" },
      { name: "Tower of London", icon: "🏰", description: "Historic royal fortress" },
      { name: "British Museum", icon: "🏛️", description: "Treasures from everywhere" },
      { name: "Buckingham Palace", icon: "👑", description: "Royal residence" },
      { name: "Camden Market", icon: "🛍️", description: "Alternative shopping scene" }
    ]
  },
  {
    id: "singapore",
    name: "Singapore",
    country: "Singapore",
    flag: "🇸🇬",
    lat: 1.3521,
    lng: 103.8198,
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80",
    pros: [
      "Extremely clean and safe",
      "Amazing street food scene",
      "Efficient public transport",
      "Gardens and green spaces",
      "Multicultural experiences"
    ],
    cons: [
      "Hot and humid year-round",
      "Expensive accommodation",
      "Strict laws on behavior",
      "Can feel sterile to some"
    ],
    places: [
      { name: "Marina Bay Sands", icon: "🏨", description: "Iconic infinity pool hotel" },
      { name: "Gardens by the Bay", icon: "🌳", description: "Futuristic nature park" },
      { name: "Sentosa Island", icon: "🏝️", description: "Beach and theme parks" },
      { name: "Chinatown", icon: "🏮", description: "Heritage district" },
      { name: "Hawker Centres", icon: "🍜", description: "Street food paradise" }
    ]
  },
  {
    id: "istanbul",
    name: "Istanbul",
    country: "Turkey",
    flag: "🇹🇷",
    lat: 41.0082,
    lng: 28.9784,
    heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    pros: [
      "Bridge between Europe and Asia",
      "Rich Ottoman history",
      "Affordable compared to Europe",
      "Incredible bazaars",
      "Delicious Turkish cuisine"
    ],
    cons: [
      "Aggressive carpet sellers",
      "Traffic congestion",
      "Scams targeting tourists",
      "Summer crowds"
    ],
    places: [
      { name: "Hagia Sophia", icon: "🕌", description: "Byzantine architectural wonder" },
      { name: "Grand Bazaar", icon: "🛍️", description: "One of world's oldest markets" },
      { name: "Blue Mosque", icon: "🕌", description: "Stunning Ottoman mosque" },
      { name: "Bosphorus", icon: "⛴️", description: "Scenic strait cruise" },
      { name: "Topkapi Palace", icon: "🏰", description: "Ottoman sultans residence" }
    ]
  },
  {
    id: "amsterdam",
    name: "Amsterdam",
    country: "Netherlands",
    flag: "🇳🇱",
    lat: 52.3676,
    lng: 4.9041,
    heroImage: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
    pros: [
      "Picturesque canal scenery",
      "Bike-friendly city",
      "World-class art museums",
      "Liberal and welcoming culture",
      "Compact and walkable"
    ],
    cons: [
      "Rainy and cold often",
      "Expensive accommodation",
      "Overtourism in center",
      "Aggressive cyclists"
    ],
    places: [
      { name: "Anne Frank House", icon: "📖", description: "Moving WWII memorial" },
      { name: "Van Gogh Museum", icon: "🎨", description: "Largest Van Gogh collection" },
      { name: "Rijksmuseum", icon: "🖼️", description: "Dutch Golden Age art" },
      { name: "Vondelpark", icon: "🌷", description: "Central park oasis" },
      { name: "Canal Ring", icon: "🚣", description: "UNESCO heritage canals" }
    ]
  },
  {
    id: "bangkok",
    name: "Bangkok",
    country: "Thailand",
    flag: "🇹🇭",
    lat: 13.7563,
    lng: 100.5018,
    heroImage: "https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800&q=80",
    pros: [
      "Extremely affordable",
      "Amazing street food",
      "Ornate temples everywhere",
      "Vibrant nightlife",
      "Excellent massage scene"
    ],
    cons: [
      "Hot and humid always",
      "Terrible traffic jams",
      "Tourist scams common",
      "Air pollution issues"
    ],
    places: [
      { name: "Grand Palace", icon: "🏯", description: "Royal complex and Wat Phra Kaew" },
      { name: "Wat Arun", icon: "⛩️", description: "Temple of Dawn" },
      { name: "Chatuchak Market", icon: "🛒", description: "Huge weekend market" },
      { name: "Khao San Road", icon: "🎉", description: "Backpacker hub" },
      { name: "Chinatown", icon: "🥟", description: "Street food heaven" }
    ]
  },
  {
    id: "santorini",
    name: "Santorini",
    country: "Greece",
    flag: "🇬🇷",
    lat: 36.3932,
    lng: 25.4615,
    heroImage: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&q=80",
    pros: [
      "Stunning caldera views",
      "Iconic white and blue architecture",
      "Amazing sunsets",
      "Excellent local wine",
      "Romantic atmosphere"
    ],
    cons: [
      "Extremely crowded in summer",
      "Very expensive",
      "Limited beaches",
      "Cruise ship crowds"
    ],
    places: [
      { name: "Oia", icon: "🌅", description: "Famous sunset viewpoint" },
      { name: "Fira", icon: "🏘️", description: "Main town on caldera" },
      { name: "Red Beach", icon: "🏖️", description: "Unique volcanic sand" },
      { name: "Akrotiri", icon: "🏺", description: "Ancient Minoan ruins" },
      { name: "Wine Tours", icon: "🍷", description: "Local vineyard tastings" }
    ]
  },
  {
    id: "marrakech",
    name: "Marrakech",
    country: "Morocco",
    flag: "🇲🇦",
    lat: 31.6295,
    lng: -7.9811,
    heroImage: "https://images.unsplash.com/photo-1597212720158-fcc3ba69860a?w=800&q=80",
    pros: [
      "Exotic medina experience",
      "Beautiful riads to stay",
      "Affordable destination",
      "Vibrant souks for shopping",
      "Delicious Moroccan cuisine"
    ],
    cons: [
      "Aggressive vendors",
      "Hot summers",
      "Navigation confusing in medina",
      "Persistent touts"
    ],
    places: [
      { name: "Jemaa el-Fnaa", icon: "🎪", description: "Famous main square" },
      { name: "Majorelle Garden", icon: "🌵", description: "Yves Saint Laurent garden" },
      { name: "Bahia Palace", icon: "🏰", description: "19th century palace" },
      { name: "Souks", icon: "🛍️", description: "Traditional markets" },
      { name: "Koutoubia Mosque", icon: "🕌", description: "City's largest mosque" }
    ]
  },
  {
    id: "prague",
    name: "Prague",
    country: "Czech Republic",
    flag: "🇨🇿",
    lat: 50.0755,
    lng: 14.4378,
    heroImage: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&q=80",
    pros: [
      "Stunning medieval architecture",
      "Affordable beer and food",
      "Walkable old town",
      "Rich musical heritage",
      "Beautiful in all seasons"
    ],
    cons: [
      "Very crowded in summer",
      "Tourist traps in center",
      "Pickpockets active",
      "Cold winters"
    ],
    places: [
      { name: "Charles Bridge", icon: "🌉", description: "Gothic stone bridge" },
      { name: "Prague Castle", icon: "🏰", description: "Largest ancient castle" },
      { name: "Old Town Square", icon: "🕐", description: "Astronomical clock" },
      { name: "Jewish Quarter", icon: "✡️", description: "Historic synagogues" },
      { name: "Petřín Hill", icon: "🌳", description: "Park with mini Eiffel" }
    ]
  },
  {
    id: "machu-picchu",
    name: "Cusco",
    country: "Peru",
    flag: "🇵🇪",
    lat: -13.5319,
    lng: -71.9675,
    heroImage: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800&q=80",
    pros: [
      "Gateway to Machu Picchu",
      "Incredible Incan history",
      "Affordable destination",
      "Stunning Andean scenery",
      "Vibrant local culture"
    ],
    cons: [
      "Altitude sickness risk",
      "Limited Machu Picchu permits",
      "Cold nights at altitude",
      "Rainy season disruptions"
    ],
    places: [
      { name: "Machu Picchu", icon: "🏛️", description: "Lost city of the Incas" },
      { name: "Sacred Valley", icon: "🏔️", description: "Stunning Andean valley" },
      { name: "Plaza de Armas", icon: "⛪", description: "Historic main square" },
      { name: "Rainbow Mountain", icon: "🌈", description: "Colorful striped peaks" },
      { name: "San Pedro Market", icon: "🥘", description: "Local food and crafts" }
    ]
  },
  {
    id: "maldives",
    name: "Maldives",
    country: "Maldives",
    flag: "🇲🇻",
    lat: 3.2028,
    lng: 73.2207,
    heroImage: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=800&q=80",
    pros: [
      "Pristine turquoise waters",
      "Overwater bungalows",
      "World-class diving",
      "Ultimate relaxation",
      "Romantic paradise"
    ],
    cons: [
      "Extremely expensive",
      "Limited cultural activities",
      "Alcohol restrictions on local islands",
      "Climate change vulnerability"
    ],
    places: [
      { name: "Overwater Villas", icon: "🏠", description: "Iconic ocean bungalows" },
      { name: "Coral Reefs", icon: "🐠", description: "Snorkeling paradise" },
      { name: "Malé", icon: "🏙️", description: "Compact capital city" },
      { name: "Sandbanks", icon: "🏝️", description: "Private island picnics" },
      { name: "Sunset Cruises", icon: "⛵", description: "Dolphin watching trips" }
    ]
  },
  {
    id: "cairo",
    name: "Cairo",
    country: "Egypt",
    flag: "🇪🇬",
    lat: 30.0444,
    lng: 31.2357,
    heroImage: "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?w=800&q=80",
    pros: [
      "Ancient Pyramids of Giza",
      "Rich pharaonic history",
      "Affordable destination",
      "Unique cultural experience",
      "Amazing museum collections"
    ],
    cons: [
      "Chaotic traffic and noise",
      "Persistent touts",
      "Hot desert climate",
      "Air pollution"
    ],
    places: [
      { name: "Pyramids of Giza", icon: "🔺", description: "Last ancient wonder" },
      { name: "Egyptian Museum", icon: "🏛️", description: "Tutankhamun treasures" },
      { name: "Khan el-Khalili", icon: "🛍️", description: "Historic bazaar" },
      { name: "Sphinx", icon: "🦁", description: "Iconic limestone statue" },
      { name: "Nile River", icon: "🚢", description: "Felucca boat rides" }
    ]
  },
  {
    id: "vienna",
    name: "Vienna",
    country: "Austria",
    flag: "🇦🇹",
    lat: 48.2082,
    lng: 16.3738,
    heroImage: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80",
    pros: [
      "Imperial architecture",
      "World-class classical music",
      "Excellent café culture",
      "Clean and safe city",
      "Rich art museums"
    ],
    cons: [
      "Can feel formal/stuffy",
      "Expensive dining",
      "Cold winters",
      "Shops close early"
    ],
    places: [
      { name: "Schönbrunn Palace", icon: "🏰", description: "Habsburg summer residence" },
      { name: "St. Stephen's Cathedral", icon: "⛪", description: "Gothic masterpiece" },
      { name: "Belvedere", icon: "🎨", description: "Art museum and gardens" },
      { name: "Vienna State Opera", icon: "🎭", description: "World-famous opera house" },
      { name: "Naschmarkt", icon: "🥐", description: "Popular food market" }
    ]
  },
  {
    id: "vancouver",
    name: "Vancouver",
    country: "Canada",
    flag: "🇨🇦",
    lat: 49.2827,
    lng: -123.1207,
    heroImage: "https://images.unsplash.com/photo-1559511260-66a68e71a585?w=800&q=80",
    pros: [
      "Stunning mountain and ocean views",
      "Outdoor activities year-round",
      "Diverse food scene",
      "Clean and safe city",
      "Access to ski and beach same day"
    ],
    cons: [
      "Very expensive housing and hotels",
      "Rainy winters",
      "Limited nightlife",
      "Homelessness visible downtown"
    ],
    places: [
      { name: "Stanley Park", icon: "🌲", description: "Urban forest and seawall" },
      { name: "Capilano Bridge", icon: "🌉", description: "Suspension bridge in forest" },
      { name: "Granville Island", icon: "🎨", description: "Market and arts hub" },
      { name: "Grouse Mountain", icon: "🎿", description: "Skiing with city views" },
      { name: "Gastown", icon: "🕐", description: "Historic steam clock area" }
    ]
  },
  {
    id: "seoul",
    name: "Seoul",
    country: "South Korea",
    flag: "🇰🇷",
    lat: 37.5665,
    lng: 126.978,
    heroImage: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?w=800&q=80",
    pros: [
      "K-culture experiences",
      "Amazing Korean BBQ and food",
      "Excellent public transport",
      "Mix of ancient and modern",
      "Great shopping scene"
    ],
    cons: [
      "Language barrier",
      "Air quality issues",
      "Hot summers, cold winters",
      "Crowded"
    ],
    places: [
      { name: "Gyeongbokgung", icon: "🏯", description: "Grand royal palace" },
      { name: "Myeongdong", icon: "🛍️", description: "Shopping and K-beauty" },
      { name: "N Seoul Tower", icon: "🗼", description: "City views and love locks" },
      { name: "Bukchon Hanok", icon: "🏘️", description: "Traditional village" },
      { name: "Hongdae", icon: "🎸", description: "Youth culture hub" }
    ]
  },
  {
    id: "reykjavik",
    name: "Reykjavik",
    country: "Iceland",
    flag: "🇮🇸",
    lat: 64.1466,
    lng: -21.9426,
    heroImage: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800&q=80",
    pros: [
      "Northern Lights viewing",
      "Unique volcanic landscapes",
      "Safe and friendly",
      "Midnight sun in summer",
      "Hot springs everywhere"
    ],
    cons: [
      "Very expensive",
      "Harsh winter weather",
      "Limited daylight in winter",
      "Food scene limited"
    ],
    places: [
      { name: "Blue Lagoon", icon: "♨️", description: "Famous geothermal spa" },
      { name: "Golden Circle", icon: "🌋", description: "Geysers and waterfalls" },
      { name: "Hallgrímskirkja", icon: "⛪", description: "Iconic church" },
      { name: "Northern Lights", icon: "🌌", description: "Aurora viewing" },
      { name: "Þingvellir", icon: "🏔️", description: "Tectonic plate rift" }
    ]
  },
  {
    id: "hanoi",
    name: "Hanoi",
    country: "Vietnam",
    flag: "🇻🇳",
    lat: 21.0285,
    lng: 105.8542,
    heroImage: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=800&q=80",
    pros: [
      "Incredibly affordable",
      "Amazing street food",
      "Rich French-Vietnamese culture",
      "Beautiful Old Quarter",
      "Gateway to Ha Long Bay"
    ],
    cons: [
      "Chaotic traffic",
      "Scams targeting tourists",
      "Hot and humid summers",
      "Aggressive vendors"
    ],
    places: [
      { name: "Old Quarter", icon: "🏘️", description: "36 ancient streets" },
      { name: "Hoan Kiem Lake", icon: "🌳", description: "Central lake and temple" },
      { name: "Ho Chi Minh Mausoleum", icon: "🏛️", description: "National landmark" },
      { name: "Ha Long Bay", icon: "🌅", description: "UNESCO limestone karsts" },
      { name: "Street Food Tour", icon: "🍜", description: "Pho and banh mi heaven" }
    ]
  },
  {
    id: "buenos-aires",
    name: "Buenos Aires",
    country: "Argentina",
    flag: "🇦🇷",
    lat: -34.6037,
    lng: -58.3816,
    heroImage: "https://images.unsplash.com/photo-1612294037637-ec328d0e075e?w=800&q=80",
    pros: [
      "Tango culture and shows",
      "Excellent steakhouses",
      "European architecture",
      "Affordable due to exchange rate",
      "Vibrant nightlife"
    ],
    cons: [
      "Safety concerns in some areas",
      "Economic instability affects prices",
      "Late dinner times (10pm+)",
      "Hot and humid summers"
    ],
    places: [
      { name: "La Boca", icon: "🎨", description: "Colorful neighborhood" },
      { name: "Recoleta Cemetery", icon: "⚰️", description: "Evita's resting place" },
      { name: "San Telmo", icon: "💃", description: "Antiques and tango" },
      { name: "Puerto Madero", icon: "🌃", description: "Modern waterfront" },
      { name: "Teatro Colón", icon: "🎭", description: "World-class opera house" }
    ]
  },
  {
    id: "lisbon",
    name: "Lisbon",
    country: "Portugal",
    flag: "🇵🇹",
    lat: 38.7223,
    lng: -9.1393,
    heroImage: "https://images.unsplash.com/photo-1558369981-f9ca78462e61?w=800&q=80",
    pros: [
      "Affordable Western Europe",
      "Historic tram rides",
      "Delicious pastéis de nata",
      "Beautiful tile work",
      "Sunny weather"
    ],
    cons: [
      "Hilly streets challenging",
      "Tourist crowds growing",
      "Pickpockets active",
      "Nightlife noise"
    ],
    places: [
      { name: "Belém Tower", icon: "🏰", description: "Maritime discovery monument" },
      { name: "Alfama", icon: "🏘️", description: "Oldest neighborhood" },
      { name: "Tram 28", icon: "🚃", description: "Scenic vintage ride" },
      { name: "Time Out Market", icon: "🍽️", description: "Food hall" },
      { name: "Sintra", icon: "🏯", description: "Fairytale palaces nearby" }
    ]
  },
  {
    id: "mumbai",
    name: "Mumbai",
    country: "India",
    flag: "🇮🇳",
    lat: 19.076,
    lng: 72.8777,
    heroImage: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=800&q=80",
    pros: [
      "Bollywood capital",
      "Incredible street food",
      "Historic colonial architecture",
      "Affordable destination",
      "Energetic city life"
    ],
    cons: [
      "Extreme crowds and traffic",
      "Poverty visible",
      "Hot and humid monsoons",
      "Culture shock for some"
    ],
    places: [
      { name: "Gateway of India", icon: "🚪", description: "Iconic waterfront arch" },
      { name: "Marine Drive", icon: "🌙", description: "Queen's Necklace promenade" },
      { name: "Elephanta Caves", icon: "🏛️", description: "Ancient rock temples" },
      { name: "Dharavi", icon: "🏭", description: "Largest slum tours" },
      { name: "Chhatrapati Shivaji", icon: "🚂", description: "Victorian train station" }
    ]
  }
];

// TODO: Replace with geocoding API
export function latLngToVector3(lat: number, lng: number, radius: number = 1): [number, number, number] {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  return [x, y, z];
}
