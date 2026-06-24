const BUSINESS_CONTACT_NUMBER = "9779840032840";
const FIREBASE_DB_URL = "https://eyewear-store-4ec1e-default-rtdb.firebaseio.com/";

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
                            <img src="${item.photourl}" alt="${item.title}" class="product-card-img w-full h-full object-cover">
                        </div>
                        <h3 class="text-lg font-black text-white uppercase tracking-tight">${item.title}</h3>
                        <p class="text-zinc-500 text-xs font-semibold mt-1 uppercase tracking-wider">${item.specification}</p>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-zinc-800/50">
                        <div class="flex items-baseline justify-between mb-4">
                            <span class="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">Price</span>
                            <span class="text-xl font-black text-white">${item.price}</span>
                        </div>
                        <div class="grid grid-cols-1 gap-2">
                            <button onclick="dispatchSecureOrder('${item.title}', '${item.price}')" class="w-full bg-white text-black py-2.5 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-zinc-200 transition cursor-pointer">
                                Order via WhatsApp
                            </button>
                            <a href="order.html?product=${encodeURIComponent(item.title)}" class="backup-btn w-full bg-zinc-800 text-zinc-300 py-2.5 rounded-xl text-xs font-bold tracking-wide text-center hover:bg-zinc-700 transition border border-zinc-700/50 duration-300">
                                Use Backup Form
                            </a>
                        </div>
                    </div>
                </div>
            `;
            targetGrid.innerHTML += cardStructure;
        });

        applyBackupHighlighting();

    } catch (err) {
        targetGrid.innerHTML = "<p class='text-red-400 text-sm col-span-full text-center py-12'>Network connection error.</p>";
    }
}

function applyBackupHighlighting() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('action') === 'backup') {
        const backupButtons = document.querySelectorAll('.backup-btn');
        backupButtons.forEach(btn => {
            btn.classList.remove('bg-zinc-800', 'text-zinc-300', 'border-zinc-700/50');
            btn.classList.add('bg-amber-500', 'text-black', 'border-amber-400', 'font-black', 'animate-pulse');
        });
    }
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
