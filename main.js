document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const nav = document.querySelector(".site-nav");
  const toggle = document.querySelector(".nav-toggle");
  const year = document.getElementById("year");
  const toast = document.getElementById("toast");
  const form = document.getElementById("reservation-form");

  const onScroll = () => {
    const scrolled = window.scrollY > 10;
    if (header) header.dataset.scrolled = scrolled ? "true" : "false";
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  if (year) year.textContent = String(new Date().getFullYear());

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2800);
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const required = ["name", "email", "date", "time", "party", "agree"];
      const invalid = required.some((key) => {
        if (key === "agree")
          return !form.querySelector('input[name="agree"]').checked;
        const value = (data.get(key) || "").toString().trim();
        return value.length === 0;
      });
      if (invalid) {
        showToast("未入力の項目があります。ご確認ください。");
        return;
      }
      showToast("仮予約を受付けました。追ってご連絡いたします。");
      form.reset();
    });
  }
});