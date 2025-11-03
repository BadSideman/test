// --- Глобальная переменная для отслеживания состояния прохождения теста ---
let hasUserPassedTest = false; // Флаг, показывающий, пройден ли тест
const STORAGE_KEY = 'testCompletionStatus'; // Ключ для localStorage

// --- Получаем ссылки на все элементы DOM ---
const userInfoForm = document.getElementById('user-info-form');
const surnameInput = document.getElementById('surname');
const nameInput = document.getElementById('name');
const patronymicInput = document.getElementById('patronymic');
const startTestButton = document.getElementById('start-test-button');
const alreadyPassedMessage = document.getElementById('already-passed-message'); // Сообщение "Тест уже пройден"
const welcomeRulesSection = document.getElementById('welcome-rules-section');
const questionNumberElement = document.getElementById('question-number');
const timerContainer = document.getElementById('timer-container');
const timerDisplay = document.getElementById('timer-display');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const questionTextElement = document.getElementById('question-text');
const answerOptionsElement = document.getElementById('answer-options');
const resultContainer = document.getElementById('result-container');
const scoreElement = document.getElementById('score');
const feedbackElement = document.getElementById('feedback');
const bottomNavigation = document.getElementById('bottom-navigation-buttons');
const questionNavBar = document.getElementById('question-nav-bar');

let fullName = ''; //Полное имя пользователя
const testQuestions = [
    {
        id: 1,
        question: "С какой периодичностью проводится осмотр карьерного автосамосвала с целью проверки его технического состояния водительским составом?",
        options: [
            "Ежесменно",
            "Один раз в неделю",
            "Один раз в месяц"
        ],
        correctAnswer: ["Ежесменно"],
        isMultipleChoice: false,
        imageUrl: null
    },
    {
        id: 2,
        question: "Какой технический газ необходимо использовать при заправке цилиндров подвески и пневмогидроаккумуляторов карьерных автосамосвалов?",
        options: [
            "Кислород",
            "Азот",
            "Углекислый газ"
        ],
        correctAnswer: ["Азот"],
        isMultipleChoice: false,
        imageUrl: null 
    },
    {
        id: 3,
        question: "Какое остаточное давление допускается оставлять в крупногабаритной шине перед проведением работ по ее демонтажу?",
        options: [
            "1 кгс/см2",
            "0,5 кгс/см2",
            "Не допускается"
        ],
        correctAnswer: ["Не допускается"],
        isMultipleChoice: false,
        imageUrl: null 
    },
    {
        id: 4,
        question: "Когда допускается накачивать шину до номинального давления в процессе производства работ по монтажу колеса?",
        options: [
            "Только после закрепления колеса на ступице автосамосвала",
            "В процессе монтажа колеса специализированным оборудованием (шиноманипулятор)",
            "В процессе производства работ по протяжке колеса"
        ],
        correctAnswer: ["Только после закрепления колеса на ступице автосамосвала"],
        isMultipleChoice: false,
        imageUrl: null
    },
    {
        id: 5,
        question: "Допускается ли использовать растворную линию системы комбинированной системы пожаротушения для тушения электрооборудования автосамосвала?",
        options: [
            "Допускается ",
            "Не допускается",
        ],
        correctAnswer: ["Не допускается"],
        isMultipleChoice: false,
        imageUrl: null 
    },
        {
        id: 6,
        question: "Допускается ли остановка двигателя автосамосвала во время движения?",
        options: [
            "Допускается ",
            "Не допускается",
        ],
        correctAnswer: ["Не допускается"],
        isMultipleChoice: false,
        imageUrl: null 
    },
    {
        id: 7,
        question: "Как допускается осуществлять буксировку неисправного самосвала?",
        options: [
            "Специальным тягачом-буксировщиком",
            "Специальным буксировочным тросом",
            "С помощью другого карьерного автосамосвала либо бульдозера",
        ],
        correctAnswer: ["Специальным тягачом-буксировщиком"],
        isMultipleChoice: false,
        imageUrl: null 
    },
    {
        id: 8,
        question: "Необходимо ли отключить аккумуляторные батареи до начала сварочных работ карьерного автосамосвала?",
        options: [
            "Да",
            "Нет",
        ],
        correctAnswer: ["Да"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 9,
        question: "На каком расстоянии должен быть присоединен провод «массы» сварочного аппарата от места сварки?",
        options: [
            "Не более 0,6 м",
            "Не более 1 м",
            "Не более 1,5 м",
            "В любом месте",
        ],
        correctAnswer: ["Не более 0,6 м"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 10,
        question: "В какой последовательности необходимо производить отключение аккумуляторных батарей?",
        options: [
            "Сначала должен быть отключен отрицательный кабель, потом положительный",
            "Сначала должен быть отключен положительный кабель, потом отрицательный",
            "Последовательность значения не имеет",
        ],
        correctAnswer: ["Сначала должен быть отключен отрицательный кабель, потом положительный"],
        isMultipleChoice: false,
        imageUrl: null 
    },
    {
        id: 11,
        question: "Чем обязательно должен быть укомплектован карьерный автосамосвал, находящийся в эксплуатации?",
        options: [
            "Исправными средствами пожаротушения",
            "Знаками аварийной остановки (2 шт) и противооткатными упорами (2 шт)",
            "Медицинской аптечкой ",
            "Зеркалом заднего вида – 2 шт",
            "Устройством блокировки (сигнализатором) поднятия кузова под ВЛ (СПВЛ)",
            "Средствами связи (радиостанцией)",
            "Комплект инструмента, предусмотренный заводом-изготовителем",
        ],
        correctAnswer: ["Знаками аварийной остановки (2 шт) и противооткатными упорами (2 шт)"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 12,
        question: "Какое количество налипшего груза в застопоренной грузовой платформе допускается при производстве ремонтных работ?",
        options: [
            "Не более 3% от грузоподъемности самосвала",
            "Не более 5% от грузоподъемности самосвала",
            "Не более 10% от грузоподъемности самосвала",
        ],
        correctAnswer: ["Не более 3% от грузоподъемности самосвала"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 13,
        question: "Какое утверждение соответствует требованиям ПБ РУМОС к проведению работ в 1 секторе на отвале?",
        options: [
            "Расстояние между работающими в 1 секторе бульдозером и автосамосвалом должно быть не менее 7 м",
            "Расстояние между работающими в 1 секторе бульдозером и автосамосвалом должно быть не менее 3 м",
            "Одновременно работу в 1 секторе на отвале бульдозера и автосамосвалов следует проводить по утвержденному регламенту",
            "Запрещается одновременная работа в 1 секторе бульдозера и автосамосвалов",
        ],
        correctAnswer: ["Запрещается одновременная работа в 1 секторе бульдозера и автосамосвалов"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 14,
        question: "Какой инструктаж проводится непосредственно на рабочем месте до начала самостоятельной работы?",
        options: [
            "Первичный",
            "Целевой",
            "До начала самостоятельной работы проводится только стажировка",
            "Все ответы неверны",
        ],
        correctAnswer: ["Первичный"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 15,
        question: "Сколько точек опоры необходимо иметь человеку при спуске-подъеме по лестнице на оборудование?",
        options: [
            "Три точки опоры",
            "Две точки опоры",
            "Можно спрыгивать с машины, если высота не более одного метра",
            "Иметь четыре точки опоры, если машина в движении",
        ],
        correctAnswer: ["Три точки опоры"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 16,
        question: "Кто несет наибольшую ответственность за вашу безопасность?",
        options: [
            "Вы сами",
            "Специалист по ОТ и ПБ",
            "Руководитель",
            "Инженер ответственный ведения работ",
        ],
        correctAnswer: ["Вы сами"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 17,
        question: "Должна ли на горнотранспортном оборудовании находиться книга (журнал) приема-сдачи смен?",
        options: [
            "Да",
            "Нет",
        ],
        correctAnswer: ["Да"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 18,
        question: "Как часто машинист (водитель) горнотранспортного оборудования должен проверять исправность и комплектность машин?",
        options: [
            "Ежемесячно",
            "Ежеквартально",
            "Еженедельно",
            "Ежесменно",
            "Ежегодно",
        ],
        correctAnswer: ["Ежесменно"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 19,
        question: "Что должны иметь при себе водители автосамосвалов?",
        options: [
            "Водительское удостоверение, путевой лист, удостоверение о проверке знаний по охране труда и промышленной безопасности и допуск к работе на угольном разрезе",
            "Только водительское удостоверение",
            "Медицинский осмотр (справка), водительское удостоверение",
            "Медицинский осмотр (справка)",
        ],
        correctAnswer: ["Водительское удостоверение, путевой лист, удостоверение о проверке знаний по охране труда и промышленной безопасности и допуск к работе на угольном разрезе"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 20,
        question: "Какие условия необходимо выполнять при погрузке горной массы в автомобили экскаваторами (погрузчиками)?",
        options: [
            "1. Высота падения груза должна быть минимально возможной и во всех случаях не превышать 3м",
            "2. Погрузку автомобиля следует производить только сбоку, переносить ковш над кабиной разрешается",
            "3. Погрузку автомобиля следует производить только сзади или сбоку, переносить ковш над кабиной автомобиля запрещается",
            "4. Высота падения груза должна быть минимально возможной и во всех случаях не должна превышать 5м",
            "5. При условии выполнения пунктов 1 и 3",
        ],
        correctAnswer: ["5. При условии выполнения пунктов 1 и 3"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 21,
        question: "Чем должно быть укомплектовано горнотранспортное оборудование?",
        options: [
            "Аптечка",
            "Телефон",
            "Промасленная ветошь",
            "Все варианты верные",
        ],
        correctAnswer: ["Аптечка"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 22,
        question: "Какой должна быть высота предохранительного вала на отвале?",
        options: [
            "Не менее 1 м",
            "Не менее 0,5 диаметра колеса транспортного средства максимальной грузоподъемности, применяемого в данных условиях, но не менее 1 метра",
            "Не менее 1,5 м",
            "Не менее 2,0 м",
        ],
        correctAnswer: ["Не менее 0,5 диаметра колеса транспортного средства максимальной грузоподъемности, применяемого в данных условиях, но не менее 1 метра"],
        isMultipleChoice: false,
        imageUrl: null  
    },
     {
        id: 23,
        question: "В случае аварийной остановки автомобиля на проезжей части водитель обязан?",
        options: [
            "Сообщить непосредственному руководителю (лицу сменного технического надзора)",
            "Установить противооткатные упоры",
            "Выставить знаки аварийной остановки с обеих сторон",
            "Все варианты верные",
        ],
        correctAnswer: ["Все варианты верные"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 24,
        question: "Укажите допустимое расстояние (А) от проводов до негабаритного автотранспортного средства при проезде под линией 10 кВ?",
        options: [
            "Более 0,5 м",
            "Более 2,0 м",
            "Более 3,0 м",
            "Более 4,0 м",
        ],
        correctAnswer: ["Более 2,0 м"],
        isMultipleChoice: false,
        imageUrl: 'image/number_24.png' 
    },
    {
        id: 25,
        question: "Укажите допустимое расстояние между стоящими на разгрузке и проезжающими транспортными средствами (А) при работе на отвале?",
        options: [
            "Не менее 3 м",
            "Не менее 4 м",
            "Не менее 5 м",
            "Не менее 6 м",
        ],
        correctAnswer: ["Не менее 5 м"],
        isMultipleChoice: false,
        imageUrl: 'image/number_25.png' 
    },
      
    {
        id: 26,
        question: "Допускается ли подъезжать к бровке отвала при высоте предохранительного вала менее 1 м?",
        options: [
            "Допускается",
            "При высоте предохранительного вала менее требуемой запрещается подъезжать к бровке отвала ближе, чем на 5 м, или ближе расстояния, указанного в документации на производство работ",
            "Допускается если предохранительный вал находится вне зоны возможного обрушения, определенной водителем визуально",
        ],
        correctAnswer: ["При высоте предохранительного вала менее требуемой запрещается подъезжать к бровке отвала ближе, чем на 5 м, или ближе расстояния, указанного в документации на производство работ"],
        isMultipleChoice: false,
        imageUrl: null  
    },
    {
        id: 27,
        question: "Что запрещается делать при осмотре баков, трубопроводов на предмет наличия в них ГСМ?",
        options: [
            "Светить фонариком",
            "Использовать мерный щуп",
            "Подсвечивать открытым огнем",
        ],
        correctAnswer: ["Подсвечивать открытым огнем"],
        isMultipleChoice: false,
        imageUrl: null 
    }

];

let currentQuestionIndex = 0; // отслеживание текущего вопроса
let score = 0; // хранит правильные ответы
// selectedAnswers теперь хранит массив выбранных ответов: { questionId: [selectedOption1, selectedOption2, ...] }
let selectedAnswers = {}; 
let questionNavigationItems = [];

// --- Таймер ---
let timerInterval = null;
let timeRemaining = 0;
const TOTAL_TEST_TIME_SECONDS = 300; // 3 минуты

// --- Функция для проверки localStorage ---
function checkTestCompletion() {
    const storedStatus = localStorage.getItem(STORAGE_KEY);
    if (storedStatus === 'passed') {
        hasUserPassedTest = true;
        // Скрываем элементы для начала теста и показываем сообщение
        userInfoForm.style.display = 'none';
        welcomeRulesSection.style.display = 'none';
        alreadyPassedMessage.style.display = 'block'; // Показываем сообщение
        
        // Скрываем все элементы, связанные с самим тестом и таймером
        timerContainer.style.display = 'none';
        questionContainer.style.display = 'none';
        resultContainer.style.display = 'none'; // Скрываем результаты, если они не должны отображаться повторно
    } else {
        hasUserPassedTest = false;
        // Если тест еще не пройден, показываем стандартный интерфейс
        alreadyPassedMessage.style.display = 'none'; // Скрываем сообщение
        userInfoForm.style.display = 'block';
        welcomeRulesSection.style.display = 'block';
    }
}

// --- Форматирование времени ---
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(remainingSeconds).padStart(2, '0');
    return `${formattedMinutes}:${formattedSeconds}`;
}

// --- Обновление таймера ---
function updateTimer() {
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        timeRemaining = 0;
        timerDisplay.textContent = `Время: ${formatTime(timeRemaining)}`;
        handleTimeUp();
        return;
    }
    timeRemaining--;
    timerDisplay.textContent = `Время: ${formatTime(timeRemaining)}`;
}

function handleTimeUp() {
    alert("Время теста истекло!");
    stopTimer();
    answerOptionsElement.querySelectorAll('.answer-option-wrapper').forEach(wrapper => wrapper.classList.add('disabled'));
    updateQuestionNavStatus(); 
    showResults();
}

function startTimer() {
    timeRemaining = TOTAL_TEST_TIME_SECONDS;
    timerDisplay.textContent = `Время: ${formatTime(timeRemaining)}`;
    timerContainer.style.display = 'block';
    timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    timerContainer.style.display = 'none';
}

// --- Функции для навигации ---
function updateNavigationButtons() {
    const currentQuestionId = testQuestions[currentQuestionIndex].id;
    const answersForCurrentQuestion = selectedAnswers[currentQuestionId] || []; 

    // Кнопка "Назад"
    if (currentQuestionIndex === 0) {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }

    // Кнопка "Следующий" / "Завершить"
    if (currentQuestionIndex < testQuestions.length - 1) { // Если это НЕ последний вопрос
        nextButton.disabled = false;
        nextButton.style.opacity = 1;
    } else { // Если это последний вопрос
        // Активна только если выбран хотя бы один ответ
        if (answersForCurrentQuestion.length > 0) {
            nextButton.disabled = false;
            nextButton.style.opacity = 1;
        } else {
            nextButton.disabled = true;
            nextButton.style.opacity = 0.6;
        }
    }

    // Текст кнопки
    if (currentQuestionIndex === testQuestions.length - 1) {
        nextButton.textContent = 'Завершить тест';
    } else {
        nextButton.textContent = 'Следующий вопрос';
    }
}

// --- Обновление стилей номеров вопросов ---
function updateQuestionNavStatus() {
    questionNavigationItems.forEach((item, index) => {
        const question = testQuestions[index];
        const questionId = question.id;
        const answers = selectedAnswers[questionId] || [];

        item.classList.remove('active', 'answered', 'skipped', 'disabled');

        if (timerInterval === null) { // Если тест завершен
            if (answers.length === 0) { 
                item.classList.add('skipped');
            } else {
                item.classList.add('answered');
            }
            item.classList.add('disabled');
        } else { // Если тест активен
            if (answers.length > 0) { 
                item.classList.add('answered');
            } else { 
                item.classList.add('skipped');
            }
        }

        if (index === currentQuestionIndex) {
            item.classList.add('active');
        }
    });
}

function goToQuestion(index) {
    if (index < 0 || index >= testQuestions.length) {
        return;
    }

    currentQuestionIndex = index;
    displayQuestion();
    updateNavigationButtons();
    updateQuestionNavStatus();
}

function initializeQuestionNavBar() {
    questionNavBar.innerHTML = '';
    questionNavigationItems = [];

    testQuestions.forEach((question, index) => {
        const navItem = document.createElement('div');
        navItem.classList.add('question-nav-item');
        navItem.textContent = index + 1;
        navItem.dataset.index = index;

        navItem.addEventListener('click', () => {
            if (timerInterval !== null) {
                goToQuestion(index);
            }
        });

        questionNavBar.appendChild(navItem);
        questionNavigationItems.push(navItem); 
    });
}

// --- ИЗМЕНЕНА ФУНКЦИЯ STARTTEST ---
function startTest() {
    const surname = surnameInput.value.trim();
    const name = nameInput.value.trim();
    const patronymic = patronymicInput.value.trim();

    if (!surname || !name) {
        alert("Пожалуйста, введите вашу Фамилию и Имя.");
        return;
    }

    fullName = `${surname} ${name} ${patronymic}`.trim();

    // --- СКРЫВАЕМ ВСЕ, ЧТО ДО ТЕСТА ---
    userInfoForm.style.display = 'none';
    welcomeRulesSection.style.display = 'none';

    // --- ПОКАЗЫВАЕМ ЭЛЕМЕНТЫ ТЕСТА ---
    questionContainer.style.display = 'block';
    bottomNavigation.style.display = 'flex';

    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = {}; 
    startTimer();

    initializeQuestionNavBar();
    displayQuestion();
    updateNavigationButtons();
    updateQuestionNavStatus();

    // --- ЗАПИСЫВАЕМ В localStorage, ЧТО ТЕСТ ПРОЙДЕН ---
    /*localStorage.setItem(STORAGE_KEY, 'passed');
    hasUserPassedTest = true; // Обновляем флаг*/
}

function displayQuestion() {
    const question = testQuestions[currentQuestionIndex];
    questionNumberElement.textContent = `Вопрос ${currentQuestionIndex + 1} из ${testQuestions.length}`;

    questionTextElement.textContent = question.question;
    answerOptionsElement.innerHTML = '';
    // 1. УДАЛЕНИЕ СТАРОГО КОНТЕЙНЕРА С КАРТИНКОЙ (САМОЕ ВАЖНОЕ ИЗМЕНЕНИЕ)
    const existingImageContainer = document.getElementById('question-image-container');
    if (existingImageContainer) {
        existingImageContainer.remove();
    }

    // 2. ДОБАВЛЕНИЕ НОВОЙ КАРТИНКИ (если есть)
    if (question.imageUrl) {
        const imageContainer = document.createElement('div');
        imageContainer.id = 'question-image-container'; 

        const imgElement = document.createElement('img');
        imgElement.src = question.imageUrl;
        imgElement.alt = `Изображение к вопросу ${question.id}`;
        imgElement.classList.add('question-image'); 

        imageContainer.appendChild(imgElement);
        
        // Вставляем контейнер с картинкой перед блоком с вариантами ответов
        // Для этого нужно найти ссылку на answerOptionsElement и вставить перед ним.
        answerOptionsElement.parentNode.insertBefore(imageContainer, answerOptionsElement);
    }
    // --- КОНЕЦ ДОБАВЛЕНИЯ КАРТИНКИ ---
    

    question.options.forEach((option, index) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('answer-option-wrapper');
        wrapper.dataset.id = question.id; 
        wrapper.dataset.option = option;

        // input type="checkbox"
        const checkboxInput = document.createElement('input');
        checkboxInput.type = 'checkbox'; 
        checkboxInput.name = `question-${question.id}`; 
        checkboxInput.id = `option-${question.id}-${index}`;
        checkboxInput.value = option;
        checkboxInput.dataset.id = question.id;
        checkboxInput.dataset.option = option;

        // custom-checkbox
        const customCheckbox = document.createElement('div');
        customCheckbox.classList.add('custom-checkbox');

        const label = document.createElement('label');
        label.htmlFor = `option-${question.id}-${index}`;
        label.textContent = option;

        wrapper.appendChild(checkboxInput);
        wrapper.appendChild(customCheckbox);
        wrapper.appendChild(label);
        answerOptionsElement.appendChild(wrapper);
    });

    // --- Восстанавливаем состояние вопроса ---
    const currentQuestionId = question.id;
    const savedAnswers = selectedAnswers[currentQuestionId] || []; 

    if (savedAnswers.length > 0) {
        savedAnswers.forEach(savedOption => {
            const savedWrapper = answerOptionsElement.querySelector(`.answer-option-wrapper[data-id="${currentQuestionId}"][data-option="${savedOption}"]`);
            if (savedWrapper) {
                savedWrapper.querySelector('input[type="checkbox"]').checked = true;
                savedWrapper.classList.add('selected');
            }
        });
    }

    // Если тест завершен (timerInterval === null), блокируем все ответы
    if (timerInterval === null) {
        answerOptionsElement.querySelectorAll('.answer-option-wrapper').forEach(wrapper => {
            wrapper.classList.add('disabled');
        });
    }
    // --- ---

    updateNavigationButtons();
    updateQuestionNavStatus();
}

// --- КОРРЕКТНЫЙ ОБРАБОТЧИК ДЛЯ ЧЕКБОКСОВ ---
function selectAnswer(event) {
    const targetWrapper = event.target.closest('.answer-option-wrapper');
    
    if (!targetWrapper || targetWrapper.classList.contains('disabled')) {
        return;
    }

    const questionId = parseInt(targetWrapper.dataset.id);
    const selectedOption = targetWrapper.dataset.option;
    const checkboxInput = targetWrapper.querySelector('input[type="checkbox"]'); 
    const question = testQuestions.find(q => q.id === questionId); // Находим сам вопрос

    let currentSelectedAnswers = selectedAnswers[questionId] || [];

    // --- ЛОГИКА ДЛЯ ОГРАНИЧЕНИЯ ВЫБОРА ОДНОГО ОТВЕТА ---
    if (!question.isMultipleChoice) { // Если это вопрос с одним выбором
        // Если кликнули на уже выбранный ответ, снимаем его
        if (checkboxInput.checked) {
            const indexToRemove = currentSelectedAnswers.indexOf(selectedOption);
            if (indexToRemove > -1) {
                currentSelectedAnswers.splice(indexToRemove, 1);
            }
            checkboxInput.checked = false; 
            targetWrapper.classList.remove('selected');
        } else {
            // Если кликнули на новый ответ:
            // 1. Снимаем галочку и класс 'selected' со ВСЕХ ответов этого вопроса
            answerOptionsElement.querySelectorAll(`.answer-option-wrapper[data-id="${questionId}"]`).forEach(wrapper => {
                // Снимаем только если это НЕ тот wrapper, на который кликнули
                if (wrapper !== targetWrapper) { 
                    wrapper.classList.remove('selected');
                    wrapper.querySelector('input[type="checkbox"]').checked = false;
                }
            });
            
            // 2. Выбираем новый ответ
            currentSelectedAnswers = [selectedOption]; // Обновляем массив, оставляя только новый выбор
            checkboxInput.checked = true; 
            targetWrapper.classList.add('selected');
        }
    } else { // Если это вопрос с множественным выбором
        if (checkboxInput.checked) {
            // Чекбокс был отмечен, а теперь мы кликнули, чтобы его снять
            const indexToRemove = currentSelectedAnswers.indexOf(selectedOption);
            if (indexToRemove > -1) {
                currentSelectedAnswers.splice(indexToRemove, 1);
            }
            checkboxInput.checked = false; 
            targetWrapper.classList.remove('selected');
        } else {
            // Чекбокс не был отмечен, а теперь мы кликнули, чтобы его отметить
            if (!currentSelectedAnswers.includes(selectedOption)) {
                currentSelectedAnswers.push(selectedOption);
            }
            checkboxInput.checked = true; 
            targetWrapper.classList.add('selected');
        }
    }
    
    selectedAnswers[questionId] = currentSelectedAnswers;

    updateNavigationButtons();
    updateQuestionNavStatus();
}

function handleNextButtonClick() {
    const currentQuestion = testQuestions[currentQuestionIndex];
    const currentQuestionId = currentQuestion.id;
    const answersForCurrentQuestion = selectedAnswers[currentQuestionId] || [];

    if (nextButton.disabled && currentQuestionIndex < testQuestions.length - 1) return;

    if (currentQuestionIndex === testQuestions.length - 1) {
        stopTimer();
        showResults();
        return;
    }

    currentQuestionIndex++;
    displayQuestion();
    updateNavigationButtons();
    updateQuestionNavStatus();
}

function showResults() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    let correctAnswersCount = 0;
    const unansweredQuestions = []; 

    testQuestions.forEach(q => {
        const savedAnswers = selectedAnswers[q.id] || [];
        const correctAnswers = q.correctAnswer;

        if (savedAnswers.length === 0) { // Если ни один ответ не выбран
            unansweredQuestions.push(q);
        } else {
            // Подсчет правильных ответов для чекбоксов
            const isCorrect = correctAnswers.length === savedAnswers.length && 
                              correctAnswers.every(correct => savedAnswers.includes(correct));
            
            if (isCorrect) {
                correctAnswersCount++;
            }
        }
    });

    const totalQuestions = testQuestions.length;
    const percentage = (correctAnswersCount / totalQuestions) * 100;

    scoreElement.innerHTML = `<b>${fullName}</b><br>${correctAnswersCount} из ${totalQuestions} (${percentage.toFixed(1)}%)`;
    feedbackElement.textContent = getFeedback(percentage);

    if (unansweredQuestions.length > 0) {
        feedbackElement.textContent += ` Не отвечено на ${unansweredQuestions.length} вопросов.`;
    }

    questionNavigationItems.forEach(item => item.classList.add('disabled'));
}

function getFeedback(percentage) {
    if (percentage === 100) {
        return ' ';
    } else if (percentage >= 75) {
        return ' ';
    } else if (percentage >= 50) {
        return ' ';
    } else {
        return ' ';
    }
}

// --- Обработчики событий ---
startTestButton.addEventListener('click', startTest);

answerOptionsElement.addEventListener('click', selectAnswer);

nextButton.addEventListener('click', handleNextButtonClick);

prevButton.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        goToQuestion(currentQuestionIndex - 1);
    }
});

// --- ПРОВЕРКА СОСТОЯНИЯ ПРИ ЗАГРУЗКЕ СТРАНИЦЫ ---
document.addEventListener('DOMContentLoaded', () => {
    checkTestCompletion(); // Вызываем функцию проверки localStorage при полной загрузке DOM
    
    // Изначально скрываем кнопки навигации, если тест не начат
    prevButton.style.visibility = 'hidden';
    nextButton.style.opacity = 0.6;
    nextButton.disabled = true;
    bottomNavigation.style.display = 'none';
});