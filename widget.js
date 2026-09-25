<!doctype html>
<html>
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Sam Medical Spa Chat Widget</title>
</head>
<body>

<div id="sam-chat-root">
  <button id="sam-chat-launcher" type="button" aria-label="Open chat" aria-expanded="false">Chat</button>

  <section id="sam-chat-panel" role="dialog" aria-label="Sam Medical Spa chat" aria-hidden="true">
    <header id="sam-chat-header">
      <div class="sam-header-profile">
        <img id="sam-header-avatar" src="" alt="Olivia" class="sam-header-avatar">
        <div class="sam-header-text">
          <strong>Sam Medical Spa</strong>
          <span>Chat with Olivia</span>
        </div>
      </div>
      <button id="sam-chat-close" type="button" aria-label="Close chat">×</button>
    </header>

    <div id="sam-contact-view">
      <div class="sam-intro">
        <strong>Hi, I’m Olivia.</strong>
        <span>Please enter your details to start chatting.</span>
      </div>

      <form id="sam-contact-form">
        <label>Name<input id="sam-name" type="text" autocomplete="name" required></label>
        <label>Email<input id="sam-email" type="email" autocomplete="email" inputmode="email" required></label>
        <label>Phone<input id="sam-phone" type="tel" autocomplete="tel" inputmode="tel" required></label>
        <button id="sam-start-button" type="submit">Start Chat</button>
        <p id="sam-form-error" role="alert"></p>
      </form>
    </div>

    <div id="sam-conversation-view" hidden>
      <div id="sam-messages" aria-live="polite"></div>
      <form id="sam-message-form">
        <input id="sam-message" type="text" placeholder="Type your message..." autocomplete="off" enterkeyhint="send" required>
        <button id="sam-send-button" type="submit">Send</button>
      </form>
    </div>
  </section>
</div>

<style>
#sam-chat-root,
#sam-chat-root * { box-sizing: border-box; }

#sam-chat-root {
  --sam-dark:#111827;
  --sam-text:#111827;
  --sam-muted:#6b7280;
  --sam-border:#e5e7eb;
  --sam-soft:#f8fafc;
  --sam-white:#fff;
  --sam-danger:#b91c1c;
  font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;
  -webkit-font-smoothing:antialiased;
}

#sam-chat-launcher{
  position:fixed; right:24px; bottom:24px; z-index:2147483000;
  width:68px; height:68px; display:flex; align-items:center; justify-content:center;
  border:0; border-radius:999px; padding:0; background:var(--sam-dark); color:#fff;
  font-size:15px; font-weight:700; cursor:pointer;
  box-shadow:0 14px 32px rgba(15,23,42,.22),0 4px 10px rgba(15,23,42,.1);
  transition:transform .18s ease,box-shadow .18s ease,opacity .18s ease;
}
#sam-chat-launcher:hover{transform:translateY(-2px);box-shadow:0 18px 38px rgba(15,23,42,.26),0 5px 12px rgba(15,23,42,.12)}
#sam-chat-launcher:focus-visible{outline:3px solid rgba(17,24,39,.18);outline-offset:4px}

#sam-chat-panel{
  position:fixed; right:24px; bottom:108px; z-index:2147483001;
  width:400px; max-width:calc(100vw - 48px);
  height:min(620px,calc(100dvh - 132px)); max-height:720px;
  display:none; flex-direction:column; overflow:hidden;
  border:1px solid rgba(17,24,39,.08); border-radius:22px; background:#fff;
  box-shadow:0 28px 70px rgba(15,23,42,.20),0 8px 24px rgba(15,23,42,.10);
  transform-origin:bottom right;
}
#sam-chat-panel.is-open{display:flex;animation:samPanelIn .18s ease-out}
@keyframes samPanelIn{from{opacity:0;transform:translateY(10px) scale(.985)}to{opacity:1;transform:translateY(0) scale(1)}}

#sam-contact-view[hidden],#sam-conversation-view[hidden]{display:none!important}

#sam-chat-header{
  min-height:84px; padding:16px 18px; display:flex; align-items:center; justify-content:space-between; gap:14px;
  background:var(--sam-dark); color:#fff; flex-shrink:0;
}
.sam-header-profile{min-width:0;display:flex;align-items:center;gap:12px}
.sam-header-avatar{width:46px;height:46px;border-radius:999px;object-fit:cover;flex-shrink:0;border:2px solid rgba(255,255,255,.28)}
.sam-header-text{min-width:0;display:flex;flex-direction:column;gap:4px}
.sam-header-text strong{overflow:hidden;font-size:16px;font-weight:700;line-height:1.2;text-overflow:ellipsis;white-space:nowrap}
.sam-header-text span{font-size:13px;line-height:1.3;opacity:.8}
#sam-chat-close{
  width:40px;height:40px;display:flex;align-items:center;justify-content:center;padding:0;border:0;border-radius:999px;
  background:transparent;color:#fff;font-size:30px;font-weight:300;line-height:1;cursor:pointer;flex-shrink:0;
}
#sam-chat-close:hover{background:rgba(255,255,255,.10)}

#sam-contact-view{
  flex:1;min-height:0;padding:26px 24px 24px;overflow-y:auto;overscroll-behavior:contain;background:#fff;
}
.sam-intro{display:flex;flex-direction:column;gap:8px;margin-bottom:24px;line-height:1.45}
.sam-intro strong{font-size:20px;font-weight:700;color:var(--sam-text)}
.sam-intro span{font-size:15px;color:var(--sam-muted)}

#sam-contact-form{display:flex;flex-direction:column;gap:16px}
#sam-contact-form label{display:flex;flex-direction:column;gap:8px;font-size:13px;font-weight:700;color:var(--sam-text)}
#sam-contact-form input,#sam-message{
  width:100%;min-width:0;border:1px solid #d1d5db;border-radius:12px;padding:13px 14px;background:#fff;color:var(--sam-text);
  font-family:inherit;font-size:15px;line-height:1.35;outline:none;transition:border-color .16s ease,box-shadow .16s ease;
}
#sam-contact-form input:focus,#sam-message:focus{border-color:var(--sam-dark);box-shadow:0 0 0 3px rgba(17,24,39,.08)}

#sam-start-button,#sam-send-button{
  border:0;border-radius:11px;background:var(--sam-dark);color:#fff;font-family:inherit;font-weight:700;cursor:pointer;
  transition:opacity .16s ease,transform .16s ease;
}
#sam-start-button{min-height:48px;margin-top:2px;padding:0 18px;font-size:14px}
#sam-start-button:hover,#sam-send-button:hover{opacity:.92}
#sam-start-button:active,#sam-send-button:active{transform:translateY(1px)}
#sam-start-button:disabled,#sam-send-button:disabled{opacity:.55;cursor:not-allowed;transform:none}
#sam-form-error{min-height:18px;margin:0;color:var(--sam-danger);font-size:13px;line-height:1.35}

#sam-conversation-view{flex:1;min-height:0;display:flex;flex-direction:column;background:#fff}
#sam-messages{
  flex:1;min-height:0;overflow-y:auto;overscroll-behavior:contain;scroll-behavior:smooth;padding:18px;background:var(--sam-soft);
}
.sam-message-row{width:100%;display:flex;align-items:flex-end;gap:8px;margin:10px 0}
.sam-message-row.user{justify-content:flex-end}
.sam-message-avatar{width:32px;height:32px;border-radius:999px;object-fit:cover;flex:0 0 32px}
.sam-bubble{
  max-width:min(78%,290px);padding:11px 13px;border:1px solid var(--sam-border);border-radius:15px;background:#fff;color:var(--sam-text);
  font-size:14px;line-height:1.45;white-space:pre-wrap;overflow-wrap:anywhere;
}
.sam-message-row.assistant .sam-bubble{border-bottom-left-radius:5px}
.sam-message-row.user .sam-bubble{background:var(--sam-dark);color:#fff;border-color:var(--sam-dark);border-bottom-right-radius:5px}

.sam-typing-bubble{min-width:48px;min-height:40px;display:flex;align-items:center;justify-content:center;gap:5px;padding:11px 13px}
.sam-typing-dot{width:7px;height:7px;display:block;background:#9ca3af;border-radius:999px;animation:samTypingBounce 1.2s infinite ease-in-out}
.sam-typing-dot:nth-child(2){animation-delay:.15s}.sam-typing-dot:nth-child(3){animation-delay:.3s}
@keyframes samTypingBounce{0%,60%,100%{transform:translateY(0);opacity:.4}30%{transform:translateY(-5px);opacity:1}}

#sam-message-form{
  display:grid;grid-template-columns:minmax(0,1fr) auto;gap:10px;padding:14px;border-top:1px solid var(--sam-border);background:#fff;flex-shrink:0;
}
#sam-message{min-height:46px}
#sam-send-button{min-width:82px;min-height:46px;padding:0 17px;font-size:14px}

#sam-contact-view::-webkit-scrollbar,#sam-messages::-webkit-scrollbar{width:6px}
#sam-contact-view::-webkit-scrollbar-thumb,#sam-messages::-webkit-scrollbar-thumb{background:#cbd5e1;border-radius:999px}

/* TABLET */
@media (min-width:768px) and (max-width:1024px){
  #sam-chat-launcher{right:20px;bottom:20px;width:64px;height:64px;font-size:14px}
  #sam-chat-panel{right:20px;bottom:96px;width:420px;max-width:calc(100vw - 40px);height:min(640px,calc(100dvh - 116px));border-radius:20px}
  #sam-chat-header{min-height:82px;padding:15px 18px}
  #sam-contact-view{padding:24px 22px}
  #sam-messages{padding:17px}
  .sam-bubble{max-width:80%}
}

/* MOBILE */
@media (max-width:767px){
  #sam-chat-launcher{
    right:max(14px,env(safe-area-inset-right));bottom:max(14px,env(safe-area-inset-bottom));
    width:60px;height:60px;font-size:13px;
  }
  #sam-chat-panel,#sam-chat-panel.is-open{
    position:fixed;inset:0;width:100vw;max-width:none;height:100dvh;max-height:none;border:0;border-radius:0;box-shadow:none;transform-origin:center;
  }
  #sam-chat-header{
    min-height:74px;padding:calc(12px + env(safe-area-inset-top)) 16px 12px;gap:10px;
  }
  .sam-header-avatar{width:40px;height:40px}
  .sam-header-text strong{font-size:15px}
  .sam-header-text span{font-size:12px}
  #sam-chat-close{width:38px;height:38px;font-size:28px}
  #sam-contact-view{padding:22px 18px calc(22px + env(safe-area-inset-bottom))}
  .sam-intro{margin-bottom:22px}
  .sam-intro strong{font-size:19px}
  .sam-intro span{font-size:15px}
  #sam-contact-form{gap:15px}
  #sam-contact-form input,#sam-message{font-size:16px}
  #sam-messages{padding:14px 12px 16px}
  .sam-message-row{gap:7px;margin:9px 0}
  .sam-message-avatar{width:28px;height:28px;flex-basis:28px}
  .sam-bubble{max-width:84%;padding:10px 12px;font-size:14px;line-height:1.42}
  #sam-message-form{gap:8px;padding:10px 10px calc(10px + env(safe-area-inset-bottom))}
  #sam-message{min-height:46px}
  #sam-send-button{min-width:70px;min-height:46px;padding:0 14px}
  #sam-chat-root.sam-mobile-open #sam-chat-launcher{opacity:0;pointer-events:none}
}

/* SMALL MOBILE */
@media (max-width:380px){
  #sam-contact-view{padding-left:15px;padding-right:15px}
  #sam-messages{padding-left:10px;padding-right:10px}
  .sam-bubble{max-width:86%}
  #sam-send-button{min-width:64px;padding:0 12px}
}

/* SHORT LANDSCAPE */
@media (max-height:560px) and (min-width:768px){
  #sam-chat-panel{bottom:16px;height:calc(100dvh - 32px);max-height:none}
}

@media (prefers-reduced-motion:reduce){
  #sam-chat-panel.is-open,.sam-typing-dot{animation:none}
  #sam-chat-launcher,#sam-start-button,#sam-send-button{transition:none}
}
</style>

<script>
(() => {
  const WEBHOOK_URL = 'https://n8n.srv1013100.hstgr.cloud/webhook/f996854d-ad02-4296-82d1-1cd2c3eef966';
  const STORAGE_KEY = 'sam_medical_spa_chat_contact';
  const AVATAR_URL = 'https://images.leadconnectorhq.com/image/f_webp/q_100/r_180/u_https://assets.cdn.filesafe.space/BHniMVFWKyFHtFuOnSpP/media/6aaec465de8ed1c29f730bf8.png';

  const root = document.getElementById('sam-chat-root');
  const launcher = document.getElementById('sam-chat-launcher');
  const panel = document.getElementById('sam-chat-panel');
  const close = document.getElementById('sam-chat-close');
  const contactView = document.getElementById('sam-contact-view');
  const conversationView = document.getElementById('sam-conversation-view');
  const contactForm = document.getElementById('sam-contact-form');
  const messageForm = document.getElementById('sam-message-form');
  const messages = document.getElementById('sam-messages');
  const messageInput = document.getElementById('sam-message');
  const formError = document.getElementById('sam-form-error');
  const startButton = document.getElementById('sam-start-button');
  const sendButton = document.getElementById('sam-send-button');
  const headerAvatar = document.getElementById('sam-header-avatar');

  let contact = null;

  function isMobile(){
    return window.matchMedia('(max-width: 767px)').matches;
  }

  function setChatOpenState(isOpen){
    panel.classList.toggle('is-open', isOpen);
    panel.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    launcher.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    if(isMobile()) root.classList.toggle('sam-mobile-open', isOpen);
    else root.classList.remove('sam-mobile-open');
  }

  if(headerAvatar) headerAvatar.src = AVATAR_URL;

  const savedContact = sessionStorage.getItem(STORAGE_KEY);
  if(savedContact){
    try { contact = JSON.parse(savedContact); }
    catch { sessionStorage.removeItem(STORAGE_KEY); }
  }

  function openChat(){
    setChatOpenState(true);
    contact ? showConversation() : showContactForm();
  }

  function closeChat(){
    setChatOpenState(false);
    launcher.focus();
  }

  function showContactForm(){
    contactView.hidden = false;
    conversationView.hidden = true;
  }

  function showConversation(){
    contactView.hidden = true;
    conversationView.hidden = false;
    requestAnimationFrame(() => {
      messages.scrollTop = messages.scrollHeight;
      setTimeout(() => messageInput.focus(), 100);
    });
  }

  function addMessage(role,text){
    const row = document.createElement('div');
    const bubble = document.createElement('div');
    row.className = `sam-message-row ${role}`;
    bubble.className = 'sam-bubble';
    bubble.textContent = text;

    if(role === 'assistant'){
      const avatar = document.createElement('img');
      avatar.src = AVATAR_URL;
      avatar.alt = 'Olivia';
      avatar.className = 'sam-message-avatar';
      row.appendChild(avatar);
    }

    row.appendChild(bubble);
    messages.appendChild(row);
    requestAnimationFrame(() => messages.scrollTop = messages.scrollHeight);
  }

  function showTypingIndicator(){
    const row = document.createElement('div');
    const avatar = document.createElement('img');
    const bubble = document.createElement('div');

    row.className = 'sam-message-row assistant sam-typing-row';
    avatar.src = AVATAR_URL;
    avatar.alt = 'Olivia';
    avatar.className = 'sam-message-avatar';
    bubble.className = 'sam-bubble sam-typing-bubble';

    for(let i=0;i<3;i++){
      const dot = document.createElement('span');
      dot.className = 'sam-typing-dot';
      bubble.appendChild(dot);
    }

    row.appendChild(avatar);
    row.appendChild(bubble);
    messages.appendChild(row);
    requestAnimationFrame(() => messages.scrollTop = messages.scrollHeight);
    return row;
  }

  function removeTypingIndicator(row){
    if(row && row.parentNode) row.remove();
  }

  function normalizePhone(value){
    const digits = value.replace(/\D/g,'');
    if(digits.length === 10) return `+1${digits}`;
    if(digits.length === 11 && digits.startsWith('1')) return `+${digits}`;
    return value.trim();
  }

  async function callN8n(message){
    const response = await fetch(WEBHOOK_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({
        name:contact.name,
        email:contact.email.trim().toLowerCase(),
        phone:contact.phone,
        message
      })
    });

    if(!response.ok) throw new Error(`Webhook error ${response.status}`);

    const data = await response.json();
    if(!data || typeof data.reply !== 'string') throw new Error('Invalid chatbot response');
    return data.reply;
  }

  contactForm.addEventListener('submit', async event => {
    event.preventDefault();
    formError.textContent = '';

    const name = document.getElementById('sam-name').value.trim();
    const email = document.getElementById('sam-email').value.trim().toLowerCase();
    const phone = normalizePhone(document.getElementById('sam-phone').value);

    if(!name || !email || !phone){
      formError.textContent = 'Please complete all fields.';
      return;
    }

    contact = {name,email,phone};
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(contact));

    startButton.disabled = true;
    startButton.textContent = 'Starting...';
    showConversation();

    const typingIndicator = showTypingIndicator();

    try{
      const reply = await callN8n('');
      removeTypingIndicator(typingIndicator);
      addMessage('assistant',reply);
    }catch(error){
      removeTypingIndicator(typingIndicator);
      console.error(error);
      contact = null;
      sessionStorage.removeItem(STORAGE_KEY);
      showContactForm();
      formError.textContent = 'Unable to start chat. Please try again.';
    }finally{
      startButton.disabled = false;
      startButton.textContent = 'Start Chat';
    }
  });

  messageForm.addEventListener('submit', async event => {
    event.preventDefault();

    const message = messageInput.value.trim();
    if(!message || !contact) return;

    addMessage('user',message);
    messageInput.value = '';
    sendButton.disabled = true;
    messageInput.disabled = true;

    const typingIndicator = showTypingIndicator();

    try{
      const reply = await callN8n(message);
      removeTypingIndicator(typingIndicator);
      addMessage('assistant',reply);
    }catch(error){
      removeTypingIndicator(typingIndicator);
      console.error(error);
      addMessage('assistant','Sorry, I could not process that message. Please try again.');
    }finally{
      sendButton.disabled = false;
      messageInput.disabled = false;
      if(!isMobile()) messageInput.focus();
    }
  });

  launcher.addEventListener('click',openChat);
  close.addEventListener('click',closeChat);

  document.addEventListener('keydown',event => {
    if(event.key === 'Escape' && panel.classList.contains('is-open')) closeChat();
  });

  window.addEventListener('resize',() => {
    if(panel.classList.contains('is-open')){
      root.classList.toggle('sam-mobile-open',isMobile());
    }
  });

  contact ? showConversation() : showContactForm();
})();
</script>

</body>
</html>
