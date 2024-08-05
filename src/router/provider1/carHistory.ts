const carHistoryRoutes = [
  {
    path: "/car-history",
    component: () => import("../../views/provider1/carHistory/Index.vue"),
    children: [
      {
        path: "",
        name: "CarHistoryTheEntry",
        component: () =>
          import("../../views/provider1/carHistory/TheEntry.vue"),
        meta: {
          title: "سوابق خودرو",
        },
      },
      {
        path: "inquiry-result",
        name: "CarHistoryInquiryResult",
        component: () =>
          import("../../views/provider1/carHistory/InquiryResult.vue"),
        meta: {
          title: "سوابق خودرو",
        },
      },
    ],
  },
];

export default carHistoryRoutes;
