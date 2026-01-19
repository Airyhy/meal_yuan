# Materials & Dishes Database Relationship / 材料与菜品数据库关系

## ✅ Current Status / 当前状态

**All materials referenced by dishes exist in the database!**  
**所有菜品引用的材料都存在于数据库中！**

- **Dishes**: 5 / 菜品数
- **Total Materials**: 98 / 总材料数
- **Materials Used by Dishes**: 36 / 菜品使用的材料数
- **Missing Materials**: 0 / 缺失材料数 ✅

---

## 🔗 How They Are Connected / 它们如何关联

### 1. **Dishes Reference Materials by ID / 菜品通过 ID 引用材料**

Each dish has a `materialIds` array:
每个菜品都有一个 `materialIds` 数组：

```javascript
{
  name: "麻婆豆腐 (Mapo Tofu)",
  materialIds: [
    "tofu-soft",
    "ground-pork",
    "scallion",
    "garlic",
    // ...
  ]
}
```

### 2. **Materials Are Stored in 4 Store Files / 材料存储在 4 个商店文件中**

```
wholefoods-data.js   (23 items)
safeway-data.js      (28 items)
ranch99-data.js      (27 items)
traderjoes-data.js   (20 items)
```

Each material has:
每个材料包含：

```javascript
{
  id: "tofu-soft",           // ← This ID links to dishes
  nameCn: "嫩豆腐",
  nameEn: "Soft Tofu",
  brand: "Morinaga",
  store: "Whole Foods",
  price: 3.49,
  unit: "14 oz",
  image: "https://..."
}
```

---

## 🛡️ Safety Features / 安全功能

### **Auto-Generate Missing Materials / 自动生成缺失材料**

The system now includes automatic protection in `data.js`:

系统现在在 `data.js` 中包含自动保护：

- ✅ Checks all dish materials at startup / 启动时检查所有菜品材料
- ✅ Creates dummy materials if any are missing / 如果缺失则创建虚拟材料
- ✅ Shows warnings in console / 在控制台显示警告
- ✅ Prevents errors / 防止错误

If a material is missing, a dummy will be created:
如果缺少材料，将创建虚拟材料：

```javascript
{
  id: "missing-item",
  nameCn: "Missing Item",
  nameEn: "Missing Item",
  brand: "Generic",
  store: "Whole Foods",
  price: 0.00,
  unit: "unit",
  image: "[placeholder image]"
}
```

---

## 📊 Materials Used by Each Dish / 每道菜使用的材料

### 麻婆豆腐 (Mapo Tofu)
**11 materials**: tofu-soft, ground-pork, scallion, garlic, ginger, cornstarch, chicken-broth, canola-oil, doubanjiang, sichuan-pepper, chili-oil

### 宫保鸡丁 (Kung Pao Chicken)
**9 materials**: chicken-thighs, garlic, scallion, roasted-peanuts, soy-sauce, cornstarch, dried-chilies, black-vinegar, shaoxing

### 番茄炒蛋 (Tomato Egg Stir-Fry)
**7 materials**: eggs, roma-tomato, scallion, canola-oil, sugar, white-pepper, light-soy

### 肉丸酱 (Meatball Paste)
**9 materials**: ground-beef, eggs, parsley, garlic, tomato-paste, breadcrumbs, olive-oil, oregano, chili-flakes

### 香煎鸡胸 (Pan-Fried Chicken Breast)
**9 materials**: chicken-breast, butter, garlic, lemon, canola-oil, paprika, black-pepper, sea-salt, thyme

---

## 🧪 Testing / 测试

### **Run Verification Check / 运行验证检查**

Open browser console and run:
打开浏览器控制台并运行：

```javascript
verifyMaterialsDishesIntegrity()
```

This will show:
这将显示：
- ✅ Which dishes have all materials / 哪些菜品有所有材料
- ❌ Which materials are missing / 哪些材料缺失
- 📊 Material usage statistics / 材料使用统计

---

## ➕ Adding New Content / 添加新内容

### **Adding a New Material / 添加新材料**

1. Choose the appropriate store file:
   选择合适的商店文件：
   - `wholefoods-data.js`
   - `safeway-data.js`
   - `ranch99-data.js`
   - `traderjoes-data.js`

2. Add the material object:
   添加材料对象：

```javascript
{
  id: "new-ingredient",      // ← Use this ID in dishes
  nameCn: "新配料",
  nameEn: "New Ingredient",
  brand: "Brand Name",
  store: "Whole Foods",       // Must match file
  price: 4.99,
  unit: "1 lb",
  image: "https://..."
}
```

### **Adding a New Dish / 添加新菜品**

Edit `data.js` and add to the `DISHES` array:
编辑 `data.js` 并添加到 `DISHES` 数组：

```javascript
{
  name: "新菜 (New Dish)",
  image: "assets/new-dish.jpg",
  tagline: "描述 / Description",
  steps: { /* ... */ },
  materialIds: [
    "ingredient-1",    // ← These IDs must exist in store files
    "ingredient-2",
    "ingredient-3"
  ]
}
```

⚠️ **Important**: Make sure all IDs in `materialIds` exist in the store database files!  
⚠️ **重要**: 确保 `materialIds` 中的所有 ID 都存在于商店数据库文件中！

---

## 🐛 Troubleshooting / 故障排除

### Problem: Dishes not showing / 问题：菜品不显示

**Solution**: 
1. Open browser console (F12)
2. Look for "Missing material" warnings
3. Add missing materials to appropriate store file
4. Refresh page

### Problem: Material shows as "Generic" / 问题：材料显示为 "Generic"

**Cause**: This is a dummy material auto-generated because it was missing  
**原因**: 这是因为缺失而自动生成的虚拟材料

**Solution**: Add the real material to a store data file  
**解决方案**: 将真实材料添加到商店数据文件

---

## ✅ Verification Passed / 验证通过

Last checked: All 36 materials needed by dishes exist in the database.  
上次检查：菜品所需的所有 36 种材料都存在于数据库中。

**Database is healthy! / 数据库状态良好！** 🎉
