# Database Structure / 数据库结构

## Overview / 概述

The materials data has been split into **4 separate files** to simulate a database with multiple tables. This modular approach makes it easier to maintain and update store-specific data.

材料数据已被拆分为 **4 个独立文件**，模拟具有多个表的数据库。这种模块化方法使维护和更新特定商店的数据变得更加容易。

## File Structure / 文件结构

```
meal_yuan/
├── wholefoods-data.js    (23 items / 商品)
├── safeway-data.js       (28 items / 商品)
├── ranch99-data.js       (27 items / 商品)
├── traderjoes-data.js    (20 items / 商品)
└── data.js               (Combines all + DISHES data / 合并所有 + 菜谱数据)
```

**Total: 98 materials across 4 stores / 总计：4 家商店共 98 种材料**

## Store Files / 商店文件

### 1. `wholefoods-data.js` 🟢
- **Constant:** `WHOLEFOODS_MATERIALS`
- **Items:** 23 products
- **Color:** Green (#00674f)
- **Badge:** WF

### 2. `safeway-data.js` 🔴
- **Constant:** `SAFEWAY_MATERIALS`
- **Items:** 28 products
- **Color:** Red (#e31837)
- **Badge:** S

### 3. `ranch99-data.js` 🟠
- **Constant:** `RANCH99_MATERIALS`
- **Items:** 27 products
- **Color:** Orange (#ff9500)
- **Badge:** 99

### 4. `traderjoes-data.js` 🔵
- **Constant:** `TRADERJOES_MATERIALS`
- **Items:** 20 products
- **Color:** Teal (#007A87) ⭐ New unique color!
- **Badge:** TJ

## How It Works / 工作原理

### Loading Sequence / 加载顺序

1. **Load store data files first** / 首先加载商店数据文件
   ```html
   <script src="wholefoods-data.js"></script>
   <script src="safeway-data.js"></script>
   <script src="ranch99-data.js"></script>
   <script src="traderjoes-data.js"></script>
   ```

2. **Load main data.js** / 加载主数据文件
   ```html
   <script src="data.js"></script>
   ```

3. **Merge all materials** / 合并所有材料
   ```javascript
   window.DATA.MATERIALS = [
     ...WHOLEFOODS_MATERIALS,
     ...SAFEWAY_MATERIALS,
     ...RANCH99_MATERIALS,
     ...TRADERJOES_MATERIALS
   ];
   ```

### Benefits / 优点

✅ **Better Organization** / 更好的组织
- Each store's data is in its own file
- 每个商店的数据都在自己的文件中

✅ **Easier Maintenance** / 更易维护
- Update one store without touching others
- 更新一家商店而不影响其他商店

✅ **Simulates Real Database** / 模拟真实数据库
- Like having separate tables in SQL
- 就像 SQL 中有单独的表一样

✅ **Scalable** / 可扩展
- Easy to add new stores by creating new files
- 通过创建新文件轻松添加新商店

## Example Material Object / 示例材料对象

```javascript
{
  id: "almond-milk-tj",
  nameCn: "杏仁奶",
  nameEn: "Almond Milk",
  brand: "Maruja",
  store: "Trader Joe's",
  price: 3.99,
  unit: "150 g",
  image: "https://images.openfoodfacts.org/images/products/..."
}
```

## Color Update / 颜色更新

**Trader Joe's** now has a unique **teal/turquoise color** (#007A87) instead of red, making it visually distinct from Safeway.

**Trader Joe's** 现在拥有独特的**青色/绿松石色** (#007A87) 而不是红色，使其在视觉上与 Safeway 区分开来。

---

**Note:** All data is sourced from Open Food Facts API and licensed under ODbL.
**注意：** 所有数据均来自 Open Food Facts API，并根据 ODbL 许可。
