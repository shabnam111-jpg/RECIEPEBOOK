// Recipe Book Application JavaScript

// Global variables
let recipes = [];
let filteredRecipes = [];

// DOM Elements
const sections = {
    home: document.getElementById('home'),
    addRecipe: document.getElementById('add-recipe'),
    viewRecipes: document.getElementById('view-recipes')
};

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    loadRecipes();
    displayFeaturedRecipes();
    displayAllRecipes();
    
    // Add form event listener
    const recipeForm = document.getElementById('recipe-form');
    if (recipeForm) {
        recipeForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Load sample recipes if no recipes exist
    if (recipes.length === 0) {
        loadSampleRecipes();
    }
});

// Sample recipes for demonstration
function loadSampleRecipes() {
    const sampleRecipes = [
        {
            id: generateId(),
            name: "Classic Chocolate Chip Cookies",
            category: "dessert",
            prepTime: 15,
            cookTime: 12,
            servings: 24,
            image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=400&h=300&fit=crop",
            ingredients: [
                "2 1/4 cups all-purpose flour",
                "1 tsp baking soda",
                "1 tsp salt",
                "1 cup butter, softened",
                "3/4 cup granulated sugar",
                "3/4 cup brown sugar",
                "2 large eggs",
                "2 tsp vanilla extract",
                "2 cups chocolate chips"
            ],
            instructions: [
                "Preheat oven to 375°F (190°C). Line baking sheets with parchment paper.",
                "In a medium bowl, whisk together flour, baking soda, and salt.",
                "In a large bowl, cream together softened butter and both sugars until light and fluffy.",
                "Beat in eggs one at a time, then add vanilla extract.",
                "Gradually mix in the flour mixture until just combined.",
                "Fold in chocolate chips with a wooden spoon.",
                "Drop rounded tablespoons of dough onto prepared baking sheets.",
                "Bake for 9-11 minutes until golden brown around edges.",
                "Cool on baking sheet for 5 minutes before transferring to wire rack."
            ],
            dateAdded: new Date().toISOString()
        },
        {
            id: generateId(),
            name: "Creamy Chicken Alfredo",
            category: "main-course",
            prepTime: 20,
            cookTime: 25,
            servings: 4,
            image: "https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop",
            ingredients: [
                "1 lb fettuccine pasta",
                "2 chicken breasts, sliced",
                "3 cloves garlic, minced",
                "1 cup heavy cream",
                "1 cup parmesan cheese, grated",
                "4 tbsp butter",
                "2 tbsp olive oil",
                "Salt and pepper to taste",
                "Fresh parsley for garnish"
            ],
            instructions: [
                "Cook fettuccine according to package directions. Drain and set aside.",
                "Season chicken with salt and pepper. Heat olive oil in a large skillet.",
                "Cook chicken until golden brown and cooked through, about 6-8 minutes per side.",
                "Remove chicken and set aside. In the same skillet, melt butter.",
                "Add minced garlic and sauté for 1 minute until fragrant.",
                "Pour in heavy cream and bring to a gentle simmer.",
                "Gradually whisk in parmesan cheese until melted and smooth.",
                "Return chicken to the skillet and add cooked pasta.",
                "Toss everything together and garnish with fresh parsley."
            ],
            dateAdded: new Date().toISOString()
        },
        {
            id: generateId(),
            name: "Fresh Caprese Salad",
            category: "appetizer",
            prepTime: 15,
            cookTime: 0,
            servings: 4,
            image: "https://images.unsplash.com/photo-1608897013039-887f21d8c804?w=400&h=300&fit=crop",
            ingredients: [
                "4 large tomatoes, sliced",
                "8 oz fresh mozzarella, sliced",
                "1/4 cup fresh basil leaves",
                "3 tbsp extra virgin olive oil",
                "2 tbsp balsamic glaze",
                "Sea salt to taste",
                "Fresh black pepper"
            ],
            instructions: [
                "Arrange tomato and mozzarella slices alternating on a serving platter.",
                "Tuck fresh basil leaves between the tomato and mozzarella slices.",
                "Drizzle with extra virgin olive oil and balsamic glaze.",
                "Season with sea salt and freshly ground black pepper.",
                "Let sit for 10 minutes to allow flavors to meld before serving.",
                "Serve immediately at room temperature for best flavor."
            ],
            dateAdded: new Date().toISOString()
        },
        {
            id: generateId(),
            name: "Refreshing Strawberry Smoothie",
            category: "beverage",
            prepTime: 5,
            cookTime: 0,
            servings: 2,
            image: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?w=400&h=300&fit=crop",
            ingredients: [
                "2 cups fresh strawberries, hulled",
                "1 banana, peeled",
                "1 cup vanilla Greek yogurt",
                "1/2 cup milk of choice",
                "2 tbsp honey",
                "1 cup ice cubes",
                "Mint leaves for garnish"
            ],
            instructions: [
                "Wash and hull the strawberries, then add to blender.",
                "Add banana, Greek yogurt, milk, and honey to the blender.",
                "Add ice cubes for a thicker, colder smoothie.",
                "Blend on high speed for 60-90 seconds until completely smooth.",
                "Taste and adjust sweetness with additional honey if needed.",
                "Pour into glasses and garnish with fresh mint leaves.",
                "Serve immediately for best taste and texture."
            ],
            dateAdded: new Date().toISOString()
        },
        {
            id: generateId(),
            name: "Homemade Granola Bars",
            category: "snack",
            prepTime: 15,
            cookTime: 25,
            servings: 12,
            image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=400&h=300&fit=crop",
            ingredients: [
                "2 cups old-fashioned oats",
                "1/2 cup chopped almonds",
                "1/2 cup dried cranberries",
                "1/4 cup sunflower seeds",
                "1/4 cup honey",
                "1/4 cup almond butter",
                "2 tbsp coconut oil",
                "1 tsp vanilla extract",
                "1/2 tsp cinnamon",
                "1/4 tsp salt"
            ],
            instructions: [
                "Preheat oven to 350°F (175°C). Line an 8x8 pan with parchment paper.",
                "Mix oats, almonds, cranberries, and sunflower seeds in a large bowl.",
                "In a small saucepan, warm honey, almond butter, and coconut oil.",
                "Stir in vanilla, cinnamon, and salt until well combined.",
                "Pour the warm mixture over the dry ingredients and mix thoroughly.",
                "Press mixture firmly into the prepared pan using a spatula.",
                "Bake for 20-25 minutes until golden brown around edges.",
                "Cool completely in pan before cutting into bars.",
                "Store in an airtight container for up to one week."
            ],
            dateAdded: new Date().toISOString()
        }
    ];
    
    recipes = sampleRecipes;
    saveRecipes();
    displayFeaturedRecipes();
    displayAllRecipes();
}

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    Object.values(sections).forEach(section => {
        if (section) section.classList.remove('active');
    });
    
    // Show selected section
    if (sections[sectionName]) {
        sections[sectionName].classList.add('active');
    }
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Refresh recipe displays when viewing recipes
    if (sectionName === 'view-recipes') {
        displayAllRecipes();
    } else if (sectionName === 'home') {
        displayFeaturedRecipes();
    }
}

// Form handling functions
function addIngredient() {
    const container = document.getElementById('ingredients-container');
    const newInput = document.createElement('div');
    newInput.className = 'ingredient-input';
    newInput.innerHTML = `
        <input type="text" placeholder="Enter ingredient" required>
        <button type="button" onclick="removeIngredient(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(newInput);
}

function removeIngredient(button) {
    const container = document.getElementById('ingredients-container');
    if (container.children.length > 1) {
        button.parentElement.remove();
    }
}

function addInstruction() {
    const container = document.getElementById('instructions-container');
    const newInput = document.createElement('div');
    newInput.className = 'instruction-input';
    newInput.innerHTML = `
        <textarea placeholder="Enter instruction step" required></textarea>
        <button type="button" onclick="removeInstruction(this)">
            <i class="fas fa-times"></i>
        </button>
    `;
    container.appendChild(newInput);
}

function removeInstruction(button) {
    const container = document.getElementById('instructions-container');
    if (container.children.length > 1) {
        button.parentElement.remove();
    }
}

// Form submission
function handleFormSubmit(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    
    // Collect ingredients
    const ingredients = [];
    document.querySelectorAll('#ingredients-container input').forEach(input => {
        if (input.value.trim()) {
            ingredients.push(input.value.trim());
        }
    });
    
    // Collect instructions
    const instructions = [];
    document.querySelectorAll('#instructions-container textarea').forEach(textarea => {
        if (textarea.value.trim()) {
            instructions.push(textarea.value.trim());
        }
    });
    
    // Validate required fields
    if (ingredients.length === 0) {
        alert('Please add at least one ingredient.');
        return;
    }
    
    if (instructions.length === 0) {
        alert('Please add at least one instruction step.');
        return;
    }
    
    // Create recipe object
    const recipe = {
        id: generateId(),
        name: document.getElementById('recipe-name').value.trim(),
        category: document.getElementById('recipe-category').value,
        prepTime: parseInt(document.getElementById('prep-time').value),
        cookTime: parseInt(document.getElementById('cook-time').value),
        servings: parseInt(document.getElementById('servings').value),
        image: document.getElementById('recipe-image').value.trim(),
        ingredients: ingredients,
        instructions: instructions,
        dateAdded: new Date().toISOString()
    };
    
    // Add recipe to collection
    recipes.push(recipe);
    saveRecipes();
    
    // Show success message
    showSuccessMessage();
    
    // Reset form
    event.target.reset();
    resetDynamicInputs();
    
    // Refresh displays
    displayFeaturedRecipes();
    displayAllRecipes();
}

function resetDynamicInputs() {
    // Reset ingredients to one input
    const ingredientsContainer = document.getElementById('ingredients-container');
    ingredientsContainer.innerHTML = `
        <div class="ingredient-input">
            <input type="text" placeholder="Enter ingredient" required>
            <button type="button" onclick="removeIngredient(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Reset instructions to one input
    const instructionsContainer = document.getElementById('instructions-container');
    instructionsContainer.innerHTML = `
        <div class="instruction-input">
            <textarea placeholder="Enter instruction step" required></textarea>
            <button type="button" onclick="removeInstruction(this)">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
}

// Display functions
function displayFeaturedRecipes() {
    const container = document.getElementById('featured-recipes');
    if (!container) return;
    
    // Show latest 3 recipes
    const featured = recipes.slice(-3).reverse();
    
    if (featured.length === 0) {
        container.innerHTML = `
            <div class="no-recipes">
                <i class="fas fa-utensils"></i>
                <p>No recipes yet. Add your first recipe to get started!</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = featured.map(recipe => createRecipeCard(recipe)).join('');
}

function displayAllRecipes() {
    const container = document.getElementById('recipes-container');
    if (!container) return;
    
    const recipesToShow = filteredRecipes.length > 0 ? filteredRecipes : recipes;
    
    if (recipesToShow.length === 0) {
        container.innerHTML = `
            <div class="no-recipes">
                <i class="fas fa-search"></i>
                <p>No recipes found. Try adjusting your search or filter.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = recipesToShow.map(recipe => createRecipeCard(recipe)).join('');
}

function createRecipeCard(recipe) {
    const totalTime = recipe.prepTime + recipe.cookTime;
    const imageElement = recipe.image ? 
        `<img src="${recipe.image}" alt="${recipe.name}" class="recipe-image" onerror="this.parentElement.innerHTML='<div class=&quot;recipe-image-placeholder&quot;><i class=&quot;fas fa-image&quot;></i></div>'">` :
        `<div class="recipe-image-placeholder"><i class="fas fa-image"></i></div>`;
    
    return `
        <div class="recipe-card" onclick="showRecipeDetail('${recipe.id}')">
            ${imageElement}
            <div class="recipe-content">
                <h3 class="recipe-title">${recipe.name}</h3>
                <div class="recipe-meta">
                    <span><i class="fas fa-clock"></i> ${totalTime} min</span>
                    <span><i class="fas fa-users"></i> ${recipe.servings} servings</span>
                </div>
                <span class="recipe-category">${formatCategory(recipe.category)}</span>
            </div>
        </div>
    `;
}

// Recipe detail modal
function showRecipeDetail(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    const modal = document.getElementById('recipe-modal');
    const detailContainer = document.getElementById('recipe-detail');
    
    const imageElement = recipe.image ? 
        `<img src="${recipe.image}" alt="${recipe.name}" class="recipe-detail-image" onerror="this.style.display='none'">` :
        '';
    
    detailContainer.innerHTML = `
        <div class="recipe-detail-header">
            ${imageElement}
            <h2 class="recipe-detail-title">${recipe.name}</h2>
            <div class="recipe-detail-meta">
                <div class="meta-item">
                    <i class="fas fa-clock"></i>
                    <span>Prep: ${recipe.prepTime} min</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-fire"></i>
                    <span>Cook: ${recipe.cookTime} min</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-users"></i>
                    <span>Serves: ${recipe.servings}</span>
                </div>
                <div class="meta-item">
                    <i class="fas fa-tag"></i>
                    <span>${formatCategory(recipe.category)}</span>
                </div>
            </div>
        </div>
        
        <div class="ingredients-section">
            <h3><i class="fas fa-list"></i> Ingredients</h3>
            <ul class="ingredients-list">
                ${recipe.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
        </div>
        
        <div class="instructions-section">
            <h3><i class="fas fa-clipboard-list"></i> Instructions</h3>
            <ol class="instructions-list">
                ${recipe.instructions.map(instruction => `<li>${instruction}</li>`).join('')}
            </ol>
        </div>
    `;
    
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('recipe-modal').style.display = 'none';
}

// Search functionality
function searchRecipes() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase().trim();
    
    if (!searchTerm) {
        filteredRecipes = [];
        displayAllRecipes();
        showSection('view-recipes');
        return;
    }
    
    filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm) ||
               recipe.category.toLowerCase().includes(searchTerm) ||
               recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchTerm));
    });
    
    showSection('view-recipes');
    displayAllRecipes();
}

// Filter functionality
function filterRecipes() {
    const categoryFilter = document.getElementById('category-filter').value;
    
    if (!categoryFilter) {
        filteredRecipes = [];
    } else {
        filteredRecipes = recipes.filter(recipe => recipe.category === categoryFilter);
    }
    
    displayAllRecipes();
}

// Storage functions
function saveRecipes() {
    localStorage.setItem('recipeBook', JSON.stringify(recipes));
}

function loadRecipes() {
    const saved = localStorage.getItem('recipeBook');
    if (saved) {
        recipes = JSON.parse(saved);
    }
}

// Utility functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatCategory(category) {
    return category.split('-').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
}

function showSuccessMessage() {
    const message = document.getElementById('success-message');
    message.classList.add('show');
    setTimeout(() => {
        message.classList.remove('show');
    }, 3000);
}

// Event listeners for keyboard shortcuts
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
    if (event.key === 'Enter' && event.target.id === 'search-input') {
        searchRecipes();
    }
});

// Close modal when clicking outside
document.getElementById('recipe-modal').addEventListener('click', function(event) {
    if (event.target === this) {
        closeModal();
    }
});

// Handle Enter key in search
document.getElementById('search-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchRecipes();
    }
});

// Make functions globally available
window.showSection = showSection;
window.addIngredient = addIngredient;
window.removeIngredient = removeIngredient;
window.addInstruction = addInstruction;
window.removeInstruction = removeInstruction;
window.searchRecipes = searchRecipes;
window.filterRecipes = filterRecipes;
window.showRecipeDetail = showRecipeDetail;
window.closeModal = closeModal;
