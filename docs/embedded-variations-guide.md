# Embedded Variations Guide

This guide explains how to migrate from referenced variations to embedded variations in your Contentful setup for better scalability and product-specific variations.

## Why Embedded Variations?

The current approach uses referenced variations, which means:
- Each variation (like "Black" or "White") is a separate entry in Contentful
- Multiple products link to the same variation entries
- When you view a variation, it shows links to all products that use it
- It's difficult to have product-specific variation images

The embedded variations approach solves these issues by:
- Storing variations directly within each product as a JSON object
- Allowing each product to have its own unique variations with their own images
- Eliminating the need for separate variation entries
- Making it easier to manage product-specific variations

## Implementation Steps

### 1. Add the Embedded Variations Field in Contentful

1. Go to your Content Model in Contentful
2. Select the Product content type
3. Click "Add Field" and select "JSON Object" as the field type
4. Name it "embeddedVariations"
5. Make it required
6. Save the changes

The JSON structure should look like this:
```json
[
  {
    "name": "Black",
    "value": "#000000",
    "image": {
      "url": "https://example.com/black-image.jpg"
    }
  },
  {
    "name": "White",
    "value": "#FFFFFF",
    "image": {
      "url": "https://example.com/white-image.jpg"
    }
  }
]
```

### 2. Migrate Your Data

#### Option A: Using the Migration Script

1. Open the Contentful Web App
2. Navigate to your space
3. Open your browser's developer console (F12 or right-click > Inspect > Console)
4. Copy and paste the contents of `scripts/migrate-variations.js` into the console
5. Run the script by pressing Enter
6. For each product, copy the generated JSON and paste it into the embeddedVariations field

#### Option B: Manual Migration

For each product:
1. Edit the product entry
2. For each linked variation, note its name, value, and image URL
3. Create a JSON array in the new embeddedVariations field with this data
4. Save the product

### 3. Test Your Implementation

The code has been updated to use embedded variations if they exist, and fall back to referenced variations if they don't. This allows for a gradual migration.

To test:
1. Add embedded variations to a few products
2. View those products on your website
3. Verify that the variations display correctly
4. Check that variation images change when selecting different variations

### 4. Complete the Migration

Once you've verified that everything works correctly:
1. Migrate all remaining products to use embedded variations
2. You can keep the referenced variations field for backward compatibility, but it's no longer needed

## Troubleshooting

If you encounter issues:
1. Check the browser console for errors
2. Verify that your JSON structure matches the expected format
3. Make sure all image URLs are valid
4. Try refreshing the page or clearing your browser cache

## Benefits of This Approach

- **Scalability**: Each product can have its own unique variations
- **Maintainability**: Easier to manage product-specific variations
- **Performance**: Fewer API calls needed to fetch product data
- **Flexibility**: Can easily add or modify variations for specific products without affecting others
