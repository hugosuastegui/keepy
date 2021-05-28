const Subaccount = require("../models/Subaccount");

exports.getAllSubaccountsCatalogued = async (req, res, next) => {
  const { projectId } = req.params;
  const accounts = [
    "Revenue",
    "COGS",
    "SG&A",
    "Taxes",
    "CapEX",
    "Dividends",
    "Retained Earnings",
  ];

  const revenueSubaccountsRaw = await Subaccount.find(
    {
      project: projectId,
      account: "Revenue",
    },
    { name: 1, _id: 0 }
  );

  const optionFormatter = function (array) {
    const newArr = array.map(({ name: value }) => ({
      value,
      label: value,
    }));
    return newArr;
  };

  const cogsSubaccountsRaw = await Subaccount.find(
    {
      project: projectId,
      account: "COGS",
    },
    { name: 1, _id: 0 }
  );
  const sgaSubaccountsRaw = await Subaccount.find(
    {
      project: projectId,
      account: "SG&A",
    },
    { name: 1, _id: 0 }
  );
  const taxesSubaccountsRaw = await Subaccount.find(
    {
      project: projectId,
      account: "Taxes",
    },
    { name: 1, _id: 0 }
  );
  const capexSubaccountsRaw = await Subaccount.find(
    {
      project: projectId,
      account: "CAPEX",
    },
    { name: 1, _id: 0 }
  );
  const dividendsSubaccountsRaw = await Subaccount.find(
    {
      project: projectId,
      account: "Dividends",
    },
    { name: 1, _id: 0 }
  );
  const retainedEarningsSubaccountsRaw = await Subaccount.find(
    {
      project: projectId,
      account: "Retained Earnings",
    },
    { name: 1, _id: 0 }
  );

  const catSubaccounts = [
    {
      label: "Revenue",
      options: optionFormatter(revenueSubaccountsRaw),
    },
    {
      label: "COGS",
      options: optionFormatter(cogsSubaccountsRaw),
    },
    {
      label: "SG&A",
      options: optionFormatter(sgaSubaccountsRaw),
    },
    {
      label: "Taxes",
      options: optionFormatter(taxesSubaccountsRaw),
    },
    {
      label: "CapEx",
      options: optionFormatter(capexSubaccountsRaw),
    },
    {
      label: "Dividends",
      options: optionFormatter(dividendsSubaccountsRaw),
    },
    {
      label: "Retained Earnings",
      options: optionFormatter(retainedEarningsSubaccountsRaw),
    },
  ];

  res.status(200).json({ catSubaccounts });
};

// const options = [
//   {
//     label: "Colours",
//     options: [
//       { value: "blue", label: "Blue", color: "#0052CC" },
//       { value: "yellow", label: "Yellow", color: "#FFC400" },
//     ],
//   },
//   {
//     label: "Flavours",
//     options: [
//       { value: "vanilla", label: "Vanilla", rating: "safe" },
//       { value: "chocolate", label: "Chocolate", rating: "good" },
//     ],
//   },
// ];
