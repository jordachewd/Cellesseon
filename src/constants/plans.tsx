export const plans = [
  {
    _id: 0,
    name: "Free",
    icon: "bi-gift",
    highlight: false,
    price: 0,
    inclusions: [
      {
        label: "Limited AI model",
        isIncluded: true,
      },
      {
        label: "Limited messaging",
        isIncluded: true,
      },
      {
        label: "File uploads and image generation",
        isIncluded: false,
      },
      {
        label: "Web browsing and data analysis",
        isIncluded: false,
      },
      {
        label: "Voice and video inputs",
        isIncluded: false,
      },
      {
        label: "Opportunities to test new features",
        isIncluded: false,
      },
      {
        label: "Secure and private",
        isIncluded: true,
      },
      {
        label: "Email support",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 1,
    name: "Pro",
    icon: "bi-star",
    highlight: true,
    price: 9,
    inclusions: [
      {
        label: "Full AI model",
        isIncluded: true,
      },
      {
        label: "Messaging and file uploads",
        isIncluded: true,
      },
      {
        label: "File uploads and image generation",
        isIncluded: true,
      },
      {
        label: "Web browsing and data analysis",
        isIncluded: true,
      },
      {
        label: "Voice and video inputs",
        isIncluded: false,
      },
      {
        label: "Opportunities to test new features",
        isIncluded: false,
      },
      {
        label: "Secure and private",
        isIncluded: true,
      },
      {
        label: "Email support",
        isIncluded: true,
      },
    ],
  },
  {
    _id: 2,
    name: "Premium",
    icon: "bi-gem",
    highlight: false,
    price: 29,
    inclusions: [
      {
        label: "Full AI model",
        isIncluded: true,
      },
      {
        label: "Unlimited messaging and file uploads",
        isIncluded: true,
      },
      {
        label: "File uploads and image generation",
        isIncluded: true,
      },
      {
        label: "Web browsing and data analysis",
        isIncluded: true,
      },
      {
        label: "Voice and video inputs",
        isIncluded: true,
      },
      {
        label: "Opportunities to test new features",
        isIncluded: true,
      },
      {
        label: "Secure and private",
        isIncluded: true,
      },
      {
        label: "Priority email support",
        isIncluded: true,
      },
    ],
  },
];
