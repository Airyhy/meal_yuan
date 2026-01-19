// Material-Dish Verification Tool
// This script verifies that all materials referenced by dishes exist in the database

function verifyMaterialsDishesIntegrity() {
  console.log('=== Material-Dish Integrity Check ===\n');
  
  if (!window.DATA || !window.DATA.DISHES || !window.DATA.MATERIALS) {
    console.error('❌ Data not loaded!');
    return false;
  }

  const { DISHES, MATERIALS } = window.DATA;
  
  // Build material ID map
  const materialMap = new Map();
  MATERIALS.forEach(m => materialMap.set(m.id, m));
  
  console.log(`📊 Database Stats:`);
  console.log(`   Dishes: ${DISHES.length}`);
  console.log(`   Materials: ${MATERIALS.length}`);
  console.log('');
  
  // Check each dish
  let allValid = true;
  const materialUsage = new Map(); // track which dishes use each material
  
  DISHES.forEach(dish => {
    const missing = [];
    
    dish.materialIds.forEach(id => {
      // Track usage
      if (!materialUsage.has(id)) {
        materialUsage.set(id, []);
      }
      materialUsage.get(id).push(dish.name);
      
      // Check if exists
      if (!materialMap.has(id)) {
        missing.push(id);
        allValid = false;
      }
    });
    
    if (missing.length > 0) {
      console.error(`❌ ${dish.name}:`);
      console.error(`   Missing materials: ${missing.join(', ')}`);
    } else {
      console.log(`✅ ${dish.name}: All ${dish.materialIds.length} materials found`);
    }
  });
  
  console.log('\n=== Material Usage Summary ===');
  console.log(`Total unique materials used: ${materialUsage.size}`);
  
  // Show which materials are most used
  const usageArray = Array.from(materialUsage.entries())
    .map(([id, dishes]) => ({ id, count: dishes.length, dishes }))
    .sort((a, b) => b.count - a.count);
  
  console.log('\nMost used materials:');
  usageArray.slice(0, 10).forEach(item => {
    const material = materialMap.get(item.id);
    const name = material ? `${material.nameCn} / ${material.nameEn}` : item.id;
    console.log(`  ${name} (${item.count} dishes)`);
  });
  
  if (allValid) {
    console.log('\n✅ All dishes have valid materials!');
  } else {
    console.log('\n❌ Some materials are missing from the database!');
  }
  
  return allValid;
}

// Run verification when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    setTimeout(verifyMaterialsDishesIntegrity, 100);
  });
} else {
  verifyMaterialsDishesIntegrity();
}

// Make it available globally
window.verifyMaterialsDishesIntegrity = verifyMaterialsDishesIntegrity;
