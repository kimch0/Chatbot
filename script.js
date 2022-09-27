let space = document.createElement("br");
let answer = [
  `
Graduated with a degree in Business Informatics from the University of Costa Rica (2016-2020). No work experience. Passionate about technology,
 looking for opportunities to develop his skills as a computer scientist.`,
  `Playing guitar, Playing video games, Reading, And drawing. `,
  `The verbosity, I am not a talkative or eloquent person.<br/>
  My memory, I am very forgetful, I have to write down all my obligations.<br/>
The details, I focus a lot on the small details and I tend to spend too much time on them.`,
  `Spanish - Native <br/>
  English - Intermediate <br/>
  I took an English course at the CCCN because of it I reached a <b>B2</b> level and I am in continuous improvement. `,
  `My career is focused on enterprise back-end.  <br/>
  <b>I have used languages such as:</b> <b class = "complement">Java</b>, <b class = "complement">C#</b> in the <b class = "complement">.NET</b> framework and <b class = "complement">Python</b> in small projects. <br/>
  <b>Databases:</b> <b class = "complement">SQLServer</b>, <b class = "complement">MySQL</b> and <b class = "complement">Oracle</b>.<br/>
   On my own I have studied Front-end technologies such as <b class = "complement">HTML</b>, <b class = "complement">CSS</b> and <b class = "complement">Javascript</b> with its <b class = "complement">Vue.js</b> framework and the <b class = "complement">React.js</b> library.<br/>
   <b>Other skills:</b> Software Analysis, server installation and configuration, network subnetwork subnetworking.`,
];
let answerEs = [
  `Graduado de la carrera de Informática Empresarial de la Universidad de Costa Rica (2016-2020). Sin experiencia laboral. Apasionado por la tecnología, en busca de oportunidades que permitan desarrollar sus habilidades como informático.`,
  "Tocar la guitarra, Jugar videojuegos, Leer, Y dibujar. ",
  `La verbosidad, no soy una persona habladora o elocuente.<br/>
  Mi memoria, soy muy olvidadizo, tengo que anotar todas mis obligaciones.<br/>
  Los detalles, me concentro mucho en los detalles pequeños y suelo dedicarles demasiado tiempo.`,
  `Español - Nativo <br/>
  Inglés - Intermedio<br/>
  Llevé un curso de Inglés en el CCCN debido a él logre alcanzar un nivel de <b>B2</b> y me encuentro en continua mejora.`,
  `Mi carrera está enfocada a Back-end empresarial. <br/>
  <b>He utilizado lenguajes como:</b> <b class = "complement">Java</b>, <b class = "complement">C#</b> en el framework <b class = "complement">.NET</b> y <b class = "complement">Python</b> en proyectos pequeños. 
  <br/><b>Bases de datos:</b> <b class = "complement">SQLServer</b>, <b class = "complement">MySQL</b> y <b class = "complement">Oracle</b>.<br/>
  Por mi cuenta he estudiado tecnologías de Front-end como, <b class = "complement">HTML</b>, <b class = "complement">CSS</b> y <b class = "complement">Javascript</b> con su framework de <b class = "complement">Vue.js</b> y la librería de <b class = "complement">React.js</b><br/>
  <b>Otras habilidades:</b> Análisis de software, instalación y configuración de servidores, subneteo de redes.`,
];

const lastAnswer = [
  `Estaré encantado de responderla <br/>
<b>Correo:</b> steven10martinez@gmail.com <br/>
<b>Teléfono:</b> +506 89083111`,
  `I will be glad to answer it <br/>
  <b>Email:</b> steven10martinez@gmail.com <br/>
  <b>Phone:</b> +506 89083111`,
];
// lang 0 spanish -- lang 1 english
let lang = 0;
let optionButtons = null;

function language(value) {
  if (value === "English") {
    document.getElementById("english").style.display = "block";
    lang = 1;
    optionButtons = document.getElementsByClassName("optionEn");
  } else {
    document.getElementById("spanish").style.display = "block";
    optionButtons = document.getElementsByClassName("optionEs");
  }
  let buttons = document.getElementsByClassName("buttonLanguage");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove("animate__fadeInUp");
    buttons[i].classList.add("animate__fadeOutDown");
    deleteOption(buttons[i]);
  }

  addListeners();
}

// True = question -- false = answer
function botText(message, aux) {
  let textBox = document.getElementById("textBox");
  let node = document.createElement("div");
  if (aux) {
    node.classList.add("question");
    node.classList.add("animate__animated");
    node.classList.add("animate__fadeInLeft");

    addMessage(message, 100, node, textBox);
  } else {
    node.classList.add("answer");
    node.classList.add("animate__animated");
    node.classList.add("animate__fadeInRight");
    addMessage(message, 1000, node, textBox);
  }
}

function disabling(disable) {
  if (disable === true) {
    for (let i = 0; i < optionButtons.length; i++) {
      optionButtons[i].disabled = true;
    }
  } else {
    setTimeout(() => {
      for (let i = 0; i < optionButtons.length; i++) {
        console.log(i);
        optionButtons[i].disabled = false;
      }
    }, 1000);
  }
}

function lastQuestion() {
  if (optionButtons.length === 1) {
    let lastQuestion = null;
    if (lang === 0) {
      lastQuestion = document.getElementById("lastQuestionEs");
    } else {
      lastQuestion = document.getElementById("lastQuestion");
    }
    lastQuestion.disabled = true;
    lastQuestion.style.display = "inline-block";
    setTimeout(() => {
      lastQuestion.disabled = false;
    }, 1000);
    lastQuestion.addEventListener("click", (event) => {
      event.target.disabled = true;
      botText(event.target.innerHTML, true);
      event.target.classList.remove("animate__fadeInRight");
      event.target.classList.add("animate__fadeOutRight");
      botText(lastAnswer[lang], false);
      deleteOption(event.target);
    });
  }
}

function addListeners() {
  for (let i = 0; i < optionButtons.length; i++) {
    optionButtons[i].addEventListener("click", (event) => {
      let target = event.target;
      target.disabled = true;

      botText(target.innerHTML, true);

      let index = compare(target);
      disabling(true);
      if (lang === 0) {
        botText(answerEs[index], false);
        answerEs.splice(index, 1);
      } else {
        botText(answer[index], false);
        answer.splice(index, 1);
      }

      deleteOption(target, false);
      disabling(false);

      lastQuestion();
    });
  }
}

function compare(target) {
  for (let i = 0; i < optionButtons.length; i++) {
    if (optionButtons[i].innerHTML === target.innerHTML) {
      optionButtons[i].classList.remove("animate__fadeInRight");
      optionButtons[i].classList.add("animate__fadeOutRight");
      return i;
    }
  }
}

function deleteOption(target, alone = true) {
  if (alone) {
    setTimeout(() => {
      target.parentNode.removeChild(target);
    }, 1000);
  } else {
    setTimeout(() => {
      let parent = target.parentNode;
      target.parentNode.removeChild(target);
      parent.parentNode.removeChild(parent);
    }, 1000);
  }
}

const setScrollPosition = () => {
  let bot = document.getElementById("bot");
  if (bot.scrollHeight > 0) {
    bot.scrollTop = bot.scrollHeight;
  }
};

function addMessage(message, time, node, textBox) {
  setTimeout(() => {
    let paragrahp = document.createElement("p");
    paragrahp.innerHTML = message;
    paragrahp.style.margin = "0px";
    paragrahp.style.wordBreak = "break-word";
    node.append(paragrahp);
    textBox.append(node);
    setScrollPosition();
  }, time);
}
