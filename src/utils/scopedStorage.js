// Utilidades para guardar/leer datos en localStorage, separando lo que
// pertenece a un invitado anonimo de lo que pertenece a una cuenta especifica.

function claveInvitado(nombre) {
  return `yatzari_${nombre}_guest`;
}

function claveCuenta(nombre, clienteId) {
  return `yatzari_${nombre}_cuenta_${clienteId}`;
}

function leer(key, valorPorDefecto) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : valorPorDefecto;
  } catch {
    return valorPorDefecto;
  }
}

function escribir(key, valor) {
  try {
    localStorage.setItem(key, JSON.stringify(valor));
  } catch {
    // localStorage puede fallar (modo incognito, espacio agotado) — se ignora
    // silenciosamente, el estado en memoria de React sigue funcionando igual.
  }
}

export function loadGuest(nombre, valorPorDefecto) {
  return leer(claveInvitado(nombre), valorPorDefecto);
}

export function saveGuest(nombre, valor) {
  escribir(claveInvitado(nombre), valor);
}

export function clearGuest(nombre) {
  try {
    localStorage.removeItem(claveInvitado(nombre));
  } catch {}
}

export function loadAccount(nombre, clienteId, valorPorDefecto) {
  return leer(claveCuenta(nombre, clienteId), valorPorDefecto);
}

export function saveAccount(nombre, clienteId, valor) {
  escribir(claveCuenta(nombre, clienteId), valor);
}