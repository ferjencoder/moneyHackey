const fetchApiDolar = async () => {
  try {
    const q = await fetch('https://api.bluelytics.com.ar/v2/latest');
    console.log(q);
  } catch (error) {
    console.log(error);
  }
};

fetchApiDolar();
