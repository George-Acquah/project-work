enum _EWSExceptionTypes {
  BAD_REQUEST = 'BadRequest',
  UNAUTHORIZED = 'Unauthorized',
  UNKNOWN = 'Unknown'
}

enum SORT {
  DESCENDING = 'descending',
  ASCENDING = 'ascending'
}

enum AddressConstraints {
  CONTACTNO_MAXLENGTH = 'Max supported length of contact is 10',
  CONTACTNO_MAXVALUE = 10,

  AREA_MAXLENGTH = 'Max supported length of area is 50',
  AREA_MAXVALUE = 50,

  CITY_MAXLENGTH = 'Max supported length of city is 50',
  CITY_MAXVALUE = 50,

  STATE_MAXLENGTH = 'Max supported length of state is 50',
  STATE_MAXVALUE = 50,

  PINCODE_MAXLENGTH = 'Max supported length of pincode is 6',
  PINCODE_MAXVALUE = 6
}

enum VehicleConstraints {
  SLOT_MAXLENGTH = 'Max supported length of slot name is 20',
  SLOT_MAXVALUE = 20,

  /* length is higher than 50 because we store password in encrypted form */
  DESCRIPTION_MAXLENGTH = 'Max supported length of slot description is 200',
  DESCRIPTION_MAXVALUE = 200,

  FIRSTNAME_MAXLENGTH = 'Max supported length of firstname is 50',
  FIRSTNAME_MAXVALUE = 50,

  LASTNAME_MAXLENGTH = 'Max supported length of lastname is 50',
  LASTNAME_MAXVALUE = 50
}

enum SlotConstraints {
  EMAIL_MAXLENGTH = 'Max supported length of email is 50',
  EMAIL_MAXVALUE = 50,

  /* length is higher than 50 because we store password in encrypted form */
  PASSWORD_MAXLENGTH = 'Max supported length of password is 100',
  PASSWORD_MAXVALUE = 100,

  FIRSTNAME_MAXLENGTH = 'Max supported length of firstname is 50',
  FIRSTNAME_MAXVALUE = 50,

  LASTNAME_MAXLENGTH = 'Max supported length of lastname is 50',
  LASTNAME_MAXVALUE = 50
}

export {
  _EWSExceptionTypes,
  AddressConstraints,
  SlotConstraints,
  VehicleConstraints,
  SORT
};
