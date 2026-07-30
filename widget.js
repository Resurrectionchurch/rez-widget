(function(){
  const CONFIG = {
    churchName: "Resurrection Church",
    scheduleShort: "Sundays: 10:00 AM (English) & 11:30 AM (Spanish)",
    venue: "Katy High School — 6331 Hwy Blvd, Katy, TX 77494",
    officeAddress: "722 Pin Oak Rd. Suite 206, Katy, TX 77494",
    phone: "(281) 407-8716",
    phoneHref: "+12814078716",
    email: "contact@resurrectionkaty.org",
    mapUrl: "http://maps.google.com/maps?q=6331+Hwy+Blvd,+Katy,+TX+US+77494",
    newHereUrl: "https://resurrectionkaty.org/start-here/im-new/",
    contactUrl: "https://resurrectionkaty.org/about-us/contact-us/",
    eventsUrl: "https://resurrectionkaty.org/resources/events/",
    giveUrl: "https://resurrectionkaty.org/give",
    membershipUrl: "https://resurrectionkaty.org/request-membership/",
  };

  const root = document.getElementById('rc-chat-root');
  if(!root) return;

  root.innerHTML = `
    <button class="rc-launcher" id="rcLauncher" aria-label="Open ${CONFIG.churchName} assistant">
      <span class="rc-dot"></span>
      <svg viewBox="0 0 24 24" fill="none"><path d="M12 2L13.8 8.2L20 10L13.8 11.8L12 18L10.2 11.8L4 10L10.2 8.2L12 2Z" fill="#FBF6EC"/></svg>
    </button>

    <div class="rc-panel" id="rcPanel" role="dialog" aria-label="Chat with ${CONFIG.churchName}">
      <div class="rc-header">
        <button class="rc-close" id="rcClose" aria-label="Close">&times;</button>
        <div class="rc-header-top">
          <div class="rc-avatar" id="rcAvatar">
            <svg class="rc-face" viewBox="0 0 100 100">
              <ellipse class="rc-face-cheek" cx="22" cy="60" rx="9" ry="6"/>
              <ellipse class="rc-face-cheek" cx="78" cy="60" rx="9" ry="6"/>
              <ellipse class="rc-face-eye rc-eye-l" cx="35" cy="42" rx="5.5" ry="7.5"/>
              <ellipse class="rc-face-eye rc-eye-r" cx="65" cy="42" rx="5.5" ry="7.5"/>
              <ellipse class="rc-face-mouth" id="rcMouth" cx="50" cy="66" rx="11" ry="3"/>
            </svg>
          </div>
          <div>
            <h3>${CONFIG.churchName}</h3>
            <p><span class="rc-online"></span> Virtual assistant · replies instantly</p>
          </div>
        </div>
      </div>
      <div class="rc-body" id="rcBody"></div>
      <div class="rc-footer">
        <input type="text" id="rcInput" placeholder="Type your question..." />
        <button id="rcSend" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M3 12L21 4L13 21L11 13L3 12Z" fill="white"/></svg>
        </button>
      </div>
    </div>
  `;

  const panel = document.getElementById('rcPanel');
  const body = document.getElementById('rcBody');
  const launcher = document.getElementById('rcLauncher');

  launcher.addEventListener('click', () => {
    panel.classList.toggle('rc-open');
    if (panel.classList.contains('rc-open') && body.children.length === 0) greet();
  });
  document.getElementById('rcClose').addEventListener('click', () => panel.classList.remove('rc-open'));

  // ---------- Animated avatar: blinking is automatic (CSS); this drives the "talking" mouth ----------
  const avatarEl = document.getElementById('rcAvatar');
  const mouthEl = document.getElementById('rcMouth');
  let talkTimer = null;

  function speakAvatar(text){
    if(talkTimer) clearInterval(talkTimer);
    const duration = Math.min(3200, Math.max(500, text.replace(/<[^>]*>/g,'').length * 35));
    avatarEl.classList.add('rc-talking');
    let open = false;
    talkTimer = setInterval(() => {
      open = !open;
      mouthEl.classList.toggle('rc-mouth-open', open);
    }, 110);
    setTimeout(() => {
      clearInterval(talkTimer);
      mouthEl.classList.remove('rc-mouth-open');
      avatarEl.classList.remove('rc-talking');
    }, duration);
  }

  function addMsg(html, who){
    const div = document.createElement('div');
    div.className = 'rc-msg ' + who;
    div.innerHTML = html;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
    if(who === 'bot') speakAvatar(html);
    return div;
  }

  function addQuick(options){
    const wrap = document.createElement('div');
    wrap.className = 'rc-quick';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'rc-chip';
      btn.textContent = opt.label;
      btn.onclick = () => { addMsg(opt.label, 'user'); opt.action(); };
      wrap.appendChild(btn);
    });
    body.appendChild(wrap);
    body.scrollTop = body.scrollHeight;
  }

  function greet(){
    addMsg(`Welcome to <strong>${CONFIG.churchName}</strong>! 🙏 I'm the site's virtual assistant. What can I help you with?`, 'bot');
    mainMenu();
  }

  function mainMenu(){
    addQuick([
      { label: '🕊️ Service times', action: showSchedule },
      { label: '📍 Location & directions', action: showAddress },
      { label: "👋 I'm new — plan a visit", action: () => startLeadForm('First-time visit') },
      { label: '🙏 Prayer request', action: () => startLeadForm('Prayer request') },
      { label: '📅 Talk to our team', action: showContact },
      { label: '📅 Upcoming events', action: showEvents },
      { label: '💛 Give', action: showGive },
    ]);
  }

  function showSchedule(){
    addMsg(`<strong>${CONFIG.scheduleShort}</strong><br>📍 ${CONFIG.venue}<br>We'd love to worship with you!`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function showAddress(){
    addMsg(`Sunday worship is held at:<br><strong>${CONFIG.venue}</strong><br><a href="${CONFIG.mapUrl}" target="_blank" rel="noopener">Open in Google Maps</a><br><br>Church office: ${CONFIG.officeAddress}<br>Phone: <a href="tel:${CONFIG.phoneHref}">${CONFIG.phone}</a>`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function showContact(){
    addMsg(`You can reach our team directly:<br>📞 <a href="tel:${CONFIG.phoneHref}">${CONFIG.phone}</a><br>✉️ <a href="mailto:${CONFIG.email}">${CONFIG.email}</a><br>Or use our <a href="${CONFIG.contactUrl}" target="_blank" rel="noopener">Contact Us page</a> and someone will follow up soon.`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function showEvents(){
    addMsg(`See everything happening this month on our <a href="${CONFIG.eventsUrl}" target="_blank" rel="noopener">Events page</a>.`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function showGive(){
    addMsg(`Thank you for your generosity! You can give securely here: <a href="${CONFIG.giveUrl}" target="_blank" rel="noopener">resurrectionkaty.org/give</a>`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function startLeadForm(reason){
    addMsg(`Happy to help with "<strong>${reason}</strong>." Leave your info below and someone from ${CONFIG.churchName} will reach out:`, 'bot');
    const div = document.createElement('div');
    div.className = 'rc-form';
    div.innerHTML = `
      <input type="text" placeholder="Your name" id="rcName" />
      <input type="email" placeholder="Your email" id="rcEmail" />
      <input type="tel" placeholder="Your phone (optional)" id="rcPhone" />
      <textarea placeholder="Anything you'd like us to know? (optional)" id="rcNote" rows="2"></textarea>
      <button id="rcSubmit">Send</button>
      <small>Tapping "Send" opens your email app with a message already filled in — just hit send there.</small>
    `;
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;

    div.querySelector('#rcSubmit').addEventListener('click', () => {
      const name = div.querySelector('#rcName').value.trim();
      const email = div.querySelector('#rcEmail').value.trim();
      const phone = div.querySelector('#rcPhone').value.trim();
      const note = div.querySelector('#rcNote').value.trim();
      if(!name){ alert('Please enter your name.'); return; }

      sendLead({ name, email, phone, note, reason });

      div.remove();
      addMsg(`Thank you, ${name}! 🙌 Your "${reason}" request is ready to send — please confirm it in your email app. We'll follow up soon.`, 'bot');
      addQuick([{ label: '⬅️ More options', action: mainMenu }]);
    });
  }

  function sendLead({name, email, phone, note, reason}){
    const subject = encodeURIComponent(`[Website chat] ${reason} — ${name}`);
    const bodyText = encodeURIComponent(
      `Reason: ${reason}\nName: ${name}\nEmail: ${email || '(not provided)'}\nPhone: ${phone || '(not provided)'}\nNote: ${note || '(none)'}\n\nSent from the resurrectionkaty.org chat widget.`
    );
    window.open(`mailto:${CONFIG.email}?subject=${subject}&body=${bodyText}`, '_blank');

    /* OPTIONAL UPGRADE — send silently to your inbox via Formspree (still free):
       1. Create a free account at https://formspree.io using contact@resurrectionkaty.org
       2. Create a form, copy its endpoint (looks like https://formspree.io/f/xxxxxxxx)
       3. Comment out the window.open(...) line above and uncomment this:

    fetch('https://formspree.io/f/xxxxxxxx', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({ name, email, phone, note, reason, source: 'resurrectionkaty.org chat widget' })
    });
    */
  }

  function handleFreeText(text){
    const t = text.toLowerCase();
    if(t.includes('time') || t.includes('schedule') || t.includes('service') || t.includes('worship') || t.includes('hora')) return showSchedule();
    if(t.includes('where') || t.includes('address') || t.includes('location') || t.includes('direcc')) return showAddress();
    if(t.includes('pray') || t.includes('oraci')) return startLeadForm('Prayer request');
    if(t.includes('new') || t.includes('visit') || t.includes('join') || t.includes('nuevo')) return startLeadForm('First-time visit');
    if(t.includes('event')) return showEvents();
    if(t.includes('give') || t.includes('donat') || t.includes('tithe')) return showGive();
    if(t.includes('contact') || t.includes('pastor') || t.includes('call') || t.includes('meeting')) return showContact();
    addMsg(`Thanks for your message. I don't have an automatic answer for that, but I can connect you with our team:`, 'bot');
    startLeadForm(`General question: "${text}"`);
  }

  document.getElementById('rcSend').addEventListener('click', sendUserText);
  document.getElementById('rcInput').addEventListener('keydown', e => { if(e.key === 'Enter') sendUserText(); });

  function sendUserText(){
    const input = document.getElementById('rcInput');
    const text = input.value.trim();
    if(!text) return;
    addMsg(text, 'user');
    input.value = '';
    setTimeout(() => handleFreeText(text), 300);
  }
})();
