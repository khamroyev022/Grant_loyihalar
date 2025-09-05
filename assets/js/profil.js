 const fileInput = document.getElementById('fileInput');
    const uploadSection = document.getElementById('uploadSection');
    const actionSection = document.getElementById('actionSection');
    const fileName = document.getElementById('fileName');
    const deleteBtn = document.getElementById('deleteBtn');

    // Fayl tanlanganda
    fileInput.addEventListener('change', function () {
      if (this.files && this.files[0]) {
        fileName.textContent = this.files[0].name;
        uploadSection.style.display = 'none';
        actionSection.style.display = 'flex';
      }
    });

    // O'chirish tugmasi
    deleteBtn.addEventListener('click', function () {
      fileInput.value = ''; // Faylni tozalash
      actionSection.style.display = 'none';
      uploadSection.style.display = 'flex';
    });

	

// 20 mb dan oshsa

fileInput.addEventListener('change', function () {
  const maxSize = 20 * 1024 * 1024; // 20MB
  if (this.files[0] && this.files[0].size > maxSize) {
    alert("Xato: Fayl hajmi 20MB dan oshmasligi kerak!");
    this.value = ''; // Faylni tozalash
    return;
  }
  // Agar o'tsa, keyingi qadamlarga o't
  showActionSection(this.files[0].name);
});