const questions = [
    {
        question: "How would you describe your energy level right now?",
        options: ["Very Low", "Moderate", "High", "Extremely High"]
    },
    {
        question: "What best describes your current emotional state?",
        options: ["Sad/Down", "Anxious", "Calm", "Happy/Excited"]
    },
    {
        question: "How would you like to feel?",
        options: ["More Energetic", "More Relaxed", "More Focused", "More Uplifted"]
    }
];

const musicRecommendations = {
    "relaxing": [
        { title: "Calming Piano Music", url: "https://www.youtube.com/watch?v=lCOF9LN_Zxs" },
        { title: "Peaceful Nature Sounds", url: "https://www.youtube.com/watch?v=eKFTSSKCzWA" }
    ],
    "uplifting": [
        { title: "Happy Pop Music", url: "https://www.youtube.com/watch?v=ZbZSe6N_BXs" },
        { title: "Motivational Songs", url: "https://www.youtube.com/watch?v=btPJPFnesV4" }
    ],
    "energizing": [
        { title: "High Energy Workout Mix", url: "https://www.youtube.com/watch?v=9D-QD_HIfjA" },
        { title: "Dance Music Playlist", url: "https://www.youtube.com/watch?v=J1z9gUyRkPo" }
    ],
    "focusing": [
        { title: "Study Music", url: "https://www.youtube.com/watch?v=5qap5aO4i9A" },
        { title: "Concentration Music", url: "https://www.youtube.com/watch?v=WPni755-Krg" }
    ]
};

let currentQuestion = 0;
let userAnswers = [];

const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options-container');
const nextButton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const quizContainer = document.getElementById('quiz-container');
const moodResult = document.getElementById('mood-result');
const musicRecommendationsDiv = document.getElementById('music-recommendations');
const restartButton = document.getElementById('restart-btn');

function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question').textContent = question.question;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.classList.add('option-btn');
        button.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(button);
    });
}

function selectOption(index) {
    userAnswers[currentQuestion] = index;
    const options = optionsContainer.getElementsByClassName('option-btn');
    for (let option of options) {
        option.style.background = 'linear-gradient(45deg, #f6d365 0%, #fda085 100%)';
    }
    options[index].style.background = 'linear-gradient(45deg, #84fab0 0%, #8fd3f4 100%)';
    nextButton.disabled = false;
}

function analyzeMood() {
    const energyLevel = userAnswers[0];
    const emotionalState = userAnswers[1];
    const desiredFeeling = userAnswers[2];
    
    let recommendationType;
    
    if (energyLevel <= 1 && emotionalState <= 1) {
        recommendationType = "uplifting";
    } else if (energyLevel >= 3 && emotionalState === 1) {
        recommendationType = "relaxing";
    } else if (desiredFeeling === 2) {
        recommendationType = "focusing";
    } else {
        recommendationType = "energizing";
    }
    
    return recommendationType;
}

function showResults() {
    const moodType = analyzeMood();
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    const moodMessages = {
        "relaxing": "You seem to need some relaxation and calm.",
        "uplifting": "Let's lift your spirits with some positive vibes!",
        "energizing": "Time to get energized and motivated!",
        "focusing": "Let's help you focus and concentrate better."
    };
    
    moodResult.textContent = moodMessages[moodType];
    
    musicRecommendationsDiv.innerHTML = '<h3>Recommended Music:</h3>';
    musicRecommendations[moodType].forEach(music => {
        const link = document.createElement('a');
        link.href = music.url;
        link.textContent = music.title;
        link.target = "_blank";
        link.classList.add('music-link');
        musicRecommendationsDiv.appendChild(link);
    });
}

nextButton.addEventListener('click', () => {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
    } else {
        showResults();
    }
});

restartButton.addEventListener('click', () => {
    currentQuestion = 0;
    userAnswers = [];
    resultContainer.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    displayQuestion();
});

// Initialize the quiz
displayQuestion(); 