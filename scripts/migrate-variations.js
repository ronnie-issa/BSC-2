/**
 * Migration script to help convert referenced variations to embedded variations
 * 
 * This script is meant to be run in the Contentful Web App's console
 * It will log the JSON for each product's embedded variations that you can copy and paste
 * into the embeddedVariations field in the Contentful UI
 */

// Function to get all products
async function getAllProducts() {
  const space = await contentful.getCurrentSpace();
  const environment = await space.getEnvironment('master'); // or your environment name
  
  // Get all products
  const entries = await environment.getEntries({
    content_type: 'product',
    include: 2
  });
  
  return entries.items;
}

// Function to process a product and generate embedded variations
async function processProduct(product) {
  const fields = product.fields;
  const productName = fields.name['en-US']; // Adjust locale if needed
  
  console.log(`\n\n=== Processing Product: ${productName} ===`);
  
  if (!fields.variations) {
    console.log('No variations found for this product');
    return;
  }
  
  // Get the variations
  const variations = fields.variations['en-US']; // Adjust locale if needed
  
  if (!variations || variations.length === 0) {
    console.log('No variations found for this product');
    return;
  }
  
  // Create embedded variations array
  const embeddedVariations = [];
  
  for (const variationLink of variations) {
    try {
      // Get the variation entry
      const variationId = variationLink.sys.id;
      const variation = await contentful.getEntry(variationId);
      
      // Get variation fields
      const variationFields = variation.fields;
      const name = variationFields.name['en-US']; // Adjust locale if needed
      const value = variationFields.value['en-US']; // Adjust locale if needed
      
      // Get image if it exists
      let imageUrl = null;
      if (variationFields.image && variationFields.image['en-US']) {
        const imageId = variationFields.image['en-US'].sys.id;
        const image = await contentful.getAsset(imageId);
        imageUrl = image.fields.file['en-US'].url;
      }
      
      // Create embedded variation object
      const embeddedVariation = {
        name,
        value,
      };
      
      if (imageUrl) {
        embeddedVariation.image = {
          url: imageUrl
        };
      }
      
      embeddedVariations.push(embeddedVariation);
      
      console.log(`Added variation: ${name}`);
    } catch (error) {
      console.error(`Error processing variation: ${error.message}`);
    }
  }
  
  // Output the JSON for copying
  console.log('\nCopy this JSON to the embeddedVariations field:');
  console.log(JSON.stringify(embeddedVariations, null, 2));
}

// Main function
async function migrateVariations() {
  try {
    const products = await getAllProducts();
    console.log(`Found ${products.length} products`);
    
    for (const product of products) {
      await processProduct(product);
    }
    
    console.log('\n\nMigration script completed!');
    console.log('Copy the JSON for each product and paste it into the embeddedVariations field in the Contentful UI');
  } catch (error) {
    console.error('Error running migration script:', error);
  }
}

// Run the script
migrateVariations();
