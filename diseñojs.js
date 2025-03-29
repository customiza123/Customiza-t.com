document.addEventListener('DOMContentLoaded', function () {
    // 1. Menu Items Handling
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Color Options Handling
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            colorOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            // Logic to change product color
        });
    });

    // 3. Size Options Handling
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
        option.addEventListener('click', function () {
            sizeOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 4. Product Thumbnails Handling
    const productThumbnails = document.querySelectorAll('.product-thumbnail');
    productThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function () {
            productThumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Logic to change product view
        });
    });

    // 5. Zoom Functionality
    let zoomLevel = 100;
    const zoomLevelDisplay = document.querySelector('.zoom-level');
    const productPreview = document.getElementById('product-preview');

    document.getElementById('zoom-in').addEventListener('click', function () {
        if (zoomLevel < 150) {
            zoomLevel += 10;
            updateZoom();
        }
    });

    document.getElementById('zoom-out').addEventListener('click', function () {
        if (zoomLevel > 70) {
            zoomLevel -= 10;
            updateZoom();
        }
    });

    function updateZoom() {
        zoomLevelDisplay.textContent = zoomLevel + '%';
        productPreview.style.transform = `scale(${zoomLevel / 100})`;
    }

    // 6. Tool Cards Interaction
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('click', function () {
            // Logic to select tool
            console.log('Selected tool: ' + this.querySelector('.tool-name').textContent);
        });
    });

    // 7. Templates Interaction
    const templateItems = document.querySelectorAll('.template-item');
    templateItems.forEach(item => {
        item.addEventListener('click', function () {
            // Logic to select template
            console.log('Selected template: ' + this.querySelector('img').alt);
        });
    });

    // 8. "Personalizar" Carousel Functionality
    const personalizarMenuItem = document.querySelector('.menu-item.active');
    if (personalizarMenuItem) {
        const personalizarCarousel = personalizarMenuItem.querySelector('.dropdown-menu .carousel-container');
        if (personalizarCarousel) {
            const items = personalizarCarousel.querySelectorAll('.carousel-item');
            const leftArrow = personalizarMenuItem.querySelector('.dropdown-menu .left-arrow');
            const rightArrow = personalizarMenuItem.querySelector('.dropdown-menu .right-arrow');
            let currentIndex = 0;

            function showCurrentItem() {
                items.forEach((item, index) => {
                    if (index === currentIndex) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }

            if (leftArrow) {
                leftArrow.addEventListener('click', function (e) {
                    e.stopPropagation();
                    currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
                    showCurrentItem();
                });
            }

            if (rightArrow) {
                rightArrow.addEventListener('click', function (e) {
                    e.stopPropagation();
                    currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
                    showCurrentItem();
                });
            }

            showCurrentItem();
        }
    }

    // 9. General Carousel Functionality
    initializeAllCarousels();
    
    function initializeAllCarousels() {
        const carousels = document.querySelectorAll('.carousel-container');
        carousels.forEach(carousel => {
            const items = carousel.querySelectorAll('.carousel-item');
            const parentElement = carousel.closest('.dropdown-menu, .category');
            const leftArrow = parentElement ? parentElement.querySelector('.left-arrow') : carousel.querySelector('.left-arrow');
            const rightArrow = parentElement ? parentElement.querySelector('.right-arrow') : carousel.querySelector('.right-arrow');
            
            if (!leftArrow || !rightArrow || items.length === 0) return;
            
            let currentIndex = 0;
            
            items.forEach((item, index) => {
                if (item.classList.contains('active')) {
                    currentIndex = index;
                }
            });

            function showCurrentItem() {
                items.forEach((item, index) => {
                    if (index === currentIndex) {
                        item.classList.add('active');
                    } else {
                        item.classList.remove('active');
                    }
                });
            }

            leftArrow.addEventListener('click', function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex > 0) ? currentIndex - 1 : items.length - 1;
                showCurrentItem();
            });

            rightArrow.addEventListener('click', function (e) {
                e.stopPropagation();
                currentIndex = (currentIndex < items.length - 1) ? currentIndex + 1 : 0;
                showCurrentItem();
            });

            showCurrentItem();
        });
    }

    // 10. Dropdown Menu Configuration
    const menuItemsWithDropdown = document.querySelectorAll('.menu-item');
    menuItemsWithDropdown.forEach(item => {
        const dropdownMenu = item.querySelector('.dropdown-menu');
        if (dropdownMenu) {
            item.addEventListener('click', function(e) {
                if (!dropdownMenu.classList.contains('visible')) {
                    document.querySelectorAll('.dropdown-menu').forEach(menu => {
                        menu.classList.remove('visible');
                    });
                    dropdownMenu.classList.add('visible');
                } else {
                    dropdownMenu.classList.remove('visible');
                }
            });
        }
    });

    // Close dropdown menus when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.menu-item')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('visible');
            });
        }
    });
});

// Image Upload Functionality
document.querySelector('.tool-card .fa-upload').parentElement.addEventListener('click', function () {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = function (event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
              const imgContainer = document.createElement('div');
              imgContainer.style.position = 'absolute';
              imgContainer.style.top = '50%';
              imgContainer.style.left = '50%';
              imgContainer.style.transform = 'translate(-50%, -50%)';
              imgContainer.style.cursor = 'move';
              imgContainer.style.width = 'auto';
              imgContainer.style.height = 'auto';
              
              const img = document.createElement('img');
              img.src = e.target.result;
              img.style.maxWidth = '100%';
              img.style.maxHeight = '100%';
              img.style.display = 'block';
              
              imgContainer.appendChild(img);
              
              const canvasContainer = document.getElementById('canvas-container');
              canvasContainer.appendChild(imgContainer);
              
              makeDraggable(imgContainer, canvasContainer);
              makeResizable(imgContainer, canvasContainer);
              
              img.onload = function() {
                  if (!imgContainer.style.width || imgContainer.style.width === 'auto') {
                      imgContainer.style.width = img.width + 'px';
                  }
                  if (!imgContainer.style.height || imgContainer.style.height === 'auto') {
                      imgContainer.style.height = img.height + 'px';
                  }
              };
          };
          reader.readAsDataURL(file);
      }
  };
  input.click();
});

// Make Element Draggable
function makeDraggable(element, container) {
  let isDragging = false;
  let offsetX, offsetY;
  
  element.addEventListener('mousedown', function (e) {
      isDragging = true;
      
      const rect = element.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;
      
      const computedStyle = window.getComputedStyle(element);
      const matrix = new DOMMatrixReadOnly(computedStyle.transform);
      
      element.style.transform = 'none';
      element.style.top = rect.top + 'px';
      element.style.left = rect.left + 'px';
      
      element.style.cursor = 'grabbing';
      
      e.preventDefault();
  });
  
  document.addEventListener('mousemove', function (e) {
      if (isDragging) {
          let newLeft = e.clientX - offsetX;
          let newTop = e.clientY - offsetY;
          
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          if (newLeft < containerRect.left) {
              newLeft = containerRect.left;
          } else if (newLeft + elementRect.width > containerRect.right) {
              newLeft = containerRect.right - elementRect.width;
          }
          
          if (newTop < containerRect.top) {
              newTop = containerRect.top;
          } else if (newTop + elementRect.height > containerRect.bottom) {
              newTop = containerRect.bottom - elementRect.height;
          }
          
          element.style.left = newLeft + 'px';
          element.style.top = newTop + 'px';
          
          e.preventDefault();
      }
  });
  
  document.addEventListener('mouseup', function () {
      isDragging = false;
      element.style.cursor = 'move';
  });
}

// Make Element Resizable
function makeResizable(element, container) {
  const resizeHandle = document.createElement('div');
  resizeHandle.style.width = '10px';
  resizeHandle.style.height = '10px';
  resizeHandle.style.background = 'red';
  resizeHandle.style.position = 'absolute';
  resizeHandle.style.right = '0';
  resizeHandle.style.bottom = '0';
  resizeHandle.style.cursor = 'se-resize';
  resizeHandle.style.zIndex = '1000';
  element.appendChild(resizeHandle);
  
  let isResizing = false;
  let originalWidth, originalHeight, startX, startY;
  
  resizeHandle.addEventListener('mousedown', function (e) {
      isResizing = true;
      startX = e.clientX;
      startY = e.clientY;
      originalWidth = element.offsetWidth;
      originalHeight = element.offsetHeight;
      e.stopPropagation();
      e.preventDefault();
  });
  
  document.addEventListener('mousemove', function (e) {
      if (isResizing) {
          let newWidth = originalWidth + (e.clientX - startX);
          let newHeight = originalHeight + (e.clientY - startY);
          
          const containerRect = container.getBoundingClientRect();
          const elementRect = element.getBoundingClientRect();
          
          const maxWidth = containerRect.right - elementRect.left;
          const maxHeight = containerRect.bottom - elementRect.top;
          
          if (newWidth > 20 && newWidth <= maxWidth) {
              element.style.width = newWidth + 'px';
          }
          if (newHeight > 20 && newHeight <= maxHeight) {
              element.style.height = newHeight + 'px';
          }
          
          e.preventDefault();
      }
  });
  
  document.addEventListener('mouseup', function () {
      isResizing = false;
  });
}