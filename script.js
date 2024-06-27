document.addEventListener('DOMContentLoaded', () => {
   

    const cartItems = document.getElementById('cart-items');
    const totalAmount = document.getElementById('total-amount');
    let cart = [];
    let total = 0;

    window.addItem = (service, price) => {
        cart.push({service, price});
        updateCart();
    };

    window.removeItem = (service, price) => {
        const index = cart.findIndex(item => item.service === service && item.price === price);
        if (index !== -1) {
            cart.splice(index, 1);
            updateCart();
        }
    };

    const updateCart = () => {
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const div = document.createElement('div');
            div.textContent = `${item.service} - Rs ${item.price}`;
            cartItems.appendChild(div);
        });
        total = cart.reduce((sum, item) => sum + item.price, 0);
        totalAmount.textContent = total;
    };

    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(bookingForm);
        const name = formData.get('full-name');
        const email = formData.get('email');
        const phone = formData.get('phone');

        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
            to_name: name,
            from_name: 'Laundry Wallah / Laundry Mart',
            message: `Thank you for booking with us. We will contact you soon at ${phone}.`,
            user_email: email
        })
        .then(() => {
            document.getElementById('booking-message').textContent = 'Thank you For Booking the Service We will get back to you soon!';
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
        });

        cart = [];
        updateCart();
        totalAmount.textContent = '0';
    });

    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Implement newsletter subscription logic here.
    });
})
function loaderAnimation() {
    var loader = document.querySelector("#loader")
    setTimeout(function () {
        loader.style.top = "-100%"
    }, 4200)
}

loaderAnimation()