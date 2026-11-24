import { products } from "../../data/products.js";

export function loadSearch() {
  const searchInput = document.querySelector(".search-input");
  const searchResults = document.querySelector(".search-results");

  searchInput.addEventListener("input", () => {
    const searchText = searchInput.value.trim().toLowerCase();
    searchResults.innerHTML = "";
    if (!searchText) {
      searchResults.classList.remove("active");
      return;
    }
    const matchingProducts = products.filter((product) => {
      return product.name.toLowerCase().includes(searchText);
    });
    if (matchingProducts.length === 0) {
      searchResults.innerHTML = `
      <div class="search-result-item">
        No products found
      </div>
    `;
    } else {
      matchingProducts.forEach((product) => {
        searchResults.innerHTML += `
        <div class="search-result-item">
          ${product.getName()}
        </div>
      `;
      });
    }
    searchResults.classList.add("active");
  });
}
