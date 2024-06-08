enum SlotTypes {
  TYPE_A = "Class A",
  TYPE_B = "Class B",
  TYPE_C = "Class C",
}

enum CenterTypes {
  TYPE_A = "Class A",
  TYPE_B = "Class B",
  TYPE_C = "Class C",
}

enum UserType {
  CUSTOMER = "Customer",
  PARK_OWNER = "ParkOwner",
}

enum Center_Type {
  NEARBY = "nearby-centers",
  POPULAR = "popular-centers",
}

enum Slot_Type {
  NEARBY = "nearby-slots",
  POPULAR = "popular-slots"
}

enum Merged_Types {
  NEARBY_CENTER = "nearby-centers",
  POPULAR_CENTER = "popular-centers",
  NEARBY_SLOT = "nearby-slots",
  POPULAR_SLOT= "popular-slots",
}

enum Center_Filter {
  AVAILABLE = "Available",
  POPULAR = "Popular",
  NEARBY = "Nearby"
}

export {
  Center_Type, Slot_Type, Merged_Types, Center_Filter, UserType 
}
