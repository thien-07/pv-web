/*
// Lấy dữ liệu từ localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const userId = parseInt(localStorage.getItem('userId')); // lấy userId từ localStorage

const cartItemsDiv = document.getElementById('cart-items');
const totalPriceEl = document.getElementById('total-price');

// Render giỏ hàng
function renderCart() {
    cartItemsDiv.innerHTML = '';

    let total = 0;

    cart.forEach((item, index) => {
        total += item.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');

        cartItem.innerHTML = `
            <img src="${item.img}" alt="${item.title}">
            <div class="cart-item-details">
                <div class="cart-item-title">${item.title}</div>
                <div class="cart-item-price">${item.price.toLocaleString()} ₫</div>
                <input type="number" class="cart-item-quantity" value="${item.quantity}" min="1" data-index="${index}">
            </div>
            <button class="remove-btn" data-index="${index}">Xóa</button>
        `;

        cartItemsDiv.appendChild(cartItem);
    });

    totalPriceEl.textContent = `Tổng cộng: ${total.toLocaleString()} ₫`;

    // Xóa sản phẩm
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });

    // Thay đổi số lượng
    document.querySelectorAll('.cart-item-quantity').forEach(input => {
        input.addEventListener('change', (e) => {
            const index = e.target.dataset.index;
            let value = parseInt(e.target.value);
            if (value < 1) value = 1;
            e.target.value = value;
            cart[index].quantity = value;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        });
    });
}

// Thanh toán
async function checkout() {
    if (!userId) {
        alert('Vui lòng đăng nhập trước khi thanh toán');
        return;
    }
    if (cart.length === 0) {
        alert('Giỏ hàng trống');
        return;
    }

    try {
        const res = await fetch('/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart, userId })
        });

        if (res.ok) {
            alert(await res.text());
            cart = []; // Xóa giỏ hàng local
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCart();
        } else {
            const err = await res.text();
            alert('Lỗi thanh toán: ' + err);
        }
    } catch (error) {
        console.error(error);
        alert('Lỗi kết nối server');
    }
}

// Render lần đầu
renderCart();

// Thêm nút thanh toán
const checkoutBtn = document.createElement('button');
checkoutBtn.textContent = 'Thanh toán';
checkoutBtn.classList.add('btn', 'btn-success', 'mt-3');
checkoutBtn.addEventListener('click', checkout);
cartItemsDiv.parentNode.appendChild(checkoutBtn);
*/
