https://docs.google.com/spreadsheets/d/e/2PACX-1vSbEaHFAntGn3qGP_rBflV8zUHn37uIMziRrnMNrPFqJzi5GsOeM0ZDyMNh1X1GZPAA5BpH3Xkjyec/pub?gid=0&single=true&output=csv


async function loadSheetData() {
  const response = await fetch(sheetURL);
  const data = await response.text();
  const rows = data.split("\n").slice(1);

  let tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  rows.forEach((row, index) => {
    if(row.trim() !== ""){
      const cols = row.split(",");
      tbody.innerHTML += `
        <tr>
          <td>${index+1}</td>
          <td>${cols[0]}</td>
          <td>${cols[1]}</td>
          <td>${cols[2]}</td>
          <td>${cols[3]}</td>
          <td>${cols[4]}</td>
          <td>${cols[5]}</td>
          <td><strong>${cols[6]}</strong></td>
        </tr>
      `;
    }
  });
}

loadSheetData();

