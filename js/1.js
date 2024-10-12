document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('ai-assistant-modal');
    const btn = document.getElementById('ai-assistant-btn');
    const span = document.getElementsByClassName('close')[0];
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatContainer = document.getElementById('chat-container');

    // 预设的问答对
    const qaPairs = {
        "你好": "你好！我是小米AI助手，有什么可以帮助您的吗？",
        "你是谁": "我是小米AI助手，一个虚拟助手，随时为您提供帮助和信息。",
        "小米11怎么样": "小米11是我们的旗舰产品，拥有高通骁龙888处理器、108MP主摄像头和2K分辨率屏幕。它的性能和拍照能力都很出色。",
        "红米手机有哪些": "红米系列有多款产品，包括Redmi Note系列、Redmi K系列等。它们都提供了很高的性价比。您对哪个系列更感兴趣呢？",
        "小米笔记本推荐": "小米笔记本有多个系列，比如小米笔记本Pro和RedmiBook。它们都有出色的性能和设计。您更注重轻薄还是性能呢？",
        "智能家居产品": "小米有很多智能家居产品，如小米智能摄像机、小米空气净化器、小米智能插座等。这些产品可以通过小米智能家居app统一控制。",
        "售后服务": "小米提供全面的售后服务，包括7天无理由退货、15天换货、1年保修等。您可以通过小米官网或小米之家门店获得售后服务。",
        "最新优惠活动": "我们经常会有一些优惠活动，建议您关注小米商城首页或下载小米商城App，以获取最新的优惠信息。",
		 "雷军": "我那小米苏七撞死你个逼样的。",
        "default": "抱歉，我没有理解您的问题。您可以尝试问一些关于小米产品、服务或者活动的问题，我会尽力回答。"
    };

    btn.onclick = function() {
        modal.style.display = 'block';
    }

    span.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    sendBtn.onclick = function() {
        sendMessage();
    }

    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (message) {
            addMessageToChat('user', message);
            userInput.value = '';
            
            // 模拟AI思考时间
            setTimeout(() => {
                const reply = getReply(message);
                addMessageToChat('ai', reply);
            }, 1000);
        }
    }

    function getReply(message) {
        // 将用户输入转换为小写，以进行不区分大小写的匹配
        const lowercaseMessage = message.toLowerCase();
        
        // 检查是否有匹配的预设问答
        for (let question in qaPairs) {
            if (lowercaseMessage.includes(question.toLowerCase())) {
                return qaPairs[question];
            }
        }
        
        // 如果没有匹配的问答，返回默认回复
        return qaPairs["default"];
    }

    function addMessageToChat(sender, message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        
        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        avatar.innerText = sender === 'user' ? '用户' : 'AI';
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.innerText = message;
        
        messageElement.appendChild(avatar);
        messageElement.appendChild(messageContent);
        
        chatContainer.appendChild(messageElement);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    // 初始欢迎消息
    addMessageToChat('ai', '您好！我是小米AI助手。有什么我可以帮助您的吗？');
});