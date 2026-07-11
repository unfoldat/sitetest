/* 저시력 사용자용 글자 크기 조절. JS가 없어도 기본 글자가 이미 큼(프로그레시브 향상). */
(function () {
  var KEY = "gv-textsize";
  var levels = ["", "text-lg", "text-xl"];
  function apply(cls) {
    document.body.classList.remove("text-lg", "text-xl");
    if (cls) document.body.classList.add(cls);
  }
  try { apply(localStorage.getItem(KEY) || ""); } catch (e) {}

  document.addEventListener("DOMContentLoaded", function () {
    var inc = document.getElementById("txt-inc");
    var dec = document.getElementById("txt-dec");
    function idx() {
      if (document.body.classList.contains("text-xl")) return 2;
      if (document.body.classList.contains("text-lg")) return 1;
      return 0;
    }
    function set(i) {
      i = Math.max(0, Math.min(2, i));
      apply(levels[i]);
      try { localStorage.setItem(KEY, levels[i]); } catch (e) {}
      var live = document.getElementById("a11y-live");
      if (live) live.textContent = "글자 크기: " + ["보통", "크게", "매우 크게"][i];
    }
    if (inc) inc.addEventListener("click", function () { set(idx() + 1); });
    if (dec) dec.addEventListener("click", function () { set(idx() - 1); });
  });
})();
