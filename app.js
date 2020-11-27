var fs = require("fs");
const OrientDBClient = require("orientjs").OrientDBClient;
var data = JSON.parse(fs.readFileSync("db.json", { encoding: "utf-8" }));
(async function () {
  let client;
  try {
    client = await OrientDBClient.connect({
        host: "localhost",
        port: 2424
    });
    // console.log("Connected");
  } catch (e) {
    console.log(e);
  }

  if (client) {
    var session = await client.session({
      name: "hqt",
      username: "root",
      password: "12345678",
    });
    // use the session
    var i = 1;
    let startTime = new Date();
    let query = "INSERT INTO customers set id = :id, firstName = :firstName, lastName = :lastName, phone = :phone, address = :address, postalCode = :postalCode";
    // for(let k = 1; k <= 30; k++) {
        for (let i = 0; i < 100; i++) {
            const index = (k-1)*10000 + i+1;
            // data[i]['id'] = (k-1)*1000 + i+1;
            session.command(query, {params: {
                id: index,
                firstName: data[i]["firstName"],
                lastName: data[i]["lastName"],
                phone: data[i]["phone"],
                address: data[i]["address"],
                postalCode: data[i]["postalCode"]
            },
            {
                id: index,
                firstName: data[i]["firstName"],
                lastName: data[i]["lastName"],
                phone: data[i]["phone"],
                address: data[i]["address"],
                postalCode: data[i]["postalCode"]
            }
        })
            .all()
            .then(result => {
                // console.log(result)
            })
            .catch(e => {
                console.log(e)
            })
            // console.log(data[i])
        }
    //}
    // for(let i=0; i<100; i++){
    //   let query = "INSERT INTO Customer(id, first_name, last_name, city_id) VALUES";
    //   for(let j=1;j<=5000;j++){
    //     let customer = data[i*j % 100];
    //     query = query + `(${i*j}, ${customer.first_name}, ${customer.last_name}, ${customer.city_id}),`
    //   }
    //   let mainQuery = query.slice(0,query.length-1);
    //   await session.command(mainQuery).all();
    // }
    // session.command(query, {params: {id: 1, first_name: 'First', last_name: 'Last', city_id: 1}})
    let endTime = new Date();
    console.log(`Insert successfully in ${(startTime - endTime)/1000}s`);
    // close the session
    await session.close();
    console.log("Finished")
  }
})();