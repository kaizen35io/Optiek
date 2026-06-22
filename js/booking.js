// ===== BOOKING WIZARD =====
document.addEventListener('DOMContentLoaded', function() {
  const steps = document.querySelectorAll('.wizard-step');
  const panels = document.querySelectorAll('.step-panel');
  const prevBtn = document.getElementById('prevStep');
  const nextBtn = document.getElementById('nextStep');
  let currentStep = 1;
  const totalSteps = 5;

  // State
  const state = {
    location: '',
    date: '',
    time: '',
    services: [],
    name: '',
    phone: '',
    email: '',
    notes: ''
  };

  // ===== LOCATION SELECTION =====
  document.querySelectorAll('.location-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      document.querySelectorAll('.location-btn').forEach(b => b.classList.remove('selected'));
      this.classList.add('selected');
      state.location = this.dataset.location;
      updateSummary();
    });
  });

  // ===== CALENDAR =====
  const calendarGrid = document.getElementById('calendarGrid');
  const timeGrid = document.getElementById('timeGrid');

  function generateCalendar() {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - today.getDay() + 1);

    calendarGrid.innerHTML = '';

    // Day headers
    days.forEach(day => {
      const div = document.createElement('div');
      div.style.cssText = 'text-align:center; font-size:0.7rem; color:var(--text-muted); text-transform:uppercase; padding:0.3rem;';
      div.textContent = day;
      calendarGrid.appendChild(div);
    });

    // Generate 4 weeks
    for (let i = 0; i < 28; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);

      const div = document.createElement('div');
      div.className = 'calendar-day';

      const dayNum = document.createElement('div');
      dayNum.className = 'day-num';
      dayNum.textContent = date.getDate();

      const dayLabel = document.createElement('div');
      dayLabel.className = 'day-label';
      dayLabel.textContent = days[date.getDay() - 1] || '';

      div.appendChild(dayNum);
      div.appendChild(dayLabel);

      // Check if it's a weekend or past date
      const isWeekend = date.getDay() === 0 || date.getDay() === 6;
      const isPast = date < new Date(new Date().setHours(0,0,0,0));

      if (isWeekend || isPast) {
        div.classList.add('empty');
        div.style.cursor = 'default';
      } else {
        const avail = document.createElement('div');
        avail.className = 'avail';
        avail.textContent = '✓ Available';
        div.appendChild(avail);

        div.addEventListener('click', function() {
          document.querySelectorAll('.calendar-day').forEach(d => d.classList.remove('selected'));
          this.classList.add('selected');
          state.date = date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
          });
          updateSummary();
          generateTimeSlots();
        });
      }

      calendarGrid.appendChild(div);
    }
  }

  // ===== TIME SLOTS =====
  function generateTimeSlots() {
    const slots = [
      '8:00', '8:30', '9:00', '9:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
    ];

    timeGrid.innerHTML = '';

    slots.forEach(slot => {
      const btn = document.createElement('button');
      btn.className = 'time-btn';
      btn.textContent = slot;

      // Randomly mark some as booked
      if (Math.random() > 0.6) {
        btn.classList.add('booked');
      }

      btn.addEventListener('click', function() {
        if (this.classList.contains('booked')) return;
        document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('selected'));
        this.classList.add('selected');
        state.time = this.textContent;
        updateSummary();
      });

      timeGrid.appendChild(btn);
    });
  }

  // ===== SERVICES =====
  document.querySelectorAll('.service-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      this.classList.toggle('selected');
      const service = this.dataset.service;
      if (this.classList.contains('selected')) {
        state.services.push(service);
      } else {
        state.services = state.services.filter(s => s !== service);
      }
      updateSummary();
    });
  });

  // ===== PERSONAL DETAILS =====
  const nameInput = document.getElementById('fullName');
  const phoneInput = document.getElementById('phoneNumber');
  const emailInput = document.getElementById('email');
  const notesInput = document.getElementById('notes');

  [nameInput, phoneInput, emailInput, notesInput].forEach(input => {
    input.addEventListener('input', function() {
      state.name = nameInput.value;
      state.phone = phoneInput.value;
      state.email = emailInput.value;
      state.notes = notesInput.value;
      updateSummary();
    });
  });

  // ===== SUMMARY =====
  function updateSummary() {
    const box = document.getElementById('summaryBox');
    let html = `
      <div class="item"><span class="key">Location</span><span class="value">${state.location || 'Not selected'}</span></div>
      <div class="item"><span class="key">Date</span><span class="value">${state.date || 'Not selected'}</span></div>
      <div class="item"><span class="key">Time</span><span class="value">${state.time || 'Not selected'}</span></div>
      <div class="item"><span class="key">Services</span><span class="value">${state.services.length ? state.services.join(', ') : 'None selected'}</span></div>
      <div class="item"><span class="key">Name</span><span class="value">${state.name || 'Not provided'}</span></div>
      <div class="item"><span class="key">Phone</span><span class="value">${state.phone || 'Not provided'}</span></div>
    `;
    if (state.notes) {
      html += `<div class="item"><span class="key">Notes</span><span class="value">${state.notes}</span></div>`;
    }
    box.innerHTML = html;
  }

  // ===== WHATSAPP CONFIRMATION =====
  document.getElementById('whatsappConfirm').addEventListener('click', function() {
    const phone = '+5971234567'; // Replace with actual number
    const message = `Booking Request:
    Location: ${state.location}
    Date: ${state.date}
    Time: ${state.time}
    Services: ${state.services.join(', ')}
    Name: ${state.name}
    Phone: ${state.phone}
    Email: ${state.email || 'Not provided'}
    Notes: ${state.notes || 'None'}`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });

  // ===== WIZARD NAVIGATION =====
  function goToStep(step) {
    currentStep = step;

    // Update steps
    steps.forEach((s, index) => {
      const num = index + 1;
      s.classList.remove('active', 'completed');
      if (num === currentStep) s.classList.add('active');
      else if (num < currentStep) s.classList.add('completed');
    });

    // Update panels
    panels.forEach(p => {
      p.classList.remove('active');
      if (parseInt(p.dataset.step) === currentStep) p.classList.add('active');
    });

    // Update buttons
    prevBtn.disabled = currentStep === 1;
    if (currentStep === totalSteps) {
      nextBtn.textContent = 'Complete';
      nextBtn.style.display = 'none';
    } else {
      nextBtn.textContent = 'Next';
      nextBtn.style.display = 'inline-flex';
    }
  }

  prevBtn.addEventListener('click', () => {
    if (currentStep > 1) goToStep(currentStep - 1);
  });

  nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps) {
      // Simple validation
      if (currentStep === 1 && !state.location) {
        alert('Please select a location.');
        return;
      }
      if (currentStep === 2 && (!state.date || !state.time)) {
        alert('Please select a date and time.');
        return;
      }
      if (currentStep === 3 && state.services.length === 0) {
        alert('Please select at least one service.');
        return;
      }
      if (currentStep === 4 && (!state.name || !state.phone)) {
        alert('Please enter your name and phone number.');
        return;
      }
      goToStep(currentStep + 1);
    }
  });

  // Click on step to navigate
  steps.forEach((s, index) => {
    s.addEventListener('click', () => {
      const step = index + 1;
      if (step < currentStep) goToStep(step);
    });
  });

  // ===== INIT =====
  generateCalendar();
  generateTimeSlots();
  updateSummary();

  console.log('📅 Optiek Marisa — Booking page loaded');
});
