// Устанавливаем изначальные значения
let counter1 = 1000;
let counter2 = 0;
let counter3 = 0;

// Функция для обновления счетчика на странице
function updateCounter(counterId, value) {
    document.getElementById(counterId).textContent = value;
}

// Обновляем значения счетчиков на странице
//ПЕРЕДЕЛАИТЬ!
updateCounter('counter1', counter1);
updateCounter('counter2', counter2);
updateCounter('counter3', counter3);

function toggleImage(imageId) {
    let image = document.getElementById(imageId);
    if (image.style.display === 'none') {
        image.style.display = 'block';
    } else {
        image.style.display = 'none';
        setTimeout(function () {
            image.style.display = 'block';
            // ВЫНЕСТИ В КОНСТАНТЫ!
        }, 60_000); // минута в миллисекундах
    }
}

function adjustWidth(boxId) {

    // ПЕРЕДЕЛАТЬ! НА CONST
    let box = document.getElementById(boxId);
    let svg = box.querySelector('svg');
    
    let currentWidth = parseInt(svg.getAttribute('width'), 10);
    let newWidth = currentWidth - 25;

    // Если newWidth становится меньше 0, сбрасываем его к 100 и отнимаем 100 от counter1
    if (newWidth < 0) {
        newWidth = 100;
        counter1 -= 100;

        // Обновляем значение counter1 на странице
        document.getElementById('counter1').textContent = counter1;
    }

    // Добавляем 10 к counter3
    counter3 += 10;

    // Обновляем значение сcounter3 на странице
    document.getElementById('counter3').textContent = counter3;

    // Обновляем ширину svg
    svg.setAttribute('width', newWidth + '%');
}

document.addEventListener("DOMContentLoaded", function() {
    var heartCenter = document.getElementById('heartCenter');
    var resurses = document.getElementById('resurses');
    const backgroundImages = [
        "url(./images/Step0.svg)",
        "url(./images/Step1.svg)",
        "url(./images/Step2.svg)",
        "url(./images/Step3.svg)",
        "url(./images/Step4.svg)",
        "url(./images/Step5.svg)",
        "url(./images/Step6.svg)",
    ];
    let currentBackgroundIndex = 0;

    // Функция для перетаскивания изображений
    var draggingElement = null;
    var initialX = 0;
    var initialY = 0;

    function startDrag(event) {
        draggingElement = event.target;
        initialX = event.clientX - draggingElement.offsetLeft;
        initialY = event.clientY - draggingElement.offsetTop;
    }

    function drag(event) {
        if (draggingElement) {
            event.preventDefault();
            var newX = event.clientX - initialX;
            var newY = event.clientY - initialY;
            draggingElement.style.left = newX + 'px';
            draggingElement.style.top = newY + 'px';
        }
    
    }

    // Переменная для хранения количества перетащенных изображений
    let numberOfImagesMoved = 0;

    function endDrag(event) {
        if (draggingElement) {
            draggingElement.style.display = 'none';
            switchBackground(); // Переключаем фон независимо от того, куда отпущена мышь
            
            // Уменьшаем counter3 на 20 за каждый перемещенный img
            counter3 -= 20;
            updateCounter('counter3', counter3);

            // Скрываем перетаскиваемое изображение
            event.target.style.display = 'none';

            // Увеличиваем счетчик перемещенных изображений
            numberOfImagesMoved++;
        }
        draggingElement = null;
    }

    // Функция для обновления видимости изображений в зависимости от значения counter3
    function updateResourceVisibility() {
        var resources = document.querySelectorAll('#resurses img');
        resources.forEach(function(img, index) {
            var threshold = (index + 1) * 20;
            if (counter3 >= threshold) {
                img.style.display = 'block';
            } else {
                img.style.display = 'none';
            }
        });
    }

    // Скрываем #pillsLeft и #pillsRight при загрузке страницы
    document.getElementById('pillsLeft').style.display = 'none';
    document.getElementById('pillsRight').style.display = 'none';

    // Функция для обработки нажатия на изображения в #pillsLeft и #pillsRight
    function handlePillClick(event) {
        var clickedImg = event.target;
        clickedImg.style.display = 'none'; // Делаем выбранное изображение невидимым
        counter2 += 10; // Увеличиваем значение counter2 на 10
        updateCounter('counter2', counter2); // Обновляем отображение счетчика на странице
    }

    // Назначаем обработчики событий для изображений в #pillsLeft и #pillsRight
    var pillsLeftImgs = document.querySelectorAll('#pillsLeft img');
    pillsLeftImgs.forEach(function(img) {
        img.addEventListener('click', handlePillClick);
    });

    var pillsRightImgs = document.querySelectorAll('#pillsRight img');
    pillsRightImgs.forEach(function(img) {
        img.addEventListener('click', handlePillClick);
    });

    function switchBackground() {
        currentBackgroundIndex = (currentBackgroundIndex + 1) % backgroundImages.length;
        heartCenter.style.backgroundImage = backgroundImages[currentBackgroundIndex];

        // Если достигнуто последнее изображение, делаем #pillsLeft и #pillsRight видимыми
        if (currentBackgroundIndex === backgroundImages.length - 1) {
            document.getElementById('pillsLeft').style.display = 'flex';
            document.getElementById('pillsRight').style.display = 'flex';
        }
    }

    // Вызываем функцию обновления видимости изображений при загрузке страницы
    updateResourceVisibility();

    // Добавление обработчиков событий для перетаскивания
    resurses.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);

    // Обновляем видимость изображений при изменении counter3
    setInterval(updateResourceVisibility, 100); // Вызываем функцию каждые 100 миллисекунд для обновления видимости изображений
});
