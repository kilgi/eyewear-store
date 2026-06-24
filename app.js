const BUSINESS_CONTACT_NUMBER = "9779840032840";

// Live Production API Configuration
const SUPABASE_URL = "https://hlctahkdvdfcrhoqfxzo.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_CUazdiJCEdeIEbrDv8Ji7g_XIQ0BeqR";

// Initialize client interface connection
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function initializeStorefront() {
    const targetGrid = document.getElementById('product-grid');
    if (!targetGrid) return;

    targetGrid.innerHTML = "<p class='text-zinc-500 text-sm col-span-full text-center py-12'>Loading latest collection...</p>";

    // Fetch live entries from your database table
    const { data: eyewearCollection, error } = await supabaseClient
        .from('products')
        .select('*');

    if (error) {
        console.error("Error fetching inventory:", error);
        targetGrid.innerHTML = "<p class='text-red-400 text-sm col-span-full text-center py-12'>Failed to connect to database collection.</p>";
        return;
    }

    if (!eyewearCollection || eyewearCollection.length === 0) {
        targetGrid.innerHTML = "<p class='text-zinc-500 text-sm col-span-full text-center py-12'>No items currently in stock.</p>";
        return;
    }

    targetGrid.innerHTML = "";

    eyewearCollection.forEach(item => {
        const cardStructure = `
            <div class="product-card bg-zinc-900 border border-zinc-800/60 rounded-2xl overflow-hidden p-5 flex flex-col justify-between">
                <div>
                    <div class="w-full aspect-square bg-zinc-950 rounded-xl overflow-hidden mb-5">
                        <img src="${item.photoUrl}" alt="${item.title}" class="product-card-img w-full h-full object-cover opacity-90">
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
