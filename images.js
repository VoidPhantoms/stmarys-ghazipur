/* St. Mary's Convent School — gallery-only controller
   Six vertically stacked album sections; each section scrolls horizontally.
   Existing non-gallery page behavior is preserved below. */
(function () {
  "use strict";

  window.IM = [
    "img/p00.webp", "img/p01.webp", "img/p02.webp",
    "img/p03.webp", "img/p04.webp", "img/p05.webp",
    "img/p06.webp", "img/p07.webp", "img/p08.webp",
    "img/p09.webp", "img/p10.webp", "img/p11.webp",
    "img/p12.webp", "img/p13.webp", "img/p14.webp"
  ];

  document.querySelectorAll("img[data-im]").forEach(function (img) {
    var index = Number(img.dataset.im);
    if (window.IM[index]) img.src = window.IM[index];
  });

  var galleryRoot = document.getElementById("gg");
  var lightbox = document.getElementById("lb");
  var reducedMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var albums = [
    {
      title: "Campaign on Gandhi Jayanti 2 October 2026",
      short: "Gandhi Jayanti 2026",
      slug: "01-gandhi-jayanti-2026",
      count: 17
    },
    {
      title: "Investiture Ceremony",
      short: "Investiture Ceremony",
      slug: "02-investiture-ceremony",
      count: 52
    },
    {
      title: "ICSE Result 2023–2024",
      short: "ICSE Result 2023–2024",
      slug: "03-icse-result-2023-2024",
      count: 13
    },
    {
      title: "Labour's Day",
      short: "Labour's Day",
      slug: "04-labours-day",
      count: 12
    },
    {
      title: "Games 2023",
      short: "Games 2023",
      slug: "05-games-2023",
      count: 8
    },
    {
      title: "Annual Function 2022",
      short: "Annual Function 2022",
      slug: "06-annual-function-2022",
      count: 152
    }
  ];

  var photos = [];

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, function (character) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function buildGallery() {
    if (!galleryRoot) return;

    var markup = albums.map(function (album, albumIndex) {
      var cards = "";

      for (var number = 1; number <= album.count; number += 1) {
        var source = "img/albums/" + album.slug + "/p" +
          String(number).padStart(3, "0") + ".webp";

        var photoIndex = photos.push({
          src: source,
          album: album.title,
          albumIndex: albumIndex,
          number: number,
          total: album.count
        }) - 1;

        cards +=
          '<li class="gallery-card gi" data-photo-index="' + photoIndex + '">' +
            '<button class="gallery-card-button" type="button" aria-label="Open ' +
              escapeHTML(album.short) + ', photo ' + number + '">' +
              '<img src="' + escapeHTML(source) + '" alt="' +
                escapeHTML(album.short + " — photo " + number) +
                '" loading="lazy" decoding="async" draggable="false">' +
              '<span class="gallery-card-index">' +
                String(number).padStart(2, "0") + "</span>" +
            "</button>" +
          "</li>";
      }

      var safeTitle = escapeHTML(album.title);
      var safeShort = escapeHTML(album.short);

      return (
        '<section class="gallery-album" aria-labelledby="gallery-album-title-' +
          albumIndex + '">' +
          '<div class="gallery-album-heading">' +
            '<div class="gallery-album-copy">' +
              '<span class="gallery-album-kicker">ALBUM 0' +
                (albumIndex + 1) + " / 06</span>" +
              '<h3 id="gallery-album-title-' + albumIndex + '">' +
                safeTitle + "</h3>" +
              '<p>' + album.count + ' photographs <span aria-hidden="true">·</span> ' +
                "Swipe or drag to explore</p>" +
            "</div>" +
            '<div class="gallery-album-tools" aria-label="' +
              safeShort + ' controls">' +
              '<button class="gallery-arrow gallery-prev" type="button" ' +
                'aria-label="Scroll ' + safeShort + ' left" disabled>' +
                '<span aria-hidden="true">←</span></button>' +
              '<div class="gallery-progress" role="img" aria-label="' +
                safeShort + ' scroll progress">' +
                '<svg viewBox="0 0 44 44" aria-hidden="true">' +
                  '<circle class="gallery-progress-bg" cx="22" cy="22" r="17" ' +
                    'pathLength="1"></circle>' +
                  '<circle class="gallery-progress-value" cx="22" cy="22" r="17" ' +
                    'pathLength="1"></circle>' +
                "</svg>" +
                '<span class="gallery-progress-label">0%</span>' +
              "</div>" +
              '<button class="gallery-arrow gallery-next" type="button" ' +
                'aria-label="Scroll ' + safeShort + ' right">' +
                '<span aria-hidden="true">→</span></button>' +
            "</div>" +
          "</div>" +
          '<div class="gallery-track-shell">' +
            '<ul class="gallery-track" tabindex="0" aria-label="' +
              safeShort + ' photos">' + cards + "</ul>" +
          "</div>" +
        "</section>"
      );
    }).join("");

    galleryRoot.className = "gallery-albums";
    galleryRoot.innerHTML = markup;
    galleryRoot.setAttribute("aria-label", "Six school photo albums");
  }

  function setupAlbumTracks() {
    if (!galleryRoot) return;

    galleryRoot.querySelectorAll(".gallery-album").forEach(function (section) {
      var track = section.querySelector(".gallery-track");
      var progressRing = section.querySelector(".gallery-progress-value");
      var progressLabel = section.querySelector(".gallery-progress-label");
      var previous = section.querySelector(".gallery-prev");
      var next = section.querySelector(".gallery-next");

      if (!track || !progressRing || !progressLabel || !previous || !next) {
        return;
      }

      var framePending = false;
      var dragPointer = null;
      var dragStartX = 0;
      var dragStartScroll = 0;
      var dragMoved = false;
      var suppressClick = false;

      function updateProgress() {
        framePending = false;

        var maximum = Math.max(0, track.scrollWidth - track.clientWidth);
        var fraction = maximum > 0 ? track.scrollLeft / maximum : 0;
        fraction = Math.max(0, Math.min(1, fraction));

        progressRing.style.strokeDasharray = "1";
        progressRing.style.strokeDashoffset = String(1 - fraction);
        progressLabel.textContent = Math.round(fraction * 100) + "%";

        previous.disabled = track.scrollLeft <= 1;
        next.disabled = track.scrollLeft >= maximum - 1 || maximum <= 1;

        if (maximum <= 1) {
          track.style.maskImage = "none";
          track.style.webkitMaskImage = "none";
        } else if (fraction <= 0.002) {
          var startMask =
            "linear-gradient(90deg, #000 0%, #000 84%, transparent 100%)";
          track.style.maskImage = startMask;
          track.style.webkitMaskImage = startMask;
        } else if (fraction >= 0.998) {
          var endMask =
            "linear-gradient(90deg, transparent 0%, #000 16%, #000 100%)";
          track.style.maskImage = endMask;
          track.style.webkitMaskImage = endMask;
        } else {
          var middleMask =
            "linear-gradient(90deg, transparent 0%, #000 7%, #000 93%, transparent 100%)";
          track.style.maskImage = middleMask;
          track.style.webkitMaskImage = middleMask;
        }
      }

      function scheduleProgress() {
        if (framePending) return;
        framePending = true;

        if (window.requestAnimationFrame) {
          window.requestAnimationFrame(updateProgress);
        } else {
          updateProgress();
        }
      }

      function moveByPage(direction) {
        track.scrollBy({
          left: direction * track.clientWidth * 0.82,
          behavior: reducedMotion ? "auto" : "smooth"
        });
      }

      track.addEventListener("scroll", scheduleProgress, {
        passive: true
      });

      previous.addEventListener("click", function () {
        moveByPage(-1);
      });

      next.addEventListener("click", function () {
        moveByPage(1);
      });

      track.addEventListener("keydown", function (event) {
        if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
          event.preventDefault();

          track.scrollBy({
            left: event.key === "ArrowRight" ? 260 : -260,
            behavior: reducedMotion ? "auto" : "smooth"
          });
        }
      });

      /* Desktop mouse-drag; touch devices keep native swipe scrolling. */
      track.addEventListener("pointerdown", function (event) {
        if (event.pointerType !== "mouse" || event.button !== 0) return;

        dragPointer = event.pointerId;
        dragStartX = event.clientX;
        dragStartScroll = track.scrollLeft;
        dragMoved = false;

        track.classList.add("is-pointer-dragging");
      });

      track.addEventListener("pointermove", function (event) {
        if (dragPointer !== event.pointerId) return;

        var distance = event.clientX - dragStartX;

        if (Math.abs(distance) > 5) dragMoved = true;

        if (dragMoved) {
          track.scrollLeft = dragStartScroll - distance;
          event.preventDefault();
        }
      });

      function endDrag(event) {
        if (dragPointer !== event.pointerId) return;

        dragPointer = null;
        track.classList.remove("is-pointer-dragging");

        if (dragMoved) {
          suppressClick = true;

          window.setTimeout(function () {
            suppressClick = false;
          }, 80);
        }

        dragMoved = false;
      }

      track.addEventListener("pointerup", endDrag);
      track.addEventListener("pointercancel", endDrag);
      track.addEventListener("pointerleave", endDrag);

      track.addEventListener("click", function (event) {
        if (!suppressClick) return;

        event.preventDefault();
        event.stopPropagation();
      }, true);

      if ("ResizeObserver" in window) {
        var resizeObserver = new ResizeObserver(scheduleProgress);
        resizeObserver.observe(track);
      } else {
        window.addEventListener("resize", scheduleProgress, {
          passive: true
        });
      }

      scheduleProgress();
    });
  }

  var activePhoto = 0;
  var previousOverflow = "";
  var previousBodyOverflow = "";
  var lastFocusedElement = null;
  var touchStartX = 0;

  function showPhoto(index) {
    if (!photos.length || !lightbox) return;

    activePhoto = (index + photos.length) % photos.length;

    var photo = photos[activePhoto];
    var image = lightbox.querySelector("img");
    var caption = lightbox.querySelector("figcaption");

    if (!image || !caption) return;

    image.src = photo.src;
    image.alt = photo.album + " — photo " + photo.number;

    caption.textContent =
      photo.album + " · Photo " + photo.number + " of " + photo.total;
  }

  function openPhoto(index, trigger) {
    if (!lightbox) return;

    lastFocusedElement = trigger || document.activeElement;

    previousOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;

    showPhoto(index);

    lightbox.hidden = false;
    lightbox.setAttribute("aria-modal", "true");

    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    var closeButton = lightbox.querySelector(".lbx");
    if (closeButton) closeButton.focus();
  }

  function closePhoto() {
    if (!lightbox || lightbox.hidden) return;

    lightbox.hidden = true;

    document.documentElement.style.overflow = previousOverflow;
    document.body.style.overflow = previousBodyOverflow;

    if (lastFocusedElement &&
        typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  if (galleryRoot) {
    galleryRoot.addEventListener("click", function (event) {
      var button = event.target.closest(".gallery-card-button");
      if (!button) return;

      var card = button.closest("[data-photo-index]");
      if (!card) return;

      openPhoto(Number(card.dataset.photoIndex), button);
    });
  }

  if (lightbox) {
    var closeButton = lightbox.querySelector(".lbx");
    var previousButton = lightbox.querySelector(".lbp");
    var nextButton = lightbox.querySelector(".lbn");

    if (closeButton) {
      closeButton.addEventListener("click", closePhoto);
    }

    if (previousButton) {
      previousButton.addEventListener("click", function () {
        showPhoto(activePhoto - 1);
      });
    }

    if (nextButton) {
      nextButton.addEventListener("click", function () {
        showPhoto(activePhoto + 1);
      });
    }

    lightbox.addEventListener("click", function (event) {
      if (event.target === lightbox) closePhoto();
    });

    lightbox.addEventListener("touchstart", function (event) {
      touchStartX = event.touches[0].clientX;
    }, { passive: true });

    lightbox.addEventListener("touchend", function (event) {
      var distance = event.changedTouches[0].clientX - touchStartX;

      if (Math.abs(distance) > 48) {
        showPhoto(activePhoto + (distance < 0 ? 1 : -1));
      }
    }, { passive: true });

    document.addEventListener("keydown", function (event) {
      if (lightbox.hidden) return;

      if (event.key === "Escape") closePhoto();
      if (event.key === "ArrowLeft") showPhoto(activePhoto - 1);
      if (event.key === "ArrowRight") showPhoto(activePhoto + 1);
    });
  }

  buildGallery();
  setupAlbumTracks();

  /* Gallery-only scroll reveals. */
  var albumSections = galleryRoot
    ? Array.prototype.slice.call(
        galleryRoot.querySelectorAll(".gallery-album")
      )
    : [];

  if (!reducedMotion && window.gsap && window.ScrollTrigger) {
    window.gsap.registerPlugin(window.ScrollTrigger);

    albumSections.forEach(function (section, index) {
      window.gsap.fromTo(
        section,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.72,
          delay: Math.min(index * 0.025, 0.12),
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            once: true
          }
        }
      );
    });
  } else if (!reducedMotion && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-inview");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    albumSections.forEach(function (section) {
      revealObserver.observe(section);
    });
  } else {
    albumSections.forEach(function (section) {
      section.classList.add("is-inview");
    });
  }

  /* Preserve the existing school handbook tab interactions. */
  var handbookPanels = Array.prototype.slice.call(
    document.querySelectorAll(".hp")
  );

  var handbookButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-h]")
  );

  function openHandbookTab(name) {
    handbookPanels.forEach(function (panel) {
      panel.classList.toggle("on", panel.id === "hub-" + name);
    });

    handbookButtons.forEach(function (button) {
      var selected = button.dataset.h === name;

      button.classList.toggle("on", selected);
      button.setAttribute("aria-selected", selected ? "true" : "false");
    });
  }

  handbookButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      openHandbookTab(button.dataset.h);
    });
  });

  document.querySelectorAll("[data-hub]").forEach(function (element) {
    element.addEventListener("click", function () {
      openHandbookTab(element.dataset.hub);
    });
  });

  /* Preserve the existing content reveal behavior outside the gallery. */
  var revealTargets = document.querySelectorAll(
    ".nx .section-kicker, .nx .section-title, .nx .lead, .nx .pr, .nx .hub"
  );

  if ("IntersectionObserver" in window) {
    var contentObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          contentObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });

    revealTargets.forEach(function (element) {
      element.classList.add("reveal");
      contentObserver.observe(element);
    });
  } else {
    revealTargets.forEach(function (element) {
      element.classList.add("reveal", "visible");
    });
  }
})();
