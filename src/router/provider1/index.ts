import carHistoryRoutes from "./carHistory";
import carPlaqueHistoryRoutes from "./carPlaqueHistory";

const provider1Routes = [...carHistoryRoutes, ...carPlaqueHistoryRoutes];

export default provider1Routes;
