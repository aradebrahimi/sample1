const carPlaqueHistoryRoutes = [
  {
    path: "/car-plaque-history",
    component: () => import("../../views/provider1/carPlaqueHistory/Index.vue"),
    children: [
      {
        path: "",
        name: "CarPlaqueHistoryTheEntry",
        component: () =>
          import("../../views/provider1/carPlaqueHistory/TheEntry.vue"),
        meta: {
          title: "سوابق پلاک",
        },
      },
      {
        path: "inquiry-result",
        name: "CarPlaqueHistoryInquiryResult",
        component: () =>
          import("../../views/provider1/carPlaqueHistory/InquiryResult.vue"),
        meta: {
          title: "سوابق پلاک",
        },
      },
    ],
  },
];

export default carPlaqueHistoryRoutes;
