console.log('data.js: Starting to load...');

// Product data from Open Food Facts API (https://world.openfoodfacts.org)
// Open Food Facts is a free and open database of food products from around the world
// Licensed under the Open Database License (ODbL)
// Real product brands and images sourced from Open Food Facts

// Load materials from individual store files (database simulation)
// This modular approach makes it easier to maintain and update store-specific data

// Merge materials from all store databases
// Use an IIFE to avoid global variable conflicts
(function() {
  const MATERIALS = [
    ...(typeof WHOLEFOODS_MATERIALS !== 'undefined' ? WHOLEFOODS_MATERIALS : []),
    ...(typeof SAFEWAY_MATERIALS !== 'undefined' ? SAFEWAY_MATERIALS : []),
    ...(typeof RANCH99_MATERIALS !== 'undefined' ? RANCH99_MATERIALS : []),
    ...(typeof TRADERJOES_MATERIALS !== 'undefined' ? TRADERJOES_MATERIALS : [])
  ];

  console.log('data.js: Merged materials from store databases:', MATERIALS.length);

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

  // Utility functions
  function getMaterialById(id) {
    return MATERIALS.find((m) => m.id === id);
  }

  function getMaterialsByStore(store) {
    return MATERIALS.filter((m) => m.store === store);
  }

  function getAllStores() {
    return [...new Set(MATERIALS.map((m) => m.store))];
  }

  // Verify all dish materials exist - add dummy materials if missing
  const allMaterialIds = new Set(MATERIALS.map(m => m.id));
  const missingMaterials = [];
  
  DISHES.forEach(dish => {
    dish.materialIds.forEach(id => {
      if (!allMaterialIds.has(id) && !missingMaterials.find(m => m.id === id)) {
        console.warn(`⚠️ Missing material: ${id} (needed by ${dish.name})`);
        // Create dummy material
        const dummyMaterial = {
          id: id,
          nameCn: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          nameEn: id.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
          brand: 'Generic',
          store: 'Whole Foods',
          price: 0.00,
          unit: 'unit',
          image: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect width="200" height="200" fill="%23ddd"/%3E%3Ctext x="100" y="100" text-anchor="middle" fill="%23666" font-size="14"%3ENo Image%3C/text%3E%3C/svg%3E'
        };
        missingMaterials.push(dummyMaterial);
        MATERIALS.push(dummyMaterial);
        allMaterialIds.add(id);
      }
    });
  });
  
  if (missingMaterials.length > 0) {
    console.warn(`⚠️ Added ${missingMaterials.length} dummy materials:`, missingMaterials.map(m => m.id));
  }

  // Export to window.DATA
  window.DATA = {
    MATERIALS,
    DISHES,
    getMaterialById,
    getMaterialsByStore,
    getAllStores
  };

  console.log('data.js: Finished loading. Materials count:', MATERIALS.length, 'Dishes count:', DISHES.length);
  if (missingMaterials.length > 0) {
    console.log('⚠️ Note: Some materials were auto-generated. Please add them to store data files.');
  }
})(); // End of IIFE
