const BUSINESS_CONTACT_NUMBER = "9779840032840";

const FIREBASE_DB_URL = "https://eyewear-store-3e2b2-default-rtdb.firebaseio.com/";

async function initializeStorefront() {
    const targetGrid = document.getElementById('product-grid');
    if (!targetGrid) return;

    targetGrid.innerHTML = "<p class='text-zinc-500 text-sm col-span-full text-center py-12'>Loading latest collection...</p>";

    try {
        const response = await fetch(`${FIREBASE_DB_URL}products.json`);
        const data = await response.json();

        if (!data || Object.keys(data).length === 0) {
            targetGrid.innerHTML = "<p class='text-zinc-500 text-sm col-span-full text-center py-12'>No items currently in stock.</p>";
            return;
        }

        targetGrid.innerHTML = "";

        Object.keys(data).forEach(id => {
            const item = data[id];
            const cardStructure = `
                <div class="product-card bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
                    <div>
                        <div class="w-full aspect-square bg-zinc-950 rounded-xl overflow-hidden mb-5">
                            <img src="${item.photourl}" alt="${item.title}" class="product-card-img w-full h-full object-cover opacity-90">
                        </div>
                        <h3 class="text-lg font-bold text-white tracking-tight">${item.title}</h3>
                        <p class="text-xs text-zinc-500 font-semibold mb-3">${item.specification}</p>
                    </div>
                    <div class="mt-4">
                        <div class="flex items-center justify-between mb-4">
                            <span class="text-xs font-bold text-zinc-500 uppercase tracking-wider">Price</span>
                            <span class="text-xl font-black text-white">${item.price}</span>
                        </div>
                        <div class="grid grid-cols-1 gap-2">
                            <button onclick="dispatchSecureOrder('${item.title}', '${item.price}')" class="w-full bg-white text-black py-2.5 rounded-xl text-xs font-bold tracking-wide hover:bg-zinc-200 transition cursor-pointer">
                                Order via WhatsApp
                            </button>
                            <a href="order.html" onclick="saveSelectedProduct('${item.title}')" class="w-full bg-zinc-800 text-zinc-300 py-2.5 rounded-xl text-xs font-bold tracking-wide text-center hover:bg-zinc-700 transition border border-zinc-700/50">
                                Use Backup Form
                            </a>
                        </div>
                    </div>
                </div>
            `;
            targetGrid.innerHTML += cardStructure;
        });
    } catch (err) {
        targetGrid.innerHTML = "<p class='text-red-400 text-sm col-span-full text-center py-12'>Network connection error.</p>";
    }
}

function saveSelectedProduct(productTitle) {
    localStorage.setItem('selectedProductTitle', productTitle);
}

function dispatchSecureOrder(name, price) {
    const checkOutReceipt = `Hello Specs & Shade! I would like to purchase an item:\n\n` +
                            `• Frame model: ${name}\n` +
                            `• Listed Price: ${price}\n\n` +
                            `Please advise on standard delivery terms.`;

    const cleanSafeUrlString = encodeURIComponent(checkOutReceipt);
    const apiTargetUrl = `https://wa.me/${BUSINESS_CONTACT_NUMBER}?text=${cleanSafeUrlString}`;
    window.open(apiTargetUrl, '_blank');
}

document.addEventListener("DOMContentLoaded", initializeStorefront);
