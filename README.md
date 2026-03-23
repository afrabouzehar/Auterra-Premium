# 🚗 AutoLoc — Fictional Car Rental Website

A static front-end project simulating a car rental platform. Built with plain HTML, CSS, and JavaScript — no back-end, no framework, just clean web fundamentals.

> ⚠️ **This is a fictional project.** No real bookings, payments, or data are processed.

---

## 📁 Project Structure

```
carloc/
├── index.html          # Accueil (Home page)
├── catalogue.html      # Catalogue (Car listing page)
├── reservation.html    # Réservation (Booking form page)
├── apropos.html        # À propos (About page)
├── contact.html        # Contact page
├── README.md        
│
├── css/
│   ├── style.css       # Global styles (reset, typography, colors)
│   ├── index.css       # Navigation bar styles
│   ├── apropos.css     
│   ├── catalogue.css      
│   ├── reservation.css
│   ├── contact.css      
│
├── js/
│   ├── contact.js        
│   ├── catalogue.js    # Car card rendering & filters
│   └── resevation.js  # Booking form validation & summary
    └── nav.js          # navigation bar plus


---

## 📄 Pages

| File | Nav Label | Description |
|------|-----------|-------------|
| `index.html` | Accueil | Hero section, highlights, call-to-action |
| `catalogue.html` | Catalogue | Grid of available cars with filters |
| `reservation.html` | Réservation | Booking form (dates, car choice, user info) |
| `apropos.html` | À propos | About the (fictional) company |
| `contact.html` | Contact | Contact form and fake address / map |

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Flexbox, Grid, custom properties, responsive design
- **Vanilla JavaScript** — DOM manipulation, form validation, dynamic content

---

## 🚀 Getting Started

No dependencies, no install needed.

```bash
git clone https://github.com/your-username/Auto-Loc.git
cd Auto-Loc
```

Then just open `index.html` in your browser — or use a local server for a better experience:

```bash
# With VS Code
# → Right-click index.html → "Open with Live Server"

# Or with Python
python -m http.server 5500
```

---

## ✨ Features

- Responsive navigation bar with active page highlight
- Car catalogue with category filters (SUV, Sedan, etc.)
- Reservation form with client-side validation and booking summary
- Clean, mobile-friendly layout

---

## 📌 Notes

- All data (cars, prices, availability) is **hardcoded/fake**
- The reservation form does **not** submit to any server
- Designed as a **portfolio / learning project**

---

## 📜 License

MIT — free to use, modify, and share.
