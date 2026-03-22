export interface PresaleInfo {
  name: string;
  priceLabel: string;
  priceNumber: number;
  stockText: string;
}

export function getPresaleInfo(soldCount: number): PresaleInfo {
  if (soldCount < 100) {
    const remaining = 100 - soldCount;
    return {
      name: "PRESALE 1",
      priceLabel: "Rp 80.000",
      priceNumber: 80000,
      stockText: `Sisa ${remaining} tiket`,
    };
  } else if (soldCount < 287) { // 100 + 187
    const remaining = 287 - soldCount;
    return {
      name: "PRESALE 2",
      priceLabel: "Rp 90.000",
      priceNumber: 90000,
      stockText: `Sisa ${remaining} tiket`,
    };
  } else {
    return {
      name: "PRESALE 3",
      priceLabel: "Rp 100.000",
      priceNumber: 100000,
      stockText: "Stok Terbatas",
    };
  }
}
