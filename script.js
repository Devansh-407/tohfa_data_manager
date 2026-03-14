// Data Manager JavaScript
let currentManager = null;
let currentFormManager = null;
let products = [];
let customMenus = [];

// Form-based field definitions for each data type
const formFields = {
    'footer': {
        title: 'Footer Content',
        description: 'Manage website footer information',
        fields: [
            { name: 'companyName', type: 'text', label: 'Company Name', example: 'The Tohfa Creations' },
            { name: 'companyDescription', type: 'textarea', label: 'Company Description', example: 'Creating meaningful connections through handcrafted gifts and personalized experiences.' },
            { name: 'quickLinksTitle', type: 'text', label: 'Quick Links Title', example: 'Quick Links' },
            { name: 'contactInfoTitle', type: 'text', label: 'Contact Info Title', example: 'Contact Info' },
            { name: 'followUsTitle', type: 'text', label: 'Follow Us Title', example: 'Follow Us' },
            { name: 'socialMedia', type: 'array', label: 'Social Media Links', itemFields: [
                { name: 'platform', type: 'text', label: 'Platform', example: 'Facebook' },
                { name: 'link', type: 'text', label: 'Link', example: 'https://facebook.com/tohfacreations' }
            ]},
            { name: 'copyright', type: 'text', label: 'Copyright Text', example: '&copy; 2025 The Tohfa Creations. All rights reserved.' }
        ]
    },
    'products': {
        title: 'Products',
        description: 'Manage your complete product catalog',
        fields: [
            { name: 'topSelling.title', type: 'text', label: 'Top Selling Title', example: 'Top Selling Gifts' },
            { name: 'topSelling.description', type: 'textarea', label: 'Top Selling Description', example: 'Discover our most loved and highly-rated gifts that have brought joy to countless celebrations.' },
            { name: 'topSelling.productIds', type: 'text', label: 'Top Selling Product IDs (comma separated)', example: '1, 2, 3, 4, 5, 6, 7, 8' },
            { name: 'products', type: 'array', label: 'Products', itemFields: [
                { name: 'id', type: 'text', label: 'Product ID', example: '1' },
                { name: 'name', type: 'text', label: 'Product Name', example: 'Vintage Rose Jewelry Box' },
                { name: 'description', type: 'textarea', label: 'Description', example: 'Handcrafted wooden jewelry box with intricate rose patterns and velvet interior.' },
                { name: 'images', type: 'text', label: 'Images (comma separated)', example: '/vintage-wooden-jewelry-box-with-rose-patterns.jpg, /vintage-wooden-jewelry-box-side-view.jpg, /vintage-wooden-jewelry-box-open-view.jpg' },
                { name: 'gif', type: 'text', label: 'GIF URL', example: '' },
                { name: 'video', type: 'text', label: 'Video URL', example: '' },
                { name: 'category', type: 'select', label: 'Category', options: ['gift-hamper', 'gift-box', 'bouquet', 'miniature', 'frame'], example: 'gift-box' },
                { name: 'occasion', type: 'select', label: 'Occasion', options: ['anniversary', 'birthday', 'proposal', 'wedding', 'graduation'], example: 'anniversary' },
                { name: 'rating', type: 'number', label: 'Rating (1-5)', example: '4.8' },
                { name: 'reviewCount', type: 'number', label: 'Review Count', example: '127' },
                { name: 'customizationLevel', type: 'select', label: 'Customization Level', options: ['basic', 'standard', 'premium'], example: 'premium' },
                { name: 'inStock', type: 'checkbox', label: 'In Stock', example: 'true' },
                { name: 'sizes', type: 'array', label: 'Product Sizes & Pricing', itemFields: [
                    { name: 'id', type: 'text', label: 'Size ID', example: 'small' },
                    { name: 'name', type: 'text', label: 'Size Name', example: 'Small' },
                    { name: 'price', type: 'number', label: 'Price (₹)', example: '5499' },
                    { name: 'originalPrice', type: 'number', label: 'Original Price (₹)', example: '6999' },
                    { name: 'inStock', type: 'checkbox', label: 'In Stock', example: 'true' },
                    { name: 'description', type: 'text', label: 'Size Description', example: 'Perfect for small jewelry items (6 x 4 x 3 inches)' }
                ]},
                { name: 'specifications.material', type: 'text', label: 'Material', example: 'Premium Wood with Velvet Interior' },
                { name: 'specifications.weight', type: 'text', label: 'Weight', example: '500 grams' },
                { name: 'specifications.color', type: 'text', label: 'Color', example: 'Natural Wood Finish with Red Roses' },
                { name: 'shipping.delivery', type: 'text', label: 'Delivery Time', example: '5-7 business days' },
                { name: 'shipping.packaging', type: 'text', label: 'Packaging', example: 'Premium gift box included' },
                { name: 'shipping.shippingCost', type: 'text', label: 'Shipping Cost', example: 'Free shipping above ₹999' },
                { name: 'careInstructions', type: 'textarea', label: 'Care Instructions', example: 'Wipe with dry cloth only. Keep away from direct sunlight and moisture. Use wood polish occasionally to maintain shine.' },
                { name: 'features', type: 'text', label: 'Features (comma separated)', example: 'Handcrafted by skilled artisans, Intricate rose pattern carving, Soft velvet interior lining, Brass hinges and clasp, Personalization available, Gift wrapping included' }
            ]}
        ]
    },
    'categories': {
        title: 'Categories',
        description: 'Manage your product categories',
        fields: [
            { name: 'categories', type: 'array', label: 'Categories', itemFields: [
                { name: 'name', type: 'text', label: 'Category Name', example: 'Gift Hamper' },
                { name: 'description', type: 'textarea', label: 'Description', example: 'Curated collections of premium items beautifully packaged for the perfect gifting experience.' },
                { name: 'image', type: 'text', label: 'Image URL', example: '/elegant-gift-boxes-with-pink-ribbons-on-white-back.jpg' },
                { name: 'href', type: 'text', label: 'Link URL', example: '/gifts?category=gift-hamper' }
            ]}
        ]
    },
    'occasions': {
        title: 'Occasions',
        description: 'Manage shopping occasions',
        fields: [
            { name: 'occasions', type: 'array', label: 'Occasions', itemFields: [
                { name: 'name', type: 'text', label: 'Occasion Name', example: 'Anniversary' },
                { name: 'description', type: 'textarea', label: 'Description', example: 'Celebrate your love story with personalized keepsakes that capture your cherished memories.' },
                { name: 'image', type: 'text', label: 'Image URL', example: '/anniversary-gifts-romantic-setup.jpg' },
                { name: 'href', type: 'text', label: 'Link URL', example: '/gifts?occasion=anniversary' }
            ]}
        ]
    },
    'testimonials': {
        title: 'Testimonials',
        description: 'Manage customer testimonials',
        fields: [
            { name: 'testimonials', type: 'array', label: 'Testimonials', itemFields: [
                { name: 'id', type: 'text', label: 'Testimonial ID', example: '1' },
                { name: 'name', type: 'text', label: 'Customer Name', example: 'Priya Sharma' },
                { name: 'location', type: 'text', label: 'Location', example: 'Mumbai, Anniversary Gift' },
                { name: 'rating', type: 'number', label: 'Rating (1-5)', example: '5' },
                { name: 'comment', type: 'textarea', label: 'Customer Comment', example: 'The memory album they created for our 10th anniversary was absolutely breathtaking. Every page told our story beautifully, and my husband was moved to tears. It\'s now our most treasured possession.' },
                { name: 'image', type: 'text', label: 'Customer Photo URL', example: '/woman-smiling-testimonial-photo.jpg' }
            ]}
        ]
    },
    'about': {
        title: 'About Page',
        description: 'Manage your about page content',
        fields: [
            { name: 'about.title', type: 'text', label: 'Page Title', example: 'About The Tohfa Creations' },
            { name: 'about.subtitle', type: 'text', label: 'Subtitle', example: 'Love & Craftsmanship' },
            { name: 'about.description', type: 'textarea', label: 'Main Description', example: 'Founded in 2016, The Tohfa Creations began as a small dream to create meaningful connections through handcrafted artistry. Every piece we create carries the passion and dedication of our skilled artisan team.' },
            { name: 'about.learnJourneyText', type: 'text', label: 'Learn Journey Button Text', example: 'Learn Our Journey' },
            { name: 'about.story.title', type: 'text', label: 'Story Title', example: 'Our Story' },
            { name: 'about.story.paragraphs', type: 'textarea', label: 'Story Paragraphs (one per line)', example: 'It all started in 2016 when our founder, Sarah Martinez, created a handcrafted memory album for her parents\' 40th wedding anniversary. What began as a personal project to capture their love story quickly became something more—a realization that every family has precious moments worth preserving in a beautiful, meaningful way.' },
            { name: 'about.mission.title', type: 'text', label: 'Mission Title', example: 'Our Mission' },
            { name: 'about.mission.content', type: 'textarea', label: 'Mission Content', example: 'To create beautiful, personalized handmade gifts that capture life\'s most precious moments and bring joy to both giver and receiver. We strive to make every gift a cherished memory that lasts a lifetime.' },
            { name: 'about.whyChoose', type: 'array', label: 'Why Choose Us', itemFields: [
                { name: 'icon', type: 'text', label: 'Icon Name', example: 'Heart' },
                { name: 'title', type: 'text', label: 'Title', example: 'Premium Quality' },
                { name: 'description', type: 'textarea', label: 'Description', example: 'We use only the finest materials and artisanal craftsmanship techniques to ensure every gift is built to last generations.' },
                { name: 'link', type: 'text', label: 'Link Text', example: '100% Customer Satisfaction' }
            ]},
            { name: 'about.values', type: 'array', label: 'Company Values', itemFields: [
                { name: 'icon', type: 'text', label: 'Icon Name', example: 'Heart' },
                { name: 'title', type: 'text', label: 'Title', example: 'Love in Every Detail' },
                { name: 'description', type: 'textarea', label: 'Description', example: 'We pour genuine care and attention into every aspect of our craft, ensuring each gift carries the love it\'s meant to express.' }
            ]}
        ]
    },
    'contact': {
        title: 'Contact Information',
        description: 'Manage your contact details',
        fields: [
            { name: 'contact.title', type: 'text', label: 'Contact Page Title', example: 'Contact Us' },
            { name: 'contact.description', type: 'textarea', label: 'Contact Page Description', example: 'Have a question or want to discuss a custom gift? We\'d love to hear from you!' },
            { name: 'contact.phone', type: 'text', label: 'Phone Number', example: '+91 98765 43210' },
            { name: 'contact.address', type: 'textarea', label: 'Business Address', example: '123 Craft Street, Artisan Colony, Mumbai, Maharashtra 400001' },
            { name: 'contact.email', type: 'text', label: 'Email Address', example: 'hello@tohfacreations.com' },
            { name: 'contact.hours.weekdays', type: 'text', label: 'Weekday Hours', example: 'Monday - Friday: 10:00 AM - 7:00 PM' },
            { name: 'contact.hours.saturday', type: 'text', label: 'Saturday Hours', example: 'Saturday: 10:00 AM - 5:00 PM' },
            { name: 'contact.hours.sunday', type: 'text', label: 'Sunday Hours', example: 'Sunday: Closed' },
            { name: 'contact.connectWithUs.title', type: 'text', label: 'Connect With Us Title', example: 'Connect With Us' },
            { name: 'contact.connectWithUs.description', type: 'textarea', label: 'Connect With Us Description', example: 'Follow us on social media for inspiration, behind-the-scenes content, and special offers.' },
            { name: 'contact.socialMedia', type: 'array', label: 'Social Media Links', itemFields: [
                { name: 'platform', type: 'text', label: 'Platform Name', example: 'Facebook' },
                { name: 'followers', type: 'text', label: 'Followers Count', example: '12.5K followers' },
                { name: 'link', type: 'text', label: 'Social Media Link', example: 'https://facebook.com/tohfacreations' }
            ]},
            { name: 'contact.recentPosts', type: 'array', label: 'Recent Posts', itemFields: [
                { name: 'platform', type: 'text', label: 'Platform', example: 'Instagram' },
                { name: 'timeAgo', type: 'text', label: 'Time Ago', example: '2 hours ago' },
                { name: 'content', type: 'textarea', label: 'Post Content', example: 'Just finished this beautiful custom jewelry box for Sarah\'s anniversary gift! 🎁' },
                { name: 'image', type: 'text', label: 'Post Image', example: '/recent-post-1.jpg' },
                { name: 'redirectLink', type: 'text', label: 'Post Link', example: 'https://instagram.com/p/XYZ123' }
            ]}
        ]
    },
    'site-config': {
        title: 'Site Configuration',
        description: 'Manage website settings',
        fields: [
            { name: 'siteConfig.siteName', type: 'text', label: 'Site Name', example: 'The Tohfa Creations' },
            { name: 'siteConfig.tagline', type: 'text', label: 'Tagline', example: 'Handcrafted Gifts, Personalized with Love' },
            { name: 'siteConfig.description', type: 'textarea', label: 'Description', example: 'Handcrafted with love, personalized with care. Find the perfect gift to celebrate life\'s most precious moments.' },
            { name: 'siteConfig.logo', type: 'text', label: 'Logo URL', example: '/logo.png' },
            { name: 'siteConfig.favicon', type: 'text', label: 'Favicon URL', example: '/favicon.ico' },
            { name: 'siteConfig.hero.title', type: 'text', label: 'Hero Title', example: 'The Tohfa Creations' },
            { name: 'siteConfig.hero.subtitle', type: 'text', label: 'Hero Subtitle', example: 'One Stop Gifting Solution' },
            { name: 'siteConfig.hero.description', type: 'textarea', label: 'Hero Description', example: 'Create unforgettable moments with our bespoke handcrafted gifts. Each piece is artistically designed to tell stories and spread joy to celebrate life\'s most precious milestones.' },
            { name: 'siteConfig.hero.backgroundImage', type: 'text', label: 'Hero Background Image', example: '/hero.bg.png' },
            { name: 'siteConfig.hero.browseGiftsText', type: 'text', label: 'Browse Gifts Text', example: 'Browse Gifts' },
            { name: 'siteConfig.navigation', type: 'array', label: 'Navigation Items', itemFields: [
                { name: 'name', type: 'text', label: 'Menu Item Name', example: 'Home' },
                { name: 'href', type: 'text', label: 'Link URL', example: '/' }
            ]},
            { name: 'siteConfig.seo.keywords', type: 'text', label: 'SEO Keywords', example: 'handmade gifts, personalized gifts, custom gifts, anniversary gifts, birthday gifts, wedding gifts, handmade crafts' },
            { name: 'siteConfig.seo.author', type: 'text', label: 'SEO Author', example: 'The Tohfa Creations' }
        ]
    },
    'custom-menu': {
        title: 'Custom Menu',
        description: 'Manage custom menus for special occasions',
        fields: [
            { name: 'customMenus', type: 'array', label: 'Custom Menus', itemFields: [
                { name: 'id', type: 'text', label: 'Menu ID', example: '1' },
                { name: 'name', type: 'text', label: 'Menu Name', example: 'Wedding Special Menu' },
                { name: 'description', type: 'textarea', label: 'Menu Description', example: 'Special collection of wedding gifts and personalized items for the perfect celebration.' },
                { name: 'items', type: 'array', label: 'Menu Items', itemFields: [
                    { name: 'id', type: 'text', label: 'Item ID', example: '1' },
                    { name: 'name', type: 'text', label: 'Item Name', example: 'Wedding Photo Album' },
                    { name: 'price', type: 'number', label: 'Price (₹)', example: '2999' },
                    { name: 'description', type: 'textarea', label: 'Item Description', example: 'Beautiful photo album perfect for wedding memories.' },
                    { name: 'category', type: 'text', label: 'Category', example: 'gift-box' },
                    { name: 'image', type: 'text', label: 'Item Image', example: '/wedding-photo-album.jpg' }
                ]},
                { name: 'isActive', type: 'checkbox', label: 'Menu Active', example: 'true' }
            ]}
        ]
    }
};

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
                "sizes": [
                    {
                        "id": "(6 x 4 x 6)",
                        "name": "(6 x 4 x 6)",
                        "price": 5499,
                        "originalPrice": 6999,
                        "inStock": true,
                        "description": "Perfect for small jewelry items (6 x 4 x 6 inches)"
                    },
                    {
                        "id": "(8 x 6 x 4)",
                        "name": "(8 x 6 x 4)",
                        "price": 7499,
                        "originalPrice": 9999,
                        "inStock": true,
                        "description": "Ideal for most jewelry collections (8 x 6 x 4 inches)"
                    },
                    {
                        "id": "(10 x 8 x 6)",
                        "name": "(10 x 8 x 6)",
                        "price": 9999,
                        "originalPrice": 12999,
                        "inStock": true,
                        "description": "Spacious for extensive collections (10 x 8 x 6 inches)"
                    }
                ],
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
    'footer': {
        "_instructions": "Manage website footer content here.",
        "_fields": {
            "companyName": "Your company name",
            "companyDescription": "Brief description of your company",
            "quickLinksTitle": "Title for quick links section",
            "contactInfoTitle": "Title for contact info section", 
            "followUsTitle": "Title for social media section",
            "socialMedia.platform": "Social media platform name",
            "socialMedia.link": "Social media profile link",
            "copyright": "Copyright notice text"
        },
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
                        "content": "Just finished this beautiful custom jewelry box for Sarah's anniversary gift! ",
                        "image": "/recent-post-1.jpg",
                        "redirectLink": "https://instagram.com/p/XYZ123"
                    },
                    {
                        "platform": "Facebook",
                        "timeAgo": "1 day ago", 
                        "content": "Behind the scenes: Creating magic one piece at a time in our studio ",
                        "image": "/recent-post-2.jpg",
                        "redirectLink": "https://facebook.com/tohfacreations/posts/ABC456"
                    },
                    {
                        "platform": "Instagram",
                        "timeAgo": "3 days ago",
                        "content": "Emily's reaction when she received her custom photo album was priceless. ",
                        "image": "/recent-post-3.jpg",
                        "redirectLink": "https://instagram.com/p/DEF789"
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
                    "sizes": [
                        {
                            "id": "(6 x 4 x 6)",
                            "name": "(6 x 4 x 6)",
                            "price": 5499,
                            "originalPrice": 6999,
                            "inStock": true,
                            "description": "Perfect for small jewelry items (6 x 4 x 6 inches)"
                        },
                        {
                            "id": "(8 x 6 x 4)",
                            "name": "(8 x 6 x 4)",
                            "price": 7499,
                            "originalPrice": 9999,
                            "inStock": true,
                            "description": "Ideal for most jewelry collections (8 x 6 x 4 inches)"
                        },
                        {
                            "id": "(10 x 8 x 6)",
                            "name": "(10 x 8 x 6)",
                            "price": 9999,
                            "originalPrice": 12999,
                            "inStock": true,
                            "description": "Spacious for extensive collections (10 x 8 x 6 inches)"
                        }
                    ],
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
        'footer': {
            "_instructions": "Manage website footer content here.",
            "_fields": {
                "companyName": "Your company name",
                "companyDescription": "Brief description of your company",
                "quickLinksTitle": "Title for quick links section",
                "contactInfoTitle": "Title for contact info section", 
                "followUsTitle": "Title for social media section",
                "socialMedia.platform": "Social media platform name",
                "socialMedia.link": "Social media profile link",
                "copyright": "Copyright notice text"
            },
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

// Form-based Manager Functions
function openFormManager(type) {
    currentFormManager = type;
    document.getElementById('dataGrid').style.display = 'none';
    document.getElementById('formManagerSection').style.display = 'block';
    
    const config = formFields[type];
    document.getElementById('formManagerTitle').textContent = config.title;
    document.getElementById('formManagerDescription').textContent = config.description;
    
    generateFormFields(config.fields);
    document.getElementById('jsonOutputSection').style.display = 'none';
}

function closeFormManager() {
    document.getElementById('formManagerSection').style.display = 'none';
    document.getElementById('dataGrid').style.display = 'grid';
    currentFormManager = null;
}

function generateFormFields(fields) {
    const container = document.getElementById('formContainer');
    container.innerHTML = '';
    
    // Special handling for products form
    if (currentFormManager === 'products') {
        generateCustomProductForm();
        return;
    }
    
    fields.forEach(field => {
        if (field.type === 'array') {
            generateArrayField(field);
        } else {
            generateSimpleField(field);
        }
    });
}

function generateCustomProductForm() {
    const container = document.getElementById('formContainer');
    
    // Top Selling Section
    const topSellingSection = document.createElement('div');
    topSellingSection.innerHTML = `
        <h3>Top Selling Products</h3>
        <div class="form-group">
            <label>Top Selling Title <span class="field-example">(Example: Top Selling Gifts)</span></label>
            <input type="text" id="topSelling.title" placeholder="Top Selling Gifts">
        </div>
        <div class="form-group">
            <label>Top Selling Description <span class="field-example">(Example: Discover our most loved and highly-rated gifts...)</span></label>
            <textarea id="topSelling.description" placeholder="Discover your most loved and highly-rated gifts..."></textarea>
        </div>
        <div class="form-group">
            <label>Top Selling Product IDs (comma separated) <span class="field-example">(Example: 1, 2, 3, 4, 5, 6, 7, 8)</span></label>
            <input type="text" id="topSelling.productIds" placeholder="1, 2, 3, 4, 5, 6, 7, 8">
        </div>
    `;
    container.appendChild(topSellingSection);
    
    // Products Section
    const productsSection = document.createElement('div');
    productsSection.innerHTML = `
        <h3>Products</h3>
        <div id="products_container" class="array-container">
            <!-- Products will be added here -->
        </div>
        <button class="add-item-btn" onclick="addProduct()">+ Add Product</button>
    `;
    container.appendChild(productsSection);
    
    // Add one initial product
    addProduct(0);
}

function addProduct(index = null) {
    const container = document.getElementById('products_container');
    const productIndex = index !== null ? index : container.children.length;
    
    const productDiv = document.createElement('div');
    productDiv.className = 'array-item';
    productDiv.innerHTML = `
        <div class="array-item-header">
            <span class="array-item-title">Product ${productIndex + 1}</span>
            <button class="remove-item-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        
        <div class="form-group">
            <label>Product ID <span class="field-example">(Example: 1)</span></label>
            <input type="text" name="products[${productIndex}].id" placeholder="1">
        </div>
        
        <div class="form-group">
            <label>Product Name <span class="field-example">(Example: Vintage Rose Jewelry Box)</span></label>
            <input type="text" name="products[${productIndex}].name" placeholder="Vintage Rose Jewelry Box">
        </div>
        
        <div class="form-group">
            <label>Description <span class="field-example">(Example: Handcrafted wooden jewelry box...)</span></label>
            <textarea name="products[${productIndex}].description" placeholder="Handcrafted wooden jewelry box with intricate rose patterns..."></textarea>
        </div>
        
        <div class="form-group">
            <label>Images (comma separated) <span class="field-example">(Example: /image1.jpg, /image2.jpg)</span></label>
            <input type="text" name="products[${productIndex}].images" placeholder="/vintage-wooden-jewelry-box-with-rose-patterns.jpg, /vintage-wooden-jewelry-box-side-view.jpg">
        </div>
        
        <div class="form-group">
            <label>GIF URL <span class="field-example">(Example: )</span></label>
            <input type="text" name="products[${productIndex}].gif" placeholder="">
        </div>
        
        <div class="form-group">
            <label>Video URL <span class="field-example">(Example: )</span></label>
            <input type="text" name="products[${productIndex}].video" placeholder="">
        </div>
        
        <div class="form-group">
            <label>Category</label>
            <select name="products[${productIndex}].category">
                <option value="gift-hamper">Gift Hamper</option>
                <option value="gift-box" selected>Gift Box</option>
                <option value="bouquet">Bouquet</option>
                <option value="miniature">Miniature</option>
                <option value="frame">Frame</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Occasion</label>
            <select name="products[${productIndex}].occasion">
                <option value="anniversary" selected>Anniversary</option>
                <option value="birthday">Birthday</option>
                <option value="proposal">Proposal</option>
                <option value="wedding">Wedding</option>
                <option value="graduation">Graduation</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>Rating (1-5) <span class="field-example">(Example: 4.8)</span></label>
            <input type="number" name="products[${productIndex}].rating" placeholder="4.8" step="0.1" min="1" max="5">
        </div>
        
        <div class="form-group">
            <label>Review Count <span class="field-example">(Example: 127)</span></label>
            <input type="number" name="products[${productIndex}].reviewCount" placeholder="127">
        </div>
        
        <div class="form-group">
            <label>Customization Level</label>
            <select name="products[${productIndex}].customizationLevel">
                <option value="basic">Basic</option>
                <option value="standard">Standard</option>
                <option value="premium" selected>Premium</option>
            </select>
        </div>
        
        <div class="form-group">
            <label>
                <input type="checkbox" name="products[${productIndex}].inStock" checked> In Stock
            </label>
        </div>
        
        <!-- Sizes Section with Custom UI -->
        <div class="form-group">
            <label>Product Sizes & Pricing</label>
            <div id="sizes_${productIndex}_container" class="array-container">
                <!-- Sizes will be added here -->
            </div>
            <button class="add-item-btn" onclick="addSize(${productIndex})">+ Add Size</button>
        </div>
        
        <div class="form-group">
            <label>Material <span class="field-example">(Example: Premium Wood with Velvet Interior)</span></label>
            <input type="text" name="products[${productIndex}].specifications.material" placeholder="Premium Wood with Velvet Interior">
        </div>
        
        <div class="form-group">
            <label>Weight <span class="field-example">(Example: 500 grams)</span></label>
            <input type="text" name="products[${productIndex}].specifications.weight" placeholder="500 grams">
        </div>
        
        <div class="form-group">
            <label>Color <span class="field-example">(Example: Natural Wood Finish with Red Roses)</span></label>
            <input type="text" name="products[${productIndex}].specifications.color" placeholder="Natural Wood Finish with Red Roses">
        </div>
        
        <div class="form-group">
            <label>Delivery Time <span class="field-example">(Example: 5-7 business days)</span></label>
            <input type="text" name="products[${productIndex}].shipping.delivery" placeholder="5-7 business days">
        </div>
        
        <div class="form-group">
            <label>Packaging <span class="field-example">(Example: Premium gift box included)</span></label>
            <input type="text" name="products[${productIndex}].shipping.packaging" placeholder="Premium gift box included">
        </div>
        
        <div class="form-group">
            <label>Shipping Cost <span class="field-example">(Example: Free shipping above ₹999)</span></label>
            <input type="text" name="products[${productIndex}].shipping.shippingCost" placeholder="Free shipping above ₹999">
        </div>
        
        <div class="form-group">
            <label>Care Instructions <span class="field-example">(Example: Wipe with dry cloth only...)</span></label>
            <textarea name="products[${productIndex}].careInstructions" placeholder="Wipe with dry cloth only. Keep away from direct sunlight and moisture..."></textarea>
        </div>
        
        <div class="form-group">
            <label>Features (comma separated) <span class="field-example">(Example: Handcrafted by skilled artisans, Intricate rose pattern...)</span></label>
            <input type="text" name="products[${productIndex}].features" placeholder="Handcrafted by skilled artisans, Intricate rose pattern carving, Soft velvet interior lining, Brass hinges and clasp, Personalization available, Gift wrapping included">
        </div>
    `;
    
    container.appendChild(productDiv);
    
    // Add initial sizes for this product
    if (index === 0) {
        addSize(productIndex, 0); // (6 x 4 x 6)
        addSize(productIndex, 1); // (8 x 6 x 4)  
        addSize(productIndex, 2); // (10 x 8 x 6)
    }
}

function addSize(productIndex, sizeIndex = null) {
    const container = document.getElementById(`sizes_${productIndex}_container`);
    const sizeIndexActual = sizeIndex !== null ? sizeIndex : container.children.length;
    
    const sizeDiv = document.createElement('div');
    sizeDiv.className = 'array-item size-item';
    sizeDiv.innerHTML = `
        <div class="array-item-header">
            <span class="array-item-title">Size ${sizeIndexActual + 1}</span>
            <button class="remove-item-btn" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        
        <div class="size-fields-row">
            <div class="form-group size-field">
                <label>Size ID <span class="field-example">(Example: (6 x 4 x 6))</span></label>
                <input type="text" name="products[${productIndex}].sizes[${sizeIndexActual}].id" placeholder="(6 x 4 x 6)">
            </div>
            
            <div class="form-group size-field">
                <label>Size Name <span class="field-example">(Example: (6 x 4 x 6))</span></label>
                <input type="text" name="products[${productIndex}].sizes[${sizeIndexActual}].name" placeholder="(6 x 4 x 6)">
            </div>
            
            <div class="form-group size-field">
                <label>Price (₹) <span class="field-example">(Example: 5499)</span></label>
                <input type="number" name="products[${productIndex}].sizes[${sizeIndexActual}].price" placeholder="5499">
            </div>
            
            <div class="form-group size-field">
                <label>Original Price (₹) <span class="field-example">(Example: 6999)</span></label>
                <input type="number" name="products[${productIndex}].sizes[${sizeIndexActual}].originalPrice" placeholder="6999">
            </div>
            
            <div class="form-group size-field">
                <label>
                    <input type="checkbox" name="products[${productIndex}].sizes[${sizeIndexActual}].inStock" checked> In Stock
                </label>
            </div>
        </div>
        
        <div class="form-group">
            <label>Size Description <span class="field-example">(Example: Perfect for small jewelry items...)</span></label>
            <input type="text" name="products[${productIndex}].sizes[${sizeIndexActual}].description" placeholder="Perfect for small jewelry items (6 x 4 x 3 inches)">
        </div>
    `;
    
    container.appendChild(sizeDiv);
}

function generateSimpleField(field) {
    const container = document.getElementById('formContainer');
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = field.label;
    
    // Add example if available
    if (field.example) {
        const exampleSpan = document.createElement('span');
        exampleSpan.className = 'field-example';
        exampleSpan.textContent = ` (Example: ${field.example})`;
        label.appendChild(exampleSpan);
    }
    
    formGroup.appendChild(label);
    
    let input;
    if (field.type === 'textarea') {
        input = document.createElement('textarea');
        if (field.example) {
            input.placeholder = field.example;
        }
    } else if (field.type === 'select') {
        input = document.createElement('select');
        field.options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            if (field.example && option === field.example) {
                optionElement.selected = true;
            }
            input.appendChild(optionElement);
        });
    } else if (field.type === 'checkbox') {
        input = document.createElement('input');
        input.type = 'checkbox';
        if (field.example === 'true') {
            input.checked = true;
        }
    } else {
        input = document.createElement('input');
        input.type = field.type;
        if (field.example) {
            input.placeholder = field.example;
        }
    }
    
    input.name = field.name;
    input.id = field.name;
    formGroup.appendChild(input);
    container.appendChild(formGroup);
}

function generateArrayField(field) {
    const container = document.getElementById('formContainer');
    const formGroup = document.createElement('div');
    formGroup.className = 'form-group';
    
    const label = document.createElement('label');
    label.textContent = field.label;
    formGroup.appendChild(label);
    
    const arrayContainer = document.createElement('div');
    arrayContainer.id = field.name + '_container';
    arrayContainer.className = 'array-container';
    
    // Add one initial item
    addArrayItem(field, arrayContainer, 0);
    
    // Add button to add more items
    const addButton = document.createElement('button');
    addButton.className = 'add-item-btn';
    addButton.textContent = '+ Add ' + field.label;
    addButton.onclick = () => addArrayItem(field, arrayContainer);
    
    formGroup.appendChild(arrayContainer);
    formGroup.appendChild(addButton);
    container.appendChild(formGroup);
}

function addArrayItem(field, container, index = null) {
    const itemIndex = index !== null ? index : container.children.length;
    const itemDiv = document.createElement('div');
    itemDiv.className = 'array-item';
    
    const header = document.createElement('div');
    header.className = 'array-item-header';
    
    const title = document.createElement('span');
    title.className = 'array-item-title';
    title.textContent = field.label + ' ' + (itemIndex + 1);
    header.appendChild(title);
    
    if (itemIndex > 0) {
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-item-btn';
        removeBtn.textContent = 'Remove';
        removeBtn.onclick = () => itemDiv.remove();
        header.appendChild(removeBtn);
    }
    
    itemDiv.appendChild(header);
    
    // Add fields for this array item
    field.itemFields.forEach(itemField => {
        const fieldGroup = document.createElement('div');
        fieldGroup.className = 'form-group';
        
        const fieldLabel = document.createElement('label');
        fieldLabel.textContent = itemField.label;
        
        // Add example if available
        if (itemField.example) {
            const exampleSpan = document.createElement('span');
            exampleSpan.className = 'field-example';
            exampleSpan.textContent = ` (Example: ${itemField.example})`;
            fieldLabel.appendChild(exampleSpan);
        }
        
        fieldGroup.appendChild(fieldLabel);
        
        // Handle nested arrays
        if (itemField.type === 'array') {
            const nestedArrayContainer = document.createElement('div');
            nestedArrayContainer.id = field.name + '_' + itemIndex + '_' + itemField.name + '_container';
            nestedArrayContainer.className = 'array-container';
            
            // Add one initial nested item
            addArrayItem(itemField, nestedArrayContainer, 0);
            
            // Add button to add more nested items
            const addNestedButton = document.createElement('button');
            addNestedButton.className = 'add-item-btn';
            addNestedButton.textContent = '+ Add ' + itemField.label;
            addNestedButton.onclick = () => addArrayItem(itemField, nestedArrayContainer);
            
            fieldGroup.appendChild(nestedArrayContainer);
            fieldGroup.appendChild(addNestedButton);
            itemDiv.appendChild(fieldGroup);
        } else {
            // Handle regular fields
            let input;
            if (itemField.type === 'textarea') {
                input = document.createElement('textarea');
                if (itemField.example) {
                    input.placeholder = itemField.example;
                }
            } else if (itemField.type === 'select') {
                input = document.createElement('select');
                itemField.options.forEach(option => {
                    const optionElement = document.createElement('option');
                    optionElement.value = option;
                    optionElement.textContent = option;
                    if (itemField.example && option === itemField.example) {
                        optionElement.selected = true;
                    }
                    input.appendChild(optionElement);
                });
            } else if (itemField.type === 'checkbox') {
                input = document.createElement('input');
                input.type = 'checkbox';
                if (itemField.example === 'true') {
                    input.checked = true;
                }
            } else {
                input = document.createElement('input');
                input.type = itemField.type;
                if (itemField.example) {
                    input.placeholder = itemField.example;
                }
            }
            
            input.name = field.name + '_' + itemIndex + '_' + itemField.name;
            input.id = field.name + '_' + itemIndex + '_' + itemField.name;
            fieldGroup.appendChild(input);
            itemDiv.appendChild(fieldGroup);
        }
    });
    
    if (index === null) {
        container.appendChild(itemDiv);
    } else {
        container.insertBefore(itemDiv, container.children[index]);
    }
}

function generateJSONFromForm() {
    // Special handling for products form
    if (currentFormManager === 'products') {
        const result = generateProductsJSON();
        const jsonOutput = document.getElementById('jsonOutput');
        jsonOutput.value = JSON.stringify(result, null, 2);
        document.getElementById('jsonOutputSection').style.display = 'block';
        return;
    }
    
    const config = formFields[currentFormManager];
    const result = {};
    
    config.fields.forEach(field => {
        if (field.type === 'array') {
            result[field.name] = getArrayData(field);
        } else {
            result[field.name] = getFieldValue(field.name);
        }
    });
    
    // Handle special case for contact to match exact structure
    if (currentFormManager === 'contact') {
        const contact = {};
        
        // Simple fields
        if (result['contact.title']) contact.title = result['contact.title'];
        if (result['contact.description']) contact.description = result['contact.description'];
        if (result['contact.phone']) contact.phone = result['contact.phone'];
        if (result['contact.address']) contact.address = result['contact.address'];
        if (result['contact.email']) contact.email = result['contact.email'];
        
        // Hours object
        if (result['contact.hours.weekdays'] || result['contact.hours.saturday'] || result['contact.hours.sunday']) {
            contact.hours = {};
            if (result['contact.hours.weekdays']) contact.hours.weekdays = result['contact.hours.weekdays'];
            if (result['contact.hours.saturday']) contact.hours.saturday = result['contact.hours.saturday'];
            if (result['contact.hours.sunday']) contact.hours.sunday = result['contact.hours.sunday'];
        }
        
        // Connect With Us object
        if (result['contact.connectWithUs.title'] || result['contact.connectWithUs.description']) {
            contact.connectWithUs = {};
            if (result['contact.connectWithUs.title']) contact.connectWithUs.title = result['contact.connectWithUs.title'];
            if (result['contact.connectWithUs.description']) contact.connectWithUs.description = result['contact.connectWithUs.description'];
        }
        
        // Social Media array
        if (result['contact.socialMedia']) contact.socialMedia = result['contact.socialMedia'];
        
        // Recent Posts object
        if (result['contact.recentPosts.title'] || result['contact.recentPosts.description'] || result['contact.recentPosts']) {
            contact.recentPosts = {};
            if (result['contact.recentPosts.title']) contact.recentPosts.title = result['contact.recentPosts.title'];
            if (result['contact.recentPosts.description']) contact.recentPosts.description = result['contact.recentPosts.description'];
            if (result['contact.recentPosts']) contact.recentPosts.posts = result['contact.recentPosts'];
        }
        
        result.contact = contact;
    }
    
    const jsonOutput = document.getElementById('jsonOutput');
    jsonOutput.value = JSON.stringify(result, null, 2);
    document.getElementById('jsonOutputSection').style.display = 'block';
}

function getArrayData(field) {
    const container = document.getElementById(field.name + '_container');
    const items = [];
    
    Array.from(container.children).forEach((itemDiv, index) => {
        const itemData = {};
        field.itemFields.forEach(itemField => {
            const inputName = field.name + '_' + index + '_' + itemField.name;
            const value = getFieldValue(inputName);
            if (itemField.type === 'number') {
                itemData[itemField.name] = parseFloat(value) || 0;
            } else if (itemField.type === 'checkbox') {
                itemData[itemField.name] = getFieldValue(inputName);
            } else if (itemField.type === 'array') {
                // Handle nested arrays
                const nestedContainer = document.getElementById(inputName + '_container');
                if (nestedContainer) {
                    itemData[itemField.name] = getArrayData({
                        name: inputName,
                        itemFields: itemField.itemFields
                    });
                }
            } else if (itemField.type.includes('text') || itemField.type === 'textarea') {
                if (itemField.name.includes('.')) {
                    setNestedValue(itemData, itemField.name, value);
                } else {
                    itemData[itemField.name] = value;
                }
            }
        });
        items.push(itemData);
    });
    
    return items;
}

function setNestedValue(obj, path, value) {
    const keys = path.split('.');
    let current = obj;
    
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) {
            current[keys[i]] = {};
        }
        current = current[keys[i]];
    }
    
    current[keys[keys.length - 1]] = value;
}

function getFieldValue(fieldName) {
    const element = document.querySelector(`[name="${fieldName}"]`) || document.getElementById(fieldName);
    if (!element) return '';
    
    if (element.type === 'checkbox') {
        return element.checked;
    } else if (element.type === 'number') {
        return parseFloat(element.value) || 0;
    } else {
        return element.value;
    }
}

function resetForm() {
    const container = document.getElementById('formContainer');
    container.innerHTML = '';
    
    const config = formFields[currentFormManager];
    generateFormFields(config.fields);
    document.getElementById('jsonOutputSection').style.display = 'none';
}

function downloadGeneratedJSON() {
    const jsonOutput = document.getElementById('jsonOutput');
    const jsonData = JSON.parse(jsonOutput.value);
    
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = currentFormManager + '.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateProductsJSON() {
    const result = {
        topSelling: {
            title: getFieldValue('topSelling.title'),
            description: getFieldValue('topSelling.description'),
            productIds: getFieldValue('topSelling.productIds').split(',').map(id => id.trim()).filter(id => id)
        },
        products: []
    };
    
    // Get all products
    const productContainers = document.querySelectorAll('#products_container > .array-item');
    
    productContainers.forEach((productDiv, productIndex) => {
        const product = {
            id: getFieldValue(`products[${productIndex}].id`),
            name: getFieldValue(`products[${productIndex}].name`),
            description: getFieldValue(`products[${productIndex}].description`),
            images: getFieldValue(`products[${productIndex}].images`).split(',').map(img => img.trim()).filter(img => img),
            gif: getFieldValue(`products[${productIndex}].gif`),
            video: getFieldValue(`products[${productIndex}].video`),
            category: getFieldValue(`products[${productIndex}].category`),
            occasion: getFieldValue(`products[${productIndex}].occasion`),
            rating: parseFloat(getFieldValue(`products[${productIndex}].rating`)) || 0,
            reviewCount: parseInt(getFieldValue(`products[${productIndex}].reviewCount`)) || 0,
            customizationLevel: getFieldValue(`products[${productIndex}].customizationLevel`),
            inStock: getFieldValue(`products[${productIndex}].inStock`),
            sizes: [],
            specifications: {
                material: getFieldValue(`products[${productIndex}].specifications.material`),
                weight: getFieldValue(`products[${productIndex}].specifications.weight`),
                color: getFieldValue(`products[${productIndex}].specifications.color`)
            },
            shipping: {
                delivery: getFieldValue(`products[${productIndex}].shipping.delivery`),
                packaging: getFieldValue(`products[${productIndex}].shipping.packaging`),
                shippingCost: getFieldValue(`products[${productIndex}].shipping.shippingCost`)
            },
            careInstructions: getFieldValue(`products[${productIndex}].careInstructions`),
            features: getFieldValue(`products[${productIndex}].features`).split(',').map(feature => feature.trim()).filter(feature => feature)
        };
        
        // Get all sizes for this product
        const sizesContainer = document.getElementById(`sizes_${productIndex}_container`);
        if (sizesContainer) {
            const sizeDivs = sizesContainer.querySelectorAll('.size-item');
            
            sizeDivs.forEach((sizeDiv, sizeIndex) => {
                const size = {
                    id: getFieldValue(`products[${productIndex}].sizes[${sizeIndex}].id`),
                    name: getFieldValue(`products[${productIndex}].sizes[${sizeIndex}].name`),
                    price: parseFloat(getFieldValue(`products[${productIndex}].sizes[${sizeIndex}].price`)) || 0,
                    originalPrice: parseFloat(getFieldValue(`products[${productIndex}].sizes[${sizeIndex}].originalPrice`)) || 0,
                    inStock: getFieldValue(`products[${productIndex}].sizes[${sizeIndex}].inStock`),
                    description: getFieldValue(`products[${productIndex}].sizes[${sizeIndex}].description`)
                };
                product.sizes.push(size);
            });
        }
        
        result.products.push(product);
    });
    
    return result;
}
