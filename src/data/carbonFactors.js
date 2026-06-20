// Transport — kg CO₂ per km
export const TRANSPORT = {
  CAR_PETROL: 0.171,
  CAR_DIESEL: 0.163,
  CAR_EV: 0.079,
  TWO_WHEELER_PETROL: 0.082,
  TWO_WHEELER_EV: 0.025,
  AUTO_RICKSHAW: 0.097,
  BUS: 0.089,
  TRAIN: 0.014,
  METRO: 0.011,
  FLIGHT_DOMESTIC: 0.255,
  FLIGHT_INTERNATIONAL: 0.195,
  TAXI_OLA_UBER: 0.150,
};

// Food — kg CO₂ per kg of food
export const FOOD = {
  BEEF: 27.0,
  LAMB: 39.2,
  PORK: 12.1,
  CHICKEN: 6.9,
  FISH_AVERAGE: 6.1,
  EGGS_DOZEN: 3.4,
  MILK_LITRE: 3.2,
  CHEESE: 13.5,
  RICE: 2.7,
  WHEAT_BREAD: 1.4,
  LENTILS_DAL: 0.9,
  VEGETABLES_AVERAGE: 0.4,
  FRUITS_AVERAGE: 0.5,
  PANEER: 8.5,
  BUTTER: 11.9,
};

// Energy — kg CO₂ per unit
export const ENERGY = {
  ELECTRICITY_KWH: 0.82,
  LPG_KG: 2.98,
  PNG_SCM: 2.04,
  AC_1TON_HOUR: 0.82,
  AC_1_5TON_HOUR: 1.23,
  AC_2TON_HOUR: 1.64,
  WATER_HEATER_HOUR: 1.64,
  WASHING_MACHINE_CYCLE: 0.25,
  DISHWASHER_CYCLE: 0.7,
};

// Shopping — kg CO₂ per item
export const SHOPPING = {
  TSHIRT_COTTON: 8.0,
  JEANS: 33.4,
  SMARTPHONE: 70.0,
  LAPTOP: 316.0,
  PLASTIC_BAG: 0.033,
  PAPER_BAG: 0.08,
  AMAZON_DELIVERY_PACKAGE: 0.5,
};

// Waste — kg CO₂ per kg of waste
export const WASTE = {
  LANDFILL_GENERAL: 0.58,
  RECYCLED: 0.021,
  COMPOSTED: 0.01,
  PLASTIC: 1.7,
};

// Baseline — India national average
export const INDIA_NATIONAL_AVG_KG_PER_DAY = 5.2;
export const GLOBAL_AVG_KG_PER_DAY = 11.5;
