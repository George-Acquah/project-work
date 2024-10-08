const upcomingBookings: _IBooking[] = [
  {
    parkingCenterName: "City Plaza Parking",
    slotName: "Slot A-101",
    location: "123 Main St, Cityville",
    dateTime: "2023-12-15 15:30",
    status: "Confirmed",
  },
  {
    parkingCenterName: "Downtown Garage",
    slotName: "Slot B-205",
    location: "456 Oak St, Downtown",
    dateTime: "2023-12-16 12:45",
    status: "Pending",
  },
  {
    parkingCenterName: "Central Park Parking",
    slotName: "Slot C-301",
    location: "789 Elm St, Central Park",
    dateTime: "2023-12-17 18:00",
    status: "Confirmed",
  },
  // Add more upcoming bookings as needed
];

const bookingHistory: _IBooking[] = [
  {
    parkingCenterName: "Riverfront Garage",
    slotName: "Slot E-202",
    location: "202 Maple St, Riverfront",
    dateTime: "2023-12-19 14:20",
    status: "Completed",
  },
  {
    parkingCenterName: "Sunset Plaza Parking",
    slotName: "Slot G-105",
    location: "404 Birch St, Sunset Plaza",
    dateTime: "2023-12-21 16:45",
    status: "Completed",
  },
  {
    parkingCenterName: "Greenway Garage",
    slotName: "Slot J-104",
    location: "707 Spruce St, Greenway",
    dateTime: "2023-12-24 17:30",
    status: "Completed",
  },
  // Add more booking history entries as needed
];

// Sample data for favorite parking centers
const favoriteParkingCenters: _IFavoriteParkingCenter[] = [
  {
    parkingCenterName: "Sunset Parking",
    location: "123 Main Street, Cityville",
  },
  {
    parkingCenterName: "Cityscape Parking",
    location: "456 Center Avenue, Urbantown",
  },
  // Add more entries as needed
];

const centers: _IParkingCenter[] = [
  {
    _id: "656482722cbf180fcb3aaf3d",
    owner: "655ec535edd4e987652d7b02",
    center_name: "First_Center_GA",
    description:
      "This is the first official Center for George Acquah and family.",
    type: "Class C" as CenterTypes,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isAvailable: false,
    isVerified: false,
    contact: "",
    location: {
      location: {
        lat: 37.7749,
        lng: -122.4194,
      },
      description: "San Francisco, CA",
    },
    slots: [
      {
        _id: "6564827f2cbf180fcb3aaf42",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_02",
        description: "This is the second slot for my center Test_Center_GA",
        type: "Class C" as SlotTypes,
        isAvailable: false,
        slot_images: [
          {
            _id: "6564827f2cbf180fcb3aaf46",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf47",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf48",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 37.7749,
            lng: -122.4194,
          },
          description: "San Francisco, Slot",
        },
      },
      {
        _id: "656482912cbf180fcb3aaf4d",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_01",
        description: "This is the first slot for my center Test_Center_GA",
        type: "Class C" as SlotTypes,
        isAvailable: false,
        slot_images: [
          {
            _id: "656482912cbf180fcb3aaf51",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf52",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf53",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fc85409e4312e395a590",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca492783b15f7c7a5de",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca892783b15f7c7a5e0",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 37.6642,
            lng: -121.4194,
          },
          description: "San Francisco, Slot",
        },
      },
    ],
    center_images: [
      {
        _id: "656529d20bae2fdf89eba5b2",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        center_id: "656482722cbf180fcb3aaf3d",
      },
      {
        _id: "656529d20bae2fdf89eba5b3",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        center_id: "656482722cbf180fcb3aaf3d",
      },
    ],
    center_data: null,
  },
  {
    _id: "656482722cbf180fcb3aaf3d_2",
    owner: "655ec535edd4e987652d7b02",
    center_name: "Second_Center_GA",
    description:
      "This is the second official Center for George Acquah and family.",
    type: "Class C" as CenterTypes,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isAvailable: false,
    isVerified: false,
    contact: "",
    location: {
      location: {
        lat: 40.7128,
        lng: -74.006,
      },
      description: "New York, NY",
    },
    slots: [
      {
        _id: "6564827f2cbf180fcb3aaf42",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_02",
        description: "This is the second slot for my center Test_Center_GA",
        type: "Class C" as SlotTypes,
        isAvailable: false,
        slot_images: [
          {
            _id: "6564827f2cbf180fcb3aaf46",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf47",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf48",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 36.1149,
            lng: -120.6194,
          },
          description: "San Francisco, CA",
        },
      },
      {
        _id: "656482912cbf180fcb3aaf4d",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_01",
        description: "This is the first slot for my center Test_Center_GA",
        type: "Class C" as SlotTypes,
        isAvailable: false,
        slot_images: [
          {
            _id: "656482912cbf180fcb3aaf51",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf52",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf53",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fc85409e4312e395a590",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca492783b15f7c7a5de",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca892783b15f7c7a5e0",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 34.9949,
            lng: -123.5194,
          },
          description: "San Francisco, CA",
        },
      },
    ],
    center_images: [
      {
        _id: "656529d20bae2fdf89eba5b2",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        center_id: "656482722cbf180fcb3aaf3d",
      },
      {
        _id: "656529d20bae2fdf89eba5b3",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        center_id: "656482722cbf180fcb3aaf3d",
      },
    ],
    center_data: null,
  },
  {
    _id: "656482722cbf180fcb3aaf3d_3",
    owner: "655ec535edd4e987652d7b02",
    center_name: "Third_Center_GA",
    description:
      "This is the third official Center for George Acquah and family.",
    type: "Class C" as CenterTypes,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isAvailable: false,
    isVerified: false,
    contact: "",
    location: {
      location: {
        lat: 51.5074,
        lng: -0.1278,
      },
      description: "London, UK",
    },
    slots: [
      {
        _id: "6564827f2cbf180fcb3aaf42",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_02",
        description: "This is the second slot for my center Test_Center_GA",
        type: "Class C" as SlotTypes,
        isAvailable: false,
        slot_images: [
          {
            _id: "6564827f2cbf180fcb3aaf46",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf47",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf48",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 51.1024,
            lng: -1.6278,
          },
          description: "London, UK",
        },
      },
      {
        _id: "656482912cbf180fcb3aaf4d",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_01",
        description: "This is the first slot for my center Test_Center_GA",
        type: "Class C" as SlotTypes,
        isAvailable: false,
        slot_images: [
          {
            _id: "656482912cbf180fcb3aaf51",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf52",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf53",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fc85409e4312e395a590",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca492783b15f7c7a5de",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca892783b15f7c7a5e0",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 48.5074,
            lng: -5.1278,
          },
          description: "London, UK",
        },
      },
    ],
    center_images: [
      {
        _id: "656529d20bae2fdf89eba5b2",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        center_id: "656482722cbf180fcb3aaf3d",
      },
      {
        _id: "656529d20bae2fdf89eba5b3",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        center_id: "656482722cbf180fcb3aaf3d",
      },
    ],
    center_data: null,
  },
  {
    _id: "656482722cbf180fcb3aaf3d_4",
    owner: "655ec535edd4e987652d7b02",
    center_name: "Fourth_Center_GA",
    description:
      "This is the fourth official Center for George Acquah and family.",
    type: "Class C" as any,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isAvailable: false,
    isVerified: false,
    contact: "",
    location: {
      location: {
        lat: 48.8566,
        lng: 2.3522,
      },
      description: "Paris, France",
    },
    slots: [
      {
        _id: "6564827f2cbf180fcb3aaf42",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_02",
        description: "This is the second slot for my center Test_Center_GA",
        type: "Class C" as any,
        isAvailable: false,
        slot_images: [
          {
            _id: "6564827f2cbf180fcb3aaf46",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf47",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
          {
            _id: "6564827f2cbf180fcb3aaf48",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "6564827f2cbf180fcb3aaf42",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 47.2566,
            lng: 2.7522,
          },
          description: "Paris, France",
        },
      },
      {
        _id: "656482912cbf180fcb3aaf4d",
        center_id: "656482722cbf180fcb3aaf3d",
        slot_name: "Test_Center_GA_Sl_01",
        description: "This is the first slot for my center Test_Center_GA",
        type: "Class C" as SlotTypes,
        isAvailable: false,
        slot_images: [
          {
            _id: "656482912cbf180fcb3aaf51",
            file_id: "file_id_1",
            filename: "example1.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf52",
            file_id: "file_id_2",
            filename: "example2.jpg",
            mimetype: "image/jpeg",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "656482912cbf180fcb3aaf53",
            file_id: "file_id_3",
            filename: "example3.gif",
            mimetype: "image/gif",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fc85409e4312e395a590",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca492783b15f7c7a5de",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
          {
            _id: "6564fca892783b15f7c7a5e0",
            file_id: "file_id_4",
            filename: "example4.png",
            mimetype: "image/png",
            slot_id: "656482912cbf180fcb3aaf4d",
          },
        ],
        slot_data: null,
        createdAt: new Date().toDateString(),
        updatedAt: new Date().toDateString(),
        isVerified: false,
        contact: "",
        location: {
          location: {
            lat: 47.1566,
            lng: 3.0522,
          },
          description: "Paris, France",
        },
      },
    ],
    center_images: [
      {
        _id: "656529d20bae2fdf89eba5b2",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        center_id: "656482722cbf180fcb3aaf3d",
      },
      {
        _id: "656529d20bae2fdf89eba5b3",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        center_id: "656482722cbf180fcb3aaf3d",
      },
    ],
    center_data: null,
  },
];

const slots: _ISlot[] = [
  {
    _id: "6564827f2cbf180fcb3aaf42",
    center_id: "656482722cbf180fcb3aaf3d",
    slot_name: "Test_Center_GA_Sl_02",
    description: "This is the second slot for my center Test_Center_GA",
    type: "Class C" as SlotTypes,
    isAvailable: false,
    slot_images: [
      {
        _id: "6564827f2cbf180fcb3aaf46",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        slot_id: "6564827f2cbf180fcb3aaf42",
      },
      {
        _id: "6564827f2cbf180fcb3aaf47",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        slot_id: "6564827f2cbf180fcb3aaf42",
      },
      {
        _id: "6564827f2cbf180fcb3aaf48",
        file_id: "file_id_3",
        filename: "example3.gif",
        mimetype: "image/gif",
        slot_id: "6564827f2cbf180fcb3aaf42",
      },
    ],
    slot_data: null,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isVerified: false,
    contact: "",
    slot_address: {
      _id: "6564827f2cbf180fcb3aaf42",
      latitude: 37.7749,
      longitude: -122.4194,
      state: "San Francisco, CA",
      center_id: "656482722cbf180fcb3aaf3d",
      city: "",
      country: "",
    },
  },
  {
    _id: "656482912cbf180fcb3aaf4d",
    center_id: "656482722cbf180fcb3aaf3d",
    slot_name: "Test_Center_GA_Sl_03",
    description: "This is the first slot for my center Test_Center_GA",
    type: "Class C" as SlotTypes,
    isAvailable: false,
    slot_images: [
      {
        _id: "656482912cbf180fcb3aaf51",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "656482912cbf180fcb3aaf52",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "656482912cbf180fcb3aaf53",
        file_id: "file_id_3",
        filename: "example3.gif",
        mimetype: "image/gif",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fc85409e4312e395a590",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fca492783b15f7c7a5de",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fca892783b15f7c7a5e0",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
    ],
    slot_data: null,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isVerified: false,
    contact: "",
    slot_address: {
      _id: "6564827f2cbf180fcb3aaf41",
      latitude: 37.7849,
      longitude: -122.4192,
      state: "San Francisco, CA",
      center_id: "656482722cbf180fcb3aaf3d",
      city: "",
      country: "",
    },
  },
  {
    _id: "656482912cbf180fcb3aaf4e",
    center_id: "656482722cbf180fcb3aaf3d",
    slot_name: "Test_Center_GA_Sl_04",
    description: "This is the first slot for my center Test_Center_GA",
    type: "Class C" as SlotTypes,
    isAvailable: false,
    slot_images: [
      {
        _id: "656482912cbf180fcb3aaf51",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "656482912cbf180fcb3aaf52",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "656482912cbf180fcb3aaf53",
        file_id: "file_id_3",
        filename: "example3.gif",
        mimetype: "image/gif",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fc85409e4312e395a590",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fca492783b15f7c7a5de",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fca892783b15f7c7a5e0",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
    ],
    slot_data: null,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isVerified: false,
    contact: "",
    slot_address: {
      _id: "6564827f2cbf180fcb3aaf41",
      latitude: 37.7849,
      longitude: -122.3892,
      state: "San Francisco, CA",
      center_id: "656482722cbf180fcb3aaf3d",
      city: "",
      country: "",
    },
  },
  {
    _id: "656482912cbf180fcb3aaf4f",
    center_id: "656482722cbf180fcb3aaf3d",
    slot_name: "Test_Center_GA_Sl_01",
    description: "This is the first slot for my center Test_Center_GA",
    type: "Class C" as SlotTypes,
    isAvailable: false,
    slot_images: [
      {
        _id: "656482912cbf180fcb3aaf51",
        file_id: "file_id_1",
        filename: "example1.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "656482912cbf180fcb3aaf52",
        file_id: "file_id_2",
        filename: "example2.jpg",
        mimetype: "image/jpeg",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "656482912cbf180fcb3aaf53",
        file_id: "file_id_3",
        filename: "example3.gif",
        mimetype: "image/gif",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fc85409e4312e395a590",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fca492783b15f7c7a5de",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
      {
        _id: "6564fca892783b15f7c7a5e0",
        file_id: "file_id_4",
        filename: "example4.png",
        mimetype: "image/png",
        slot_id: "656482912cbf180fcb3aaf4d",
      },
    ],
    slot_data: null,
    createdAt: new Date().toDateString(),
    updatedAt: new Date().toDateString(),
    isVerified: false,
    contact: "",
    slot_address: {
      _id: "6564827f2cbf180fcb3aaf41",
      latitude: 37.7819,
      longitude: -122.4094,
      state: "San Francisco, CA",
      center_id: "656482722cbf180fcb3aaf3d",
      city: "",
      country: "",
    },
  },
];

export {
  upcomingBookings,
  favoriteParkingCenters,
  bookingHistory,
  centers,
  slots,
};
