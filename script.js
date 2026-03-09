// Data Manager JavaScript
let currentManager = null;
let products = [];
let customMenus = [];

// Templates for different data types - only the 8 files that actually exist
const templates = {
    'products': {
        "topSelling": {
            "title": "Top Selling Gifts",
            "description": "Discover our most loved and highly-rated gifts that have brought joy to countless celebrations.",
            "productIds": ["1", "2", "3", "4", "5", "6", "7", "8"]
        },
        "products": [
            {
                "id": "1",
                "name": "Vintage Rose Jewelry Box",
                "description": "Handcrafted wooden jewelry box with intricate rose patterns and velvet interior.",
                "price": 7499,
                "originalPrice": 9999,
                "images": [
                    "/vintage-wooden-jewelry-box-with-rose-patterns.jpg",
                    "/vintage-wooden-jewelry-box-side-view.jpg",
                    "/vintage-wooden-jewelry-box-open-view.jpg"
                ],
                "gif": "",
                "video": "",
                "category": "gift-box",
                "occasion": "anniversary",
                "rating": 4.8,
                "reviewCount": 127,
                "customizationLevel": "premium",
                "inStock": true,
                "specifications": {
                    "material": "Premium Wood with Velvet Interior",
                    "size": "8 x 6 x 4 inches",
                    "weight": "500 grams",
                    "color": "Natural Wood Finish with Red Roses"
                },
                "shipping": {
                    "delivery": "5-7 business days",
                    "packaging": "Premium gift box included",
                    "shippingCost": "Free shipping above ₹999"
                },
                "careInstructions": "Wipe with dry cloth only. Keep away from direct sunlight and moisture. Use wood polish occasionally to maintain shine.",
                "features": [
                    "Handcrafted by skilled artisans",
                    "Intricate rose pattern carving",
                    "Soft velvet interior lining",
                    "Brass hinges and clasp",
                    "Personalization available",
                    "Gift wrapping included"
                ]
            }
        ]
    },
    'about-values': {
        "_instructions": "Update your about page values and why choose section here.",
        "_fields": {
            "title": "Section title as shown to customers",
            "description": "Detailed description for customers",
            "link": "Call-to-action text or statistic",
            "icon": "Lucide icon name (Heart, HandHeart, Clock, Leaf, Users, Ribbon)"
        },
        "whyChoose": [],
        "values": []
    },
    'navigation': {
        "_instructions": "SISTER: Update your website navigation menu here.",
        "_fields": {
            "name": "Menu item name as shown to customers",
            "href": "Link destination URL"
        },
        "navItems": [
            {
                "name": "Home",
                "href": "/"
            },
            {
                "name": "About",
                "href": "/about"
            },
            {
                "name": "Gifts",
                "href": "/gifts"
            },
            {
                "name": "Contact",
                "href": "/contact"
            }
        ]
    },
    'testimonials': {
        "testimonials": [
            {
                "id": "1",
                "name": "Priya Sharma",
                "location": "Mumbai, Anniversary Gift",
                "rating": 5,
                "comment": "The memory album they created for our 10th anniversary was absolutely breathtaking. Every page told our story beautifully, and my husband was moved to tears. It's now our most treasured possession.",
                "image": "/woman-smiling-testimonial-photo.jpg"
            }
        ]
    },
    'categories': {
        "categories": [
            {
                "name": "Gift Hamper",
                "description": "Curated collections of premium items beautifully packaged for the perfect gifting experience.",
                "image": "/elegant-gift-boxes-with-pink-ribbons-on-white-back.jpg",
                "href": "/gifts?category=gift-hamper"
            },
            {
                "name": "Gift Box",
                "description": "Elegant gift boxes filled with carefully selected items tailored to your special occasion.",
                "image": "/vintage-wooden-jewelry-box-with-rose-patterns.jpg",
                "href": "/gifts?category=gift-box"
            },
            {
                "name": "Bouquet",
                "description": "Beautiful handcrafted bouquets made with premium materials and artistic arrangements.",
                "image": "/luxury-flower-bouquet-with-roses-and-lilies.jpg",
                "href": "/gifts?category=bouquet"
            },
            {
                "name": "Miniature",
                "description": "Delicate miniature creations perfect for collectors and unique gift ideas.",
                "image": "/miniature-handcrafted-dollhouse-furniture.jpg",
                "href": "/gifts?category=miniature"
            },
            {
                "name": "Frame",
                "description": "Custom frames and photo displays to preserve your precious memories.",
                "image": "/elegant-wooden-photo-frame-with-engraved-details.jpg",
                "href": "/gifts?category=frame"
            }
        ]
    },
    'occasions': {
        "occasions": [
            {
                "name": "Anniversary",
                "description": "Celebrate your love story with personalized keepsakes that capture your cherished memories.",
                "image": "/anniversary-gifts-romantic-setup.jpg",
                "href": "/gifts?occasion=anniversary"
            }
        ]
    },
    'top-selling': {
        "_instructions": "Update your top selling product IDs here.",
        "_fields": {
            "productIds": "Array of product IDs that should be featured as top selling"
        },
        "topSelling": {
            "productIds": []
        }
    },
    'about': {
        "about": {
            "hero": {
                "title": "About The Tohfa Creations",
                "subtitle": "Love & Craftsmanship",
                "description": "Founded in 2016, The Tohfa Creations began as a small dream to create meaningful connections through handcrafted artistry. Every piece we create carries the passion and dedication of our skilled artisan team.",
                "learnJourneyText": "Learn Our Journey"
            },
            "story": {
                "title": "Our Story",
                "paragraphs": [
                    "It all started in 2016 when our founder, Sarah Martinez, created a handcrafted memory album for her parents' 40th wedding anniversary. What began as a personal project to capture their love story quickly became something more—a realization that every family has precious moments worth preserving in a beautiful, meaningful way.",
                    "That first album, filled with carefully selected photos, handwritten notes, and personal touches, moved her parents to tears. Friends and family who saw it began asking Sarah to create similar keepsakes for their own special occasions. Word spread, and what started as a passion project in her small apartment studio grew into The Tohfa Creations.",
                    "Today, we're a team of skilled artisans dedicated to creating handcrafted gifts that tell your unique story. From anniversary gifts to birthday surprises, proposal setups to memory albums, we pour our hearts into every piece, ensuring it becomes a treasured heirloom that celebrates life's most precious moments."
                ]
            },
            "mission": {
                "title": "Our Mission",
                "content": "To create beautiful, personalized handmade gifts that capture life's most precious moments and bring joy to both giver and receiver. We strive to make every gift a cherished memory that lasts a lifetime."
            },
            "whyChoose": [
                {
                    "icon": "Heart",
                    "title": "Premium Quality",
                    "description": "We use only the finest materials and artisanal craftsmanship techniques to ensure every gift is built to last generations.",
                    "link": "100% Customer Satisfaction"
                },
                {
                    "icon": "HandHeart",
                    "title": "Personal Touch",
                    "description": "Every piece is uniquely crafted to tell your personal story, making each gift as individual as the person receiving it.",
                    "link": "100% Personalization"
                },
                {
                    "icon": "Clock",
                    "title": "Timely Delivery",
                    "description": "We understand the importance of special moments and guarantee your handcrafted gift will arrive exactly when you need it.",
                    "link": "On-Time Guarantee"
                }
            ],
            "values": [
                {
                    "icon": "Heart",
                    "title": "Love in Every Detail",
                    "description": "We pour genuine care and attention into every aspect of our craft, ensuring each gift carries the love it's meant to express."
                },
                {
                    "icon": "Leaf",
                    "title": "Sustainable Practices",
                    "description": "We are committed to environmental responsibility, using eco-friendly materials and sustainable crafting methods in all our creations."
                },
                {
                    "icon": "Users",
                    "title": "Community Connection",
                    "description": "We believe in supporting local artisans and giving back to our community through workshops and charitable partnerships."
                },
                {
                    "icon": "Ribbon",
                    "title": "Lasting Memories",
                    "description": "Our mission is to create heirloom-quality gifts that will be treasured for generations, preserving precious memories forever."
                }
            ]
        }
    },
    'contact': {
        "_instructions": "SISTER: Update your contact information here.",
        "_fields": {
            "title": "Contact page title",
            "description": "Contact page description",
            "email": "Your business email",
            "phone": "Your business phone",
            "address": "Your business address",
            "businessHours": "Business hours information",
            "socialMedia": "Social media links with redirect links",
            "recentPosts": "Recent social media posts with redirect links"
        },
        "contact": {
            "title": "Get in Touch",
            "description": "We'd love to hear from you! Whether you have a question about our products, want to discuss a custom order, or just want to say hello, we're here for you.",
            "email": "hello@tohfacreations.com",
            "phone": "+91 98765 43210",
            "address": "123 Artisan Lane, Craft District, Mumbai, Maharashtra 400001",
            "businessHours": {
                "weekdays": "Monday - Friday: 10:00 AM - 7:00 PM",
                "saturday": "Saturday: 11:00 AM - 6:00 PM",
                "sunday": "Sunday: Closed"
            },
            "socialMedia": [
                {
                    "platform": "Facebook",
                    "link": "https://facebook.com/tohfacreations"
                },
                {
                    "platform": "Instagram", 
                    "link": "https://instagram.com/tohfacreations"
                },
                {
                    "platform": "Twitter",
                    "link": "https://twitter.com/tohfacreations"
                }
            ],
            "recentPosts": [
                {
                    "id": "1",
                    "platform": "Instagram",
                    "timeAgo": "2 days ago",
                    "content": "Just completed this beautiful wedding gift box for Sarah & Raj's special day! 💒",
                    "image": "/recent-post-1.jpg",
                    "redirectLink": "https://instagram.com/p/ABC123"
                },
                {
                    "id": "2",
                    "platform": "Facebook",
                    "timeAgo": "5 days ago",
                    "content": "Customer love is what drives us! Look at this amazing reaction to our anniversary album. ❤️",
                    "image": "/recent-post-2.jpg",
                    "redirectLink": "https://facebook.com/posts/XYZ789"
                },
                {
                    "id": "3",
                    "platform": "Instagram",
                    "timeAgo": "3 days ago",
                    "content": "Emily's reaction when she received her custom photo album was priceless. 💕",
                    "image": "/recent-post-3.jpg",
                    "redirectLink": "https://instagram.com/p/DEF789"
                }
            ]
        }
    },
    'site-config': {
        "_instructions": "SISTER: Update your complete website configuration here. Everything about your website in one place!",
        "_fields": {
            "siteName": "Your business name",
            "tagline": "Your business tagline", 
            "description": "Website description for SEO",
            "logo": "Logo filename in /public folder",
            "favicon": "Favicon filename in /public folder",
            "hero": "Homepage hero section content",
            "navigation": "Main navigation menu items",
            "seo": "SEO settings"
        },
        "siteConfig": {
            "siteName": "The Tohfa Creations",
            "tagline": "Handcrafted Gifts, Personalized with Love",
            "description": "Handcrafted with love, personalized with care. Find the perfect gift to celebrate life's most precious moments.",
            "logo": "/logo.png",
            "favicon": "/favicon.ico",
            "hero": {
                "title": "The Tohfa Creations",
                "subtitle": "One Stop Gifting Solution",
                "description": "Create unforgettable moments with our bespoke handcrafted gifts. Each piece is artistically designed to tell stories and spread joy to celebrate life's most precious milestones.",
                "backgroundImage": "/hero.bg.png",
                "browseGiftsText": "Browse Gifts"
            },
            "navigation": [
                {
                    "name": "Home",
                    "href": "/"
                },
                {
                    "name": "About",
                    "href": "/about"
                },
                {
                    "name": "Gifts",
                    "href": "/gifts"
                },
                {
                    "name": "Contact",
                    "href": "/contact"
                }
            ],
            "seo": {
                "keywords": "handmade gifts, personalized gifts, custom gifts, anniversary gifts, birthday gifts, wedding gifts, handmade crafts",
                "author": "The Tohfa Creations"
            }
        }
    },
    'site-hero': {
        "_instructions": "SISTER: Update your homepage hero section content here.",
        "_fields": {
            "title": "Main hero title",
            "subtitle": "Hero subtitle/tagline",
            "description": "Hero description text",
            "backgroundImage": "Background image filename",
            "browseGiftsText": "Browse Gifts button text"
        },
        "hero": {
            "title": "The Tohfa Creations",
            "subtitle": "One Stop Gifting Solution",
            "description": "Create unforgettable moments with our bespoke handcrafted gifts. Each piece is artistically designed to tell stories and spread joy to celebrate life's most precious milestones.",
            "backgroundImage": "/hero.bg.png",
            "browseGiftsText": "Browse Gifts"
        }
    },
    'footer': {
        "_instructions": "SISTER: Update your website footer content here.",
        "_fields": {
            "companyName": "Company name",
            "companyDescription": "Company description",
            "quickLinksTitle": "Quick Links section title",
            "contactInfoTitle": "Contact Info section title",
            "followUsTitle": "Follow Us section title",
            "socialMedia": "Social media links",
            "copyright": "Copyright text"
        },
        "footer": {
            "companyName": "The Tohfa Creations",
            "companyDescription": "Creating meaningful connections through handcrafted gifts and personalized experiences.",
            "quickLinksTitle": "Quick Links",
            "contactInfoTitle": "Contact Info",
            "followUsTitle": "Follow Us",
            "socialMedia": [
                {
                    "platform": "Facebook",
                    "link": "https://facebook.com/tohfacreations"
                },
                {
                    "platform": "Instagram", 
                    "link": "https://instagram.com/tohfacreations"
                },
                {
                    "platform": "Twitter",
                    "link": "https://twitter.com/tohfacreations"
                }
            ],
            "copyright": "&copy; 2025 The Tohfa Creations. All rights reserved."
        }
    },
    'about-hero': {
        "_instructions": "SISTER: Update your about page hero section content here.",
        "_fields": {
            "title": "About page hero title",
            "subtitle": "Hero subtitle/highlight",
            "description": "Hero description text",
            "learnJourneyText": "Learn Our Journey button text"
        },
        "hero": {
            "title": "About The Tohfa Creations",
            "subtitle": "Love & Craftsmanship",
            "description": "Founded in 2016, The Tohfa Creations began as a small dream to create meaningful connections through handcrafted artistry. Every piece we create carries the passion and dedication of our skilled artisan team.",
            "learnJourneyText": "Learn Our Journey"
        }
    },
    'about-story': {
        "_instructions": "SISTER: Update your about page story content here.",
        "_fields": {
            "story": "Company story paragraphs"
        },
        "story": {
            "paragraphs": [
                "It all started in 2016 when our founder, Sarah Martinez, created a handcrafted memory album for her parents' 40th wedding anniversary. What began as a personal project to capture their love story quickly became something more—a realization that every family has precious moments worth preserving in a beautiful, meaningful way.",
                "That first album, filled with carefully selected photos, handwritten notes, and personal touches, moved her parents to tears. Friends and family who saw it began asking Sarah to create similar keepsakes for their own special occasions. Word spread, and what started as a passion project in her small apartment studio grew into The Tohfa Creations.",
                "Today, we're a team of skilled artisans dedicated to creating handcrafted gifts that tell your unique story. From anniversary gifts to birthday surprises, proposal setups to memory albums, we pour our hearts into every piece, ensuring it becomes a treasured heirloom that celebrates life's most precious moments."
            ]
        }
    },
    'custom-menu': {
        "_instructions": "Create custom menus for special occasions and seasons.",
        "customMenus": [
            {
                "id": "special-occasions",
                "name": "",
                "description": "Special occasion menus and collections",
                "items": [],
                "isActive": true
            },
            {
                "id": "seasonal",
                "name": "",
                "description": "Seasonal collections and limited edition items",
                "items": [],
                "isActive": true
            },
            {
                "id": "custom",
                "name": "",
                "description": "Custom collections and personalized content",
                "items": [],
                "isActive": true
            }
        ]
    },
    about: {
        "_instructions": "Update your about section information here.",
        "about": {
            "title": "About The Tohfa Creations",
            "description": "Your company description",
            "story": "Your company story",
            "mission": "Your mission statement",
            "values": ["Value 1", "Value 2", "Value 3"]
        }
    },
    categories: {
        "categories": [
            {
                "name": "Gift Hamper",
                "description": "Curated collections of premium items beautifully packaged for the perfect gifting experience.",
                "image": "/elegant-gift-boxes-with-pink-ribbons-on-white-back.jpg",
                "href": "/gifts?category=gift-hamper"
            }
        ]
    },
    contact: {
        "_instructions": "SISTER: Update your contact page information here.",
        "_fields": {
            "title": "Contact page title",
            "description": "Contact page description",
            "phone": "Your business phone",
            "available": "Available hours text",
            "email": "Your business email",
            "responseTime": "Email response time",
            "address": "Your business address",
            "lookingForSomething": "Looking for something specific section with links",
            "connectWithUs": "Connect With Us section description",
            "socialMedia": "Social media links with follower counts",
            "recentPosts": "Recent posts section with Instagram/Facebook content"
        },
        "contact": {
            "title": "Contact Us",
            "description": "Get in touch with us for any questions about our handcrafted gifts.",
            "phone": "+91 6396202262",
            "available": "Available 24/7",
            "email": "tohfacreations3@gmail.com",
            "responseTime": "We respond within 24 hours",
            "address": "28/476, Gokula Gali Gudri Mansoor Khan, Dhuliya Ganj, Agra-282003, Uttar Pradesh",
            "lookingForSomething": {
                "title": "Looking for something specific?",
                "links": [
                    {"text": "Browse Gifts", "href": "/gifts"},
                    {"text": "About Us", "href": "/about"},
                    {"text": "My Account", "href": "/account"}
                ]
            },
            "connectWithUs": {
                "title": "Connect With Us",
                "description": "Follow us on social media for inspiration, behind-the-scenes content, and special offers."
            },
            "socialMedia": [
                {
                    "platform": "Facebook",
                    "followers": "12.5K followers",
                    "link": "https://facebook.com/tohfacreations"
                },
                {
                    "platform": "Instagram", 
                    "followers": "8.2K followers",
                    "link": "https://instagram.com/tohfacreations"
                },
                {
                    "platform": "Twitter",
                    "followers": "5.8K followers", 
                    "link": "https://twitter.com/tohfacreations"
                },
                {
                    "platform": "LinkedIn",
                    "followers": "5.1K followers",
                    "link": "https://linkedin.com/tohfacreations"
                }
            ],
            "recentPosts": {
                "title": "Recent Posts",
                "description": "See what we've been working on lately",
                "posts": [
                    {
                        "platform": "Instagram",
                        "timeAgo": "2 hours ago",
                        "content": "Just finished this beautiful custom jewelry box for Sarah's anniversary gift! 🎁",
                        "image": "/recent-post-1.jpg"
                    },
                    {
                        "platform": "Facebook",
                        "timeAgo": "1 day ago", 
                        "content": "Behind the scenes: Creating magic one piece at a time in our studio ✨",
                        "image": "/recent-post-2.jpg"
                    },
                    {
                        "platform": "Instagram",
                        "timeAgo": "3 days ago",
                        "content": "Emily's reaction when she received her custom photo album was priceless. 💕",
                        "image": "/recent-post-3.jpg"
                    }
                ]
            }
        }
    },
    'top-selling': {
        "_instructions": "Manage top-selling products here.",
        "topSelling": {
            "productIds": []
        }
    }
};

// Open specific manager
function openManager(type) {
    currentManager = type;
    document.getElementById('dataGrid').style.display = 'none';
    document.getElementById('managerSection').style.display = 'block';
    
    const content = document.getElementById('managerContent');
    
    switch(type) {
        case 'products':
            content.innerHTML = getProductManagerHTML();
            initializeProductManager();
            break;
        case 'custom-menu':
            content.innerHTML = getCustomMenuManagerHTML();
            initializeCustomMenuManager();
            break;
        default:
            content.innerHTML = getSimpleManagerHTML(type);
    }
}

// Close manager
function closeManager() {
    currentManager = null;
    document.getElementById('dataGrid').style.display = 'grid';
    document.getElementById('managerSection').style.display = 'none';
}

// Download template
function downloadTemplate(type) {
    const template = templates[type];
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Product Manager HTML
function getProductManagerHTML() {
    return `
        <h2><i class="fas fa-box"></i> Products JSON Editor</h2>
        
        <div class="mb-20">
            <h3>Products Data (Edit Directly)</h3>
            <p style="color: #666; margin-bottom: 15px;">
                <i class="fas fa-info-circle"></i> 
                Edit the JSON below. Add as many products as you need in the "products" array.
                Follow the template format shown.
            </p>
            
            <div class="form-group">
                <label>Products JSON Data</label>
                <textarea id="jsonEditor" style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5; min-height: 400px; background: #f8f9fa;">${JSON.stringify(templates.products, null, 2)}</textarea>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn" onclick="validateAndFormatJSON()">
                    <i class="fas fa-check"></i> Validate & Format JSON
                </button>
                <button class="btn btn-secondary" onclick="resetJSONEditor()">
                    <i class="fas fa-undo"></i> Reset to Template
                </button>
                <button class="btn btn-success" onclick="downloadJSONFromEditor()">
                    <i class="fas fa-download"></i> Download products.json
                </button>
            </div>
            
            <div id="jsonError" style="color: #dc3545; margin-top: 10px; display: none;"></div>
            <div id="jsonSuccess" style="color: #28a745; margin-top: 10px; display: none;"></div>
        </div>
        
        <div class="mb-20">
            <h3>📝 How to Add Products</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px 0;">
                <h4>Example Product Structure:</h4>
                <pre style="background: white; padding: 15px; border-radius: 5px; font-size: 13px; overflow-x: auto;">{
  "id": "1",
  "name": "Vintage Rose Jewelry Box",
  "description": "Handcrafted wooden jewelry box with intricate rose patterns and velvet interior.",
  "price": 7499,
  "originalPrice": 9999,
  "images": [
    "/vintage-wooden-jewelry-box-with-rose-patterns.jpg",
    "/vintage-wooden-jewelry-box-side-view.jpg"
  ],
  "gif": "",
  "video": "",
  "category": "gift-box",
  "occasion": "anniversary",
  "rating": 4.8,
  "reviewCount": 127,
  "customizationLevel": "premium",
  "inStock": true,
  "specifications": {
    "material": "Premium Wood with Velvet Interior",
    "size": "8 x 6 x 4 inches",
    "weight": "500 grams",
    "color": "Natural Wood Finish with Red Roses"
  },
  "shipping": {
    "delivery": "5-7 business days",
    "packaging": "Premium gift box included",
    "shippingCost": "Free shipping above ₹999"
  },
  "careInstructions": "Wipe with dry cloth only. Keep away from direct sunlight and moisture. Use wood polish occasionally to maintain shine.",
  "features": [
    "Handcrafted by skilled artisans",
    "Intricate rose pattern carving",
    "Soft velvet interior lining",
    "Brass hinges and clasp",
    "Personalization available",
    "Gift wrapping included"
  ]
}</pre>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px;">
                <h4>📋 Quick Steps:</h4>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Copy the example above</li>
                    <li>Paste it in the "products" array in the editor</li>
                    <li>Change the details (name, price, description, etc.)</li>
                    <li>Give each product a unique "id"</li>
                    <li>Repeat for as many products as you need</li>
                    <li>Click "Validate & Format JSON" to check for errors</li>
                    <li>Click "Download products.json" when done</li>
                </ol>
            </div>
        </div>
    `;
}

// Custom Menu Manager HTML
function getCustomMenuManagerHTML() {
    return `
        <h2><i class="fas fa-palette"></i> Custom Menu JSON Editor</h2>
        
        <div class="mb-20">
            <h3>Custom Menu Data (Edit Directly)</h3>
            <p style="color: #666; margin-bottom: 15px;">
                <i class="fas fa-info-circle"></i> 
                Edit the JSON below. Add as many custom menus as you need in the "customMenus" array.
                Follow the template format shown.
            </p>
            
            <div class="form-group">
                <label>Custom Menu JSON Data</label>
                <textarea id="jsonEditor" style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5; min-height: 400px; background: #f8f9fa;">${JSON.stringify(templates['custom-menu'], null, 2)}</textarea>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn" onclick="validateAndFormatJSON()">
                    <i class="fas fa-check"></i> Validate & Format JSON
                </button>
                <button class="btn btn-secondary" onclick="resetJSONEditor()">
                    <i class="fas fa-undo"></i> Reset to Template
                </button>
                <button class="btn btn-success" onclick="downloadJSONFromEditor()">
                    <i class="fas fa-download"></i> Download custom-menu.json
                </button>
            </div>
            
            <div id="jsonError" style="color: #dc3545; margin-top: 10px; display: none;"></div>
            <div id="jsonSuccess" style="color: #28a745; margin-top: 10px; display: none;"></div>
        </div>
        
        <div class="mb-20">
            <h3>📝 How to Add Custom Menus</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px 0;">
                <h4>Example Custom Menu Structure:</h4>
                <pre style="background: white; padding: 15px; border-radius: 5px; font-size: 13px; overflow-x: auto;">{
  "id": "special-occasions",
  "name": "🎨 Special occasions",
  "description": "Special occasion menus and collections",
  "items": [
    {
      "id": "1",
      "name": "Wedding Collection",
      "description": "Beautiful gifts for wedding ceremonies",
      "price": 9999,
      "image": "/wedding-gift.jpg"
    },
    {
      "id": "2", 
      "name": "Anniversary Special",
      "description": "Romantic gifts for anniversaries",
      "price": 7499,
      "image": "/anniversary-gift.jpg"
    }
  ],
  "isActive": true
}</pre>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px;">
                <h4>📋 Quick Steps:</h4>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Copy the example above</li>
                    <li>Paste it in the "customMenus" array in the editor</li>
                    <li>Change the details (name, description, items, etc.)</li>
                    <li>Give each menu a unique "id"</li>
                    <li>Add menu items in the "items" array</li>
                    <li>Repeat for as many menus as you need</li>
                    <li>Click "Validate & Format JSON" to check for errors</li>
                    <li>Click "Download custom-menu.json" when done</li>
                </ol>
            </div>
        </div>
    `;
}

// Simple Manager HTML for other types
function getSimpleManagerHTML(type) {
    const template = templates[type];
    const exampleData = getExampleData(type);
    
    return `
        <h2><i class="fas fa-edit"></i> ${type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')} JSON Editor</h2>
        
        <div class="mb-20">
            <h3>${type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')} Data (Edit Directly)</h3>
            <p style="color: #666; margin-bottom: 15px;">
                <i class="fas fa-info-circle"></i> 
                Edit the JSON below. Follow the template format shown.
            </p>
            
            <div class="form-group">
                <label>${type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')} JSON Data</label>
                <textarea id="jsonEditor" style="font-family: 'Courier New', monospace; font-size: 14px; line-height: 1.5; min-height: 400px; background: #f8f9fa;">${JSON.stringify(template, null, 2)}</textarea>
            </div>
            
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <button class="btn" onclick="validateAndFormatJSON()">
                    <i class="fas fa-check"></i> Validate & Format JSON
                </button>
                <button class="btn btn-secondary" onclick="resetJSONEditor()">
                    <i class="fas fa-undo"></i> Reset to Template
                </button>
                <button class="btn btn-success" onclick="downloadJSONFromEditor('${type}')">
                    <i class="fas fa-download"></i> Download ${type}.json
                </button>
            </div>
            
            <div id="jsonError" style="color: #dc3545; margin-top: 10px; display: none;"></div>
            <div id="jsonSuccess" style="color: #28a745; margin-top: 10px; display: none;"></div>
        </div>
        
        <div class="mb-20">
            <h3>📝 Example Data Structure</h3>
            <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; margin: 15px 0;">
                <h4>Example:</h4>
                <pre style="background: white; padding: 15px; border-radius: 5px; font-size: 13px; overflow-x: auto;">${JSON.stringify(exampleData, null, 2)}</pre>
            </div>
            
            <div style="background: #e3f2fd; padding: 15px; border-radius: 10px;">
                <h4>� Quick Steps:</h4>
                <ol style="margin-left: 20px; line-height: 1.8;">
                    <li>Copy the example above</li>
                    <li>Paste it in the appropriate array/object in the editor</li>
                    <li>Change the details to match your data</li>
                    <li>Add more items if needed (for arrays)</li>
                    <li>Click "Validate & Format JSON" to check for errors</li>
                    <li>Click "Download ${type}.json" when done</li>
                </ol>
            </div>
        </div>
    `;
}

function getExampleData(type) {
    const examples = {
        products: {
            "topSelling": {
                "title": "Top Selling Gifts",
                "description": "Discover our most loved and highly-rated gifts that have brought joy to countless celebrations.",
                "productIds": ["1", "2", "3", "4", "5", "6", "7", "8"]
            },
            "products": [
                {
                    "id": "1",
                    "name": "Vintage Rose Jewelry Box",
                    "description": "Handcrafted wooden jewelry box with intricate rose patterns and velvet interior.",
                    "price": 7499,
                    "originalPrice": 9999,
                    "images": [
                        "/vintage-wooden-jewelry-box-with-rose-patterns.jpg",
                        "/vintage-wooden-jewelry-box-side-view.jpg",
                        "/vintage-wooden-jewelry-box-open-view.jpg"
                    ],
                    "gif": "",
                    "video": "",
                    "category": "gift-box",
                    "occasion": "anniversary",
                    "rating": 4.8,
                    "reviewCount": 127,
                    "customizationLevel": "premium",
                    "inStock": true,
                    "specifications": {
                        "material": "Premium Wood with Velvet Interior",
                        "size": "8 x 6 x 4 inches",
                        "weight": "500 grams",
                        "color": "Natural Wood Finish with Red Roses"
                    },
                    "shipping": {
                        "delivery": "5-7 business days",
                        "packaging": "Premium gift box included",
                        "shippingCost": "Free shipping above ₹999"
                    },
                    "careInstructions": "Wipe with dry cloth only. Keep away from direct sunlight and moisture. Use wood polish occasionally to maintain shine.",
                    "features": [
                        "Handcrafted by skilled artisans",
                        "Intricate rose pattern carving",
                        "Soft velvet interior lining",
                        "Brass hinges and clasp",
                        "Personalization available",
                        "Gift wrapping included"
                    ]
                }
            ]
        },
        about: {
            "about": {
                "hero": {
                    "title": "About The Tohfa Creations",
                    "subtitle": "Love & Craftsmanship",
                    "description": "Founded in 2016, The Tohfa Creations began as a small dream to create meaningful connections through handcrafted artistry. Every piece we create carries the passion and dedication of our skilled artisan team.",
                    "learnJourneyText": "Learn Our Journey"
                },
                "story": {
                    "title": "Our Story",
                    "paragraphs": [
                        "It all started in 2016 when our founder, Sarah Martinez, created a handcrafted memory album for her parents' 40th wedding anniversary. What began as a personal project to capture their love story quickly became something more—a realization that every family has precious moments worth preserving in a beautiful, meaningful way.",
                        "That first album, filled with carefully selected photos, handwritten notes, and personal touches, moved her parents to tears. Friends and family who saw it began asking Sarah to create similar keepsakes for their own special occasions. Word spread, and what started as a passion project in her small apartment studio grew into The Tohfa Creations.",
                        "Today, we're a team of skilled artisans dedicated to creating handcrafted gifts that tell your unique story. From anniversary gifts to birthday surprises, proposal setups to memory albums, we pour our hearts into every piece, ensuring it becomes a treasured heirloom that celebrates life's most precious moments."
                    ]
                },
                "mission": {
                    "title": "Our Mission",
                    "content": "To create beautiful, personalized handmade gifts that capture life's most precious moments and bring joy to both giver and receiver. We strive to make every gift a cherished memory that lasts a lifetime."
                },
                "whyChoose": [
                    {
                        "icon": "Heart",
                        "title": "Premium Quality",
                        "description": "We use only the finest materials and artisanal craftsmanship techniques to ensure every gift is built to last generations.",
                        "link": "100% Customer Satisfaction"
                    },
                    {
                        "icon": "HandHeart",
                        "title": "Personal Touch",
                        "description": "Every piece is uniquely crafted to tell your personal story, making each gift as individual as the person receiving it.",
                        "link": "100% Personalization"
                    },
                    {
                        "icon": "Clock",
                        "title": "Timely Delivery",
                        "description": "We understand the importance of special moments and guarantee your handcrafted gift will arrive exactly when you need it.",
                        "link": "On-Time Guarantee"
                    }
                ],
                "values": [
                    {
                        "icon": "Heart",
                        "title": "Love in Every Detail",
                        "description": "We pour genuine care and attention into every aspect of our craft, ensuring each gift carries the love it's meant to express."
                    },
                    {
                        "icon": "Leaf",
                        "title": "Sustainable Practices",
                        "description": "We are committed to environmental responsibility, using eco-friendly materials and sustainable crafting methods in all our creations."
                    },
                    {
                        "icon": "Users",
                        "title": "Community Connection",
                        "description": "We believe in supporting local artisans and giving back to our community through workshops and charitable partnerships."
                    },
                    {
                        "icon": "Ribbon",
                        "title": "Lasting Memories",
                        "description": "Our mission is to create heirloom-quality gifts that will be treasured for generations, preserving precious memories forever."
                    }
                ]
            }
        },
        categories: {
            "categories": [
                {
                    "name": "Gift Hamper",
                    "description": "Curated collections of premium items beautifully packaged for the perfect gifting experience.",
                    "image": "/elegant-gift-boxes-with-pink-ribbons-on-white-back.jpg",
                    "href": "/gifts?category=gift-hamper"
                },
                {
                    "name": "Gift Box",
                    "description": "Elegant gift boxes filled with carefully selected items tailored to your special occasion.",
                    "image": "/vintage-wooden-jewelry-box-with-rose-patterns.jpg",
                    "href": "/gifts?category=gift-box"
                }
            ]
        },
        contact: {
            "contact": {
                "title": "Contact Us",
                "description": "Get in touch with us for any questions about our handcrafted gifts.",
                "phone": "+91 6396202262",
                "available": "Available 24/7",
                "email": "tohfacreations3@gmail.com",
                "responseTime": "We respond within 24 hours",
                "address": "28/476, Gokula Gali Gudri Mansoor Khan, Dhuliya Ganj, Agra-282003, Uttar Pradesh",
                "lookingForSomething": {
                    "title": "Looking for something specific?",
                    "links": [
                        {"text": "Browse Gifts", "href": "/gifts"},
                        {"text": "About Us", "href": "/about"},
                        {"text": "My Account", "href": "/account"}
                    ]
                },
                "connectWithUs": {
                    "title": "Connect With Us",
                    "description": "Follow us on social media for inspiration, behind-the-scenes content, and special offers."
                },
                "socialMedia": [
                    {
                        "platform": "Facebook",
                        "followers": "12.5K followers",
                        "link": "https://facebook.com/tohfacreations"
                    },
                    {
                        "platform": "Instagram", 
                        "followers": "8.2K followers",
                        "link": "https://instagram.com/tohfacreations"
                    },
                    {
                        "platform": "Twitter",
                        "followers": "5.8K followers", 
                        "link": "https://twitter.com/tohfacreations"
                    },
                    {
                        "platform": "LinkedIn",
                        "followers": "5.1K followers",
                        "link": "https://linkedin.com/tohfacreations"
                    }
                ],
                "recentPosts": {
                    "title": "Recent Posts",
                    "description": "See what we've been working on lately",
                    "posts": [
                        {
                            "platform": "Instagram",
                            "timeAgo": "2 hours ago",
                            "content": "Just finished this beautiful custom jewelry box for Sarah's anniversary gift! 🎁",
                            "image": "/recent-post-1.jpg"
                        },
                        {
                            "platform": "Facebook",
                            "timeAgo": "1 day ago", 
                            "content": "Behind the scenes: Creating magic one piece at a time in our studio ✨",
                            "image": "/recent-post-2.jpg"
                        },
                        {
                            "platform": "Instagram",
                            "timeAgo": "3 days ago",
                            "content": "Emily's reaction when she received her custom photo album was priceless. 💕",
                            "image": "/recent-post-3.jpg"
                        }
                    ]
                }
            }
        },
        occasions: {
            "occasions": [
                {
                    "name": "Anniversary",
                    "description": "Celebrate your love story with personalized keepsakes that capture your cherished memories.",
                    "image": "/anniversary-gifts-romantic-setup.jpg",
                    "href": "/gifts?occasion=anniversary"
                },
                {
                    "name": "Birthday",
                    "description": "Make birthdays special with unique gifts",
                    "image": "/birthday-gifts.jpg",
                    "href": "/gifts?occasion=birthday"
                },
                {
                    "name": "Wedding",
                    "description": "Elegant gifts for wedding celebrations",
                    "image": "/wedding-gifts.jpg",
                    "href": "/gifts?occasion=wedding"
                }
            ]
        },
        testimonials: {
            "testimonials": [
                {
                    "id": "1",
                    "name": "Priya Sharma",
                    "location": "Mumbai, Anniversary Gift",
                    "rating": 5,
                    "comment": "The memory album they created for our 10th anniversary was absolutely breathtaking. Every page told our story beautifully, and my husband was moved to tears. It's now our most treasured possession.",
                    "image": "/woman-smiling-testimonial-photo.jpg"
                }
            ]
        },
        'site-config': {
            "siteConfig": {
                "siteName": "The Tohfa Creations",
                "siteUrl": "https://tohfacreations.com",
                "logo": "/logo.png",
                "favicon": "/favicon.ico"
            }
        },
        'top-selling': {
            "topSelling": {
                "productIds": ["1", "2", "3", "4", "5"]
            }
        },
        'navigation': {
            "_instructions": "SISTER: Update your website navigation menu here.",
            "_fields": {
                "name": "Menu item name as shown to customers",
                "href": "Link destination URL"
            },
            "navItems": [
                {
                    "name": "Home",
                    "href": "/"
                },
                {
                    "name": "About",
                    "href": "/about"
                },
                {
                    "name": "Gifts",
                    "href": "/gifts"
                },
                {
                    "name": "Contact",
                    "href": "/contact"
                }
            ]
        }
    };
    
    return examples[type] || template;
}

// JSON Editor Functions
function initializeProductManager() {
    // No initialization needed for JSON editor
}

function validateAndFormatJSON() {
    const editor = document.getElementById('jsonEditor');
    const errorDiv = document.getElementById('jsonError');
    const successDiv = document.getElementById('jsonSuccess');
    
    try {
        const jsonData = JSON.parse(editor.value);
        
        // Format the JSON
        editor.value = JSON.stringify(jsonData, null, 2);
        
        // Show success
        errorDiv.style.display = 'none';
        successDiv.textContent = '✅ JSON is valid and formatted correctly!';
        successDiv.style.display = 'block';
        
        // Hide success after 3 seconds
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
        
    } catch (error) {
        // Show error
        successDiv.style.display = 'none';
        errorDiv.textContent = '❌ JSON Error: ' + error.message;
        errorDiv.style.display = 'block';
    }
}

function resetJSONEditor() {
    const editor = document.getElementById('jsonEditor');
    const errorDiv = document.getElementById('jsonError');
    const successDiv = document.getElementById('jsonSuccess');
    
    editor.value = JSON.stringify(templates[currentManager], null, 2);
    errorDiv.style.display = 'none';
    successDiv.style.display = 'none';
}

function downloadJSONFromEditor(filename = null) {
    const editor = document.getElementById('jsonEditor');
    const errorDiv = document.getElementById('jsonError');
    
    try {
        const jsonData = JSON.parse(editor.value);
        
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || `${currentManager}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        // Show success
        errorDiv.style.display = 'none';
        const successDiv = document.getElementById('jsonSuccess');
        successDiv.textContent = `✅ ${filename || currentManager}.json downloaded successfully!`;
        successDiv.style.display = 'block';
        
        setTimeout(() => {
            successDiv.style.display = 'none';
        }, 3000);
        
    } catch (error) {
        errorDiv.textContent = '❌ Please fix JSON errors before downloading: ' + error.message;
        errorDiv.style.display = 'block';
    }
}

// Custom Menu Manager Functions
function initializeCustomMenuManager() {
    updateMenuList();
}

function addCustomMenu() {
    const name = document.getElementById('menuName').value.trim();
    const description = document.getElementById('menuDescription').value.trim();
    
    if (!name || !description) {
        alert('Please fill in all required fields');
        return;
    }
    
    const menu = {
        id: Date.now().toString(),
        name,
        description,
        icon: document.getElementById('menuIcon').value,
        isActive: document.getElementById('menuActive').checked,
        items: []
    };
    
    customMenus.push(menu);
    updateMenuList();
    
    // Reset form
    document.getElementById('menuName').value = '';
    document.getElementById('menuDescription').value = '';
    document.getElementById('menuActive').checked = true;
}

function updateMenuList() {
    const container = document.getElementById('menuList');
    if (customMenus.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">No custom menus created yet</p>';
        return;
    }
    
    container.innerHTML = customMenus.map(menu => `
        <div class="menu-preview">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <h4>${menu.icon} ${menu.name}</h4>
                    <p>${menu.description}</p>
                    <span style="background: ${menu.isActive ? '#d4edda' : '#f8d7da'}; color: ${menu.isActive ? '#155724' : '#721c24'}; padding: 5px 10px; border-radius: 15px; font-size: 0.8rem;">
                        ${menu.isActive ? 'Active' : 'Inactive'}
                    </span>
                </div>
                <button class="btn btn-danger" onclick="deleteCustomMenu('${menu.id}')">
                    <i class="fas fa-trash"></i> Delete
                </button>
            </div>
        </div>
    `).join('');
    
    // Update menu count
    const managerSection = document.querySelector('#menuList').parentElement;
    const countHeader = managerSection.querySelector('h3');
    if (countHeader) {
        countHeader.textContent = `Custom Menus (${customMenus.length})`;
    }
}

function deleteCustomMenu(id) {
    customMenus = customMenus.filter(m => m.id !== id);
    updateMenuList();
}

function downloadCustomMenus() {
    const data = {
        ...templates['custom-menu'],
        customMenus: customMenus
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'custom-menu.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}
