const btn = document.querySelector('button');
const popover = document.querySelector('.popover');

btn.addEventListener('click', (e) => {
  e.preventDefault();
  popover.classList.toggle('hidden');
  popover.style.top = `${-(popover.offsetHeight + btn.offsetHeight + 25)}px`;
});
