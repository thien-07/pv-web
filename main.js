/*const addBtns = document.querySelectorAll('.btn-primary');

addBtns.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const card = btn.closest('.card');
        const title = card.querySelector('.card-title').textContent;
        const priceText = card.querySelector('.gia').textContent.replace(/\./g,'').replace(' ₫','');
        const price = parseInt(priceText);
        const img = card.querySelector('img').src;

        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existIndex = cart.findIndex(item => item.title === title);
        if(existIndex > -1){
            cart[existIndex].quantity += 1;
        } else {
            cart.push({title, price, img, quantity:1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${title} đã được thêm vào giỏ hàng`);
    });
});*/
