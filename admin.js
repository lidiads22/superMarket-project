
function displayOrder() {
    //
  //   const orderRef = db.collection("users").doc(uid).collection("orders");
     const listOrderElement = document.querySelector('.ListOrder');
    //
    //
    // orderRef.get()
    //     .then(querySnapshot => {
  //          listOrderElement.innerHTML = ''; // Clear any existing items
    //
    //         querySnapshot.forEach(doc => {
    //             const item = doc.data();
    //              const itemElement = document.createElement('div');
    //             itemElement.classList.add('item');
    //             itemElement.innerHTML = `
    //             <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
    //             <div style="display: flex; align-items: center; gap: 10px;">
    //
    //               <div>
    //                 <div>${item.createdAt}
    //                      $${item.address}
    //                      ${item.email}</div>
    //               </div>
    //             </div>
    //
    //           </div>`;
    //             listOrderElement.appendChild(itemElement);
    //         });
    //
    //
    //     })
    //     .catch(error => console.error("Error fetching order items: ", error));


   // creates a <table> element and a <tbody> element
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");

    // creating all cells
    for (let i = 0; i < 1; i++) {
        // creates a table row
        const row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            const cell = document.createElement("td");
            const cellText = document.createTextNode(` row ${i}, column ${j}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    document.body.appendChild(tbl);
    // sets the border attribute of tbl to '2'
    tbl.setAttribute("border", "1");

    listOrderElement.innerHTML = `
        <div class="table-responsive">
    <table class="table table-striped table-sm">
        </div>`;
}
displayOrder();