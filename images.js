window.IM=["img/p00.webp", "img/p01.webp", "img/p02.webp", "img/p03.webp", "img/p04.webp", "img/p05.webp", "img/p06.webp", "img/p07.webp", "img/p08.webp", "img/p09.webp", "img/p10.webp", "img/p11.webp", "img/p12.webp", "img/p13.webp", "img/p14.webp"];

(function(){

var G = [];
document.querySelectorAll('img[data-im]').forEach(function (img) {
    var index = Number(img.dataset.im);
    if (window.IM[index]) img.src = window.IM[index];
});

var gg = document.getElementById('gg');
var lb = document.getElementById('lb');
if (!gg || !lb) return;

var albumData = [
    { title: 'Campaign on Gandhi Jayanti 2 October 2026', short: 'Gandhi Jayanti 2026', slug: '01-gandhi-jayanti-2026', count: 17 },
    { title: 'Investiture Ceremony', short: 'Investiture Ceremony', slug: '02-investiture-ceremony', count: 52 },
    { title: 'ICSE Result 2023–2024', short: 'ICSE Result 2023–2024', slug: '03-icse-result-2023-2024', count: 13 },
    { title: "Labour's Day", short: "Labour's Day", slug: '04-labours-day', count: 12 },
    { title: 'Games 2023', short: 'Games 2023', slug: '05-games-2023', count: 8 },
    { title: 'Annual Function 2022', short: 'Annual Function 2022', slug: '06-annual-function-2022', count: 152 }
];

var photos = [];
var albumMarkup = albumData.map(function (album, albumIndex) {
    var cards = '';
    for (var i = 1; i <= album.count; i++) {
        var src = 'img/albums/' + album.slug + '/p' + String(i).padStart(3, '0') + '.webp';
        var photo = {
            src: src,
            album: album.title,
            albumIndex: albumIndex,
            number: i,
            total: album.count
        };
        var photoIndex = photos.push(photo) - 1;
        cards += '<li class="gallery-card gi" data-photo-index="' + photoIndex + '">' +
            '<button class="gallery-card-button" type="button" aria-label="Open ' +
            album.short.replace(/&/g, '&amp;').replace(/"/g, '&quot;') +
            ', photo ' + i + '">' +
            '<img src="' + src + '" alt="' + album.short.replace(/&/g, '&amp;') +
            ' — photo ' + i + '" loading="lazy" decoding="async">' +
            '<span class="gallery-card-index">' + String(i).padStart(2, '0') + '</span>' +
            '</button></li>';
    }

    return '<section class="gallery-album" aria-labelledby="gallery-album-title-' + albumIndex + '">' +
        '<div class="gallery-album-heading">' +
        '<div class="gallery-album-copy"><span class="gallery-album-kicker">ALBUM 0' + (albumIndex + 1) +
        '</span><h3 id="gallery-album-title-' + albumIndex + '">' + album.title +
        '</h3><p>' + album.count + ' photographs</p></div>' +
        '<div class="gallery-album-tools">' +
        '<button class="gallery-arrow gallery-prev" type="button" aria-label="Scroll ' + album.short + ' left">←</button>' +
        '<div class="gallery-progress" role="img" aria-label="Album scroll progress">' +
        '<svg viewBox="0 0 44 44" aria-hidden="true"><circle class="gallery-progress-bg" cx="22" cy="22" r="17" pathLength="1"></circle>' +
        '<circle class="gallery-progress-value" cx="22" cy="22" r="17" pathLength="1"></circle></svg>' +
        '<span class="gallery-progress-label">0%</span></div>' +
        '<button class="gallery-arrow gallery-next" type="button" aria-label="Scroll ' + album.short + ' right">→</button>' +
        '</div></div>' +
        '<div class="gallery-track-shell"><ul class="gallery-track" tabindex="0" aria-label="' +
        album.short + ' photographs">' + cards + '</ul></div></section>';
}).join('');

gg.className = 'gallery-albums';
gg.innerHTML = albumMarkup;

var lightboxImage = lb.querySelector('img');
var lightboxCaption = lb.querySelector('figcaption');
var currentPhoto = 0;
var touchStartX = 0;

function showPhoto(index) {
    currentPhoto = (index + photos.length) % photos.length;
    var photo = photos[currentPhoto];
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.album + ' — photo ' + photo.number;
    lightboxCaption.textContent = photo.album + ' · Photo ' + photo.number + ' of ' + photo.total;
}

function openPhoto(index) {
    showPhoto(index);
    lb.hidden = false;
    document.documentElement.style.overflow = 'hidden';
}

function closePhoto() {
    lb.hidden = true;
    document.documentElement.style.overflow = '';
}

gg.addEventListener('click', function (event) {
    var button = event.target.closest('.gallery-card-button');
    if (!button) return;
    var card = button.closest('[data-photo-index]');
    if (card) openPhoto(Number(card.dataset.photoIndex));
});

lb.querySelector('.lbx').addEventListener('click', closePhoto);
lb.querySelector('.lbp').addEventListener('click', function () { showPhoto(currentPhoto - 1); });
lb.querySelector('.lbn').addEventListener('click', function () { showPhoto(currentPhoto + 1); });
lb.addEventListener('click', function (event) {
    if (event.target === lb) closePhoto();
});
lb.addEventListener('touchstart', function (event) {
    touchStartX = event.touches[0].clientX;
}, { passive: true });
lb.addEventListener('touchend', function (event) {
    var delta = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 48) showPhoto(currentPhoto + (delta < 0 ? 1 : -1));
}, { passive: true });

document.addEventListener('keydown', function (event) {
    if (lb.hidden) return;
    if (event.key === 'Escape') closePhoto();
    if (event.key === 'ArrowLeft') showPhoto(currentPhoto - 1);
    if (event.key === 'ArrowRight') showPhoto(currentPhoto + 1);
});

/* Motion.dev-style horizontal scroll progress, edge mask and controls */
function setupAlbumTracks() {
    gg.querySelectorAll('.gallery-album').forEach(function (section) {
        var track = section.querySelector('.gallery-track');
        var ring = section.querySelector('.gallery-progress-value');
        var label = section.querySelector('.gallery-progress-label');
        var prev = section.querySelector('.gallery-prev');
        var next = section.querySelector('.gallery-next');
        var circumference = 1;

        function updateTrack() {
            var max = Math.max(0, track.scrollWidth - track.clientWidth);
            var progress = max > 0 ? track.scrollLeft / max : 0;
            progress = Math.max(0, Math.min(1, progress));
            ring.style.strokeDasharray = circumference;
            ring.style.strokeDashoffset = String(1 - progress);
            label.textContent = Math.round(progress * 100) + '%';

            if (max <= 1) {
                track.style.maskImage = 'none';
                track.style.webkitMaskImage = 'none';
            } else if (progress <= 0.002) {
                var startMask = 'linear-gradient(90deg, #000 0%, #000 82%, transparent 100%)';
                track.style.maskImage = startMask;
                track.style.webkitMaskImage = startMask;
            } else if (progress >= 0.998) {
                var endMask = 'linear-gradient(90deg, transparent 0%, #000 18%, #000 100%)';
                track.style.maskImage = endMask;
                track.style.webkitMaskImage = endMask;
            } else {
                var middleMask = 'linear-gradient(90deg, transparent 0%, #000 8%, #000 92%, transparent 100%)';
                track.style.maskImage = middleMask;
                track.style.webkitMaskImage = middleMask;
            }

            prev.disabled = track.scrollLeft <= 1;
            next.disabled = track.scrollLeft >= max - 1;
        }

        track.addEventListener('scroll', updateTrack, { passive: true });
        window.addEventListener('resize', updateTrack);
        prev.addEventListener('click', function () {
            track.scrollBy({ left: -track.clientWidth * 0.82, behavior: 'smooth' });
        });
        next.addEventListener('click', function () {
            track.scrollBy({ left: track.clientWidth * 0.82, behavior: 'smooth' });
        });
        track.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight') {
                event.preventDefault();
                track.scrollBy({ left: 260, behavior: 'smooth' });
            } else if (event.key === 'ArrowLeft') {
                event.preventDefault();
                track.scrollBy({ left: -260, behavior: 'smooth' });
            }
        });

        updateTrack();
        if ('ResizeObserver' in window) {
            var resizeObserver = new ResizeObserver(updateTrack);
            resizeObserver.observe(track);
        }
    });
}

setupAlbumTracks();


/* Preserve existing school hub functionality */
var hp=[].slice.call(
    document.querySelectorAll('.hp')
);

var hb=[].slice.call(
    document.querySelectorAll('[data-h]')
);

function oh(n){

    hp.forEach(function(p){
        p.classList.toggle(
            'on',
            p.id==='hub-'+n
        );
    });

    hb.forEach(function(b){

        var o=b.dataset.h===n;

        b.classList.toggle('on',o);

        b.setAttribute(
            'aria-selected',
            o
        );
    });
}

hb.forEach(function(b){
    b.onclick=function(){
        oh(b.dataset.h);
    };
});

document.querySelectorAll('[data-hub]').forEach(
    function(a){
        a.addEventListener('click',function(){
            oh(a.dataset.hub);
        });
    }
);

/* Preserve existing scroll reveal functionality */
var io=window.IntersectionObserver&&
    new IntersectionObserver(
        function(es){

            es.forEach(function(e){

                if(e.isIntersecting){

                    e.target.classList.add('visible');

                    io.unobserve(e.target);
                }
            });

        },
        {threshold:.08}
    );

document.querySelectorAll(
    '.nx .section-kicker,.nx .section-title,.nx .lead,.nx .pr,.nx .hub'
).forEach(function(e){

    e.classList.add('reveal');

    io
        ?io.observe(e)
        :e.classList.add('visible');

});

})();

/* =========================================
   CINEMATIC GALLERY MOTION
   Append after the existing images.js code
========================================= */

(function () {
  "use strict";

  function startGalleryMotion() {
    var gallery = document.getElementById("gg");
    var viewer = document.getElementById("lb");

    if (!gallery) return;

    var cards = Array.from(gallery.querySelectorAll(".gi"));
    var hasGSAP = !!(window.gsap && window.ScrollTrigger);
    var reducedMotion = window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!cards.length) return;

    /* Register GSAP ScrollTrigger */
    if (hasGSAP) {
      gsap.registerPlugin(ScrollTrigger);
    }

    /* LENIS SMOOTH SCROLL */
    var lenis = null;

    if (!reducedMotion && window.Lenis) {
      try {
        lenis = new Lenis({
          duration: 1.15,
          smoothWheel: true,
          wheelMultiplier: 0.9,
          touchMultiplier: 1.05
        });

        if (hasGSAP) {
          lenis.on("scroll", ScrollTrigger.update);

          gsap.ticker.add(function (time) {
            lenis.raf(time * 1000);
          });

          gsap.ticker.lagSmoothing(0);
        } else {
          function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
          }
          requestAnimationFrame(raf);
        }

      } catch (error) {
        console.warn("Lenis could not start:", error);
      }
    }

    /* STAGGERED SCROLL REVEALS */
    if (hasGSAP && !reducedMotion) {
      gsap.set(cards, {
        autoAlpha: 0,
        y: 65,
        scale: 0.94,
        rotateX: 7,
        transformPerspective: 1200
      });

      ScrollTrigger.batch(cards, {
        start: "top 88%",
        once: true,
        onEnter: function (elements) {
          gsap.to(elements, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
            overwrite: true
          });
        }
      });
    } else {
      cards.forEach(function (card) {
        card.style.opacity = "1";
        card.style.visibility = "visible";
      });
    }

    /* INTERACTIVE 3D CARD TILT */
    var desktop = window.matchMedia &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (desktop && hasGSAP && !reducedMotion) {
      cards.forEach(function (card) {
        var image = card.querySelector("img");
        if (!image) return;

        card.addEventListener("pointermove", function (event) {
          var rect = card.getBoundingClientRect();

          var x = (event.clientX - rect.left) / rect.width;
          var y = (event.clientY - rect.top) / rect.height;

          gsap.to(card, {
            rotateY: (x - 0.5) * 14,
            rotateX: (0.5 - y) * 12,
            z: 15,
            transformPerspective: 1100,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });

          gsap.to(image, {
            x: (x - 0.5) * -14,
            y: (y - 0.5) * -12,
            scale: 1.12,
            duration: 0.4,
            ease: "power2.out",
            overwrite: "auto"
          });
        });

        card.addEventListener("pointerleave", function () {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            z: 0,
            duration: 0.65,
            ease: "elastic.out(1, 0.55)",
            overwrite: "auto"
          });

          gsap.to(image, {
            x: 0,
            y: 0,
            scale: 1,
            duration: 0.6,
            ease: "power3.out",
            overwrite: "auto"
          });
        });
      });
    }

    /* CINEMATIC FULLSCREEN VIEWER */
    if (viewer && hasGSAP && !reducedMotion) {
      var figure = viewer.querySelector("figure");
      var image = viewer.querySelector("img");

      var observer = new MutationObserver(function () {
        if (!viewer.hidden) {
          document.documentElement.classList.add(
            "gallery-viewer-open"
          );

          gsap.killTweensOf(viewer);

          gsap.fromTo(viewer,
            {
              autoAlpha: 0,
              filter: "blur(12px)"
            },
            {
              autoAlpha: 1,
              filter: "blur(0px)",
              duration: 0.48,
              ease: "power2.out"
            }
          );

          if (figure) {
            gsap.fromTo(figure,
              {
                y: 45,
                scale: 0.88,
                rotateX: 7,
                autoAlpha: 0,
                transformPerspective: 1200
              },
              {
                y: 0,
                scale: 1,
                rotateX: 0,
                autoAlpha: 1,
                duration: 0.78,
                ease: "power3.out"
              }
            );
          }
        } else {
          document.documentElement.classList.remove(
            "gallery-viewer-open"
          );
        }
      });

      observer.observe(viewer, {
        attributes: true,
        attributeFilter: ["hidden"]
      });

      /* Animate slideshow image changes */
      if (image) {
        var imageObserver = new MutationObserver(function () {
          gsap.fromTo(image,
            {
              autoAlpha: 0,
              scale: 1.045,
              y: 15
            },
            {
              autoAlpha: 1,
              scale: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out"
            }
          );
        });

        imageObserver.observe(image, {
          attributes: true,
          attributeFilter: ["src"]
        });
      }
    }

    /* Refresh layout after images load */
    if (hasGSAP) {
      window.addEventListener("load", function () {
        ScrollTrigger.refresh();
      });

      window.addEventListener("resize", function () {
        ScrollTrigger.refresh();
      });
    }

  }

  if (document.readyState === "loading") {
    document.addEventListener(
      "DOMContentLoaded",
      startGalleryMotion,
      { once: true }
    );
  } else {
    startGalleryMotion();
  }

})();
