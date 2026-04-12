let cart = JSON.parse(localStorage.getItem("cart")) || [];


function showToast(message) {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toast-message");
    msg.textContent = message;
    toast.style.display = "flex";
    setTimeout(() => toast.style.display = "none", 2800);
}


function updateCartCount() {
    const countEl = document.getElementById("cart-count");
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    countEl.textContent = totalItems;
}


document.querySelectorAll(".btn-add").forEach(btn => {
    btn.addEventListener("click", () => {
        const card = btn.closest(".card-products, .card-best");
        const name = card.querySelector("h3").innerText;
        const priceText = card.querySelector(".price").innerText;
        const image = card.querySelector("img").src;
        const price = parseFloat(priceText.replace("$", ""));

        const product = { id: name, name, price, image, quantity: 1 };

        const existing = cart.find(item => item.id === product.id);
        if (existing) existing.quantity++;
        else cart.push(product);

        localStorage.setItem("cart", JSON.stringify(cart));
        updateCartCount();
        showToast("✅ Produto adicionado ao carrinho!");
    });
});


const hamburger = document.getElementById("hamburger");
const menu = document.getElementById("menu");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
    hamburger.classList.toggle("active");
});


document.getElementById("subscribe-form").addEventListener("submit", e => {
    e.preventDefault();
    showToast("🎉 Bem-vindo à Nexus Community!");
    e.target.reset();
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        if (menu.classList.contains("active")) {
            menu.classList.remove("active");
            hamburger.classList.remove("active");
        }
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

updateCartCount();