import getContractDetail from "../getContractDetail";

jest.mock("web3", () => ({
  utils: {
    fromWei: jest.fn(),
  },
}));

describe("getContractDetail", () => {
  it("should get detail from roundData", () => {
    const methods = {
      groupSize: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve(3)),
      }),
      addressOrderList: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve("xxxxx")),
      }),
      turn: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve(1)),
      }),
      totalSaveAmount: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve()),
      }),
      totalCashIn: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve()),
      }),
      stage: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve(0)),
      }),
      payTime: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve()),
      }),
      startTime: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve()),
      }),
      withdrawTime: () => ({
        call: jest.fn().mockImplementation(() => Promise.resolve()),
      }),
    };

    return getContractDetail(methods).then((data) => {
      const expected = {
        address: "0x16B4...7E66",
        groupSize: 3,
        roundStage: undefined,
        shouldWithDraw: "Invalid Date",
        totalCashIn: "undefined AVAX",
        totalSaveAmount: "undefined AVAX",
        turn: 1,
        usersLatePayments: [
          { address: "xxxxx", latePayments: NaN },
          { address: "xxxxx", latePayments: NaN },
          { address: "xxxxx", latePayments: NaN },
        ],
        whoWithdrawPay: "xxxxx",
      };
      expect(data).toStrictEqual(expected);
    });
  });
});
