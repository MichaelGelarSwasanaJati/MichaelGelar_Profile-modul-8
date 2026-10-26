// MODUL 4: PORTOFOLIO DINAMIS (DOM)
let dataPortofolio = JSON.parse(localStorage.getItem("dataPortofolio")) || [
  { judul: "Desain Banner Informasi", deskripsi: "Merancang visual banner untuk kegiatan acara." },
  { judul: "Program Struktur Data Java", deskripsi: "Implementasi Circular Queue dan manipulasi array." },
  { judul: "Desain Korsa Informatika", deskripsi: "Membuat Desain Korsa Informatika" }
];
const containerPortofolio = document.querySelector("#container-portofolio");
const formPortofolio = document.querySelector("#form-portofolio");

function renderPortofolio() { // modul 7
  containerPortofolio.innerHTML = "";
  
  // Ambil data like dari localStorage 
  const semuaLike = JSON.parse(localStorage.getItem("semuaLike")) || {};

  dataPortofolio.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "card-item";
    
    // Ambil jumlah like berdasarkan judul artikel
    let jumlahLike = semuaLike[item.judul] || 0;

    card.innerHTML = `
      <h3>${item.judul}</h3>
      <p>${item.deskripsi}</p>
      <button class="btn-like">Like (${jumlahLike})</button>
      <button class="btn-hapus-port" data-index="${index}">Hapus</button>
    `;

    // Tambahkan event listener untuk tombol Like
    const tombolLike = card.querySelector(".btn-like");
    tombolLike.addEventListener("click", () => {
      jumlahLike++;
      tombolLike.textContent = `Like (${jumlahLike})`;
      
      // Simpan ke localStorage setiap kali diklik
      simpanLike(item.judul, jumlahLike);
    });

    containerPortofolio.appendChild(card);
  });
} // modul 7 sampai sinii

formPortofolio.addEventListener("submit", (e) => {
  e.preventDefault();
  const judul = document.querySelector("#input-judul").value.trim();
  const deskripsi = document.querySelector("#input-deskripsi").value.trim();
  if (judul && deskripsi) {
    dataPortofolio.push({ judul, deskripsi });

    localStorage.setItem("dataPortofolio", JSON.stringify(dataPortofolio));

    renderPortofolio();
    formPortofolio.reset();
  }
});

containerPortofolio.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-hapus-port")) {
    const index = e.target.dataset.index;
    dataPortofolio.splice(index, 1);
    localStorage.setItem("dataPortofolio", JSON.stringify(dataPortofolio));
    renderPortofolio();
  }
});

// MODUL 5: EVENT HANDLING & FORM KOMENTAR
const formKomentar = document.querySelector("#form-komentar");
const inputNama = document.querySelector("#input-nama");
const inputPesan = document.querySelector("#input-pesan");
const daftarKomentar = document.querySelector("#daftar-komentar");
const pesanError = document.querySelector("#pesan-error");
const btnHapusSemua = document.querySelector("#btn-hapus-semua");

formKomentar.addEventListener("submit", (e) => {
  e.preventDefault();
  const nama = inputNama.value.trim();
  const pesan = inputPesan.value.trim();
  if (nama === "" || pesan.length < 5) {
    pesanError.textContent = "Nama wajib diisi dan komentar minimal 5 karakter!";
    pesanError.style.display = "block";
    return;
  }
  pesanError.style.display = "none";
  
  // Simpan ke localStorage dan render ulang daftar komentar
  simpanKomentar(nama, pesan);
  muatKomentar();
  
  formKomentar.reset();
});

daftarKomentar.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-hapus-komentar")) {
    e.target.parentElement.remove();
  }
});

btnHapusSemua.addEventListener("click", () => {
  daftarKomentar.innerHTML = "";
});

// FITUR TOGGLE DARK MODE (Diperbarui untuk Modul 7)

const tombolTema = document.querySelector("#btn-tema");

function toggleTema() {
  document.body.classList.toggle("dark-mode");
  
  // Menyimpan status tema ke localStorage
  const temaSekarang = document.body.classList.contains("dark-mode") ? "dark" : "light";
  localStorage.setItem("tema", temaSekarang);

  // Ubah teks tombol sesuai kondisi tema
  if (document.body.classList.contains("dark-mode")) {
    tombolTema.textContent = "Mode Terang";
  } else {
    tombolTema.textContent = "Mode Gelap";
  }
}

// Memuat ulang preferensi tema saat halaman dibuka
function muatPreferensiTema() {
  const tema = localStorage.getItem("tema");
  if (tema === "dark") {
    document.body.classList.add("dark-mode");
    if (tombolTema) {
      tombolTema.textContent = "Mode Terang";
    }
  }
}

// Panggil fungsi pemuatan tema saat script pertama kali dimuat[cite: 2]
muatPreferensiTema();

// 1. Toggle via Klik Tombol (Modul 4)
if (tombolTema) {
  tombolTema.addEventListener("click", toggleTema);
}

// 2. Toggle via Shortcut Keyboard Huruf 'D' (Modul 5)
document.addEventListener("keydown", (e) => {
  if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") {
    if (e.key.toLowerCase() === "d") {
      toggleTema();
    }
  }
});

document.addEventListener('DOMContentLoaded', function () {
    const toggleBtn = document.getElementById('toggle-kontak-btn');
    const content = document.getElementById('kontak-content');
    const toggleText = document.getElementById('toggle-text');
    const toggleIcon = document.getElementById('toggle-icon');

    toggleBtn.addEventListener('click', function () {
        const isHidden = content.classList.toggle('hidden');

        if (isHidden) {
            toggleText.textContent = 'Tampilkan Kontak';
            toggleIcon.className = 'fa-solid fa-eye';
            toggleBtn.setAttribute('aria-expanded', 'false');
        } else {
            toggleText.textContent = 'Sembunyikan Kontak';
            toggleIcon.className = 'fa-solid fa-eye-slash';
            toggleBtn.setAttribute('aria-expanded', 'true');
        }
    });
});

// Fungsi untuk menyimpan jumlah like ke localStorage (Modul 7)
function simpanLike(judulArtikel, jumlah) {
  const semuaLike = JSON.parse(localStorage.getItem("semuaLike")) || {};
  semuaLike[judulArtikel] = jumlah;
  localStorage.setItem("semuaLike", JSON.stringify(semuaLike));
}

// Fungsi Penyimpanan Komentar (Modul 7)
function simpanKomentar(nama, pesan) {
  const daftar = JSON.parse(localStorage.getItem("komentar")) || [];
  daftar.push({ nama, pesan });
  localStorage.setItem("komentar", JSON.stringify(daftar));
}

// Fungsi untuk memuat daftar komentar dari localStorage
function muatKomentar() {
  const daftar = JSON.parse(localStorage.getItem("komentar")) || [];
  const daftarKomentar = document.querySelector("#daftar-komentar");
  if (daftarKomentar) {
    daftarKomentar.innerHTML = ""; // Bersihkan list sebelum dirender ulang
    daftar.forEach((k) => {
      const li = document.createElement("li");
      li.textContent = `${k.nama}: ${k.pesan}`;
      daftarKomentar.appendChild(li);
    });
  }
}

// Panggil fungsi muat komentar saat script dijalankan
muatKomentar();

/* =========================================================
    MODUL 7 — Tombol Reset Seluruh Data Tersimpan
   ========================================================= */
const tombolReset = document.querySelector("#btn-reset");
if (tombolReset) {
  tombolReset.addEventListener("click", () => {
    const konfirmasi = confirm("Hapus semua data tersimpan (tema, like, komentar, portofolio)?");
    if (konfirmasi) {
      localStorage.clear(); // Menghapus seluruh data di localStorage browser
      location.reload();    // Memuat ulang halaman agar kembali ke kondisi awal
    }
  });
}