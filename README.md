# St. Mary's Convent School, Ghazipur

A premium, immersive website for **St. Mary's Convent School, Tadvanva, Ghazipur (U.P.) 233001**, built with plain HTML, CSS and JavaScript. It features an interactive 3D model of the school campus, an animated liquid background and a full school handbook.

> *Education of the whole person.*

---

## About the school

St. Mary's Convent School was founded on 12 July 1982 in Tulsi Sagar, Ghazipur, and later moved to its Tadvanva campus at Vidya Niketan. Its guiding objective is the integral formation of every child: character, intellect, values, physical well-being and social responsibility.

| | |
|---|---|
| **Address** | Tadvanva, Ghazipur, Uttar Pradesh 233001, India |
| **Phone** | +91 94504 82895 · 0548-2222612 |
| **Email** | stmaryconventschoolgzp@gmail.com |
| **YouTube** | [@st.marysconventschoolghazi4649](https://youtube.com/@st.marysconventschoolghazi4649?si=TslvxI4Q3ZIZOz5B) |
| **e-Care school code** | SCSDEL |

---

## Website features

- **Interactive 3D campus** built with Three.js: drag to rotate, pinch to zoom, camera views (Front, Aerial, Courtyard, Top), lighting (Day, Sunset, Night), auto orbit and a guided tour
- **Animated liquid silk background** (lightweight, adapts to the device)
- **Loading screen** with a live percentage
- **Sections:** Our Story, Our Values, Campus, Facilities, Admissions, Principal, Gallery, School Handbook (About, Academics, Campus, Rules, Toppers, Notices & App) and Get in Touch with Google Maps
- **Ask St. Mary's helper**, side section dots (desktop) and a fast, lightweight loading setup (deferred scripts, lazy-loaded WebP photos)
- **Premium motion layer:** animated number counters, a gold values marquee, a custom cursor with magnetic buttons, card spotlight glow, tap ripples and masked title reveals
- **Photo gallery** with a full-screen viewer
- **Scroll reveal animations**, subtle 3D tilt on cards and a progress bar
- **Responsive on all devices:** phone, tablet, laptop and desktop, with a hamburger menu at 1100 px and below
- **Accessible and considerate:** respects "reduced motion", with keyboard-friendly controls and semantic markup
- **SEO ready:** structured data (schema.org `School`) and meta tags
- **Social links:** YouTube channel in the contact section, footer and handbook

---

## Project structure

```
st-marys-school/
├── index.html    # page markup and content
├── style.css     # all styling and responsive rules
├── script.js     # 3D campus, menu, animations and interactions
├── images.js     # list of the photo files in img/
├── img/          # school photographs (optimised WebP)
├── logo.png      # school logo
└── README.md
```

Keep all the files in the **same folder**, with the photos inside `img/`.

## Run it

1. Download or clone the repository.
2. Open `index.html` in any modern browser. No build step or installation is needed.
3. An internet connection is needed for Google Fonts (Playfair Display, DM Sans), the Three.js library and the Google Maps embed. To work fully offline, place `three.min.js` and `OrbitControls.js` (r128) next to `index.html`; the page falls back to them automatically.

### Publish with GitHub Pages

Repository **Settings → Pages → Deploy from a branch → `main` / root**. The site will be live at `https://<username>.github.io/<repository>/`.

## Customise

- **Contact details, text and links:** edit `index.html`
- **Colours, spacing and breakpoints:** edit the variables at the top of `style.css`
- **Photographs:** replace the images in `images.js`

---

## Built with

HTML5 · CSS3 · Vanilla JavaScript · [Three.js](https://threejs.org/) (r128) · Google Fonts · Google Maps embed

---

## About the creator

**Shrawan Kumar Gupta** ([@VoidPhantoms](https://github.com/VoidPhantoms)), a freelance web designer who builds premium, high-quality websites with 3D, motion and liquid effects for local businesses and institutions.

Other projects:

- [SM-Palace-GHAZIPUR](https://github.com/VoidPhantoms/SM-Palace-GHAZIPUR): hotel website
- [ForgeHouse-Gym](https://github.com/VoidPhantoms/ForgeHouse-Gym): gym website
- [Restaurent](https://github.com/VoidPhantoms/Restaurent): restaurant website
- [Coding-Club](https://github.com/VoidPhantoms/Coding-Club)

Want a website like this? Reach out through [GitHub](https://github.com/VoidPhantoms).

---

## Credits and rights

Designed by **@VoidPhantoms**. The school name, logo, photographs and written content belong to **St. Mary's Convent School, Ghazipur**, and are used here with the school's permission. Please do not reuse them without consent.
