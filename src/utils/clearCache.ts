export default function clearCache() {
    localStorage.removeItem('token');
    localStorage.removeItem('month');
    localStorage.removeItem('year');
    localStorage.removeItem('userId');
    localStorage.removeItem('budget');
    localStorage.removeItem('category');
}