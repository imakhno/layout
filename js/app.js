(() => {
  "use strict";
  function e(e) {
    this.type = e;
  }
  (e.prototype.init = function () {
    const e = this;
    (this.оbjects = []),
      (this.daClassname = "_dynamic_adapt_"),
      (this.nodes = document.querySelectorAll("[data-da]"));
    for (let e = 0; e < this.nodes.length; e++) {
      const t = this.nodes[e],
        n = t.dataset.da.trim().split(","),
        o = {};
      (o.element = t),
        (o.parent = t.parentNode),
        (o.destination = document.querySelector(n[0].trim())),
        (o.breakpoint = n[1] ? n[1].trim() : "767"),
        (o.place = n[2] ? n[2].trim() : "last"),
        (o.index = this.indexInParent(o.parent, o.element)),
        this.оbjects.push(o);
    }
    this.arraySort(this.оbjects),
      (this.mediaQueries = Array.prototype.map.call(
        this.оbjects,
        function (e) {
          return (
            "(" + this.type + "-width: " + e.breakpoint + "px)," + e.breakpoint
          );
        },
        this
      )),
      (this.mediaQueries = Array.prototype.filter.call(
        this.mediaQueries,
        function (e, t, n) {
          return Array.prototype.indexOf.call(n, e) === t;
        }
      ));
    for (let t = 0; t < this.mediaQueries.length; t++) {
      const n = this.mediaQueries[t],
        o = String.prototype.split.call(n, ","),
        i = window.matchMedia(o[0]),
        r = o[1],
        a = Array.prototype.filter.call(this.оbjects, function (e) {
          return e.breakpoint === r;
        });
      i.addListener(function () {
        e.mediaHandler(i, a);
      }),
        this.mediaHandler(i, a);
    }
  }),
    (e.prototype.mediaHandler = function (e, t) {
      if (e.matches)
        for (let e = 0; e < t.length; e++) {
          const n = t[e];
          (n.index = this.indexInParent(n.parent, n.element)),
            this.moveTo(n.place, n.element, n.destination);
        }
      else
        for (let e = t.length - 1; e >= 0; e--) {
          const n = t[e];
          n.element.classList.contains(this.daClassname) &&
            this.moveBack(n.parent, n.element, n.index);
        }
    }),
    (e.prototype.moveTo = function (e, t, n) {
      t.classList.add(this.daClassname),
        "last" === e || e >= n.children.length
          ? n.insertAdjacentElement("beforeend", t)
          : "first" !== e
          ? n.children[e].insertAdjacentElement("beforebegin", t)
          : n.insertAdjacentElement("afterbegin", t);
    }),
    (e.prototype.moveBack = function (e, t, n) {
      t.classList.remove(this.daClassname),
        void 0 !== e.children[n]
          ? e.children[n].insertAdjacentElement("beforebegin", t)
          : e.insertAdjacentElement("beforeend", t);
    }),
    (e.prototype.indexInParent = function (e, t) {
      const n = Array.prototype.slice.call(e.children);
      return Array.prototype.indexOf.call(n, t);
    }),
    (e.prototype.arraySort = function (e) {
      "min" === this.type
        ? Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? -1
                : "last" === e.place || "first" === t.place
                ? 1
                : e.place - t.place
              : e.breakpoint - t.breakpoint;
          })
        : Array.prototype.sort.call(e, function (e, t) {
            return e.breakpoint === t.breakpoint
              ? e.place === t.place
                ? 0
                : "first" === e.place || "last" === t.place
                ? 1
                : "last" === e.place || "first" === t.place
                ? -1
                : t.place - e.place
              : t.breakpoint - e.breakpoint;
          });
    });
  new e("max").init();
  let t = !0,
    n = (e = 500) => {
      let n = document.querySelector("body");
      if (t) {
        let o = document.querySelectorAll("[data-lp]");
        setTimeout(() => {
          for (let e = 0; e < o.length; e++) {
            o[e].style.paddingRight = "0px";
          }
          (n.style.paddingRight = "0px"),
            document.documentElement.classList.remove("lock");
        }, e),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    },
    o = (e = 500) => {
      let n = document.querySelector("body");
      if (t) {
        let o = document.querySelectorAll("[data-lp]");
        for (let e = 0; e < o.length; e++) {
          o[e].style.paddingRight =
            window.innerWidth -
            document.querySelector(".wrapper").offsetWidth +
            "px";
        }
        (n.style.paddingRight =
          window.innerWidth -
          document.querySelector(".wrapper").offsetWidth +
          "px"),
          document.documentElement.classList.add("lock"),
          (t = !1),
          setTimeout(function () {
            t = !0;
          }, e);
      }
    };
  let i = !1;
  setTimeout(() => {
    if (i) {
      let e = new Event("windowScroll");
      window.addEventListener("scroll", function (t) {
        document.dispatchEvent(e);
      });
    }
  }, 0);
  const r = document.querySelectorAll(".menu__link[data-goto]");
  document.querySelector(".icon-menu");
  if (r.length > 0) {
    function e(e) {
      const t = e.target;
      if (t.dataset.goto && document.querySelector(t.dataset.goto)) {
        const n =
          document.querySelector(t.dataset.goto).getBoundingClientRect().top +
          pageYOffset -
          document.querySelector(".header__wrapper").offsetHeight;
        document.documentElement.classList.contains("menu-open") &&
          document.documentElement.classList.remove("menu-open"),
          window.scrollTo({ top: n, behavior: "smooth" }),
          e.preventDefault();
      }
    }
    r.forEach((t) => {
      t.addEventListener("click", e);
    });
  }
  (window.FLS = !0),
    (function () {
      let e = document.querySelector(".icon-menu");
      e &&
        e.addEventListener("click", function (e) {
          t &&
            (((e = 500) => {
              document.documentElement.classList.contains("lock") ? n(e) : o(e);
            })(),
            document.documentElement.classList.toggle("menu-open"));
        });
    })();
})();
