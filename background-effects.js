/**
 * Упрощенная версия фоновых эффектов для документации
 * - Легкие анимации без тяжелой нагрузки на CPU/GPU
 * - Автоматическое отключение на мобильных устройствах
 * - Проверка производительности устройства
 */

document.addEventListener('DOMContentLoaded', function() {
    // Определяем поддерживаемость анимаций на устройстве
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    // Если пользователь предпочитает отключать анимации или это мобильное устройство,
    // не применяем фоновые эффекты
    if (prefersReducedMotion || isMobile) {
        document.querySelectorAll('.background-shapes').forEach(container => {
            container.style.display = 'none';
        });
        return;
    }
    
    // Анимация фоновых фигур (очень легкая)
    const shapes = document.querySelectorAll('.shape');
    
    // Используем requestAnimationFrame для плавной анимации
    let lastTime = 0;
    const interval = 50; // Обновляем реже для экономии ресурсов
    
    function animateShapes(timestamp) {
        if (!lastTime || timestamp - lastTime > interval) {
            lastTime = timestamp;
            
            shapes.forEach((shape, index) => {
                // Создаем легкую, медленную анимацию случайного движения
                const speed = 0.005;
                const now = Date.now() * speed;
                const offsetX = Math.sin(now + index) * 15;
                const offsetY = Math.cos(now + index) * 15;
                const rotation = Math.sin(now * 0.5 + index) * 5;
                
                shape.style.transform = `translate(${offsetX}px, ${offsetY}px) rotate(${rotation}deg)`;
            });
        }
        
        requestAnimationFrame(animateShapes);
    }
    
    // Запускаем анимацию с небольшой задержкой, чтобы не мешать загрузке страницы
    setTimeout(() => {
        requestAnimationFrame(animateShapes);
    }, 1000);
    
    // Анимация для карточек (появление при скролле)
    if ('IntersectionObserver' in window) {
        const cards = document.querySelectorAll('.card');
        
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            cardObserver.observe(card);
        });
    }
    
    // Простой эффект при клике (очень легкий)
    document.addEventListener('click', function(e) {
        // Пропускаем, если клик на элементе с обработчиком
        if (e.target.closest('a, button, input')) return;
        
        const ripple = document.createElement('div');
        ripple.className = 'click-ripple';
        ripple.style.left = `${e.clientX}px`;
        ripple.style.top = `${e.clientY}px`;
        
        document.body.appendChild(ripple);
        
        setTimeout(() => {
            document.body.removeChild(ripple);
        }, 1000);
    });
    
    // Добавляем стили для ripple эффекта
    const style = document.createElement('style');
    style.textContent = `
        .click-ripple {
            position: fixed;
            width: 5px;
            height: 5px;
            background: rgba(108, 92, 231, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            animation: ripple 1s ease-out;
        }
        
        @keyframes ripple {
            0% {
                transform: scale(1);
                opacity: 1;
            }
            100% {
                transform: scale(20);
                opacity: 0;
            }
        }
        
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(108, 92, 231, 0.4);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(108, 92, 231, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(108, 92, 231, 0);
            }
        }
        
        @keyframes gradientBg {
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
}); 