class Node {
    constructor(question, isGuess = false) {
        this.question = question;
        this.isGuess = isGuess;
        this.yes = null;
        this.no = null;
    }
}

class AnimalGuesser {
    constructor() {
        // Basic Classification Questions
        this.root = new Node("Does it live in water?");
        
        // === WATER ANIMALS BRANCH ===
        this.root.yes = new Node("Is it a fish? (has gills and fins)");
        
        // Fish Branch
        this.root.yes.yes = new Node("Is it a predator with sharp teeth?");
        this.root.yes.yes.yes = new Node("Is it a shark?", true);
        this.root.yes.yes.no = new Node("Is it kept as a pet?");
        this.root.yes.yes.no.yes = new Node("Is it a goldfish?", true);
        this.root.yes.yes.no.no = new Node("Is it a tuna?", true);
        
        // Non-Fish Water Animals
        this.root.yes.no = new Node("Does it have tentacles?");
        this.root.yes.no.yes = new Node("Can it change color?");
        this.root.yes.no.yes.yes = new Node("Is it an octopus?", true);
        this.root.yes.no.yes.no = new Node("Is it a jellyfish?", true);
        this.root.yes.no.no = new Node("Is it a mammal?");
        this.root.yes.no.no.yes = new Node("Is it very intelligent?");
        this.root.yes.no.no.yes.yes = new Node("Is it a dolphin?", true);
        this.root.yes.no.no.yes.no = new Node("Is it a whale?", true);
        
        // === LAND/AIR ANIMALS BRANCH ===
        this.root.no = new Node("Can it fly?");
        
        // Flying Animals
        this.root.no.yes = new Node("Is it a bird? (has feathers)");
        
        // Birds
        this.root.no.yes.yes = new Node("Is it a bird of prey?");
        this.root.no.yes.yes.yes = new Node("Does it hunt at night?");
        this.root.no.yes.yes.yes.yes = new Node("Is it an owl?", true);
        this.root.no.yes.yes.yes.no = new Node("Is it an eagle?", true);
        
        this.root.no.yes.yes.no = new Node("Can it talk/mimic sounds?");
        this.root.no.yes.yes.no.yes = new Node("Is it a parrot?", true);
        this.root.no.yes.yes.no.no = new Node("Is it a chicken?", true);
        
        // Flying Insects
        this.root.no.yes.no = new Node("Does it make honey?");
        this.root.no.yes.no.yes = new Node("Is it a bee?", true);
        this.root.no.yes.no.no = new Node("Is it colorful?");
        this.root.no.yes.no.no.yes = new Node("Is it a butterfly?", true);
        this.root.no.yes.no.no.no = new Node("Is it a fly?", true);
        
        // Land Animals
        this.root.no.no = new Node("Is it a pet/domestic animal?");
        
        // Pets/Domestic Animals
        this.root.no.no.yes = new Node("Is it a common household pet?");
        this.root.no.no.yes.yes = new Node("Does it bark?");
        this.root.no.no.yes.yes.yes = new Node("Is it a dog?", true);
        this.root.no.no.yes.yes.no = new Node("Does it meow?");
        this.root.no.no.yes.yes.no.yes = new Node("Is it a cat?", true);
        this.root.no.no.yes.yes.no.no = new Node("Is it a hamster?", true);
        
        this.root.no.no.yes.no = new Node("Is it kept on farms?");
        this.root.no.no.yes.no.yes = new Node("Does it give milk?");
        this.root.no.no.yes.no.yes.yes = new Node("Is it a cow?", true);
        this.root.no.no.yes.no.yes.no = new Node("Is it a horse?", true);
        
        // Wild Animals
        this.root.no.no.no = new Node("Is it a large animal? (bigger than a person)");
        
        // Large Wild Animals
        this.root.no.no.no.yes = new Node("Is it from Africa?");
        this.root.no.no.no.yes.yes = new Node("Does it have a very long neck?");
        this.root.no.no.no.yes.yes.yes = new Node("Is it a giraffe?", true);
        this.root.no.no.no.yes.yes.no = new Node("Does it have tusks?");
        this.root.no.no.no.yes.yes.no.yes = new Node("Is it an elephant?", true);
        this.root.no.no.no.yes.yes.no.no = new Node("Is it a lion?", true);
        
        this.root.no.no.no.yes.no = new Node("Does it live in cold regions?");
        this.root.no.no.no.yes.no.yes = new Node("Is it a polar bear?", true);
        this.root.no.no.no.yes.no.no = new Node("Is it a gorilla?", true);
        
        // Small Wild Animals
        this.root.no.no.no.no = new Node("Is it a rodent?");
        this.root.no.no.no.no.yes = new Node("Does it have a long tail?");
        this.root.no.no.no.no.yes.yes = new Node("Is it a rat?", true);
        this.root.no.no.no.no.yes.no = new Node("Is it a mouse?", true);
        
        this.root.no.no.no.no.no = new Node("Does it hop?");
        this.root.no.no.no.no.no.yes = new Node("Is it a kangaroo?", true);
        this.root.no.no.no.no.no.no = new Node("Does it have a shell?");
        this.root.no.no.no.no.no.no.yes = new Node("Is it a turtle?", true);
        this.root.no.no.no.no.no.no.no = new Node("Is it a snake?", true);
        
        this.currentNode = this.root;
    }

    reset() {
        this.currentNode = this.root;
    }

    nextQuestion(answer) {
        if (answer) {
            this.currentNode = this.currentNode.yes;
        } else {
            this.currentNode = this.currentNode.no;
        }
        return this.currentNode;
    }
}

// Game UI Logic
const questionElement = document.getElementById('question');
const yesButton = document.getElementById('yes-btn');
const noButton = document.getElementById('no-btn');
const resultArea = document.getElementById('result-area');
const questionArea = document.getElementById('question-area');
const resultElement = document.getElementById('result');
const playAgainButton = document.getElementById('play-again');

let game = new AnimalGuesser();

function updateUI(node) {
    if (!node) {
        showResult("I give up! Let me know what animal you were thinking of!", false);
        return;
    }

    if (node.isGuess) {
        showResult(`I think your animal is... ${node.question.slice(6, -1)}!`, true);
        return;
    }

    questionElement.textContent = node.question;
}

function showResult(message, isGuess = false) {
    questionArea.style.display = 'none';
    resultArea.style.display = 'block';
    playAgainButton.style.display = 'none';
    
    if (isGuess) {
        resultElement.innerHTML = `
            ${message}<br>
            <div id="feedback-area" style="margin-top: 1rem;">
                Was I correct?<br>
                <button onclick="handleGuessResult(true)" class="feedback-btn" style="margin: 1rem 0.5rem;">Yes!</button>
                <button onclick="handleGuessResult(false)" class="feedback-btn" style="margin: 1rem 0.5rem;">No</button>
            </div>
        `;
    } else {
        resultElement.innerHTML = `
            ${message}<br>
            <div id="feedback-area" style="margin-top: 1rem;">
                <input type="text" id="actual-animal" placeholder="What was your animal?" style="margin: 1rem 0; padding: 0.5rem;">
                <button onclick="submitActualAnimal()" style="display: block; margin: 0.5rem auto;">Submit</button>
            </div>
        `;
    }
}

function handleGuessResult(wasCorrect) {
    const feedbackArea = document.getElementById('feedback-area');
    if (wasCorrect) {
        feedbackArea.innerHTML = "Great! I guessed it correctly! 🎉";
        playAgainButton.style.display = 'block';
    } else {
        feedbackArea.innerHTML = `
            What animal were you thinking of?<br>
            <input type="text" id="actual-animal" style="margin: 1rem 0; padding: 0.5rem;">
            <button onclick="submitActualAnimal()" style="display: block; margin: 0 auto;">Submit</button>
        `;
    }
}

function submitActualAnimal() {
    const actualAnimal = document.getElementById('actual-animal').value;
    if (actualAnimal.trim()) {
        document.getElementById('feedback-area').innerHTML = 
            `Ah, it was a ${actualAnimal}! I'll try to learn from this for next time! 🤔`;
        playAgainButton.style.display = 'block';
    }
}

function resetGame() {
    game.reset();
    questionArea.style.display = 'block';
    resultArea.style.display = 'none';
    questionElement.textContent = game.currentNode.question;
}

// Event Listeners
yesButton.addEventListener('click', () => {
    updateUI(game.nextQuestion(true));
});

noButton.addEventListener('click', () => {
    updateUI(game.nextQuestion(false));
});

// Initialize the first question
questionElement.textContent = game.currentNode.question;
