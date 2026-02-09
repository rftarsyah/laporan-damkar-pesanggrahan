function pilihMenu(menu) {
  document.getElementById("menuAwal").style.display = "none";
  document.getElementById("formEvakuasi").style.display = "none";
  document.getElementById("formEdukasi").style.display = "none";

  if (menu === "evakuasi" || menu === "kebakaran") {
    document.getElementById("formEvakuasi").style.display = "block";
    if(menu === "kebakaran") {
        document.getElementById("evakuasiInput").value = "Kebakaran ";
    }
  } else if (menu === "edukasi") {
    document.getElementById("formEdukasi").style.display = "block";
  }
}