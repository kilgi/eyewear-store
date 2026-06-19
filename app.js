const BUSINESS_CONTACT_NUMBER = "9779800000000"; 

const EYEWEAR_COLLECTION = [
    {
        id: "frame_01",
        title: "The Classic Onyx",
        specification: "Gloss Black / Blue-Ray Filter",
        price: "Rs. 2,500",
        photoUrl: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "frame_02",
        title: "The Study Scholar",
        specification: "Clear Acetate / Blue-Ray Filter",
        price: "Rs. 2,300",
        photoUrl: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "frame_03",
        title: "Digital Nomad",
        specification: "Matte Charcoal / Blue-Ray Filter",
        price: "Rs. 2,650",
        photoUrl: "https://images.unsplash.com/photo-1591076482161-42ce6da69f67?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "frame_04",
        title: "The Vintage Tortoise",
        specification: "Amber Frame / Polarized Sun G15",
        price: "Rs. 2,800",
        photoUrl: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "frame_05",
        title: "The Clear Crystal",
        specification: "Transparent / Silver Mirror Sun",
        price: "Rs. 2,400",
        photoUrl: "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "frame_06",
        title: "Midnight Aviator",
        specification: "Dark Metal Edition / UV Sun block",
        price: "Rs. 3,100",
        photoUrl: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=600&q=80"
    }
];

function initializeStorefront() {
    const targetGrid = document.getElementById('product-grid');
    if (!targetGrid) return;

    targetGrid.innerHTML = ""; 

    EYEWEAR_COLLECTION.forEach(item => {
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
                        <a href="order.html" class="w-full bg-zinc-800 text-zinc-300 py-2.5 rounded-xl text-xs font-bold tracking-wide text-center hover:bg-zinc-700 transition border border-zinc-700/50">
                            Use Backup Form
                        </a>
                    </div>
                </div>
            </div>
        `;
        targetGrid.innerHTML += cardStructure;
    });
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