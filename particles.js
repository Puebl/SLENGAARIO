// Эффекты частиц и специальные анимации для переводчика сленга

// Функция для создания эффекта частиц при клике
function createClickEffect(e) {
    const x = e.clientX;
    const y = e.clientY;
    
    // Создаем контейнер для частиц
    const particlesContainer = document.createElement('div');
    particlesContainer.style.position = 'fixed';
    particlesContainer.style.top = '0';
    particlesContainer.style.left = '0';
    particlesContainer.style.width = '100%';
    particlesContainer.style.height = '100%';
    particlesContainer.style.pointerEvents = 'none';
    particlesContainer.style.zIndex = '9999';
    particlesContainer.className = 'particles-effect-container';
    
    document.body.appendChild(particlesContainer);
    
    // Создаем частицы
    const colors = ['#6c5ce7', '#a29bfe', '#fd79a8', '#ffeaa7', '#74b9ff'];
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        
        // Стили для частицы
        particle.style.position = 'absolute';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = Math.random() * 10 + 5 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.8';
        
        // Добавляем частицу в контейнер
        particlesContainer.appendChild(particle);
        
        // Анимация для частицы
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 100 + 50;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        const lifetime = Math.random() * 1000 + 500;
        
        // Анимируем с помощью requestAnimationFrame
        let startTime = null;
        
        function animate(timestamp) {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;
            
            if (progress < lifetime) {
                const elapsed = progress / 1000; // прошедшее время в секундах
                const x0 = x + vx * elapsed;
                const y0 = y + vy * elapsed + 0.5 * 980 * elapsed * elapsed; // добавляем гравитацию
                
                particle.style.left = x0 + 'px';
                particle.style.top = y0 + 'px';
                
                // Уменьшаем размер и прозрачность
                const scale = 1 - progress / lifetime;
                particle.style.opacity = scale;
                particle.style.transform = `scale(${scale})`;
                
                requestAnimationFrame(animate);
            } else {
                particle.remove();
                
                // Удаляем контейнер, если в нем больше нет частиц
                if (particlesContainer.children.length === 0) {
                    particlesContainer.remove();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
}

// Функция для создания эффекта пульсации при нажатии на кнопку
function createPulseEffect(element) {
    // Создаем эффект пульсации
    const pulse = document.createElement('div');
    pulse.className = 'pulse-effect';
    
    // Стили для эффекта пульсации
    pulse.style.position = 'absolute';
    pulse.style.top = '0';
    pulse.style.left = '0';
    pulse.style.width = '100%';
    pulse.style.height = '100%';
    pulse.style.borderRadius = getComputedStyle(element).borderRadius;
    pulse.style.boxShadow = '0 0 0 0 rgba(108, 92, 231, 0.6)';
    pulse.style.animation = 'pulse-effect 1s forwards';
    pulse.style.pointerEvents = 'none';
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes pulse-effect {
            0% {
                box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.6);
            }
            70% {
                box-shadow: 0 0 0 15px rgba(108, 92, 231, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(108, 92, 231, 0);
            }
        }
    `;
    document.head.appendChild(style);
    
    // Делаем элемент позиционированным для добавления абсолютно позиционированного дочернего элемента
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    element.appendChild(pulse);
    
    // Удаляем эффект после завершения анимации
    setTimeout(() => {
        pulse.remove();
    }, 1000);
}

// Функция для создания эффекта морфинга текста
function createTextMorphing(element, texts, interval = 3000) {
    let currentIndex = 0;
    element.textContent = texts[currentIndex];
    
    // Добавляем стили для анимации
    element.style.transition = 'filter 0.5s ease';
    
    setInterval(() => {
        // Применяем эффект размытия для скрытия текста
        element.style.filter = 'blur(8px)';
        
        setTimeout(() => {
            // Меняем текст, когда он размыт
            currentIndex = (currentIndex + 1) % texts.length;
            element.textContent = texts[currentIndex];
            
            // Убираем размытие для показа нового текста
            element.style.filter = 'blur(0)';
        }, 500);
    }, interval);
}

// Функция для создания эффекта градиентного текста
function createGradientText(element) {
    // Сохраняем оригинальный текст
    const text = element.textContent;
    
    // Очищаем элемент
    element.innerHTML = '';
    
    // Создаем контейнер для градиентного текста
    const gradientTextContainer = document.createElement('div');
    gradientTextContainer.className = 'gradient-text-container';
    gradientTextContainer.style.display = 'inline-block';
    
    // Создаем градиентный текст
    const gradientText = document.createElement('div');
    gradientText.className = 'gradient-text';
    gradientText.textContent = text;
    
    // Добавляем текст в контейнер
    gradientTextContainer.appendChild(gradientText);
    
    // Добавляем контейнер в элемент
    element.appendChild(gradientTextContainer);
}

// Функция для создания эффекта набора текста
function createTypingEffect(element, text, speed = 50) {
    // Очищаем элемент
    element.textContent = '';
    
    // Создаем элемент для набора текста
    const typingElement = document.createElement('span');
    typingElement.className = 'typing-text';
    typingElement.style.borderRight = '0.1em solid #6c5ce7';
    typingElement.style.animation = 'blink-caret 0.75s step-end infinite';
    element.appendChild(typingElement);
    
    // Добавляем стили для анимации мигающего курсора
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes blink-caret {
            from, to { border-color: transparent }
            50% { border-color: #6c5ce7 }
        }
    `;
    document.head.appendChild(style);
    
    // Функция для набора текста
    let i = 0;
    function type() {
        if (i < text.length) {
            typingElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            // Убираем мигающий курсор после завершения набора
            setTimeout(() => {
                typingElement.style.borderRight = 'none';
                typingElement.style.animation = 'none';
            }, 1000);
        }
    }
    
    // Запускаем набор текста
    type();
}

// Функция для создания эффекта 3D поворота карточки
function createFlipEffect(front, back) {
    // Создаем контейнер для флип-карточки
    const flipContainer = document.createElement('div');
    flipContainer.className = 'flip-card-container';
    flipContainer.style.width = '100%';
    flipContainer.style.height = '100%';
    flipContainer.style.perspective = '1000px';
    
    // Создаем флип-карточку
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    flipCard.style.position = 'relative';
    flipCard.style.width = '100%';
    flipCard.style.height = '100%';
    flipCard.style.transformStyle = 'preserve-3d';
    flipCard.style.transition = 'transform 0.8s';
    
    // Клонируем и добавляем переднюю часть карточки
    const frontSide = front.cloneNode(true);
    frontSide.className = 'flip-card-front';
    frontSide.style.position = 'absolute';
    frontSide.style.width = '100%';
    frontSide.style.height = '100%';
    frontSide.style.backfaceVisibility = 'hidden';
    
    // Клонируем и добавляем заднюю часть карточки
    const backSide = back.cloneNode(true);
    backSide.className = 'flip-card-back';
    backSide.style.position = 'absolute';
    backSide.style.width = '100%';
    backSide.style.height = '100%';
    backSide.style.backfaceVisibility = 'hidden';
    backSide.style.transform = 'rotateY(180deg)';
    
    // Добавляем стороны карточки
    flipCard.appendChild(frontSide);
    flipCard.appendChild(backSide);
    
    // Добавляем карточку в контейнер
    flipContainer.appendChild(flipCard);
    
    // Событие для переворота карточки
    flipContainer.addEventListener('mouseenter', () => {
        flipCard.style.transform = 'rotateY(180deg)';
    });
    
    flipContainer.addEventListener('mouseleave', () => {
        flipCard.style.transform = 'rotateY(0deg)';
    });
    
    return flipContainer;
}

// Функция для создания эффекта неоновой кнопки
function createNeonButton(element) {
    // Сохраняем оригинальный стиль
    const originalBackground = element.style.background;
    const originalColor = element.style.color;
    const originalBoxShadow = element.style.boxShadow;
    
    // Добавляем стили для неоновой кнопки
    element.style.background = 'linear-gradient(45deg, #6c5ce7, #a29bfe)';
    element.style.color = 'white';
    element.style.border = 'none';
    element.style.position = 'relative';
    element.style.zIndex = '1';
    element.style.overflow = 'hidden';
    element.style.transition = 'all 0.3s ease';
    
    // Добавляем псевдоэлемент для эффекта неона
    const neonEffect = document.createElement('div');
    neonEffect.style.position = 'absolute';
    neonEffect.style.top = '0';
    neonEffect.style.left = '0';
    neonEffect.style.width = '100%';
    neonEffect.style.height = '100%';
    neonEffect.style.background = 'linear-gradient(45deg, #6c5ce7, #a29bfe, #fd79a8, #6c5ce7)';
    neonEffect.style.backgroundSize = '400% 400%';
    neonEffect.style.animation = 'gradient-move 8s linear infinite';
    neonEffect.style.zIndex = '-1';
    
    // Добавляем стили для анимации
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes gradient-move {
            0% {
                background-position: 0% 50%;
            }
            50% {
                background-position: 100% 50%;
            }
            100% {
                background-position: 0% 50%;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Делаем элемент позиционированным для добавления абсолютно позиционированного дочернего элемента
    if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
    }
    
    // Вставляем эффект в кнопку
    element.insertBefore(neonEffect, element.firstChild);
    
    // События для эффектов при наведении
    element.addEventListener('mouseenter', () => {
        element.style.boxShadow = '0 0 15px 5px rgba(108, 92, 231, 0.5)';
        element.style.transform = 'translateY(-3px)';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.boxShadow = originalBoxShadow;
        element.style.transform = 'translateY(0)';
    });
}

// Функция для инициализации всех анимаций
function initAnimations() {
    // Добавляем обработчик клика для создания эффекта частиц
    document.body.addEventListener('click', createClickEffect);
    
    // Добавляем эффект пульсации для всех кнопок
    const buttons = document.querySelectorAll('button, .btn');
    buttons.forEach(button => {
        button.addEventListener('click', () => createPulseEffect(button));
    });
    
    // Применяем градиентный текст к заголовкам
    const headers = document.querySelectorAll('h1, h2, h3');
    headers.forEach(createGradientText);
    
    // Добавляем неоновый эффект к кнопкам
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(createNeonButton);
    
    // Инициализируем эффект морфинга для заголовка, если он существует
    const appTitle = document.querySelector('.app-title');
    if (appTitle) {
        createTextMorphing(appTitle, ['Переводчик сленга', 'Slang Translator', 'Словарь современного языка'], 5000);
    }
    
    // Конвертируем карточки словаря в 3D карточки
    const slangCards = document.querySelectorAll('.card');
    slangCards.forEach(card => {
        const cardBody = card.querySelector('.card-body');
        if (cardBody) {
            const front = cardBody.cloneNode(true);
            const title = front.querySelector('.card-title');
            
            if (title) {
                const back = document.createElement('div');
                back.className = 'card-body';
                
                // Создаем содержимое задней стороны
                const meaning = front.querySelector('.card-text');
                const example = meaning.nextElementSibling && meaning.nextElementSibling.nextElementSibling;
                
                back.innerHTML = `
                    <h5 class="card-title">${title.textContent}</h5>
                    <p class="card-text" style="font-size: 1.2rem; font-weight: 500;">${meaning ? meaning.textContent : ''}</p>
                    <p class="card-text fst-italic">${example ? example.textContent : ''}</p>
                `;
                
                // Создаем эффект 3D карточки
                const cardContainer = card.parentElement;
                if (cardContainer) {
                    const flipCard = createFlipEffect(front, back);
                    card.style.display = 'none';
                    cardContainer.appendChild(flipCard);
                }
            }
        }
    });
    
    // Добавляем эффект набора текста к результатам перевода
    const translateButton = document.querySelector('#translate-button');
    if (translateButton) {
        translateButton.addEventListener('click', () => {
            const resultElement = document.querySelector('#translation-result');
            if (resultElement) {
                const text = resultElement.textContent;
                createTypingEffect(resultElement, text);
            }
        });
    }
}

// Инициализация анимаций после загрузки страницы
window.addEventListener('DOMContentLoaded', initAnimations); 