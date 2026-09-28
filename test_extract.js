const extractTargetedData = () => {
  let emails = new Set();
  let phones = new Set();
  let names = new Set();
  let addresses = new Set();

  const extractFromText = (text) => {
    if (typeof text !== 'string') return;
    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
    (text.match(emailRegex) || []).forEach(e => emails.add(e));
    
    const phoneRegex = /(?:\+?91|0)?[6789]\d{9}\b/g;
    (text.match(phoneRegex) || []).forEach(p => {
      let clean = p.replace(/\D/g, '');
      if (clean.length > 10) clean = clean.slice(-10);
      phones.add(clean);
    });
  };

  const searchDeep = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    Object.entries(obj).forEach(([key, value]) => {
      if (typeof value === 'string') {
        const lowerKey = key.toLowerCase();
        
        if (lowerKey.includes('name') && !lowerKey.includes('file') && !lowerKey.includes('theme') && !lowerKey.includes('class')) {
          if (value.length > 1 && value.length < 50 && !value.includes('{')) names.add(value);
        }
        if (lowerKey.includes('address') || lowerKey.includes('city') || lowerKey.includes('location')) {
          if (value.length > 2 && value.length < 150 && !value.includes('{')) addresses.add(value);
        }
        
        extractFromText(value);
        
        if (value.startsWith('{') || value.startsWith('[')) {
          try { searchDeep(JSON.parse(value)); } catch(e){}
        }
      } else if (typeof value === 'object') {
        searchDeep(value);
      }
    });
  };

  try {
    const val = JSON.stringify({ name: 'Rahul Sharma', email: 'rahul.test@example.com', phone: '9876543210', address: 'Mumbai, Maharashtra' });
    extractFromText(val);
    if (val.startsWith('{') || val.startsWith('[')) {
      searchDeep(JSON.parse(val));
    }
  } catch (e) {
    console.log(e);
  }

  return {
    names: [...names],
    phones: [...phones],
    emails: [...emails],
    addresses: [...addresses]
  };
};

console.log(extractTargetedData());
