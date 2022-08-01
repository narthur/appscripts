import {
  getDocumentProperties,
  updateDocumentProperties
} from './lib/properties';

const isAuth = (input: unknown): input is BeeminderAuth => {
  if (input === null) return false;
  return typeof input === 'object' && 'user' in input && 'token' in input;
};

function getAuths(): BeeminderAuth[] {
  const data = getDocumentProperties();
  const raw = data?.auths;

  if (!raw) {
    return [];
  }

  const auths: unknown = JSON.parse(raw);

  if (!Array.isArray(auths)) {
    return [];
  }

  return auths.filter(isAuth);
}

export function processForm(auth: BeeminderAuth): void {
  const auths = getAuths();

  updateDocumentProperties({
    auths: JSON.stringify([...auths, auth])
  });
}
