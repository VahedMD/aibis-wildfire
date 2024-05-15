export const tdewpointFromRelhum = (t, h) => {
  //Compute the Dewpoint temperature.
  // t: temperature in C
  // h: relative humidity in %

  const A = 17.67;
  const B = 243.5;

  const alpha = (A * t) / (B + t) + Math.log(h / 100.0);

  return (B * alpha) / (A - alpha);
};

/** ===============
 **  Net Radiation
 *** =============== */
export const extraRadiation = (date, lat) => {
  /**
   * Compute Extraterrestrial radiation [MJ·m-2·d-1].
   * Based on Eq. 21 in Allen et al. 1998.
   * "top of the atmosphere radiation"
   *
   * Parameters:
   * date: array
   *   Date in the format 'YYYYMMDD'.
   * lat: array
   *   Latitude in degrees.
   *
   * Returns:
   * array
   *   Extraterrestrial radiation in [MJ·m-2·d-1].
   */

  // solar constant
  const solCon = 0.082; // [MJ·m-2·min-1]

  // get Julian date: number of the day in the year between 1 (1 January) and 365 or 366 (31 December)
  const dayOfYear = new Date(date).getDate();
  const daysInYear = new Date(date.slice(0, 4), 11, 31).getDate();

  // solar declination δ
  const delta = 0.409 * Math.sin((2 * Math.PI * dayOfYear) / daysInYear - 1.39);

  // convert degrees to radians
  const phi = lat.map((l) => (l * Math.PI) / 180);

  // sunset hour angle [radians]
  // Domain of arccos is -1 <= x <= 1 radians
  const ws = phi.map((p) =>
    Math.acos(Math.min(Math.max(-1 * Math.tan(p) * Math.tan(delta), -1.0), 1.0))
  );

  // inverse relative distance Earth-Sun
  const dr = 1 + 0.033 * Math.cos((dayOfYear * 2 * Math.PI) / daysInYear);

  const tmp1 = (24 * 60) / Math.PI;
  const tmp2 = ws.map((w) => w * Math.sin(phi[0]) * Math.sin(delta));
  const tmp3 = phi.map((p) => Math.cos(p) * Math.cos(delta) * Math.sin(ws[0]));

  return tmp1 * solCon * dr * (tmp2[0] + tmp3[0]);
};

export const solarRadiationFromSunshine = (sunshine, date, lat) => {
  /**
   * Compute daily solar radiation from Sunshine duration using Angstrom formula after
   * Eqs. 34 and 35 in Allen et al. 1998.
   *
   * Parameters:
   * sunshine: array
   *   Daily sunshine duration [h].
   * date: array
   *   Date in the format 'YYYYMMDD'.
   * lat: array
   *   Latitude in degrees.
   *
   * Returns:
   * array
   *   Daily solar radiation in [MJ·m-2·d-1].
   */

  // Calculate maximum potential daylight hour
  const daylighthour = daylighthourFAO(date, lat);
  // calculate extraterrestrial radiation
  const etRad = extraRadiation(date, lat);
  // To Do: solar radiation value is constrained by the clear sky radiation: Math.min(solRad, csRad)

  // 0.5 and 0.25 are default values of regression constants (Angstrom values)
  return (0.25 + (0.5 * sunshine) / daylighthour) * etRad;
};

export const solarRadiationFromTemp = (tmin, tmax, date, lat, krs = 16) => {
  /**
   * Compute daily solar radiation from temperature after
   * Eq. 50 in Allen et al. 1998.
   *
   * Parameters:
   * tmin: array
   *   minimum daily temperature [C].
   * tmax: array
   *   maximum daily temperature [C].
   * date: array
   *   Date in the format 'YYYYMMDD'.
   * lat: array
   *   Latitude in degrees.
   * krs: number
   *   adjustment coefficient [deg C-0.5] for coastal (19) or interior (16) locations
   *
   * Returns:
   * array
   *   Daily solar radiation in [MJ·m-2·d-1].
   */

  // calculate extraterrestrial radiation
  const etRad = extraRadiation(date, lat);

  return etRad * krs * Math.sqrt(tmax - tmin);
};

export const clearskySolarRadiation = (date, lat, altitude) => {
  /**
   * Compute clear-sky solar radiation after Allen et al. 1998.
   *
   * Parameters:
   * date: Array
   *   Date in the format 'YYYYMMDD'.
   * lat: Array
   *   Latitude in degrees.
   * altitude: Number
   *   Altitude of location.
   *
   * Returns:
   * Array
   *   Clear-sky solar radiation in [MJ·m-2·d-1].
   */
  const etRad = extraRadiation(date, lat); // extraterrestrial radiation
  return (0.00002 * altitude + 0.75) * etRad;
};

export const netInSolRad = (solRad, albedo = 0.23) => {
  /**
   * Compute net incoming shortwave solar radiation after Eq. 33 in Allen et al. 1998.
   *
   * Parameters
   * ----------
   * solRad: array
   *   Solar radiation in [MJ·m-2·d-1]. Either calculated from sunshine duration or temperature.
   * albedo: scalar
   *   Proportion of gross incoming solar radiation that is reflected by the surface.
   *   Albedo can be as high as 0.95 for freshly fallen snow and as low as 0.05 for wet bare soil.
   *   A green vegetation over has an albedo of about 0.20-0.25 (Allen et al, 1998).
   *
   * Returns
   * -------
   * array
   *   Net incoming solar radiation in [MJ·m-2·d-1].
   */

  return (1 - albedo) * solRad;
};

export const netOutLwRad = (tmin, tmax, h, date, lat, altitude, krs = 16) => {
  /**
   * Compute net outgoing longwave solar radiation (placeholder for Eq. 39 in Allen et al. 1998).
   *
   * Parameters (placeholders for potential library functions)
   * ----------
   * tmin: array
   *   Minimum daily temperature [C].
   * tmax: array
   *   Maximum daily temperature [C].
   * h: array
   *   Relative humidity [%].
   * date: array
   *   Date in the format 'YYYYMMDD'.
   * lat: array
   *   Latitude in degrees.
   * altitude: scalar
   *   Altitude of location.
   * krs: scalar (default 16)
   *   Adjustment coefficient [deg C-0.5] for coastal (19) or interior locations

   * Returns (placeholder for calculations)
   * -------
   * array
   *   Net outgoing longwave radiation [MJ m-2 day-1].
   */

  // Placeholder for Stefan Boltzmann constant (assuming a similar value)
  const rho = 4.903 * Math.pow(10, -9);

  // Calculations (assuming placeholder functions provide necessary values)
  const es = 0.5 * (satVapourPressure(tmin) + satVapourPressure(tmax)); // saturation vapor pressure
  const ea = (es * h) / 100; // actual vapor pressure
  const solRad = solarRadiationFromTemp(tmin, tmax, date, lat, krs); // Solar radiation
  const csRad = clearskySolarRadiation(date, lat, altitude); // Clear sky radiation

  const tmp1 =
    rho * ((Math.pow(tmax + 273.16, 4) + Math.pow(tmin + 273.16, 4)) / 2);
  const tmp2 = 0.34 - 0.14 * Math.sqrt(ea);
  const tmp3 = 1.35 * Math.min(1, solRad / csRad) - 0.35; // sol_rad is constrained by cs_rad

  // Placeholder for final return value (replace with calculated value)
  return tmp1 * tmp2 * tmp3;
};

export const netRadiation = (
  tmin,
  tmax,
  h,
  date,
  lat,
  altitude,
  solRad,
  krs = 16,
  albedo = 0.23
) => {
  /**
   * Compute daily net radiation [MJ m-2 day-1] based on Eq. 40 in Allen et al (1998).
   * Assumes a grass reference crop at the crop surface.
   *
   * Parameters (placeholders for potential library functions)
   * ----------
   * tmin: array
   *   Minimum daily temperature [C].
   * tmax: array
   *   Maximum daily temperature [C].
   * h: array
   *   Relative humidity [%].
   * date: array
   *   Date in the format 'YYYYMMDD'.
   * lat: array
   *   Latitude in degrees.
   * altitude: scalar
   *   Altitude of location.
   * krs: scalar (default 16)
   *   Adjustment coefficient [deg C-0.5] for coastal (19) or interior locations
   * solRad: array (optional)
   *   Solar radiation in [MJ·m-2·d-1]. Either calculated from sunshine duration or temperature.
   * albedo: scalar (default 0.23)
   *   Proportion of gross incoming solar radiation that is reflected by the surface.
   *   Albedo can be as high as 0.95 for freshly fallen snow and as low as 0.05 for wet bare soil.
   *   A green vegetation over has an albedo of about 0.20-0.25 (Allen et al, 1998).
   *
   * Returns
   * -------
   * array
   *   Net radiation [MJ m-2 day-1].
   */

  // Call previously defined functions (assuming implementations are available)
  const netSwRad = netInSolRad(
    solRad || solarRadiationFromTemp(tmin, tmax, date, lat, krs),
    albedo
  );
  const netLwRad = netOutLwRad(tmin, tmax, h, date, lat, altitude, krs);

  return netSwRad - netLwRad;
};

/** # ===============
# Potential Evapotranspiration
# =============== */

export const satVapourPressure = (t) => {
  /** Compute saturation vapour pressure [kPa].
      Based on equation 11 in Allen et al (1998).
      When using tdew, it calculates the actual vapour pressure.
      For daily mean: use with tmin and tmax: 1/2 * (sat_vapour_pressure(tmin) + sat_vapour_pressure(tmax))
  
  Parameters
  ----------
  t: array
    Temperature [C].

  Returns
  -------
  array
    saturation vapour pressure [kPa].
  */
  return 0.6108 * Math.exp((17.27 * t) / (t + 237.3));
};

export const slopeSatVapourPressure = (t) => {
  /**
   * Compute slope of saturation vapour pressure [kPa/C].
   * Based on equation 13 in Allen et al (1998).
   *
   * Parameters (placeholder for potential library function)
   * ----------
   * t: array
   *   Temperature [C].
   *
   * Returns
   * -------
   * array
   *   Slope of saturation vapour pressure [kPa/C].
   */

  // Calculation (assuming placeholder function provides necessary value)
  const es = satVapourPressure(t);
  return (4098.0 * es) / Math.pow(t + 237.3, 2);
};

export const actualVapourPressure = (t, h) => {
  /**
   * Compute actual vapour pressure [kPa].
   * Based on equation 15 in Allen et al (1998).
   *
   * Parameters (placeholders for potential library functions)
   * ----------
   * t: array
   *   Temperature [C].
   * h: array
   *   Relative humidity [%].
   *
   * Returns
   * -------
   * array
   *   Actual vapour pressure [kPa].
   */

  // Calculation using equation 15
  const es = satVapourPressure(t);
  return (es * h) / 100;

  // **Alternative approach (commented out)**
  // uncomment and implement the following if you prefer the dew point method
  // const tdew = tdewpointFromRelhum(t, h); // Replace with actual dew point function implementation
  // return satVapourPressure(tdew);
};

export const vaporPressureDeficit = (t, h) => {
  /**
   * Compute vapour pressure deficit [kPa].
   * Based on equation 15 in Allen et al (1998).
   *
   * Parameters (placeholders for potential library functions)
   * ----------
   * t: array
   *   Temperature [C].
   * h: array
   *   Relative humidity [%].
   *
   * Returns
   * -------
   * array
   *   Vapour pressure deficit [kPa].
   */

  // Calculation using actual vapor pressure
  const es = satVapourPressure(t);
  const ea = actualVapourPressure(t, h);
  return es - ea;

  // **Alternative form (commented out)**
  // uncomment and use this form if preferred
  // return es * (1 - h / 100);
};

export const daylighthourFAO = (date, lat) => {
  /**
   * Compute daylight hours as maximum possible duration of sunshine for a given day of the year.
   *
   * Parameters
   * ----------
   * date: array
   *   Date in the format 'YYYYMMDD'.
   * lat: array
   *   Latitude in degrees.
   *
   * Returns
   * -------
   * array
   *   daylight hours (duration of sunlight in hours).
   */

  // get Julian date: number of the day in the year between 1 (1 January) and 365 or 366 (31 December).
  let day_of_year = new Date(date).getDate();
  let days_in_year = new Date(date.slice(0, 4), 11, 31).getDate();

  // solar declination δ
  let delta =
    0.409 * Math.sin((2 * Math.PI * day_of_year) / days_in_year - 1.39);
  // convert degrees to radians
  let phi = (Math.PI / 180) * lat;
  // sunset hour angle (rad)
  let ws = Math.acos(-1 * Math.tan(phi) * Math.tan(delta));

  return ws * (24 / Math.PI);
};

export const heatIndex = (tMonth) => {
  /**
   * Compute Heat Index I (for PET Thorntwaite).
   *
   * Parameters
   * ----------
   * tMonth: array
   *   Monthly mean temperature [C]. Sequence of 12 values (for each month of the year from Jan - Dez).
   *
   * Returns
   * -------
   * number
   *   Heat Index.
   */

  // Adjust for negative temperatures (set to zero)
  const adjTMonth = tMonth.map((t) => t * (t >= 0));

  // Calculate heat index
  let I = 0.0;
  for (const t of adjTMonth) {
    if (t / 5.0 > 0.0) {
      I += Math.pow(t / 5.0, 1.514);
    }
  }

  return I;
};

export const potEvapoThorntwaite = (t, dayLightHour, I) => {
  /**
   * Compute potential evapotranspiration after Thorntwaite [mm/day].
   *
   * Parameters
   * ----------
   * t: array
   *   Noon temperature [C].
   * dayLightHour: array
   *   Number of daylight hours according to FAO.
   * I: number
   *   Heat Index
   *
   * Returns
   * -------
   * array
   *   Potential evapotranspiration after Thorntwaite [mm/day].
   */

  // Calculate exponent a
  const a = 6.75e-7 * I ** 3 - 7.71e-5 * I ** 2 + 0.0179 * I + 0.492;

  // Calculate PET based on temperature range
  const pet = [];
  for (let i = 0; i < t.length; i++) {
    if (t[i] <= 26) {
      pet.push(
        ((16.0 * dayLightHour[i]) / 360.0) *
          Math.pow((10.0 * Math.max(0.0, t[i])) / I, a)
      );
    } else {
      pet.push(
        (dayLightHour[i] / 360.0) * (-415.85 + 32.24 * t[i] - 0.43 * t[i] ** 2)
      );
    }
  }

  return pet;
};

export const potEvapoPenman = (t, w, h, netRad, altitude) => {
  /**
   * Compute potential evapotranspiration after Penman, after Shuttleworth [mm/day].
   *
   * Parameters (placeholders for potential library functions)
   * ----------
   * t: array
   *   Temperature at 14:00 [C].
   * w: array
   *   Wind speed at 14:00 [m/s].
   * h: array
   *   Relative humidity at 14:00 [%].
   * netRad: array
   *   Daily net radiation value [MJ·m-2·d-1].
   * altitude: scalar
   *   Altitude of location.
   *
   * Returns
   * -------
   * array
   *   Potential evapotranspiration after Penman [mm/day].
   */

  // Constants
  const pa = 101.3 * Math.pow((293 - 0.0065 * altitude) / 293, 5.26);
  const lhv = 2.501 - 0.002368 * t;
  const gamma = (0.0016286 * pa) / lhv;

  // Calculations (assuming placeholder functions provide necessary values)
  const delta = slopeSatVapourPressure(t);
  const vpd = vaporPressureDeficit(t, h);

  const firstTerm = ((delta / (delta + gamma)) * netRad) / lhv;
  const secondTerm =
    ((gamma / (delta + gamma)) * (6.43 * (1 + 0.536 * w) * vpd)) / lhv;

  return firstTerm + secondTerm;
};

/**# ===============
# Angstroem index
# =============== */
export const angstrom = (t, h) => {
  /**
   * Compute the Angstroem index.
   *
   * Parameters
   * ----------
   * t: array
   *   Noon temperature [C].
   * h: array
   *   Noon relative humidity [%].
   *
   * Returns
   * -------
   * array
   *   Angstroem index value.
   */

  return h / 20 + (27 - t) / 10;
};

/**# =================
# Baumgartner index
# ================= */
export const baumgarner = (potEvapoPenmanFiveDays, precFiveDays) => {
  /**
   * Compute the cumulative Baumgartner index.
   *
   * Parameters
   * ----------
   * potEvapoPenmanFiveDays: array
   *   Cumulative sum of five previous days potential evapotranspiration after Penman [mm/5day].
   * precFiveDays: array
   *   Cumulative sum of five previous days rainfall [mm/5day].
   *
   * Returns
   * -------
   * array
   *   Baumgarner index value at current timestep.
   */

  // Element-wise subtraction
  const baumgarnerIndex = potEvapoPenmanFiveDays.map(
    (pe, index) => pe - precFiveDays[index]
  );

  return baumgarnerIndex;
};

/**# =================
# Nesterov index
# ================= */
export const nesterov = (t, h, p, prev) => {
  /**
   * Compute the cumulative Nesterov index.
   *
   * Parameters (placeholder for potential library function)
   * ----------
   * t: array
   *   Temperature at 15:00 [C].
   * h: array
   *   Relative humidity at 15:00 [%].
   * p: array
   *   Rainfall amount in open over previous 24 hours [mm].
   * prev: array
   *   Previous day value of the Nesterov.
   *
   * Returns
   * -------
   * array
   *   Nesterov index value at current timestep.
   */

  // **Alternative approach (commented out)**
  // uncomment and use this form if you prefer the dew point method
  // const tdew = tdewpointFromRelhum(t, h);

  const pThreshold = 3; // Daily precipitation threshold

  if (p > pThreshold) {
    return 0.0;
  } else {
    // **Calculate dew point if using the commented-out approach above**
    // let tdew = tdewpointFromRelhum(t, h);

    return (
      prev +
      (t - /*tdew*/ (h / 100) * Math.exp((17.625 * t) / (243.04 + t))) * t
    );
  }
};

/**# =================
# Munger Drought index
# ================= */
export const munger = (p, prev) => {
  /**
   * Compute the cumulative Munger Drought index.
   *
   * Parameters
   * ----------
   * p: array
   *   Rainfall amount in open over previous 24 hours [mm].
   * prev: array
   *   Previous day value of the Munger.
   *
   * Returns
   * -------
   * array
   *   Munger index value at current timestep.
   */

  const pThreshold = 1.27; // Daily precipitation threshold

  if (p >= pThreshold) {
    return 0.0;
  } else {
    // Math.pow for exponentiation
    return 0.5 * Math.pow(Math.sqrt(2 * prev) + 1, 2);
  }
};

/**# ===============================================
# Fuel moisture index (FMI) and Forest fire danger rating index (F)
# =============================================== */
export const fuelMoistureIndex = (t, h) => {
  /**Compute the Fuel moisture index after Sharples et al. (2009a, 2009b).

  Parameters
  ----------
  t : array
    temperature [C].
  h : array
    relative humidity [%].
  
  Returns
  -------
  array
    Fuel moisture index value at current timestep.

  Example
  -------

 */
  return 10 - 0.25 * (t - h);
};

export const fmiDangerRating = (t, h, w) => {
  /**
   * Compute the Forest fire danger rating index (F) after Sharples et al. (2009a, 2009b).
   *
   * Parameters (placeholder for potential library function)
   * ----------
   * t: array
   *   Temperature [C].
   * h: array
   *   Relative humidity [%].
   * w: array
   *   Wind speed [m/s].
   *
   * Returns
   * -------
   * array
   *   Forest fire danger rating index value at current timestep.
   */

  const windThreshold = 1;

  // Calculate danger rating
  const dangerRating =
    Math.max(windThreshold, w * 3.6) / fuelMoistureIndex(t, h);

  return dangerRating;
};

/**# ===============================================
# Keetch-Byram drought index 
# =============================================== */
export const kbdi = (
  tMax,
  p,
  kbdi0,
  pSum0,
  pWeek,
  pWeekThreshold,
  pAnnualAvg
) => {
  /**
   * Compute the Keetch-Byram drought index in S.I. units from Crane (1982).
   *
   * Parameters
   * ----------
   * tMax: array
   *   Daily maximal temperature [°C].
   * p: array
   *   Rainfall amount [mm].
   * kbdi0: array
   *   Previous day KBDI Value.
   * pWeekThreshold: array
   *   Weekly rain threshold to initialize index [mm]. Often 30mm is used.
   * pAnnualAvg: array
   *   Annual rainfall average [mm].
   * pSum0: array
   *   Sum of consecutive rainfall [mm].
   * pWeek: array
   *   Sum of rain over last 7 days [mm].
   *
   * Returns
   * -------
   * array
   *   Keetch-Byram drought index.
   */

  const deltaTime = 1;
  const pThreshold = 0.2 * 25.4; // Convert inches to mm

  // Net precipitation
  const pNet = Math.max(0, p - Math.max(0, pThreshold - (pSum0 - p)));

  // Q value based on weekly rain
  let Q;
  if (pWeek >= pWeekThreshold) {
    Q = 0.0;
  } else {
    Q = Math.max(0, kbdi0 - pNet); // Yesterday KBDI minus effective precipitation
  }

  // Potential Evapotranspiration
  const numerator =
    (203.2 - Q) * (0.968 * Math.exp(0.0875 * tMax + 1.5552) - 8.3) * deltaTime;
  const denominator = 1 + 10.88 * Math.exp(-0.001736 * pAnnualAvg);

  return Q + Math.max(0, (numerator / denominator) * 0.001);
};

export const rainSum = (p, prev) => {
  /**
   * Compute amount (sum) of consecutive rainfall.
   *
   * Parameters
   * ----------
   * p: array
   *   Rainfall amount in open over previous 24 hours [mm].
   * prev: array
   *   Previous sum of consecutive rain.
   *
   * Returns
   * -------
   * array
   *   Sum of consecutive rainfall [mm].
   */

  // Reset sum if no rain
  return p === 0 ? 0 : prev + p;
};

export const daysSinceRain = (p, prev, threshold = 0) => {
  /**
   * Compute consecutive number of days without/little rain.
   *
   * Parameters
   * ----------
   * p: array
   *   Rainfall amount in open over previous 24 hours [mm].
   * prev: array
   *   Previous number of consecutive days without rain.
   * threshold: number (default: 0)
   *   Threshold for dry days.
   *
   * Returns
   * -------
   * array
   *   Number of days without rain at current timestep.
   */

  // Reset counter if rain exceeds threshold
  return p > threshold ? 0 : prev + 1;
};
// requires daily temperature, daily and annual precipitation as input data.

/**# ===============================================
# Canadian Forest Fire Weather Index System (FWI)
# =============================================== */
/**# FWI is initialized with some values for FFMC, DMC and DC components. This means that the first values of the series are not reliable,
# until the index is iterated over several time steps and stabilizes (typically a few days suffice). */
//Reference: Wang, Anderson and Suddaby, 2015.
const dayLengths = [
  [11.5, 10.5, 9.2, 7.9, 6.8, 6.2, 6.5, 7.4, 8.7, 10, 11.2, 11.8],
  [10.1, 9.6, 9.1, 8.5, 8.1, 7.8, 7.9, 8.3, 8.9, 9.4, 9.9, 10.2],
  // Simulate repeating value using fill
  Array(12).fill(9),
  [7.9, 8.4, 8.9, 9.5, 9.9, 10.2, 10.1, 9.7, 9.1, 8.6, 8.1, 7.8],
  [6.5, 7.5, 9, 12.8, 13.9, 13.9, 12.4, 10.9, 9.4, 8, 7, 6],
];

const dryingFactors = [
  [6.4, 5.0, 2.4, 0.4, -1.6, -1.6, -1.6, -1.6, -1.6, 0.9, 3.8, 5.8],
  // Simulate repeating value using fill
  Array(12).fill(1.39),
  [-1.6, -1.6, -1.6, 0.9, 3.8, 5.8, 6.4, 5.0, 2.4, 0.4, -1.6, -1.6],
];

const dayLength = (lat, mth) => {
  /**
   * Return the average day length for a month within latitudinal bounds.
   *
   * @param {number} lat - Latitude in degrees.
   * @param {number} mth - Month (1-indexed).
   * @returns {number} Average day length for the month at the given latitude.
   * @throws {Error} If invalid latitude is provided.
   */

  if (lat < -90 || lat > 90) {
    throw new Error("Invalid latitude specified.");
  }

  if (-30 > lat && lat >= -90) {
    return dayLengths[0][mth - 1];
  } else if (-15 > lat && lat >= -30) {
    return dayLengths[1][mth - 1];
  } else if (15 > lat && lat >= -15) {
    return 9;
  } else if (30 > lat && lat >= 15) {
    return dayLengths[3][mth - 1];
  } else {
    return dayLengths[4][mth - 1];
  }
};

const dryingFactor = (lat, mth) => {
  /**
   * Return the day length factor / drying factor.
   *
   * @param {number} lat - Latitude in degrees.
   * @param {number} mth - Month (1-indexed).
   * @returns {number} Drying factor for the month at the given latitude.
   * @throws {Error} If invalid latitude is provided.
   */

  if (lat < -90 || lat > 90) {
    throw new Error("Invalid latitude specified.");
  }

  if (-15 > lat && lat >= -90) {
    return dryingFactors[0][mth - 1];
  } else if (15 > lat && lat >= -15) {
    return 1.39;
  } else {
    return dryingFactors[2][mth - 1];
  }
};

export const ffmc = (t, p, w, h, ffmc0) => {
  /**
   * Compute the fine fuel moisture code over one timestep (canadian index).
   *
   * @param {number} t - Noon temperature [C].
   * @param {number} p - Rainfall amount in open over previous 24 hours, at noon [mm].
   * @param {number} w - Noon wind speed [m/s].
   * @param {number} h - Noon relative humidity [%].
   * @param {number} ffmc0 - Previous value of the fine fuel moisture code.
   * @returns {number} Fine fuel moisture code at the current timestep.
   */

  // Clip humidity to [0, 100] (alternative approach without vectorization)
  h = Math.max(0, Math.min(h, 100));

  // Convert wind speed from m/s to km/h
  w = w * 3.6;

  // Eq. 1
  let mo = (147.2 * (101.0 - ffmc0)) / (59.5 + ffmc0);

  if (p > 0.5) {
    // Eq.2: Rain reduction
    const rf = p - 0.5;

    if (mo > 150.0) {
      // Eq.3b
      mo =
        mo +
        42.5 *
          rf *
          Math.exp(-100.0 / (251.0 - mo)) *
          (1.0 - Math.exp(-6.93 / rf)) +
        0.0015 * (mo - 150.0) ** 2 * Math.sqrt(rf);
    } else {
      // Eq.3a
      mo =
        mo +
        42.5 *
          rf *
          Math.exp(-100.0 / (251.0 - mo)) *
          (1.0 - Math.exp(-6.93 / rf));
    }

    // Cap mo at 250 (not strictly necessary in this implementation)
    mo = Math.min(mo, 250.0);
  }

  // Eq.4: Equilibrium moisture content from drying phase
  const ed =
    0.942 * h ** 0.679 +
    11.0 * Math.exp((h - 100.0) / 10.0) +
    0.18 * (21.1 - t) * (1.0 - 1.0 / Math.exp(0.115 * h));

  let m;
  if (mo < ed) {
    // Eq. 5 Equilibrium moisture content from wetting phase
    const ew =
      0.618 * h ** 0.753 +
      10.0 * Math.exp((h - 100.0) / 10.0) +
      0.18 * (21.1 - t) * (1.0 - 1.0 / Math.exp(0.115 * h));
    if (mo < ew) {
      // Eq. 7a, 7b: Wetting rate
      const kl =
        0.424 * (1.0 - ((100.0 - h) / 100.0) ** 1.7) +
        0.0694 * Math.sqrt(w) * (1.0 - ((100.0 - h) / 100.0) ** 8);
      const kw = kl * (0.581 * Math.exp(0.0365 * t));
      // Eq. 9
      m = ew - (ew - mo) / 10.0 ** kw;
    } else {
      m = mo;
    }
  } else if (mo === ed) {
    m = mo;
  } else {
    // Eq. 6a, 6b: Drying rate
    const kl =
      0.424 * (1.0 - (h / 100.0) ** 1.7) +
      0.0694 * Math.sqrt(w) * (1.0 - (h / 100.0) ** 8);
    const kw = kl * (0.581 * Math.exp(0.0365 * t));
    // Eq.8
    m = ed + (mo - ed) / 10.0 ** kw;
  }

  // Eq. 10 Final ffmc calculation
  let ffmc1 = (59.5 * (250.0 - m)) / (147.2 + m);

  // Constraints: ffmc is scaled between 0 and 101
  const ffmc = Math.max(0.0, Math.min(ffmc1, 101.0));

  return ffmc;
};

export const dmc = (t, p, h, mth, lat, dmc0) => {
  /**Compute the Duff moisture code over one time step (canadian index).

  Parameters
  ----------
  t: array
    Noon temperature [C].
  p : array
    rainfall amount in open over previous 24 hours, at noon [mm].
  h : array
    Noon relative humidity [%].
  mth : integer array
    Month of the year [1-12].
  lat : float
    Latitude in degrees.
  dmc0 : float
    Previous value of the Duff moisture code.

  Returns
  -------
  array
    Duff moisture code at the current timestep

  Example
  ------- 
  dmc(17,0,42,6,45.98,6) == 8.5450511359999997
   */
  // Clip humidity to [0, 100] (alternative approach without vectorization)
  h = Math.max(0, Math.min(h, 100));

  let rk;
  if (t < -1.1) {
    rk = 0;
  } else {
    // Assuming _dayLength function is available (from previous example)
    const dl = dayLength(lat, mth);
    // Eqs.16 and 17
    rk = 1.894 * (t + 1.1) * (100.0 - h) * dl * 0.0001;
  }

  let ra, rw, wmi, b, wmr, pr;
  if (p > 1.5) {
    ra = p;
    // Eq.11 Effective rainfall
    rw = 0.92 * ra - 1.27;
    // Eq.12
    wmi = 20.0 + 280.0 / Math.exp(0.023 * dmc0);
    if (dmc0 <= 33.0) {
      // Eq.13a
      b = 100.0 / (0.5 + 0.3 * dmc0);
    } else if (dmc0 <= 65.0) {
      // Eq.13b
      b = 14.0 - 1.3 * Math.log(dmc0);
    } else {
      // Eq.13c
      b = 6.2 * Math.log(dmc0) - 17.2;
    }
    // Eq.14
    wmr = wmi + (1000 * rw) / (48.77 + b * rw);
    // Eq.15
    pr = 43.43 * (5.6348 - Math.log(wmr - 20.0));
  } else {
    pr = dmc0;
  }

  pr = Math.max(0.0, pr); // Ensure pr is non-negative

  // Final dmc calculation
  let dmc = pr + rk;
  dmc = Math.max(0.0, dmc); // Constraint: dmc >= 0

  return dmc;
};

export const dc = (t, p, mth, lat, dc0) => {
  /**Compute the drought code over one time step (canadian index).

  Parameters
  ----------
  t: array
    Noon temperature [C].
  p : array
    rainfall amount in open over previous 24 hours, at noon [mm].
  mth : integer array
    Month of the year [1-12].
  lat : float
    Latitude.
  dc0 : float
    Previous value of the drought code.

  Returns
  -------
  array
    Drought code at the current timestep

  Example
  ------- 
  dc(17,0,4,45.98,15) == 19.013999999999999
   */

  const fl = dryingFactor(lat, mth);

  // Clip temperature to minimum value
  t = Math.max(-2.8, t);

  // Eq.22 Potential Evapotranspiration
  let pe = (0.36 * (t + 2.8) + fl) / 2;
  pe = Math.max(0.0, pe); // Ensure pe is non-negative

  let ra, rw, smi, dr, dc;
  if (p > 2.8) {
    ra = p;
    // Eq.18 Effective rainfall
    rw = 0.83 * ra - 1.27;
    // Eq.19
    smi = 800.0 * Math.exp(-dc0 / 400.0);
    // Eqs.20 and 21
    dr = dc0 - 400.0 * Math.log(1.0 + (3.937 * rw) / smi);
    if (dr > 0.0) {
      dc = dr + pe;
    } else if (isNaN(dc0)) {
      dc = NaN; // Handle NaN for initial dc0
    } else {
      dc = pe;
    }
  } else {
    // Use yesterday's DC if precipitation is less than 2.8
    dc = dc0 + pe;
  }

  return dc;
};

export const isi = (w, ffmc) => {
  /**Initialize spread index (canadian index).

  Parameters
  ----------
  w : array
    Noon wind speed [m/s].
  ffmc : array
    Fine fuel moisture code.

  Returns
  -------
  array
    Initial spread index.

  Example
  ------- 
  isi(6.944444444444445,87.6929800927744) == 10.853661073655068
   */
  // Convert wind speed from m/s to km/h
  w = w * 3.6;

  // Eq.1 Moisture content
  const mo = (147.2 * (101.0 - ffmc)) / (59.5 + ffmc);

  // Eq.25 Fine Fuel Moisture
  const ff =
    19.1152 * Math.exp(mo * -0.1386) * (1.0 + Math.pow(mo, 5.31) / 49300000.0);

  // Eq.26 Spread Index Equation (with Wind Effect)
  const isi = ff * Math.exp(0.05039 * w);

  return isi;
};

export const bui = (dmc, dc) => {
  /**Build-up index (canadian index).

  Parameters
  ----------
  dmc : array
    Duff moisture code.
  dc : array
    Drought code.

  Returns
  -------
  array
    Build up index.
  
  Example
  ------- 
  bui(8.5450511359999997,19.013999999999999) == 8.4904265358371838
  */
  const condition = dmc <= 0.4 * dc;
  let bui;

  if (condition) {
    // Eq.27a
    bui = (0.8 * dc * dmc) / (dmc + 0.4 * dc);
  } else {
    // Eq.27b
    const term1 = 1.0 - (0.8 * dc) / (dmc + 0.4 * dc);
    bui = dmc - term1 * (0.92 + Math.pow(0.0114 * dmc, 1.7));
  }

  // Clip bui to range [0, None) (assuming non-negative values)
  bui = Math.max(0.0, bui);

  return bui;
};

export const fwi = (isi, bui) => {
  /**Fire weather index in S-scale (canadian index).

  Parameters
  ----------
  isi : array
    Initial spread index
  bui : array
    Build up index.

  Returns
  -------
  array
    Fire weather index.
  
  Example
  ------- 
  fwi(10.853661073655068,8.4904265358371838) = 10.096371392382368
   */

  let fwi;

  if (bui <= 80.0) {
    // Eq.28a
    fwi = 0.1 * isi * (0.626 * Math.pow(bui, 0.809) + 2.0);
  } else {
    // Eq.28b
    fwi = 0.1 * isi * (1000.0 / (25.0 + 108.64 / Math.exp(0.023 * bui)));
  }

  // Apply constraint for fwi > 1 (Eqs. 30a and 30b)

  if (fwi > 1) {
    fwi = Math.exp(2.72 * Math.pow(0.434 * Math.log(fwi), 0.647));
  }

  return fwi;
};

export const dailySeverityRating = (fwi) => {
  /**Daily severity rating (canadian index).

  Parameters
  ----------
  fwi : array
    Fire weather index

  Returns
  -------
  array
    Daily severity rating.
   */
  // Perform element-wise multiplication using map
  const severityRating = 0.0272 * Math.pow(fwi, 1.77);
  return severityRating;
};
