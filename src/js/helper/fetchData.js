const activeAccount = 12335468324;

const fetchData = async () => {
  try {
    const res = await fetch('../src/js/data/accountsData.json');
    const data = await res.json();

    const acc = data.filter((account) => account.id === activeAccount);

    return acc;
  } catch (error) {
    console.error(
      `Disculpas! algo salió mal. Por favor, intente de nuevo o contacte al admin.`
    );
    console.error(error);
  }
};

export default fetchData;
