
const chatbotButton = document.getElementById('chatbotButton');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');


const avatarSrc = document.getElementById('chatbotAvatar')?.src || 'aaaaaaaaaaaa.png';

const krishnaProfile = {
    introduction: "Krishna is a passionate software developer and tech enthusiast with expertise in modern web technologies and software engineering. He's dedicated to creating innovative solutions and continuously learning new technologies.",
    
    skills: [
        "Programming Languages: JavaScript, Python, Java, TypeScript",
        "Frontend: React, Vue.js, HTML5, CSS3, Tailwind CSS",
        "Backend: Node.js, Express, RESTful APIs",
        "Databases: MongoDB, PostgreSQL, MySQL",
        "Tools & Technologies: Git, Docker, AWS, CI/CD",
        "Frameworks: Next.js, React Native",
        "Other: WebSocket, GraphQL, Microservices Architecture"
    ],
    
    projects: [
        "Developed interactive web applications with modern UI/UX",
        "Built scalable backend systems and APIs",
        "Created 3D interactive portfolios and immersive experiences",
        "Implemented real-time communication features using WebSockets",
        "Designed and developed full-stack applications"
    ],
    
    experience: "Krishna has experience working on various software development projects, focusing on creating user-friendly applications and robust technical solutions. He's worked on both frontend and backend development, demonstrating versatility in full-stack development.",
    
    education: "Krishna has a strong educational background in computer science and software engineering, with continuous learning through certifications and hands-on project experience.",
    
    achievements: [
        "Successfully developed and deployed multiple web applications",
        "Created innovative 3D interactive experiences",
        "Built real-time communication systems",
        "Contributed to open-source projects",
        "Continuously expanding technical expertise"
    ],
    
    contact: "You can connect with Krishna through his professional profiles, email, or social media links available on this website. Feel free to reach out for collaboration opportunities or inquiries about his work."
};

const responses = {
    greeting: "Hello! I'm Krishna's virtual assistant. I'm here to help you learn about Krishna's professional background, skills, projects, and experience. How can I assist you today?",
    
    redirect: "I'm here specifically to help you learn about Krishna's professional profile - his skills, projects, experience, and achievements. Is there something about Krishna you'd like to know?",
    
    closing: "You're welcome! Feel free to ask if you have any other questions about Krishna's professional background. Have a great day!"
};


function generateResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
   
    if (message.match(/^(hi|hey|hello|greetings|good morning|good afternoon|good evening)/i)) {
        return responses.greeting;
    }
    
  
    if (message.match(/(who is krishna|tell me about krishna|introduce krishna|what does krishna do|who are you)/i)) {
        return krishnaProfile.introduction + " Would you like to know more about his skills, projects, or experience?";
    }
    
    
    if (message.match(/(skill|technology|tech|expertise|proficient|know|language|framework|tool|what can|what does he know)/i)) {
        return "Krishna has expertise in various technologies:\n\n" + 
               krishnaProfile.skills.join("\n") + 
               "\n\nWould you like more details about any specific technology or area?";
    }
    
    
    if (message.match(/(project|work|portfolio|what has he built|what has he created|what has he developed|application|app)/i)) {
        return "Krishna has worked on several projects:\n\n" + 
               krishnaProfile.projects.map((p, i) => `${i + 1}. ${p}`).join("\n") + 
               "\n\nWould you like to know more about any specific project or his work experience?";
    }
    
    if (message.match(/(experience|work experience|background|career|professional|job|position|role)/i)) {
        return krishnaProfile.experience + " Would you like to know more about his specific projects or skills?";
    }
    
    if (message.match(/(education|degree|certification|certificate|qualification|studied|learned|university|college|school)/i)) {
        return krishnaProfile.education + " Would you like to know more about his technical skills or achievements?";
    }
    

    if (message.match(/(achievement|accomplishment|award|recognition|success|milestone)/i)) {
        return "Krishna's achievements include:\n\n" + 
               krishnaProfile.achievements.map((a, i) => `${i + 1}. ${a}`).join("\n") + 
               "\n\nIs there anything specific you'd like to know more about?";
    }
    
  
    if (message.match(/(contact|connect|reach|email|linkedin|social|hire|collaborate|work together|get in touch|how to contact)/i)) {
        return krishnaProfile.contact + " Would you like information about his skills or projects?";
    }
    
    if (message.match(/(help|assist|what can you|what do you|how can you|guide)/i)) {
        return "I can help you learn about Krishna's:\n" +
               "• Skills and technologies\n" +
               "• Projects and work experience\n" +
               "• Education and certifications\n" +
               "• Achievements\n" +
               "• How to contact or connect with him\n\n" +
               "What would you like to know?";
    }
    
   
    if (message.match(/(thanks|thank you|thankyou|appreciate|grateful)/i)) {
        return responses.closing;
    }
    

    if (message.match(/(bye|goodbye|see you|later|farewell|good night)/i)) {
        return "Thank you for visiting! Feel free to return if you have any questions about Krishna's professional profile. Have a wonderful day!";
    }
    
   
    if (message.match(/(javascript|js|react|node|python|java|typescript|vue|mongodb|postgresql|aws|docker)/i)) {
        const tech = message.match(/(javascript|js|react|node|python|java|typescript|vue|mongodb|postgresql|aws|docker)/i)[0];
        return `Yes, Krishna has experience with ${tech}. It's part of his technical skill set. Would you like to know more about his projects using ${tech} or his other skills?`;
    }
    
    
    const profileKeywords = /(krishna|skill|project|experience|work|developer|tech|technology|code|programming|software|application)/i;
    if (profileKeywords.test(message)) {
        return "I'd be happy to help you learn about Krishna's professional background. Could you be more specific? For example, you could ask about his skills, projects, experience, or how to contact him.";
    } else {
        return responses.redirect;
    }
}

function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user' : 'bot'}`;
    
    const avatarImg = document.createElement('img');
    avatarImg.src = isUser ? 'male0001.png' : avatarSrc; // Use custom avatar for bot
    avatarImg.alt = isUser ? 'You' : "Krishna's Virtual Assistant";
    avatarImg.className = 'message-avatar';
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    contentDiv.innerHTML = content.replace(/\n/g, '<br>');
    
    messageDiv.appendChild(avatarImg);
    messageDiv.appendChild(contentDiv);
    
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    
    const avatarImg = document.createElement('img');
    avatarImg.src = avatarSrc;
    avatarImg.alt = "Krishna's Virtual Assistant";
    avatarImg.className = 'message-avatar';
    
    const typingContent = document.createElement('div');
    typingContent.className = 'typing-indicator';
    typingContent.innerHTML = '<span></span><span></span><span></span>';
    
    typingDiv.appendChild(avatarImg);
    typingDiv.appendChild(typingContent);
    
    chatbotMessages.appendChild(typingDiv);
    scrollToBottom();
}

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatbotInput.value = '';
    
    showTypingIndicator();
  
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(message);
        addMessage(response);
    }, 1000 + Math.random() * 1000);
}

let welcomeShown = false;

chatbotButton.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
    if (chatbotWindow.classList.contains('active')) {
        chatbotInput.focus();
        
        if (!welcomeShown && chatbotMessages.children.length === 0) {
            setTimeout(() => {
                addMessage(responses.greeting);
                welcomeShown = true;
            }, 300);
        }
        scrollToBottom();
    }
});

chatbotClose.addEventListener('click', () => {
    chatbotWindow.classList.remove('active');
});

chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

chatbotSend.addEventListener('click', sendMessage);

document.addEventListener('click', (e) => {
    if (chatbotWindow.classList.contains('active') && 
        !chatbotWindow.contains(e.target) && 
        !chatbotButton.contains(e.target)) {
    }
});



