import { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, Legend
} from "recharts";
import {
  LayoutDashboard, DollarSign, Heart, Building2, Baby, BookOpen,
  PenTool, TrendingUp, Plus, Check, ChevronDown, ChevronRight,
  Target, Scale, ShoppingCart, Youtube, Mic, Instagram, Linkedin,
  X, Edit3, ArrowUpRight, ArrowDownRight, Minus, Clock, Flame,
  Apple, Dumbbell, AlertCircle, Star, BookOpenCheck, BarChart3,
  Calendar, Briefcase, Mic2, MapPin, Plane, Users, Layers, Zap, Menu,
  Lock, Search, GripVertical, ArrowRight, LogOut
} from "lucide-react";

const C = { fire: "#F56640", gold: "#FAAB33", green: "#009470", sky: "#9CCFD9", slate: "#0D1726", greige: "#F5F2ED", darkGreige: "#DED6CC", white: "#FFFFFF" };

const TABS = [
  { id: "command", label: "Command Center", icon: LayoutDashboard },
  { id: "money", label: "Money", icon: DollarSign },
  { id: "body", label: "Body Goals", icon: Heart },
  { id: "empire", label: "Empire", icon: Building2 },
  { id: "babies", label: "Babies", icon: Baby },
  { id: "books", label: "Book Sales", icon: BookOpen },
  { id: "content", label: "Content", icon: PenTool },
  { id: "growth", label: "Growth", icon: TrendingUp },
  { id: "agents", label: "Agent Team", icon: Users },
];

const INITIAL_INCOME = [
  { id: 1, source: "Stan", type: "recurring", amount: 4200, month: "Nov 2025", notes: "Digital products — early months" },
  { id: 2, source: "Stan", type: "recurring", amount: 5800, month: "Dec 2025", notes: "Holiday surge — digital products" },
  { id: 3, source: "Stan", type: "recurring", amount: 10779, month: "Jan 2026", notes: "Growth month — Retire Early Calc + Wealth Dashboard + AI Agents 101" },
  { id: 4, source: "Stan", type: "recurring", amount: 12207, month: "Feb 2026", notes: "$12,207 last 14 days (285% up) — 1,151 store visits" },
  { id: 5, source: "Substack", type: "recurring", amount: 340, month: "Nov 2025", notes: "~32 paid subs at the time" },
  { id: 6, source: "Substack", type: "recurring", amount: 370, month: "Dec 2025", notes: "Growing paid base" },
  { id: 7, source: "Substack", type: "recurring", amount: 396, month: "Jan 2026", notes: "54 paid subs · $4,752 annualized (up 58.6%)" },
  { id: 8, source: "Substack", type: "recurring", amount: 396, month: "Feb 2026", notes: "3,264 total subs (up 47.4%)" },
  { id: 9, source: "Patreon", type: "recurring", amount: 0, month: "Feb 2026", notes: "⚠️ Need to connect — Patreon blocked by browser" },
  { id: 10, source: "Brand Deal", type: "one-time", amount: 65000, month: "Q1 2026", notes: "Adobe — content partnership (active)" },
  { id: 11, source: "Brand Deal", type: "one-time", amount: 33000, month: "Q1 2026", notes: "Lenovo — product + content (active)" },
];

const MEAL_PLAN = [
  { day: "Monday", meals: [
    { type: "Breakfast", name: "Greek Yogurt Power Bowl", desc: "Greek yogurt, mixed berries, hemp seeds, granola, drizzle of honey", cal: 420, protein: 28 },
    { type: "Snack", name: "Apple + Almond Butter", desc: "1 apple sliced with 2 tbsp almond butter", cal: 250, protein: 7 },
    { type: "Lunch", name: "Grilled Chicken Power Bowl", desc: "Chicken breast, quinoa, roasted sweet potato, spinach, avocado, lemon tahini", cal: 520, protein: 42 },
    { type: "Snack", name: "Protein Shake", desc: "Protein powder, banana, peanut butter, almond milk", cal: 310, protein: 30 },
    { type: "Dinner", name: "Herb Salmon & Veggies", desc: "Salmon fillet with roasted broccoli and brown rice", cal: 480, protein: 36 },
  ]},
  { day: "Tuesday", meals: [
    { type: "Breakfast", name: "Spinach & Feta Omelette", desc: "2-egg omelette with spinach, feta, turkey sausage", cal: 380, protein: 32 },
    { type: "Snack", name: "Trail Mix", desc: "Almonds, walnuts, dark chocolate chips, dried cranberries", cal: 220, protein: 7 },
    { type: "Lunch", name: "Turkey Avocado Wraps", desc: "Turkey + avocado lettuce wraps with side salad", cal: 420, protein: 34 },
    { type: "Snack", name: "Cottage Cheese Bowl", desc: "Cottage cheese with pineapple chunks", cal: 200, protein: 22 },
    { type: "Dinner", name: "Turkey Stir-Fry", desc: "Ground turkey with bell peppers, broccoli, ginger soy over cauliflower rice", cal: 480, protein: 40 },
  ]},
  { day: "Wednesday", meals: [
    { type: "Breakfast", name: "Overnight Protein Oats", desc: "Oats, chia seeds, protein powder, banana, almond milk", cal: 420, protein: 32 },
    { type: "Snack", name: "Hummus & Veggies", desc: "Hummus with cucumber and carrot sticks", cal: 200, protein: 7 },
    { type: "Lunch", name: "Shrimp Tacos", desc: "2 shrimp tacos with cabbage slaw and lime crema on corn tortillas", cal: 460, protein: 32 },
    { type: "Snack", name: "Hard-Boiled Eggs", desc: "2 eggs with everything bagel seasoning", cal: 160, protein: 13 },
    { type: "Dinner", name: "Herb Chicken & Asparagus", desc: "Chicken breast with roasted asparagus and sweet potato", cal: 500, protein: 42 },
  ]},
  { day: "Thursday", meals: [
    { type: "Breakfast", name: "Berry Smoothie Bowl", desc: "Spinach, frozen berries, protein powder, topped with granola and coconut", cal: 400, protein: 30 },
    { type: "Snack", name: "String Cheese & Grapes", desc: "2 string cheese sticks with a handful of grapes", cal: 180, protein: 14 },
    { type: "Lunch", name: "Chicken Caesar Salad", desc: "Romaine, grilled chicken, parmesan, light Caesar dressing (skip croutons)", cal: 440, protein: 42 },
    { type: "Snack", name: "Rice Cakes", desc: "2 rice cakes with almond butter and banana slices", cal: 240, protein: 7 },
    { type: "Dinner", name: "Lemon Herb Cod", desc: "Baked cod with lemon herb quinoa and steamed green beans", cal: 450, protein: 36 },
  ]},
  { day: "Friday", meals: [
    { type: "Breakfast", name: "Protein Pancakes", desc: "2 protein pancakes with berries and light maple syrup", cal: 400, protein: 28 },
    { type: "Snack", name: "Edamame", desc: "1 cup steamed edamame with sea salt", cal: 190, protein: 17 },
    { type: "Lunch", name: "Mediterranean Bowl", desc: "Grilled chicken, farro, cucumber, tomato, olives, feta, lemon dressing", cal: 500, protein: 38 },
    { type: "Snack", name: "Protein Bar", desc: "Clean protein bar (RXBar or similar)", cal: 210, protein: 20 },
    { type: "Dinner", name: "Turkey Meatball Zoodles", desc: "Turkey meatballs over zucchini noodles with marinara", cal: 460, protein: 38 },
  ]},
  { day: "Saturday", meals: [
    { type: "Breakfast", name: "Avocado Toast + Eggs", desc: "Whole grain toast, mashed avocado, 2 eggs, everything seasoning", cal: 460, protein: 22 },
    { type: "Snack", name: "Yogurt & Walnuts", desc: "Greek yogurt with honey and crushed walnuts", cal: 260, protein: 20 },
    { type: "Lunch", name: "Salmon Poke Bowl", desc: "Salmon, brown rice, edamame, avocado, cucumber, soy ginger dressing", cal: 520, protein: 36 },
    { type: "Snack", name: "Celery & PB", desc: "Celery sticks with peanut butter", cal: 200, protein: 8 },
    { type: "Dinner", name: "Chicken & Brussels", desc: "Grilled chicken thighs with roasted Brussels sprouts and wild rice", cal: 500, protein: 40 },
  ]},
  { day: "Sunday", meals: [
    { type: "Breakfast", name: "Veggie Frittata", desc: "Eggs, spinach, bell peppers, onion, goat cheese", cal: 400, protein: 28 },
    { type: "Snack", name: "Berries & Almonds", desc: "Mixed berries with a handful of almonds", cal: 200, protein: 7 },
    { type: "Lunch", name: "Black Bean Soup", desc: "Black bean soup with avocado and whole grain toast", cal: 460, protein: 24 },
    { type: "Snack", name: "Turkey Roll-Ups", desc: "Turkey deli slices with cream cheese and cucumber", cal: 200, protein: 18 },
    { type: "Dinner", name: "Salmon & Sweet Potato", desc: "Herb salmon with sweet potato mash and sauteed kale", cal: 500, protein: 38 },
  ]},
];

const GROCERY = [
  { category: "Proteins", items: ["Chicken breast (3 lbs)", "Salmon fillets (4)", "Ground turkey (2 lbs)", "Shrimp (1 lb)", "Cod fillets (2)", "Eggs (2 dozen)", "Turkey sausage (1 pack)", "Turkey deli slices (1 pack)"] },
  { category: "Dairy", items: ["Greek yogurt (32 oz)", "Feta cheese", "Cottage cheese (16 oz)", "String cheese (12 pack)", "Goat cheese", "Cream cheese", "Parmesan"] },
  { category: "Grains", items: ["Quinoa (1 bag)", "Brown rice (1 bag)", "Old fashioned oats", "Whole grain bread", "Farro", "Rice cakes", "Granola (low sugar)", "Corn tortillas"] },
  { category: "Produce", items: ["Spinach (2 bags)", "Broccoli (2 heads)", "Sweet potatoes (4)", "Avocados (6)", "Bell peppers (4)", "Asparagus (1 bunch)", "Zucchini (3)", "Brussels sprouts (1 lb)", "Kale (1 bunch)", "Cucumbers (3)", "Tomatoes (4)", "Cabbage (1 small)", "Green beans (1 lb)", "Onions (3)", "Carrots (1 bag)", "Celery (1 bunch)", "Romaine lettuce (2 heads)", "Bananas (6)", "Mixed berries (2 pints)", "Apples (4)", "Pineapple (1)", "Grapes (1 bunch)", "Lemons (4)", "Limes (4)"] },
  { category: "Pantry", items: ["Almond butter", "Peanut butter", "Hummus", "Olive oil", "Soy sauce (low sodium)", "Marinara sauce", "Everything bagel seasoning", "Chia seeds", "Hemp seeds", "Protein powder (vanilla)", "Almonds", "Walnuts", "Trail mix", "Dark chocolate chips", "Olives (kalamata)", "Edamame (frozen)", "Black beans (2 cans)", "Honey", "Maple syrup", "Dried cranberries", "Coconut flakes"] },
  { category: "Other", items: ["Almond milk (unsweetened)", "Protein bars (RXBar or similar, 7ct)", "Tahini", "Light Caesar dressing"] },
];

const FOOD_DB = [
  { name: "Greek Yogurt (1 cup)", cal: 150, protein: 15 },
  { name: "Greek Yogurt Power Bowl", cal: 420, protein: 28 },
  { name: "Chicken Breast (4 oz)", cal: 165, protein: 31 },
  { name: "Grilled Chicken Power Bowl", cal: 520, protein: 42 },
  { name: "Salmon Fillet (4 oz)", cal: 208, protein: 20 },
  { name: "Herb Salmon & Veggies", cal: 480, protein: 36 },
  { name: "Salmon Poke Bowl", cal: 520, protein: 36 },
  { name: "Egg (1 large)", cal: 72, protein: 6 },
  { name: "Hard-Boiled Eggs (2)", cal: 160, protein: 13 },
  { name: "Spinach & Feta Omelette", cal: 380, protein: 32 },
  { name: "Avocado Toast + Eggs", cal: 460, protein: 22 },
  { name: "Veggie Frittata", cal: 400, protein: 28 },
  { name: "Protein Shake", cal: 310, protein: 30 },
  { name: "Protein Pancakes (2)", cal: 400, protein: 28 },
  { name: "Protein Bar (RXBar)", cal: 210, protein: 20 },
  { name: "Overnight Protein Oats", cal: 420, protein: 32 },
  { name: "Apple + Almond Butter", cal: 250, protein: 7 },
  { name: "Trail Mix (1/4 cup)", cal: 220, protein: 7 },
  { name: "Hummus & Veggies", cal: 200, protein: 7 },
  { name: "Rice Cakes + Almond Butter", cal: 240, protein: 7 },
  { name: "Edamame (1 cup)", cal: 190, protein: 17 },
  { name: "String Cheese & Grapes", cal: 180, protein: 14 },
  { name: "Celery & Peanut Butter", cal: 200, protein: 8 },
  { name: "Berries & Almonds", cal: 200, protein: 7 },
  { name: "Cottage Cheese Bowl", cal: 200, protein: 22 },
  { name: "Turkey Roll-Ups", cal: 200, protein: 18 },
  { name: "Yogurt & Walnuts", cal: 260, protein: 20 },
  { name: "Turkey Avocado Wraps", cal: 420, protein: 34 },
  { name: "Turkey Stir-Fry", cal: 480, protein: 40 },
  { name: "Turkey Meatball Zoodles", cal: 460, protein: 38 },
  { name: "Shrimp Tacos (2)", cal: 460, protein: 32 },
  { name: "Chicken Caesar Salad", cal: 440, protein: 42 },
  { name: "Chicken & Brussels", cal: 500, protein: 40 },
  { name: "Herb Chicken & Asparagus", cal: 500, protein: 42 },
  { name: "Mediterranean Bowl", cal: 500, protein: 38 },
  { name: "Lemon Herb Cod", cal: 450, protein: 36 },
  { name: "Black Bean Soup + Toast", cal: 460, protein: 24 },
  { name: "Berry Smoothie Bowl", cal: 400, protein: 30 },
  { name: "Banana (1 medium)", cal: 105, protein: 1 },
  { name: "Apple (1 medium)", cal: 95, protein: 0 },
  { name: "Brown Rice (1 cup cooked)", cal: 216, protein: 5 },
  { name: "Quinoa (1 cup cooked)", cal: 222, protein: 8 },
  { name: "Sweet Potato (1 medium)", cal: 103, protein: 2 },
  { name: "Avocado (1/2)", cal: 120, protein: 1 },
  { name: "Oatmeal (1 cup cooked)", cal: 154, protein: 5 },
  { name: "Almond Milk (1 cup)", cal: 30, protein: 1 },
  { name: "Whole Grain Toast (1 slice)", cal: 80, protein: 4 },
  { name: "Peanut Butter (2 tbsp)", cal: 190, protein: 7 },
  { name: "Almond Butter (2 tbsp)", cal: 196, protein: 7 },
  { name: "Ground Turkey (4 oz)", cal: 170, protein: 21 },
  { name: "Broccoli (1 cup)", cal: 55, protein: 4 },
  { name: "Spinach Salad (2 cups)", cal: 14, protein: 2 },
  { name: "Mixed Berries (1 cup)", cal: 70, protein: 1 },
  { name: "Salmon & Sweet Potato", cal: 500, protein: 38 },
  { name: "Coffee (black)", cal: 5, protein: 0 },
  { name: "Coffee with Cream", cal: 50, protein: 1 },
  { name: "Green Smoothie", cal: 280, protein: 15 },
  { name: "Acai Bowl", cal: 450, protein: 8 },
  { name: "Granola Bar", cal: 190, protein: 4 },
  { name: "Cheese Stick", cal: 80, protein: 7 },
  { name: "Handful of Almonds", cal: 164, protein: 6 },
  { name: "Dark Chocolate (1 oz)", cal: 170, protein: 2 },
  { name: "Grilled Shrimp (4 oz)", cal: 120, protein: 24 },
  { name: "Baked Cod (4 oz)", cal: 90, protein: 20 },
];

const EXERCISES = [
  { name: "Dead Bugs", sets: "3×10", desc: "Lie on back, extend opposite arm/leg while keeping core engaged", safe: true },
  { name: "Bird Dogs", sets: "3×10 each side", desc: "All fours, extend opposite arm and leg, hold 3 seconds", safe: true },
  { name: "Pelvic Tilts", sets: "3×15", desc: "Lie on back, gently flatten lower back to floor, release", safe: true },
  { name: "Toe Taps", sets: "3×12 each side", desc: "Lie on back, knees at 90°, alternate lowering one foot to floor", safe: true },
  { name: "Diaphragmatic Breathing", sets: "5 minutes", desc: "Deep belly breaths — inhale expanding ribs, exhale drawing navel in", safe: true },
  { name: "Modified Planks", sets: "3×20-30 sec", desc: "Forearm plank on knees, focus on keeping core flat (no doming)", safe: true },
  { name: "Heel Slides", sets: "3×10 each side", desc: "Lie on back, slowly slide one heel out and back while bracing core", safe: true },
  { name: "Glute Bridges", sets: "3×15", desc: "Lie on back, feet flat, lift hips squeezing glutes at top", safe: true },
];

const LANGSTON_MILESTONES = [
  { category: "Language & Reading (Advanced!)", items: [
    { text: "Says 50+ words", done: true }, { text: "Uses 2-word phrases", done: true },
    { text: "Most alphabet letters phonetically", done: true }, { text: "3-word sentences consistently", done: false },
    { text: "Uses 'I', 'me', 'you' correctly", done: false }, { text: "Names objects in picture books", done: false },
    { text: "Follows 2-step instructions", done: false }, { text: "Recognizes 10+ uppercase letters by sight", done: false },
    { text: "Knows letter sounds for 15+ letters", done: false }, { text: "Enjoys rhyming games", done: false },
    { text: "Can 'read' a familiar book from memory", done: false }, { text: "Identifies first letter of his name (L)", done: false },
  ]},
  { category: "Cognitive", items: [
    { text: "Sorts shapes and colors", done: false }, { text: "Completes 3-4 piece puzzles", done: false },
    { text: "Engages in pretend play", done: false }, { text: "Counts to 5", done: false },
    { text: "Understands 'mine' vs 'yours'", done: false }, { text: "Matches identical objects", done: false },
  ]},
  { category: "Motor", items: [
    { text: "Runs confidently", done: false }, { text: "Kicks a ball forward", done: false },
    { text: "Walks up stairs with support", done: false }, { text: "Turns book pages one at a time", done: false },
    { text: "Stacks 6+ blocks", done: false }, { text: "Uses spoon/fork independently", done: false },
  ]},
];

const EMERSON_MILESTONES = [
  { category: "Motor (4 months)", items: [
    { text: "Holds head steady unsupported", done: false }, { text: "Pushes up on elbows during tummy time", done: false },
    { text: "Rolls tummy to back", done: false }, { text: "Brings hands to mouth", done: false },
    { text: "Grasps toy when placed in hand", done: false }, { text: "Bats at hanging toys", done: false },
  ]},
  { category: "Social & Emotional", items: [
    { text: "Social smiling at people", done: false }, { text: "Laughs out loud", done: false },
    { text: "Enjoys playing with people", done: false }, { text: "Different cries for different needs", done: false },
    { text: "Recognizes familiar faces", done: false },
  ]},
  { category: "Communication", items: [
    { text: "Coos and babbles", done: false }, { text: "Responds to sounds by turning", done: false },
    { text: "Makes vowel sounds (ah, oh, ee)", done: false }, { text: "Begins to imitate sounds", done: false },
  ]},
  { category: "Cognitive", items: [
    { text: "Follows moving objects with eyes", done: false }, { text: "Recognizes familiar objects at distance", done: false },
    { text: "Explores objects with hands and mouth", done: false }, { text: "Shows boredom if activity doesn't change", done: false },
  ]},
];

const INITIAL_CONTENT = [
  { id: 1, title: "5 Money Moves That Will Quietly Make You Wealthy", pillar: "Wealth Building", type: "youtube", status: "published", date: "2026-02-04", views: 561 },
  { id: 2, title: "I Built 9 Income Streams Before 35 (Here's Exactly How)", pillar: "Wealth Building", type: "youtube", status: "published", date: "2026-01-31", views: 1400 },
  { id: 3, title: "5 AI Businesses to Start to Build Wealth", pillar: "AI Productivity", type: "youtube", status: "published", date: "2025-09-01", views: 3500 },
  { id: 4, title: "5 AI Tips That Will Save You Time", pillar: "AI Productivity", type: "youtube", status: "published", date: "2025-08-01", views: 1300 },
  { id: 5, title: "How to Create an AI Clone (HeyGen + ElevenLabs)", pillar: "AI Productivity", type: "youtube", status: "published", date: "2025-07-01", views: 7900 },
  { id: 6, title: "The 9 Most Underrated Business Ideas to Start NOW", pillar: "CEO Life", type: "youtube", status: "published", date: "2025-03-01", views: 32000 },
  { id: 7, title: "The 3 Levels of AI Agents You Need to Know", pillar: "AI Productivity", type: "substack", status: "published", date: "2026-01-28", views: 0 },
  { id: 8, title: "3 types of content that build trust fast", pillar: "Wealth Building", type: "youtube", status: "ready", date: "2026-02-06", views: 0 },
  { id: 9, title: "How I batch 2 weeks of content in 4 hours", pillar: "CEO Life", type: "youtube", status: "scripting", date: "", views: 0 },
  { id: 10, title: "The moment I knew I had to systematize content", pillar: "CEO Life", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 11, title: "The Business Banking Setup Every Creator Needs", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 12, title: "How I Separate Personal vs Business Finances", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 13, title: "Credit Card Rewards Strategy for Full-Time Creators", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 14, title: "My Content Production System from Idea to Published", pillar: "AI Productivity", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 15, title: "How I Track Brand Deals and Sponsorships", pillar: "CEO Life", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 16, title: "The CEO Life Planner: How I Actually Use It", pillar: "CEO Life", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 17, title: "Wealth Code: Black Art as an Asset Class", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 18, title: "Wealth Code: What's in Our Trust for Our Son", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 19, title: "Wealth Code: How We Set Up Our Family Trust", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 20, title: "Wealth Code: My Investment Portfolio Breakdown", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 21, title: "Wealth Code: Building Multiple Income Streams", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 22, title: "Wealth Code: Running My House Like a CEO", pillar: "CEO Life", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 23, title: "Wealth Code: Our Household Operating System", pillar: "CEO Life", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 24, title: "Wealth Code: Outsourcing and Delegation", pillar: "CEO Life", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 25, title: "Wealth Code: The Morning Routine That Runs Our Empire", pillar: "Health", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 26, title: "How I Automated My Budget", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 27, title: "The Subscription Audit That Saved Me $500/Month", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 28, title: "Are you on track to become a millionaire?", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
  { id: 29, title: "How to budget and save in your 20s", pillar: "Wealth Building", type: "youtube", status: "idea", date: "", views: 0 },
];

const GROWTH_DATA = [
  { week: "W1 Jan", ig: 168200, yt: 16100, li: 138500, tt: 79800 },
  { week: "W2 Jan", ig: 168900, yt: 16250, li: 139100, tt: 80200 },
  { week: "W3 Jan", ig: 169400, yt: 16400, li: 139800, tt: 80600 },
  { week: "W4 Jan", ig: 170100, yt: 16550, li: 140200, tt: 81000 },
  { week: "W1 Feb", ig: 170800, yt: 16800, li: 140800, tt: 81400 },
];

const CALENDAR_EVENTS = [
  { date: "2026-02-07", day: "Sat", events: [
    { time: "9a-4:30p", title: "Bribri here (childcare covered)", type: "family", color: "#9CCFD9" },
  ]},
  { date: "2026-02-09", day: "Mon", events: [
    { time: "10:30a", title: "Monthly Leadership Meeting", type: "blavity", color: "#FAAB33" },
    { time: "11:30a", title: "Kate / Morgan 1:1", type: "blavity", color: "#FAAB33" },
    { time: "12-4:30p", title: "Offline", type: "focus", color: "#009470" },
  ]},
  { date: "2026-02-10", day: "Tue", events: [
    { time: "1:00p", title: "Newsletter Hire Next Steps", type: "blavity", color: "#FAAB33" },
    { time: "2:00p", title: "Simone / Morgan Weekly", type: "blavity", color: "#FAAB33" },
    { time: "2:00p", title: "Antoine Gregory x Morgan (call)", type: "meeting", color: "#F56640" },
    { time: "3:00p", title: "Rob / Morgan Skip-Level", type: "blavity", color: "#FAAB33" },
    { time: "3:30p", title: "HealthStack Summit #2", type: "empire", color: "#F56640" },
  ]},
  { date: "2026-02-11", day: "Wed", events: [
    { time: "All Day", title: "OFFLINE (Deep Work Day)", type: "focus", color: "#009470" },
    { time: "1:00p", title: "Blavity Town Hall: Black Migration", type: "blavity", color: "#FAAB33" },
  ]},
  { date: "2026-02-12", day: "Thu", events: [
    { time: "7:05a", title: "Flight to NYC (WN 541 · BNA → LGA)", type: "travel", color: "#8b5cf6" },
    { time: "All Day", title: "MDB in New York", type: "travel", color: "#8b5cf6" },
  ]},
];

const BRAND_DEALS = [
  { company: "Adobe", value: 65000, status: "Active", deliverables: "Content partnership", startDate: "2026 Q1", color: "#FF0000" },
  { company: "Lenovo", value: 33000, status: "Active", deliverables: "Product + content", startDate: "2026 Q1", color: "#E2231A" },
];

const SPEAKING_ENGAGEMENTS = [];

const AGENT_TEAM = [
  { id: 1, name: "Content Production Manager", focus: "Daily TikTok via Reveals Method", status: "Active", priority: "high",
    kpis: ["1 video concept/day", "70%+ watch time", "Reveals Method adherence"], color: "#F56640" },
  { id: 2, name: "Audience Intelligence Analyst", focus: "Comments, pain points, segment mapping", status: "Planned", priority: "high",
    kpis: ["Weekly insight report", "Content-to-audience fit scoring", "Segment response mapping"], color: "#FAAB33" },
  { id: 3, name: "Product Strategy Designer", focus: "4-tier product ecosystem → $1M", status: "Active", priority: "high",
    kpis: ["Product ideas matching demand", "Customer journey mapping", "Launch calendar"], color: "#009470" },
  { id: 4, name: "AI Education Specialist", focus: "Beginner-to-intermediate AI tutorials", status: "Planned", priority: "medium",
    kpis: ["Weekly tutorials created", "Top AI questions answered", "Implementation guides"], color: "#9CCFD9" },
  { id: 5, name: "Business Systems Architect", focus: "Delegation frameworks & automation", status: "Planned", priority: "medium",
    kpis: ["Templates saving 10-20 hrs/wk", "Automation recommendations", "SOP library"], color: "#8b5cf6" },
  { id: 6, name: "Revenue Operations Manager", focus: "Track $1M goal, book sales, MRR", status: "Active", priority: "high",
    kpis: ["Monthly revenue dashboard", "Path to $1M tracking", "Book sales vs 100/wk goal"], color: "#F56640" },
  { id: 7, name: "Speaking & Visibility Strategist", focus: "Speaking pipeline, brand partnerships", status: "Planned", priority: "medium",
    kpis: ["Speaking opportunity pipeline", "Partnership outreach", "Speaker kit created"], color: "#FAAB33" },
  { id: 8, name: "Lifestyle & Time Optimizer", focus: "Time allocation, delegation, routines", status: "Planned", priority: "low",
    kpis: ["Hours reclaimed/week", "Delegation opportunities", "Energy-optimized routines"], color: "#009470" },
  { id: 9, name: "Annual Planning Coordinator", focus: "Quarterly goals, planning with Josh", status: "Planned", priority: "low",
    kpis: ["Quarterly goal tracking", "Annual planning sessions", "Financial review prep"], color: "#9CCFD9" },
];

const PRODUCT_TIERS = [
  { tier: "Tier 1", name: "Low-Ticket", range: "$19-$49", goal: "$3K-$5K/mo", color: "#9CCFD9",
    products: ["AI Starter Kits ($29)", "GPT Templates ($19-$29)", "Delegation Blueprint ($24)", "Smart Girl Scripts ($19)", "Life Organization System ($34)"] },
  { tier: "Tier 2", name: "Workshops", range: "$97-$297", goal: "$5K-$10K/mo", color: "#FAAB33",
    products: ["AI for Corporate Upskilling ($147)", "AI for Entrepreneurs ($197)", "Systems to Buy Back Time ($177)", "Visibility as a Creator ($197)", "Micro Agency with AI ($247)"] },
  { tier: "Tier 3", name: "Signature Program", range: "$2,497", goal: "$50-75K/launch", color: "#F56640",
    products: ["The AI-Powered CEO: Systems for Wealth & Ease", "8 weeks + live sessions + private community", "2x/year launch (Jan/Feb & Aug/Sept)", "Limited to 30 students", "Payment plan: 3x$897"] },
  { tier: "Tier 4", name: "Enterprise", range: "$15K-$50K", goal: "$100-200K/yr", color: "#009470",
    products: ["AI-Ready: Upskilling Your Workforce ($20-35K)", "Women in Technology Keynote ($15-25K)", "Systems Over Stress Workshop ($20-30K)", "Building Systems That Scale ($25-50K)"] },
];

const REVENUE_TARGETS = { annual: 1000000, lowTicket: 4000, midTier: 7500, signatureLaunch: 62500, enterprise: 150000 };

const BOOK_HISTORY = [
  { week: "Apr 5", sold: 4310 }, { week: "Apr 12", sold: 753 }, { week: "Apr 19", sold: 2501 }, { week: "Apr 26", sold: 673 },
  { week: "May 3", sold: 390 }, { week: "May 10", sold: 255 }, { week: "May 17", sold: 100 }, { week: "May 24", sold: 390 },
  { week: "May 31", sold: 134 }, { week: "Jun 7", sold: 317 }, { week: "Jun 14", sold: 127 }, { week: "Jun 21", sold: 87 },
  { week: "Jun 28", sold: 100 }, { week: "Jul 5", sold: 54 }, { week: "Jul 12", sold: 86 }, { week: "Jul 19", sold: 82 },
  { week: "Jul 26", sold: 51 }, { week: "Aug 2", sold: 76 }, { week: "Aug 9", sold: 54 }, { week: "Aug 16", sold: 40 },
  { week: "Aug 23", sold: 48 }, { week: "Aug 30", sold: 425 }, { week: "Sep 6", sold: 29 }, { week: "Sep 13", sold: 48 },
  { week: "Sep 20", sold: 32 }, { week: "Sep 27", sold: 35 }, { week: "Oct 4", sold: 30 }, { week: "Oct 11", sold: 30 },
  { week: "Oct 18", sold: 29 }, { week: "Oct 25", sold: 26 }, { week: "Nov 1", sold: 74 }, { week: "Nov 8", sold: 23 },
  { week: "Nov 15", sold: 66 }, { week: "Nov 22", sold: 177 }, { week: "Nov 29", sold: 136 }, { week: "Dec 6", sold: 112 },
  { week: "Dec 13", sold: 56 }, { week: "Dec 20", sold: 121 }, { week: "Dec 27", sold: 284 }, { week: "Jan 3", sold: 257 },
  { week: "Jan 10", sold: 97 }, { week: "Jan 17", sold: 121 }, { week: "Jan 24", sold: 110 }, { week: "Jan 31", sold: 76 },
];

const BOOK_SALES = BOOK_HISTORY.slice(-8).map(w => ({ ...w, goal: 100 }));
const BOOK_TOTALS = { unitsSold: 13022, unitsShipped: 15426, titlesPublished: 1, launchWeek: 4310, bestWeek: 4310 };

const WEIGHT_LOG = [
  { week: "Start", weight: 149, date: "2026-01-06" },
  { week: "W1", weight: 148.2, date: "2026-01-13" },
  { week: "W2", weight: 147.5, date: "2026-01-20" },
  { week: "W3", weight: 147.0, date: "2026-01-27" },
  { week: "W4", weight: 146.2, date: "2026-02-03" },
];

// ─── PERSISTED STATE HOOK ───────────────────────────
function usePersistedState(key, defaultValue) {
  const [state, setState] = useState(() => {
    try {
      const saved = localStorage.getItem(`morgan-os-${key}`);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(`morgan-os-${key}`, JSON.stringify(state));
    } catch {}
  }, [key, state]);

  return [state, setState];
}

// ─── AUTH CONFIG ───────────────────────────────────────────────
const APP_PIN = import.meta.env.VITE_APP_PIN || "2026";

// ─── MAIN COMPONENT ───────────────────────────────────────────────
export default function App() {
  // ─── AUTH STATE ─────────────────
  const [isAuthed, setIsAuthed] = useState(() => {
    try {
      const auth = localStorage.getItem("morgan-os-auth");
      if (auth) {
        const { exp } = JSON.parse(auth);
        return exp > Date.now();
      }
      return false;
    } catch { return false; }
  });
  const [pin, setPin] = useState("");
  const [pinError, setPinError] = useState(false);

  const handleLogin = () => {
    if (pin === APP_PIN) {
      localStorage.setItem("morgan-os-auth", JSON.stringify({ exp: Date.now() + 30 * 24 * 60 * 60 * 1000 }));
      setIsAuthed(true);
      setPinError(false);
    } else {
      setPinError(true);
      setPin("");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("morgan-os-auth");
    setIsAuthed(false);
    setPin("");
  };

  // ─── DRAG STATE (content cards) ─────────────────
  const [dragItem, setDragItem] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);

  // ─── FOOD AUTOCOMPLETE ─────────────────
  const [foodQuery, setFoodQuery] = useState("");
  const [showFoodSuggestions, setShowFoodSuggestions] = useState(false);
  const foodSuggestions = foodQuery.length >= 2
    ? FOOD_DB.filter(f => f.name.toLowerCase().includes(foodQuery.toLowerCase())).slice(0, 6)
    : [];

  const selectFoodSuggestion = (food) => {
    setNewFood(p => ({ ...p, name: food.name, cal: String(food.cal), protein: String(food.protein) }));
    setFoodQuery(food.name);
    setShowFoodSuggestions(false);
  };

  const [tab, setTab] = useState("command");
  const [income, setIncome] = usePersistedState("income", INITIAL_INCOME);
  const [showAddIncome, setShowAddIncome] = useState(false);
  const [newIncome, setNewIncome] = useState({ source: "Stan", amount: "", notes: "" });
  const [weights, setWeights] = usePersistedState("weights", WEIGHT_LOG);
  const [mealDay, setMealDay] = useState(0);
  const [showGrocery, setShowGrocery] = useState(false);
  const [langston, setLangston] = usePersistedState("langston", LANGSTON_MILESTONES);
  const [emerson, setEmerson] = usePersistedState("emerson", EMERSON_MILESTONES);
  const [content, setContent] = usePersistedState("content", INITIAL_CONTENT);
  const [growth, setGrowth] = usePersistedState("growth", GROWTH_DATA);
  const [bookSales, setBookSales] = usePersistedState("bookSales", BOOK_SALES);
  const [showAddContent, setShowAddContent] = useState(false);
  const [kidTab, setKidTab] = useState("langston");
  const [showExercises, setShowExercises] = useState(false);
  const [foodLog, setFoodLog] = usePersistedState("foodLog", []);
  const [showAddFood, setShowAddFood] = useState(false);
  const [newFood, setNewFood] = useState({ name: "", cal: "", protein: "", meal: "Breakfast" });
  const [showAddWeight, setShowAddWeight] = useState(false);
  const [newWeight, setNewWeight] = useState("");
  const [showMore, setShowMore] = useState(false);

  const toggleMilestone = (setter, catIdx, itemIdx) => {
    setter(prev => prev.map((cat, ci) => ci === catIdx ? {
      ...cat, items: cat.items.map((item, ii) => ii === itemIdx ? { ...item, done: !item.done } : item)
    } : cat));
  };

  const totalIncome = (month) => income.filter(i => i.month === month).reduce((s, i) => s + i.amount, 0);
  const recurringIncome = (month) => income.filter(i => i.month === month && i.type === "recurring").reduce((s, i) => s + i.amount, 0);
  const brandDeals = (month) => income.filter(i => i.month === month && i.type === "one-time").reduce((s, i) => s + i.amount, 0);
  const currentWeight = weights[weights.length - 1]?.weight || 149;
  const weightLost = 149 - currentWeight;
  const weightGoal = 149 - 130;
  const weightPct = Math.round((weightLost / weightGoal) * 100);
  const latestBookWeek = bookSales[bookSales.length - 1];
  const milestoneProgress = (data) => {
    let total = 0, done = 0;
    data.forEach(c => c.items.forEach(i => { total++; if (i.done) done++; }));
    return { total, done, pct: total > 0 ? Math.round((done / total) * 100) : 0 };
  };

  const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg border border-gray-100 shadow-sm ${className}`}>{children}</div>
  );

  const StatCard = ({ label, value, sub, color = C.slate, icon: Icon }) => (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-gray-400 mb-1">{label}</p>
          <p className="text-lg md:text-2xl font-bold" style={{ color }}>{value}</p>
          {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
        </div>
        {Icon && <div className="p-2 rounded-lg" style={{ backgroundColor: color + "15" }}><Icon size={18} style={{ color }} /></div>}
      </div>
    </Card>
  );

  const ProgressBar = ({ pct, color = C.fire, height = 6 }) => (
    <div className="w-full rounded-full bg-gray-100" style={{ height }}>
      <div className="rounded-full transition-all duration-500" style={{ width: `${Math.min(pct, 100)}%`, height, backgroundColor: color }} />
    </div>
  );

  const Badge = ({ text, color }) => (
    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: color + "18", color }}>{text}</span>
  );

  const statusColor = { idea: "#94a3b8", scripting: C.gold, ready: "#f59e0b", filming: "#f59e0b", editing: "#8b5cf6", published: C.green };

  // ─── COMMAND CENTER ───────────────────────────
  const CommandCenter = () => {
    const lp = milestoneProgress(langston);
    const ep = milestoneProgress(emerson);
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Good morning, Morgan</h2>
          <p className="text-sm text-gray-400 mt-1">Here's your operating system at a glance — week of Feb 3, 2026</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Feb Recurring" value={`$${recurringIncome("Feb 2026").toLocaleString()}`} sub={`+ $${brandDeals("Q1 2026").toLocaleString()} brand deals (Q1)`} color={C.green} icon={DollarSign} />
          <StatCard label="Weight" value={`${currentWeight} lbs`} sub={`${weightLost.toFixed(1)} lbs lost · ${weightPct}% to goal`} color={C.fire} icon={Scale} />
          <StatCard label="Book Sales" value={`${latestBookWeek?.sold}/100`} sub={latestBookWeek?.sold >= 100 ? "Goal hit! 13K+ total sold" : `${100 - latestBookWeek?.sold} to weekly goal`} color={latestBookWeek?.sold >= 100 ? C.green : C.gold} icon={BookOpen} />
          <StatCard label="Content" value={`${content.filter(c => c.status === "published").length} published`} sub={`${content.filter(c => c.status !== "published" && c.status !== "idea").length} in pipeline`} color="#8b5cf6" icon={PenTool} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Weekly Priorities</h3>
            {["Film 2 YouTube videos (Wealth Series + AI)", "Hit 100 book sales this week", "Update HealthStack pitch deck", "Langston: Practice letter sounds L, M, N", "Log weight + meal prep Sunday"].map((p, i) => (
              <div key={i} className="flex items-center gap-2 py-2 border-b border-gray-50 last:border-0">
                <div className="w-5 h-5 rounded border-2 flex items-center justify-center cursor-pointer" style={{ borderColor: C.fire }}></div>
                <span className="text-sm" style={{ color: C.slate }}>{p}</span>
              </div>
            ))}
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Kids Quick View</h3>
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ color: C.slate }}>Langston (2y 3m)</span>
                  <span className="text-xs font-bold" style={{ color: C.green }}>{lp.done}/{lp.total} milestones</span>
                </div>
                <ProgressBar pct={lp.pct} color={C.green} />
                <p className="text-xs text-gray-400 mt-1">Next: 3-word sentences, letter sight recognition</p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold" style={{ color: C.slate }}>Emerson (4m)</span>
                  <span className="text-xs font-bold" style={{ color: C.sky }}>{ep.done}/{ep.total} milestones</span>
                </div>
                <ProgressBar pct={ep.pct} color={C.sky} />
                <p className="text-xs text-gray-400 mt-1">Next: Head steady, rolling, social smiling</p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Empire Status</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "Blavity Media Group", status: "Sale in Progress", color: C.gold },
              { name: "HealthStack / AfroTech", status: "Pre-Fundraise", color: C.fire },
              { name: "Anchor", status: "Pre-Launch", color: C.green },
              { name: "Melanin Money", status: "Building", color: "#8b5cf6" },
            ].map((b, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
                <p className="text-xs font-bold" style={{ color: C.slate }}>{b.name}</p>
                <Badge text={b.status} color={b.color} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">This Week — Calendar</h3>
          <div className="space-y-3">
            {CALENDAR_EVENTS.map((day, di) => (
              <div key={di}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase" style={{ color: C.fire }}>{day.day} {day.date.split("-")[2]}</span>
                  {day.date === new Date().toISOString().split("T")[0] && <span className="text-xs px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 font-bold">TODAY</span>}
                </div>
                <div className="space-y-1">
                  {day.events.map((ev, ei) => (
                    <div key={ei} className="flex items-center gap-2 py-1.5 px-2 rounded" style={{ backgroundColor: C.greige }}>
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ev.color }} />
                      <span className="text-xs font-mono text-gray-400 min-w-[55px]">{ev.time}</span>
                      <span className="text-xs font-medium" style={{ color: C.slate }}>{ev.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  // ─── MONEY TRACKER ───────────────────────────
  const MoneyTracker = () => {
    const months = [...new Set(income.map(i => i.month))].filter(m => m.includes("20") && !m.startsWith("Q"));
    const chartData = months.map(m => ({
      month: m.split(" ")[0], total: totalIncome(m), recurring: recurringIncome(m), deals: brandDeals(m),
    }));
    const sourceBreakdown = ["Stan", "Patreon", "Substack", "Brand Deal"].map(s => ({
      name: s, value: income.filter(i => i.source === s).reduce((sum, i) => sum + i.amount, 0),
    }));
    const PIE_COLORS = [C.fire, C.gold, C.green, C.sky];

    const addIncome = () => {
      if (!newIncome.amount) return;
      setIncome(prev => [...prev, {
        id: prev.length + 1, source: newIncome.source, type: newIncome.source === "Brand Deal" ? "one-time" : "recurring",
        amount: Number(newIncome.amount), month: "Feb 2026", notes: newIncome.notes,
      }]);
      setNewIncome({ source: "Stan", amount: "", notes: "" });
      setShowAddIncome(false);
    };

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Side Money Tracker</h2>
            <p className="text-sm text-gray-400">Stan · Patreon · Substack · Brand Deals</p>
          </div>
          <button onClick={() => setShowAddIncome(!showAddIncome)} className="flex items-center gap-1 px-3 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: C.fire }}>
            <Plus size={14} /> Add Income
          </button>
        </div>

        {showAddIncome && (
          <Card className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <select value={newIncome.source} onChange={e => setNewIncome(p => ({...p, source: e.target.value}))} className="border rounded-lg px-3 py-2 text-sm">
                {["Stan", "Patreon", "Substack", "Brand Deal"].map(s => <option key={s}>{s}</option>)}
              </select>
              <input type="number" placeholder="Amount ($)" value={newIncome.amount} onChange={e => setNewIncome(p => ({...p, amount: e.target.value}))} className="border rounded-lg px-3 py-2 text-sm" />
              <input placeholder="Notes" value={newIncome.notes} onChange={e => setNewIncome(p => ({...p, notes: e.target.value}))} className="border rounded-lg px-3 py-2 text-sm" />
            </div>
            <button onClick={addIncome} className="mt-3 px-4 py-2 rounded-lg text-white text-sm font-medium" style={{ backgroundColor: C.green }}>Save</button>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Stan Total" value="$32,986" sub="All time revenue" color={C.fire} icon={DollarSign} />
          <StatCard label="Feb Recurring" value={`$${recurringIncome("Feb 2026").toLocaleString()}`} sub="Stan + Substack + Patreon" color={C.green} icon={TrendingUp} />
          <StatCard label="Active Brand Deals" value={`$${brandDeals("Q1 2026").toLocaleString()}`} sub="Adobe + Lenovo (Q1)" color={C.gold} icon={Star} />
          <StatCard label="Substack ARR" value="$4,752" sub="54 paid · 3,264 total subs" color="#8b5cf6" icon={BookOpen} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Revenue by Month</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
                <Tooltip formatter={v => `$${v.toLocaleString()}`} />
                <Bar dataKey="recurring" stackId="a" fill={C.green} name="Recurring" radius={[0,0,0,0]} />
                <Bar dataKey="deals" stackId="a" fill={C.gold} name="Brand Deals" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Revenue Breakdown</h3>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={sourceBreakdown} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent*100).toFixed(0)}%`}>
                  {sourceBreakdown.map((_, i) => <Cell key={i} fill={PIE_COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={v => `$${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">All Entries</h3>
          <div className="space-y-1">
            {income.sort((a, b) => b.id - a.id).map(i => (
              <div key={i.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div className="flex items-center gap-3">
                  <Badge text={i.source} color={i.source === "Stan" ? C.fire : i.source === "Patreon" ? C.gold : i.source === "Substack" ? C.green : C.sky} />
                  <span className="text-sm" style={{ color: C.slate }}>{i.notes}</span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold" style={{ color: C.green }}>${i.amount.toLocaleString()}</span>
                  <span className="text-xs text-gray-400 ml-2">{i.month}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Active Brand Deals</h3>
            <div className="space-y-2">
              {BRAND_DEALS.map((d, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.slate }}>{d.company}</p>
                    <p className="text-xs text-gray-400">{d.deliverables} · {d.startDate}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold" style={{ color: C.green }}>${d.value.toLocaleString()}</p>
                    <Badge text={d.status} color={C.green} />
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold" style={{ color: C.slate }}>Total Active Deals</span>
                  <span className="text-xl font-bold" style={{ color: C.green }}>${BRAND_DEALS.reduce((s, d) => s + d.value, 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Speaking Engagements</h3>
            {SPEAKING_ENGAGEMENTS.length === 0 ? (
              <div className="text-center py-8">
                <Mic2 size={24} className="mx-auto mb-2 text-gray-300" />
                <p className="text-sm text-gray-400">No upcoming engagements</p>
                <p className="text-xs text-gray-300 mt-1">Add speaking gigs as they come in</p>
              </div>
            ) : (
              <div className="space-y-2">
                {SPEAKING_ENGAGEMENTS.map((s, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
                    <div>
                      <p className="text-sm font-bold" style={{ color: C.slate }}>{s.event}</p>
                      <p className="text-xs text-gray-400">{s.date} · {s.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold" style={{ color: C.gold }}>${s.fee?.toLocaleString() || "TBD"}</p>
                      <Badge text={s.status} color={s.status === "Confirmed" ? C.green : C.gold} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    );
  };

  // ─── BODY GOALS ───────────────────────────
  const BodyGoals = () => {
    const day = MEAL_PLAN[mealDay];
    const dayCal = day.meals.reduce((s, m) => s + m.cal, 0);
    const dayProtein = day.meals.reduce((s, m) => s + m.protein, 0);
    const todayFood = foodLog.filter(f => f.date === new Date().toISOString().split("T")[0]);
    const todayCal = todayFood.reduce((s, f) => s + Number(f.cal || 0), 0);
    const todayProtein = todayFood.reduce((s, f) => s + Number(f.protein || 0), 0);

    const addFood = () => {
      if (!newFood.name && !foodQuery) return;
      const foodName = newFood.name || foodQuery;
      setFoodLog(prev => [...prev, { ...newFood, name: foodName, id: Date.now(), date: new Date().toISOString().split("T")[0] }]);
      setNewFood({ name: "", cal: "", protein: "", meal: "Breakfast" });
      setFoodQuery("");
      setShowAddFood(false);
    };

    const addWeight = () => {
      if (!newWeight) return;
      const label = `W${weights.length}`;
      setWeights(prev => [...prev, { week: label, weight: Number(newWeight), date: new Date().toISOString().split("T")[0] }]);
      setNewWeight("");
      setShowAddWeight(false);
    };

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-col md:flex-row gap-4">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Postpartum Body Goals</h2>
            <p className="text-sm text-gray-400">4'11" · Breastfeeding-friendly · Target: 1,800-2,000 cal/day · 100g+ protein</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <button onClick={() => setShowAddWeight(!showAddWeight)} className="flex items-center gap-1 px-3 py-2 rounded-lg text-white text-sm font-medium flex-1 md:flex-none" style={{ backgroundColor: C.fire }}>
              <Scale size={14} /> Log Weight
            </button>
            <button onClick={() => setShowAddFood(!showAddFood)} className="flex items-center gap-1 px-3 py-2 rounded-lg text-white text-sm font-medium flex-1 md:flex-none" style={{ backgroundColor: C.green }}>
              <Apple size={14} /> Log Food
            </button>
          </div>
        </div>

        {showAddWeight && (
          <Card className="p-4">
            <h3 className="text-sm font-bold mb-2" style={{ color: C.slate }}>Log Today's Weight</h3>
            <div className="flex gap-3 items-end flex-col md:flex-row">
              <input type="number" step="0.1" placeholder="e.g. 145.5" value={newWeight} onChange={e => setNewWeight(e.target.value)} className="border rounded-lg px-3 py-2 text-sm w-full md:w-40" />
              <span className="text-sm text-gray-400">lbs</span>
              <button onClick={addWeight} className="px-4 py-2 rounded-lg text-white text-sm font-medium w-full md:w-auto" style={{ backgroundColor: C.fire }}>Save</button>
            </div>
          </Card>
        )}

        {showAddFood && (
          <Card className="p-4">
            <h3 className="text-sm font-bold mb-2" style={{ color: C.slate }}>Log What You Ate</h3>
            <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
              <select value={newFood.meal} onChange={e => setNewFood(p => ({...p, meal: e.target.value}))} className="border rounded-lg px-3 py-2 text-sm">
                {["Breakfast", "Snack", "Lunch", "Dinner"].map(m => <option key={m}>{m}</option>)}
              </select>
              <div className="relative md:col-span-2">
                <div className="relative">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    placeholder="Start typing a food..."
                    value={foodQuery}
                    onChange={e => {
                      setFoodQuery(e.target.value);
                      setShowFoodSuggestions(true);
                      setNewFood(p => ({...p, name: e.target.value, cal: "", protein: ""}));
                    }}
                    onFocus={() => foodQuery.length >= 2 && setShowFoodSuggestions(true)}
                    onBlur={() => setTimeout(() => setShowFoodSuggestions(false), 200)}
                    className="border rounded-lg pl-9 pr-3 py-2 text-sm w-full"
                  />
                </div>
                {showFoodSuggestions && foodSuggestions.length > 0 && (
                  <div className="absolute z-20 left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg max-h-48 overflow-y-auto">
                    {foodSuggestions.map((f, i) => (
                      <button
                        key={i}
                        onMouseDown={(e) => { e.preventDefault(); selectFoodSuggestion(f); }}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center justify-between border-b border-gray-50 last:border-0"
                      >
                        <span className="text-sm font-medium" style={{ color: C.slate }}>{f.name}</span>
                        <span className="text-xs text-gray-400">{f.cal} cal · {f.protein}g protein</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <input type="number" placeholder="Calories" value={newFood.cal} onChange={e => setNewFood(p => ({...p, cal: e.target.value}))} className="border rounded-lg px-3 py-2 text-sm" />
              <input type="number" placeholder="Protein (g)" value={newFood.protein} onChange={e => setNewFood(p => ({...p, protein: e.target.value}))} className="border rounded-lg px-3 py-2 text-sm" />
            </div>
            {newFood.cal && newFood.protein && (
              <div className="mt-2 flex items-center gap-2 text-xs">
                <span className="px-2 py-1 rounded-full" style={{ backgroundColor: C.green + "15", color: C.green }}>
                  {newFood.cal} cal · {newFood.protein}g protein
                </span>
                {foodQuery && !foodSuggestions.find(f => f.name === foodQuery) && (
                  <span className="text-gray-400">Custom food</span>
                )}
              </div>
            )}
            <button onClick={addFood} className="mt-3 px-4 py-2 rounded-lg text-white text-sm font-medium w-full" style={{ backgroundColor: C.green }}>Save</button>
          </Card>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <StatCard label="Current" value={`${currentWeight} lbs`} color={C.slate} icon={Scale} />
          <StatCard label="Goal" value="130 lbs" color={C.green} icon={Target} />
          <StatCard label="Lost So Far" value={`${weightLost.toFixed(1)} lbs`} color={C.fire} icon={Flame} />
          <StatCard label="Progress" value={`${weightPct}%`} sub={`${(weightGoal - weightLost).toFixed(1)} lbs to go`} color={C.gold} icon={TrendingUp} />
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Today's Food Log</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="font-bold" style={{ color: todayCal > 2000 ? C.fire : C.green }}>{todayCal} / 2,000 cal</span>
              <span className="text-gray-300">·</span>
              <span className="font-bold" style={{ color: todayProtein >= 100 ? C.green : C.gold }}>{todayProtein} / 100g protein</span>
            </div>
          </div>
          <ProgressBar pct={(todayCal / 2000) * 100} color={todayCal > 2000 ? C.fire : C.green} height={4} />
          {todayFood.length === 0 ? (
            <p className="text-xs text-gray-400 mt-3 text-center py-4">No food logged today yet. Click "Log Food" to start tracking!</p>
          ) : (
            <div className="mt-3 space-y-1">
              {todayFood.map(f => (
                <div key={f.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase px-2 py-0.5 rounded" style={{ backgroundColor: C.fire + "15", color: C.fire }}>{f.meal}</span>
                    <span className="text-sm" style={{ color: C.slate }}>{f.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span style={{ color: C.slate }}>{f.cal} cal</span>
                    <span style={{ color: C.green }}>{f.protein}g</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Weight Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={weights}>
              <defs>
                <linearGradient id="wg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={C.fire} stopOpacity={0.15} />
                  <stop offset="95%" stopColor={C.fire} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis domain={[128, 150]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Area type="monotone" dataKey="weight" stroke={C.fire} fill="url(#wg)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Weekly Meal Plan</h3>
            <div className="flex items-center gap-1 text-xs">
              <span className="font-bold" style={{ color: C.fire }}>{dayCal} cal</span>
              <span className="text-gray-300">·</span>
              <span className="font-bold" style={{ color: C.green }}>{dayProtein}g protein</span>
            </div>
          </div>
          <div className="flex gap-1 mb-4 overflow-x-auto pb-2">
            {MEAL_PLAN.map((d, i) => (
              <button key={i} onClick={() => setMealDay(i)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${mealDay === i ? "text-white" : "text-gray-500"}`}
                style={mealDay === i ? { backgroundColor: C.fire } : { backgroundColor: C.greige }}>
                {d.day.slice(0, 3)}
              </button>
            ))}
          </div>
          <div className="space-y-2">
            {day.meals.map((m, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
                <div className="min-w-[60px]">
                  <span className="text-xs font-bold uppercase" style={{ color: C.fire }}>{m.type}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold" style={{ color: C.slate }}>{m.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.desc}</p>
                </div>
                <div className="text-right min-w-[70px]">
                  <p className="text-xs font-bold" style={{ color: C.slate }}>{m.cal} cal</p>
                  <p className="text-xs" style={{ color: C.green }}>{m.protein}g protein</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setShowGrocery(!showGrocery)}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Grocery List</h3>
              <div className="flex items-center gap-1 text-xs" style={{ color: C.fire }}>
                <ShoppingCart size={14} /> {showGrocery ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            </div>
            {showGrocery && GROCERY.map((g, i) => (
              <div key={i} className="mb-3">
                <p className="text-xs font-bold uppercase mb-1" style={{ color: C.fire }}>{g.category}</p>
                <div className="flex flex-wrap gap-1">
                  {g.items.map((item, j) => (
                    <span key={j} className="text-xs px-2 py-1 rounded" style={{ backgroundColor: C.greige, color: C.slate }}>{item}</span>
                  ))}
                </div>
              </div>
            ))}
            {!showGrocery && <p className="text-xs text-gray-400">Click to expand full grocery list ({GROCERY.reduce((s, g) => s + g.items.length, 0)} items)</p>}
          </Card>

          <Card className="p-4">
            <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => setShowExercises(!showExercises)}>
              <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400">Core Rehab Exercises</h3>
              <div className="flex items-center gap-1 text-xs" style={{ color: C.green }}>
                <Dumbbell size={14} /> {showExercises ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
              </div>
            </div>
            <p className="text-xs text-gray-400 mb-2 flex items-center gap-1"><AlertCircle size={12} /> Diastasis recti-safe · No crunches or sit-ups</p>
            {(showExercises ? EXERCISES : EXERCISES.slice(0, 3)).map((ex, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50">
                <div>
                  <p className="text-sm font-semibold" style={{ color: C.slate }}>{ex.name}</p>
                  {showExercises && <p className="text-xs text-gray-400">{ex.desc}</p>}
                </div>
                <span className="text-xs font-mono font-bold" style={{ color: C.green }}>{ex.sets}</span>
              </div>
            ))}
            {!showExercises && <p className="text-xs mt-2 cursor-pointer" style={{ color: C.fire }} onClick={() => setShowExercises(true)}>+ {EXERCISES.length - 3} more exercises</p>}
          </Card>
        </div>
      </div>
    );
  };

  // ─── EMPIRE ───────────────────────────
  const Empire = () => {
    const businesses = [
      { name: "Blavity Media Group", role: "Founder/CEO", status: "Sale in Progress", color: C.gold,
        milestones: ["Initial valuation complete", "Investment banker engaged", "Due diligence phase", "LOI negotiations", "Closing & transition"],
        current: 2, notes: "$35M+ revenue, 70 employees. Strategic exit to fund next ventures." },
      { name: "HealthStack / AfroTech", role: "Founder", status: "Pre-Fundraise", color: C.fire,
        milestones: ["Weekly Kapor cadence started", "Deck finalized", "Warm intros sent", "First meetings", "Term sheet & close"],
        current: 0, notes: "Haven't started formal raise yet. Weekly meeting with Kapor Capital for structure. HealthStack Summit #2 on Feb 10." },
      { name: "Anchor", role: "Founder", status: "Pre-Launch", color: C.green,
        milestones: ["App built ✓", "Social posts created ✓", "Apple Developer account", "Secure handles", "Marketing launch", "First users"],
        current: 1, notes: "App & social posts done. Waiting on Apple Developer account approval. Need to secure social handles. Marketing setup needed for launch." },
      { name: "Melanin Money", role: "Founder", status: "Building", color: "#8b5cf6",
        milestones: ["Platform concept", "Content strategy", "Community building", "Monetization", "Scale & partnerships"],
        current: 2, notes: "Financial literacy and wealth building for the culture." },
    ];

    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Empire Builder</h2>
          <p className="text-sm text-gray-400">Track every business. Stay CEO, not operator.</p>
        </div>
        {businesses.map((b, i) => (
          <Card key={i} className="p-5">
            <div className="flex items-center justify-between mb-3 flex-col md:flex-row gap-3">
              <div>
                <h3 className="text-lg font-bold" style={{ color: C.slate }}>{b.name}</h3>
                <p className="text-xs text-gray-400">{b.role}</p>
              </div>
              <Badge text={b.status} color={b.color} />
            </div>
            <p className="text-sm text-gray-500 mb-4">{b.notes}</p>
            <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-2">
              {b.milestones.map((m, j) => (
                <div key={j} className="flex-1 min-w-[100px]">
                  <div className="h-2 rounded-full" style={{ backgroundColor: j <= b.current ? b.color : C.greige }} />
                  <p className={`text-xs mt-1 ${j <= b.current ? "font-semibold" : "text-gray-300"}`} style={j <= b.current ? { color: b.color } : {}}>{m}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // ─── BABIES ───────────────────────────
  const Babies = () => {
    const data = kidTab === "langston" ? langston : emerson;
    const setter = kidTab === "langston" ? setLangston : setEmerson;
    const prog = milestoneProgress(data);
    const age = kidTab === "langston" ? "2 years 3 months" : "4 months";
    const born = kidTab === "langston" ? "November 1, 2023" : "October 15, 2025";

    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Development Milestones</h2>
          <p className="text-sm text-gray-400">Track what matters most</p>
        </div>

        <div className="flex gap-2 flex-col md:flex-row">
          {[{ id: "langston", label: "Langston", age: "2y 3m", color: C.green }, { id: "emerson", label: "Emerson", age: "4m", color: C.sky }].map(k => (
            <button key={k.id} onClick={() => setKidTab(k.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex-1 md:flex-none ${kidTab === k.id ? "text-white" : ""}`}
              style={kidTab === k.id ? { backgroundColor: k.color } : { backgroundColor: C.greige, color: C.slate }}>
              {k.label} ({k.age})
            </button>
          ))}
        </div>

        <Card className="p-4">
          <div className="flex items-center justify-between mb-2 flex-col md:flex-row gap-3">
            <div>
              <p className="text-sm text-gray-400">Born {born} · Age: {age}</p>
              {kidTab === "langston" && <p className="text-xs mt-1" style={{ color: C.gold }}>Advanced: Already doing most of the alphabet phonetically!</p>}
            </div>
            <div className="text-right">
              <p className="text-xl font-bold" style={{ color: C.green }}>{prog.pct}%</p>
              <p className="text-xs text-gray-400">{prog.done}/{prog.total} complete</p>
            </div>
          </div>
          <ProgressBar pct={prog.pct} color={kidTab === "langston" ? C.green : C.sky} />
        </Card>

        {data.map((cat, ci) => (
          <Card key={ci} className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide mb-3" style={{ color: C.slate }}>{cat.category}</h3>
            <div className="space-y-1">
              {cat.items.map((item, ii) => (
                <div key={ii} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0 cursor-pointer" onClick={() => toggleMilestone(setter, ci, ii)}>
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all`}
                    style={{ borderColor: item.done ? C.green : C.darkGreige, backgroundColor: item.done ? C.green : "transparent" }}>
                    {item.done && <Check size={12} color="white" />}
                  </div>
                  <span className={`text-sm ${item.done ? "line-through text-gray-300" : ""}`} style={!item.done ? { color: C.slate } : {}}>{item.text}</span>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    );
  };

  // ─── BOOK SALES ───────────────────────────
  const BookSalesTab = () => (
    <div className="space-y-5">
      <div>
        <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Rewrite Your Rules — Book Sales</h2>
        <p className="text-sm text-gray-400">Penguin Random House · Goal: 100 books/week · Data from Author Portal</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <StatCard label="Last Week" value={latestBookWeek?.sold} sub={latestBookWeek?.sold >= 100 ? "Goal hit!" : `${100 - latestBookWeek?.sold} to go`} color={latestBookWeek?.sold >= 100 ? C.green : C.fire} icon={BookOpen} />
        <StatCard label="Total Sold" value={BOOK_TOTALS.unitsSold.toLocaleString()} sub="Since Apr 5, 2025" color={C.slate} icon={BarChart3} />
        <StatCard label="Units Shipped" value={BOOK_TOTALS.unitsShipped.toLocaleString()} sub="To retailers" color={C.gold} icon={Target} />
        <StatCard label="Launch Week" value={BOOK_TOTALS.launchWeek.toLocaleString()} sub="Apr 5 — biggest week" color={C.green} icon={Star} />
        <StatCard label="Holiday Peak" value="284" sub="Dec 27 week" color={C.sky} icon={TrendingUp} />
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Weekly Sales vs Goal</h3>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={bookSales}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 11 }} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Bar dataKey="sold" fill={C.fire} name="Sold" radius={[4,4,0,0]} />
            <Bar dataKey="goal" fill={C.greige} name="Goal" radius={[4,4,0,0]} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Full Sales History (Since Launch)</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={BOOK_HISTORY}>
            <defs>
              <linearGradient id="bookGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={C.green} stopOpacity={0.3} />
                <stop offset="95%" stopColor={C.green} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="week" tick={{ fontSize: 9 }} interval={3} />
            <YAxis tick={{ fontSize: 11 }} />
            <Tooltip />
            <Area type="monotone" dataKey="sold" stroke={C.green} fill="url(#bookGrad)" strokeWidth={2} name="Units Sold" />
          </AreaChart>
        </ResponsiveContainer>
        <p className="text-xs text-gray-400 mt-2 text-center">44 weeks of data · Launch Apr 5, 2025 · Holiday surge Nov-Dec · Resurgence Jan 2026</p>
      </Card>

      <Card className="p-4">
        <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Funnel Strategy</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { stage: "Top of Funnel", desc: "YouTube videos, TikToks, Reels mentioning the book", metric: "Impressions", target: "50K/week" },
            { stage: "Middle of Funnel", desc: "Email sequences, Substack mentions, IG stories", metric: "Click-throughs", target: "2,000/week" },
            { stage: "Bottom of Funnel", desc: "Direct CTA, book landing page, ManyChat DM flow", metric: "Purchases", target: "100/week" },
          ].map((f, i) => (
            <div key={i} className="p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
              <p className="text-xs font-bold uppercase" style={{ color: C.fire }}>{f.stage}</p>
              <p className="text-xs text-gray-500 mt-1">{f.desc}</p>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-400">{f.metric}</p>
                <p className="text-sm font-bold" style={{ color: C.slate }}>{f.target}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  // ─── CONTENT PLANNER ───────────────────────────
  const ContentPlanner = () => {
    const statusOrder = ["idea", "scripting", "ready", "editing", "published"];
    const typeIcons = { youtube: Youtube, podcast: Mic, substack: BookOpenCheck };
    const statusLabels = { idea: "Idea", scripting: "Scripting", ready: "Ready", editing: "Editing", published: "Published" };

    const handleDragStart = (e, item) => {
      setDragItem(item);
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", item.id);
    };

    const handleDragOver = (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
    };

    const handleDrop = (e, newStatus) => {
      e.preventDefault();
      if (dragItem) {
        setContent(prev => prev.map(c => c.id === dragItem.id ? { ...c, status: newStatus } : c));
        setDragItem(null);
      }
    };

    const handleDragEnd = () => {
      setDragItem(null);
    };

    const moveCard = (cardId, newStatus) => {
      setContent(prev => prev.map(c => c.id === cardId ? { ...c, status: newStatus } : c));
      setSelectedCard(null);
    };

    return (
      <div className="space-y-5">
        <div className="flex items-center justify-between flex-col md:flex-row gap-3">
          <div>
            <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Content Command Center</h2>
            <p className="text-sm text-gray-400">Wealth Series · AI Tech · YouTube · Podcast · Drag cards to change status</p>
          </div>
          <button onClick={() => setShowAddContent(!showAddContent)} className="flex items-center gap-1 px-3 py-2 rounded-lg text-white text-sm font-medium w-full md:w-auto" style={{ backgroundColor: C.fire }}>
            <Plus size={14} /> New Content
          </button>
        </div>

        {/* Mobile Move Bar — shows when a card is selected */}
        {selectedCard && (
          <div className="md:hidden bg-white rounded-lg border-2 p-3 shadow-lg" style={{ borderColor: C.fire }}>
            <p className="text-xs font-bold mb-2" style={{ color: C.slate }}>Move "{content.find(c => c.id === selectedCard)?.title}" to:</p>
            <div className="flex gap-2 flex-wrap">
              {statusOrder.map(s => {
                const current = content.find(c => c.id === selectedCard)?.status;
                return (
                  <button
                    key={s}
                    onClick={() => moveCard(selectedCard, s)}
                    className="px-3 py-1.5 rounded-full text-xs font-bold transition-all"
                    style={{
                      backgroundColor: s === current ? statusColor[s] : statusColor[s] + "18",
                      color: s === current ? "white" : statusColor[s],
                      border: s === current ? "none" : `1px solid ${statusColor[s]}40`,
                    }}
                  >
                    {statusLabels[s]}
                  </button>
                );
              })}
              <button onClick={() => setSelectedCard(null)} className="px-3 py-1.5 rounded-full text-xs font-bold bg-gray-100 text-gray-500">Cancel</button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {statusOrder.map(s => {
            const items = content.filter(c => c.status === s);
            return (
              <Card
                key={s}
                className={`p-3 transition-all ${dragItem ? "ring-2 ring-dashed" : ""}`}
                style={dragItem ? { ringColor: statusColor[s] + "40" } : {}}
              >
                <div
                  onDragOver={handleDragOver}
                  onDrop={e => handleDrop(e, s)}
                  className="min-h-[80px]"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor[s] }} />
                    <span className="text-xs font-bold uppercase tracking-wide text-gray-400">{s}</span>
                    <span className="text-xs font-bold ml-auto" style={{ color: statusColor[s] }}>{items.length}</span>
                  </div>
                  <div className="space-y-2">
                    {items.map(c => {
                      const Icon = typeIcons[c.type] || PenTool;
                      const isSelected = selectedCard === c.id;
                      const isDragging = dragItem?.id === c.id;
                      return (
                        <div
                          key={c.id}
                          draggable
                          onDragStart={e => handleDragStart(e, c)}
                          onDragEnd={handleDragEnd}
                          onClick={() => setSelectedCard(isSelected ? null : c.id)}
                          className={`p-2 rounded-lg text-xs cursor-grab active:cursor-grabbing transition-all ${isDragging ? "opacity-40" : ""}`}
                          style={{
                            backgroundColor: isSelected ? statusColor[s] + "20" : C.greige,
                            border: isSelected ? `2px solid ${statusColor[s]}` : "2px solid transparent",
                          }}
                        >
                          <div className="flex items-center gap-1 mb-1">
                            <GripVertical size={10} className="text-gray-300 hidden md:block" />
                            <Icon size={11} style={{ color: statusColor[s] }} />
                            <span className="font-medium" style={{ color: C.slate }}>{c.type}</span>
                          </div>
                          <p className="font-semibold text-xs leading-tight" style={{ color: C.slate }}>{c.title}</p>
                          <Badge text={c.pillar} color={statusColor[s]} />
                          {c.views > 0 && <p className="text-xs text-gray-400 mt-1">{c.views.toLocaleString()} views</p>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">YouTube Video Tracker</h3>
            <div className="space-y-2">
              {content.filter(c => c.type === "youtube").map(c => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <Youtube size={14} style={{ color: C.fire }} />
                    <span className="text-sm" style={{ color: C.slate }}>{c.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge text={c.status} color={statusColor[c.status]} />
                    {c.views > 0 && <span className="text-xs text-gray-400">{c.views.toLocaleString()} views</span>}
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Podcast (Audio from YT)</h3>
            <div className="space-y-2">
              {content.filter(c => c.type === "podcast" || (c.type === "youtube" && c.status === "published")).map(c => (
                <div key={c.id} className="flex items-center justify-between py-2 border-b border-gray-50">
                  <div className="flex items-center gap-2">
                    <Mic size={14} style={{ color: "#8b5cf6" }} />
                    <span className="text-sm" style={{ color: C.slate }}>{c.title}</span>
                  </div>
                  <Badge text={c.type === "podcast" ? "live" : "ready to extract"} color={c.type === "podcast" ? C.green : C.gold} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Content by Pillar</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {["AI Productivity", "Wealth Building", "CEO Life", "Health", "Banking"].map((p, i) => {
              const count = content.filter(c => c.pillar === p).length;
              const colors = [C.fire, C.green, C.gold, C.sky, "#8b5cf6"];
              return (
                <div key={p} className="text-center p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
                  <p className="text-lg md:text-2xl font-bold" style={{ color: colors[i] }}>{count}</p>
                  <p className="text-xs text-gray-400">{p}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    );
  };

  // ─── GROWTH TRACKER ───────────────────────────
  const GrowthTracker = () => {
    const latest = growth[growth.length - 1];
    const prev = growth[growth.length - 2];
    const calcChange = (curr, old) => curr && old ? curr - old : 0;
    const calcPct = (curr, old) => old ? (((curr - old) / old) * 100).toFixed(2) : "0";

    const platforms = [
      { key: "ig", name: "Instagram", icon: Instagram, color: "#E1306C", current: latest?.ig, prev: prev?.ig },
      { key: "yt", name: "YouTube", icon: Youtube, color: "#FF0000", current: latest?.yt, prev: prev?.yt },
      { key: "li", name: "LinkedIn", icon: Linkedin, color: "#0A66C2", current: latest?.li, prev: prev?.li },
      { key: "tt", name: "TikTok", icon: BarChart3, color: "#000000", current: latest?.tt, prev: prev?.tt },
    ];

    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Audience Growth</h2>
          <p className="text-sm text-gray-400">Instagram · YouTube · LinkedIn · TikTok — week over week</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {platforms.map(p => {
            const change = calcChange(p.current, p.prev);
            const pct = calcPct(p.current, p.prev);
            const up = change >= 0;
            return (
              <Card key={p.key} className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <p.icon size={16} style={{ color: p.color }} />
                  <span className="text-xs font-bold uppercase tracking-wide text-gray-400">{p.name}</span>
                </div>
                <p className="text-xl font-bold" style={{ color: C.slate }}>{(p.current || 0).toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  {up ? <ArrowUpRight size={12} style={{ color: C.green }} /> : <ArrowDownRight size={12} style={{ color: C.fire }} />}
                  <span className="text-xs font-bold" style={{ color: up ? C.green : C.fire }}>
                    {up ? "+" : ""}{change.toLocaleString()} ({pct}%)
                  </span>
                  <span className="text-xs text-gray-400">this week</span>
                </div>
              </Card>
            );
          })}
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Growth Trends (5 Weeks)</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={growth}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="week" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={v => `${(v/1000).toFixed(0)}k`} />
              <Tooltip formatter={v => v.toLocaleString()} />
              <Legend />
              <Line type="monotone" dataKey="ig" stroke="#E1306C" strokeWidth={2} name="Instagram" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="yt" stroke="#FF0000" strokeWidth={2} name="YouTube" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="li" stroke="#0A66C2" strokeWidth={2} name="LinkedIn" dot={{ r: 3 }} />
              <Line type="monotone" dataKey="tt" stroke="#000000" strokeWidth={2} name="TikTok" dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Week-over-Week Changes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 text-xs text-gray-400 font-medium">Week</th>
                  {platforms.map(p => <th key={p.key} className="text-right py-2 text-xs text-gray-400 font-medium">{p.name}</th>)}
                </tr>
              </thead>
              <tbody>
                {growth.map((g, i) => (
                  <tr key={i} className="border-b border-gray-50">
                    <td className="py-2 font-medium" style={{ color: C.slate }}>{g.week}</td>
                    {platforms.map(p => {
                      const prev = i > 0 ? growth[i-1][p.key] : null;
                      const change = prev ? g[p.key] - prev : 0;
                      return (
                        <td key={p.key} className="text-right py-2">
                          <span className="text-xs">{g[p.key].toLocaleString()}</span>
                          {prev && <span className="text-xs ml-1 font-bold" style={{ color: change >= 0 ? C.green : C.fire }}>
                            {change >= 0 ? "+" : ""}{change}
                          </span>}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    );
  };

  // ─── AGENT TEAM ───────────────────────────
  const AgentTeam = () => {
    const activeAgents = AGENT_TEAM.filter(a => a.status === "Active").length;
    const plannedAgents = AGENT_TEAM.filter(a => a.status === "Planned").length;

    return (
      <div className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: C.slate }}>Agent Team</h2>
          <p className="text-sm text-gray-400">9 AI employees powering your $1M personal brand</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <StatCard label="Active Agents" value={activeAgents} sub={`${plannedAgents} planned`} color={C.green} icon={Zap} />
          <StatCard label="Annual Target" value="$1M" sub="Personal brand revenue" color={C.fire} icon={Target} />
          <StatCard label="Product Tiers" value="4" sub="$19 → $50K" color={C.gold} icon={Layers} />
        </div>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Agent Roster</h3>
          <div className="space-y-2">
            {AGENT_TEAM.map(agent => (
              <div key={agent.id} className="flex items-start gap-3 p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0" style={{ backgroundColor: agent.color }}>
                  {agent.id}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold" style={{ color: C.slate }}>{agent.name}</p>
                    <Badge text={agent.status} color={agent.status === "Active" ? C.green : "#94a3b8"} />
                    <Badge text={agent.priority} color={agent.priority === "high" ? C.fire : agent.priority === "medium" ? C.gold : "#94a3b8"} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{agent.focus}</p>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {agent.kpis.map((kpi, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 rounded" style={{ backgroundColor: agent.color + "12", color: agent.color }}>{kpi}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Product Ecosystem — Path to $1M</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {PRODUCT_TIERS.map((tier, i) => (
              <div key={i} className="p-3 rounded-lg border-2" style={{ borderColor: tier.color + "30", backgroundColor: C.greige }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: tier.color }} />
                  <span className="text-xs font-bold uppercase" style={{ color: tier.color }}>{tier.tier}</span>
                </div>
                <p className="text-sm font-bold" style={{ color: C.slate }}>{tier.name}</p>
                <p className="text-lg font-bold mt-1" style={{ color: tier.color }}>{tier.range}</p>
                <p className="text-xs text-gray-400 mb-2">Goal: {tier.goal}</p>
                <div className="space-y-1">
                  {tier.products.map((p, j) => (
                    <p key={j} className="text-xs" style={{ color: C.slate }}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Revenue Breakdown Target</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[
              { label: "Low-Ticket", monthly: "$3-5K", annual: "$48K", color: "#9CCFD9" },
              { label: "Workshops", monthly: "$5-10K", annual: "$90K", color: "#FAAB33" },
              { label: "Signature (2x)", monthly: "—", annual: "$125K", color: "#F56640" },
              { label: "Enterprise", monthly: "—", annual: "$150K", color: "#009470" },
              { label: "Content/Book", monthly: "~$15K", annual: "$180K+", color: "#8b5cf6" },
            ].map((r, i) => (
              <div key={i} className="text-center p-3 rounded-lg" style={{ backgroundColor: C.greige }}>
                <p className="text-xs text-gray-400">{r.label}</p>
                <p className="text-lg font-bold" style={{ color: r.color }}>{r.annual}</p>
                <p className="text-xs text-gray-400">{r.monthly}/mo</p>
              </div>
            ))}
          </div>
          <div className="mt-3 p-3 rounded-lg text-center" style={{ backgroundColor: C.fire + "10" }}>
            <p className="text-xs text-gray-400">Combined Annual Target</p>
            <p className="text-3xl font-bold" style={{ color: C.fire }}>$1,000,000</p>
            <p className="text-xs" style={{ color: C.fire }}>Systems over stress. Ease over hustle.</p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Content Framework — Reveals Method</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {[
              { step: "1", name: "Strong Hook", desc: "First 3 sec — create curiosity without revealing", color: C.fire },
              { step: "2", name: "Value Setup", desc: "Promise outcome, justify time investment", color: C.gold },
              { step: "3", name: "Sequential Reveals", desc: "Show info one-by-one, save best for last", color: "#8b5cf6" },
              { step: "4", name: "Clear Payoff", desc: "Deliver the 'aha' moment — screenshot-worthy", color: C.green },
              { step: "5", name: "CTA", desc: "Natural next step — comment, follow, bio link", color: C.sky },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-lg text-center" style={{ backgroundColor: C.greige }}>
                <div className="w-6 h-6 rounded-full mx-auto mb-1 flex items-center justify-center text-white text-xs font-bold" style={{ backgroundColor: s.color }}>{s.step}</div>
                <p className="text-xs font-bold" style={{ color: C.slate }}>{s.name}</p>
                <p className="text-xs text-gray-400 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-3">Weekly Content Mix</h3>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {[
              { type: "Educational", color: C.green },
              { type: "Educational", color: C.green },
              { type: "Identity", color: C.fire },
              { type: "Identity", color: C.fire },
              { type: "Contrarian", color: "#8b5cf6" },
              { type: "Case Study", color: C.gold },
              { type: "BTS", color: C.sky },
            ].map((d, i) => (
              <div key={i} className="p-2 rounded-lg text-center" style={{ backgroundColor: d.color + "12" }}>
                <p className="text-xs font-bold" style={{ color: d.color }}>{["Mon","Tue","Wed","Thu","Fri","Sat","Sun"][i]}</p>
                <p className="text-xs mt-0.5" style={{ color: C.slate }}>{d.type}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    );
  };

  const tabContent = {
    command: CommandCenter, money: MoneyTracker, body: BodyGoals, empire: Empire,
    babies: Babies, books: BookSalesTab, content: ContentPlanner, growth: GrowthTracker,
    agents: AgentTeam,
  };
  const ActiveTab = tabContent[tab];

  // Bottom tab bar for mobile
  const bottomTabs = [
    { id: "command", label: "Command Center", icon: LayoutDashboard },
    { id: "money", label: "Money", icon: DollarSign },
    { id: "body", label: "Body", icon: Heart },
    { id: "empire", label: "Empire", icon: Building2 },
    { id: "more", label: "More", icon: Menu },
  ];

  // ─── LOGIN SCREEN ───────────────────────────
  if (!isAuthed) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: C.slate, fontFamily: "'Inter', -apple-system, sans-serif" }}>
        <div className="text-center space-y-8 w-full max-w-sm">
          <div>
            <div className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center" style={{ backgroundColor: C.fire }}>
              <span className="text-white font-extrabold text-xl">MO</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white">Morgan's OS</h1>
            <p className="text-sm mt-1" style={{ color: C.sky }}>Personal Operating System</p>
          </div>
          <div className="space-y-4">
            <div className="relative">
              <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "rgba(255,255,255,0.3)" }} />
              <input
                type="password"
                placeholder="Enter PIN"
                value={pin}
                onChange={e => { setPin(e.target.value); setPinError(false); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                className="w-full text-center text-lg tracking-[0.3em] pl-10 pr-4 py-4 rounded-xl border-2 bg-white/5 text-white placeholder-white/30 focus:outline-none transition-all"
                style={{ borderColor: pinError ? C.fire : "rgba(255,255,255,0.1)" }}
                autoFocus
              />
            </div>
            {pinError && (
              <p className="text-sm font-medium" style={{ color: C.fire }}>Incorrect PIN. Try again.</p>
            )}
            <button
              onClick={handleLogin}
              className="w-full py-4 rounded-xl text-white font-bold text-sm tracking-wide transition-all hover:opacity-90"
              style={{ backgroundColor: C.fire }}
            >
              Unlock
            </button>
          </div>
          <p className="text-xs" style={{ color: "rgba(255,255,255,0.2)" }}>WorkSmart by Morgan DeBaun</p>
        </div>
      </div>
    );
  }

  // ─── MAIN RENDER ───────────────────────────
  return (
    <div className="flex flex-col h-screen overflow-hidden" style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}>
      {/* Desktop Sidebar */}
      <div className="flex flex-1 overflow-hidden">
        <div className="hidden md:flex flex-col py-4 px-2" style={{ width: 220, backgroundColor: C.slate, minHeight: "100vh" }}>
          <div className="px-3 mb-6">
            <h1 className="text-base font-extrabold text-white tracking-tight">Morgan's OS</h1>
            <p className="text-xs mt-0.5" style={{ color: C.sky }}>Personal Operating System</p>
          </div>
          <div className="flex-1 space-y-0.5">
            {TABS.map(t => {
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all"
                  style={{ backgroundColor: active ? "rgba(255,255,255,0.1)" : "transparent", color: active ? C.white : "rgba(255,255,255,0.5)" }}>
                  <t.icon size={16} />
                  <span className="text-sm font-medium">{t.label}</span>
                </button>
              );
            })}
          </div>
          <div className="px-3 pt-4 border-t border-white/10 space-y-2">
            <button onClick={handleLogout} className="flex items-center gap-2 w-full px-2 py-1.5 rounded-lg hover:bg-white/5 transition-all" style={{ color: "rgba(255,255,255,0.3)" }}>
              <LogOut size={14} />
              <span className="text-xs">Log Out</span>
            </button>
            <p className="text-xs" style={{ color: "rgba(255,255,255,0.3)" }}>WorkSmart by Morgan DeBaun</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto pb-20 md:pb-0 md:p-6" style={{ backgroundColor: C.greige }}>
          <div className="max-w-5xl mx-auto p-4 md:p-0">
            <ActiveTab />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Tab Bar */}
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 safe-area-inset-bottom">
        <div className="flex w-full">
          {bottomTabs.map(t => {
            const active = tab === t.id || (t.id === "more" && showMore);
            const Icon = t.icon;
            return (
              <button
                key={t.id}
                onClick={() => {
                  if (t.id === "more") {
                    setShowMore(!showMore);
                  } else {
                    setTab(t.id);
                    setShowMore(false);
                  }
                }}
                className="flex-1 flex flex-col items-center justify-center py-3 text-xs font-medium transition-colors"
                style={{ color: active ? C.fire : C.slate }}
              >
                <Icon size={20} className="mb-1" />
                <span className="truncate">{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile More Menu */}
      {showMore && (
        <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setShowMore(false)}>
          <div className="absolute bottom-20 left-0 right-0 bg-white rounded-t-lg p-4 max-h-96 overflow-y-auto" onClick={e => e.stopPropagation()}>
            <h3 className="text-sm font-bold uppercase tracking-wide text-gray-400 mb-4">More Sections</h3>
            <div className="space-y-2">
              {[
                { id: "babies", label: "Babies", icon: Baby },
                { id: "books", label: "Book Sales", icon: BookOpen },
                { id: "content", label: "Content", icon: PenTool },
                { id: "growth", label: "Growth", icon: TrendingUp },
                { id: "agents", label: "Agent Team", icon: Users },
              ].map(t => {
                const Icon = t.icon;
                const active = tab === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTab(t.id);
                      setShowMore(false);
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors"
                    style={{ backgroundColor: active ? C.fire + "15" : "transparent", color: active ? C.fire : C.slate }}
                  >
                    <Icon size={18} />
                    <span className="text-sm font-medium">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
