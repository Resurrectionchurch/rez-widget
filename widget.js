(function(){
  // Inject the stylesheet + font ourselves — avoids CMS editors stripping <link> tags from body content
  if(!document.getElementById('rc-widget-css')){
    const cssLink = document.createElement('link');
    cssLink.id = 'rc-widget-css';
    cssLink.rel = 'stylesheet';
    cssLink.href = 'https://resurrectionchurch.github.io/rez-widget/widget.css';
    document.head.appendChild(cssLink);
  }
  if(!document.getElementById('rc-widget-font')){
    const fontLink = document.createElement('link');
    fontLink.id = 'rc-widget-font';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap';
    document.head.appendChild(fontLink);
  }

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
    sermonsUrl: "https://resurrectionkaty.org/resources/sermons/",
    galleryUrl: "https://resurrectionkaty.org/resources/gallery/",
    podcastUrl: "https://resurrectionkaty.org/resources/audio-podcast/",
    kidsUrl: "https://resurrectionkaty.org/ministries/rez-kids/",
    studentsUrl: "https://resurrectionkaty.org/ministries/resurrection-students/",
    seniorsUrl: "https://resurrectionkaty.org/ministries/resurrectionseniors/",
    missionsUrl: "https://resurrectionkaty.org/ministries/missions/",
    classesUrl: "https://resurrectionkaty.org/ministries/classes/",
    lifeGroupUrl: "https://resurrectionkaty.org/life-group/",
    storeUrl: "https://resurrectionkaty.qbstores.com/",
    espanolUrl: "https://resurrectionkaty.org/espanol/",
    whoWeAreUrl: "https://resurrectionkaty.org/about-us/who-we-are/",
    whatWeBelieveUrl: "https://resurrectionkaty.org/about-us/what-we-believe/",
    teamUrl: "https://resurrectionkaty.org/about-us/our-team/",
    seniorPastorName: "Rev. Howard Huhn",
    seniorPastorEmail: "howard@resurrectionkaty.org",
    spanishPastorName: "Daniel Hernandez",
    spanishPastorEmail: "daniel@resurrectionkaty.org",
    stewards: [
      { name: "Trey Morgan", role: "Chairperson", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710129" },
      { name: "Phillip Reeves", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710459" },
      { name: "Wayne Hooks", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710137" },
      { name: "John Campbell", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710141" },
      { name: "Pat Nichols", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710136" },
      { name: "Heather Doughty", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710462" },
      { name: "Kate Marinacci", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710140" },
      { name: "Arnie England", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710139" },
      { name: "Stephen Maddox", role: "Board of Stewards", url: "https://resurrectionkaty.org/about-us/our-team/member-detail/1710460" },
    ],
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
        <input type="text" id="rcInput" placeholder="Type or tap the mic to speak..." />
        <button id="rcMic" aria-label="Speak" title="Speak your question">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" stroke="white" stroke-width="1.8"/><path d="M19 11a7 7 0 0 1-14 0M12 18v4" stroke="white" stroke-width="1.8" stroke-linecap="round"/></svg>
        </button>
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

  // ---------- Animated avatar + voice output (free, browser-native Web Speech API) ----------
  const avatarEl = document.getElementById('rcAvatar');
  const mouthEl = document.getElementById('rcMouth');
  let talkTimer = null;
  const synth = window.speechSynthesis;

  function speakAvatar(text){
    const plainText = text.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    if(talkTimer) clearInterval(talkTimer);
    let mouthDuration = Math.min(3200, Math.max(500, plainText.length * 35));

    if(synth){
      synth.cancel();
      const utter = new SpeechSynthesisUtterance(plainText);
      utter.rate = 1.0;
      utter.pitch = 1.05;
      avatarEl.classList.add('rc-talking');
      let open = false;
      talkTimer = setInterval(() => { open = !open; mouthEl.classList.toggle('rc-mouth-open', open); }, 110);
      utter.onend = utter.onerror = () => {
        clearInterval(talkTimer);
        mouthEl.classList.remove('rc-mouth-open');
        avatarEl.classList.remove('rc-talking');
      };
      synth.speak(utter);
    } else {
      avatarEl.classList.add('rc-talking');
      let open = false;
      talkTimer = setInterval(() => { open = !open; mouthEl.classList.toggle('rc-mouth-open', open); }, 110);
      setTimeout(() => {
        clearInterval(talkTimer);
        mouthEl.classList.remove('rc-mouth-open');
        avatarEl.classList.remove('rc-talking');
      }, mouthDuration);
    }
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
      { label: '⛪ Meet our pastors', action: showStaff },
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
  }

  function showSermons(){
    addMsg(`Watch or listen to recent messages on our <a href="${CONFIG.sermonsUrl}" target="_blank" rel="noopener">Sermons page</a>, or catch the <a href="${CONFIG.podcastUrl}" target="_blank" rel="noopener">Audio Podcast</a>.`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function showMinistries(){
    addMsg(`We have ministries for every stage of life:<br>👶 <a href="${CONFIG.kidsUrl}" target="_blank" rel="noopener">Rez Kids</a><br>🧑 <a href="${CONFIG.studentsUrl}" target="_blank" rel="noopener">Students</a><br>🌿 <a href="${CONFIG.seniorsUrl}" target="_blank" rel="noopener">Seniors</a><br>🌍 <a href="${CONFIG.missionsUrl}" target="_blank" rel="noopener">Missions</a><br>📖 <a href="${CONFIG.classesUrl}" target="_blank" rel="noopener">Classes</a><br>🤝 <a href="${CONFIG.lifeGroupUrl}" target="_blank" rel="noopener">Life Groups</a>`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function showAbout(){
    addMsg(`Learn more about us:<br><a href="${CONFIG.whoWeAreUrl}" target="_blank" rel="noopener">Who We Are</a><br><a href="${CONFIG.whatWeBelieveUrl}" target="_blank" rel="noopener">What We Believe</a><br><a href="${CONFIG.teamUrl}" target="_blank" rel="noopener">Our Team</a>`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function showStaff(){
    addMsg(`Our pastoral team:<br><br><strong>${CONFIG.seniorPastorName}</strong> — Senior Pastor (English service, Sundays 10:00 AM)<br>✉️ <a href="mailto:${CONFIG.seniorPastorEmail}">${CONFIG.seniorPastorEmail}</a><br><br><strong>${CONFIG.spanishPastorName}</strong> — Pastor, Resurrección Español (Sundays 11:30 AM)<br>✉️ <a href="mailto:${CONFIG.spanishPastorEmail}">${CONFIG.spanishPastorEmail}</a>`, 'bot');
    addQuick([
      { label: '🧑‍🤝‍🧑 See Board of Stewards', action: showStewards },
      { label: '⬅️ More options', action: mainMenu },
    ]);
  }

  function showStewards(){
    const list = CONFIG.stewards.map(s => `• <a href="${s.url}" target="_blank" rel="noopener">${s.name}</a> — ${s.role}`).join('<br>');
    addMsg(`Our Board of Stewards:<br><br>${list}<br><br>Tap a name to see their full profile.`, 'bot');
    addQuick([{ label: '⬅️ More options', action: mainMenu }]);
  }

  function handleFreeText(text){
    const t = text.toLowerCase();
    if(t.includes('time') || t.includes('schedule') || t.includes('service') || t.includes('worship') || t.includes('hora')) return showSchedule();
    if(t.includes('where') || t.includes('address') || t.includes('location') || t.includes('direcc')) return showAddress();
    if(t.includes('pray') || t.includes('oraci')) return startLeadForm('Prayer request');
    if(t.includes('new') || t.includes('visit') || t.includes('join') || t.includes('nuevo')) return startLeadForm('First-time visit');
    if(t.includes('event')) return showEvents();
    if(t.includes('give') || t.includes('donat') || t.includes('tithe')) return showGive();
    if(t.includes('pastor') || t.includes('staff') || t.includes('team') || t.includes('howard') || t.includes('daniel') || t.includes('leadership')) return showStaff();
    if(t.includes('board') || t.includes('steward') || t.includes('trey') || t.includes('chairperson')) return showStewards();
    if(t.includes('contact') || t.includes('call') || t.includes('meeting')) return showContact();
    if(t.includes('sermon') || t.includes('podcast') || t.includes('message') || t.includes('watch')) return showSermons();
    if(t.includes('kid') || t.includes('student') || t.includes('senior') || t.includes('mission') || t.includes('class') || t.includes('ministry') || t.includes('ministries') || t.includes('life group')) return showMinistries();
    if(t.includes('believe') || t.includes('who we are') || t.includes('about')) return showAbout();
    if(t.includes('store') || t.includes('shop')) { addMsg(`Check out our online store: <a href="${CONFIG.storeUrl}" target="_blank" rel="noopener">resurrectionkaty.qbstores.com</a>`, 'bot'); return addQuick([{ label: '⬅️ More options', action: mainMenu }]); }
    if(t.includes('español') || t.includes('espanol') || t.includes('spanish')) { addMsg(`Visita nuestra sección en español: <a href="${CONFIG.espanolUrl}" target="_blank" rel="noopener">resurrectionkaty.org/espanol</a>`, 'bot'); return addQuick([{ label: '⬅️ More options', action: mainMenu }]); }
    addMsg(`Thanks for your message. I don't have an automatic answer for that, but I can connect you with our team:`, 'bot');
    startLeadForm(`General question: "${text}"`);
  }

  document.getElementById('rcSend').addEventListener('click', sendUserText);
  document.getElementById('rcInput').addEventListener('keydown', e => { if(e.key === 'Enter') sendUserText(); });

  // ---------- Voice input (free, browser-native Web Speech API) ----------
  const micBtn = document.getElementById('rcMic');
  const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;
  if(SpeechRecognitionAPI){
    const recognition = new SpeechRecognitionAPI();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    let listening = false;

    micBtn.addEventListener('click', () => {
      if(listening) return;
      listening = true;
      micBtn.classList.add('rc-mic-active');
      recognition.start();
    });

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      document.getElementById('rcInput').value = transcript;
      sendUserText();
    };
    recognition.onend = () => { listening = false; micBtn.classList.remove('rc-mic-active'); };
    recognition.onerror = () => { listening = false; micBtn.classList.remove('rc-mic-active'); };
  } else {
    micBtn.style.display = 'none'; // Voice input not supported in this browser (e.g., Firefox desktop)
  }

  function sendUserText(){
    const input = document.getElementById('rcInput');
    const text = input.value.trim();
    if(!text) return;
    addMsg(text, 'user');
    input.value = '';
    setTimeout(() => handleFreeText(text), 300);
  }
})();
