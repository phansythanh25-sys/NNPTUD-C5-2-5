const API_BASE_URL = 'https://api.escuelajs.co/api/v1';
let allProducts = [];
let filteredProducts = [];
let currentPage = 1;
let itemsPerPage = 10;
let sortField = null;
let sortOrder = 'asc';
let currentDetailProduct = null;

// Hardcoded products data
const PRODUCTS_DATA = [{"id":131,"title":"Modern Ergonomic Office Chair","slug":"modern-ergonomic-office-chair","price":71,"description":"Elevate your office space with this sleek and comfortable Modern Ergonomic Office Chair. Designed to provide optimal support throughout the workday, it features an adjustable height mechanism, smooth-rolling casters for easy mobility, and a cushioned seat for extended comfort. The clean lines and minimalist white design make it a versatile addition to any contemporary workspace.","category":{"id":3,"name":"Furniture","slug":"furniture","image":"https://i.imgur.com/Qphac99.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/3dU0m72.jpeg","https://i.imgur.com/zPU3EVa.jpeg"],"creationAt":"2026-02-05T04:38:51.000Z","updatedAt":"2026-02-05T04:38:51.000Z"},{"id":132,"title":"Chic Summer Denim Espadrille Sandals","slug":"chic-summer-denim-espadrille-sandals","price":33,"description":"Step into summer with style in our denim espadrille sandals. Featuring a braided jute sole for a classic touch and adjustable denim straps for a snug fit, these sandals offer both comfort and a fashionable edge. The easy slip-on design ensures convenience for beach days or casual outings.","category":{"id":4,"name":"Shoes","slug":"shoes","image":"https://i.imgur.com/qNOjJje.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/9qrmE1b.jpeg","https://i.imgur.com/wqKxBVH.jpeg","https://i.imgur.com/sWSV6DK.jpeg"],"creationAt":"2026-02-05T04:38:51.000Z","updatedAt":"2026-02-05T04:38:51.000Z"},{"id":133,"title":"Futuristic Holographic Soccer Cleats","slug":"futuristic-holographic-soccer-cleats","price":39,"description":"Step onto the field and stand out from the crowd with these eye-catching holographic soccer cleats. Designed for the modern player, these cleats feature a sleek silhouette, lightweight construction for maximum agility, and durable studs for optimal traction. The shimmering holographic finish reflects a rainbow of colors as you move, ensuring that you'll be noticed for both your skills and style. Perfect for the fashion-forward athlete who wants to make a statement.","category":{"id":4,"name":"Shoes","slug":"shoes","image":"https://i.imgur.com/qNOjJje.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/qNOjJje.jpeg","https://i.imgur.com/NjfCFnu.jpeg","https://i.imgur.com/eYtvXS1.jpeg"],"creationAt":"2026-02-05T04:38:52.000Z","updatedAt":"2026-02-05T04:38:52.000Z"},{"id":135,"title":"Nh pel Final Project","slug":"nh-pel-final-project","price":1000,"description":"Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus corporis, dolores unde in porro nostrum. Obcaecati cum aliquam sequi tempora aliquid dicta eos beatae inventore maxime laboriosam, deserunt qui possimus!","category":{"id":3,"name":"Furniture","slug":"furniture","image":"https://i.imgur.com/Qphac99.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.pinimg.com/736x/95/b4/f2/95b4f22431db8a2a4b93d86486fdb8fc.jpg"],"creationAt":"2026-02-05T04:38:52.000Z","updatedAt":"2026-02-05T05:32:20.000Z"},{"id":136,"title":"Rainbow Glitter High Heels","slug":"rainbow-glitter-high-heels","price":39,"description":"Step into the spotlight with these eye-catching rainbow glitter high heels. Designed to dazzle, each shoe boasts a kaleidoscope of shimmering colors that catch and reflect light with every step. Perfect for special occasions or a night out, these stunners are sure to turn heads and elevate any ensemble.","category":{"id":4,"name":"Shoes","slug":"shoes","image":"https://i.imgur.com/qNOjJje.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/62gGzeF.jpeg","https://i.imgur.com/5MoPuFM.jpeg","https://i.imgur.com/sUVj7pK.jpeg"],"creationAt":"2026-02-05T04:38:52.000Z","updatedAt":"2026-02-05T04:38:52.000Z"},{"id":138,"title":"Modern Minimalist Workstation Setup","slug":"modern-minimalist-workstation-setup","price":49,"description":"Elevate your home office with our Modern Minimalist Workstation Setup, featuring a sleek wooden desk topped with an elegant computer, stylish adjustable wooden desk lamp, and complimentary accessories for a clean, productive workspace. This setup is perfect for professionals seeking a contemporary look that combines functionality with design.","category":{"id":3,"name":"Furniture","slug":"furniture","image":"https://i.imgur.com/Qphac99.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/3oXNBst.jpeg","https://i.imgur.com/ErYYZnT.jpeg","https://i.imgur.com/boBPwYW.jpeg"],"creationAt":"2026-02-05T04:38:52.000Z","updatedAt":"2026-02-05T04:38:52.000Z"},{"id":139,"title":"Sleek Futuristic Electric Bicycle","slug":"sleek-futuristic-electric-bicycle","price":22,"description":"This modern electric bicycle combines style and efficiency with its unique design and top-notch performance features. Equipped with a durable frame, enhanced battery life, and integrated tech capabilities, it's perfect for the eco-conscious commuter looking to navigate the city with ease.","category":{"id":5,"name":"Miscellaneous","slug":"miscellaneous","image":"https://i.imgur.com/BG8J0Fj.jpg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/BG8J0Fj.jpg","https://i.imgur.com/ujHBpCX.jpg","https://i.imgur.com/WHeVL9H.jpg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":140,"title":"Trendy Pink-Tinted Sunglasses","slug":"trendy-pink-tinted-sunglasses","price":38,"description":"Step up your style game with these fashionable black-framed, pink-tinted sunglasses. Perfect for making a statement while protecting your eyes from the glare. Their bold color and contemporary design make these shades a must-have accessory for any trendsetter looking to add a pop of color to their ensemble.","category":{"id":5,"name":"Miscellaneous","slug":"miscellaneous","image":"https://i.imgur.com/BG8J0Fj.jpg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/0qQBkxX.jpg","https://i.imgur.com/I5g1DoE.jpg","https://i.imgur.com/myfFQBW.jpg"],"creationAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":141,"title":"Chic Transparent Fashion Handbag","slug":"chic-transparent-fashion-handbag","price":61,"description":"Elevate your style with our Chic Transparent Fashion Handbag, perfect for showcasing your essentials with a clear, modern edge. This trendy accessory features durable acrylic construction, luxe gold-tone hardware, and an elegant chain strap. Its compact size ensures you can carry your day-to-day items with ease and sophistication.","category":{"id":5,"name":"Miscellaneous","slug":"miscellaneous","image":"https://i.imgur.com/BG8J0Fj.jpg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/Lqaqz59.jpg","https://i.imgur.com/uSqWK0m.jpg","https://i.imgur.com/atWACf1.jpg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":142,"title":"Elegant Glass Tumbler Set","slug":"elegant-glass-tumbler-set","price":50,"description":"Enhance your drinkware collection with our sophisticated set of glass tumblers, perfect for serving your favorite beverages. This versatile set includes both clear and subtly tinted glasses, lending a modern touch to any table setting. Crafted with quality materials, these durable tumblers are designed to withstand daily use while maintaining their elegant appeal.","category":{"id":5,"name":"Miscellaneous","slug":"miscellaneous","image":"https://i.imgur.com/BG8J0Fj.jpg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/TF0pXdL.jpg","https://i.imgur.com/BLDByXP.jpg","https://i.imgur.com/b7trwCv.jpg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":143,"title":"Classic Blue Suede Casual Shoes","slug":"classic-blue-suede-casual-shoes","price":39,"description":"Step into comfort with our Classic Blue Suede Casual Shoes, perfect for everyday wear. These shoes feature a stylish blue suede upper, durable rubber soles for superior traction, and classic lace-up fronts for a snug fit. The sleek design pairs well with both jeans and chinos, making them a versatile addition to any wardrobe.","category":{"id":4,"name":"Shoes","slug":"shoes","image":"https://i.imgur.com/qNOjJje.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/sC0ztOB.jpeg","https://i.imgur.com/Jf9DL9R.jpeg","https://i.imgur.com/R1IN95T.jpeg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":144,"title":"Elegant Purple Leather Loafers","slug":"elegant-purple-leather-loafers","price":17,"description":"Step into sophistication with our Elegant Purple Leather Loafers, perfect for making a bold statement. Crafted from high-quality leather with a vibrant purple finish, these shoes feature a classic loafer silhouette that's been updated with a contemporary twist. The comfortable slip-on design and durable soles ensure both style and functionality for the modern man.","category":{"id":4,"name":"Shoes","slug":"shoes","image":"https://i.imgur.com/qNOjJje.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/Au8J9sX.jpeg","https://i.imgur.com/gdr8BW2.jpeg","https://i.imgur.com/KDCZxnJ.jpeg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":145,"title":"Sleek Olive Green Hardshell Carry-On Luggage","slug":"sleek-olive-green-hardshell-carry-on-luggage","price":48,"description":"Travel in style with our durable hardshell carry-on, perfect for weekend getaways and business trips. This sleek olive green suitcase features smooth gliding wheels for easy airport navigation, a sturdy telescopic handle, and a secure zippered compartment to keep your belongings safe. Its compact size meets most airline overhead bin requirements, ensuring a hassle-free flying experience.","category":{"id":5,"name":"Miscellaneous","slug":"miscellaneous","image":"https://i.imgur.com/BG8J0Fj.jpg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/jVfoZnP.jpg","https://i.imgur.com/Tnl15XK.jpg","https://i.imgur.com/7OqTPO6.jpg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":146,"title":"Sleek All-Terrain Go-Kart","slug":"sleek-all-terrain-go-kart","price":37,"description":"Experience the thrill of outdoor adventures with our Sleek All-Terrain Go-Kart, featuring a durable frame, comfortable racing seat, and robust, large-tread tires perfect for handling a variety of terrains. Designed for fun-seekers of all ages, this go-kart is an ideal choice for backyard racing or exploring local trails.","category":{"id":5,"name":"Miscellaneous","slug":"miscellaneous","image":"https://i.imgur.com/BG8J0Fj.jpg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/Ex5x3IU.jpg","https://i.imgur.com/z7wAQwe.jpg","https://i.imgur.com/kc0Dj9S.jpg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":147,"title":"Elegant Patent Leather Peep-Toe Pumps with Gold-Tone Heel","slug":"elegant-patent-leather-peep-toe-pumps-with-gold-tone-heel","price":53,"description":"Step into sophistication with these chic peep-toe pumps, showcasing a lustrous patent leather finish and an eye-catching gold-tone block heel. The ornate buckle detail adds a touch of glamour, perfect for elevating your evening attire or complementing a polished daytime look.","category":{"id":4,"name":"Shoes","slug":"shoes","image":"https://i.imgur.com/qNOjJje.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://i.imgur.com/AzAY4Ed.jpeg","https://i.imgur.com/umfnS9P.jpeg","https://i.imgur.com/uFyuvLg.jpeg"],"createdAt":"2026-02-05T04:38:53.000Z","updatedAt":"2026-02-05T04:38:53.000Z"},{"id":149,"title":"Default Sneakers","slug":"default-sneakers","price":55,"description":"Default product seed: comfy sneakers","category":{"id":4,"name":"Shoes","slug":"shoes","image":"https://i.imgur.com/qNOjJje.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://placehold.co/600x400"],"createdAt":"2026-02-05T04:38:54.000Z","updatedAt":"2026-02-05T04:38:54.000Z"},{"id":150,"title":"Default T-Shirt","slug":"default-t-shirt","price":12,"description":"Default product seed: simple t-shirt","category":{"id":1,"name":"Clothes","slug":"clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://placehold.co/600x400"],"createdAt":"2026-02-05T04:38:54.000Z","updatedAt":"2026-02-05T04:38:54.000Z"},{"id":151,"title":"cat","slug":"cat","price":10,"description":"cat","category":{"id":1,"name":"Clothes","slug":"clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","creationAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://placehold.co/600x400"],"createdAt":"2026-02-05T04:38:54.000Z","updatedAt":"2026-02-05T04:38:54.000Z"},{"id":152,"title":"Aeroplane","slug":"aeroplane","price":9999,"description":"fly high","category":{"id":2,"name":"Electronics","slug":"electronics","image":"https://i.imgur.com/ZANVnHE.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://imgs.search.brave.com/twjbVEUhvs9Y42W46quICWlum2wm1wQwtGCVfQHfcuk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjAv/NjQ2LzU5Ny9zbWFs/bC93aXRoLWEtdG95/LWNhci1jb25jZXB0/LXdpdGgtYS1ibHVy/cnktYmFja2dyb3Vu/ZC1hbmQtbG90cy1v/Zi1lbXB0eS1zcGFj/ZS1waG90by5qcGVn"],"createdAt":"2026-02-05T05:25:28.000Z","updatedAt":"2026-02-05T05:25:28.000Z"},{"id":153,"title":"train","slug":"train","price":90,"description":"toy train","category":{"id":2,"name":"Electronics","slug":"electronics","image":"https://i.imgur.com/ZANVnHE.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://imgs.search.brave.com/rblo1vYvq1OY_C9o9UrtXze5cutboFHalIWUFc7a2OI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wNzUv/NDI2LzAyNC9zbWFs/bC9hLXRveS10cmFp/bi1pcy1vbi1hLXdv/b2Rlbi10cmFjay1w/aG90by5qcGVn"],"createdAt":"2026-02-05T05:29:39.000Z","updatedAt":"2026-02-05T05:29:39.000Z"},{"id":154,"title":"headphone","slug":"headphone","price":9999,"description":"suno gana","category":{"id":3,"name":"Furniture","slug":"furniture","image":"https://i.imgur.com/Qphac99.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://imgs.search.brave.com/wZQkF8VAe7HVlZUZy-QrFc_b-zsPFX3AMw-QnTZYv5w/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvODE1/NDk0L3BpeGVscy1w/aG90by04MTU0OTQu/anBlZz9hdXRvPWNv/bXByZXNzJmNzPXRp/bnlzcmdiJmRwcj0x/Jnc9NTAw"],"createdAt":"2026-02-05T05:31:34.000Z","updatedAt":"2026-02-05T05:31:34.000Z"},{"id":155,"title":"samsung","slug":"samsung","price":10000,"description":"best phone","category":{"id":2,"name":"Electronics","slug":"electronics","image":"https://i.imgur.com/ZANVnHE.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["demo.png"],"createdAt":"2026-02-05T05:33:43.000Z","updatedAt":"2026-02-05T05:33:43.000Z"},{"id":156,"title":"Eraser","slug":"eraser","price":200,"description":"Electric eraser","category":{"id":1,"name":"Clothes","slug":"clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://imgs.search.brave.com/OHr966Ijxeg4GftdXryiz7bQs46h1bIGGNgRnkx79zg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL0kv/NzFDUURxMEpQVEwu/anBn"],"createdAt":"2026-02-05T05:35:59.000Z","updatedAt":"2026-02-05T05:35:59.000Z"},{"id":157,"title":"Shirt","slug":"shirt","price":888,"description":"best","category":{"id":2,"name":"Electronics","slug":"electronics","image":"https://i.imgur.com/ZANVnHE.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://imgs.search.brave.com/bxtIUJ57lB3h5wKmGM5wEGu0oVpNzr8AvOayXrMe8d0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9kMXBk/emNubTZ4Z3hsei5j/bG91ZGZyb250Lm5l/dC90b3BzLzg5MDU4/NzUzODQ0MTAtMTgu/anBn"],"createdAt":"2026-02-05T05:42:00.000Z","updatedAt":"2026-02-05T05:42:00.000Z"},{"id":158,"title":"Pencil ","slug":"pencil","price":22,"description":"Dark","category":{"id":1,"name":"Clothes","slug":"clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://t3.ftcdn.net/jpg/03/17/12/64/360_F_317126401_u5gIg9EYJdwkMPJYq4bZCxpFuZ37wuHh.jpg"],"createdAt":"2026-02-05T05:53:26.000Z","updatedAt":"2026-02-05T05:53:26.000Z"},{"id":159,"title":"jacker","slug":"jacker","price":222,"description":"warm","category":{"id":3,"name":"Furniture","slug":"furniture","image":"https://i.imgur.com/Qphac99.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://imgs.search.brave.com/WfKWJO-aBjmxkiC9aNszVfhLu43Kd2YIQ7VtA2biUjA/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/c2VsZWN0ZWRob21t/ZS5pbi9jZG4vc2hv/cC9maWxlcy8xMjcw/NTk1MDNfZzQuanBn/P3Y9MTc0NTUwMTk5/NCZ3aWR0aD0xMDgw"],"createdAt":"2026-02-05T05:57:04.000Z","updatedAt":"2026-02-05T05:57:04.000Z"},{"id":161,"title":"car","slug":"car","price":555,"description":"hoho hui hui","category":{"id":2,"name":"Electronics","slug":"electronics","image":"https://i.imgur.com/ZANVnHE.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://imgs.search.brave.com/w8x6IlGSHuEmFRIj0mH_w3Iiz8odiIJKQ_AzVrH3IKk/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVrenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMDcv/NzczLzMxOC9zbWFs/bC9mcm9udC12aWV3/LW9mLWx1eHVyeS1i/bHVlLWNvbXBhY3Qt/c3V2LWNhci13aXRo/LXNwb3J0LWFuZC1t/b2Rlcm4tZGVzaWdu/LXBhcmtlZC1vbi1h/c3BoYWx0LXJvYWQt/YXQtc3Vuc2V0LWh5/YnJpZC1hdXRvLWFu/ZC1hdXRvbW90aXZl/LWNvbmNlcHQtcm9h/ZC10cmlwLWFuZC1j/YXItZHJpdmluZy1m/b3ItdHJhdmVsLWZy/ZWUtcGhvdG8uanBn"],"createdAt":"2026-02-05T06:02:29.000Z","updatedAt":"2026-02-05T06:02:29.000Z"},{"id":162,"title":"Davin ft Kanchana","slug":"davin-ft-kanchana","price":2,"description":"loover 4 ever","category":{"id":3,"name":"Furniture","slug":"furniture","image":"https://i.imgur.com/Qphac99.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://api.escuelajs.co/api/v1/files/9164.png"],"createdAt":"2026-02-05T06:03:53.000Z","updatedAt":"2026-02-05T06:03:53.000Z"},{"id":163,"title":"New Product","slug":"new-product","price":10,"description":"2","category":{"id":1,"name":"Clothes","slug":"clothes","image":"https://i.imgur.com/QkIa5tT.jpeg","createdAt":"2026-02-04T21:36:31.000Z","updatedAt":"2026-02-04T21:36:31.000Z"},"images":["https://placeimg.com/640/480/any"],"createdAt":"2026-02-05T06:04:19.000Z","updatedAt":"2026-02-05T06:04:19.000Z"}];

// DOM Elements
const searchInput = document.getElementById('searchInput');
const itemsPerPageSelect = document.getElementById('itemsPerPageSelect');
const sortTitleBtn = document.getElementById('sortTitleBtn');
const sortPriceBtn = document.getElementById('sortPriceBtn');
const exportBtn = document.getElementById('exportBtn');
const createProductBtn = document.getElementById('createProductBtn');
const saveEditBtn = document.getElementById('saveEditBtn');
const loadingState = document.getElementById('loadingState');
const tableContainer = document.getElementById('tableContainer');
const paginationContainer = document.getElementById('paginationContainer');
const productsTableBody = document.getElementById('productsTableBody');
const paginationNav = document.getElementById('paginationNav');
const detailModal = new bootstrap.Modal(document.getElementById('detailModal'));
const editModal = new bootstrap.Modal(document.getElementById('editProductModal'));
const createModal = new bootstrap.Modal(document.getElementById('createProductModal'));

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupEventListeners();
});

function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    itemsPerPageSelect.addEventListener('change', handleItemsPerPageChange);
    sortTitleBtn.addEventListener('click', () => handleSort('title'));
    sortPriceBtn.addEventListener('click', () => handleSort('price'));
    exportBtn.addEventListener('click', handleExportCSV);
    createProductBtn.addEventListener('click', handleCreateProduct);
    saveEditBtn.addEventListener('click', handleSaveEdit);
}

function loadProducts() {
    showLoading(true);
    // Use hardcoded data instead of API
    allProducts = JSON.parse(JSON.stringify(PRODUCTS_DATA));
    filteredProducts = [...allProducts];
    currentPage = 1;
    renderTable();
    renderPagination();
    showLoading(false);
}

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm)
    );
    currentPage = 1;
    renderTable();
    renderPagination();
}

function handleSort(field) {
    if (sortField === field) {
        sortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
        sortField = field;
        sortOrder = 'asc';
    }

    filteredProducts.sort((a, b) => {
        let aValue = a[field];
        let bValue = b[field];

        if (field === 'price') {
            aValue = parseFloat(aValue);
            bValue = parseFloat(bValue);
        } else {
            aValue = String(aValue).toLowerCase();
            bValue = String(bValue).toLowerCase();
        }

        if (sortOrder === 'asc') {
            return aValue > bValue ? 1 : -1;
        } else {
            return aValue < bValue ? 1 : -1;
        }
    });

    currentPage = 1;
    renderTable();
    renderPagination();
    updateSortButtons();
}

function updateSortButtons() {
    sortTitleBtn.classList.remove('active');
    sortPriceBtn.classList.remove('active');

    if (sortField === 'title') {
        sortTitleBtn.classList.add('active');
        sortTitleBtn.innerHTML = sortOrder === 'asc' 
            ? '<i class="bi bi-sort-alpha-down"></i>' 
            : '<i class="bi bi-sort-alpha-up"></i>';
    } else if (sortField === 'price') {
        sortPriceBtn.classList.add('active');
        sortPriceBtn.innerHTML = sortOrder === 'asc' 
            ? '<i class="bi bi-sort-numeric-down"></i>' 
            : '<i class="bi bi-sort-numeric-up"></i>';
    }
}

function handleItemsPerPageChange(e) {
    itemsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderTable();
    renderPagination();
}

function renderTable() {
    productsTableBody.innerHTML = '';

    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const pageProducts = filteredProducts.slice(startIdx, endIdx);

    if (pageProducts.length === 0) {
        productsTableBody.innerHTML = '<tr><td colspan="6" class="text-center text-muted py-4">No products found</td></tr>';
        tableContainer.style.display = 'block';
        return;
    }

    pageProducts.forEach(product => {
        const row = document.createElement('tr');
        row.className = 'product-row';
        row.style.cursor = 'pointer';

        const categoryName = product.category?.name || 'N/A';
        const categoryBadgeColor = getCategoryColor(product.category?.name);
        const imageUrl = product.images && product.images.length > 0 
            ? product.images[0] 
            : 'https://via.placeholder.com/50';

        row.innerHTML = `
            <td class="align-middle">${product.id}</td>
            <td class="align-middle">
                <img src="${imageUrl}" alt="${product.title}" class="product-image" onerror="this.src='https://via.placeholder.com/50'">
            </td>
            <td class="align-middle">
                <div>${product.title}</div>
                <div class="description-preview">${product.description || 'No description'}</div>
            </td>
            <td class="align-middle">$${product.price}</td>
            <td class="align-middle">
                <span class="badge ${categoryBadgeColor} badge-category">${categoryName}</span>
            </td>
            <td class="align-middle">
                <button class="btn btn-sm btn-primary" onclick="viewProductDetail(${product.id})">
                    <i class="bi bi-eye"></i> View
                </button>
            </td>
        `;

        row.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            viewProductDetail(product.id);
        });

        productsTableBody.appendChild(row);
    });

    tableContainer.style.display = 'block';
    updateShowingRange();
}

function renderPagination() {
    paginationNav.innerHTML = '';
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    // Previous button
    const prevLi = document.createElement('li');
    prevLi.className = `page-item ${currentPage === 1 ? 'disabled' : ''}`;
    prevLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage - 1}); return false;">Previous</a>`;
    paginationNav.appendChild(prevLi);

    // Page numbers
    const maxPages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPages / 2));
    let endPage = Math.min(totalPages, startPage + maxPages - 1);
    
    if (endPage - startPage < maxPages - 1) {
        startPage = Math.max(1, endPage - maxPages + 1);
    }

    if (startPage > 1) {
        const firstLi = document.createElement('li');
        firstLi.className = 'page-item';
        firstLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(1); return false;">1</a>`;
        paginationNav.appendChild(firstLi);

        if (startPage > 2) {
            const dots = document.createElement('li');
            dots.className = 'page-item disabled';
            dots.innerHTML = `<span class="page-link">...</span>`;
            paginationNav.appendChild(dots);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        const li = document.createElement('li');
        li.className = `page-item ${i === currentPage ? 'active' : ''}`;
        li.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${i}); return false;">${i}</a>`;
        paginationNav.appendChild(li);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('li');
            dots.className = 'page-item disabled';
            dots.innerHTML = `<span class="page-link">...</span>`;
            paginationNav.appendChild(dots);
        }

        const lastLi = document.createElement('li');
        lastLi.className = 'page-item';
        lastLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${totalPages}); return false;">${totalPages}</a>`;
        paginationNav.appendChild(lastLi);
    }

    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = `page-item ${currentPage === totalPages ? 'disabled' : ''}`;
    nextLi.innerHTML = `<a class="page-link" href="#" onclick="goToPage(${currentPage + 1}); return false;">Next</a>`;
    paginationNav.appendChild(nextLi);

    document.getElementById('totalItems').textContent = filteredProducts.length;
    paginationContainer.style.display = 'flex';
}

function goToPage(page) {
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTable();
        renderPagination();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateShowingRange() {
    const startIdx = (currentPage - 1) * itemsPerPage + 1;
    const endIdx = Math.min(currentPage * itemsPerPage, filteredProducts.length);
    document.getElementById('showingRange').textContent = `${startIdx}-${endIdx}`;
}

function viewProductDetail(productId) {
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    currentDetailProduct = product;
    const categoryName = product.category?.name || 'N/A';
    const imageUrls = product.images && product.images.length > 0 ? product.images : ['https://via.placeholder.com/400'];

    let imagesHtml = imageUrls.map(img => 
        `<img src="${img}" alt="${product.title}" class="image-gallery img-thumbnail" onclick="updateMainImage('${img}')">`
    ).join('');

    const detailHtml = `
        <div class="row">
            <div class="col-md-6">
                <img id="mainImage" src="${imageUrls[0]}" alt="${product.title}" class="modal-image w-100 mb-3" onerror="this.src='https://via.placeholder.com/400'">
                <div class="image-gallery">
                    ${imagesHtml}
                </div>
            </div>
            <div class="col-md-6">
                <h5 class="mb-3">Product Information</h5>
                <p><strong>ID:</strong> ${product.id}</p>
                <p><strong>Title:</strong> ${product.title}</p>
                <p><strong>Price:</strong> <span class="text-success fs-5 fw-bold">$${product.price}</span></p>
                <p><strong>Category:</strong> <span class="badge ${getCategoryColor(categoryName)}">${categoryName}</span></p>
                <p><strong>Description:</strong></p>
                <p>${product.description || 'No description available'}</p>
                <hr>
                <p><small class="text-muted">Created: ${new Date(product.creationAt).toLocaleString()}</small></p>
                <p><small class="text-muted">Updated: ${new Date(product.updatedAt).toLocaleString()}</small></p>
            </div>
        </div>
    `;

    document.getElementById('detailModalBody').innerHTML = detailHtml;
    document.getElementById('detailModalTitle').textContent = product.title;
    detailModal.show();
}

function updateMainImage(src) {
    document.getElementById('mainImage').src = src;
}

async function handleSaveEdit() {
    const productId = document.getElementById('editProductId').value;
    const title = document.getElementById('editTitle').value;
    const price = parseFloat(document.getElementById('editPrice').value);
    const description = document.getElementById('editDescription').value;
    const imageUrl = document.getElementById('editImage').value;

    if (!title || !price || !description || !imageUrl) {
        alert('Please fill all fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price,
                description,
                images: [imageUrl]
            })
        });

        if (!response.ok) throw new Error('Failed to update product');

        const updatedProduct = await response.json();
        
        // Update in local array
        const index = allProducts.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            allProducts[index] = { ...allProducts[index], ...updatedProduct };
        }

        editModal.hide();
        alert('Product updated successfully!');
        loadProducts();
    } catch (error) {
        console.error('Error updating product:', error);
        alert('Failed to update product. Please try again.');
    }
}

async function handleCreateProduct() {
    const title = document.getElementById('createTitle').value;
    const price = parseFloat(document.getElementById('createPrice').value);
    const description = document.getElementById('createDescription').value;
    const categoryId = parseInt(document.getElementById('createCategory').value);
    const imageUrl = document.getElementById('createImage').value;

    if (!title || !price || !description || !categoryId || !imageUrl) {
        alert('Please fill all fields');
        return;
    }

    try {
        const response = await fetch(`${API_BASE_URL}/products`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                price,
                description,
                categoryId,
                images: [imageUrl]
            })
        });

        if (!response.ok) throw new Error('Failed to create product');

        const newProduct = await response.json();
        allProducts.push(newProduct);
        filteredProducts = [...allProducts];

        document.getElementById('createProductForm').reset();
        createModal.hide();
        alert('Product created successfully!');
        renderTable();
        renderPagination();
    } catch (error) {
        console.error('Error creating product:', error);
        alert('Failed to create product. Please try again.');
    }
}

document.getElementById('editProductBtn').addEventListener('click', () => {
    if (!currentDetailProduct) return;

    document.getElementById('editProductId').value = currentDetailProduct.id;
    document.getElementById('editTitle').value = currentDetailProduct.title;
    document.getElementById('editPrice').value = currentDetailProduct.price;
    document.getElementById('editDescription').value = currentDetailProduct.description;
    document.getElementById('editCategory').value = currentDetailProduct.category?.name || 'N/A';
    const imageUrl = currentDetailProduct.images && currentDetailProduct.images.length > 0 
        ? currentDetailProduct.images[0] 
        : '';
    document.getElementById('editImage').value = imageUrl;
});

function handleExportCSV() {
    const startIdx = (currentPage - 1) * itemsPerPage;
    const endIdx = startIdx + itemsPerPage;
    const exportData = filteredProducts.slice(startIdx, endIdx);

    if (exportData.length === 0) {
        alert('No data to export');
        return;
    }

    let csv = 'ID,Title,Price,Category,Description\n';

    exportData.forEach(product => {
        const title = `"${product.title.replace(/"/g, '""')}"`;
        const description = `"${(product.description || '').replace(/"/g, '""')}"`;
        const category = product.category?.name || 'N/A';

        csv += `${product.id},${title},${product.price},${category},${description}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `products-${new Date().getTime()}.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert('CSV exported successfully!');
}

function showLoading(show) {
    loadingState.style.display = show ? 'block' : 'none';
    tableContainer.style.display = show ? 'none' : 'block';
    paginationContainer.style.display = show ? 'none' : 'flex';
}

function showError(message) {
    alert(message);
}

function getCategoryColor(categoryName) {
    const colors = {
        'Clothes': 'bg-primary',
        'Electronics': 'bg-danger',
        'Furniture': 'bg-warning text-dark',
        'Shoes': 'bg-info',
        'Miscellaneous': 'bg-secondary'
    };
    return colors[categoryName] || 'bg-secondary';
}
