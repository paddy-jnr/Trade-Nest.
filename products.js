
// ========= Shared product data + helpers =========
const CURRENCY = { locale: 'en-NG', code: 'NGN', symbol: '₦' };
function money(n){ return new Intl.NumberFormat(CURRENCY.locale, { style:'currency', currency:CURRENCY.code, maximumFractionDigits:0 }).format(n); }
function discount(p){ return p.oldPrice && p.price ? Math.max(0, Math.round((1 - p.price / p.oldPrice) * 100)) : 0; }
function imgFallback(img){
  if(!img || img.dataset.fallback) return;
  img.dataset.fallback = '1';
  // Soft gradient placeholder with product text (SVG data URI)
  const ph = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
    <defs><linearGradient id='g' x1='0' x2='1'><stop stop-color='#efeaff'/><stop offset='1' stop-color='#f7f4ff'/></linearGradient></defs>
    <rect width='100%' height='100%' fill='url(#g)'/>
    <text x='50%' y='50%' text-anchor='middle' dy='.35em' font-family='Inter,Arial' font-size='28' fill='#6c4ed2'>Image not available</text>
  </svg>`);
  img.src = `data:image/svg+xml;charset=utf-8,${ph}`;
}

const PRODUCTS = [
  // Electronics
  { id:'p1',  name:'Wireless Earbuds Pro ANC', category:'Electronics', price:42000, oldPrice:78000, rating:4.7, reviews:2310,
    image:'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
    gallery:[
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603575449299-b5d26f3f84f1?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1585386959984-a41552231658?q=80&w=1200&auto=format&fit=crop'
    ],
    variants:{ Color:['Black','White','Blue'] }
  },
  { id:'p2',  name:'4K Action Camera Waterproof', category:'Electronics', price:112000, oldPrice:168000, rating:4.5, reviews:825,
    image:'https://images.unsplash.com/photo-1526178612168-4ddc0ae0a2d2?q=80&w=1200&auto=format&fit=crop',
    gallery:[
      'https://images.unsplash.com/photo-1526178612168-4ddc0ae0a2d2?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=1200&auto=format&fit=crop'
    ]},
  { id:'p3',  name:'Bluetooth Speaker Mini Bass', category:'Electronics', price:25500, oldPrice:39900, rating:4.6, reviews:4341,
    image:'https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1200&auto=format&fit=crop' },

  // Fashion
  { id:'p4',  name:'Oversized Hoodie – Unisex', category:'Fashion', price:18500, oldPrice:26000, rating:4.8, reviews:5102,
    image:'https://images.unsplash.com/photo-1503342217505-b0a15cf70489?q=80&w=1200&auto=format&fit=crop',
    variants:{ Size:['S','M','L','XL'], Color:['Black','Gray','Brown'] } },
  { id:'p5',  name:'Chunky Sneakers 2025', category:'Fashion', price:38000, oldPrice:52000, rating:4.4, reviews:1670,
    image:'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
    gallery:[
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop'
    ]},
  { id:'p6',  name:'Athleisure Leggings High Waist', category:'Fashion', price:14500, oldPrice:21000, rating:4.6, reviews:958,
    image:'https://images.unsplash.com/photo-1549068106-b024baf5062d?q=80&w=1200&auto=format&fit=crop',
    variants:{ Size:['XS','S','M','L','XL'] } },

  // Beauty
  { id:'p7', name:'Vitamin C Glow Serum 30ml', category:'Beauty', price:9500, oldPrice:15000, rating:4.5, reviews:3204,
    image:'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop' },
  { id:'p8', name:'Hydrating Face Cream', category:'Beauty', price:12000, oldPrice:18500, rating:4.7, reviews:1402,
    image:'https://images.unsplash.com/photo-1619179459289-21b5b8b7e39f?q=80&w=1200&auto=format&fit=crop' },

  // Home
  { id:'p9',  name:'Aromatherapy Diffuser Wood', category:'Home', price:17500, oldPrice:24900, rating:4.7, reviews:2101,
    image:'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1200&auto=format&fit=crop' },
  { id:'p10', name:'Premium Duvet Set (Queen)', category:'Home', price:64000, oldPrice:98000, rating:4.6, reviews:689,
    image:'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop' },
  { id:'p11', name:'Multipurpose Storage Bins – 3pcs', category:'Home', price:9800, oldPrice:14500, rating:4.3, reviews:1930,
    image:'https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop' },

  // Accessories
  { id:'p12', name:'Minimal Leather Wallet', category:'Accessories', price:13500, oldPrice:21000, rating:4.6, reviews:1120,
    image:'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?q=80&w=1200&auto=format&fit=crop' },
  { id:'p13', name:'Classic Analog Watch', category:'Accessories', price:42000, oldPrice:69000, rating:4.5, reviews:860,
    image:'https://images.unsplash.com/photo-1511379938547-c1f69419868d?q=80&w=1200&auto=format&fit=crop' },
  { id:'p14', name:'UV400 Polarized Sunglasses', category:'Accessories', price:9800, oldPrice:16500, rating:4.4, reviews:2504,
    image:'https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=1200&auto=format&fit=crop' },

  // Sports
  { id:'p15', name:'Smart Fitness Band', category:'Sports', price:26500, oldPrice:42000, rating:4.5, reviews:3210,
    image:'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=1200&auto=format&fit=crop' },
  { id:'p16', name:'Adjustable Dumbbells 20kg', category:'Sports', price:88000, oldPrice:126000, rating:4.6, reviews:540,
    image:'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?q=80&w=1200&auto=format&fit=crop' },

  // Kids
  { id:'p17', name:'STEM Coding Robot Kit', category:'Kids', price:38500, oldPrice:52000, rating:4.7, reviews:770,
    image:'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop' },
  { id:'p18', name:'Creative Building Blocks 600pcs', category:'Kids', price:21500, oldPrice:34000, rating:4.8, reviews:4901,
    image:'https://images.unsplash.com/photo-1587654780291-39c9404d746b?q=80&w=1200&auto=format&fit=crop' },

  // Auto
  { id:'p19', name:'Cordless Portable Tire Inflator', category:'Auto', price:29500, oldPrice:45000, rating:4.4, reviews:1209,
    image:'https://images.unsplash.com/photo-1592853625600-0b99e2b8d7c5?q=80&w=1200&auto=format&fit=crop' },
  { id:'p20', name:'Car Vacuum Cleaner High Power', category:'Auto', price:18500, oldPrice:26000, rating:4.3, reviews:900,
    image:'https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop' },

  // Gadgets
  { id:'p21', name:'MagSafe Power Bank 10000mAh', category:'Gadgets', price:35500, oldPrice:52000, rating:4.6, reviews:2110,
    image:'https://images.unsplash.com/photo-1591797442444-039f23ddcc14?q=80&w=1200&auto=format&fit=crop' },
  { id:'p22', name:'RGB Light Bar – Pair', category:'Gadgets', price:22500, oldPrice:31500, rating:4.5, reviews:1330,
    image:'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?q=80&w=1200&auto=format&fit=crop' },
  { id:'p23', name:'Foldable Phone Stand Pro', category:'Gadgets', price:7500, oldPrice:11000, rating:4.4, reviews:5200,
    image:'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1200&auto=format&fit=crop' },
  { id:'p24', name:'USB-C Hub 7-in-1', category:'Gadgets', price:21000, oldPrice:33000, rating:4.7, reviews:1840,
    image:'https://images.unsplash.com/photo-1617772730020-6f54b8f0f5e8?q=80&w=1200&auto=format&fit=crop' }
];

// ======= Lookups
function byId(id){ return PRODUCTS.find(p=>String(p.id)===String(id)); }

// ======= Cart (localStorage)
const CART_KEY = 'tn_cart_v2';
function getCart(){ try{ return JSON.parse(localStorage.getItem(CART_KEY)||'[]'); } catch{ return []; } }
function saveCart(list){ localStorage.setItem(CART_KEY, JSON.stringify(list)); }
function sameVariant(a,b){ const j = JSON.stringify; return j(a?.chosen||{})===j(b?.chosen||{}); }
function addToCart(id, qty=1, chosen={}){
  const list = getCart();
  const idx = list.findIndex(x=>x.id===id && sameVariant(x,{chosen}));
  if(idx>-1){ list[idx].qty = Math.min(99, (list[idx].qty||0) + qty); }
  else list.push({ id, qty, chosen });
  saveCart(list);
}
function setQty(id, qty, chosen={}){
  const list = getCart();
  const idx = list.findIndex(x=>x.id===id && sameVariant(x,{chosen}));
  if(idx>-1){ list[idx].qty = Math.max(1, Math.min(99, qty)); saveCart(list); }
}
function removeFromCart(id, chosen={}){
  let list = getCart(); list = list.filter(x=> !(x.id===id && sameVariant(x,{chosen}))); saveCart(list);
}
function clearCart(){ saveCart([]); }
function cartItemCount(){ return getCart().reduce((a,b)=>a+(b.qty||0),0); }
function cartSubtotal(){ return getCart().reduce((sum,line)=>{ const p = byId(line.id); return sum + (p?p.price:0)*(line.qty||0); },0); }

function refreshHeaderCount(){
  const el = document.querySelector('[data-cart-count]');
  if(el) el.textContent = cartItemCount();
}

// ======= Search / Filter helpers
function searchProducts({q='', cat='All', sort='trending'}={}){
  const norm = s => (s||'').toLowerCase();
  let list = PRODUCTS.filter(p=>{
    const hit = !q || norm(p.name).includes(norm(q)) || norm(p.category).includes(norm(q));
    const inCat = (cat==='All') || p.category===cat;
    return hit && inCat;
  });
  if(sort==='price-asc') list.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc') list.sort((a,b)=>b.price-a.price);
  if(sort==='rating') list.sort((a,b)=>b.rating-a.rating);
  // trending: discount then rating then reviews
  if(sort==='trending') list.sort((a,b)=>(discount(b)-discount(a)) || (b.rating-a.rating) || (b.reviews-a.reviews));
  return list;
}


