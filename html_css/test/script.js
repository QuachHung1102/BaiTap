// ===== VÍ DỤ 2: PREVIEW ẢNH =====
// Hàm xử lý preview ảnh cho input đơn
function handlePreviewInput() {
  // Tìm phần tử input có id "previewInput"
  const previewInput = document.getElementById('previewInput');
  
  // Lắng nghe sự kiện khi người dùng chọn file
  previewInput.addEventListener('change', function(e) {
    // Lấy file đầu tiên từ danh sách files được chọn
    const file = e.target.files[0];
    
    // Kiểm tra xem có file nào được chọn không
    if (file) {
      // Tạo FileReader để đọc file
      const reader = new FileReader();
      
      // Định nghĩa hàm sẽ chạy khi FileReader đọc xong file
      reader.onload = function(e) {
        // Tìm container chứa ảnh preview
        const previewContainer = document.getElementById('previewContainer');
        // Tìm thẻ img để hiển thị ảnh
        const previewImage = document.getElementById('previewImage');
        
        // Gán dữ liệu ảnh (base64) vào src của img
        previewImage.src = e.target.result;
        // Hiển thị container (đổi từ display: none thành display: block)
        previewContainer.style.display = 'block';
      };
      
      // Bắt đầu đọc file dưới dạng Data URL (base64)
      reader.readAsDataURL(file);
    }
  });
}

// ===== VÍ DỤ 3: MULTIPLE FILES =====
// Hàm xử lý nhiều ảnh cùng lúc
function handleMultipleInput() {
  const multipleInput = document.getElementById('multipleInput');
  
  multipleInput.addEventListener('change', function(e) {
    // Lấy tất cả files được chọn
    const files = e.target.files;
    // Tìm container để hiển thị các ảnh
    const previewContainer = document.getElementById('multiplePreview');
    
    // Xóa tất cả ảnh cũ
    previewContainer.innerHTML = '';
    
    // Duyệt qua từng file
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      
      // Kiểm tra xem file có phải là ảnh không
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          // Tạo thẻ img mới
          const img = document.createElement('img');
          img.src = e.target.result;
          img.style.maxWidth = '150px';
          img.style.margin = '5px';
          img.style.borderRadius = '5px';
          
          // Thêm img vào container
          previewContainer.appendChild(img);
        };
        
        reader.readAsDataURL(file);
      }
    }
  });
}

// ===== VÍ DỤ 4: DRAG AND DROP =====
// Hàm xử lý kéo thả ảnh
function handleDragAndDrop() {
  const dropZone = document.getElementById('dropZone');
  const dragDropInput = document.getElementById('dragDropInput');
  const dropPreview = document.getElementById('dropPreview');
  
  // Khi click vào dropZone thì mở hộp thoại chọn file
  dropZone.addEventListener('click', () => {
    dragDropInput.click();
  });
  
  // Xử lý khi kéo file vào vùng drop
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault(); // Ngăn hành vi mặc định
    dropZone.style.borderColor = '#007bff';
    dropZone.style.backgroundColor = '#f0f8ff';
  });
  
  // Xử lý khi kéo file ra khỏi vùng drop
  dropZone.addEventListener('dragleave', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#ccc';
    dropZone.style.backgroundColor = 'transparent';
  });
  
  // Xử lý khi thả file vào vùng drop
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.style.borderColor = '#ccc';
    dropZone.style.backgroundColor = 'transparent';
    
    // Lấy files từ sự kiện drop
    const files = e.dataTransfer.files;
    
    if (files.length > 0) {
      const file = files[0];
      
      // Kiểm tra xem file có phải là ảnh không
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
          // Hiển thị ảnh đã được thả
          dropPreview.innerHTML = `
            <p>Ảnh đã được thả:</p>
            <img src="${e.target.result}" class="preview-image" alt="Dropped image">
          `;
        };
        
        reader.readAsDataURL(file);
      }
    }
  });
  
  // Xử lý khi chọn file qua input (khi click vào dropZone)
  dragDropInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        dropPreview.innerHTML = `
          <p>Ảnh đã được chọn:</p>
          <img src="${e.target.result}" class="preview-image" alt="Selected image">
        `;
      };
      
      reader.readAsDataURL(file);
    }
  });
}

// ===== KHỞI TẠO KHI TRANG WEB LOAD XONG =====
// Đợi cho đến khi DOM được tải hoàn toàn
document.addEventListener('DOMContentLoaded', function() {
  // Gọi tất cả các hàm xử lý
  handlePreviewInput();
  handleMultipleInput();
  handleDragAndDrop();
  
  console.log('Tất cả chức năng upload ảnh đã được khởi tạo!');
});

// ===== HÀM TIỆN ÍCH =====
// Hàm kiểm tra file có phải là ảnh không
function isImageFile(file) {
  return file && file.type.startsWith('image/');
}

// Hàm định dạng kích thước file
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Hàm hiển thị thông tin file
function displayFileInfo(file, container) {
  const fileInfo = document.createElement('div');
  fileInfo.className = 'file-info';
  fileInfo.innerHTML = `
    <p><strong>Tên file:</strong> ${file.name}</p>
    <p><strong>Kích thước:</strong> ${formatFileSize(file.size)}</p>
    <p><strong>Loại file:</strong> ${file.type}</p>
  `;
  container.appendChild(fileInfo);
}
