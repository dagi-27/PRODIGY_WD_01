    // Get the navbar element
    const navbar = document.querySelector('.navbar');

    // Function to handle scroll events
    function handleScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-links a');

    // Add click event listener to each link for smooth scrolling
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    document.addEventListener('DOMContentLoaded', function() {
        // Array of image paths (update these with your actual image paths)
        const images = [
            'images/blue toya.jpg',
            'images/red totyt.jfif',
            'images/red.jfif',
            'images/black.jpg',
            'images/white.jfif'
        ];

        let currentImageIndex = 0;
        const mainImage = document.getElementById('mainImage');
        const thumbnailsContainer = document.querySelector('.thumbnails');
        const prevBtn = document.querySelector('.prev-btn');
        const nextBtn = document.querySelector('.next-btn');

        // Create thumbnails
        images.forEach((image, index) => {
            const thumbnail = document.createElement('img');
            thumbnail.src = image;
            thumbnail.alt = `Car ${index + 1}`;
            thumbnail.classList.add('thumbnail');
            if (index === 0) thumbnail.classList.add('active');
            
            thumbnail.addEventListener('click', () => {
                setActiveImage(index);
            });
            
            thumbnailsContainer.appendChild(thumbnail);
        });

        // Add this inside the DOMContentLoaded event listener
        const carInfo = [
            { title: 'Blue Toyota Luxury', model: '2024', speed: '280 km/h', fuel: 'Hybrid' },
            { title: 'Red Toyota Sport', model: '2024', speed: '300 km/h', fuel: 'Hybrid' },
            { title: 'Red Sport Edition', model: '2023', speed: '290 km/h', fuel: 'Petrol' },
            { title: 'Black Executive', model: '2024', speed: '260 km/h', fuel: 'Electric' },
            { title: 'White Premium', model: '2024', speed: '270 km/h', fuel: 'Hybrid' }
        ];

        function updateCarInfo(index) {
            const info = carInfo[index];
            document.querySelector('.car-title').textContent = info.title;
            document.querySelectorAll('.detail')[0].innerHTML = `<i class="fas fa-car"></i> Model: ${info.model}`;
            document.querySelectorAll('.detail')[1].innerHTML = `<i class="fas fa-tachometer-alt"></i> Speed: ${info.speed}`;
            document.querySelectorAll('.detail')[2].innerHTML = `<i class="fas fa-gas-pump"></i> Fuel: ${info.fuel}`;
        }

        // Function to set active image
        function setActiveImage(index) {
            currentImageIndex = index;
            mainImage.src = images[index];
            currentZoom = 1;
            mainImage.style.transform = `scale(${currentZoom})`;
            updateCarInfo(index);
            
            document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
            
            updateNavButtons();
        }

        // Update navigation buttons state
        function updateNavButtons() {
            prevBtn.disabled = currentImageIndex === 0;
            nextBtn.disabled = currentImageIndex === images.length - 1;
        }

        // Navigation button click handlers
        prevBtn.addEventListener('click', () => {
            if (currentImageIndex > 0) {
                setActiveImage(currentImageIndex - 1);
            }
        });

        nextBtn.addEventListener('click', () => {
            if (currentImageIndex < images.length - 1) {
                setActiveImage(currentImageIndex + 1);
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentImageIndex > 0) {
                setActiveImage(currentImageIndex - 1);
            } else if (e.key === 'ArrowRight' && currentImageIndex < images.length - 1) {
                setActiveImage(currentImageIndex + 1);
            }
        });

        // Add zoom functionality
        let currentZoom = 1;
        document.getElementById('zoomIn').addEventListener('click', () => {
            if (currentZoom < 1.5) {
                currentZoom += 0.1;
                mainImage.style.transform = `scale(${currentZoom})`;
            }
        });

        document.getElementById('zoomOut').addEventListener('click', () => {
            if (currentZoom > 1) {
                currentZoom -= 0.1;
                mainImage.style.transform = `scale(${currentZoom})`;
            }
        });

        // Add fullscreen functionality
        mainImage.addEventListener('dblclick', () => {
            const fullscreenDiv = document.createElement('div');
            fullscreenDiv.className = 'fullscreen';
            const fullscreenImg = document.createElement('img');
            fullscreenImg.src = mainImage.src;
            fullscreenDiv.appendChild(fullscreenImg);
            document.body.appendChild(fullscreenDiv);

            fullscreenDiv.addEventListener('click', () => {
                fullscreenDiv.remove();
            });
        });

        // Initialize navigation buttons
        updateNavButtons();

        // Add this inside the DOMContentLoaded event listener
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const uploadPreview = document.getElementById('uploadPreview');

        // Handle drag and drop events
        dropZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropZone.classList.add('drag-over');
        });

        dropZone.addEventListener('dragleave', () => {
            dropZone.classList.remove('drag-over');
        });

        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            dropZone.classList.remove('drag-over');
            const files = e.dataTransfer.files;
            handleFiles(files);
        });

        // Handle file input change
        fileInput.addEventListener('change', () => {
            handleFiles(fileInput.files);
        });

        // Click on drop zone to trigger file input
        dropZone.addEventListener('click', () => {
            fileInput.click();
        });

        function handleFiles(files) {
            Array.from(files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    
                    reader.onload = (e) => {
                        const imgUrl = e.target.result;
                        
                        // Add to images array
                        images.push(imgUrl);
                        
                        // Add default car info
                        carInfo.push({
                            title: 'Custom Upload',
                            model: 'Custom',
                            speed: 'Not specified',
                            fuel: 'Not specified'
                        });
                        
                        // Create thumbnail
                        const thumbnail = document.createElement('img');
                        thumbnail.src = imgUrl;
                        thumbnail.alt = `Car ${images.length}`;
                        thumbnail.classList.add('thumbnail');
                        thumbnail.addEventListener('click', () => {
                            setActiveImage(images.length - 1);
                        });
                        thumbnailsContainer.appendChild(thumbnail);
                        
                        // Create preview
                        const previewItem = document.createElement('div');
                        previewItem.className = 'preview-item';
                        previewItem.innerHTML = `
                            <img src="${imgUrl}" alt="Preview">
                            <button class="remove-btn" onclick="removeImage(${images.length - 1})">×</button>
                        `;
                        uploadPreview.appendChild(previewItem);
                        
                        // Update navigation buttons
                        updateNavButtons();
                    };
                    
                    reader.readAsDataURL(file);
                } else {
                    alert('Please upload image files only!');
                }
            });
        }

        function removeImage(index) {
            // Remove from arrays
            images.splice(index, 1);
            carInfo.splice(index, 1);
            
            // Remove thumbnail
            thumbnailsContainer.children[index].remove();
            
            // Remove preview
            uploadPreview.children[index].remove();
            
            // Update current image if necessary
            if (currentImageIndex >= images.length) {
                currentImageIndex = images.length - 1;
                if (currentImageIndex >= 0) {
                    setActiveImage(currentImageIndex);
                }
            }
            
            // Update navigation buttons
            updateNavButtons();
        }

        const uploadBtn = document.querySelector('.upload-gallery-btn');
        const viewGalleryBtn = document.querySelector('.view-gallery-btn');
        
        uploadBtn.addEventListener('click', () => {
            // Scroll to upload section
            document.querySelector('.upload-section').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
        
        viewGalleryBtn.addEventListener('click', () => {
            // Scroll to gallery section
            document.querySelector('.gallery-container').scrollIntoView({ 
                behavior: 'smooth',
                block: 'center'
            });
        });
    }); 