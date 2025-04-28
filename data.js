// Data for all products
const productData = {
  "Cookbook": {
    "platforms": {
      "ClickFunnels": {
        "Physical": {
          "2025": { "March": 9, "Feb": 15, "Jan": 26 },
          "2024": { "Dec": 27, "Nov": 28, "Oct": 58, "Sept": 57, "Aug": 90, "July": 83, "June": 118, "May": 111, "April": 136, "March": 151, "Feb": 186, "Jan": 315 },
          "2023": { "Dec": 391, "Nov": 220, "Oct": 113, "Sept": 100, "Aug": 151, "July": 218, "June": 133, "May": 163, "April": 208, "March": 219, "Feb": 294, "Jan": 449 },
          "2022": { "Dec": 259, "Nov": 816, "Oct": 229, "Sept": 257, "Aug": 352, "July": 361, "June": 278, "May": 468, "April": 538, "March": 555, "Feb": 673, "Jan": 946 },
          "2021": { "Dec": 664 }
        },
        "eBook": {
          "2025": { "March": 11, "Feb": 5, "Jan": 26 },
          "2024": { "Dec": 11, "Nov": 34, "Oct": 20, "Sept": 29, "Aug": 41, "July": 36, "June": 61, "May": 57, "April": 69, "March": 101, "Feb": 98, "Jan": 137 },
          "2023": { "Dec": 150, "Nov": 99, "Oct": 72, "Sept": 70, "Aug": 116, "July": 158, "June": 103, "May": 102, "April": 142, "March": 168, "Feb": 140, "Jan": 277 },
          "2022": { "Dec": 182, "Nov": 302, "Oct": 166, "Sept": 183, "Aug": 228, "July": 237, "June": 165, "May": 266, "April": 280, "March": 326, "Feb": 352, "Jan": 619 },
          "2021": { "Dec": 362 }
        }
      },
      "Shopify": {
        "Physical": {
          "2025": { "March": 38, "Feb": 119, "Jan": 195 },
          "2024": { "Dec": 158, "Nov": 140, "Oct": 63, "Sept": 62, "Aug": 42, "July": 46, "June": 65, "May": 69, "April": 88, "March": 37, "Feb": 30, "Jan": 51 },
          "2023": { "Dec": 52 }
        },
        "eBook": {
          "2025": { "March": 22, "Feb": 17, "Jan": 17 },
          "2024": { "Dec": 59, "Nov": 28, "Oct": 12, "Sept": 11, "Aug": 20, "July": 25, "June": 19, "May": 22, "April": 15, "March": 11, "Feb": 0, "Jan": 0 },
          "2023": { "Dec": 0 }
        }
      },
      "KDP": {
        "Physical": {
          "2025": { "March": 1, "Feb": 6, "Jan": 12 },
          "2024": { "Dec": 146, "Nov": 11, "Oct": 17, "Sept": 27, "Aug": 15, "July": 32, "June": 39, "May": 36, "April": 44, "March": 45, "Feb": 49, "Jan": 78 },
          "2023": { "Dec": 162, "Nov": 82, "Oct": 46, "Sept": 81, "Aug": 116, "July": 90, "June": 36, "May": 75, "April": 22, "March": 0, "Feb": 0, "Jan": 0 },
          "2022": { "Dec": 0, "Nov": 0, "Oct": 0, "Sept": 0, "Aug": 0, "July": 0, "June": 0, "May": 0, "April": 0, "March": 0 }
        },
        "eBook": {
          "2025": { "March": 46, "Feb": 29, "Jan": 48 },
          "2024": { "Dec": 41, "Nov": 33, "Oct": 19, "Sept": 18, "Aug": 11, "July": 28, "June": 21, "May": 45, "April": 30, "March": 43, "Feb": 44, "Jan": 50 },
          "2023": { "Dec": 48, "Nov": 25, "Oct": 40, "Sept": 19, "Aug": 37, "July": 45, "June": 48, "May": 39, "April": 35, "March": 49, "Feb": 8, "Jan": 55 },
          "2022": { "Dec": 56, "Nov": 64, "Oct": 59, "Sept": 74, "Aug": 72, "July": 94, "June": 45, "May": 21, "April": 23, "March": 4 }
        }
      },
      "Amazon US": {
        "Physical": {
          "2025": { "March": 837, "Feb": 881, "Jan": 1013 },
          "2024": { "Dec": 2030, "Nov": 1807, "Oct": 643, "Sept": 407, "Aug": 489, "July": 803, "June": 548, "May": 556, "April": 576, "March": 579, "Feb": 593, "Jan": 808 },
          "2023": { "Dec": 513, "Nov": 563, "Oct": 425, "Sept": 310, "Aug": 434, "July": 524, "June": 244, "May": 188, "April": 596, "March": 757, "Feb": 687, "Jan": 865 },
          "2022": { "Dec": 1079, "Nov": 826, "Oct": 764, "Sept": 582, "Aug": 839, "July": 760, "June": 422, "May": 293, "April": 200, "March": 112, "Feb": 19, "Jan": 18 }
        }
      },
      "Amazon CA": {
        "Physical": {
          "2025": { "March": 121, "Feb": 85, "Jan": 123 },
          "2024": { "Dec": 1, "Nov": 110, "Oct": 64, "Sept": 49, "Aug": 52, "July": 92, "June": 51, "May": 61, "April": 71, "March": 70, "Feb": 91, "Jan": 128 },
          "2023": { "Dec": 114, "Nov": 6, "Oct": 38, "Sept": 18, "Aug": 32, "July": 32, "June": 8, "May": 6 }
        }
      },
      "Amazon UK": {
        "Physical": {
          "2025": { "March": 40, "Feb": 30, "Jan": 34 },
          "2024": { "Dec": 21, "Nov": 76, "Oct": 20, "Sept": 20, "Aug": 19, "July": 21, "June": 12, "May": 22, "April": 50, "March": 45, "Feb": 54, "Jan": 100 },
          "2023": { "Dec": 27, "Nov": 13, "Oct": 20, "Sept": 28, "Aug": 6 }
        }
      }
    },
    "notes": [
      {
        "id": 1,
        "text": "Amazon CA Cookbook ran out of inventory on Dec. 2024, that's why there's only 1 sale.",
        "showWhen": (year, platform, month) => 
          (year === "2024" || year === "All") && 
          (platform === "Amazon CA" || platform === "All") &&
          (!month || month === "Dec")
      },
      {
        "id": 2,
        "text": "Amazon US Cookbook's April 2023 Total Sales isn't accurate (April 3 - 30) because sales was counted as per week (Monday to Sunday), regardless of date. This will be updated in May.",
        "showWhen": (year, platform, month) => 
          (year === "2023" || year === "All") && 
          (platform === "Amazon US" || platform === "All") &&
          (!month || month === "April")
      },
      {
        "id": 3,
        "text": "KDP Physical ran out of inventory on March 2025, that's why there's only 1 sale.",
        "showWhen": (year, platform, month) => 
          (year === "2025" || year === "All") && 
          (platform === "KDP" || platform === "All") &&
          (!month || month === "March")
      }
    ],
    "config": {
      "years": ["2021", "2022", "2023", "2024", "2025", "All"],
      "platforms": ["ClickFunnels", "Shopify", "KDP", "Amazon US", "Amazon CA", "Amazon UK", "All"],
      "hasEbooks": true,
      "growthFactor": 1.05,
      "productLabel": "Cookbook"
    }
  },
  "Liner": {
    "platforms": {
      "Shopify": {
        "Physical": {
          "2025": { "March": 85, "Feb": 64, "Jan": 85 },
          "2024": { "Dec": 22, "Nov": 0, "Oct": 0, "Sept": 0, "Aug": 0, "July": 0, "June": 0, "May": 40, "April": 55, "March": 39, "Feb": 42, "Jan": 32 },
          "2023": { "Dec": 37 }
        }
      },
      "Amazon US": {
        "Physical": {
          "2025": { "March": 234, "Feb": 222, "Jan": 251 },
          "2024": { "Dec": 38, "Nov": 69, "Oct": 66, "Sept": 86, "Aug": 47, "July": 2, "June": 14, "May": 9, "April": 77, "March": 56, "Feb": 101, "Jan": 93 },
          "2023": { "Dec": 16 }
        }
      },
      "Amazon CA": {
        "Physical": {
          "2025": { "March": 5, "Feb": 12, "Jan": 13 },
          "2024": { "Dec": 12, "Nov": 6, "Oct": 10, "Sept": 5, "Aug": 9, "July": 16, "June": 6, "May": 8, "April": 10, "March": 11, "Feb": 1, "Jan": 2 }
        }
      },
      "Amazon UK": {
        "Physical": {
          "2025": { "March": 22, "Feb": 4, "Jan": 7 },
          "2024": { "Dec": 4, "Nov": 9, "Oct": 17, "Sept": 13, "Aug": 8, "July": 26, "June": 35, "May": 37, "April": 42, "March": 1, "Feb": 1 }
        }
      }
    },
    "notes": [
      {
        "id": 1,
        "text": "Liners aren't sold in ClickFunnels",
        "showWhen": (year, platform) => true
      },
      {
        "id": 2,
        "text": "Amazon US Liners had no to low supply from May 14 - July 30. That's why sales dropped.",
        "showWhen": (year, platform, month) => 
          (year === "2024" || year === "All") && 
          (platform === "Amazon US" || platform === "All") &&
          (!month || ["May", "June", "July"].includes(month))
      },
      {
        "id": 3,
        "text": "AMZ CA Liner had sales on multiple FBA pages from most of May 2024 to March 2025",
        "showWhen": (year, platform) => 
          ((year === "2024" || year === "2025") || year === "All") && 
          (platform === "Amazon CA" || platform === "All")
      },
      {
        "id": 4,
        "text": "No Liner stock for Shopify from June to Dec. 23, 2024",
        "showWhen": (year, platform, month) => 
          (year === "2024" || year === "All") && 
          (platform === "Shopify" || platform === "All") &&
          (!month || ["June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"].includes(month))
      }
    ],
    "config": {
      "years": ["2023", "2024", "2025", "All"],
      "platforms": ["Shopify", "Amazon US", "Amazon CA", "Amazon UK", "All"],
      "hasEbooks": false,
      "growthFactor": 1.1,
      "productLabel": "Liner"
    }
  },
  "Magnet": {
    "platforms": {
      "ClickFunnels": {
        "Physical": {
          "2025": { "March": 10, "Feb": 0, "Jan": 19 },
          "2024": { "Dec": 11, "Nov": 14, "Oct": 35, "Sept": 26, "Aug": 42, "July": 36, "June": 46, "May": 47, "April": 50, "March": 46, "Feb": 77, "Jan": 124 },
          "2023": { "Dec": 238, "Nov": 106, "Oct": 43, "Sept": 82, "Aug": 57, "July": 34, "June": 53, "May": 74, "April": 114, "March": 299, "Feb": 389, "Jan": 445 }
        },
        "eBook": {
          "2025": { "March": 5, "Feb": 7, "Jan": 11 },
          "2024": { "Dec": 13, "Nov": 43, "Oct": 32, "Sept": 27, "Aug": 21, "July": 26, "June": 49, "May": 35, "April": 34, "March": 64, "Feb": 73, "Jan": 69 },
          "2023": { "Dec": 113, "Nov": 50, "Oct": 31, "Sept": 42, "Aug": 43, "July": 64, "June": 34, "May": 61, "April": 95, "March": 271 }
        }
      },
      "Shopify": {
        "Physical": {
          "2025": { "March": 87, "Feb": 0, "Jan": 155 },
          "2024": { "Dec": 66, "Nov": 132, "Oct": 67, "Sept": 51, "Aug": 43, "July": 60, "June": 57, "May": 71, "April": 61, "March": 51, "Feb": 26, "Jan": 44 },
          "2023": { "Dec": 33 }
        },
        "eBook": {
          "2025": { "March": 48, "Feb": 70, "Jan": 136 },
          "2024": { "Dec": 99, "Nov": 106, "Oct": 56, "Sept": 42, "Aug": 49, "July": 57, "June": 35, "May": 45, "April": 56, "March": 19 }
        }
      },
      "Amazon US": {
        "Physical": {
          "2025": { "March": 515, "Feb": 630, "Jan": 736 },
          "2024": { "Dec": 684, "Nov": 268, "Oct": 244, "Sept": 202, "Aug": 227, "July": 406, "June": 267, "May": 283, "April": 382, "March": 308, "Feb": 354, "Jan": 512 },
          "2023": { "Dec": 476, "Nov": 271, "Oct": 168, "Sept": 173, "Aug": 220, "July": 347, "June": 139, "May": 213, "April": 231, "March": 230, "Feb": 247, "Jan": 65 }
        }
      },
      "Amazon CA": {
        "Physical": {
          "2025": { "March": 47, "Feb": 27, "Jan": 44 },
          "2024": { "Dec": 45, "Nov": 29, "Oct": 29, "Sept": 17, "Aug": 23, "July": 40, "June": 16, "May": 15 }
        }
      },
      "Amazon UK": {
        "Physical": {
          "2025": { "March": 8, "Feb": 0, "Jan": 2 },
          "2024": { "Dec": 14, "Nov": 12, "Oct": 23, "Sept": 17, "Aug": 14, "July": 12, "June": 5, "May": 4 }
        }
      }
    },
    "notes": [
      {
        "id": 1,
        "text": "Amazon US Magnet's April 2025 Total Sales isn't accurate (April 3 - 30) because sales was counted as per week (Monday to Sunday), regardless of date. This will be updated in May.",
        "showWhen": (year, platform, month) => 
          (year === "2025" || year === "All") && 
          (platform === "Amazon US" || platform === "All") &&
          (!month || month === "April")
      },
      {
        "id": 2,
        "text": "Amazon CA Magnet Listing was deactivated from January 9 - March 5, 2025 because supplier printed the wrong Magnets. It was replaced and reactivated on March 6, 2025",
        "showWhen": (year, platform, month) => 
          (year === "2025" || year === "All") && 
          (platform === "Amazon CA" || platform === "All") &&
          (!month || ["Jan", "Feb", "March"].includes(month))
      },
      {
        "id": 3,
        "text": "AMZ CA Magnet had sales on multiple FBA pages on Nov. 2024 and Jan. 2025",
        "showWhen": (year, platform, month) => 
          ((year === "2024" && month === "Nov") || (year === "2025" && month === "Jan") || year === "All") && 
          (platform === "Amazon CA" || platform === "All")
      }
    ],
    "config": {
      "years": ["2023", "2024", "2025", "All"],
      "platforms": ["ClickFunnels", "Shopify", "Amazon US", "Amazon CA", "Amazon UK", "All"],
      "hasEbooks": true,
      "growthFactor": 1.05,
      "productLabel": "Magnet"
    }
  },
  "Thermometer": {
    "platforms": {
      "Shopify": {
        "Physical": {
          "2025": { "March": 0, "Feb": 17, "Jan": 34 },
          "2024": { "Dec": 78, "Nov": 49, "Oct": 24, "Sept": 27, "Aug": 33, "July": 27, "June": 25, "May": 21, "April": 20, "March": 18, "Feb": 31 }
        }
      },
      "Amazon US": {
        "Physical": {
          "2025": { "March": 92, "Feb": 119, "Jan": 88 },
          "2024": { "Dec": 78, "Nov": 61, "Oct": 39, "Sept": 40, "Aug": 20, "July": 78, "June": 18, "May": 28, "April": 52, "March": 49, "Feb": 26 }
        }
      },
      "Amazon CA": {
        "Physical": {
          "2025": { "March": 8, "Feb": 6, "Jan": 16 },
          "2024": { "Dec": 6, "Nov": 5, "Oct": 5, "Sept": 6, "Aug": 5, "July": 22, "June": 5, "May": 19, "April": 15, "March": 7 }
        }
      },
      "Amazon UK": {
        "Physical": {
          "2025": { "March": 5, "Feb": 5, "Jan": 9 },
          "2024": { "Dec": 4, "Nov": 8, "Oct": 6, "Sept": 8, "Aug": 9, "July": 18, "June": 7, "May": 17, "April": 43, "March": 3, "Feb": 1 }
        }
      }
    },
    "notes": [
      {
        "id": 1,
        "text": "Thermometers aren't sold in ClickFunnels",
        "showWhen": (year, platform) => true
      },
      {
        "id": 2,
        "text": "AMZ US Thermometer has multiple FBA Pages since Jan. 1, 2025.",
        "showWhen": (year, platform) => 
          (year === "2025" || year === "All") && 
          (platform === "Amazon US" || platform === "All")
      },
      {
        "id": 3,
        "text": "AMZ US Thermometer Listing got deactivated from 3rd week of May to 1st week of June 2024",
        "showWhen": (year, platform, month) => 
          (year === "2024" || year === "All") && 
          (platform === "Amazon US" || platform === "All") &&
          (!month || ["May", "June"].includes(month))
      },
      {
        "id": 4,
        "text": "AMZ US Thermometer had no stock for 1 week in August 14 - 28, 2024",
        "showWhen": (year, platform, month) => 
          (year === "2024" || year === "All") && 
          (platform === "Amazon US" || platform === "All") &&
          (!month || month === "Aug")
      }
    ],
    "config": {
      "years": ["2024", "2025", "All"],
      "platforms": ["Shopify", "Amazon US", "Amazon CA", "Amazon UK", "All"],
      "hasEbooks": false,
      "growthFactor": 1.08,
      "productLabel": "Thermometer"
    }
  }
};

// Constants
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];
const MONTHS = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

// Product insights data
const productInsights = {
  "Cookbook": [
    "Only product with significant KDP sales",
    "Highest overall sales volume across all platforms"
  ],
  "Liner": [
    "No ClickFunnels sales channel",
    "Significant stock availability issues in 2024"
  ],
  "Magnet": [
    "Strong digital sales component",
    "February 2025 showed unusual sales pattern"
  ],
  "Thermometer": [
    "Newest product in the lineup (2024 launch)",
    "Amazon US is dominant sales channel"
  ]
};
