const Concept = require("../models/Concept");

exports.getAllConceptsByYear = async (req, res) => {
  const { projectId } = req.params;
  const { year } = req.params;

  const rawData = await Concept.find({
    project: projectId,
    year: year.toString(),
  }).populate("subaccount");

  const data = [];
  const subaccounts = [];
  const subaccountIds = [];

  const accounts = [
    "Revenue",
    "COGS",
    "SG&A",
    "Taxes",
    "CapEX",
    "Dividends",
    "Retained Earnings",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  rawData.forEach((el) => {
    if (!subaccountIds.includes(el.subaccount._id)) {
      subaccountIds.push(el.subaccount._id);
      subaccounts.push(el.subaccount);
    }
  });

  accounts.forEach((account) => {
    let accountSubtotals = [];
    let subaccountSubtotals = [];
    let subaccountArray = [];

    months.forEach((month) => {
      let subtotal = rawData
        .filter((el) => el.subaccount.account === account && el.month === month)
        .reduce((accum, curr) => accum + curr.amount, 0);
      accountSubtotals.push(subtotal);
    });

    subaccounts.forEach((subaccount) => {
      months.forEach((month) => {
        let subtotal = rawData
          .filter(
            (el) =>
              el.subaccount.account === account &&
              el.subaccount.name === subaccount.name &&
              el.month === month
          )
          .reduce((accum, curr) => accum + curr.amount, 0);
        subaccountSubtotals.push(subtotal);
        // console.log(subaccountSubtotals);
      });

      if (subaccount.account === account) {
        subaccountArray.push({
          subaccount: subaccount.name,
          values: subaccountSubtotals,
        });
      }
      subaccountSubtotals = [];
    });

    data.push({
      name: account,
      values: accountSubtotals,
      subaccounts: subaccountArray,
    });

    subtotals = [];
  });

  //Aquí tenemos que meterle GROSS PROFIT
  data.splice(2, 0, {
    name: "Gross Profit",
    subaccounts: [],
    values: await sustract(data[0].values, data[1].values),
  });

  //Aquí tenemos que meterle GROSS MARGIN %
  data.splice(3, 0, {
    name: "Gross Margin",
    subaccounts: [],
    values: await margin(data[2].values, data[0].values),
  });

  //Aquí tenemos que meterle EBITDA
  data.splice(5, 0, {
    name: "EBITDA",
    subaccounts: [],
    values: await sustract(data[2].values, data[4].values),
  });
  //Aquí tenemos que meterle EBITDA %
  data.splice(6, 0, {
    name: "EBITDA Margin",
    subaccounts: [],
    values: await margin(data[5].values, data[0].values),
  });

  res.status(200).json({ data });
};

exports.getAllConceptYears = async (req, res) => {
  const years = await Concept.find().distinct(
    "year",
    function (error, results) {
      return results;
    }
  );

  years.sort(function (a, b) {
    return a - b;
  });
  res.status(200).json({ years });
};

function sustract(array1, array2) {
  return array1.map(function (el, ind) {
    return el - array2[ind];
  });
}

const margin = (array1, array2) => {
  return array1.map((el, ind) => {
    if (array2[ind] !== 0) {
      return ((el / array2[ind]) * 100).toFixed(1) + "%";
    } else {
      return "N/A";
    }
  });
};
