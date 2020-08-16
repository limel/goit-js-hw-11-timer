const refs = {
  days: document.querySelector('span[data-value="days"]'),
  hours: document.querySelector('span[data-value="hours"]'),
  mins: document.querySelector('span[data-value="mins"]'),
  secs: document.querySelector('span[data-value="secs"'),

  btnStart: document.querySelector('.btn[data-active="start"]'),
  btnEnd: document.querySelector('.btn[data-active="stop"]'),
  btnClear: document.querySelector('.btn[data-active="clear"]'),
};

class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.selector = document.querySelector(selector);
    this.targetDate = targetDate;
    this.intervalId = null;
  }

  start() {
    refs.btnStart.setAttribute('disabled', 'disabled');

    const startTime = this.targetDate;

    this.intervalId = setInterval(() => {
      const currnetTime = Date.now();
      const time = startTime - currnetTime;

      this.updateClockface(time, this.intervalId);
    }, 1000);

    // this.stop(intervalId);

    // console.log(intervalId);
  }

  updateClockface(time, intervalId) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.mins.textContent = mins;
    refs.secs.textContent = secs;

    if (time < 0) {
      clearInterval(intervalId);
      this.selector.textContent = 'Time is over!';
    }

    // console.log(intervalId);
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  stop() {
    refs.btnStart.removeAttribute('disabled');
    refs.btnClear.removeAttribute('disabled');
    clearInterval(this.intervalId);
    // console.log(intervalId);
  }
  clear() {
    refs.days.textContent = '00';
    refs.hours.textContent = '00';
    refs.mins.textContent = '00';
    refs.secs.textContent = '00';
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Sep 1, 2020'),
});

refs.btnStart.addEventListener('click', timer.start.bind(timer));
refs.btnEnd.addEventListener('click', timer.stop.bind(timer));
refs.btnClear.addEventListener('click', timer.clear.bind(timer));
