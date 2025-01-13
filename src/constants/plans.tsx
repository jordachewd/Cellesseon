export const plans = [
  {
    _id: 0,
    name: "Lite",
    desc: "Free trial for 3 days",
    icon: "bi-gift",
    highlight: false,
    price: 0,
    inclusions: [
      {
        label: "Full AI model",
        isIncluded: true,
      },
      {
        label: "Messaging and file uploads (limited)",
        isIncluded: true,
      },
      {
        label: "Web browsing and data analysis (limited)",
        isIncluded: true,
      },
      {
        label: "3 image and/or audio generation (limited)",
        isIncluded: true,
      },
      {
        label: "3 text to speach and/or voice inputs (limited)",
        isIncluded: true,
      },
      {
        label: "Secure and private",
        isIncluded: true,
      },
      {
        label: "Email support",
        isIncluded: false,
      },
      {
        label: "Opportunities to test new features",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 1,
    name: "Pro",
    desc: "Best for personal projects",
    icon: "bi-stars",
    highlight: true,
    price: 19,
    inclusions: [
      {
        label: "Full AI model",
        isIncluded: true,
      },
      {
        label: "Messaging and file uploads (unlimited)",
        isIncluded: true,
      },
      {
        label: "Web browsing and data analysis (unlimited)",
        isIncluded: true,
      },
      {
        label: "20/Mo image and/or audio generation",
        isIncluded: true,
      },
      {
        label: "20/Mo text to speach and/or voice inputs",
        isIncluded: true,
      },
      {
        label: "Secure and private",
        isIncluded: true,
      },
      {
        label: "Email support",
        isIncluded: true,
      },
      {
        label: "Opportunities to test new features",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    name: "Premium",
    desc: "Best for businesses",
    icon: "bi-gem",
    highlight: false,
    price: 49,
    inclusions: [
      {
        label: "Multiple AI model selection",
        isIncluded: true,
      },
      {
        label: "Messaging and file uploads (unlimited)",
        isIncluded: true,
      },
      {
        label: "Web browsing and data analysis (unlimited)",
        isIncluded: true,
      },
      {
        label: "Image and audio generation (unlimited)",
        isIncluded: true,
      },
      {
        label: "Text to speach and voice inputs (unlimited)",
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
      {
        label: "Opportunities to test new features",
        isIncluded: true,
      },
    ],
  },
];
