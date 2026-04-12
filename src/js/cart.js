let cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");

function showToast(message) {
    const toast = document.getElementById("toast");
    const msg = document.getElementById("toast-message");
    msg.textContent = message;
    toast.style.display = "flex";
    setTimeout(() => toast.style.display = "none", 2800);
}

function renderCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        cartContainer.innerHTML = `<p style="text-align:center; padding:80px 20px; font-size:1.4rem; color:#888;">Seu carrinho está vazio 😢</p>`;
        document.getElementById("total-price").innerHTML = `<strong>$0</strong>`;
        return;
    }

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const div = document.createElement("div");
        div.className = "cart-item";
        div.innerHTML = `
            <div style="display:flex; gap:20px; align-items:center;">
                <img src="${item.image}" alt="${item.name}">
                <div>
                    <h3>${item.name}</h3>
                    <p style="color:var(--principal-teal-neon); font-size:1.4rem;">$${item.price}</p>
                </div>
            </div>
            
            <div style="display:flex; align-items:center; gap:15px;">
                <button class="qty-btn" onclick="changeQuantity(${index}, -1)">–</button>
                <span style="font-size:1.45rem; min-width:35px; text-align:center;">${item.quantity}</span>
                <button class="qty-btn" onclick="changeQuantity(${index}, 1)">+</button>
                <button onclick="removeFromCart(${index})" style="color:#ea00d9; font-size:1.7rem; background:none; border:none;">🗑</button>
            </div>
        `;
        cartContainer.appendChild(div);
    });

    document.getElementById("total-price").innerHTML = `<strong>$${total.toFixed(2)}</strong>`;
}

function changeQuantity(index, change) {
    if (cart[index].quantity + change < 1) return;
    cart[index].quantity += change;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

function finalizePurchase() {
    if (cart.length === 0) return;
    showToast("🎮 Compra finalizada com sucesso! (Simulação)");
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
}

document.getElementById("hamburger-cart").addEventListener("click", () => {
    const menu = document.getElementById("menu-cart");
    menu.classList.toggle("active");
});

renderCart();