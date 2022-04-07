const models = require("../models/index");
const logger = require("../../logger/log");
const { errMsg } = require("../utils/error");
const { phoneRegex } = require("../utils/patterns");

// Note all schema files can e refactored to reduce length 😶‍🌫️ (didn't consider it earlier)

exports.aboutVendorSchema = {
  docs: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("docs")
  },
  about: {
    in: ["body"],
    exists: true,
    trim: true,
    errorMessage: errMsg("about")
  }
};

exports.createStoreSchema = {
  store_name: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_name")
  },
  store_phone_no: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_phone_no"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && (value.length < 14 || value.length > 14)) {
          return Promise.reject("Phone number should have a length of 14");
        }
        if (!phoneRegex.test(value))
          return Promise.reject("Invalid Phone Number Pattern");

        return Promise.resolve();
      }
    }
  },
  store_cover: {
    optional: { nullable: true }
  },
  store_avatar: {
    optional: { nullable: true }
  }
};

exports.editStoreSchema = {
  store_name: {
    optional: { nullable: true }
  },
  store_avatar: {
    optional: { nullable: true }
  },
  store_cover: {
    optional: { nullable: true }
  },
  store_phone_no: {
    optional: { nullable: true },
    custom: {
      options: (value) => {
        if (value && (value.length < 14 || value.length > 14)) {
          return Promise.reject("Phone number should have a length of 14");
        }
        if (!phoneRegex.test(value))
          return Promise.reject("Invalid Phone Number Pattern");

        return Promise.resolve();
      }
    }
  }
};

exports.storeLocationSchema = {
  is_landmark: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("is_landmark"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "boolean"))
          return Promise.reject("Invalid Response for field landmark");
        return Promise.resolve();
      }
    }
  },
  landmark: { optional: { nullable: true } },
  address: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("address"),
    trim: true
  },
  place_name: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("place_name"),
    trim: true
  },
  store_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "number")) {
          return Promise.reject("Invalid datatype for field store_id");
        }
        return Promise.resolve;
      }
    }
  }
};
exports.editStoreLocationSchema = {
  is_landmark: {
    in: ["body"],
    optional: { nullable: true },
    custom: {
      options: (value) => {
        if (value && !(typeof value == "boolean")) {
          return Promise.reject("Invalid Response for field landmark");
        }
        return Promise.resolve();
      }
    }
  },
  landmark: { in: ["body"], optional: { nullable: true } },
  store_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "number")) {
          return Promise.reject("Invalid datatype for field store_id");
        }
        return Promise.resolve;
      }
    }
  },
  place_name: { in: ["body"], optional: { nullable: true } },
  address: { in: ["body"], optional: { nullable: true } }
};

exports.createStoreMenuSchema = {
  store_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "number"))
          return Promise.reject("Invalid datatype for field store_id");
        return Promise.resolve();
      }
    }
  },
  deactivate: {
    optional: { nullable: true },
    custom: {
      options: (value) => {
        if (value && !(typeof value === "boolean"))
          return Promise.reject("Invalid datatype for field deactivate");
        return Promise.resolve();
      }
    }
  },
  description: {
    in: ["body"],
    optional: { nullable: true },
    trim: true
  },
  cover_image: {
    in: ["body"],
    optional: { nullable: true },
    trim: true
  },
  menu_name: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("menu_name"),
    bail: true,
    trim: true
  }
};

exports.editStoreMenuSchema = {
  menu_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("menu_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "number"))
          return Promise.reject("Invalid datatype for field menu_id");
        return Promise.resolve();
      }
    }
  },
  store_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("store_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "number"))
          return Promise.reject("Invalid datatype for field store_id");
        return Promise.resolve();
      }
    }
  },
  deactivate: {
    optional: { nullable: true },
    custom: {
      options: (value) => {
        if (value && !(typeof value === "boolean"))
          return Promise.reject("Invalid datatype for field deactivate");
        return Promise.resolve();
      }
    }
  },
  description: {
    in: ["body"],
    optional: { nullable: true },
    trim: true
  },
  cover_image: {
    in: ["body"],
    optional: { nullable: true },
    trim: true
  },
  menu_name: {
    in: ["body"],
    optional: { nullable: true },
    bail: true,
    trim: true
  }
};

exports.addMenuAvailabilitySchema = {
  menu_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("menu_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'menu_id'");
        return Promise.resolve();
      }
    }
  },
  availability: {
    // -> objects[] -> [ { week_day_id, close_time, open_time } ]

    in: ["body"],
    exists: true,
    errorMessage: errMsg("availability"),
    bail: true,
    custom: {
      options: (value) => {
        if (value) {
          const validKeys = ["week_day_id", "close_time", "open_time"];
          let error = false;

          value.forEach((data) => {
            const dataKeys = Object.keys(data);
            validKeys.forEach((key) => {
              if (!dataKeys.includes(key)) {
                error = true;
              }
            });
          });
          if (error) {
            return Promise.reject(
              "Invalid data schema for field 'availability'"
            );
          }
          return Promise.resolve();
        }
      }
    }
  }
};

exports.removeMenuAvailabilitySchema = {
  menu_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("menu_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'menu_id'");
        return Promise.resolve();
      }
    }
  },
  availability: {
    // -> objects[] -> [ { week_day_id } ]

    in: ["body"],
    exists: true,
    errorMessage: errMsg("availability"),
    bail: true,
    custom: {
      options: (value) => {
        if (value) {
          const validKeys = ["week_day_id"];
          let error = false;

          value.forEach((data) => {
            const dataKeys = Object.keys(data);
            validKeys.forEach((key) => {
              if (!dataKeys.includes(key)) {
                error = true;
              }
            });
          });
          if (error) {
            return Promise.reject(
              "Invalid data schema for field 'availability'"
            );
          }
          return Promise.resolve();
        }
      }
    }
  }
};

exports.createCategorySchema = {
  menu_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("menu_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "number"))
          return Promise.reject("Invalid datatype for field 'menu_id'");
        return Promise.resolve();
      }
    }
  },
  description: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("description"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && value.length > 200) {
          return Promise.reject("Max length for field 'description' exceeded");
        }
        return Promise.resolve();
      }
    }
  },
  item_name: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("item_name")
  },
  price: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("price")
  },
  cover_image: {
    in: ["body"],
    optional: { nullable: true }
  },
  deactivate: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("deactivate"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "boolean"))
          return Promise.reject("Invald datatype fo field 'deactivate'");
        return Promise.resolve();
      }
    }
  }
};
exports.updateCategorySchema = {
  menu_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("menu_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value === "number"))
          return Promise.reject("Invalid datatype for field 'menu_id'");
        return Promise.resolve();
      }
    }
  },
  description: {
    in: ["body"],
    optional: { nullable: true },
    bail: true,
    custom: {
      options: (value) => {
        if (value && value.length > 200) {
          return Promise.reject("Max length for field 'description' exceeded");
        }
        return Promise.resolve();
      }
    }
  },
  item_name: {
    in: ["body"],
    optional: { nullable: true }
  },
  price: {
    in: ["body"],
    optional: { nullable: true }
  },
  cover_image: {
    in: ["body"],
    optional: { nullable: true }
  },
  deactivate: {
    in: ["body"],
    optional: { nullable: true },
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "boolean"))
          return Promise.reject("Invald datatype fo field 'deactivate'");

        return Promise.resolve();
      }
    }
  }
};

exports.deleteCategorySchema = {
  menu_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("menu_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'menu_id'");
        return Promise.resolve();
      }
    }
  },
  category_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("category_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'category_id'");
        return Promise.resolve();
      }
    }
  }
};

exports.createModifierSchema = {
  description: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("description"),
    bail: true
  },
  required: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("required"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "boolean"))
          return Promise.reject("Invalid datatype for field 'required'");
        return Promise.resolve();
      }
    }
  },
  min_selection: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("min_selection"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'min_selection");
        if (value < 0)
          return Promise.reject(
            "Field 'min_selection' must be positive integer"
          );

        return Promise.resolve();
      }
    }
  },
  max_selection: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("max_selection"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'max_selection");
        return Promise.resolve();
      }
    }
  },
  category_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("category_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'category_id'");
        return Promise.resolve();
      }
    }
  }
};

exports.updateModifierSchema = {
  description: {
    in: ["body"],
    optional: { nullable: true }
  },
  modifier_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("modifier_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'modifier_id'");
        return Promise.resolve();
      }
    }
  },
  required: {
    in: ["body"],
    optional: { nullable: true },
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "boolean"))
          return Promise.reject("Invalid datatype for field 'required'");
        return Promise.resolve();
      }
    }
  },
  min_selection: {
    in: ["body"],
    optional: { nullable: true },
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'min_selection");
        if (value < 0)
          return Promise.reject(
            "Field 'min_selection' must be positive integer"
          );
        return Promise.resolve();
      }
    }
  },
  max_selection: {
    in: ["body"],
    optional: { nullable: true },
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'max_selection");

        return Promise.resolve();
      }
    }
  }
};

exports.deleteModifierSchema = {
  modifier_id: {
    in: ["body"],
    exists: true,
    errorMessage: errMsg("modifier_id"),
    bail: true,
    custom: {
      options: (value) => {
        if (value && !(typeof value == "number"))
          return Promise.reject("Invalid datatype for field 'modifier_id'");
        return Promise.resolve();
      }
    }
  }
};
// presentation on diff between nest js and express js
// possible exploits
// security loop holes
// KISS (Keep It Stupidly Simple)
// google slides
