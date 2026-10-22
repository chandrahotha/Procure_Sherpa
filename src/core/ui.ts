/* ==========================================================
   Procurement 360 — UI primitives
   Toast, alert, modal, spinner.
   ========================================================== */
import { PS } from './ps.ts';

PS.toast = function (msg: string, kind?: 'ok' | 'danger' | 'info'): void {
  var container = document.querySelector('.toast-container') as HTMLElement | null;
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var el = document.createElement('div');
  el.className = 'toast' + (kind === 'danger' ? ' is-danger' : kind === 'ok' ? ' is-ok' : '');
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(function () {
    el.classList.add('is-out');
    setTimeout(function () { el.remove(); }, 200);
  }, 3200);
};

PS.alert = function (kind: string, title: string, msg: string): void {
  var container = document.querySelector('.toast-container') as HTMLElement | null;
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  var el = document.createElement('div');
  el.className = 'toast is-danger';
  el.innerHTML = '<strong>' + PS.esc(title) + '</strong><br>' + PS.esc(msg);
  container.appendChild(el);
  setTimeout(function () {
    el.classList.add('is-out');
    setTimeout(function () { el.remove(); }, 200);
  }, 5000);
};

PS.byId = function (id: string): HTMLElement | null {
  return document.getElementById(id);
};
