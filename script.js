document.addEventListener('DOMContentLoaded', function() {
    // Анимация появления элементов при прокрутке
    const hiddenElements = document.querySelectorAll('.hidden');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    hiddenElements.forEach(el => {
        observer.observe(el);
    });

    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Геометрический фон с точками и линиями
    const canvas = document.getElementById('geometricBg');
    const ctx = canvas.getContext('2d');

    // Установка размеров canvas равными размерам окна
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Создаем массив точек
    const points = [];
    const numPoints = 120; // Увеличил количество точек
    const connectionDistance = 180; // Увеличил дистанцию соединения

    for (let i = 0; i < numPoints; i++) {
        points.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.6, // Увеличил скорость
            vy: (Math.random() - 0.5) * 0.6  // Увеличил скорость
        });
    }

    // Функция анимации
    function animate() {
        // Очистка canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Обновление позиций точек
        points.forEach(point => {
            point.x += point.vx;
            point.y += point.vy;

            // Проверка границ и отражение
            if (point.x < 0 || point.x > canvas.width) point.vx *= -1;
            if (point.y < 0 || point.y > canvas.height) point.vy *= -1;

            // Рисуем точку
            ctx.beginPath();
            ctx.arc(point.x, point.y, 2, 0, Math.PI * 2); // Увеличил размер точек
            ctx.fillStyle = 'rgba(60, 149, 137, 0.8)'; // Увеличил непрозрачность
            ctx.fill();
        });

        // Рисуем линии между близкими точками
        for (let i = 0; i < points.length; i++) {
            for (let j = i + 1; j < points.length; j++) {
                const dx = points[i].x - points[j].x;
                const dy = points[i].y - points[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    ctx.beginPath();
                    ctx.moveTo(points[i].x, points[i].y);
                    ctx.lineTo(points[j].x, points[j].y);
                    // Увеличил непрозрачность линий
                    ctx.strokeStyle = `rgba(60, 149, 137, ${(1 - distance / connectionDistance) * 0.8})`;
                    ctx.lineWidth = 0.8; // Увеличил толщину линий
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
});