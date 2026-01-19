console.log('data.js: Starting to load...');

const MATERIALS = [
  {
    id: "tofu-soft",
    nameCn: "嫩豆腐",
    nameEn: "Soft Tofu",
    brand: "365 by Whole Foods",
    store: "Whole Foods",
    price: 3.49,
    unit: "14 oz",
    image: "assets/materials/tofu.jpg"
  },
  {
    id: "ground-pork",
    nameCn: "猪肉末",
    nameEn: "Ground Pork",
    brand: "Whole Foods Market",
    store: "Whole Foods",
    price: 6.99,
    unit: "1 lb",
    image: "https://images.unsplash.com/photo-1602470520998-f4a52199a3d6?w=800&h=600&fit=crop"
  },
  {
    id: "scallion",
    nameCn: "青葱",
    nameEn: "Green Onions",
    brand: "Organic Produce",
    store: "Whole Foods",
    price: 1.49,
    unit: "1 bunch",
    image: "https://images.unsplash.com/photo-1629798787078-0c59e88aeb73?w=800&h=600&fit=crop"
  },
  {
    id: "garlic",
    nameCn: "蒜头",
    nameEn: "Garlic",
    brand: "Fresh Produce",
    store: "Whole Foods",
    price: 0.99,
    unit: "1 bulb",
    image: "assets/materials/garlic.jpg"
  },
  {
    id: "ginger",
    nameCn: "生姜",
    nameEn: "Fresh Ginger",
    brand: "Organic Produce",
    store: "Whole Foods",
    price: 1.29,
    unit: "per lb",
    image: "assets/materials/ginger.jpg"
  },
  {
    id: "chicken-thighs",
    nameCn: "鸡腿肉去骨",
    nameEn: "Boneless Chicken Thighs",
    brand: "Whole Foods Market",
    store: "Whole Foods",
    price: 8.99,
    unit: "per lb",
    image: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop"
  },
  {
    id: "eggs",
    nameCn: "鸡蛋",
    nameEn: "Large Eggs",
    brand: "365 Organic",
    store: "Whole Foods",
    price: 4.99,
    unit: "12 ct",
    image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=800&h=600&fit=crop"
  },
  {
    id: "roma-tomato",
    nameCn: "番茄",
    nameEn: "Roma Tomatoes",
    brand: "Fresh Produce",
    store: "Whole Foods",
    price: 3.59,
    unit: "per lb",
    image: "assets/materials/tomatoes.jpg"
  },
  {
    id: "ground-beef",
    nameCn: "牛肉馅",
    nameEn: "Ground Beef 85/15",
    brand: "Whole Foods Market",
    store: "Whole Foods",
    price: 7.99,
    unit: "per lb",
    image: "assets/materials/ground-beef.jpg"
  },
  {
    id: "parsley",
    nameCn: "欧芹",
    nameEn: "Fresh Parsley",
    brand: "Organic Produce",
    store: "Whole Foods",
    price: 1.79,
    unit: "1 bunch",
    image: "assets/materials/parsley.jpg"
  },
  {
    id: "chicken-breast",
    nameCn: "鸡胸肉",
    nameEn: "Chicken Breast",
    brand: "Whole Foods Market",
    store: "Whole Foods",
    price: 9.49,
    unit: "per lb",
    image: "https://images.unsplash.com/photo-1604503428506-a8da13d82791?w=800&h=600&fit=crop"
  },
  {
    id: "butter",
    nameCn: "黄油",
    nameEn: "Unsalted Butter",
    brand: "365 by Whole Foods",
    store: "Whole Foods",
    price: 4.29,
    unit: "16 oz",
    image: "assets/materials/butter.jpg"
  },
  {
    id: "lemon",
    nameCn: "柠檬",
    nameEn: "Lemons",
    brand: "Fresh Produce",
    store: "Whole Foods",
    price: 0.89,
    unit: "each",
    image: "https://images.unsplash.com/photo-1590502593747-42a996133562?w=800&h=600&fit=crop"
  },
  {
    id: "cornstarch",
    nameCn: "玉米淀粉",
    nameEn: "Cornstarch",
    brand: "Signature SELECT",
    store: "Safeway",
    price: 2.99,
    unit: "16 oz",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop"
  },
  {
    id: "chicken-broth",
    nameCn: "鸡汤",
    nameEn: "Chicken Broth",
    brand: "Signature SELECT",
    store: "Safeway",
    price: 3.49,
    unit: "32 oz",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&h=600&fit=crop"
  },
  {
    id: "canola-oil",
    nameCn: "菜籽油",
    nameEn: "Canola Oil",
    brand: "O Organics",
    store: "Safeway",
    price: 7.99,
    unit: "48 oz",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=600&fit=crop"
  },
  {
    id: "roasted-peanuts",
    nameCn: "烤花生",
    nameEn: "Dry Roasted Peanuts",
    brand: "Signature SELECT",
    store: "Safeway",
    price: 5.99,
    unit: "16 oz",
    image: "https://images.unsplash.com/photo-1582437386721-34c1c2589a83?w=800&h=600&fit=crop"
  },
  {
    id: "soy-sauce",
    nameCn: "酱油",
    nameEn: "Soy Sauce",
    brand: "Kikkoman",
    store: "Safeway",
    price: 4.49,
    unit: "15 oz",
    image: "https://images.unsplash.com/photo-1586985064044-8c3b5c36df76?w=800&h=600&fit=crop"
  },
  {
    id: "sugar",
    nameCn: "白砂糖",
    nameEn: "Granulated Sugar",
    brand: "C&H",
    store: "Safeway",
    price: 3.99,
    unit: "4 lbs",
    image: "https://images.unsplash.com/photo-1587228060-59e4ef64f5c5?w=800&h=600&fit=crop"
  },
  {
    id: "tomato-paste",
    nameCn: "番茄膏",
    nameEn: "Tomato Paste",
    brand: "Contadina",
    store: "Safeway",
    price: 2.29,
    unit: "12 oz",
    image: "https://images.unsplash.com/photo-1598164888914-e6c4c8d8d1a3?w=800&h=600&fit=crop"
  },
  {
    id: "breadcrumbs",
    nameCn: "面包糠",
    nameEn: "Italian Breadcrumbs",
    brand: "Progresso",
    store: "Safeway",
    price: 3.99,
    unit: "15 oz",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop"
  },
  {
    id: "olive-oil",
    nameCn: "橄榄油",
    nameEn: "Extra Virgin Olive Oil",
    brand: "O Organics",
    store: "Safeway",
    price: 12.99,
    unit: "25.5 oz",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=600&fit=crop&q=80"
  },
  {
    id: "paprika",
    nameCn: "红椒粉",
    nameEn: "Paprika",
    brand: "Signature SELECT",
    store: "Safeway",
    price: 2.99,
    unit: "2.12 oz",
    image: "https://images.unsplash.com/photo-1599909533872-c97725f38dc7?w=800&h=600&fit=crop"
  },
  {
    id: "black-pepper",
    nameCn: "黑胡椒",
    nameEn: "Black Pepper",
    brand: "Signature SELECT",
    store: "Safeway",
    price: 4.49,
    unit: "4 oz",
    image: "https://images.unsplash.com/photo-1596040033229-a0b55ee0a8ec?w=800&h=600&fit=crop"
  },
  {
    id: "doubanjiang",
    nameCn: "郫县豆瓣酱",
    nameEn: "Pixian Doubanjiang",
    brand: "Juancheng",
    store: "Ranch99",
    price: 4.99,
    unit: "16 oz",
    image: "https://images.unsplash.com/photo-1599909533872-c97725f38dc7?w=800&h=600&fit=crop&q=80&sat=-20"
  },
  {
    id: "sichuan-pepper",
    nameCn: "花椒",
    nameEn: "Sichuan Peppercorns",
    brand: "Mala Market",
    store: "Ranch99",
    price: 5.99,
    unit: "2 oz",
    image: "https://images.unsplash.com/photo-1596040033229-a0b55ee0a8ec?w=800&h=600&fit=crop&hue=30"
  },
  {
    id: "chili-oil",
    nameCn: "红油",
    nameEn: "Chili Oil",
    brand: "Lao Gan Ma",
    store: "Ranch99",
    price: 3.99,
    unit: "7.41 oz",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&h=600&fit=crop&hue=10"
  },
  {
    id: "dried-chilies",
    nameCn: "干辣椒",
    nameEn: "Dried Red Chilies",
    brand: "Sichuan Brand",
    store: "Ranch99",
    price: 3.49,
    unit: "4 oz",
    image: "https://images.unsplash.com/photo-1583202925739-250942342e4e?w=800&h=600&fit=crop"
  },
  {
    id: "black-vinegar",
    nameCn: "陈醋",
    nameEn: "Chinkiang Vinegar",
    brand: "Gold Plum",
    store: "Ranch99",
    price: 4.29,
    unit: "18.6 oz",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&h=600&fit=crop&sat=-30"
  },
  {
    id: "shaoxing",
    nameCn: "绍兴料酒",
    nameEn: "Shaoxing Cooking Wine",
    brand: "Pagoda",
    store: "Ranch99",
    price: 5.49,
    unit: "25.4 oz",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=800&h=600&fit=crop"
  },
  {
    id: "white-pepper",
    nameCn: "白胡椒粉",
    nameEn: "White Pepper Powder",
    brand: "Spice King",
    store: "Ranch99",
    price: 3.99,
    unit: "4 oz",
    image: "https://images.unsplash.com/photo-1596040033229-a0b55ee0a8ec?w=800&h=600&fit=crop&sat=-50"
  },
  {
    id: "light-soy",
    nameCn: "生抽",
    nameEn: "Light Soy Sauce",
    brand: "Lee Kum Kee",
    store: "Ranch99",
    price: 3.49,
    unit: "16.9 oz",
    image: "https://images.unsplash.com/photo-1586985064044-8c3b5c36df76?w=800&h=600&fit=crop&sat=-30"
  },
  {
    id: "oregano",
    nameCn: "牛至",
    nameEn: "Dried Oregano",
    brand: "McCormick",
    store: "Ranch99",
    price: 4.99,
    unit: "3 oz",
    image: "https://images.unsplash.com/photo-1515694590451-e33a61ab6f11?w=800&h=600&fit=crop"
  },
  {
    id: "chili-flakes",
    nameCn: "辣椒碎",
    nameEn: "Crushed Red Pepper",
    brand: "Dynasty",
    store: "Ranch99",
    price: 2.99,
    unit: "1 oz",
    image: "https://images.unsplash.com/photo-1599909533872-c97725f38dc7?w=800&h=600&fit=crop&hue=10"
  },
  {
    id: "sea-salt",
    nameCn: "海盐",
    nameEn: "Sea Salt",
    brand: "Diamond Crystal",
    store: "Ranch99",
    price: 3.49,
    unit: "26 oz",
    image: "https://images.unsplash.com/photo-1587228060-59e4ef64f5c5?w=800&h=600&fit=crop&sat=-80"
  },
  {
    id: "thyme",
    nameCn: "百里香",
    nameEn: "Dried Thyme",
    brand: "Spice Islands",
    store: "Ranch99",
    price: 4.49,
    unit: "0.7 oz",
    image: "https://images.unsplash.com/photo-1515694590451-e33a61ab6f11?w=800&h=600&fit=crop&hue=30"
  }
];

const DISHES = [
  {
    name: "麻婆豆腐 (Mapo Tofu)",
    image: "assets/mapo-tofu.jpg",
    tagline: "麻辣豆腐配猪肉末与花椒 / Spicy tofu with pork and Sichuan pepper.",
    steps: {
      preparation: [
        "切1英寸豆腐块，入加盐沸水焯1分钟沥干 / Dice tofu into 1-inch cubes; blanch in salted water for 1 minute, then drain.",
        "蒜、姜、葱切末备好 / Mince garlic, ginger, and scallion."
      ],
      main: [
        "热油下蒜、姜、葱炒香，加入豆瓣酱炒出红油 / Sauté aromatics; stir in doubanjiang until the oil turns red.",
        "加入猪肉末炒散至变色 / Add ground pork and cook until browned."
      ],
      side: [
        "倒入高汤，下豆腐小火烧5分钟入味 / Pour in broth, add tofu, and simmer gently for 5 minutes."
      ],
      seasoning: [
        "用水淀粉勾芡，撒花椒粉并淋红油 / Thicken with cornstarch slurry; finish with Sichuan pepper and chili oil."
      ]
    },
    materialIds: [
      "tofu-soft",
      "ground-pork",
      "scallion",
      "garlic",
      "ginger",
      "cornstarch",
      "chicken-broth",
      "canola-oil",
      "doubanjiang",
      "sichuan-pepper",
      "chili-oil"
    ]
  },
  {
    name: "宫保鸡丁 (Kung Pao Chicken)",
    image: "assets/kung-pao-chicken.jpg",
    tagline: "花生辣椒香炒鸡丁 / Kung pao chicken with peanuts and chilies.",
    steps: {
      preparation: [
        "鸡丁用生抽、绍兴酒、淀粉腌制15分钟 / Marinate chicken with soy sauce, Shaoxing wine, and cornstarch for 15 minutes.",
        "花生、干辣椒备用 / Prepare peanuts and dried chilies."
      ],
      main: [
        "大火滑炒鸡丁至变色微焦，盛出 / Stir-fry chicken on high heat until browned; remove from pan."
      ],
      side: [
        "干锅略炒花生与干辣椒，盛出备用 / Toast peanuts and dried chilies briefly; set aside."
      ],
      seasoning: [
        "炒香蒜、姜、葱，加入调味汁收至发亮 / Cook garlic, ginger, and scallion; add sauce and reduce until glossy.",
        "回锅鸡丁与花生快速翻匀 / Return chicken and peanuts; toss quickly to coat."
      ]
    },
    materialIds: [
      "chicken-thighs",
      "garlic",
      "scallion",
      "roasted-peanuts",
      "soy-sauce",
      "cornstarch",
      "dried-chilies",
      "black-vinegar",
      "shaoxing"
    ]
  },
  {
    name: "番茄炒蛋 (Tomato Egg Stir-Fry)",
    image: "assets/tomato-egg.jpg",
    tagline: "家常番茄炒蛋 / Classic tomato egg stir-fry.",
    steps: {
      preparation: [
        "鸡蛋加少许盐与清水打散 / Beat eggs with a pinch of salt and a splash of water.",
        "番茄切块，葱切末 / Chop tomatoes and scallions."
      ],
      main: [
        "中火炒鸡蛋至刚凝固，盛出 / Scramble eggs over medium heat until just set; remove."
      ],
      side: [
        "番茄加少许盐和糖炒至出汁 / Cook tomatoes with a pinch of salt and sugar until saucy."
      ],
      seasoning: [
        "回锅鸡蛋轻轻翻拌 / Return eggs and gently fold to combine.",
        "撒葱花，滴少许香油 / Finish with scallions and a drizzle of sesame oil."
      ]
    },
    materialIds: [
      "eggs",
      "roma-tomato",
      "scallion",
      "canola-oil",
      "sugar",
      "white-pepper",
      "light-soy"
    ]
  },
  {
    name: "肉丸酱 (Meatball Paste)",
    image: "assets/meatballs.jpg",
    tagline: "番茄酱汁慢炖肉丸 / Savory meatballs simmered in tomato paste.",
    steps: {
      preparation: [
        "肉馅与面包糠、鸡蛋、洋葱、蒜末、盐胡椒拌匀 / Combine ground meat with breadcrumbs, egg, onion, garlic, salt, and pepper.",
        "搓成约1英寸肉丸，冷藏10分钟定型 / Form 1-inch meatballs; chill 10 minutes to set."
      ],
      main: [
        "热油煎至表面金黄 / Sear in hot oil until browned on all sides."
      ],
      side: [
        "番茄膏用高汤稀释备用 / Dilute tomato paste with broth for a simmering sauce."
      ],
      seasoning: [
        "加入番茄汁小火焖12-15分钟 / Simmer in tomato sauce for 12-15 minutes.",
        "撒香草并调味收尾 / Finish with herbs and adjust seasoning."
      ]
    },
    materialIds: [
      "ground-beef",
      "eggs",
      "parsley",
      "garlic",
      "tomato-paste",
      "breadcrumbs",
      "olive-oil",
      "oregano",
      "chili-flakes"
    ]
  },
  {
    name: "香煎鸡胸 (Pan-Fried Chicken Breast)",
    image: "assets/pan-fried-chicken-breast.jpg",
    tagline: "金黄外皮多汁鸡胸 / Juicy chicken with a golden crust.",
    steps: {
      preparation: [
        "擦干水分，敲至约1/2英寸厚 / Pat chicken dry and pound to about 1/2-inch thickness.",
        "两面撒盐、黑胡椒和红椒粉 / Season both sides with salt, pepper, and paprika."
      ],
      main: [
        "热油每面煎3-4分钟至金黄 / Sear in hot oil 3-4 minutes per side until golden."
      ],
      side: [
        "黄油与蒜片备用 / Prepare butter and sliced garlic for basting."
      ],
      seasoning: [
        "转小火加黄油蒜片，煎至中心165°F / Lower heat, add butter and garlic; cook to 165°F internal temp.",
        "静置5分钟再切片 / Rest 5 minutes before slicing."
      ]
    },
    materialIds: [
      "chicken-breast",
      "butter",
      "garlic",
      "lemon",
      "canola-oil",
      "paprika",
      "black-pepper",
      "sea-salt",
      "thyme"
    ]
  }
];

window.DATA = {
  MATERIALS,
  DISHES
};

console.log('data.js: Finished loading. Materials count:', MATERIALS.length, 'Dishes count:', DISHES.length);
