const textElement = document.getElementById("text");
const optionButtonsElement = document.getElementById("option-buttons");

let state = {}

function startGame() {
    state = {}
    showTextNode(1)
}

function selectOption(option) {
    const nextTextNodeId = option.nextText;
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showTextNode(nextTextNodeId)
}

function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement("button")
            button.innerText = option.text
            button.addEventListener("click", () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requredState == null || option.requiredState(state)
}

const textNodes = [
    {
        id: 1,
        text: 'You wake up in a strange placee and see stuff do you want ot go?',
        options: [
            {
                text: "Take stuff",
                setState: { stuff: true },
                nextText: 2
            },
            {
                text: "Leave the stuff",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "a merchant comes do you want to trade?",
        options: [
            {
                text: "trade stuff for sword",
                requiredState: (currentState) => currentState.stuff,
                setState: { stuff: false, sword: true },
                nextText: 3
            },
            {
                text: "trade stuff for shield",
                requiredState: (currentState) => currentState.stuff,
                setState: { stuff: false, shield: true },
                nextText: 3
            },
            {
                text: "Ignore the merchant",
                nextText: 3
            },
        ]
    },
    {
        id: 3,
        text: "After leaving merchant you find a castle to sleep at",
        options: [
            {
                text: "explore the castle",
                nextText: 4
            },
            {
                text: "find a room to sleep in",
                nextText: 4
            },
            {
                text: "find some hay to sleep on",
                nextText: 4
            },
        ]
    },
    {
        id: 4,
        text: "You are so tired you fall asleep exploring the castle and are killed by a chicken.",
        options: [
            {
                text: "Restart",
                nextText: -1
            }
        ]
    }
]

startGame()