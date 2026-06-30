

const STORAGE_KEY = 'the-pause-sessions';

export function saveSession(session) {
  try {
    const existing = getSessions();
    existing.push({ ...session, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch (err) {
    console.error('Could not save session to LocalStorage:', err);
  }
}

export function getSessions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Could not read sessions from LocalStorage:', err);
    return [];
  }
}

export function clearSessions() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Could not clear sessions:', err);
  }
}
