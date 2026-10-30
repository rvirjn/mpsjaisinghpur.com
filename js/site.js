(() => {
  const SCHOOL_EMAIL = "mpsjaisinghpur@gmail.com";
  const LOGIN_URL = "https://ranjanravi.com/school/frontend/login.html";
  const shell = document.getElementById("shell");
  const pages = [...document.querySelectorAll(".page")];
  const navLinks = [...document.querySelectorAll(".nav a[data-id]")];

  document.getElementById("today").textContent = new Date().toLocaleDateString("en-IN", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  function route() {
    const id = location.hash.replace("#", "");
    if (id === "login") {
      location.replace(LOGIN_URL);
      return;
    }
    const page = pages.find((p) => p.dataset.page === id) || pages[0];
    pages.forEach((p) => p.classList.toggle("active", p === page));
    navLinks.forEach((a) => a.classList.toggle("active", a.dataset.id === page.dataset.page));
    const title = page.dataset.title;
    document.getElementById("pageTitle").textContent = title;
    document.title = page.dataset.page === "home" ? "MS Public School | Jaisinghpur, East Champaran" : `${title} | MS Public School`;
    shell.classList.remove("nav-open");
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  route();

  document.getElementById("backToTop").addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("menuBtn").addEventListener("click", () => shell.classList.toggle("nav-open"));
  document.getElementById("backdrop").addEventListener("click", () => shell.classList.remove("nav-open"));

  function modal(title, bodyHtml) {
    const wrap = document.createElement("div");
    wrap.className = "modal-backdrop";
    wrap.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
      <div class="modal-head"><h3></h3><button type="button" class="icon-btn" data-close aria-label="Close">&times;</button></div>
      <div class="modal-body">${bodyHtml}</div></div>`;
    wrap.querySelector("h3").textContent = title;
    const close = () => {
      wrap.remove();
      document.removeEventListener("keydown", onKey);
    };
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    wrap.addEventListener("click", (e) => {
      if (e.target === wrap || e.target.closest("[data-close]")) close();
    });
    document.addEventListener("keydown", onKey);
    document.body.appendChild(wrap);
    return wrap;
  }

  document.querySelectorAll("[data-photo]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const m = modal(btn.dataset.caption || "", "<img alt=\"\">");
      const img = m.querySelector("img");
      img.src = btn.dataset.photo;
      img.alt = btn.dataset.caption || "";
    });
  });

  function toast(message) {
    let wrap = document.querySelector(".toast-wrap");
    if (!wrap) {
      wrap = document.createElement("div");
      wrap.className = "toast-wrap";
      document.body.appendChild(wrap);
    }
    const el = document.createElement("div");
    el.className = "toast";
    el.textContent = message;
    wrap.appendChild(el);
    setTimeout(() => el.remove(), 3800);
  }

  const phone = document.getElementById("c_phone");
  phone.addEventListener("input", () => {
    const digits = phone.value.replace(/\D/g, "").slice(0, 10);
    if (phone.value !== digits) phone.value = digits;
  });

  const form = document.getElementById("contactForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const v = Object.fromEntries(new FormData(form).entries());
    const body = `${v.message}\n\nName: ${v.name}${v.phone ? `\nMobile: ${v.phone}` : ""}`;
    location.href = `mailto:${SCHOOL_EMAIL}?subject=${encodeURIComponent(v.subject)}&body=${encodeURIComponent(body)}`;
    toast("Opening your email app...");
  });
})();
