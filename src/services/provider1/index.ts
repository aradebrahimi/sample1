import carHistoryServices from "./carHistory";
import carPlaqueHistoryServices from "./carPlaqueHistory";

const provider1Services = {
  ...carHistoryServices,
  ...carPlaqueHistoryServices,
};

export default provider1Services;
