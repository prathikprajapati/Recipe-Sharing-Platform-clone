// User Recipe Card creation

document.addEventListener('DOMContentLoaded', function () {
    const recipeForm = document.getElementById('recipe-form');
    const myRecipesSection = document.getElementById('my-recipes');
    const myRecipeCards = myRecipesSection.querySelector('.my-recipe-cards');

    // Initially hide the My Recipes section
    myRecipesSection.style.display = 'none';

    // Handle form submission
    recipeForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission behavior

        // Get form values
        const recipeName = document.getElementById('recipe-name').value;
        const ingredients = document.getElementById('ingredients').value;
        const description = document.getElementById('description').value;
        const youtubeLink = document.getElementById('youtube-link').value;
        const thumbnail = document.getElementById('thumbnail').files[0];
        const servings = document.getElementById('servings').value;
        const type = document.querySelector('input[name="type"]:checked').value;

        // Create thumbnail URL or use a default image
        const thumbnailUrl = thumbnail ? URL.createObjectURL(thumbnail) : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLbrFDVFpFny8ur3undAnHk8Zg2VOEVqXoaw&s';

        // Create a new recipe card
        const recipeCard = document.createElement('div');
        recipeCard.classList.add('my-recipe-card');
        recipeCard.innerHTML = `
            <h3>
        <i class="far fa-star favorite" data-favorite="false"></i>
        <span>${recipeName}</span>
    </h3>
            <img src="${thumbnailUrl}" alt="${recipeName}" />
            <p><strong>Ingredients:</strong> ${ingredients}</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>YouTube Link:</strong> ${
    youtubeLink ? `<a href="${youtubeLink}" target="_blank">${youtubeLink}</a>` : 'N/A'
}</p>
            <p><strong>Servings:</strong> ${servings}</p>
            <p><strong>Type:</strong> ${type}</p>
        `;

        // Append the new recipe card to the recipe cards container
        myRecipeCards.appendChild(recipeCard);

        // Show the My Recipes section
        myRecipesSection.style.display = 'block';

        // Use setTimeout to allow the DOM to update before scrolling
        setTimeout(() => {
            recipeCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100); // Adjust the timeout duration if necessary

        // Reset the form
        recipeForm.reset();
        document.querySelector('output').value = 0; // Reset the output for servings
    });
});

// Smooth Scrolling
// Smooth scrolling for navigation links, hero section buttons, and the Get Started button
document.querySelectorAll('nav a[href^="#"], .hero-button a[href^="#"], .get-started-button[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        // Scroll to the target element
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// nav bar fade
const header = document.querySelector('header');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        const scrollTop = window.scrollY || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Scrolling down
            header.classList.remove('visible');
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
            header.classList.add('visible');
        }
        lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    });


// favorite star
document.querySelectorAll('.favorite').forEach(item => {
    item.addEventListener('click', () => {
        const isFavorite = item.getAttribute('data-favorite') === 'true';
        item.setAttribute('data-favorite', !isFavorite);
        item.classList.toggle('fas', !isFavorite);
        item.classList.toggle('far', isFavorite);

        const recipeCard = item.parentNode.parentNode;
        const favoritedRecipesSection = document.querySelector('#favorited-recipes');

        if (favoritedRecipesSection) {
            if (!isFavorite) {
                addRecipeToFavorite(recipeCard, favoritedRecipesSection);
            } else {
                removeRecipeFromFavorite(recipeCard, favoritedRecipesSection);
            }
        }
    });
});

function addRecipeToFavorite(recipeCard, favoritedRecipesSection) {
    const existingRecipeCard = favoritedRecipesSection.querySelector(`[data-recipe-id="${recipeCard.getAttribute('data-recipe-id')}"]`);
    if (!existingRecipeCard) {
        const recipeCardCopy = recipeCard.cloneNode(true);
        const favoriteButtonCopy = recipeCardCopy.querySelector('.favorite');

        favoriteButtonCopy.addEventListener('click', () => {
            const isFavoriteCopy = favoriteButtonCopy.getAttribute('data-favorite') === 'true';
            favoriteButtonCopy.setAttribute('data-favorite', !isFavoriteCopy);
            favoriteButtonCopy.classList.toggle('fas', !isFavoriteCopy);
            favoriteButtonCopy.classList.toggle('far', isFavoriteCopy);

            removeRecipeFromFavorite(recipeCardCopy, favoritedRecipesSection);
        });

        favoriteButtonCopy.setAttribute('data-favorite', 'true');
        favoriteButtonCopy.classList.add('fas');
        favoriteButtonCopy.classList.remove('far');

        favoritedRecipesSection.appendChild(recipeCardCopy);
    }

    const noFavoritesMessage = favoritedRecipesSection.querySelector('.no-favorites-message');
    if (noFavoritesMessage) {
        noFavoritesMessage.remove();
    }

    // Show the favorited recipes section when a recipe is added
    favoritedRecipesSection.style.display = 'block';
}

function removeRecipeFromFavorite(recipeCard, favoritedRecipesSection) {
    const favoritedRecipeCards = favoritedRecipesSection.children;
    for (let i = 0; i < favoritedRecipeCards.length; i++) {
        if (favoritedRecipeCards[i].getAttribute('data-recipe-id') === recipeCard.getAttribute('data-recipe-id')) {
            favoritedRecipesSection.removeChild(favoritedRecipeCards[i]);
            break; // Stop the loop after removing the recipe
        }
    }

    // Check if there are no more favorited recipes
    if (favoritedRecipesSection.children.length === 0) {
        const noFavoritesMessage = favoritedRecipesSection.querySelector('.no-favorites-message');
        if (!noFavoritesMessage) {
            const message = document.createElement('p');
            message.classList.add('no-favorites-message');
            message.textContent = 'Add some of your favorite recipes!';
            favoritedRecipesSection.appendChild(message);
        }
        // Hide the entire favorited recipes section when there are no favorites
        favoritedRecipesSection.style.display = 'none';
    } else {
        const noFavoritesMessage = favoritedRecipesSection.querySelector('.no-favorites-message');
        if (noFavoritesMessage) {
            noFavoritesMessage.remove();
        }
    }
}

// Initially hide the favorited recipes section
document.querySelector('#favorited-recipes').style.display = 'none';



// Sliding Img
const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
let currentIndex = 0;

// Clone the first slide and append it to the end
const firstSlideClone = slides[0].cloneNode(true);
slidesContainer.appendChild(firstSlideClone);

// Update slides collection to include the cloned slide
const allSlides = document.querySelectorAll('.slide');

function showSlide(index) {
    const offset = -index * 100;
    slidesContainer.style.transform = `translateX(${offset}%)`; // Update the transform
}

function next_slide() {
    currentIndex++;

    // If we're at the last slide (the cloned one)
    if (currentIndex === allSlides.length) {
        // Temporarily disable transition for the instant jump
        slidesContainer.style.transition = 'none'; 
        currentIndex = 1; // Move to the first real slide
        slidesContainer.style.transform = `translateX(${-currentIndex * 100}%)`; // Jump to the first slide

        // Allow the browser to render the jump before re-enabling the transition
        setTimeout(() => {
            slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
        }, 20); // Short timeout to allow the jump to take effect
    } else {
        slidesContainer.style.transition = 'transform 0.5s ease-in-out'; // Re-enable transition
    }

    showSlide(currentIndex);
}

// Set interval for the slider
setInterval(next_slide, 2000);


// Newsletter Subscribed
document.addEventListener("DOMContentLoaded", function() {
    const subscribeButton = document.getElementById("subscribe-button");
    const emailInput = document.querySelector(".footer-section.newsletter input[type='email']");
    const newsletterHeading = document.querySelector(".footer-section.newsletter h2");

    subscribeButton.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the form from submitting

        // Reset the input field
        emailInput.value = "";

        // Change the heading text
        newsletterHeading.textContent = "Subscribed";
    });
});

// Search Bar
document.getElementById('recipe-search').addEventListener('input', function() {
    const searchQuery = this.value.toLowerCase();
    const recipeCards = document.querySelectorAll('.recipe-card');
    let hasMatch = false;

    recipeCards.forEach(card => {
        const recipeName = card.querySelector('h3 a').textContent.toLowerCase();
        if (recipeName.includes(searchQuery)) {
            card.style.display = 'block'; // Show matching recipe
            hasMatch = true } else {
            card.style.display = 'none'; // Hide non-matching recipe
        }
    });

    // Show or hide the "No recipes found" message
    document.getElementById('no-recipes-message').style.display = hasMatch ? 'none' : 'block';
});