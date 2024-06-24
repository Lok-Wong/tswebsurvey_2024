let requestCounter = {};
let resetTimer;
const time = 60* 1000; // 60 seconds
const requestLimit = 10; // 5 requests per 5 seconds

// Function to reset request counts
const resetCounters = () => {
  requestCounter = {};
  clearTimeout(resetTimer);
  resetTimer = setTimeout(resetCounters, time);
};
resetCounters(); // Start the timer

export default async function rateLimit(req, res) {
  const ip = (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0];
  const clientIp = ({ ip }).ip;

  requestCounter[clientIp] = requestCounter[clientIp] || 0;

  if (requestCounter[clientIp] >= requestLimit) {
    return true; // Rate limit exceeded 
  } else {
    return null; // Proceed with the request 
  }
}