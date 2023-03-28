import jwt_decode from 'jwt-decode';

export const getBase64 = (file) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = (error) => reject(error);
});

export const handleCopy = (props) => {
  navigator.clipboard.writeText(props);
};

export const scrollToTop = () => {
  const el = document.getElementById('');

  el.scroll({ top: 0, left: 0, behavior: 'smooth' });
};

export const validateJwtToken = (token) => {
  if (!token) return false;
  try {
    const decoded = jwt_decode(token);
    if (decoded.exp * 1000 < Date.now()) return false;
  } catch (error) {
    return false;
  }
  return true;
};